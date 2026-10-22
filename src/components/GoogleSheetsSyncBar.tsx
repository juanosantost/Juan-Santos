import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { SpreadsheetInfo, StoredApprenticeData } from '../services/googleSheetsService';
import { 
  FileSpreadsheet, 
  ExternalLink, 
  RefreshCw, 
  Search, 
  CheckCircle2, 
  LogOut, 
  AlertCircle, 
  Database,
  CloudCheck
} from 'lucide-react';

interface GoogleSheetsSyncBarProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  isLoggingIn: boolean;
  isSyncing: boolean;
  lastSyncTime: string | null;
  spreadsheetInfo: SpreadsheetInfo | null;
  onManualSync: () => void;
  onSearchDocument: (docNumber: string) => Promise<StoredApprenticeData | null>;
  onApplyLoadedData: (data: StoredApprenticeData) => void;
  currentDocumentNumber: string;
}

export const GoogleSheetsSyncBar: React.FC<GoogleSheetsSyncBarProps> = ({
  user,
  onLogin,
  onLogout,
  isLoggingIn,
  isSyncing,
  lastSyncTime,
  spreadsheetInfo,
  onManualSync,
  onSearchDocument,
  onApplyLoadedData,
  currentDocumentNumber,
}) => {
  const [searchDocInput, setSearchDocInput] = useState(currentDocumentNumber || '');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<StoredApprenticeData | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchDocInput.trim()) return;

    setIsSearching(true);
    setSearchError(null);
    setSearchResult(null);

    try {
      const data = await onSearchDocument(searchDocInput.trim());
      if (data) {
        setSearchResult(data);
        setShowRestoreModal(true);
      } else {
        setSearchError(`No se encontraron registros previos para el documento "${searchDocInput.trim()}".`);
      }
    } catch (err: any) {
      setSearchError(err?.message || 'Error al consultar la hoja de cálculo en Google Drive.');
    } finally {
      setIsSearching(false);
    }
  };

  const confirmApplyData = () => {
    if (searchResult) {
      onApplyLoadedData(searchResult);
      setShowRestoreModal(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-colors">
      
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Sincronización con Google Drive & Google Sheets
              </h3>
              {user ? (
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700 shadow-2xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Conexión Permanente Activa (Tiempo Real)</span>
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                  Desconectado · Inicia sesión una vez
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {user
                ? 'Sincronización automática continua: cualquier avance, caso resuelto, evaluación o cambio de perfil se guarda al instante sin necesidad de pulsar botones.'
                : 'Conecta tu cuenta de Google una sola vez para mantener el respaldo permanente y automático de los aprendices en la hoja de cálculo institucional.'}
            </p>
          </div>
        </div>

        {/* Auth / Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          {!user ? (
            /* Official Google Sign-in Styled Button as mandated by Workspace skill */
            <button
              onClick={onLogin}
              disabled={isLoggingIn}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg shadow-2xs transition-all disabled:opacity-60 cursor-pointer"
            >
              {isLoggingIn ? (
                <RefreshCw className="w-4 h-4 animate-spin text-slate-500" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
              )}
              <span>{isLoggingIn ? 'Conectando...' : 'Conectar Google Drive'}</span>
            </button>
          ) : (
            <>
              {/* Auto-saving status indicator */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-lg border border-emerald-200/50 dark:border-emerald-800/60">
                <CloudCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isSyncing ? 'Guardando en la nube...' : 'Auto-sincronizado'}</span>
              </div>

              {/* View spreadsheet in Drive */}
              {spreadsheetInfo?.webViewLink && (
                <a
                  href={spreadsheetInfo.webViewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Abrir Hoja en Drive</span>
                  <span className="sm:hidden">Drive</span>
                </a>
              )}

              {/* Manual sync trigger (optional override) */}
              <button
                onClick={onManualSync}
                disabled={isSyncing}
                title="Forzar actualización manual inmediata (opcional, el sistema ya guarda automáticamente cada cambio)"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Forzar sync</span>
              </button>

              {/* Sign out */}
              <button
                onClick={onLogout}
                title="Desconectar cuenta de Google"
                className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Sync Status Info & Document Recovery Bar (when connected) */}
      {user && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Status info */}
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Conectado como: <strong className="text-slate-700 dark:text-slate-200">{user.email}</strong></span>
            </span>
            {lastSyncTime && (
              <>
                <span>·</span>
                <span>Último guardado: <span className="font-mono text-slate-700 dark:text-slate-300">{lastSyncTime}</span></span>
              </>
            )}
          </div>

          {/* Quick Query by Document Number */}
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchDocInput}
                onChange={(e) => setSearchDocInput(e.target.value)}
                placeholder="N° Documento para restaurar datos..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] w-64"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching || !searchDocInput.trim()}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 rounded-lg transition-colors disabled:opacity-50"
            >
              {isSearching ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Database className="w-3 h-3" />}
              <span>Consultar</span>
            </button>
          </form>

        </div>
      )}

      {/* Search Error Alert */}
      {searchError && (
        <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 rounded-xl text-xs text-amber-800 dark:text-amber-200 flex items-center justify-between gap-2 animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{searchError}</span>
          </div>
          <button
            onClick={() => setSearchError(null)}
            className="text-amber-600 dark:text-amber-400 hover:underline font-bold text-xs"
          >
            Entendido
          </button>
        </div>
      )}

      {/* Restore Data Confirmation Dialog (Mandatory user confirmation before updating local state) */}
      {showRestoreModal && searchResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Registro Encontrado en Google Sheets
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Documento: {searchResult.documentNumber}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Aprendiz:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{searchResult.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Ficha:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{searchResult.fichaNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Programa:</span>
                <span className="text-slate-800 dark:text-slate-200 truncate max-w-[200px]">{searchResult.programName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Centro:</span>
                <span className="text-slate-800 dark:text-slate-200 truncate max-w-[200px]">{searchResult.centerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Progreso:</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{searchResult.statusStr} ({searchResult.xpStr} XP)</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              ¿Deseas cargar y restaurar esta información en tu navegador? Tus datos locales se actualizarán con los datos recuperados de la nube.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowRestoreModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmApplyData}
                className="px-4 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#329200] rounded-lg transition-colors shadow-xs"
              >
                Restaurar Datos
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
