import React from 'react';
import { SENA_REGULATION_INFO, LEARNING_MODULES, CASE_DILEMMAS } from '../data/senaData';
import { UserProgress, Badge } from '../types/sena';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Scale, 
  Award, 
  Gamepad2, 
  BookMarked,
  Layers,
  GraduationCap,
  FileText,
  Play,
  Tv
} from 'lucide-react';

interface InductionRoadmapProps {
  progress: UserProgress;
  badges: Badge[];
  onNavigate: (tab: 'modules' | 'simulator' | 'quiz' | 'glossary' | 'manual' | 'certificate' | 'plan') => void;
  onOpenCertificate: () => void;
  onOpenVideo?: (seekTime?: number) => void;
}

export const InductionRoadmap: React.FC<InductionRoadmapProps> = ({
  progress,
  badges,
  onNavigate,
  onOpenCertificate,
  onOpenVideo,
}) => {
  const completedModulesCount = progress.completedModules.length;
  const totalModules = LEARNING_MODULES.length;
  const completedCasesCount = progress.completedCases.length;
  const totalCases = CASE_DILEMMAS.length;

  const planPhases = [
    {
      phaseNumber: "Fase 01",
      title: "Fundamentación & Nuevo Marco Normativo",
      description: "Apropiación de la identidad SENA, símbolos, misión de la Formación Profesional Integral y análisis del Acuerdo 009 de 2024 (enfoque diferencial, inclusión y Ley 2365 de 2024).",
      actionText: "Explorar Módulo 1",
      tab: 'modules' as const,
      isDone: progress.completedModules.includes('mod-1'),
      icon: Layers,
    },
    {
      phaseNumber: "Fase 02",
      title: "Dominio de Derechos y Deberes del Aprendiz",
      description: "Comprensión exhaustiva de derechos académicos/comportamentales, carné, representación, integridad académica con IA ética, debido proceso y cuidado ambiental.",
      actionText: "Estudiar Derechos & Deberes",
      tab: 'modules' as const,
      isDone: progress.completedModules.includes('mod-2') && progress.completedModules.includes('mod-3'),
      icon: Scale,
    },
    {
      phaseNumber: "Fase 03",
      title: "Simulador de Dilemas y Convivencia Formativa",
      description: "Entrenamiento gamificado resolviendo 5 casos reales en centros de formación (dilemas de autoría con IA, prevención de acoso, trámites de aplazamiento y alternativas de etapa productiva).",
      actionText: "Entrar al Simulador",
      tab: 'simulator' as const,
      isDone: completedCasesCount >= 3,
      icon: Gamepad2,
    },
    {
      phaseNumber: "Fase 04",
      title: "Evaluación Gamificada & Certificación Oficial",
      description: "Validación de competencias con 10 preguntas reglamentarias fundamentadas en el Acuerdo 009 de 2024. Al alcanzar ≥70% se emite el Certificado de Inducción con código QR de verificación.",
      actionText: progress.quizPassed ? "Ver Certificado" : "Iniciar Evaluación Final",
      tab: progress.quizPassed ? ('modules' as const) : ('quiz' as const),
      isDone: progress.quizPassed,
      icon: GraduationCap,
    },
  ];

  return (
    <div className="space-y-10">
      
      {/* Hero Banner with Official Framing */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-[#00324D] dark:from-slate-950 dark:via-slate-900 dark:to-[#002235] text-white p-8 sm:p-10 border border-slate-800 dark:border-slate-800/80 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <span className="uppercase tracking-widest">Plan Maestro de Inducción</span>
            <span>·</span>
            <span>SENA Colombia 2024</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Inducción Integral del Aprendiz SENA
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Plataforma interactiva para conocer el nuevo <strong className="text-white font-semibold">{SENA_REGULATION_INFO.normaPrincipal}</strong>, comprender derechos y deberes, resolver dilemas reales de convivencia y obtener tu <strong className="text-emerald-400 font-semibold">Certificado Institucional de Inducción</strong>.
          </p>

          {/* Hero Action Buttons */}
          {onOpenVideo && (
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenVideo()}
                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                title="Reproducir video tutorial explicativo en ventana flotante"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-white ml-0.5" />
                </div>
                <span>Ver Video Tutorial (2:22 min)</span>
              </button>

              <button
                onClick={() => onNavigate('manual')}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Manual de Inducción</span>
              </button>
            </div>
          )}

          {/* Quick Stats Strip */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-700/60 text-xs">
            <div>
              <p className="text-slate-400">Norma Vigente</p>
              <p className="font-semibold text-white mt-0.5">Acuerdo 009 de 2024</p>
            </div>
            <div>
              <p className="text-slate-400">Progreso Módulos</p>
              <p className="font-semibold text-white mt-0.5 font-mono tabular-nums">
                {completedModulesCount}/{totalModules} Completados
              </p>
            </div>
            <div>
              <p className="text-slate-400">Casos Resueltos</p>
              <p className="font-semibold text-white mt-0.5 font-mono tabular-nums">
                {completedCasesCount}/{totalCases} Desafíos
              </p>
            </div>
            <div>
              <p className="text-slate-400">Estado Certificación</p>
              <p className={`font-semibold mt-0.5 ${progress.quizPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
                {progress.quizPassed ? 'Aprobado y Emitido' : 'Pendiente Evaluación'}
              </p>
            </div>
          </div>
        </div>

        {/* Ambient Badge Decorator */}
        <div className="hidden lg:block absolute -right-6 -bottom-6 w-72 h-72 rounded-full bg-[#39A900]/10 blur-3xl pointer-events-none" />
      </div>

      {/* Video Tutorial Interactive Showcase Card */}
      {onOpenVideo && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-slate-800 p-5 sm:p-6 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              {/* Video Preview Thumbnail / Play Button */}
              <div 
                onClick={() => onOpenVideo()} 
                className="group relative w-24 h-20 sm:w-36 sm:h-24 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden shrink-0 cursor-pointer flex items-center justify-center shadow-md hover:border-emerald-500 transition-all"
                title="Clic para ver video tutorial en ventana flotante"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/70 via-slate-900/80 to-emerald-900/50" />
                <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-400 transition-all shadow-lg">
                  <Play className="w-5 h-5 ml-0.5 fill-white" />
                </div>
                <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] font-mono text-emerald-300 px-1.5 py-0.5 rounded">
                  2:22
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Tv className="w-3 h-3" />
                    <span>Video Tutorial Oficial 2024</span>
                  </span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs text-slate-300">Acuerdo 009 de 2024</span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs text-emerald-400 font-semibold">Ventana Flotante</span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-white">
                  Ruta de Inducción SENA: Guía Interactiva en Video
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Conoce visualmente los 4 pilares formativos, cómo diligenciar tu documento, estudiar los módulos de derechos y deberes, ganar puntos XP, resolver dilemas de convivencia y aprobar la evaluación final para obtener tu <strong>Certificado Oficial 360°</strong>.
                </p>

                {/* Chapter Quick Seek Links */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-[11px] font-semibold text-slate-400 mr-1">Saltar a:</span>
                  {[
                    { label: '4 Pilares', time: 12 },
                    { label: '5 Niveles', time: 27 },
                    { label: 'Caracterización', time: 41 },
                    { label: 'Módulos (+XP)', time: 57 },
                    { label: 'Simulador', time: 71 },
                    { label: 'Evaluación', time: 85 },
                    { label: 'Certificado QR', time: 97 },
                  ].map((ch) => (
                    <button
                      key={ch.time}
                      onClick={() => onOpenVideo(ch.time)}
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/70 transition-colors cursor-pointer"
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Primary Launch Action */}
            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2">
              <button
                onClick={() => onOpenVideo()}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-[#39A900] hover:bg-[#329200] text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Reproducir Video Tutorial</span>
              </button>
              <span className="text-[11px] text-slate-400 text-center">
                Con controles y modo flotante
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Manual Guide Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent dark:from-emerald-950/40 dark:via-emerald-950/20 dark:to-transparent border border-emerald-200/90 dark:border-emerald-800/60 shadow-2xs">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] dark:text-[#52c41a] flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800/80 shadow-xs">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>¿Tienes dudas sobre cómo realizar la inducción?</span>
              <span className="hidden sm:inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                Instructivo Oficial
              </span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
              Consulta y descarga el <strong>Manual de Inducción</strong> (en PDF o Word) con la explicación detallada de cada paso: cómo diligenciar tus datos, explorar los módulos, resolver los casos y certificarte.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('manual')}
          className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#329200] rounded-xl transition-all shadow-xs cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <span>Ver y Descargar Manual</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Structured Induction Plan Overview */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Plan Estructurado de Inducción
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Ruta pedagógica secuencial diseñada para garantizar la apropiación de derechos, deberes y cultura SENA.
            </p>
          </div>
          
          <button
            onClick={() => onNavigate('modules')}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#39A900] dark:text-[#52c41a] bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-lg transition-colors whitespace-nowrap border border-transparent dark:border-emerald-800/40"
          >
            <span>Ver Temario Detallado</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Phases Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {planPhases.map((phase, idx) => {
            const Icon = phase.icon;
            return (
              <div
                key={phase.phaseNumber}
                className={`relative flex flex-col justify-between p-6 rounded-xl border transition-all ${
                  phase.isDone
                    ? 'bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-600/50 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#39A900] dark:text-[#52c41a] uppercase tracking-wider">
                      {phase.phaseNumber}
                    </span>
                    {phase.isDone ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Superada
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Por completar</span>
                    )}
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className={`p-2.5 rounded-lg shrink-0 ${phase.isDone ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {phase.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 dark:text-slate-500">Paso 0{idx + 1} de 04</span>
                  <button
                    onClick={() => {
                      if (phase.phaseNumber === 'Fase 04' && progress.quizPassed) {
                        onOpenCertificate();
                      } else {
                        onNavigate(phase.tab);
                      }
                    }}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                      phase.isDone
                        ? 'text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
                        : 'text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900'
                    }`}
                  >
                    <span>{phase.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparative Regulatory Highlights: Acuerdo 009 de 2024 */}
      <section className="bg-slate-100/70 dark:bg-slate-900/60 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#39A900] dark:text-[#52c41a]">
            Análisis Comparativo y Actualización Normativa
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            ¿Qué cambió con el nuevo Acuerdo 009 de 2024?
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            El Consejo Directivo Nacional actualizó el marco regulatorio del aprendiz para responder a las nuevas modalidades virtuales, la legislación contra el acoso y los principios de justicia restaurativa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#39A900] dark:text-[#52c41a]" /> Prevención de Acoso y Violencias
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Incorporación obligatoria de la <strong className="text-slate-800 dark:text-slate-200">Ley 2365 de 2024</strong>. Se definen rutas de protección inmediata y confidencial para víctimas de acoso sexual o violencia de género en centros de formación.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#39A900] dark:text-[#52c41a]" /> Ajustes Razonables e Inclusión
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Consagra expresamente el derecho a adaptaciones curriculares, físicas y metodológicas para personas en condición de discapacidad y comunidades con enfoque diferencial.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-[#39A900] dark:text-[#52c41a]" /> Ética en IA y Modalidades Digitales
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Regula explícitamente el uso de herramientas digitales e inteligencia artificial, prohibiendo el plagio y exigiendo transparencia en la autoría de las evidencias entregadas.
            </p>
          </div>
        </div>
      </section>

      {/* Gamification Badges Trophy Cabinet */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Insignias del Aprendiz Ejemplar
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Desbloquea medallas a medida que estudias los módulos, superas dilemas y apruebas el examen final.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
            {badges.filter(b => b.unlocked).length} de {badges.length} desbloqueadas
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-xl border text-center flex flex-col items-center justify-center space-y-2 transition-all ${
                b.unlocked
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700/60 text-slate-900 dark:text-slate-100 shadow-2xs'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60 text-slate-400 dark:text-slate-500'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  b.unlocked ? 'bg-[#39A900] text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600'
                }`}
              >
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold leading-tight">{b.name}</h4>
              <p className="text-[11px] leading-tight text-slate-500 dark:text-slate-400 line-clamp-2">
                {b.description}
              </p>
              {b.unlocked && (
                <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">¡Obtenida!</span>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
