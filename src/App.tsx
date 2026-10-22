/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ApprenticeProfile, UserProgress, Badge } from './types/sena';
import { INITIAL_BADGES } from './data/senaData';
import { Navbar } from './components/Navbar';
import { InductionRoadmap } from './components/InductionRoadmap';
import { ModuleExplorer } from './components/ModuleExplorer';
import { CaseSimulator } from './components/CaseSimulator';
import { GamifiedQuiz } from './components/GamifiedQuiz';
import { CertificateView } from './components/CertificateView';
import { GlossaryView } from './components/GlossaryView';
import { InductionManualView } from './components/InductionManualView';
import { ProfileDrawer } from './components/ProfileDrawer';
import { GoogleSheetsSyncBar } from './components/GoogleSheetsSyncBar';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminPasswordModal } from './components/AdminPasswordModal';
import { ApprenticeOnboardingModal } from './components/ApprenticeOnboardingModal';
import { LogoutConfirmationModal } from './components/LogoutConfirmationModal';
import { FloatingVideoPlayer } from './components/FloatingVideoPlayer';
import { initAuth, googleSignIn, googleLogout, getAccessToken } from './services/googleAuth';
import { 
  syncApprenticeToSheet, 
  searchApprenticeByDocument, 
  SpreadsheetInfo, 
  StoredApprenticeData 
} from './services/googleSheetsService';
import { User } from 'firebase/auth';
import { Sparkles, Play } from 'lucide-react';

const STORAGE_KEY_PROFILE = 'sena_induction_profile_v1';
const STORAGE_KEY_PROGRESS = 'sena_induction_progress_v1';
const STORAGE_KEY_THEME = 'sena_induction_theme';
const STORAGE_KEY_SPREADSHEET = 'sena_induction_spreadsheet_v1';
const STORAGE_KEY_LAST_SYNC = 'sena_induction_last_sync_v1';
const STORAGE_KEY_ROLE = 'sena_induction_role_v1';
const STORAGE_KEY_ONBOARDED = 'sena_induction_onboarded_v1';
const SESSION_KEY_ADMIN_AUTH = 'sena_admin_auth_v1';

