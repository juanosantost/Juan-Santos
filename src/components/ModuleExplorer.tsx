import React, { useState } from 'react';
import { LEARNING_MODULES } from '../data/senaData';
import { 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  AlertTriangle, 
  HelpCircle,
  Check,
  ArrowRight
} from 'lucide-react';

interface ModuleExplorerProps {
  completedModules: string[];
  onCompleteModule: (moduleId: string) => void;
  onNavigateToSimulator: () => void;
}

export const ModuleExplorer: React.FC<ModuleExplorerProps> = ({
  completedModules,
  onCompleteModule,
  onNavigateToSimulator,
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(LEARNING_MODULES[0].id);

  const activeModule =
    LEARNING_MODULES.find((m) => m.id === selectedModuleId) || LEARNING_MODULES[0];

  const isModuleCompleted = completedModules.includes(activeModule.id);

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <BookOpen className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Award':
        return <Award className="w-5 h-5" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Module Navigation Tabs */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Reglamento del Aprendiz (Acuerdo 009 de 2024)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Estudia los 4 núcleos temáticos para afianzar tus derechos, deberes y la ruta formativa integral.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg shrink-0 border border-transparent dark:border-slate-700">
            {completedModules.length} de {LEARNING_MODULES.length} Módulos Estudiados
          </div>
        </div>

        {/* Tab strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {LEARNING_MODULES.map((mod) => {
            const isDone = completedModules.includes(mod.id);
            const isSelected = mod.id === selectedModuleId;
            return (
              <button
                key={mod.id}
                onClick={() => setSelectedModuleId(mod.id)}
                className={`flex items-start gap-3 p-4 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-[#39A900] dark:border-[#52c41a] ring-2 ring-[#39A900]/20 dark:ring-[#52c41a]/30 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    isSelected
                      ? 'bg-[#39A900] text-white'
                      : isDone
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {getModuleIcon(mod.iconName)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono font-bold text-[#39A900] dark:text-[#52c41a]">
                      Módulo {mod.number}
                    </span>
                    {isDone && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">
                    {mod.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {mod.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Module Details */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Module Header Bar */}
        <div className="p-6 sm:p-8 bg-slate-900 dark:bg-slate-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
              <span>MÓDULO {activeModule.number}</span>
              <span>·</span>
              <span>Acuerdo 009 de 2024</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {activeModule.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              {activeModule.shortDesc}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => onCompleteModule(activeModule.id)}
              disabled={isModuleCompleted}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all shadow-sm ${
                isModuleCompleted
                  ? 'bg-emerald-800/80 dark:bg-emerald-950 text-emerald-200 dark:text-emerald-400 cursor-default border border-transparent dark:border-emerald-800/50'
                  : 'bg-[#39A900] hover:bg-[#329200] text-white active:scale-95'
              }`}
            >
              {isModuleCompleted ? (
                <>
                  <Check className="w-4 h-4" /> Módulo Completado (+100 XP)
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Marcar como Estudiado (+100 XP)
                </>
              )}
            </button>
          </div>
        </div>

        {/* Topics List */}
        <div className="p-6 sm:p-8 space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
          {activeModule.topics.map((topic, index) => (
            <div key={topic.id} className={`${index > 0 ? 'pt-8' : ''} space-y-4`}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <span className="text-xs font-mono font-bold text-[#39A900] dark:text-[#52c41a] uppercase">
                    Tema 0{index + 1}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    {topic.title}
                  </h4>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {topic.subtitle}
                  </p>
                </div>
                {topic.articleRef && (
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md self-start border border-transparent dark:border-slate-700/80">
                    {topic.articleRef}
                  </span>
                )}
              </div>

              {/* Explanatory Paragraphs */}
              <div className="space-y-2 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                {topic.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Key Takeaways */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200/80 dark:border-slate-700/70">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] dark:text-[#52c41a]" /> Puntos Fundamentales para el Aprendiz
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {topic.keyPoints.map((point, ptIdx) => (
                    <li key={ptIdx} className="flex items-start gap-2">
                      <span className="text-[#39A900] dark:text-[#52c41a] font-bold">·</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Real World Scenario Case */}
              {topic.exampleScenario && (
                <div className="bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl p-4 border border-emerald-200/70 dark:border-emerald-800/40 text-xs space-y-2">
                  <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> Caso Práctico en el Centro de Formación
                  </span>
                  <p className="text-slate-800 dark:text-slate-200">
                    <strong>Situación:</strong> {topic.exampleScenario.context}
                  </p>
                  <p className="text-slate-800 dark:text-slate-200">
                    <strong>Actuación:</strong> {topic.exampleScenario.action}
                  </p>
                  <p className="text-emerald-800 dark:text-emerald-300 font-medium">
                    <strong>Fundamento:</strong> {topic.exampleScenario.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Next Steps */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Asegúrate de haber comprendido los derechos y deberes antes del simulador de casos.
          </p>
          <button
            onClick={onNavigateToSimulator}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 rounded-lg transition-colors whitespace-nowrap"
          >
            <span>Ir al Simulador de Casos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
