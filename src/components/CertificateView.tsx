import React, { useRef } from 'react';
import { ApprenticeProfile, UserProgress } from '../types/sena';
import { SenaLogo } from './SenaLogo';
import { 
  Printer, 
  Lock, 
  ArrowLeft, 
  Edit3, 
  Award
} from 'lucide-react';

interface CertificateViewProps {
  profile: ApprenticeProfile;
  progress: UserProgress;
  onEditProfile: () => void;
  onNavigateToQuiz: () => void;
  onClose: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  profile,
  progress,
  onEditProfile,
  onNavigateToQuiz,
  onClose,
}) => {
  const isUnlocked = progress.quizPassed;
  const certificateRef = useRef<HTMLDivElement>(null);

  const issueDate = progress.certificateIssuedDate || new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const verificationHash = progress.certificateCode || `SENA-IND-2024-${profile.fichaNumber || 'FICHA'}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top action bar (hidden in print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a la Plataforma
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onEditProfile}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors border border-transparent dark:border-slate-700"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" /> Modificar Datos del Aprendiz
          </button>

          {isUnlocked ? (
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-white bg-[#39A900] hover:bg-[#329200] rounded-lg transition-colors shadow-xs"
            >
              <Printer className="w-4 h-4" /> Imprimir / Guardar PDF
            </button>
          ) : (
            <button
              onClick={onNavigateToQuiz}
              className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 rounded-lg transition-colors shadow-xs"
            >
              <Lock className="w-4 h-4 text-amber-400" /> Aprobar Examen para Desbloquear
            </button>
          )}
        </div>
      </div>

      {/* Printable Certificate Sheet (Always white parchment for institutional printing) */}
      <div 
        id="printable-certificate"
        ref={certificateRef}
        className={`relative bg-white text-slate-900 p-8 sm:p-12 md:p-16 rounded-2xl border-8 border-double border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden ${
          !isUnlocked ? 'filter select-none' : ''
        }`}
        style={{
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)',
        }}
      >
        {/* Institutional Decorative Frame & Watermark */}
        <div className="absolute inset-2 border-2 border-[#39A900]/30 rounded-lg pointer-events-none" />
        <div className="absolute inset-3 border border-slate-200 rounded-md pointer-events-none" />

        {/* Faint Center Emblem Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none flex items-center justify-center">
          <SenaLogo size="lg" showText={false} className="w-full h-full text-slate-900" />
        </div>

        {/* Certificate Content */}
        <div className="relative z-10 space-y-8 text-center">
          
          {/* Header Logos & Titles */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-4">
              <SenaLogo size="lg" showText={false} />
            </div>

            <div className="space-y-0.5">
              <p className="text-[11px] font-bold tracking-widest text-slate-600 uppercase">
                REPÚBLICA DE COLOMBIA · MINISTERIO DEL TRABAJO
              </p>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 uppercase">
                SERVICIO NACIONAL DE APRENDIZAJE · SENA
              </h2>
              <p className="text-xs font-semibold tracking-wider text-[#39A900] uppercase">
                DIRECCIÓN DE FORMACIÓN PROFESIONAL INTEGRAL
              </p>
            </div>
          </div>

          {/* Subheader */}
          <div className="pt-2">
            <p className="text-xs sm:text-sm font-medium text-slate-600 italic">
              El Consejo Directivo Nacional y la Subdirección del Centro de Formación certifican que:
            </p>
          </div>

          {/* Recipient Full Name */}
          <div className="py-2 border-y border-slate-100">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 uppercase tracking-wide">
              {profile.fullName || "APRENDIZ SENA"}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-slate-600 mt-1">
              {profile.documentType} N° {profile.documentNumber || "00.000.000"} · FICHA N° {profile.fichaNumber || "0000000"}
            </p>
          </div>

          {/* Statement of Completion */}
          <div className="max-w-2xl mx-auto space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              Culminó y aprobó con éxito el programa de <strong className="text-slate-900 font-bold">INDUCCIÓN INSTITUCIONAL Y APROPIACIÓN DEL REGLAMENTO DEL APRENDIZ</strong>, fundamentado en el <strong className="text-[#39A900] font-bold">Acuerdo 009 de 2024</strong>.
            </p>
            <p className="text-xs text-slate-600">
              Programa de Formación: <strong className="text-slate-800">{profile.programName || "Formación Titulada"}</strong>
              <br />
              {profile.centerName} · Regional {profile.regional}
            </p>
            <p className="text-[11px] text-slate-500 italic">
              Acreditando competencias en el ejercicio activo de sus derechos, deberes de integridad académica, convivencia pacífica, prevención de violencias (Ley 2365 de 2024) y alternativas de etapa productiva.
            </p>
          </div>

          {/* Seal and Signatures */}
          <div className="pt-8 grid grid-cols-3 items-end gap-4">
            
            {/* Signature 1 */}
            <div className="space-y-1 text-center">
              <div className="w-36 mx-auto border-b border-slate-400 pb-1">
                <span className="font-serif italic text-xs text-slate-500">Firmado Digitalmente</span>
              </div>
              <p className="text-xs font-bold text-slate-800">Subdirección de Centro</p>
              <p className="text-[10px] text-slate-500">Centro de Formación SENA</p>
            </div>

            {/* Institutional Golden Seal */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-amber-400 bg-amber-50 flex items-center justify-center p-2 shadow-inner">
                <div className="w-full h-full rounded-full border border-amber-300 flex flex-col items-center justify-center text-center">
                  <Award className="w-6 h-6 text-amber-600" />
                  <span className="text-[8px] font-bold tracking-tighter text-amber-800 uppercase mt-0.5">
                    SENA 2024
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-semibold text-emerald-800 mt-1 uppercase tracking-wider">
                Certificación Válida
              </span>
            </div>

            {/* Signature 2 */}
            <div className="space-y-1 text-center">
              <div className="w-36 mx-auto border-b border-slate-400 pb-1">
                <span className="font-serif italic text-xs text-slate-500">Firmado Digitalmente</span>
              </div>
              <p className="text-xs font-bold text-slate-800">Coordinación Misional</p>
              <p className="text-[10px] text-slate-500">Formación y Bienestar al Aprendiz</p>
            </div>

          </div>

          {/* Verification Hash & QR representation */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-500">
            <div className="text-left font-mono">
              <p>Fecha de Expedición: {issueDate}</p>
              <p>Código de Verificación: <strong className="text-slate-800">{verificationHash}</strong></p>
            </div>

            {/* Stylized QR Code Visual */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 border border-slate-300 p-0.5 bg-white grid grid-cols-4 gap-0.5">
                <div className="bg-slate-900" />
                <div className="bg-slate-900" />
                <div className="bg-transparent" />
                <div className="bg-slate-900" />
                <div className="bg-slate-900" />
                <div className="bg-transparent" />
                <div className="bg-slate-900" />
                <div className="bg-transparent" />
                <div className="bg-transparent" />
                <div className="bg-slate-900" />
                <div className="bg-slate-900" />
                <div className="bg-slate-900" />
                <div className="bg-slate-900" />
                <div className="bg-transparent" />
                <div className="bg-slate-900" />
                <div className="bg-slate-900" />
              </div>
              <div className="text-left text-[9px] text-slate-400 leading-tight">
                <p>Verificable en plataforma</p>
                <p>SofíaPlus / Zajuna</p>
              </div>
            </div>
          </div>

        </div>

        {/* Lock Overlay if not passed */}
        {!isUnlocked && (
          <div className="no-print absolute inset-0 bg-slate-950/70 dark:bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-white text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 shadow-xl">
              <Lock className="w-8 h-8" />
            </div>
            <div className="max-w-md space-y-1">
              <h3 className="text-xl font-bold text-white">
                Certificado Bloqueado
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Para expedir este certificado con validez institucional debes aprobar la <strong>Evaluación Gamificada</strong> con al menos el 70% de aciertos.
              </p>
            </div>
            <button
              onClick={onNavigateToQuiz}
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#39A900] hover:bg-[#329200] rounded-lg transition-colors shadow-lg"
            >
              <span>Presentar Evaluación de Inducción</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
