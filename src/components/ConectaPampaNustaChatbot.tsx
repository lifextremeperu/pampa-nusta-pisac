import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Video,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Send,
  Sparkles,
  Sprout,
  Wheat,
  Flame,
  Tent,
  Compass,
  RotateCcw,
  MessageCircle,
  HelpCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { VIDEO_CALL_TOPICS, AVAILABLE_TIME_SLOTS } from '../data/videoCallTopics';
import { VideoCallBooking, VideoCallTopic } from '../types';
import { andeanAudio } from '../utils/audioSynthesizer';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  optionsType?: 'topic' | 'platform' | 'date_time' | 'contact_form' | 'confirmation';
  bookingData?: Partial<VideoCallBooking>;
}

interface ConectaPampaNustaChatbotProps {
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export const ConectaPampaNustaChatbot: React.FC<ConectaPampaNustaChatbotProps> = ({
  isOpenExternal,
  onCloseExternal,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isLauncherMinimized, setIsLauncherMinimized] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Booking draft state
  const [selectedTopic, setSelectedTopic] = useState<VideoCallTopic | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<'meet' | 'whatsapp' | 'zoom'>('meet');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [userNotes, setUserNotes] = useState<string>('');
  const [completedBooking, setCompletedBooking] = useState<VideoCallBooking | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Synchronize with external open triggers
  useEffect(() => {
    if (isOpenExternal !== undefined) {
      setIsOpen(isOpenExternal);
      if (isOpenExternal) setIsMinimized(false);
    }
  }, [isOpenExternal]);

  // Generate next 7 available dates
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'];

    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayName = dayNames[d.getDay()];
      const dayNum = d.getDate();
      const month = monthNames[d.getMonth()];
      const dateString = `${dayName} ${dayNum} ${month}`;
      const isoDate = d.toISOString().split('T')[0];
      dates.push({ label: dateString, value: isoDate, isTomorrow: i === 1 });
    }
    return dates;
  }, []);

  // Set default selected date
  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0].label);
    }
  }, [availableDates, selectedDate]);

  // Initialize chat messages
  useEffect(() => {
    try {
      const savedBooking = localStorage.getItem('pampa_nusta_active_booking');
      if (savedBooking) {
        const parsed = JSON.parse(savedBooking);
        setCompletedBooking(parsed);
      }

      const savedChat = localStorage.getItem('pampa_nusta_chat_history');
      if (savedChat) {
        setMessages(JSON.parse(savedChat));
        return;
      }
    } catch {
      // Ignore
    }

    // Default starting message
    const initialMessage: Message = {
      id: 'msg-1',
      sender: 'bot',
      text: '¡Allillanchu! Bienvenido a Conecta con Pampa Ñusta. Soy el asistente de coordinación del santuario en Pisac. Puedes agendar una sesión de videollamada personalizada de 30 minutos con uno de nuestros colaboradores o guardianes. ¿Sobre qué tema te gustaría conversar?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      optionsType: 'topic',
    };
    setMessages([initialMessage]);
  }, []);

  // Save chat to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem('pampa_nusta_chat_history', JSON.stringify(messages));
      } catch {
        // Ignore
      }
    }
  }, [messages]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addBotMessage = (text: string, optionsType?: Message['optionsType'], bookingData?: Partial<VideoCallBooking>) => {
    setIsTyping(true);
    setTimeout(() => {
      // Gentle chime
      try {
        andeanAudio.playFluteNote?.(540, 0.25);
      } catch {
        // Ignore
      }

      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        optionsType,
        bookingData,
      };
      setMessages((prev) => [...prev, newMsg]);
      setIsTyping(false);
    }, 600);
  };

  const addUserMessage = (text: string) => {
    const newMsg: Message = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  // Step 1: Handle Topic Selection
  const handleSelectTopic = (topic: VideoCallTopic) => {
    setSelectedTopic(topic);
    addUserMessage(`Quiero conversar sobre: ${topic.title}`);

    addBotMessage(
      `Excelente. Te conectaremos con ${topic.collaboratorName} (${topic.collaboratorRole}). ${topic.description} ¿A través de qué plataforma prefieres realizar la videollamada de 30 minutos?`,
      'platform'
    );
  };

  // Step 2: Handle Platform Selection
  const handleSelectPlatform = (platform: 'meet' | 'whatsapp' | 'zoom') => {
    setSelectedPlatform(platform);
    const platformNames = {
      meet: 'Google Meet (Enlace directo)',
      whatsapp: 'WhatsApp Video',
      zoom: 'Zoom',
    };
    addUserMessage(`Plataforma elegida: ${platformNames[platform]}`);

    addBotMessage(
      `Perfecto, usaremos ${platformNames[platform]}. Ahora, por favor selecciona el día y el turno horario que mejor se acomode a tu agenda (Hora de Perú / Cusco GMT-5):`,
      'date_time'
    );
  };

  // Step 3: Handle Date & Time Selection
  const handleConfirmDateTime = () => {
    if (!selectedDate || !selectedSlot) return;
    const slotObj = AVAILABLE_TIME_SLOTS.find((s) => s.id === selectedSlot);
    addUserMessage(`Fecha: ${selectedDate} · Horario: ${slotObj?.label || selectedSlot}`);

    addBotMessage(
      `¡Excelente disponibilidad! Para formalizar la videollamada y enviarte el acceso directo, por favor indícanos tus datos de contacto:`,
      'contact_form'
    );
  };

  // Step 4: Handle Contact Form Submission
  const handleSubmitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim() || !userPhone.trim()) return;

    addUserMessage(`Mis datos: ${userName} · ${userEmail} · ${userPhone}${userNotes ? ` · Consulta: "${userNotes}"` : ''}`);

    const bookingCode = `PN-CALL-${Math.floor(1000 + Math.random() * 9000)}`;
    const slotObj = AVAILABLE_TIME_SLOTS.find((s) => s.id === selectedSlot);

    const newBooking: VideoCallBooking = {
      bookingCode,
      topicId: selectedTopic?.id || 'general',
      topicTitle: selectedTopic?.title || 'Consulta General Pampa Ñusta',
      collaboratorName: selectedTopic?.collaboratorName || 'Equipo Pampa Ñusta',
      collaboratorRole: selectedTopic?.collaboratorRole || 'Guardián del Santuario',
      date: selectedDate,
      timeSlot: slotObj?.label || '10:00 AM - 10:30 AM',
      platform: selectedPlatform,
      userName,
      userEmail,
      userPhone,
      userNotes,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    setCompletedBooking(newBooking);
    try {
      localStorage.setItem('pampa_nusta_active_booking', JSON.stringify(newBooking));
    } catch {
      // Ignore
    }

    addBotMessage(
      `¡Tu videollamada ha sido programada con éxito! Tu código oficial de reserva es ${bookingCode}. A continuación tienes la ficha con todos los detalles y las opciones para sincronizarla en tu calendario o avisar directamente por WhatsApp a nuestro equipo en Pisac:`,
      'confirmation',
      newBooking
    );
  };

  // Handle Free-Form Chat Questions
  const handleSendFreeText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText('');
    addUserMessage(userText);

    const lower = userText.toLowerCase();

    // Smart contextual Andean responses
    if (lower.includes('donde') || lower.includes('ubicacion') || lower.includes('llegar') || lower.includes('pisac')) {
      addBotMessage(
        'Pampa Ñusta se encuentra ubicado en las faldas sagradas del Apu Linli en Pisac, Valle Sagrado de los Incas (a 3,347 msnm), a unos 45 minutos de la ciudad de Cusco. Si deseas coordinar tu visita en persona o conocer las rutas exactas, podemos programar una videollamada informativa de 30 minutos. ¿Deseas elegir un horario?',
        selectedTopic ? 'date_time' : 'topic'
      );
    } else if (lower.includes('costo') || lower.includes('precio') || lower.includes('cuanto cuesta') || lower.includes('pago')) {
      addBotMessage(
        '¡Las sesiones de videollamada informativa y de primera orientación con nuestros colaboradores son 100% gratuitas como parte de nuestro principio andino de Ayni (reciprocidad sagrada)! ¿Te gustaría agendar una fecha para resolver tus preguntas específicas?',
        selectedTopic ? 'date_time' : 'topic'
      );
    } else if (lower.includes('wachuma') || lower.includes('san pedro') || lower.includes('cactus')) {
      addBotMessage(
        'En nuestro Banco Genético Wachuma Wasi custodiamos más de 40 linajes botánicos de cactáceas sagradas a 3,347 msnm. Puedes conversar directamente en videollamada con nuestra bióloga Saywa Quispe para conocer los protocolos de conservación y visitas.',
        'topic'
      );
    } else if (lower.includes('ceremonia') || lower.includes('retiro') || lower.includes('planta')) {
      addBotMessage(
        'Nuestras ceremonias y retiros se realizan en la Maloka Willka Kancha con fuego sagrado y armonización a 432 Hz. Para hablar sobre la preparación dietaria y fechas ceremoniales, te sugerimos una videollamada con Kantu Valderrama.',
        'topic'
      );
    } else if (lower.includes('reiniciar') || lower.includes('nuevo') || lower.includes('otra')) {
      handleResetChat();
    } else {
      addBotMessage(
        `Gracias por tu mensaje. Para brindarte una respuesta profunda y personalizada desde Pisac, ¿te gustaría agendar una videollamada programada de 30 minutos con uno de nuestros colaboradores? Puedes seleccionar el tema aquí:`,
        'topic'
      );
    }
  };

  const handleResetChat = () => {
    localStorage.removeItem('pampa_nusta_chat_history');
    localStorage.removeItem('pampa_nusta_active_booking');
    setSelectedTopic(null);
    setCompletedBooking(null);
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setUserNotes('');
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: '¡Sesión reiniciada! Bienvenido/a nuevamente a Conecta con Pampa Ñusta. ¿Sobre qué tema deseas agendar tu videollamada programada?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        optionsType: 'topic',
      },
    ]);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseExternal) onCloseExternal();
  };

  // Google Calendar URL Generator
  const getGoogleCalendarUrl = (booking: VideoCallBooking) => {
    const title = encodeURIComponent(`Videollamada Pampa Ñusta · ${booking.topicTitle}`);
    const details = encodeURIComponent(
      `Sesión programada con ${booking.collaboratorName} (${booking.collaboratorRole}).\nPlataforma: ${booking.platform.toUpperCase()}\nCódigo de Reserva: ${booking.bookingCode}\nSantuario Ecológico Pampa Ñusta, Pisac.`
    );
    const location = encodeURIComponent(booking.platform === 'meet' ? 'Google Meet' : 'Pampa Ñusta / Online');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  // WhatsApp Message Generator
  const getWhatsAppBookingUrl = (booking: VideoCallBooking) => {
    const text = encodeURIComponent(
      `¡Hola Pampa Ñusta! He programado una videollamada a través del chatbot:\n\n` +
      `📌 *Código:* ${booking.bookingCode}\n` +
      `👤 *Nombre:* ${booking.userName}\n` +
      `🌿 *Tema:* ${booking.topicTitle}\n` +
      `🤝 *Colaborador:* ${booking.collaboratorName}\n` +
      `📅 *Fecha:* ${booking.date}\n` +
      `⏰ *Horario:* ${booking.timeSlot} (Hora Perú)\n` +
      `💻 *Plataforma:* ${booking.platform.toUpperCase()}\n\n` +
      `Agradezco la confirmación por este medio.`
    );
    return `https://wa.me/51958050928?text=${text}`;
  };

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout': return <Sprout className="w-4 h-4 text-emerald-400" />;
      case 'Wheat': return <Wheat className="w-4 h-4 text-amber-400" />;
      case 'Flame': return <Flame className="w-4 h-4 text-rose-400" />;
      case 'Tent': return <Tent className="w-4 h-4 text-yellow-400" />;
      default: return <Compass className="w-4 h-4 text-[#d8974a]" />;
    }
  };

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* FLOATING TRIGGER BUTTON (PULSING BOT AVATAR & CALL BADGE)     */}
      {/* Supports clicking to open and clicking to minimize/expand     */}
      {/* ------------------------------------------------------------- */}
      {!isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50">
          {!isLauncherMinimized ? (
            <div className="flex items-center gap-1.5 animate-bounce-subtle">
              {/* Main Pill Button */}
              <button
                onClick={() => {
                  setIsOpen(true);
                  setIsMinimized(false);
                }}
                id="conecta-chatbot-trigger-btn"
                className="group relative flex items-center gap-3 p-2 sm:p-2.5 pl-2.5 sm:pl-3 rounded-full bg-gradient-to-r from-[#211710] to-[#3a281c] border-2 border-amber-500/80 shadow-[0_10px_35px_rgba(0,0,0,0.85)] hover:border-amber-400 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                aria-label="Abrir Chatbot de Reserva Conecta con Pampa Ñusta"
              >
                {/* Online Indicator Ping */}
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-stone-900" />
                </span>

                {/* Avatar Circle with Andean Glow */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-amber-400/90 shrink-0 bg-stone-900 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
                    alt="Colaboradora Pampa Ñusta"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Typography Label */}
                <div className="text-left pr-1 sm:pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-cinzel text-xs sm:text-sm font-bold text-amber-200 tracking-wider">
                      CONECTA CON PAMPA ÑUSTA
                    </span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] text-[#ded0bf] block">
                    Agendar Videollamada 1 a 1 · En vivo
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/50 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors text-amber-300">
                  <Video className="w-4 h-4" />
                </div>
              </button>

              {/* Explicit Minimize Button on Floating Pill */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLauncherMinimized(true);
                }}
                className="w-8 h-8 rounded-full bg-[#201610] hover:bg-[#322319] border border-amber-500/60 hover:border-amber-400 text-amber-300 flex items-center justify-center transition-all shadow-lg cursor-pointer shrink-0"
                title="Minimizar a icono redondo"
                aria-label="Minimizar icono de Conecta con Pampa Ñusta"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            /* Minimized Sleek Circular Floating Badge */
            <div className="flex items-center gap-1.5 animate-fadeIn">
              <button
                onClick={() => {
                  setIsOpen(true);
                  setIsMinimized(false);
                }}
                id="conecta-chatbot-trigger-minimized-btn"
                className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#211710] to-[#3a281c] border-2 border-amber-400 shadow-[0_8px_30px_rgba(0,0,0,0.85)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                title="Conecta con Pampa Ñusta · Click para abrir"
                aria-label="Conecta con Pampa Ñusta"
              >
                {/* Online Indicator Ping */}
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-emerald-500 border-2 border-stone-900" />
                </span>

                <div className="w-full h-full rounded-full overflow-hidden p-0.5">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
                    alt="Colaboradora Pampa Ñusta"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Video Badge */}
                <span className="absolute -bottom-1 -left-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center border-2 border-stone-900 shadow-md">
                  <Video className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </span>
              </button>

              {/* Expand Text Label Button */}
              <button
                onClick={() => setIsLauncherMinimized(false)}
                className="w-7 h-7 rounded-full bg-[#201610] hover:bg-[#322319] border border-amber-500/50 text-amber-300 flex items-center justify-center shadow-md transition-all cursor-pointer"
                title="Expandir texto de Conecta con Pampa Ñusta"
                aria-label="Expandir texto"
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* EXPANDED CHATBOT WINDOW (MODAL ON MOBILE / CORNER ON DESKTOP)  */}
      {/* ------------------------------------------------------------- */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isMinimized
              ? 'bottom-4 right-4 w-72 sm:w-80 h-16'
              : 'bottom-0 right-0 sm:bottom-5 sm:right-5 w-full sm:w-[440px] md:w-[480px] h-[92vh] sm:h-[650px] max-h-[95vh]'
          }`}
        >
          <div className="w-full h-full flex flex-col bg-[#16110c] sm:rounded-3xl border-t sm:border border-amber-600/60 shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden backdrop-blur-2xl">
            
            {/* Top Chatbot Header */}
            <div
              onClick={() => {
                if (isMinimized) setIsMinimized(false);
              }}
              className={`px-4 py-3.5 bg-gradient-to-r from-[#261b13] via-[#1f150e] to-[#261b13] border-b border-[#443123] flex items-center justify-between shrink-0 ${
                isMinimized ? 'cursor-pointer hover:bg-[#2c1f16]' : ''
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-amber-400/80 bg-stone-900 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
                    alt="Pampa Ñusta"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-stone-900" />
                </div>
                <div>
                  <h2 className="font-cinzel text-xs sm:text-sm font-bold text-amber-200 tracking-wider flex items-center gap-1.5">
                    <span>CONECTA CON PAMPA ÑUSTA</span>
                    <span className="text-[9px] font-mono font-normal bg-amber-950/80 text-amber-300 border border-amber-700/50 px-1.5 py-0.2 rounded">
                      EN VIVO
                    </span>
                  </h2>
                  <p className="font-mono text-[10px] text-stone-300">
                    {isMinimized ? 'Haz click para maximizar' : 'Reserva de Videollamada 1 a 1 · Pisac (3,347 msnm)'}
                  </p>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                {!isMinimized && (
                  <button
                    onClick={handleResetChat}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-amber-300 hover:bg-[#332317] transition-colors"
                    title="Reiniciar conversación"
                    aria-label="Reiniciar chat"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-amber-300 hover:bg-[#332317] transition-colors"
                  title={isMinimized ? 'Maximizar ventana' : 'Minimizar ventana'}
                  aria-label={isMinimized ? 'Maximizar' : 'Minimizar'}
                >
                  {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-[#332317] transition-colors"
                  title="Cerrar chat"
                  aria-label="Cerrar chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* If Minimized, only header shows */}
            {!isMinimized && (
              <>
                {/* Chat Messages Stream */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm font-sans bg-radial from-[#1e1610]/70 to-[#120d09]">
                  
                  {/* Sanctuary Atmosphere Intro Banner */}
                  <div className="p-3 rounded-xl bg-[#221811]/90 border border-[#433123] text-center font-mono text-[10px] sm:text-[11px] text-[#ded0bf] leading-relaxed">
                    <span className="text-amber-400 font-bold block mb-0.5">🌾 VALLE SAGRADO DE LOS INCAS</span>
                    Coordina una sesión sin costo de 30 minutos con los guardianes botánicos, facilitadores ceremoniales o coordinadores de Pampa Ñusta.
                  </div>

                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      {/* Message Bubble */}
                      <div
                        className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed shadow-lg ${
                          msg.sender === 'user'
                            ? 'bg-[#c2853f] text-[#14100c] font-medium rounded-tr-none'
                            : 'bg-[#221811] text-[#f2e7db] border border-[#473426] rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="font-mono text-[9px] text-[#8e7a68] mt-1 px-1">
                        {msg.timestamp}
                      </span>

                      {/* --------------------------------------------------- */}
                      {/* INTERACTIVE COMPONENT: STEP 1 - TOPIC SELECTION     */}
                      {/* --------------------------------------------------- */}
                      {msg.optionsType === 'topic' && (
                        <div className="mt-3 w-full space-y-2 animate-fadeIn">
                          <span className="font-mono text-[10px] text-[#e5aa5d] font-bold uppercase tracking-wider block">
                            Elige el tema de tu videollamada:
                          </span>
                          <div className="grid grid-cols-1 gap-2">
                            {VIDEO_CALL_TOPICS.map((topic) => (
                              <button
                                key={topic.id}
                                onClick={() => handleSelectTopic(topic)}
                                className="p-3 rounded-xl bg-[#1e150f] border border-[#443123] hover:border-amber-500 hover:bg-[#2c1e15] transition-all text-left flex items-start gap-3 group cursor-pointer"
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#2e1f15] border border-[#523d2b] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                  {getTopicIcon(topic.iconName)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-cinzel text-xs font-bold text-[#f5eee6] group-hover:text-amber-300 truncate">
                                      {topic.title}
                                    </h4>
                                    <ChevronRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                                  </div>
                                  <p className="font-mono text-[10px] text-amber-500 font-semibold mt-0.5">
                                    Con: {topic.collaboratorName} · {topic.collaboratorRole}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* --------------------------------------------------- */}
                      {/* INTERACTIVE COMPONENT: STEP 2 - PLATFORM SELECTION  */}
                      {/* --------------------------------------------------- */}
                      {msg.optionsType === 'platform' && (
                        <div className="mt-3 w-full space-y-2 animate-fadeIn">
                          <span className="font-mono text-[10px] text-[#e5aa5d] font-bold uppercase tracking-wider block">
                            Selecciona tu plataforma de conexión:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <button
                              onClick={() => handleSelectPlatform('meet')}
                              className="p-3 rounded-xl bg-[#1e150f] border border-[#443123] hover:border-emerald-500 hover:bg-[#281c13] transition-all text-center flex flex-col items-center gap-1.5 cursor-pointer group"
                            >
                              <div className="w-8 h-8 rounded-full bg-emerald-950/60 border border-emerald-600/50 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                <Video className="w-4 h-4" />
                              </div>
                              <span className="font-cinzel text-xs font-bold text-stone-200 group-hover:text-emerald-300">
                                Google Meet
                              </span>
                              <span className="text-[9px] font-mono text-stone-400">
                                Enlace directo
                              </span>
                            </button>

                            <button
                              onClick={() => handleSelectPlatform('whatsapp')}
                              className="p-3 rounded-xl bg-[#1e150f] border border-[#443123] hover:border-emerald-500 hover:bg-[#281c13] transition-all text-center flex flex-col items-center gap-1.5 cursor-pointer group"
                            >
                              <div className="w-8 h-8 rounded-full bg-emerald-950/60 border border-emerald-600/50 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-4 h-4" />
                              </div>
                              <span className="font-cinzel text-xs font-bold text-stone-200 group-hover:text-emerald-300">
                                WhatsApp
                              </span>
                              <span className="text-[9px] font-mono text-stone-400">
                                Videollamada
                              </span>
                            </button>

                            <button
                              onClick={() => handleSelectPlatform('zoom')}
                              className="p-3 rounded-xl bg-[#1e150f] border border-[#443123] hover:border-sky-500 hover:bg-[#281c13] transition-all text-center flex flex-col items-center gap-1.5 cursor-pointer group"
                            >
                              <div className="w-8 h-8 rounded-full bg-sky-950/60 border border-sky-600/50 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                                <ExternalLink className="w-4 h-4" />
                              </div>
                              <span className="font-cinzel text-xs font-bold text-stone-200 group-hover:text-sky-300">
                                Zoom
                              </span>
                              <span className="text-[9px] font-mono text-stone-400">
                                ID de reunión
                              </span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* --------------------------------------------------- */}
                      {/* INTERACTIVE COMPONENT: STEP 3 - DATE & TIME SLOTS   */}
                      {/* --------------------------------------------------- */}
                      {msg.optionsType === 'date_time' && (
                        <div className="mt-3 w-full p-4 rounded-2xl bg-[#1d140e] border border-[#4a3626] space-y-3.5 animate-fadeIn">
                          <div>
                            <span className="font-mono text-[10px] text-[#e5aa5d] font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2">
                              <Calendar className="w-3.5 h-3.5 text-[#d8974a]" />
                              <span>1. Selecciona el Día (Próximos 7 días):</span>
                            </span>
                            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                              {availableDates.map((dateObj) => (
                                <button
                                  key={dateObj.value}
                                  onClick={() => setSelectedDate(dateObj.label)}
                                  className={`px-3 py-2 rounded-xl text-[10px] sm:text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                                    selectedDate === dateObj.label
                                      ? 'bg-[#c2853f] text-[#14100c] font-bold shadow-md'
                                      : 'bg-[#291d14] text-stone-300 hover:bg-[#38281b] border border-[#443123]'
                                  }`}
                                >
                                  {dateObj.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="font-mono text-[10px] text-[#e5aa5d] font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2">
                              <Clock className="w-3.5 h-3.5 text-[#d8974a]" />
                              <span>2. Turno Horario (Hora Perú GMT-5):</span>
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {AVAILABLE_TIME_SLOTS.map((slot) => (
                                <button
                                  key={slot.id}
                                  onClick={() => setSelectedSlot(slot.id)}
                                  className={`p-2.5 rounded-xl text-[11px] font-mono flex items-center justify-between transition-all cursor-pointer ${
                                    selectedSlot === slot.id
                                      ? 'bg-emerald-900/90 text-emerald-200 border border-emerald-400 font-bold shadow-md'
                                      : 'bg-[#251a12] text-stone-300 hover:bg-[#342519] border border-[#412f22]'
                                  }`}
                                >
                                  <span>{slot.label}</span>
                                  {selectedSlot === slot.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                                </button>
                              ))}
                            </div>
                          </div>

                          <button
                            onClick={handleConfirmDateTime}
                            disabled={!selectedDate || !selectedSlot}
                            className="w-full py-2.5 px-4 rounded-xl bg-[#c2853f] hover:bg-[#d8974a] disabled:opacity-40 disabled:cursor-not-allowed text-[#14100c] font-cinzel font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                          >
                            <span>Continuar con este Horario</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* --------------------------------------------------- */}
                      {/* INTERACTIVE COMPONENT: STEP 4 - USER CONTACT FORM   */}
                      {/* --------------------------------------------------- */}
                      {msg.optionsType === 'contact_form' && (
                        <form
                          onSubmit={handleSubmitContactForm}
                          className="mt-3 w-full p-4 rounded-2xl bg-[#1d140e] border border-[#4a3626] space-y-3 animate-fadeIn text-left"
                        >
                          <div>
                            <label className="font-mono text-[10px] text-[#e5aa5d] font-bold uppercase tracking-wider block mb-1">
                              Nombre Completo: *
                            </label>
                            <div className="relative">
                              <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                              <input
                                type="text"
                                required
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Ej. Maria Elena Quispe"
                                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#120c08] border border-[#412f22] text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="font-mono text-[10px] text-[#e5aa5d] font-bold uppercase tracking-wider block mb-1">
                              Correo Electrónico (para el enlace de reunión): *
                            </label>
                            <div className="relative">
                              <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                              <input
                                type="email"
                                required
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder="maria@ejemplo.com"
                                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#120c08] border border-[#412f22] text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="font-mono text-[10px] text-[#e5aa5d] font-bold uppercase tracking-wider block mb-1">
                              Teléfono / WhatsApp (con código de país): *
                            </label>
                            <div className="relative">
                              <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                              <input
                                type="tel"
                                required
                                value={userPhone}
                                onChange={(e) => setUserPhone(e.target.value)}
                                placeholder="+51 987 654 321"
                                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#120c08] border border-[#412f22] text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="font-mono text-[10px] text-[#a89582] uppercase tracking-wider block mb-1">
                              ¿Alguna pregunta o tema clave para la llamada? (Opcional)
                            </label>
                            <textarea
                              rows={2}
                              value={userNotes}
                              onChange={(e) => setUserNotes(e.target.value)}
                              placeholder="Ej. Deseo conocer fechas del próximo taller y requisitos para visitar el santuario..."
                              className="w-full p-2.5 rounded-xl bg-[#120c08] border border-[#412f22] text-stone-100 text-xs focus:outline-none focus:border-amber-500 resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-cinzel font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Confirmar Reserva de Videollamada</span>
                          </button>
                        </form>
                      )}

                      {/* --------------------------------------------------- */}
                      {/* INTERACTIVE COMPONENT: STEP 5 - CONFIRMATION CARD   */}
                      {/* --------------------------------------------------- */}
                      {msg.optionsType === 'confirmation' && msg.bookingData && (
                        <div className="mt-3 w-full p-4 rounded-2xl bg-[#1d150f] border-2 border-emerald-500/70 shadow-2xl animate-fadeIn text-left">
                          
                          {/* Confirmation Header */}
                          <div className="flex items-center justify-between pb-3 border-b border-[#3e2c1e]">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-wider block">
                                  RESERVA CONFIRMADA
                                </span>
                                <h4 className="font-cinzel text-xs font-bold text-amber-200">
                                  Ficha Oficial de Videollamada
                                </h4>
                              </div>
                            </div>
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#2c1e15] border border-amber-600/50 text-amber-400">
                              {msg.bookingData.bookingCode}
                            </span>
                          </div>

                          {/* Reservation Summary */}
                          <div className="py-3 space-y-2 text-xs">
                            <div className="flex items-center justify-between text-stone-300">
                              <span className="text-stone-400 font-mono text-[10px] uppercase">Tema:</span>
                              <span className="font-semibold text-right max-w-[220px] truncate">{msg.bookingData.topicTitle}</span>
                            </div>
                            <div className="flex items-center justify-between text-stone-300">
                              <span className="text-stone-400 font-mono text-[10px] uppercase">Colaborador:</span>
                              <span className="font-semibold text-amber-300">{msg.bookingData.collaboratorName}</span>
                            </div>
                            <div className="flex items-center justify-between text-stone-300">
                              <span className="text-stone-400 font-mono text-[10px] uppercase">Fecha y Hora:</span>
                              <span className="font-semibold text-emerald-300">{msg.bookingData.date} · {msg.bookingData.timeSlot}</span>
                            </div>
                            <div className="flex items-center justify-between text-stone-300">
                              <span className="text-stone-400 font-mono text-[10px] uppercase">Plataforma:</span>
                              <span className="font-mono uppercase font-bold text-amber-400">{msg.bookingData.platform}</span>
                            </div>
                            <div className="flex items-center justify-between text-stone-300">
                              <span className="text-stone-400 font-mono text-[10px] uppercase">Participante:</span>
                              <span>{msg.bookingData.userName}</span>
                            </div>
                          </div>

                          {/* Action Buttons: WhatsApp & Google Calendar */}
                          <div className="pt-3 border-t border-[#3e2c1e] space-y-2">
                            <a
                              href={getWhatsAppBookingUrl(msg.bookingData as VideoCallBooking)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 shadow-lg text-center"
                            >
                              <MessageCircle className="w-4 h-4 fill-white" />
                              <span>Notificar por WhatsApp (+51 958 050 928)</span>
                            </a>

                            <a
                              href={getGoogleCalendarUrl(msg.bookingData as VideoCallBooking)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2 px-3 rounded-xl bg-[#281c13] hover:bg-[#38271a] border border-amber-600/50 text-amber-300 font-mono text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 text-center"
                            >
                              <Calendar className="w-3.5 h-3.5" />
                              <span>Agregar a Google Calendar</span>
                            </a>
                          </div>

                        </div>
                      )}

                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#221811] border border-[#473426] text-amber-400 max-w-[120px]">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Free Text Input Form */}
                <form
                  onSubmit={handleSendFreeText}
                  className="p-3 bg-[#18120c] border-t border-[#3e2c1e] flex items-center gap-2 shrink-0"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Escribe tu pregunta o tema de consulta..."
                    className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#100b07] border border-[#443123] text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="p-2.5 rounded-xl bg-[#c2853f] hover:bg-[#d8974a] disabled:opacity-40 disabled:cursor-not-allowed text-[#14100c] transition-colors cursor-pointer"
                    aria-label="Enviar mensaje"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
};
