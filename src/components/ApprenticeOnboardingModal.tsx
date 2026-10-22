import React, { useState, useEffect } from 'react';
import { ApprenticeProfile, UserProgress } from '../types/sena';
import { REGIONAL_CENTERS } from '../data/senaData';
import { SenaLogo } from './SenaLogo';
import { 
  UserCheck, 
  UserPlus, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  AlertCircle,
  Hash,
  MapPin,
  Calendar
} from 'lucide-react';

interface ApprenticeOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: ApprenticeProfile;
  onSaveProfile: (newProfile: ApprenticeProfile, isNewApprentice: boolean) => void;
  existingLearners?: Array<{ profile: ApprenticeProfile; progress: UserProgress }>;
}

export const ApprenticeOnboardingModal: React.FC<ApprenticeOnboardingModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
  existingLearners = [],
}) => {
  // Step 1: 'identify' (enter doc number, query or choose first time)
  // Step 2: 'form' (complete characterization form)
  const [step, setStep] = useState<'identify' | 'form'>('identify');
  
  // Document identification fields
  const [docType, setDocType] = useState<ApprenticeProfile['documentType']>(currentProfile.documentType || 'CC');
  const [docNumber, setDocNumber] = useState(currentProfile.documentNumber || '');
  const [identificationError, setIdentificationError] = useState<string | null>(null);

  // Characterization Form fields
  const [fullName, setFullName] = useState(currentProfile.fullName || '');
  const [fichaNumber, setFichaNumber] = useState(currentProfile.fichaNumber || '');
  const [programName, setProgramName] = useState(currentProfile.programName || '');
  const [regional, setRegional] = useState(currentProfile.regional || 'Distrito Capital');
  const [centerName, setCenterName] = useState(currentProfile.centerName || 'Centro de Gestión de Mercados, Logística y TIC');
  const [modality, setModality] = useState('Presencial - Diurna');

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      setDocType(currentProfile.documentType || 'CC');
      setDocNumber(currentProfile.documentNumber || '');
      setFullName(currentProfile.fullName || '');
      setFichaNumber(currentProfile.fichaNumber || '');
      setProgramName(currentProfile.programName || '');
      setRegional(currentProfile.regional || 'Distrito Capital');
      setCenterName(currentProfile.centerName || 'Centro de Gestión de Mercados, Logística y TIC');
      setIdentificationError(null);
      setFormErrors({});
      // Start at 'identify' step unless docNumber is completely empty
      setStep('identify');
    }
  }, [isOpen, currentProfile]);

  if (!isOpen) return null;

  // Handle regional change and auto-update center
  const handleRegionalChange = (newReg: string) => {
    setRegional(newReg);
    const found = REGIONAL_CENTERS.find((r) => r.regional === newReg);
    if (found && found.centers.length > 0) {
      setCenterName(found.centers[0]);
    }
  };

  // Step 1: Look up existing learner by document
  const handleLookupExisting = (e: React.FormEvent) => {
    e.preventDefault();
    setIdentificationError(null);

    const cleanDoc = docNumber.trim();
    if (!cleanDoc) {
      setIdentificationError('Por favor ingresa tu número de documento.');
      return;
    }

    // Check if matches currently loaded profile
    if (cleanDoc === currentProfile.documentNumber) {
      onSaveProfile(currentProfile, false);
      onClose();
      return;
    }

    // Check in existing learners cache
    const matchedLearner = existingLearners.find(
      (l) => l.profile.documentNumber === cleanDoc
    );

    if (matchedLearner) {
      onSaveProfile(matchedLearner.profile, false);
      onClose();
    } else {
      setIdentificationError(
        `No encontramos un registro previo con el documento ${cleanDoc}. Si es tu primera vez, haz clic en el botón de abajo para caracterizarte.`
      );
    }
  };

  // Step 2: Validate and submit characterization form
  const handleSaveCharacterization = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!fullName.trim()) errors.fullName = 'Ingresa tus nombres y apellidos completos.';
    if (!docNumber.trim()) errors.docNumber = 'El número de documento es requerido.';
    if (!fichaNumber.trim()) errors.fichaNumber = 'Ingresa el número de ficha SENA.';
    if (!programName.trim()) errors.programName = 'Ingresa el nombre del programa de formación.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newProfile: ApprenticeProfile = {
      fullName: fullName.trim(),
      documentType: docType,
      documentNumber: docNumber.trim(),
      fichaNumber: fichaNumber.trim(),
      programName: programName.trim(),
      regional,
      centerName,
    };

    const isNew = newProfile.documentNumber !== currentProfile.documentNumber;
    onSaveProfile(newProfile, isNew);
    onClose();
  };

  const currentRegionalCenters = REGIONAL_CENTERS.find((r) => r.regional === regional)?.centers || [centerName];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Institutional Banner Header */}
        <div className="bg-gradient-to-r from-[#00324D] via-[#004b73] to-[#39A900] text-white p-6 sm:p-8 relative">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <SenaLogo size="sm" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-2 py-0.5 rounded-md">
                  Acuerdo 009 de 2024
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-2">
                Caracterización del Aprendiz SENA
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
                Plataforma interactiva de inducción integral. Registra tus datos para personalizar tus evidencias, insignias y emitir tu certificado oficial.
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xs items-center justify-center border border-white/20 shrink-0">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* STEP 1: Identification & First-time Gateway */}
        {step === 'identify' && (
          <div className="p-6 sm:p-8 space-y-6">
            
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                <p className="font-bold">
                  ¡Hola, futuro técnico o tecnólogo SENA!
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  Para reconocer tu ficha y registrar tu avance en la inducción, ingresa tu documento de identidad.
                </p>
              </div>
            </div>

            {/* Returning Learner Form */}
            <form onSubmit={handleLookupExisting} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Ingresa tu Número de Documento
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as any)}
                    className="px-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#39A900] sm:w-28"
                  >
                    <option value="CC">C.C.</option>
                    <option value="TI">T.I.</option>
                    <option value="CE">C.E.</option>
                    <option value="PEP">PEP</option>
                    <option value="PPT">PPT</option>
                  </select>

                  <input
                    type="text"
                    value={docNumber}
                    onChange={(e) => {
                      setDocNumber(e.target.value);
                      if (identificationError) setIdentificationError(null);
                    }}
                    placeholder="Ej. 1018492044"
                    className="flex-1 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    autoFocus
                  />

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#00324D] hover:bg-[#00253a] rounded-xl transition-colors shadow-xs shrink-0 cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Continuar con mi avance</span>
                  </button>
                </div>
              </div>

              {identificationError && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{identificationError}</span>
                </div>
              )}
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 font-semibold">
                  ¿Es tu primera vez en la plataforma?
                </span>
              </div>
            </div>

            {/* First time Button */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-1.5">
                  <UserPlus className="w-4 h-4 text-[#39A900]" />
                  <span>Soy nuevo aprendiz SENA</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Diligencia tus datos de caracterización (nombres, ficha, programa y centro) para iniciar tu ruta de inducción desde cero.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white bg-[#39A900] hover:bg-[#329200] rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
              >
                <span>Diligenciar mis datos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* STEP 2: Characterization Form */}
        {step === 'form' && (
          <form onSubmit={handleSaveCharacterization} className="p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <BookOpen className="w-4 h-4 text-[#39A900]" />
                <span>Formulario de Caracterización y Matrícula</span>
              </div>
              <button
                type="button"
                onClick={() => setStep('identify')}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div className="sm:col-span-2 space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Nombres y Apellidos Completos *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej. Laura Marcela Rodríguez Castro"
                  className={`w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border ${
                    formErrors.fullName ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                  } rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]`}
                  required
                />
                {formErrors.fullName && (
                  <p className="text-[11px] text-red-500">{formErrors.fullName}</p>
                )}
              </div>

              {/* Document Type */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Tipo de Documento *
                </label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                >
                  <option value="CC">Cédula de Ciudadanía (C.C.)</option>
                  <option value="TI">Tarjeta de Identidad (T.I.)</option>
                  <option value="CE">Cédula de Extranjería (C.E.)</option>
                  <option value="PPT">Permiso por Protección Temporal (PPT)</option>
                  <option value="PEP">Permiso Especial de Permanencia (PEP)</option>
                </select>
              </div>

              {/* Document Number */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Número de Documento *
                </label>
                <input
                  type="text"
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  placeholder="Ej. 1024567890"
                  className={`w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 font-mono border ${
                    formErrors.docNumber ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                  } rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]`}
                  required
                />
                {formErrors.docNumber && (
                  <p className="text-[11px] text-red-500">{formErrors.docNumber}</p>
                )}
              </div>

              {/* Ficha Number */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Número de Ficha de Caracterización *
                </label>
                <div className="relative">
                  <Hash className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fichaNumber}
                    onChange={(e) => setFichaNumber(e.target.value)}
                    placeholder="Ej. 2874102"
                    className={`w-full pl-8 pr-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 font-mono border ${
                      formErrors.fichaNumber ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]`}
                    required
                  />
                </div>
                {formErrors.fichaNumber && (
                  <p className="text-[11px] text-red-500">{formErrors.fichaNumber}</p>
                )}
              </div>

              {/* Modality / Jornada */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Modalidad / Jornada
                </label>
                <select
                  value={modality}
                  onChange={(e) => setModality(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                >
                  <option value="Presencial - Diurna">Presencial - Diurna</option>
                  <option value="Presencial - Nocturna">Presencial - Nocturna</option>
                  <option value="Presencial - Mixta">Presencial - Mixta (Fines de Semana)</option>
                  <option value="Virtual">Virtual / A Distancia</option>
                  <option value="Formación Dual">Formación Dual (Empresa / Centro)</option>
                </select>
              </div>

              {/* Program Name */}
              <div className="sm:col-span-2 space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Programa de Formación *
                </label>
                <input
                  type="text"
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  placeholder="Ej. Tecnólogo en Análisis y Desarrollo de Software (ADSO)"
                  className={`w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border ${
                    formErrors.programName ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                  } rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]`}
                  required
                />
                {formErrors.programName && (
                  <p className="text-[11px] text-red-500">{formErrors.programName}</p>
                )}
              </div>

              {/* Regional */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Regional SENA *
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={regional}
                    onChange={(e) => handleRegionalChange(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    {REGIONAL_CENTERS.map((r) => (
                      <option key={r.regional} value={r.regional}>
                        Regional {r.regional}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Centro de Formacion */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Centro de Formación *
                </label>
                <div className="relative">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={centerName}
                    onChange={(e) => setCenterName(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    {currentRegionalCenters.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setStep('identify')}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#39A900] hover:bg-[#329200] rounded-xl shadow-md transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Guardar e Iniciar mi Inducción</span>
              </button>
            </div>

          </form>
        )}

        {/* Footer info note */}
        <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>Servicio Nacional de Aprendizaje - SENA</span>
          <span className="font-medium text-emerald-600 dark:text-emerald-400">Formación Profesional Integral</span>
        </div>

      </div>
    </div>
  );
};
