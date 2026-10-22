import React, { useState } from 'react';
import { CASE_DILEMMAS } from '../data/senaData';
import confetti from 'canvas-confetti';
import { 
  Gamepad2, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  ArrowRight,
  User
} from 'lucide-react';

interface CaseSimulatorProps {
  completedCases: string[];
  onSolveCase: (caseId: string, xpEarned: number) => void;
  onNavigateToQuiz: () => void;
}

export const CaseSimulator: React.FC<CaseSimulatorProps> = ({
  completedCases,
  onSolveCase,
  onNavigateToQuiz,
}) => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);

  const currentCase = CASE_DILEMMAS[selectedCaseIndex];
  const isCaseCompleted = completedCases.includes(currentCase.id);

  const selectedChoice = currentCase.choices.find((c) => c.id === selectedChoiceId);

  const handleSelectChoice = (choiceId: string) => {
    if (hasEvaluated) return;
    setSelectedChoiceId(choiceId);
  };

  const handleEvaluateChoice = () => {
    if (!selectedChoice) return;
    setHasEvaluated(true);

    if (selectedChoice.isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#39A900', '#00324D', '#10B981'],
      });
      onSolveCase(currentCase.id, selectedChoice.xpReward);
    }
  };

  const handleResetCurrentCase = () => {
    setSelectedChoiceId(null);
    setHasEvaluated(false);
  };

  const handleNextCase = () => {
    if (selectedCaseIndex < CASE_DILEMMAS.length - 1) {
      setSelectedCaseIndex(selectedCaseIndex + 1);
      setSelectedChoiceId(null);
      setHasEvaluated(false);
    } else {
      onNavigateToQuiz();
    }
  };

  const handleSelectCaseFromList = (index: number) => {
    setSelectedCaseIndex(index);
    setSelectedChoiceId(null);
    setHasEvaluated(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#39A900] dark:text-[#52c41a]">
            <Gamepad2 className="w-4 h-4" />
            <span>SIMULADOR DE DILEMAS ÉTICOS Y FORMATIVOS</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
            Decisiones en el Centro de Formación
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Aplica el Acuerdo 009 de 2024 en situaciones cotidianas y comprende las implicaciones de tus actos.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg shrink-0 border border-transparent dark:border-slate-700">
          <span>Casos Resueltos:</span>
          <span className="font-bold text-emerald-700 dark:text-emerald-400">{completedCases.length}/{CASE_DILEMMAS.length}</span>
        </div>
      </div>

      {/* Main Grid: Selector & Interactive Scenario */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Cases selector menu */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Expedientes de Casos
          </h3>
          <div className="space-y-2">
            {CASE_DILEMMAS.map((c, idx) => {
              const isSelected = idx === selectedCaseIndex;
              const isSolved = completedCases.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => handleSelectCaseFromList(idx)}
                  className={`w-full flex items-start gap-3 p-3.5 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-[#39A900] dark:border-[#52c41a] ring-2 ring-[#39A900]/20 dark:ring-[#52c41a]/30 shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isSolved
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : isSelected
                        ? 'bg-[#39A900] text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase">
                        {c.category}
                      </span>
                      {isSolved && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {c.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {c.character} · {c.role}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: Interactive Case Workbench */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          {/* Case Narrative Header */}
          <div className="p-6 bg-slate-900 dark:bg-slate-950 text-white space-y-3 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Expediente N° 0{selectedCaseIndex + 1} · {currentCase.category}
              </span>
              <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded">
                +150 XP
              </span>
            </div>

            <h3 className="text-xl font-bold tracking-tight text-white">
              {currentCase.title}
            </h3>

            {/* Character identity badge */}
            <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
              <User className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>Aprendiz:</strong> {currentCase.character} ({currentCase.role})</span>
            </div>

            {/* Scenario Narrative */}
            <p className="text-slate-200 text-sm leading-relaxed pt-1">
              {currentCase.scenario}
            </p>
          </div>

          {/* Options Section */}
          <div className="p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              ¿Cuál es la decisión correcta según el Reglamento del Aprendiz?
            </h4>

            <div className="space-y-3">
              {currentCase.choices.map((choice) => {
                const isSelected = selectedChoiceId === choice.id;
                let cardStyle = "border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/60";

                if (isSelected && !hasEvaluated) {
                  cardStyle = "border-[#39A900] dark:border-[#52c41a] bg-emerald-50/40 dark:bg-emerald-950/40 ring-2 ring-[#39A900]/20 dark:ring-[#52c41a]/30";
                } else if (hasEvaluated) {
                  if (choice.isCorrect) {
                    cardStyle = "border-emerald-500 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100";
                  } else if (isSelected && !choice.isCorrect) {
                    cardStyle = "border-rose-400 dark:border-rose-600 bg-rose-50 dark:bg-rose-950/60 text-rose-950 dark:text-rose-100";
                  } else {
                    cardStyle = "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 opacity-50";
                  }
                }

                return (
                  <div
                    key={choice.id}
                    onClick={() => handleSelectChoice(choice.id)}
                    className={`p-4 rounded-xl border text-sm transition-all cursor-pointer ${cardStyle}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="pt-0.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-[#39A900] dark:border-[#52c41a] bg-[#39A900] dark:bg-[#52c41a] text-white'
                              : 'border-slate-400 dark:border-slate-500'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <div className="flex-1 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-snug">
                        {choice.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Evaluation Feedback Panel */}
            {hasEvaluated && selectedChoice && (
              <div
                className={`p-4 rounded-xl border text-xs sm:text-sm space-y-2 mt-4 animate-fadeIn ${
                  selectedChoice.isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {selectedChoice.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>¡Decisión Correcta! (+{selectedChoice.xpReward} XP)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                      <span>Decisión Inadecuada</span>
                    </>
                  )}
                </div>

                <p className="leading-relaxed">
                  <strong>Consecuencia:</strong> {selectedChoice.consequence}
                </p>

                <p className="font-medium text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-800/80 p-2 rounded-lg border border-slate-200/60 dark:border-slate-700 mt-1">
                  <strong>Fundamento Normativo:</strong> {selectedChoice.legalBasis}
                </p>
              </div>
            )}
          </div>

          {/* Workbench Footer Controls */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {hasEvaluated && !selectedChoice?.isCorrect && (
                <button
                  onClick={handleResetCurrentCase}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reintentar Caso
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!hasEvaluated ? (
                <button
                  onClick={handleEvaluateChoice}
                  disabled={!selectedChoiceId}
                  className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#329200] disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed rounded-lg transition-colors shadow-xs"
                >
                  <Sparkles className="w-4 h-4" /> Confirmar Decisión
                </button>
              ) : (
                <button
                  onClick={handleNextCase}
                  className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 rounded-lg transition-colors shadow-xs"
                >
                  <span>
                    {selectedCaseIndex < CASE_DILEMMAS.length - 1
                      ? 'Siguiente Caso'
                      : 'Ir a Evaluación Final'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
