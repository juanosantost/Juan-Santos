import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/senaData';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  ArrowRight,
  Flame,
  Check
} from 'lucide-react';

interface GamifiedQuizProps {
  quizPassed: boolean;
  bestScore: number;
  onPassQuiz: (score: number, xpEarned: number) => void;
  onOpenCertificate: () => void;
}

export const GamifiedQuiz: React.FC<GamifiedQuizProps> = ({
  quizPassed,
  bestScore,
  onPassQuiz,
  onOpenCertificate,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [, setUserAnswers] = useState<Array<{ questionIndex: number; selected: number; isCorrect: boolean }>>([]);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption === currentQuestion.correctIndex;
    setUserAnswers((prev) => [
      ...prev,
      { questionIndex: currentQuestionIndex, selected: selectedOption, isCorrect },
    ]);

    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizFinished(true);
      const finalScore = correctAnswersCount + (selectedOption === currentQuestion.correctIndex ? 0 : 0);
      const passed = finalScore >= 7; // 70% threshold

      if (passed) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#39A900', '#FFD700', '#00324D', '#10B981'],
        });
        onPassQuiz(finalScore, finalScore * 50 + 200);
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCorrectAnswersCount(0);
    setStreak(0);
    setIsQuizFinished(false);
    setUserAnswers([]);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#39A900] dark:text-[#52c41a]">
            <GraduationCap className="w-4 h-4" />
            <span>EVALUACIÓN GAMIFICADA DE INDUCCIÓN</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
            Validación de Saberes · Acuerdo 009 de 2024
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Supera el 70% (7 de 10 aciertos) para certificar tu inducción reglamentaria.
          </p>
        </div>

        {streak >= 2 && !isQuizFinished && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-700/60 rounded-lg text-amber-800 dark:text-amber-300 text-xs font-bold animate-bounce">
            <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400 fill-amber-500" />
            <span>¡Racha x{streak}!</span>
          </div>
        )}
      </div>

      {/* Quiz Body */}
      {!isQuizFinished ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          {/* Progress Header */}
          <div className="px-6 py-4 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-emerald-400 font-bold">
                Pregunta {currentQuestionIndex + 1} de {totalQuestions}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-slate-400">Puntaje Actual:</span>
              <span className="text-emerald-400 font-bold">{correctAnswersCount} pts</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5">
            <div
              className="bg-[#39A900] dark:bg-[#52c41a] h-1.5 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="p-6 sm:p-8 space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = selectedOption === optIdx;
                let optStyle = "border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/60 text-slate-800 dark:text-slate-200";

                if (isSelected && !isAnswerSubmitted) {
                  optStyle = "border-[#39A900] dark:border-[#52c41a] bg-emerald-50/50 dark:bg-emerald-950/40 ring-2 ring-[#39A900]/20 dark:ring-[#52c41a]/30 text-slate-900 dark:text-white";
                } else if (isAnswerSubmitted) {
                  if (optIdx === currentQuestion.correctIndex) {
                    optStyle = "border-emerald-500 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 font-medium";
                  } else if (isSelected && optIdx !== currentQuestion.correctIndex) {
                    optStyle = "border-rose-300 dark:border-rose-600 bg-rose-50 dark:bg-rose-950/60 text-rose-950 dark:text-rose-100";
                  } else {
                    optStyle = "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 opacity-40 text-slate-500";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3.5 ${optStyle}`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full border flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'border-[#39A900] dark:border-[#52c41a] bg-[#39A900] dark:bg-[#52c41a] text-white'
                          : 'border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 leading-normal pt-0.5">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {isAnswerSubmitted && (
              <div
                className={`p-4 rounded-xl border text-xs sm:text-sm space-y-2 animate-fadeIn ${
                  selectedOption === currentQuestion.correctIndex
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {selectedOption === currentQuestion.correctIndex ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <span>¡Respuesta Correcta!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                      <span>Respuesta Incorrecta</span>
                    </>
                  )}
                </div>
                <p className="leading-relaxed">{currentQuestion.explanation}</p>
                <p className="font-mono text-[11px] text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-800/80 p-2 rounded-lg border border-slate-200/60 dark:border-slate-700">
                  <strong>Referencia:</strong> {currentQuestion.legalArticle}
                </p>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              Mínimo requerido: 7/10
            </span>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#329200] disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed rounded-lg transition-colors shadow-xs"
              >
                <span>Validar Respuesta</span>
                <Check className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 rounded-lg transition-colors shadow-xs"
              >
                <span>
                  {currentQuestionIndex < totalQuestions - 1
                    ? 'Siguiente Pregunta'
                    : 'Ver Resultados Finales'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-6 shadow-sm">
          <div
            className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
              correctAnswersCount >= 7
                ? 'bg-emerald-100 dark:bg-emerald-950 text-[#39A900] dark:text-[#52c41a]'
                : 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
            }`}
          >
            {correctAnswersCount >= 7 ? (
              <Award className="w-10 h-10" />
            ) : (
              <RotateCcw className="w-10 h-10" />
            )}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#39A900] dark:text-[#52c41a]">
              Resultado de la Evaluación
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {correctAnswersCount >= 7
                ? '¡Felicitaciones! Has Superado la Inducción'
                : 'Aún no alcanzas el puntaje aprobatorio'}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto">
              {correctAnswersCount >= 7
                ? 'Demostraste pleno dominio de tus derechos, deberes y el marco normativo del Acuerdo 009 de 2024. Tu certificado oficial ya está disponible.'
                : 'Obtuviste menos de 7 aciertos. Puedes repasar los módulos temáticos y reintentar la evaluación para desbloquear tu certificado.'}
            </p>
          </div>

          {/* Score display */}
          <div className="flex items-center justify-center gap-6 py-4 border-y border-slate-100 dark:border-slate-800 font-mono">
            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500">Aciertos</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {correctAnswersCount} / {totalQuestions}
              </p>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500">Porcentaje</p>
              <p className={`text-2xl font-bold ${correctAnswersCount >= 7 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {Math.round((correctAnswersCount / totalQuestions) * 100)}%
              </p>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500">Calificación</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {correctAnswersCount >= 7 ? 'Aprobado' : 'No Aprobado'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors border border-transparent dark:border-slate-700"
            >
              <RotateCcw className="w-4 h-4" /> Presentar de Nuevo
            </button>

            {correctAnswersCount >= 7 && (
              <button
                onClick={onOpenCertificate}
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#39A900] hover:bg-[#329200] rounded-lg transition-colors shadow-md"
              >
                <Award className="w-4 h-4" /> Ver y Descargar Certificado Oficial
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
