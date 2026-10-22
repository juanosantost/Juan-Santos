import React, { useState } from 'react';
import { QUIZ_QUESTIONS, CASE_DILEMMAS, SENA_REGULATION_INFO } from '../data/senaData';
import { ApprenticeProfile, UserProgress } from '../types/sena';
import { SpreadsheetInfo } from '../services/googleSheetsService';
import { 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle, 
  FileSpreadsheet, 
  Search, 
  Users, 
  Award, 
  Sliders, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Download,
  BookOpen,
  Scale,
  Lock
} from 'lucide-react';

interface AdminDashboardProps {
  currentProfile: ApprenticeProfile;
  currentProgress: UserProgress;
  spreadsheetInfo: SpreadsheetInfo | null;
  onOpenCertificateForApprentice?: (profile: ApprenticeProfile, progress: UserProgress) => void;
  onManualSync: () => void;
  onLockAdmin?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentProfile,
  currentProgress,
  spreadsheetInfo,
  onOpenCertificateForApprentice,
  onManualSync,
  onLockAdmin,
}) => {
  const [adminTab, setAdminTab] = useState<'answers' | 'learners' | 'dilemmas' | 'settings'>('answers');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(null);

  // Registered learners mock/cache including current active learner
  const learnersList = [
    {
      profile: currentProfile,
      progress: currentProgress,
      registrationDate: '2024-10-21',
    },
    {
      profile: {
        fullName: 'Valentina Restrepo Henao',
        documentType: 'CC' as const,
        documentNumber: '1020492811',
        fichaNumber: '2874102',
        programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
        centerName: 'Centro de Gestión de Mercados, Logística y TIC',
        regional: 'Distrito Capital',
      },
      progress: {
        completedModules: ['mod-1', 'mod-2', 'mod-3', 'mod-4'],
        completedCases: ['caso-1', 'caso-2', 'caso-3', 'caso-4', 'caso-5'],
        quizPassed: true,
        quizScore: 10,
        xp: 1250,
        level: 3,
        badges: ['badge-onboarding', 'badge-rights', 'badge-duties', 'badge-dilemma-master', 'badge-certified'],
        certificateIssuedDate: '21 de octubre de 2024',
        certificateCode: 'SENA-IND-2024-F2874102-9982X',
      },
      registrationDate: '2024-10-20',
    },
    {
      profile: {
        fullName: 'Carlos Andrés Meza Mora',
        documentType: 'TI' as const,
        documentNumber: '1075849200',
        fichaNumber: '2874102',
        programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
        centerName: 'Centro de Gestión de Mercados, Logística y TIC',
        regional: 'Distrito Capital',
      },
      progress: {
        completedModules: ['mod-1', 'mod-2'],
        completedCases: ['caso-1', 'caso-2'],
        quizPassed: false,
        quizScore: 6,
        xp: 450,
        level: 1,
        badges: ['badge-onboarding'],
      },
      registrationDate: '2024-10-19',
    },
  ];

  const filteredLearners = learnersList.filter(
    (l) =>
      l.profile.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.profile.documentNumber.includes(searchTerm) ||
      l.profile.fichaNumber.includes(searchTerm)
  );

  const toggleQuestion = (id: string) => {
    setExpandedQuestionId(expandedQuestionId === id ? null : id);
  };

  const toggleCase = (id: string) => {
    setExpandedCaseId(expandedCaseId === id ? null : id);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Admin Space Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#00324D] text-white p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>PANEL DE CONTROL DEL ADMINISTRADOR / INSTRUCTOR SENA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Gestión y Supervisión de Inducción
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Vista exclusiva para instructores y coordinadores. Consulta las respuestas oficiales del reglamento, audita el progreso de las fichas y supervisa la sincronización con Google Drive.
            </p>
          </div>

          {/* Quick Metrics and Lock Button */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-3 rounded-xl border border-slate-700">
              <div className="text-right">
                <p className="text-[11px] text-slate-400 font-mono">Ficha Activa</p>
                <p className="text-sm font-bold text-white font-mono">{currentProfile.fichaNumber || '2874102'}</p>
              </div>
              <div className="h-8 w-px bg-slate-700" />
              <div className="text-right">
                <p className="text-[11px] text-slate-400 font-mono">Normativa</p>
                <p className="text-xs font-bold text-emerald-400">Acuerdo 009/2024</p>
              </div>
            </div>

            {onLockAdmin && (
              <button
                onClick={onLockAdmin}
                title="Bloquear acceso administrativo y regresar al modo aprendiz"
                className="flex items-center gap-1.5 px-3 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-xs font-bold transition-all shadow-2xs"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Bloquear y Salir</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setAdminTab('answers')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            adminTab === 'answers'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Banco y Respuestas Oficiales ({QUIZ_QUESTIONS.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('dilemmas')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            adminTab === 'dilemmas'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Respuestas de Dilemas ({CASE_DILEMMAS.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('learners')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            adminTab === 'learners'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Aprendices y Calificaciones</span>
        </button>

        <button
          onClick={() => setAdminTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            adminTab === 'settings'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Parámetros del Sistema</span>
        </button>
      </div>

      {/* Tab 1: Answers Console (Official Exam Answers & Legal Foundation) */}
      {adminTab === 'answers' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Consola de Respuestas de la Evaluación Final
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Puntaje mínimo de aprobación: 70% (7 de 10). A continuación se detallan las respuestas correctas y su sustento normativo.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 self-start">
              100% Alineado con Acuerdo 009 de 2024
            </span>
          </div>

          <div className="space-y-3">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const isExpanded = expandedQuestionId === q.id;
              return (
                <div
                  key={q.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => toggleQuestion(q.id)}
                    className="w-full text-left p-4 flex items-start justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-md bg-[#39A900] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {q.question}
                        </h4>
                        <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                          Respuesta Correcta: {String.fromCharCode(65 + q.correctIndex)}. {q.options[q.correctIndex]}
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-950/40 text-xs">
                      <div className="space-y-1.5">
                        <p className="font-semibold text-slate-700 dark:text-slate-300">Opciones evaluadas:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, optIdx) => (
                            <div
                              key={optIdx}
                              className={`p-2.5 rounded-lg border text-xs ${
                                optIdx === q.correctIndex
                                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 font-bold flex items-center justify-between'
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                              {optIdx === q.correctIndex && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                        <p className="font-bold text-slate-800 dark:text-slate-200">Justificación Pedagógica:</p>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{q.explanation}</p>
                        <p className="text-[11px] font-mono text-[#39A900] dark:text-[#52c41a] pt-1">
                          <strong>Artículo / Marco Legal:</strong> {q.legalArticle}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Dilemma Simulator Answers & Consequences */}
      {adminTab === 'dilemmas' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Solucionario del Simulador de Dilemas Formativos
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Guía de resolución de los 5 casos de convivencia, integridad académica, Ley 2365 de 2024 y etapa productiva.
            </p>
          </div>

          <div className="space-y-3">
            {CASE_DILEMMAS.map((c, idx) => {
              const isExpanded = expandedCaseId === c.id;
              const correctChoice = c.choices.find((ch) => ch.isCorrect);

              return (
                <div
                  key={c.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => toggleCase(c.id)}
                    className="w-full text-left p-4 flex items-start justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-[#39A900] uppercase">
                          Caso 0{idx + 1} · {c.category}
                        </span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{c.character} ({c.role})</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        {c.title}
                      </h4>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mt-1 line-clamp-1">
                        Decisión esperada: {correctChoice?.text}
                      </p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4 bg-slate-50/50 dark:bg-slate-950/40 text-xs">
                      <div>
                        <p className="font-semibold text-slate-700 dark:text-slate-300">Contexto del Caso:</p>
                        <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                          {c.scenario}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="font-semibold text-slate-700 dark:text-slate-300">Análisis de Decisiones y Consecuencias:</p>
                        <div className="space-y-2">
                          {c.choices.map((choice) => (
                            <div
                              key={choice.id}
                              className={`p-3 rounded-lg border text-xs space-y-1 ${
                                choice.isCorrect
                                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 font-medium'
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 font-bold">
                                {choice.isCorrect ? (
                                  <span className="text-[#39A900] dark:text-[#52c41a]">✓ Opción Correcta (+{choice.xpReward} XP):</span>
                                ) : (
                                  <span className="text-rose-600 dark:text-rose-400">✗ Opción Errada:</span>
                                )}
                                <span>{choice.text}</span>
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                <strong>Consecuencia:</strong> {choice.consequence}
                              </p>
                              <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                                <strong>Fundamento:</strong> {choice.legalBasis}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Learners Registry & Gradebook */}
      {adminTab === 'learners' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Registro de Aprendices en Inducción
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Audita el estado de avance, puntaje obtenido y certificados generados.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {spreadsheetInfo?.webViewLink && (
                <a
                  href={spreadsheetInfo.webViewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xs"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Abrir Hoja Google Drive</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              )}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, documento o ficha..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]"
            />
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 font-semibold">
                  <tr>
                    <th className="p-3.5">Aprendiz</th>
                    <th className="p-3.5">Documento</th>
                    <th className="p-3.5">Ficha</th>
                    <th className="p-3.5">Módulos</th>
                    <th className="p-3.5">Evaluación</th>
                    <th className="p-3.5">XP</th>
                    <th className="p-3.5">Estado</th>
                    <th className="p-3.5 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  {filteredLearners.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold">
                        <div>
                          <p>{item.profile.fullName}</p>
                          <p className="text-[10px] text-slate-400 font-normal truncate max-w-[200px]">
                            {item.profile.programName}
                          </p>
                        </div>
                      </td>
                      <td className="p-3.5 font-mono">
                        {item.profile.documentType} {item.profile.documentNumber}
                      </td>
                      <td className="p-3.5 font-mono">{item.profile.fichaNumber}</td>
                      <td className="p-3.5 font-mono">
                        {item.progress.completedModules.length}/4
                      </td>
                      <td className="p-3.5">
                        <span className={`font-mono font-bold ${item.progress.quizPassed ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-600'}`}>
                          {item.progress.quizScore}/10
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                        {item.progress.xp} XP
                      </td>
                      <td className="p-3.5">
                        {item.progress.quizPassed ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Certificado
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[10px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                            En Curso
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        {item.progress.quizPassed && onOpenCertificateForApprentice && (
                          <button
                            onClick={() => onOpenCertificateForApprentice(item.profile, item.progress)}
                            className="text-xs text-[#39A900] dark:text-[#52c41a] font-semibold hover:underline"
                          >
                            Ver Certificado
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: System & Induction Settings */}
      {adminTab === 'settings' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Parámetros Institucionales del Sistema
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Configuraciones rectoras para la certificación y el proceso de inducción.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-slate-500 dark:text-slate-400 font-semibold">Norma Jurídica Aplicada</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{SENA_REGULATION_INFO.normaPrincipal}</p>
              <p className="text-[11px] text-slate-400">Deroga el Acuerdo 007 de 2012 y normas afines.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-slate-500 dark:text-slate-400 font-semibold">Nota Mínima Aprobatoria</span>
              <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 font-mono">70% (7 de 10 aciertos)</p>
              <p className="text-[11px] text-slate-400">Requerido para habilitar la expedición del certificado.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-slate-500 dark:text-slate-400 font-semibold">Horas Certificadas de Inducción</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white font-mono">40 Horas Académicas</p>
              <p className="text-[11px] text-slate-400">Intensidad reglamentaria de la Formación Profesional Integral.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-slate-500 dark:text-slate-400 font-semibold">Protocolo de Convivencia Integrado</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Ley 2365 de 2024</p>
              <p className="text-[11px] text-slate-400">Ruta prioritaria contra el acoso sexual y violencias de género.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Sincronización activa con Google Drive & LocalStorage del navegador.
            </span>
            <button
              onClick={onManualSync}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#329200] rounded-lg transition-colors shadow-xs"
            >
              <span>Forzar Sincronización a Google Drive</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
