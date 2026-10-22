import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize2, 
  X, 
  RotateCcw, 
  Sparkles, 
  FastForward, 
  ExternalLink,
  Layers,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Tv
} from 'lucide-react';
import { SENA_OFFICIAL_LOGO_DATA_URI } from './SenaLogo';

export interface VideoChapter {
  time: number;
  label: string;
  shortLabel: string;
}

export const VIDEO_CHAPTERS: VideoChapter[] = [
  { time: 0, label: '0:00 - Introducción a la Inducción', shortLabel: 'Inicio' },
  { time: 12, label: '0:12 - Los 4 Pilares (Acuerdo 009)', shortLabel: '4 Pilares' },
  { time: 27, label: '0:27 - 5 Niveles para la Certificación', shortLabel: '5 Niveles' },
  { time: 41, label: '0:41 - Nivel 1: Caracterización', shortLabel: '1. Caracterización' },
  { time: 57, label: '0:57 - Nivel 2: Módulos & XP', shortLabel: '2. Módulos (+XP)' },
  { time: 71, label: '1:11 - Nivel 3: Simulador de Dilemas', shortLabel: '3. Simulador' },
  { time: 85, label: '1:25 - Nivel 4: Evaluación Final', shortLabel: '4. Evaluación' },
  { time: 97, label: '1:37 - Meta: Certificado Oficial QR', shortLabel: 'Certificado QR' },
  { time: 112, label: '1:52 - Fórmula del Éxito', shortLabel: 'Fórmula Éxito' },
  { time: 123, label: '2:03 - Preguntas Frecuentes & Cierre', shortLabel: 'Preguntas Frecuentes' },
];

interface FloatingVideoPlayerProps {
  isOpen: boolean;
  isMinimized: boolean;
  setIsMinimized: (minimized: boolean) => void;
  onClose: () => void;
  videoSrc?: string;
  initialSeek?: number;
}

