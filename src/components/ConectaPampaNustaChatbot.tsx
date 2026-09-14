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
  Maximize2,
  Radio
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
  const handleSubmitContactForm = async (e: React.FormEvent) => {
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
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });
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
  const handleSendFreeText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText('');
    addUserMessage(userText);

    const lower = userText.toLowerCase();

    if (lower.includes('reiniciar') || lower.includes('nuevo') || lower.includes('otra')) {
      handleResetChat();
      return;
    }

    setIsTyping(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await res.json();
      if (data.reply) {
        addBotMessage(data.reply);
      } else {
        throw new Error('No reply');
      }
    } catch (error) {
      console.error(error);
      addBotMessage('Lo siento, tuve un problema conectando con mi base de conocimientos. Por favor intenta de nuevo.');
    } finally {
      setIsTyping(false);
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
      {/* FLOATING TRIGGER BUTTON (TERMINAL RADIO)                      */}
      {/* ------------------------------------------------------------- */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
           <button
             onClick={() => {
               setIsOpen(true);
               setIsMinimized(false);
             }}
             className="group relative flex items-center gap-3 p-3 bg-black/90 border border-emerald-500/50 text-emerald-500 hover:border-emerald-400 hover:bg-emerald-950/30 font-mono transition-all uppercase tracking-widest text-xs shadow-[0_0_15px_rgba(16,185,129,0.2)]"
           >
             <span className="w-2 h-2 bg-red-500 animate-pulse" />
             <Radio className="w-4 h-4 animate-pulse" />
             <span>[ COMM_LINK ]</span>
           </button>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* EXPANDED TERMINAL WINDOW                                      */}
      {/* ------------------------------------------------------------- */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 font-mono text-emerald-500 ${
            isMinimized
              ? 'bottom-4 right-4 w-72 sm:w-80 h-14'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-full sm:w-[480px] h-[92vh] sm:h-[700px] max-h-[95vh]'
          }`}
        >
          <div className="w-full h-full flex flex-col bg-black/95 border border-emerald-500/40 relative overflow-hidden backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />

            {/* Top Header */}
            <div
              onClick={() => {
                if (isMinimized) setIsMinimized(false);
              }}
              className={`px-4 py-3 bg-emerald-950/30 border-b border-emerald-500/40 flex items-center justify-between shrink-0 relative z-10 ${
                isMinimized ? 'cursor-pointer hover:bg-emerald-900/30' : ''
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-emerald-400 tracking-[0.2em] uppercase">
                    [ SYS_TERMINAL: CONECTA ]
                  </h2>
                  <p className="text-[10px] text-emerald-600/70">
                    {isMinimized ? '> click para maximizar' : '> CONEXIÓN SATELITAL ESTABLECIDA'}
                  </p>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-3 text-emerald-500/60" onClick={(e) => e.stopPropagation()}>
                {!isMinimized && (
                  <button onClick={handleResetChat} className="hover:text-emerald-300">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => setIsMinimized(!isMinimized)} className="hover:text-emerald-300">
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button onClick={handleClose} className="hover:text-emerald-300">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* If Minimized, only header shows */}
            {!isMinimized && (
              <>
                {/* Chat Messages Stream */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs sm:text-sm bg-transparent relative z-10 scrollbar-thin scrollbar-thumb-emerald-900 scrollbar-track-transparent">
                  
                  {/* Terminal Banner */}
                  <div className="p-3 border border-emerald-500/20 text-emerald-600/80 text-[10px] leading-relaxed mb-4 uppercase">
                    <span className="text-emerald-400 font-bold block mb-1">&gt; PROTOCOLO DE RESERVA INICIADO</span>
                    Canal seguro. Coordina sesión de 30 min con guardianes botánicos.
                  </div>

                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="flex flex-col mb-4"
                    >
                      <span className="text-[9px] text-emerald-600/50 mb-1">
                        [{msg.timestamp}] {msg.sender === 'user' ? 'USER_INPUT' : 'SYS_RESPONSE'}
                      </span>
                      <div
                        className={`pl-3 py-1 border-l-2 ${
                          msg.sender === 'user'
                            ? 'border-amber-500/50 text-amber-400'
                            : 'border-emerald-500/50 text-emerald-400'
                        }`}
                      >
                        {msg.text}
                      </div>

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
                  className="p-3 bg-black border-t border-emerald-500/40 flex items-center gap-2 shrink-0 relative z-10"
                >
                  <span className="text-emerald-500 font-bold">&gt;</span>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="INGRESAR COMANDO / TEXTO..."
                    className="flex-1 bg-transparent border-none text-emerald-400 text-xs focus:outline-none placeholder:text-emerald-700/50 font-mono uppercase"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="p-2 text-emerald-500/50 hover:text-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