export default function App() {
  // Floating Video Tutorial Player state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVideoMinimized, setIsVideoMinimized] = useState(false);
  const [videoInitialSeek, setVideoInitialSeek] = useState<number | undefined>(undefined);

  const handleOpenVideo = (seekTime?: number) => {
    setVideoInitialSeek(seekTime);
    setIsVideoMinimized(false);
    setIsVideoModalOpen(true);
  };

  // Onboarding & Characterization Modal state (opens on initial landing until completed)
  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY_ONBOARDED) !== 'true';
  });

  // Logout confirmation modal state
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Admin password authentication status (Protected with password "12345678")
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_KEY_ADMIN_AUTH) === 'true';
  });
  const [showAdminPasswordModal, setShowAdminPasswordModal] = useState(false);

  // Role state: 'aprendiz' vs 'administrador'
  const [currentRole, setCurrentRole] = useState<'aprendiz' | 'administrador'>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ROLE);
    const authed = sessionStorage.getItem(SESSION_KEY_ADMIN_AUTH) === 'true';
    return saved === 'administrador' && authed ? 'administrador' : 'aprendiz';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ROLE, currentRole);
  }, [currentRole]);

  // Apprentice Profile state with browser persistence
  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      fullName: 'Juan Carlos Santos Gómez',
      documentType: 'CC',
      documentNumber: '1018492044',
      fichaNumber: '2874102',
      programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
      centerName: 'Centro de Gestión de Mercados, Logística y TIC',
      regional: 'Distrito Capital',
    };
  });

  // User Progress state with browser persistence
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      completedModules: ['mod-1'], // initial onboarding module
      completedCases: [],
      quizPassed: false,
      quizScore: 0,
      xp: 150,
      level: 1,
      badges: ['badge-onboarding'],
      certificateIssuedDate: undefined,
      certificateCode: undefined,
    };
  });

  // Certificate inspection modal for admin
  const [inspectCertificate, setInspectCertificate] = useState<{
    profile: ApprenticeProfile;
    progress: UserProgress;
  } | null>(null);

  // Dark mode state with persistent storage and system preference fallback
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(STORAGE_KEY_THEME, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(STORAGE_KEY_THEME, 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Google Sheets & Drive Sync state
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [isGoogleLoggingIn, setIsGoogleLoggingIn] = useState(false);
  const [isGoogleSyncing, setIsGoogleSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY_LAST_SYNC);
  });
  const [spreadsheetInfo, setSpreadsheetInfo] = useState<SpreadsheetInfo | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SPREADSHEET);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return null;
  });

  // Badges state
  const [badges, setBadges] = useState<Badge[]>(() => {
    return INITIAL_BADGES.map((b) => ({
      ...b,
      unlocked: progress.badges ? progress.badges.includes(b.id) : b.id === 'badge-onboarding',
    }));
  });

  // Active view for apprentice
  const [activeTab, setActiveTab] = useState<'plan' | 'modules' | 'simulator' | 'quiz' | 'glossary' | 'certificate' | 'manual'>('plan');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to local storage (Persistent in browser across reloads)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (spreadsheetInfo) {
      localStorage.setItem(STORAGE_KEY_SPREADSHEET, JSON.stringify(spreadsheetInfo));
    }
  }, [spreadsheetInfo]);

  useEffect(() => {
    if (lastSyncTime) {
      localStorage.setItem(STORAGE_KEY_LAST_SYNC, lastSyncTime);
    }
  }, [lastSyncTime]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Keep references to latest profile and progress for callbacks
  const profileRef = useRef(profile);
  const progressRef = useRef(progress);
  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  // Automatic Continuous Background Sync to Google Sheets
  const performSyncToGoogleSheets = useCallback(
    async (prof?: ApprenticeProfile, prog?: UserProgress, silent = true) => {
      const targetProfile = prof || profileRef.current;
      const targetProgress = prog || progressRef.current;
      const token = await getAccessToken();
      if (!token) return;

      setIsGoogleSyncing(true);
      try {
        const { spreadsheet } = await syncApprenticeToSheet(token, targetProfile, targetProgress);
        setSpreadsheetInfo(spreadsheet);
        const now = new Date().toLocaleTimeString('es-CO', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setLastSyncTime(now);
        if (!silent) {
          showToast('Sincronizado permanentemente con Google Sheets');
        }
      } catch (err: any) {
        console.error('Error al sincronizar con Google Sheets:', err);
        if (!silent) {
          showToast('No se pudo sincronizar automáticamente con Google Sheets');
        }
      } finally {
        setIsGoogleSyncing(false);
      }
    },
    []
  );

  // Initialize and persist Firebase Auth session on mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        if (token) {
          // Perform initial silent sync upon detecting session
          performSyncToGoogleSheets(undefined, undefined, true);
        }
      },
      () => {
        setGoogleUser(null);
      }
    );
    return () => unsubscribe();
  }, [performSyncToGoogleSheets]);

  // Handle Google Login
  const handleGoogleLogin = async () => {
    setIsGoogleLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setGoogleUser(result.user);
        showToast(`Conectado permanentemente como ${result.user.email}`);
        await performSyncToGoogleSheets(profile, progress, false);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      showToast('Error al autenticar con Google');
    } finally {
      setIsGoogleLoggingIn(false);
    }
  };

  // Handle Google Logout
  const handleGoogleLogout = async () => {
    try {
      await googleLogout();
      setGoogleUser(null);
      showToast('Sesión de Google cerrada');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Search by document number in Google Sheets
  const handleSearchDocumentInSheets = async (docNumber: string): Promise<StoredApprenticeData | null> => {
    const token = await getAccessToken();
    if (!token) {
      throw new Error('Primero debes conectar tu cuenta de Google.');
    }
    const { data } = await searchApprenticeByDocument(token, docNumber);
    return data;
  };

  // Apply restored learner data from Google Sheets into local browser state
  const handleApplyLoadedData = (data: StoredApprenticeData) => {
    const updatedProfile: ApprenticeProfile = {
      ...profile,
      documentType: (data.documentType as any) || profile.documentType,
      documentNumber: data.documentNumber || profile.documentNumber,
      fullName: data.fullName || profile.fullName,
      fichaNumber: data.fichaNumber || profile.fichaNumber,
      programName: data.programName || profile.programName,
      regional: data.regional || profile.regional,
      centerName: data.centerName || profile.centerName,
    };

    setProfile(updatedProfile);

    // Parse progress if present
    if (data.xpStr) {
      const restoredXp = parseInt(data.xpStr, 10) || progress.xp;
      const isCertified = data.statusStr.toLowerCase().includes('certificado');
      setProgress((prev) => ({
        ...prev,
        xp: restoredXp,
        quizPassed: isCertified || prev.quizPassed,
        certificateCode: data.certificateCodeStr && data.certificateCodeStr !== 'Sin certificar'
          ? data.certificateCodeStr
          : prev.certificateCode,
      }));
    }

    showToast('¡Datos del aprendiz restaurados con éxito desde Google Sheets!');
  };

  // Continuous Auto-Sync effect: Whenever profile or progress changes, auto-save to Google Sheets in background
  const initialMountRef = useRef(true);
  useEffect(() => {
    if (initialMountRef.current) {
      initialMountRef.current = false;
      return;
    }
    if (googleUser) {
      const timer = setTimeout(() => {
        performSyncToGoogleSheets(profile, progress, true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [profile, progress, googleUser, performSyncToGoogleSheets]);

  const unlockBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === badgeId && !b.unlocked) {
          showToast(`¡Nueva Insignia Desbloqueada: ${b.name}! 🎖️`);
          return { ...b, unlocked: true, unlockedAt: 'Hoy' };
        }
        return b;
      })
    );
    setProgress((prev) => ({
      ...prev,
      badges: prev.badges.includes(badgeId) ? prev.badges : [...prev.badges, badgeId],
    }));
  };

  const handleCompleteModule = (moduleId: string) => {
    if (progress.completedModules.includes(moduleId)) return;

    const newCompleted = [...progress.completedModules, moduleId];
    const newXp = progress.xp + 100;
    const newProgress = {
      ...progress,
      completedModules: newCompleted,
      xp: newXp,
    };

    setProgress(newProgress);
    showToast('¡Módulo completado con éxito! +100 XP');

    if (moduleId === 'mod-2') unlockBadge('badge-rights');
    if (moduleId === 'mod-3') unlockBadge('badge-duties');

    if (googleUser) {
      performSyncToGoogleSheets(profile, newProgress, true);
    }
  };

  const handleSolveCase = (caseId: string, xpEarned: number) => {
    if (progress.completedCases.includes(caseId)) return;

    const newCases = [...progress.completedCases, caseId];
    const newXp = progress.xp + xpEarned;
    const newProgress = {
      ...progress,
      completedCases: newCases,
      xp: newXp,
    };

    setProgress(newProgress);
    showToast(`¡Caso resuelto correctamente! +${xpEarned} XP`);

    if (newCases.length >= 3) {
      unlockBadge('badge-dilemma-master');
    }

    if (googleUser) {
      performSyncToGoogleSheets(profile, newProgress, true);
    }
  };

  const handlePassQuiz = (score: number, xpEarned: number) => {
    const formattedDate = new Date().toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const code = `SENA-IND-2024-${profile.fichaNumber || 'FICHA'}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const newProgress = {
      ...progress,
      quizPassed: true,
      quizScore: score,
      xp: progress.xp + xpEarned,
      certificateIssuedDate: formattedDate,
      certificateCode: code,
    };

    setProgress(newProgress);
    unlockBadge('badge-certified');
    showToast('¡Felicitaciones! Has certificado tu Inducción SENA.');

    if (googleUser) {
      performSyncToGoogleSheets(profile, newProgress, false);
    }
  };

  const handleToggleRole = () => {
    if (currentRole === 'aprendiz') {
      if (isAdminAuthenticated) {
        setCurrentRole('administrador');
        showToast('Ingresaste al Espacio de Instructor/Administrador');
      } else {
        setShowAdminPasswordModal(true);
      }
    } else {
      setCurrentRole('aprendiz');
      showToast('Regresaste al Espacio de Aprendiz');
    }
  };

  const handleAdminPasswordSuccess = () => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem(SESSION_KEY_ADMIN_AUTH, 'true');
    setCurrentRole('administrador');
    setShowAdminPasswordModal(false);
    showToast('Acceso concedido al Espacio de Instructor/Administrador');
  };

  const handleLockAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(SESSION_KEY_ADMIN_AUTH);
    setCurrentRole('aprendiz');
    showToast('Espacio de Instructor / Administrador bloqueado');
  };

  const handleSaveApprenticeOnboarding = (newProfile: ApprenticeProfile, isNewApprentice: boolean) => {
    setProfile(newProfile);
    localStorage.setItem(STORAGE_KEY_ONBOARDED, 'true');
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(newProfile));

    if (isNewApprentice) {
      const freshProgress: UserProgress = {
        completedModules: ['mod-1'],
        completedCases: [],
        quizPassed: false,
        quizScore: 0,
        xp: 150,
        level: 1,
        badges: ['badge-onboarding'],
        certificateIssuedDate: undefined,
        certificateCode: undefined,
      };
      setProgress(freshProgress);
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(freshProgress));
      showToast(`¡Bienvenido(a) al SENA, ${newProfile.fullName.split(' ')[0]}! Tu caracterización ha sido registrada.`);
      if (googleUser) {
        performSyncToGoogleSheets(newProfile, freshProgress, true);
      }
    } else {
      showToast(`¡Hola de nuevo, ${newProfile.fullName.split(' ')[0]}! Datos cargados con éxito.`);
      if (googleUser) {
        performSyncToGoogleSheets(newProfile, progress, true);
      }
    }
  };

  // Log out current apprentice so another person can use the computer cleanly
  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    setIsProfileOpen(false);

    // Clear local storage for current apprentice session
    localStorage.removeItem(STORAGE_KEY_PROFILE);
    localStorage.removeItem(STORAGE_KEY_PROGRESS);
    localStorage.removeItem(STORAGE_KEY_ONBOARDED);

    // Reset apprentice profile to blank
    const blankProfile: ApprenticeProfile = {
      fullName: '',
      documentType: 'CC',
      documentNumber: '',
      fichaNumber: '',
      programName: '',
      centerName: 'Centro de Gestión de Mercados, Logística y TIC',
      regional: 'Distrito Capital',
    };

    // Reset apprentice progress to blank initial state
    const blankProgress: UserProgress = {
      completedModules: [],
      completedCases: [],
      quizPassed: false,
      quizScore: 0,
      xp: 0,
      level: 1,
      badges: [],
      certificateIssuedDate: undefined,
      certificateCode: undefined,
    };

    setProfile(blankProfile);
    setProgress(blankProgress);
    setActiveTab('plan');
    setCurrentRole('aprendiz');

    // Open characterization/login modal immediately for the new user
    setShowOnboardingModal(true);
    showToast('Sesión cerrada con éxito. El computador está listo para un nuevo aprendiz.');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col w-full overflow-x-hidden transition-colors duration-200">
      {/* Top Bar Navigation with Role Switcher & Mobile Bottom Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => setActiveTab(tab)}
        openCertificate={() => setActiveTab('certificate')}
        openProfile={() => setIsProfileOpen(true)}
        openOnboarding={() => setShowOnboardingModal(true)}
        onLogoutApprentice={() => setShowLogoutModal(true)}
        onOpenVideo={() => handleOpenVideo()}
        quizPassed={progress.quizPassed}
        xp={progress.xp}
        apprenticeName={profile.fullName}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        currentRole={currentRole}
        onToggleRole={handleToggleRole}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* ============================================================== */}
        {/* ADMINISTRATOR / INSTRUCTOR SPACE                               */}
        {/* ============================================================== */}
        {currentRole === 'administrador' ? (
          <div className="space-y-6">
            {/* Google Sheets Sync & Drive Backup Bar */}
            <GoogleSheetsSyncBar
              user={googleUser}
              onLogin={handleGoogleLogin}
              onLogout={handleGoogleLogout}
              isLoggingIn={isGoogleLoggingIn}
              isSyncing={isGoogleSyncing}
              lastSyncTime={lastSyncTime}
              spreadsheetInfo={spreadsheetInfo}
              onManualSync={() => performSyncToGoogleSheets(profile, progress, false)}
              onSearchDocument={handleSearchDocumentInSheets}
              onApplyLoadedData={handleApplyLoadedData}
              currentDocumentNumber={profile.documentNumber}
            />

            {/* Admin Dashboard: Answers, Gradebook, Dilemmas Solver, System Settings */}
            <AdminDashboard
              currentProfile={profile}
              currentProgress={progress}
              spreadsheetInfo={spreadsheetInfo}
              onOpenCertificateForApprentice={(prof, prog) => setInspectCertificate({ profile: prof, progress: prog })}
              onManualSync={() => performSyncToGoogleSheets(profile, progress, false)}
              onLockAdmin={handleLockAdmin}
            />
          </div>
        ) : (
          /* ============================================================== */
          /* APPRENTICE SPACE: Only learner modules & journey              */
          /* ============================================================== */
          <div className="space-y-6">
            {activeTab === 'plan' && (
              <InductionRoadmap
                progress={progress}
                badges={badges}
                onNavigate={(tab) => setActiveTab(tab)}
                onOpenCertificate={() => setActiveTab('certificate')}
                onOpenVideo={handleOpenVideo}
              />
            )}

            {activeTab === 'modules' && (
              <ModuleExplorer
                completedModules={progress.completedModules}
                onCompleteModule={handleCompleteModule}
                onNavigateToSimulator={() => setActiveTab('simulator')}
              />
            )}

            {activeTab === 'simulator' && (
              <CaseSimulator
                completedCases={progress.completedCases}
                onSolveCase={handleSolveCase}
                onNavigateToQuiz={() => setActiveTab('quiz')}
              />
            )}

            {activeTab === 'quiz' && (
              <GamifiedQuiz
                quizPassed={progress.quizPassed}
                bestScore={progress.quizScore}
                onPassQuiz={handlePassQuiz}
                onOpenCertificate={() => setActiveTab('certificate')}
              />
            )}

            {activeTab === 'manual' && (
              <InductionManualView
                onNavigate={(tab) => setActiveTab(tab)}
                openOnboarding={() => setShowOnboardingModal(true)}
                progress={progress}
                profile={profile}
              />
            )}

            {activeTab === 'glossary' && <GlossaryView />}

            {activeTab === 'certificate' && (
              <CertificateView
                profile={profile}
                progress={progress}
                onEditProfile={() => setIsProfileOpen(true)}
                onNavigateToQuiz={() => setActiveTab('quiz')}
                onClose={() => setActiveTab('plan')}
              />
            )}
          </div>
        )}
      </main>

      {/* Admin Certificate Inspector Modal */}
      {inspectCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CertificateView
              profile={inspectCertificate.profile}
              progress={inspectCertificate.progress}
              onEditProfile={() => {}}
              onNavigateToQuiz={() => {}}
              onClose={() => setInspectCertificate(null)}
            />
          </div>
        </div>
      )}

      {/* Profile Drawer / Modal with Sheet Query feature */}
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        setProfile={setProfile}
        xp={progress.xp}
        onSearchFromSheets={currentRole === 'administrador' && googleUser ? handleSearchDocumentInSheets : undefined}
        isGoogleConnected={currentRole === 'administrador' && !!googleUser}
        openOnboarding={() => setShowOnboardingModal(true)}
        onLogout={() => setShowLogoutModal(true)}
      />

      {/* Apprentice Onboarding & Characterization Modal (Triggers on landing) */}
      <ApprenticeOnboardingModal
        isOpen={showOnboardingModal}
        onClose={() => setShowOnboardingModal(false)}
        currentProfile={profile}
        onSaveProfile={handleSaveApprenticeOnboarding}
      />

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
        apprenticeName={profile.fullName}
        documentNumber={profile.documentNumber}
      />

      {/* Admin Security Password Gate Modal */}
      <AdminPasswordModal
        isOpen={showAdminPasswordModal}
        onClose={() => setShowAdminPasswordModal(false)}
        onSuccess={handleAdminPasswordSuccess}
      />

      {/* Floating Video Tutorial Player (Center Modal or Corner Floating Window) */}
      <FloatingVideoPlayer
        isOpen={isVideoModalOpen}
        isMinimized={isVideoMinimized}
        setIsMinimized={setIsVideoMinimized}
        onClose={() => setIsVideoModalOpen(false)}
        initialSeek={videoInitialSeek}
        videoSrc="/assets/aistudio/2026__4_42_p.m._e849dddb.mp4"
      />

      {/* Quick Floating Video Launcher Button (When video is closed and in apprentice view) */}
      {!isVideoModalOpen && currentRole === 'aprendiz' && (
        <button
          onClick={() => handleOpenVideo()}
          className="no-print fixed bottom-6 right-6 z-30 flex items-center gap-2 px-3.5 py-2.5 bg-gradient-to-r from-emerald-600 to-[#39A900] hover:from-emerald-500 hover:to-[#329200] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer active:scale-95 border border-emerald-400/40"
          title="Ver video tutorial interactivo de inducción"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
          </div>
          <span className="text-xs font-bold hidden sm:inline pr-1">Video Tutorial</span>
        </button>
      )}

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl shadow-xl text-xs sm:text-sm font-semibold border border-slate-700 dark:border-slate-200 animate-slideUp">
          <Sparkles className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Institutional Footer */}
      <footer className="no-print bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-16 py-6 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">SENA</span>
            <span>·</span>
            <span>Servicio Nacional de Aprendizaje</span>
            <span>·</span>
            <span className="text-[#39A900] dark:text-[#52c41a] font-medium">Acuerdo 009 de 2024</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Ruta de Formación Profesional Integral</span>
            <span>Espacios Diferenciados (Aprendiz / Instructor)</span>
            <span>Gratuidad y Transparencia</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
