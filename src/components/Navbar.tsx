import React from 'react';
import { SenaLogo } from './SenaLogo';
import { 
  Award, 
  UserCircle, 
  CheckCircle2, 
  BookOpen, 
  Gamepad2, 
  GraduationCap, 
  Compass, 
  HelpCircle,
  Sun,
  Moon,
  ShieldCheck,
  UserCheck,
  Lock,
  UserPlus,
  LogOut,
  FileText,
  Play
} from 'lucide-react';

export type NavTabType = 'plan' | 'manual' | 'modules' | 'simulator' | 'quiz' | 'glossary' | 'certificate';

interface NavbarProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
  openCertificate: () => void;
  openProfile: () => void;
  openOnboarding?: () => void;
  onLogoutApprentice?: () => void;
  onOpenVideo?: () => void;
  quizPassed: boolean;
  xp: number;
  apprenticeName: string;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  currentRole: 'aprendiz' | 'administrador';
  onToggleRole: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openProfile,
  openOnboarding,
  onLogoutApprentice,
  onOpenVideo,
  quizPassed,
  xp,
  apprenticeName,
  darkMode,
  onToggleDarkMode,
  currentRole,
  onToggleRole,
}) => {
  const learnerNavItems = [
    { id: 'plan' as const, label: 'Plan', longLabel: 'Plan de Inducción', icon: Compass },
    { id: 'manual' as const, label: 'Manual', longLabel: 'Manual de Inducción', icon: FileText },
    { id: 'modules' as const, label: 'Reglamento', longLabel: 'Reglamento & Módulos', icon: BookOpen },
    { id: 'simulator' as const, label: 'Simulador', longLabel: 'Simulador de Casos', icon: Gamepad2 },
    { id: 'quiz' as const, label: 'Evaluación', longLabel: 'Evaluación Final', icon: GraduationCap },
    { id: 'certificate' as const, label: 'Certificado', longLabel: 'Certificado SENA', icon: quizPassed ? CheckCircle2 : Award },
    { id: 'glossary' as const, label: 'Glosario', longLabel: 'Glosario Normativo', icon: HelpCircle },
  ];

  const handleNavClick = (tabId: NavTabType) => {
    setActiveTab(tabId);
  };

  const firstName = apprenticeName ? apprenticeName.trim().split(' ')[0] : 'Aprendiz';

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 w-full transition-colors shadow-xs">
      {/* Target Container: header > div:nth-of-type(1) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Main Row: Brand, Desktop Navbar, and Grouped Actions */}
        <div className="h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand & Role Badge */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
            <button 
              onClick={() => handleNavClick('plan')}
              className="cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-0.5"
              title="Ir al inicio de la Inducción"
            >
              <SenaLogo size="md" />
            </button>

            {/* Current Role Badge (Desktop) */}
            <span className={`hidden xl:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${
              currentRole === 'administrador'
                ? 'bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                : 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
            }`}>
              {currentRole === 'administrador' ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Espacio Instructor/Admin</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Espacio Aprendiz</span>
                </>
              )}
            </span>
          </div>

          {/* Desktop Navigation Bar (Inside Header for Large Screens) */}
          {currentRole === 'aprendiz' ? (
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
              {learnerNavItems.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                const isCert = item.id === 'certificate';

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all text-xs font-semibold ${
                      isActive
                        ? isCert && quizPassed
                          ? 'bg-[#39A900] text-white shadow-xs font-bold'
                          : 'text-[#39A900] dark:text-[#52c41a] bg-emerald-50 dark:bg-emerald-950/60 font-bold shadow-2xs border border-emerald-200/60 dark:border-emerald-800/60'
                        : isCert && quizPassed
                        ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${
                      isActive && !(isCert && quizPassed)
                        ? 'text-[#39A900] dark:text-[#52c41a]' 
                        : isCert && quizPassed
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : 'text-slate-400'
                    }`} />
                    <span>{item.label}</span>
                    {isCert && quizPassed && !isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    )}
                  </button>
                );
              })}
            </nav>
          ) : (
            <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Consola Administrativa Institucional · Banco de Respuestas y Calificaciones</span>
            </div>
          )}

          {/* Grouped Header Action Buttons (Zero Overflow) */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            
            {/* Learner Action Pill */}
            {currentRole === 'aprendiz' && (
              <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-0.5 sm:p-1 rounded-xl border border-slate-200/90 dark:border-slate-700/80 shadow-2xs">
                
                {/* Profile & XP Trigger */}
                <button
                  onClick={openProfile}
                  title="Ver perfil del aprendiz, datos y nivel"
                  className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all"
                >
                  <UserCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="hidden sm:inline font-semibold max-w-[70px] md:max-w-[90px] truncate">
                    {firstName}
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-[10px] sm:text-[11px] tabular-nums">
                    {xp} XP
                  </span>
                </button>

                {/* Caracterización Quick Button */}
                {openOnboarding && (
                  <button
                    onClick={openOnboarding}
                    title="Actualizar datos de caracterización o cambiar documento"
                    className="p-1 sm:px-2 sm:py-1 flex items-center gap-1 text-xs font-medium text-emerald-800 dark:text-emerald-300 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="hidden md:inline">Datos</span>
                  </button>
                )}

                {/* Video Tutorial Trigger Button */}
                {onOpenVideo && (
                  <button
                    onClick={onOpenVideo}
                    title="Ver video tutorial interactivo de la inducción (Acuerdo 009)"
                    className="p-1 sm:px-2 sm:py-1 flex items-center gap-1 text-xs font-bold text-[#39A900] dark:text-[#52c41a] hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#39A900] dark:fill-[#52c41a] shrink-0" />
                    <span className="hidden md:inline">Video</span>
                  </button>
                )}

                {/* Logout / Switch Learner Button */}
                {onLogoutApprentice && (
                  <button
                    onClick={onLogoutApprentice}
                    title="Cerrar sesión de este aprendiz para que otra persona use el computador"
                    className="p-1 sm:px-2 sm:py-1 flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden sm:inline">Salir</span>
                  </button>
                )}
              </div>
            )}

            {/* System Control Pill: Role Switcher + Dark Mode */}
            <div className="flex items-center gap-0.5 bg-slate-100/90 dark:bg-slate-800/90 p-0.5 rounded-xl border border-slate-200/90 dark:border-slate-700/80 shadow-2xs">
              
              {/* Role Switcher */}
              <button
                onClick={onToggleRole}
                title={
                  currentRole === 'aprendiz' 
                    ? 'Acceso a la consola de Instructor / Administrador (Protegido por contraseña)' 
                    : 'Regresar a la vista de Aprendiz'
                }
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  currentRole === 'administrador'
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700'
                }`}
              >
                {currentRole === 'administrador' ? (
                  <>
                    <UserCheck className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Ver como Aprendiz</span>
                    <span className="sm:hidden">Aprendiz</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span className="hidden sm:inline">Instructor</span>
                    <span className="sm:hidden">Admin</span>
                  </>
                )}
              </button>

              {/* Dark / Light Mode Switcher */}
              <button
                onClick={onToggleDarkMode}
                aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition-all flex items-center justify-center shrink-0"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700 transition-transform hover:-rotate-12" />
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile & Tablet Navbar (Located directly here inside the header!) */}
        {currentRole === 'aprendiz' && (
          <nav 
            aria-label="Navegación principal de inducción"
            className="lg:hidden pb-2 pt-1 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth"
          >
            {learnerNavItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              const isCert = item.id === 'certificate';

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all text-xs font-semibold shrink-0 ${
                    isActive
                      ? isCert && quizPassed
                        ? 'bg-[#39A900] text-white shadow-xs font-bold'
                        : 'text-[#39A900] dark:text-[#52c41a] bg-emerald-50 dark:bg-emerald-950/80 font-bold border border-emerald-300/60 dark:border-emerald-700/60 shadow-2xs'
                      : isCert && quizPassed
                      ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/60 dark:bg-slate-800/60 hover:bg-slate-200/80 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${
                    isActive && !(isCert && quizPassed)
                      ? 'text-[#39A900] dark:text-[#52c41a]' 
                      : isCert && quizPassed
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-slate-400'
                  }`} />
                  <span>{item.label}</span>
                  {isCert && quizPassed && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        )}

      </div>
    </header>
  );
};
