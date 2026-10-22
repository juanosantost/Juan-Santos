import React, { useState } from 'react';
import { UserProgress, ApprenticeProfile } from '../types/sena';
import { SENA_OFFICIAL_LOGO_DATA_URI } from './SenaLogo';
import { 
  BookOpen, 
  CheckCircle2, 
  Compass, 
  Gamepad2, 
  GraduationCap, 
  Award, 
  ArrowRight, 
  Sparkles, 
  UserCheck, 
  ShieldCheck, 
  HelpCircle, 
  FileText, 
  AlertCircle, 
  RefreshCw, 
  LogOut,
  Printer,
  Download,
  FileDown,
  Check,
  Building,
  Calendar,
  Layers,
  Scale
} from 'lucide-react';

interface InductionManualViewProps {
  onNavigate: (tab: 'plan' | 'modules' | 'simulator' | 'quiz' | 'certificate' | 'glossary') => void;
  openOnboarding?: () => void;
  progress: UserProgress;
  profile?: ApprenticeProfile;
}

export const InductionManualView: React.FC<InductionManualViewProps> = ({
  onNavigate,
  openOnboarding,
  progress,
  profile,
}) => {
  const [activeStepTab, setActiveStepTab] = useState<number>(1);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  // Calculate current completion status
  const isCharacterized = Boolean(profile?.documentNumber && profile?.fullName);
  const completedModulesCount = progress.completedModules.length;
  const isModulesCompleted = completedModulesCount >= 5;
  const completedCasesCount = progress.completedCases.length;
  const isCasesCompleted = completedCasesCount >= 3;
  const isQuizPassed = progress.quizPassed;
  const isCertified = progress.quizPassed;

  const totalStepsCompleted = [
    isCharacterized,
    completedModulesCount > 0,
    completedCasesCount > 0,
    isQuizPassed,
    isCertified
  ].filter(Boolean).length;

  const currentDateFormatted = new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const steps = [
    {
      stepNumber: 1,
      id: "caracterizacion",
      title: "Paso 1: Caracterización del Aprendiz",
      shortTitle: "1. Caracterización",
      subtitle: "Registro inicial de documento, ficha y programa",
      isCompleted: isCharacterized,
      badgeText: isCharacterized ? "Completado" : "Pendiente",
      icon: UserCheck,
      color: "emerald",
      description: "Es el primer paso obligatorio. Al ingresar a la plataforma, debes diligenciar tus datos personales e institucionales para que tus respuestas se asocien a tu número de documento y tu certificado salga a tu nombre.",
      instructions: [
        "Selecciona tu tipo de documento (Cédula de Ciudadanía, Tarjeta de Identidad, Cédula de Extranjería, PPT, PEP).",
        "Digita con precisión tu número de documento de identidad sin puntos ni comas.",
        "Ingresa tus nombres y apellidos completos tal como figuran en tu documento oficial.",
        "Indica el número de tu Ficha SENA (número de 7 u 8 dígitos asignado a tu grupo formativo).",
        "Escribe el nombre de tu Programa de Formación (ej: Análisis y Desarrollo de Software - ADSO).",
        "Selecciona tu Regional y Centro de Formación correspondiente."
      ],
      tip: "Si te equivocas en algún dato o necesitas cambiar de ficha, puedes hacer clic en el botón 'Datos' en la barra superior o en tu Perfil para corregirlo en cualquier momento.",
      actionLabel: "Completar / Editar Caracterización",
      action: () => openOnboarding && openOnboarding(),
    },
    {
      stepNumber: 2,
      id: "modulos",
      title: "Paso 2: Exploración del Reglamento (Acuerdo 009 de 2024)",
      shortTitle: "2. Reglamento",
      subtitle: "Estudio de los 5 módulos normativos clave",
      isCompleted: isModulesCompleted,
      badgeText: `${completedModulesCount}/5 Módulos`,
      icon: BookOpen,
      color: "blue",
      description: "El nuevo Reglamento del Aprendiz (Acuerdo 009 de 2024) establece las normas de convivencia, derechos, deberes y trámites en el SENA. Debes revisar los módulos para conocer las directrices institucionales.",
      instructions: [
        "Módulo 1 (Identidad y Misión): Conoce la historia, símbolos y principios de la Formación Profesional Integral.",
        "Módulo 2 (Derechos del Aprendiz): Aprende sobre tus libertades de expresión, representación estudiantil y garantías al debido proceso.",
        "Módulo 3 (Deberes y Prohibiciones): Conoce tus obligaciones, uso del carné, asistencia, integridad académica y la política de cero tolerancia al acoso (Ley 2365 de 2024).",
        "Módulo 4 (Trámites Académicos): Aprende cómo solicitar traslados, aplazamientos de matrícula, reingresos y retiros voluntarios.",
        "Módulo 5 (Etapa Productiva): Conoce las alternativas para certificar tu etapa práctica (Contrato de Aprendizaje, Pasantía, Proyecto Productivo, Monitoría)."
      ],
      tip: "Por cada módulo que leas y marques como completado, recibirás 100 puntos XP y desbloquearás insignias de honor en tu perfil.",
      actionLabel: "Ir a los Módulos del Reglamento",
      action: () => onNavigate('modules'),
    },
    {
      stepNumber: 3,
      id: "simulador",
      title: "Paso 3: Simulador de Casos y Dilemas Éticos",
      shortTitle: "3. Simulador",
      subtitle: "Entrenamiento práctico en toma de decisiones",
      isCompleted: isCasesCompleted,
      badgeText: `${completedCasesCount}/5 Casos`,
      icon: Gamepad2,
      color: "indigo",
      description: "En este espacio interactivo te enfrentarás a situaciones reales de la vida cotidiana del aprendiz para poner a prueba tu criterio y aplicar el reglamento en casos de convivencia y dilemas éticos.",
      instructions: [
        "Lee con atención cada uno de los 5 dilemas formativos (ej: uso responsable de Inteligencia Artificial en evidencias, prevención de acoso en talleres, aplazamientos por fuerza mayor).",
        "Revisa las opciones disponibles y selecciona la decisión que mejor se alinee con los principios del Acuerdo 009 de 2024.",
        "Recibe retroalimentación inmediata con la fundamentación legal y pedagógica de la decisión.",
        "Acumula puntos de experiencia (XP) por cada decisión acertada para subir de nivel."
      ],
      tip: "Te recomendamos resolver al menos 3 casos para asegurar un entendimiento profundo antes de presentar la evaluación final.",
      actionLabel: "Ingresar al Simulador de Casos",
      action: () => onNavigate('simulator'),
    },
    {
      stepNumber: 4,
      id: "evaluacion",
      title: "Paso 4: Evaluación Final de Conocimientos",
      shortTitle: "4. Evaluación",
      subtitle: "Cuestionario de 10 preguntas sobre el reglamento",
      isCompleted: isQuizPassed,
      badgeText: isQuizPassed ? `Aprobado (${progress.quizScore}%)` : "Pendiente",
      icon: GraduationCap,
      color: "amber",
      description: "Es el filtro de conocimiento que valida tu apropiación de las normas del SENA. Consta de 10 preguntas de selección múltiple con única respuesta.",
      instructions: [
        "Inicia la evaluación desde el menú superior o desde la ruta del plan.",
        "Lee cada pregunta con calma; abordan derechos, deberes, faltas disciplinarias y trámites formativos.",
        "Para aprobar la inducción, debes obtener una calificación igual o superior al 70% (mínimo 7 de 10 respuestas correctas).",
        "Si no alcanzas el puntaje en el primer intento, ¡no te preocupes! Puedes repasar los módulos y volver a presentar la evaluación las veces necesarias hasta aprobar."
      ],
      tip: "Al aprobar la evaluación, se desbloquea de forma inmediata tu Certificado Oficial de Inducción.",
      actionLabel: isQuizPassed ? "Repasar Evaluación" : "Iniciar Evaluación Final",
      action: () => onNavigate('quiz'),
    },
    {
      stepNumber: 5,
      id: "certificado",
      title: "Paso 5: Emisión y Descarga del Certificado",
      shortTitle: "5. Certificado",
      subtitle: "Constancia institucional con código QR de verificación",
      isCompleted: isCertified,
      badgeText: isCertified ? "Emitido" : "Requiere Evaluación",
      icon: Award,
      color: "emerald",
      description: "Una vez superada la evaluación, el sistema genera tu Certificado Institucional Oficial de Inducción 360° respaldado por el Acuerdo 009 de 2024.",
      instructions: [
        "Verifica que tu nombre, tipo y número de documento, ficha y programa estén correctos.",
        "El certificado incluye la fecha de emisión y un código institucional único con código QR de validación.",
        "Puedes descargarlo en formato digital o usar la opción 'Imprimir Certificado' para archivarlo en tu carpeta de formación o entregarlo a tu instructor técnico o de inducción.",
        "Este certificado acredita formalmente que conoces tus derechos, deberes y el marco normativo del SENA."
      ],
      tip: "Si tu instructor o centro te solicita constancia de inducción, este documento digital o impreso es el comprobante válido de cumplimiento.",
      actionLabel: isCertified ? "Ver y Descargar Certificado" : "Ver Estado del Certificado",
      action: () => onNavigate('certificate'),
    },
  ];

  const currentStep = steps[activeStepTab - 1];

  // Function to print or save as PDF
  const handlePrintDocument = () => {
    window.print();
  };

  // Function to download as Word-compatible .doc file
  const handleDownloadWordDoc = () => {
    const apprenticeName = profile?.fullName || 'Aprendiz SENA (Sin registrar)';
    const docType = profile?.documentType || 'CC';
    const docNum = profile?.documentNumber || 'Pendiente';
    const ficha = profile?.fichaNumber || 'Pendiente';
    const program = profile?.programName || 'Programa de Formación Profesional Integral';
    const regional = profile?.regional || 'Dirección General / Regional';
    const center = profile?.centerName || 'Centro de Formación';

    const wordContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Manual de Inducción del Aprendiz SENA - Acuerdo 009 de 2024</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; margin: 40px; }
          .header-box { text-align: center; border-bottom: 2px solid #39a900; padding-bottom: 15px; margin-bottom: 20px; }
          .institution { font-size: 14pt; font-weight: bold; color: #00324d; letter-spacing: 1px; margin: 0; }
          .sub-inst { font-size: 10pt; color: #64748b; text-transform: uppercase; margin: 4px 0 0 0; }
          h1 { color: #00324d; font-size: 18pt; margin: 15px 0 5px 0; }
          .subtitle { font-size: 11pt; color: #39a900; font-weight: bold; margin-bottom: 15px; }
          .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; background-color: #f8fafc; border: 1px solid #cbd5e1; }
          .meta-table td { padding: 8px 12px; font-size: 10pt; border: 1px solid #e2e8f0; }
          .meta-title { font-weight: bold; background-color: #f1f5f9; color: #334155; width: 28%; }
          h2 { color: #00324d; font-size: 13pt; margin-top: 25px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; }
          .step-card { border: 1px solid #e2e8f0; border-left: 5px solid #39a900; background-color: #ffffff; padding: 14px; margin-bottom: 16px; }
          .step-title { font-size: 12pt; font-weight: bold; color: #00324d; margin-top: 0; }
          .step-desc { font-size: 10.5pt; color: #475569; margin-bottom: 8px; }
          ol { margin-top: 4px; margin-bottom: 8px; padding-left: 20px; }
          li { font-size: 10pt; color: #334155; margin-bottom: 4px; }
          .tip { background-color: #fffbeb; border: 1px solid #fef3c7; border-left: 4px solid #d97706; padding: 8px 12px; font-size: 9.5pt; color: #92400e; margin-top: 8px; }
          .faq-card { border: 1px solid #e2e8f0; background-color: #f8fafc; padding: 10px 14px; margin-bottom: 10px; }
          .faq-q { font-weight: bold; font-size: 10.5pt; color: #00324d; margin: 0 0 4px 0; }
          .faq-a { font-size: 9.5pt; color: #475569; margin: 0; }
          .footer { margin-top: 40px; border-top: 1px solid #cbd5e1; padding-top: 15px; text-align: center; font-size: 9pt; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="header-box">
          <p class="institution">SERVICIO NACIONAL DE APRENDIZAJE - SENA</p>
          <p class="sub-inst">Dirección de Formación Profesional Integral · Inducción Integral 360°</p>
          <h1>MANUAL DE INDUCCIÓN DEL APRENDIZ</h1>
          <p class="subtitle">Guía de Procedimiento, Deberes y Certificación conforme al Acuerdo 009 de 2024</p>
        </div>

        <table class="meta-table">
          <tr>
            <td class="meta-title">Nombre del Aprendiz:</td>
            <td><strong>${apprenticeName}</strong></td>
            <td class="meta-title">Documento de Identidad:</td>
            <td><strong>${docType} ${docNum}</strong></td>
          </tr>
          <tr>
            <td class="meta-title">Número de Ficha SENA:</td>
            <td><strong>${ficha}</strong></td>
            <td class="meta-title">Programa de Formación:</td>
            <td><strong>${program}</strong></td>
          </tr>
          <tr>
            <td class="meta-title">Regional / Centro:</td>
            <td>${regional} · ${center}</td>
            <td class="meta-title">Fecha de Emisión:</td>
            <td>${currentDateFormatted}</td>
          </tr>
          <tr>
            <td class="meta-title">Avance en la Plataforma:</td>
            <td colspan="3">${totalStepsCompleted} de 5 pasos completados (${Math.round((totalStepsCompleted / 5) * 100)}%)</td>
          </tr>
        </table>

        <h2>1. INTRODUCCIÓN Y MARCO NORMATIVO</h2>
        <p>El presente manual orienta al aprendiz durante el proceso de inducción a la Formación Profesional Integral del SENA. Este marco se fundamenta en el <strong>Acuerdo 009 de 2024</strong> del Consejo Directivo Nacional, el cual actualizó el Reglamento del Aprendiz con énfasis en:</p>
        <ul>
          <li><strong>Enfoque diferencial e inclusión:</strong> Garantía de no discriminación y accesibilidad formativa.</li>
          <li><strong>Cero tolerancia al acoso:</strong> Adopción de la Ley 2365 de 2024 para la prevención de violencia y acoso de género en ambientes formativos presenciales y virtuales.</li>
          <li><strong>Integridad y uso ético de tecnologías:</strong> Lineamientos sobre el empleo responsable de Inteligencia Artificial como herramienta pedagógica sin suplantación de autoría.</li>
          <li><strong>Garantías al Debido Proceso:</strong> Comité de Evaluación y Seguimiento con derecho a ser escuchado, presentar pruebas y contradicción de faltas.</li>
        </ul>

        <h2>2. RUTA DE INDUCCIÓN PASO A PASO</h2>
        ${steps.map(s => `
          <div class="step-card">
            <h3 class="step-title">${s.title}</h3>
            <p class="step-desc"><strong>Objetivo:</strong> ${s.description}</p>
            <p style="font-weight: bold; margin-bottom: 4px; font-size: 10pt;">Instrucciones para cumplirlo:</p>
            <ol>
              ${s.instructions.map(inst => `<li>${inst}</li>`).join('')}
            </ol>
            <div class="tip">
              <strong>Recomendación institucional:</strong> ${s.tip}
            </div>
          </div>
        `).join('')}

        <h2>3. CRITERIOS DE EVALUACIÓN Y CERTIFICACIÓN</h2>
        <p>Para obtener la constancia oficial de inducción, el aprendiz debe cumplir los siguientes requisitos en el sistema:</p>
        <ul>
          <li>Haber realizado la caracterización con su documento de identidad y ficha activa.</li>
          <li>Revisar los módulos formativos de derechos, deberes y trámites académicos.</li>
          <li>Aprobar la Evaluación Final de Conocimientos con un porcentaje <strong>mínimo del 70%</strong> (7 de 10 preguntas acertadas).</li>
          <li>El sistema genera automáticamente el <em>Certificado Institucional de Inducción 360°</em> con código de verificación QR.</li>
        </ul>

        <h2>4. PREGUNTAS FRECUENTES Y PROCEDIMIENTOS CLAVE</h2>
        <div class="faq-card">
          <p class="faq-q">¿Se guarda mi avance si cierro la página o cambio de dispositivo?</p>
          <p class="faq-a">Sí. Toda la información registrada se sincroniza de forma segura en la nube vinculada a tu número de documento de identidad.</p>
        </div>
        <div class="faq-card">
          <p class="faq-q">¿Qué hago si comparto computador en un ambiente del Centro de Formación?</p>
          <p class="faq-a">Debes presionar el botón "Salir" en la barra superior. Esto cierra tu sesión de forma segura y permite que otro aprendiz inicie con su documento sin riesgo de sobreescritura.</p>
        </div>
        <div class="faq-card">
          <p class="faq-q">¿Cuántos intentos tengo para presentar la evaluación?</p>
          <p class="faq-a">Los intentos son ilimitados. Puedes repasar los módulos y repetirla hasta alcanzar el 70% requerido para certificarte.</p>
        </div>

        <div class="footer">
          <p><strong>Servicio Nacional de Aprendizaje SENA</strong> · Dirección General · Formación Profesional Integral</p>
          <p>Documento generado el ${currentDateFormatted} · Válido como guía oficial del proceso de inducción.</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', wordContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Manual_Induccion_SENA_Acuerdo_009_2024.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccessMsg('¡Documento Word (.doc) descargado correctamente!');
    setTimeout(() => setDownloadSuccessMsg(null), 4000);
  };

  // Function to download as Markdown / Plain Text
  const handleDownloadMarkdown = () => {
    const apprenticeName = profile?.fullName || 'Aprendiz SENA (Sin registrar)';
    const docType = profile?.documentType || 'CC';
    const docNum = profile?.documentNumber || 'Pendiente';
    const ficha = profile?.fichaNumber || 'Pendiente';
    const program = profile?.programName || 'Programa de Formación Profesional Integral';

    const mdContent = `# SERVICIO NACIONAL DE APRENDIZAJE - SENA
## MANUAL OFICIAL DE INDUCCIÓN DEL APRENDIZ
### Acuerdo 009 de 2024 - Inducción Integral 360°

---
**DATOS DEL APRENDIZ**
- **Nombre:** ${apprenticeName}
- **Documento:** ${docType} ${docNum}
- **Ficha SENA:** ${ficha}
- **Programa:** ${program}
- **Fecha:** ${currentDateFormatted}
- **Avance registrado:** ${totalStepsCompleted} de 5 pasos (${Math.round((totalStepsCompleted / 5) * 100)}%)
---

## 1. MARCO NORMATIVO INSTITUCIONAL
El proceso formativo en el SENA se rige por el Acuerdo 009 de 2024 del Consejo Directivo Nacional, que moderniza el Reglamento del Aprendiz con énfasis en:
1. Enfoque diferencial, inclusión y respeto por la diversidad.
2. Política de cero tolerancia al acoso (Ley 2365 de 2024).
3. Uso responsable y ético de la Inteligencia Artificial.
4. Garantías al Debido Proceso y Comités de Seguimiento.

---

## 2. RUTA DE INDUCCIÓN PASO A PASO

${steps.map(s => `### ${s.title}
**Descripción:** ${s.description}

**Instrucciones:**
${s.instructions.map((inst, i) => `${i + 1}. ${inst}`).join('\n')}

> **Recomendación:** ${s.tip}
`).join('\n---\n\n')}

## 3. CRITERIOS DE APROBACIÓN
- Aprobación de la Evaluación Final de Conocimientos con mínimo el 70%.
- Generación y descarga del Certificado Oficial con código QR de verificación.

---
*Servicio Nacional de Aprendizaje SENA · Guía Oficial de Inducción*
`;

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Manual_Induccion_SENA_Acuerdo_009_2024.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccessMsg('¡Documento Markdown (.md) descargado correctamente!');
    setTimeout(() => setDownloadSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Printable Manual Component (visible only during window.print()) */}
      <div id="printable-manual" className="hidden print:block text-slate-900 bg-white">
        <div className="border-b-2 border-[#39A900] pb-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={SENA_OFFICIAL_LOGO_DATA_URI}
                alt="Logo SENA"
                className="w-14 h-14 object-contain"
              />
              <div>
                <h1 className="text-xl font-black text-[#00324D] tracking-tight uppercase">
                  Servicio Nacional de Aprendizaje - SENA
                </h1>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Dirección de Formación Profesional Integral · Inducción Integral 360°
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#39A900] bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                Acuerdo 009 de 2024
              </span>
              <p className="text-[10px] text-slate-500 mt-1">Fecha: {currentDateFormatted}</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200">
            <h2 className="text-base font-extrabold text-[#00324D]">
              MANUAL OFICIAL DE INDUCCIÓN Y GUÍA DEL APRENDIZ
            </h2>
            <p className="text-xs text-slate-600">
              Instructivo integral paso a paso para el cumplimiento de etapas y certificación formativa.
            </p>
          </div>
        </div>

        {/* Apprentice Info Table in Print */}
        <div className="mb-6 p-4 rounded border border-slate-300 bg-slate-50/70 text-xs">
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            <div>
              <span className="font-bold text-slate-700">Aprendiz: </span>
              <span>{profile?.fullName || 'Aprendiz SENA (Sin caracterizar)'}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700">Documento: </span>
              <span>{profile?.documentType || 'CC'} {profile?.documentNumber || 'Pendiente'}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700">Ficha de Formación: </span>
              <span className="font-mono">{profile?.fichaNumber || 'Pendiente'}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700">Programa: </span>
              <span>{profile?.programName || 'Formación Profesional Integral'}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700">Regional / Centro: </span>
              <span>{profile?.regional || 'No especificada'} · {profile?.centerName || 'No especificado'}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700">Avance Registrado: </span>
              <span>{totalStepsCompleted} de 5 fases completadas ({Math.round((totalStepsCompleted / 5) * 100)}%)</span>
            </div>
          </div>
        </div>

        {/* Legal Framework Summary in Print */}
        <div className="mb-6 pb-4 border-b border-slate-200 text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#00324D] mb-1.5">
            1. Marco Normativo y Enfoque Institucional
          </h3>
          <p className="text-slate-700 leading-relaxed">
            El Acuerdo 009 de 2024 del Consejo Directivo Nacional actualiza el Reglamento del Aprendiz SENA incorporando el enfoque diferencial e inclusión social, la Ley 2365 de 2024 para la prevención y sanción del acoso en entornos de aprendizaje, normas de integridad y uso ético de tecnologías de Inteligencia Artificial, y plenas garantías al Debido Proceso formativo.
          </p>
        </div>

        {/* All 5 Steps Detailed in Print */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#00324D]">
            2. Ruta de Inducción Paso a Paso
          </h3>
          {steps.map((st) => (
            <div key={st.id} className="p-3.5 rounded border border-slate-300 bg-white break-inside-avoid">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-extrabold text-sm text-[#00324D]">
                  {st.title}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
                  {st.isCompleted ? 'Estado: Completado' : 'Estado: Pendiente'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                {st.description}
              </p>
              <div className="text-xs space-y-1 mb-2">
                <p className="font-bold text-slate-800">Instrucciones requeridas:</p>
                <ol className="list-decimal pl-5 space-y-0.5 text-slate-700">
                  {st.instructions.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ol>
              </div>
              <div className="p-2 rounded bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                <strong>Recomendación: </strong>{st.tip}
              </div>
            </div>
          ))}
        </div>

        {/* Certification Criteria */}
        <div className="mb-6 p-4 rounded border border-slate-300 bg-slate-50 text-xs break-inside-avoid">
          <h3 className="font-bold text-sm text-[#00324D] mb-1">
            3. Criterios de Evaluación y Aprobación
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Caracterización completa con documento de identidad y ficha activa.</li>
            <li>Revisión de los módulos normativos del Acuerdo 009 de 2024.</li>
            <li>Aprobación de la evaluación final con una calificación <strong>mínima del 70%</strong>.</li>
            <li>Emisión del Certificado Institucional Oficial con código de verificación QR.</li>
          </ul>
        </div>

        {/* FAQ in Print */}
        <div className="mb-6 text-xs break-inside-avoid">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#00324D] mb-2">
            4. Preguntas Frecuentes y Soporte
          </h3>
          <div className="space-y-2">
            <div className="p-2.5 rounded border border-slate-200 bg-white">
              <p className="font-bold text-slate-800">¿Qué hago si comparto computador en el Centro?</p>
              <p className="text-slate-600">Utiliza el botón 'Salir' en la plataforma para cerrar tu sesión y permitir que otro compañero ingrese sus propios datos sin riesgo de sobreescritura.</p>
            </div>
            <div className="p-2.5 rounded border border-slate-200 bg-white">
              <p className="font-bold text-slate-800">¿Cómo entrego la constancia de inducción?</p>
              <p className="text-slate-600">Al aprobar la evaluación, ingresa a la pestaña Certificado y descárgalo o imprímelo para entregarlo a tu instructor técnico o de inducción.</p>
            </div>
          </div>
        </div>

        {/* Footer in Print */}
        <div className="pt-4 border-t border-slate-300 text-center text-[10px] text-slate-500">
          <p>Servicio Nacional de Aprendizaje SENA · Formación Profesional Integral de Calidad</p>
          <p>Documento oficial emitido por la Plataforma Institucional de Inducción 360°</p>
        </div>
      </div>
      
      {/* SCREEN VIEW (Everything below is interactive on screen) */}

      {/* Header Banner with Download Actions */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-[#00324D] dark:from-slate-950 dark:via-slate-900 dark:to-[#002235] text-white p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span className="uppercase tracking-widest">Instructivo Oficial de la Plataforma</span>
              <span>·</span>
              <span>Acuerdo 009 de 2024</span>
              <span>·</span>
              <span className="text-slate-300">Descargable</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Manual de Inducción: Guía Paso a Paso para el Aprendiz
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Sigue esta guía secuencial para saber exactamente cómo diligenciar tus datos, estudiar el nuevo reglamento, resolver los casos prácticos y aprobar la evaluación final para obtener tu <strong>Certificado Oficial SENA</strong>.
            </p>
          </div>

          {/* Download Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={handlePrintDocument}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap active:scale-95"
              title="Descargar en PDF o imprimir este manual con formato institucional"
            >
              <Printer className="w-4 h-4" />
              <span>Descargar PDF / Imprimir</span>
            </button>

            <button
              onClick={handleDownloadWordDoc}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all backdrop-blur-xs cursor-pointer whitespace-nowrap active:scale-95"
              title="Descargar como documento editable de Word (.doc)"
            >
              <FileDown className="w-4 h-4 text-emerald-400" />
              <span>Descargar Word (.doc)</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center justify-center gap-2 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
              title="Descargar archivo en texto / Markdown (.md)"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Descargar Texto (.md)</span>
            </button>
          </div>
        </div>

        {/* Ambient Blur */}
        <div className="hidden lg:block absolute -right-6 -bottom-6 w-64 h-64 rounded-full bg-[#39A900]/15 blur-3xl pointer-events-none" />
      </div>

      {/* Success Notification Toast */}
      {downloadSuccessMsg && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-semibold animate-fadeIn shadow-xs">
          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{downloadSuccessMsg}</span>
        </div>
      )}

      {/* Apprentice Quick Status Summary Bar */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#39A900]/10 dark:bg-[#39A900]/20 flex items-center justify-center text-[#39A900] dark:text-[#52c41a] font-bold">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">
              {profile?.fullName || 'Aprendiz sin caracterizar'}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              {profile?.documentType || 'Doc'}: {profile?.documentNumber || 'Pendiente'} · Ficha: {profile?.fichaNumber || 'Pendiente'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 dark:text-slate-400">¿Necesitas el documento impreso o en PDF?</span>
          <button
            onClick={handlePrintDocument}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-[#39A900] text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#39A900]" />
            <span>Guardar Copia</span>
          </button>
        </div>
      </div>

      {/* Progress Checklist Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Tu Progreso en la Ruta de Inducción</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Has completado {totalStepsCompleted} de los 5 pasos requeridos para certificarte.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Avance general:
            </span>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              {Math.round((totalStepsCompleted / 5) * 100)}%
            </span>
          </div>
        </div>

        {/* 5-Step interactive selector tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {steps.map((st) => {
            const isCurrent = activeStepTab === st.stepNumber;
            const Icon = st.icon;

            return (
              <button
                key={st.id}
                onClick={() => setActiveStepTab(st.stepNumber)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isCurrent
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/60 border-[#39A900] ring-2 ring-[#39A900]/20 shadow-xs'
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-1.5 rounded-lg ${
                    st.isCompleted 
                      ? 'bg-emerald-500 text-white' 
                      : isCurrent
                      ? 'bg-[#39A900] text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {st.isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    st.isCompleted
                      ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                      : 'bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {st.badgeText}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {st.shortTitle}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {st.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Detailed Guide Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        {/* Step Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] dark:text-[#52c41a] flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800/60 shadow-xs">
              {React.createElement(currentStep.icon, { className: "w-6 h-6" })}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#39A900] dark:text-[#52c41a]">
                  Fase {currentStep.stepNumber} de 5
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  currentStep.isCompleted
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                }`}>
                  {currentStep.isCompleted ? '✓ Completado por ti' : 'Pendiente de realizar'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {currentStep.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {currentStep.subtitle}
              </p>
            </div>
          </div>

          {/* Direct Shortcut Action */}
          <button
            onClick={currentStep.action}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#39A900] hover:bg-[#329200] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            <span>{currentStep.actionLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Step Explanation */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            ¿En qué consiste este paso?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {currentStep.description}
          </p>
        </div>

        {/* Step-by-Step Instructions List */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Instrucciones para cumplirlo con éxito:
          </h3>
          <div className="grid grid-cols-1 gap-2.5">
            {currentStep.instructions.map((inst, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {inst}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tip Callout */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-300 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Recomendación clave: </span>
            <span>{currentStep.tip}</span>
          </div>
        </div>

        {/* Pagination between steps */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            disabled={activeStepTab === 1}
            onClick={() => setActiveStepTab((prev) => Math.max(1, prev - 1))}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            ← Paso Anterior
          </button>

          <span className="text-xs text-slate-400 font-mono">
            {activeStepTab} de 5
          </span>

          <button
            disabled={activeStepTab === 5}
            onClick={() => setActiveStepTab((prev) => Math.min(5, prev + 1))}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            Siguiente Paso →
          </button>
        </div>

      </div>

      {/* Frequently Asked Questions & Operational Tips */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Preguntas Frecuentes y Consejos Importantes
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handleDownloadWordDoc}
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#39A900] dark:hover:text-[#52c41a] flex items-center gap-1.5 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Guardar en Word</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>¿Se guarda mi avance si cierro la página?</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Sí. Toda la información que registras (módulos leídos, casos resueltos, puntaje del quiz y tu perfil) queda guardada en tu navegador y sincronizada permanentemente en la nube. Puedes regresar en cualquier momento.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <LogOut className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>¿Qué hago si comparto computador en el Centro?</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Usa el botón <strong>"Salir"</strong> en la parte superior derecha. Esto cerrará tu sesión de forma segura y dejará el computador listo para que otro compañero ingrese su propio documento sin mezclar sus datos con los tuyos.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>¿Qué pasa si repruebo la evaluación?</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              No hay penalizaciones ni límites de intentos. Si obtienes menos del 70%, puedes revisar nuevamente los módulos del reglamento, consultar el glosario y volver a presentar la prueba hasta aprobarla.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-[#39A900] dark:text-[#52c41a]" />
              <span>¿Cómo entrego mi certificado al instructor?</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Al aprobar la evaluación, ve a la pestaña <strong>"Certificado"</strong>. Puedes presionar el botón <strong>"Imprimir Certificado"</strong> para guardarlo en formato PDF o imprimirlo en papel para entregarlo como evidencia de inducción.
            </p>
          </div>

        </div>

        {/* Quick Navigation Footer with Download Options */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>Servicio Nacional de Aprendizaje SENA · Inducción Integral 360°</span>
            <span>·</span>
            <button
              onClick={handlePrintDocument}
              className="text-[#39A900] dark:text-[#52c41a] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>
            <span>·</span>
            <button
              onClick={handleDownloadWordDoc}
              className="text-[#39A900] dark:text-[#52c41a] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Descargar .doc</span>
            </button>
          </div>

          <button
            onClick={() => onNavigate('plan')}
            className="font-bold text-[#39A900] dark:text-[#52c41a] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Volver a la Ruta Principal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
