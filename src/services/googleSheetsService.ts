import { ApprenticeProfile, UserProgress } from '../types/sena';

const SPREADSHEET_TITLE = 'SENA - Registro de Inducción de Aprendices';
const SHEET_NAME = 'Aprendices';

export interface SpreadsheetInfo {
  id: string;
  name: string;
  webViewLink?: string;
}

export interface StoredApprenticeData {
  lastSync: string;
  documentType: string;
  documentNumber: string;
  fullName: string;
  fichaNumber: string;
  programName: string;
  regional: string;
  centerName: string;
  modulesCompletedStr: string;
  casesResolvedStr: string;
  quizScoreStr: string;
  xpStr: string;
  certificateCodeStr: string;
  statusStr: string;
}

const HEADERS = [
  'Fecha / Hora Sincronización',
  'Tipo Doc.',
  'Número Documento',
  'Nombre Completo',
  'Número de Ficha',
  'Programa de Formación',
  'Regional',
  'Centro de Formación',
  'Módulos Completados',
  'Casos Resueltos',
  'Evaluación Final',
  'Puntos XP',
  'Código Certificado',
  'Estado'
];

/**
 * Searches for an existing induction spreadsheet or creates a new one in Google Drive.
 */
export async function getOrCreateSpreadsheet(accessToken: string): Promise<SpreadsheetInfo> {
  // 1. Search in Drive
  const query = encodeURIComponent(`name = '${SPREADSHEET_TITLE}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`);
  const driveSearchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)&pageSize=1`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (driveSearchRes.ok) {
    const searchData = await driveSearchRes.json();
    if (searchData.files && searchData.files.length > 0) {
      const file = searchData.files[0];
      return {
        id: file.id,
        name: file.name,
        webViewLink: file.webViewLink || `https://docs.google.com/spreadsheets/d/${file.id}/edit`,
      };
    }
  }

  // 2. If not found, create new spreadsheet
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: SPREADSHEET_TITLE,
      },
      sheets: [
        {
          properties: {
            title: SHEET_NAME,
            gridProperties: {
              frozenRowCount: 1,
            },
          },
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Error al crear la hoja de cálculo: ${errText}`);
  }

  const createData = await createRes.json();
  const spreadsheetId = createData.spreadsheetId;

  // 3. Write header row with styles
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(SHEET_NAME)}!A1:N1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [HEADERS],
      }),
    }
  );

  return {
    id: spreadsheetId,
    name: SPREADSHEET_TITLE,
    webViewLink: createData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
  };
}

/**
 * Synchronizes the current apprentice profile and progress into the spreadsheet.
 * Updates the row if the document already exists, or appends a new row if not.
 */
export async function syncApprenticeToSheet(
  accessToken: string,
  profile: ApprenticeProfile,
  progress: UserProgress
): Promise<{ spreadsheet: SpreadsheetInfo; isNewRow: boolean }> {
  const spreadsheet = await getOrCreateSpreadsheet(accessToken);

  // 1. Fetch current rows
  const readRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet.id}/values/${encodeURIComponent(SHEET_NAME)}!A:N`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!readRes.ok) {
    throw new Error('No se pudieron leer las filas de la hoja de cálculo.');
  }

  const readData = await readRes.json();
  const rows: string[][] = readData.values || [];

  const nowFormatted = new Date().toLocaleString('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const modulesStr = progress.completedModules.join(', ') || 'Ninguno';
  const casesStr = `${progress.completedCases.length} casos resueltos`;
  const quizStr = progress.quizPassed
    ? `Aprobado (${progress.quizScore}/10)`
    : progress.quizScore > 0
    ? `Presentado (${progress.quizScore}/10 - No Aprobado)`
    : 'Pendiente';
  const statusStr = progress.quizPassed ? 'Certificado Emitido' : 'En Inducción';
  const certCode = progress.certificateCode || (progress.quizPassed ? 'Emitido' : 'Sin certificar');

  const rowValues = [
    nowFormatted,
    profile.documentType,
    profile.documentNumber.trim(),
    profile.fullName.trim(),
    profile.fichaNumber.trim(),
    profile.programName.trim(),
    profile.regional.trim(),
    profile.centerName.trim(),
    modulesStr,
    casesStr,
    quizStr,
    String(progress.xp),
    certCode,
    statusStr,
  ];

  // 2. Check if document exists (Column C is index 2)
  let foundRowIndex = -1;
  const targetDoc = profile.documentNumber.trim().toLowerCase();

  for (let i = 1; i < rows.length; i++) {
    const rowDoc = (rows[i][2] || '').trim().toLowerCase();
    if (rowDoc && rowDoc === targetDoc) {
      foundRowIndex = i + 1; // 1-based index in sheets
      break;
    }
  }

  if (foundRowIndex > 1) {
    // Update existing row
    const updateRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet.id}/values/${encodeURIComponent(SHEET_NAME)}!A${foundRowIndex}:N${foundRowIndex}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [rowValues],
        }),
      }
    );

    if (!updateRes.ok) {
      throw new Error('Error al actualizar la fila del aprendiz en la hoja de cálculo.');
    }

    return { spreadsheet, isNewRow: false };
  } else {
    // Append new row
    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet.id}/values/${encodeURIComponent(SHEET_NAME)}!A:N:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [rowValues],
        }),
      }
    );

    if (!appendRes.ok) {
      throw new Error('Error al agregar al aprendiz en la hoja de cálculo.');
    }

    return { spreadsheet, isNewRow: true };
  }
}

/**
 * Searches for an apprentice in the Google Sheet by document number and returns their stored data.
 */
export async function searchApprenticeByDocument(
  accessToken: string,
  documentNumber: string
): Promise<{ data: StoredApprenticeData | null; spreadsheet: SpreadsheetInfo }> {
  const spreadsheet = await getOrCreateSpreadsheet(accessToken);

  const readRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet.id}/values/${encodeURIComponent(SHEET_NAME)}!A:N`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!readRes.ok) {
    throw new Error('No se pudo consultar la hoja de cálculo.');
  }

  const readData = await readRes.json();
  const rows: string[][] = readData.values || [];

  const targetDoc = documentNumber.trim().toLowerCase();

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rowDoc = (row[2] || '').trim().toLowerCase();
    if (rowDoc && rowDoc === targetDoc) {
      return {
        spreadsheet,
        data: {
          lastSync: row[0] || '',
          documentType: row[1] || 'CC',
          documentNumber: row[2] || '',
          fullName: row[3] || '',
          fichaNumber: row[4] || '',
          programName: row[5] || '',
          regional: row[6] || '',
          centerName: row[7] || '',
          modulesCompletedStr: row[8] || '',
          casesResolvedStr: row[9] || '',
          quizScoreStr: row[10] || '',
          xpStr: row[11] || '0',
          certificateCodeStr: row[12] || '',
          statusStr: row[13] || '',
        },
      };
    }
  }

  return { spreadsheet, data: null };
}
