import React from 'react';
import { LogOut, AlertTriangle, ShieldCheck, UserX } from 'lucide-react';

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  apprenticeName: string;
  documentNumber: string;
}

export const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  apprenticeName,
  documentNumber,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all animate-scaleIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-rose-500/10 dark:from-rose-500/20 dark:to-rose-500/20 p-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/80 flex items-center justify-center text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 shadow-xs shrink-0">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h2 id="modal-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                ¿Cerrar sesión actual?
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Cambio de aprendiz en este computador
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Aprendiz actual:</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm truncate max-w-[240px]">
                {apprenticeName || 'Aprendiz'}
              </span>
            </div>
            {documentNumber && (
              <span className="font-mono text-xs px-2 py-1 bg-white dark:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold">
                Doc: {documentNumber}
              </span>
            )}
          </div>

          <p className="leading-relaxed">
            Al cerrar sesión, la plataforma se preparará para que <strong className="text-slate-900 dark:text-white">otra persona</strong> pueda ingresar sus datos y realizar los módulos y ejercicios de la inducción sin sobreescribir ni mezclar la información.
          </p>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-300 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Tus avances y datos quedan guardados y podrán ser recuperados ingresando nuevamente con tu número de documento.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-slate-50/80 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            Continuar en mi sesión
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <UserX className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};
