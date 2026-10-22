import React, { useState } from 'react';
import { ApprenticeProfile } from '../types/sena';
import { REGIONAL_CENTERS } from '../data/senaData';
import { StoredApprenticeData } from '../services/googleSheetsService';
import { 
  X, 
  User, 
  Hash, 
  BookOpen, 
  MapPin, 
  Check, 
  Search, 
  RefreshCw, 
  Database,
  CloudCheck,
  CheckCircle2,
  LogOut
} from 'lucide-react';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  setProfile: (profile: ApprenticeProfile) => void;
  xp: number;
  onSearchFromSheets?: (docNumber: string) => Promise<StoredApprenticeData | null>;
  isGoogleConnected?: boolean;
  openOnboarding?: () => void;
  onLogout?: () => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  profile,
  setProfile,
  xp,
  onSearchFromSheets,
  isGoogleConnected,
  openOnboarding,
  onLogout,
}) => {
  const [isSearchingDoc, setIsSearchingDoc] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFieldChange = (field: keyof ApprenticeProfile, value: string) => {
    setProfile({
      ...profile,
      [field]: value,
    });
  };

  const handleRegionalChange = (reg: string) => {
    const found = REGIONAL_CENTERS.find((r) => r.regional === reg);
    setProfile({
      ...profile,
      regional: reg,
      centerName: found ? found.centers[0] : profile.centerName,
    });
  };

  const handleFetchFromSheets = async () => {
    if (!onSearchFromSheets || !profile.documentNumber.trim()) {
      setStatusFeedback('Por favor ingresa un número de documento.');
      return;
    }

    setIsSearchingDoc(true);
    setStatusFeedback(null);

    try {
      const data = await onSearchFromSheets(profile.documentNumber.trim());
      if (data) {
        setProfile({
          ...profile,
          documentType: (data.documentType as any) || profile.documentType,
          fullName: data.fullName || profile.fullName,
          fichaNumber: data.fichaNumber || profile.fichaNumber,
          programName: data.programName || profile.programName,
          regional: data.regional || profile.regional,
          centerName: data.centerName || profile.centerName,
        });
        setStatusFeedback(`¡Datos recuperados con éxito de Google Sheets! (${data.fullName})`);
      } else {
        setStatusFeedback(`No se encontraron registros para el documento ${profile.documentNumber.trim()} en la hoja de cálculo.`);
      }
    } catch (err: any) {
      setStatusFeedback(err?.message || 'Error al consultar Google Sheets.');
    } finally {
      setIsSearchingDoc(false);
    }
  };

  const currentRegionalCenters =
    REGIONAL_CENTERS.find((r) => r.regional === profile.regional)?.centers || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Ficha de Aprendiz SENA
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Personaliza tus datos para la expedición de tu Certificado Oficial
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* XP & Browser Storage Banner */}
          <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#39A900] text-white flex items-center justify-center font-bold text-xs">
                XP
              </div>
              <div>
                <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-300">Puntaje: {xp} Puntos</p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Guardado seguro en tu navegador
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-white/80 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
              Auto-guardado Activo
            </span>
          </div>

          {/* Document Type & Number + Search Button */}
          <div className="space-y-1.5">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tipo Doc.
                </label>
                <select
                  value={profile.documentType}
                  onChange={(e) => handleFieldChange('documentType', e.target.value as any)}
                  className="w-full px-2.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                >
                  <option value="CC">C.C.</option>
                  <option value="TI">T.I.</option>
                  <option value="CE">C.E.</option>
                  <option value="PEP">PEP</option>
                  <option value="PPT">PPT</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" /> Número de Documento
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={profile.documentNumber}
                    onChange={(e) => handleFieldChange('documentNumber', e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    placeholder="1018492044"
                  />
                  {isGoogleConnected && onSearchFromSheets && (
                    <button
                      type="button"
                      onClick={handleFetchFromSheets}
                      disabled={isSearchingDoc || !profile.documentNumber.trim()}
                      title="Buscar datos guardados en Google Sheets"
                      className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-[#39A900] dark:text-[#52c41a] bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
                    >
                      {isSearchingDoc ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Database className="w-3.5 h-3.5" />
                      )}
                      <span className="hidden sm:inline">Traer Datos</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {statusFeedback && (
              <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-200 dark:border-emerald-800">
                {statusFeedback}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" /> Nombres y Apellidos Completos
            </label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => handleFieldChange('fullName', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
              placeholder="Ej. Juan Carlos Santos Gómez"
            />
          </div>

          {/* Ficha & Program */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                N° de Ficha
              </label>
              <input
                type="text"
                value={profile.fichaNumber}
                onChange={(e) => handleFieldChange('fichaNumber', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                placeholder="2874102"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" /> Programa de Formación
              </label>
              <input
                type="text"
                value={profile.programName}
                onChange={(e) => handleFieldChange('programName', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                placeholder="Análisis y Desarrollo de Software (ADSO)"
              />
            </div>
          </div>

          {/* Regional & Center */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" /> Regional SENA
              </label>
              <select
                value={profile.regional}
                onChange={(e) => handleRegionalChange(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]"
              >
                {REGIONAL_CENTERS.map((r) => (
                  <option key={r.regional} value={r.regional}>
                    {r.regional}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Centro de Formación
              </label>
              <select
                value={profile.centerName}
                onChange={(e) => handleFieldChange('centerName', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]"
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

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col w-full sm:w-auto">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Tus datos quedan guardados en este navegador.
            </p>
            {onLogout && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLogout();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:underline mt-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Cerrar sesión / Cambiar de aprendiz</span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#329200] rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Check className="w-4 h-4" /> Guardar y Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