export const FloatingVideoPlayer: React.FC<FloatingVideoPlayerProps> = ({
  isOpen,
  isMinimized,
  setIsMinimized,
  onClose,
  videoSrc = '/assets/aistudio/2026__4_42_p.m._e849dddb.mp4',
  initialSeek,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(142); // ~2:22 default
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [showChapters, setShowChapters] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Apply initial seek if specified
  useEffect(() => {
    if (isOpen && videoRef.current && initialSeek !== undefined) {
      videoRef.current.currentTime = initialSeek;
      videoRef.current.play().catch(() => {});
    }
  }, [isOpen, initialSeek]);

  // Handle play/pause
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Time update listener
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 142);
    }
  };

  // Handle seek via range input
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
  };

  // Jump to chapter
  const jumpToChapter = (timeInSeconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timeInSeconds;
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoRef.current.muted = nextMuted;
  };

  // Volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  // Change playback speed
  const handleSpeedChange = () => {
    const speeds = [1, 1.25, 1.5, 0.75];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackRate(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Restart video
  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Request Picture-in-Picture
  const requestPiP = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.log('PiP not available or rejected', err);
    }
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Active chapter detection
  const currentChapter = [...VIDEO_CHAPTERS]
    .reverse()
    .find((ch) => currentTime >= ch.time) || VIDEO_CHAPTERS[0];

  // Close handler (pauses video)
  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    onClose();
  };

  if (!isOpen) return null;

  // =========================================================================
  // 1. MINIMIZED FLOATING CORNER WIDGET (Bottom-Right Picture-in-Picture Style)
  // =========================================================================
  if (isMinimized) {
    return (
      <div 
        className="fixed bottom-5 right-5 z-50 w-80 sm:w-96 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700/80 overflow-hidden animate-slideUp transition-all duration-300 ring-2 ring-emerald-500/30"
        role="dialog"
        aria-label="Reproductor flotante de video tutorial"
      >
        {/* Minimized Header Bar */}
        <div className="flex items-center justify-between px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white truncate text-[11px]">
              Tutorial: Ruta de Inducción SENA
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Expand button */}
            <button
              onClick={() => setIsMinimized(false)}
              className="p-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
              title="Expandir a ventana completa"
            >
              <Maximize className="w-3.5 h-3.5" />
            </button>
            {/* Close button */}
            <button
              onClick={handleClose}
              className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors cursor-pointer"
              title="Cerrar video"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Video Screen Container */}
        <div className="relative aspect-video bg-black group">
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-contain cursor-pointer"
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            playsInline
          />

          {/* Quick Play Overlay when paused */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-emerald-600/90 text-white flex items-center justify-center hover:bg-emerald-500 transition-transform active:scale-90 shadow-lg cursor-pointer"
            >
              <Play className="w-5 h-5 ml-0.5 fill-white" />
            </button>
          )}

          {/* Active Chapter Tag in mini player */}
          <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-[10px] font-semibold text-emerald-300 px-2 py-0.5 rounded pointer-events-none">
            {currentChapter.shortLabel}
          </div>
        </div>

        {/* Mini Controls Footer */}
        <div className="p-2.5 bg-slate-900 border-t border-slate-800/80 space-y-1.5">
          {/* Scrubber */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 142}
              step="0.5"
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <span>{formatTime(duration)}</span>
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-1 rounded text-white hover:text-emerald-400 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>
              <button
                onClick={toggleMute}
                className="p-1 rounded text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            <button
              onClick={() => setIsMinimized(false)}
              className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Ver en Grande</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. EXPANDED / CENTERED FLOATING MODAL WINDOW
  // =========================================================================
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Ventana flotante de video tutorial"
    >
      <div 
        ref={containerRef}
        className="relative w-full max-w-4xl bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700/80 overflow-hidden flex flex-col max-h-[92vh] animate-scaleUp"
      >
        {/* Window Top Titlebar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-950/90 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <img
                src={SENA_OFFICIAL_LOGO_DATA_URI}
                alt="SENA"
                className="w-4 h-4 object-contain brightness-0 invert"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Video Tutorial Interactivo</span>
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                  2:22 min
                </span>
                <span className="hidden md:inline text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full">
                  Acuerdo 009 de 2024
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-white truncate">
                Ruta de Inducción SENA 2024: Guía Oficial del Aprendiz
              </h2>
            </div>
          </div>

          {/* Window Control Buttons */}
          <div className="flex items-center gap-1.5 shrink-0 ml-3">
            {/* Native PiP Button */}
            <button
              onClick={requestPiP}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Activar ventana Picture-in-Picture del navegador"
            >
              <Tv className="w-4 h-4" />
            </button>

            {/* Minimize to Corner Widget Button */}
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Minimizar a esquina flotante para navegar mientras ves el video"
            >
              <Minimize2 className="w-4 h-4" />
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Pantalla completa"
            >
              <Maximize className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer ml-1"
              title="Cerrar video"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Display */}
        <div className="relative bg-black flex-1 flex items-center justify-center overflow-hidden min-h-[240px] sm:min-h-[380px] max-h-[58vh]">
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full max-h-[58vh] object-contain cursor-pointer"
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            playsInline
            autoPlay
          />

          {/* Big Center Play/Pause button when paused */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-600/90 text-white flex items-center justify-center hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all shadow-2xl cursor-pointer"
              aria-label="Reproducir video"
            >
              <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-white" />
            </button>
          )}

          {/* Current Chapter Indicator Pill */}
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-xs font-semibold text-emerald-400 px-3 py-1 rounded-full border border-slate-700/80 flex items-center gap-1.5 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>{currentChapter.label}</span>
          </div>
        </div>

        {/* Video Controls Toolbar */}
        <div className="bg-slate-950 p-3 sm:p-4 border-t border-slate-800 space-y-3 shrink-0">
          
          {/* Progress Bar Scrubber with Chapter Markers */}
          <div className="space-y-1">
            <div className="relative flex items-center">
              <input
                type="range"
                min="0"
                max={duration || 142}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#39A900] hover:accent-emerald-400 transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-white font-bold">{formatTime(currentTime)}</span>
              <span className="text-slate-400">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Left Controls: Play, Restart, Volume */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={togglePlay}
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-xs cursor-pointer active:scale-95"
                title={isPlaying ? "Pausar (Espacio)" : "Reproducir (Espacio)"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5 fill-white" />}
              </button>

              <button
                onClick={restartVideo}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Reiniciar desde el comienzo"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Volume & Slider */}
              <div className="flex items-center gap-1.5 group">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title={isMuted ? "Activar sonido" : "Silenciar"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 sm:w-20 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#39A900]"
                  title="Ajustar volumen"
                />
              </div>

              {/* Speed Controller */}
              <button
                onClick={handleSpeedChange}
                className="px-2 py-1 text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Cambiar velocidad de reproducción"
              >
                {playbackRate}x
              </button>
            </div>

            {/* Right Controls: Chapters Toggle & Minimize to float */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowChapters(!showChapters)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  showChapters
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title="Mostrar u ocultar capítulos"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Temas del Video</span>
                {showChapters ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setIsMinimized(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                title="Minimizar a esquina flotante para continuar interactuando con la plataforma"
              >
                <Minimize2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Modo Flotante</span>
              </button>
            </div>

          </div>

          {/* Interactive Chapter Quick Jump Pills */}
          {showChapters && (
            <div className="pt-2 border-t border-slate-800/80">
              <p className="text-[11px] font-bold text-slate-400 mb-2 flex items-center justify-between">
                <span>Saltar directamente a un tema de la inducción:</span>
                <span className="text-[10px] text-emerald-400">Haz clic en cualquier fase</span>
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {VIDEO_CHAPTERS.map((ch, idx) => {
                  const isActive = currentChapter.time === ch.time;
                  return (
                    <button
                      key={idx}
                      onClick={() => jumpToChapter(ch.time)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                        isActive
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 hover:text-white'
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-80">
                        {formatTime(ch.time)}
                      </span>
                      <span>{ch.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer Note */}
        <div className="px-4 py-2 bg-slate-950 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <span>Servicio Nacional de Aprendizaje SENA · Inducción Integral 360°</span>
          <span className="text-slate-400">Puedes minimizar esta ventana para explorar la app mientras escuchas.</span>
        </div>
      </div>
    </div>
  );
};
