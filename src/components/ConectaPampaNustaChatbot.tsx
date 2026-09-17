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

  // Initialize chat messages - always start fresh
  useEffect(() => {
    // Default starting message
    const initialMessage: Message = {
      id: 'msg-1',
      sender: 'bot',
      text: 'Bienvenido a Pampa Ñusta. Estás a un paso de conectar con los guardianes del santuario. Selecciona el propósito de tu sesión privada (30 min):',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      optionsType: 'topic',
    };
    setMessages([initialMessage]);
  }, []);

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
    addUserMessage(topic.title);

    addBotMessage(
      `Perfecto. Tu sesión será con ${topic.collaboratorName} (${topic.collaboratorRole}). ¿Qué plataforma prefieres usar?`,
      'platform'
    );
  };

  // Step 2: Handle Platform Selection
  const handleSelectPlatform = (platform: 'meet' | 'whatsapp' | 'zoom') => {
    setSelectedPlatform(platform);
    const platformNames = {
      meet: 'Google Meet',
      whatsapp: 'WhatsApp Video',
      zoom: 'Zoom',
    };
    addUserMessage(platformNames[platform]);

    addBotMessage(
      `Excelente. Por favor selecciona el día y la hora de tu preferencia (Hora Perú GMT-5):`,
      'date_time'
    );
  };

  // Step 3: Handle Date & Time Selection
  const handleConfirmDateTime = () => {
    if (!selectedDate || !selectedSlot) return;
    const slotObj = AVAILABLE_TIME_SLOTS.find((s) => s.id === selectedSlot);
    addUserMessage(`${selectedDate} · ${slotObj?.label || selectedSlot}`);

    addBotMessage(
      `Ya casi terminamos. Déjanos tus datos de contacto para enviarte el enlace de acceso:`,
      'contact_form'
    );
  };

  // Step 4: Handle Contact Form Submission
  const handleSubmitContactForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim() || !userPhone.trim()) return;

    addUserMessage(`Datos enviados: ${userName}`);

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
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });
    } catch {
      // Ignore
    }

    addBotMessage(
      `¡Reserva confirmada con éxito! Tu código es ${bookingCode}. Puedes agregarla a tu calendario o notificarnos por WhatsApp.`,
      'confirmation',
      newBooking
    );
  };

  const handleResetChat = () => {
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
        text: 'Sesión reiniciada. ¿Sobre qué tema deseas agendar tu videollamada?',
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
      `¡Hola Pampa Ñusta! He programado una videollamada:\n\n` +
      `📌 *Código:* ${booking.bookingCode}\n` +
      `👤 *Nombre:* ${booking.userName}\n` +
      `🌿 *Tema:* ${booking.topicTitle}\n` +
      `🤝 *Con:* ${booking.collaboratorName}\n` +
      `📅 *Fecha:* ${booking.date} | ${booking.timeSlot} (Hora Perú)\n` +
      `💻 *Vía:* ${booking.platform.toUpperCase()}\n\n` +
      `Agradezco la confirmación.`
    );
    return `https://wa.me/51958050928?text=${text}`;
  };

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout': return <Sprout className="w-5 h-5 text-emerald-600" />;
      case 'Wheat': return <Wheat className="w-5 h-5 text-emerald-600" />;
      case 'Flame': return <Flame className="w-5 h-5 text-emerald-600" />;
      case 'Tent': return <Tent className="w-5 h-5 text-emerald-600" />;
      default: return <Compass className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* FLOATING TRIGGER BUTTON (WHATSAPP REDIRECT)                   */}
      {/* ------------------------------------------------------------- */}
      {!isOpen && (
        <div className="block fixed bottom-24 md:bottom-6 right-6 z-50 pointer-events-auto">
           <button
             onClick={() => {
               setIsOpen(true);
               setIsMinimized(false);
             }}
             className="group relative flex items-center gap-3 px-5 py-3.5 bg-emerald-600 backdrop-blur-md border border-emerald-500 text-white hover:bg-emerald-700 transition-all rounded-full shadow-2xl cursor-pointer"
           >
             <div className="relative">
               <span className="absolute -inset-1 bg-emerald-400/50 rounded-full animate-ping" />
               <MessageSquare className="w-5 h-5 relative z-10" />
             </div>
             <span className="font-sans text-xs font-bold uppercase tracking-widest hidden sm:inline-block">
               Agendar Videollamada
             </span>
           </button>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* EXPANDED CHAT WINDOW                                          */}
      {/* ------------------------------------------------------------- */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 font-sans ${
            isMinimized
              ? 'bottom-4 right-4 w-72 sm:w-80 h-14 rounded-t-2xl shadow-xl'
              : 'bottom-0 left-0 w-full h-[90vh] sm:bottom-6 sm:right-6 sm:left-auto sm:w-[480px] sm:h-[700px] sm:max-h-[95vh] sm:rounded-2xl shadow-2xl rounded-t-2xl'
          }`}
        >
          <div className="w-full h-full flex flex-col bg-gray-50 border border-emerald-100 relative overflow-hidden backdrop-blur-2xl rounded-[inherit] shadow-2xl">
            
            {/* Top Header */}
            <div
              onClick={() => {
                if (isMinimized) setIsMinimized(false);
              }}
              className={`px-5 py-4 bg-emerald-700 border-b border-emerald-800 flex items-center justify-between shrink-0 relative z-10 ${
                isMinimized ? 'cursor-pointer hover:bg-emerald-800' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 shadow-inner">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white tracking-widest uppercase font-sans">
                    Reservas Oficiales
                  </h2>
                  <p className="text-[10px] text-emerald-200 font-mono tracking-widest uppercase">
                    {isMinimized ? 'Maximizar panel' : 'Pampa Ñusta · Pisac'}
                  </p>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-4 text-emerald-100 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                {!isMinimized && (
                  <button onClick={handleResetChat} className="hover:text-white transition-colors cursor-pointer" title="Reiniciar Sesión">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => setIsMinimized(!isMinimized)} className="hover:text-white transition-colors cursor-pointer">
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button onClick={handleClose} className="hover:text-white transition-colors cursor-pointer" title="Cerrar">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* If Minimized, only header shows */}
            {!isMinimized && (
              <>
                {/* Chat Messages Stream */}
                <div 
                  className="flex-1 overflow-y-auto p-5 space-y-6 text-sm relative z-10 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent"
                  data-lenis-prevent="true"
                >
                  
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col mb-4 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <span className="text-[9px] text-gray-400 font-mono mb-1 px-1">
                        {msg.timestamp}
                      </span>
                      <div
                        className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${
                          msg.sender === 'user'
                            ? 'bg-emerald-600 text-white rounded-tr-sm font-medium'
                            : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm font-sans'
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* --------------------------------------------------- */}
                      {/* INTERACTIVE COMPONENT: STEP 1 - TOPIC SELECTION     */}
                      {/* --------------------------------------------------- */}
                      {msg.optionsType === 'topic' && (
                        <div className="mt-3 w-full grid grid-cols-2 gap-2 animate-fadeIn">
                          {VIDEO_CALL_TOPICS.map((topic) => (
                            <button
                              key={topic.id}
                              onClick={() => handleSelectTopic(topic)}
                              className="group flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white border border-gray-100 hover:border-emerald-400 hover:bg-emerald-50/60 transition-all cursor-pointer shadow-sm hover:shadow-md text-left"
                            >
                              <div className="w-7 h-7 rounded-lg bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center shrink-0 transition-colors">
                                {getTopicIcon(topic.iconName)}
                              </div>
                              <span
                                className="font-medium text-[11px] leading-tight text-gray-700 group-hover:text-emerald-700 transition-colors"
                                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                              >
                                {topic.title}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* --------------------------------------------------- */}
                      {/* INTERACTIVE COMPONENT: STEP 2 - PLATFORM SELECTION  */}
                      {/* --------------------------------------------------- */}
                      {msg.optionsType === 'platform' && (
                        <div className="mt-3 w-full flex gap-2 animate-fadeIn">
                          {[
                            { id: 'meet' as const, label: 'Meet', icon: <Video className="w-3.5 h-3.5" />, color: 'text-emerald-600' },
                            { id: 'whatsapp' as const, label: 'WhatsApp', icon: <MessageCircle className="w-3.5 h-3.5" />, color: 'text-green-500' },
                            { id: 'zoom' as const, label: 'Zoom', icon: <ExternalLink className="w-3.5 h-3.5" />, color: 'text-sky-600' },
                          ].map((p) => (
                            <button
                              key={p.id}
                              onClick={() => handleSelectPlatform(p.id)}
                              className="flex-1 flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-xl bg-white border border-gray-100 hover:border-emerald-400 hover:bg-emerald-50/60 transition-all cursor-pointer shadow-sm hover:shadow-md group"
                            >
                              <span className={`${p.color} group-hover:scale-110 transition-transform`}>{p.icon}</span>
                              <span
                                className="text-[10px] font-semibold text-gray-600 group-hover:text-gray-900 transition-colors"
                                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                              >
                                {p.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* --------------------------------------------------- */}
                      {/* INTERACTIVE COMPONENT: STEP 3 - DATE & TIME SLOTS   */}
                      {/* --------------------------------------------------- */}
                      {msg.optionsType === 'date_time' && (
                        <div className="mt-3 w-full p-4 rounded-2xl bg-white border border-gray-100 space-y-4 animate-fadeIn shadow-sm">

                          {/* Date chips */}
                          <div>
                            <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400 mb-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Fecha</p>
                            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                              {availableDates.map((dateObj) => (
                                <button
                                  key={dateObj.value}
                                  onClick={() => setSelectedDate(dateObj.label)}
                                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                                    selectedDate === dateObj.label
                                      ? 'bg-emerald-600 text-white shadow-sm'
                                      : 'bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200'
                                  }`}
                                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                                >
                                  {dateObj.label.split(',')[0]}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Time slot chips */}
                          <div>
                            <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400 mb-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Horario (Perú)</p>
                            <div className="grid grid-cols-2 gap-1.5">
                              {AVAILABLE_TIME_SLOTS.map((slot) => (
                                <button
                                  key={slot.id}
                                  onClick={() => setSelectedSlot(slot.id)}
                                  className={`py-2 px-2.5 rounded-lg text-[11px] font-medium flex items-center justify-between gap-1 transition-all cursor-pointer ${
                                    selectedSlot === slot.id
                                      ? 'bg-emerald-600 text-white border border-emerald-600'
                                      : 'bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200'
                                  }`}
                                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                                >
                                  <span>{slot.label}</span>
                                  {selectedSlot === slot.id && <CheckCircle2 className="w-3 h-3 shrink-0" />}
                                </button>
                              ))}
                            </div>
                          </div>

                          <button
                            onClick={handleConfirmDateTime}
                            disabled={!selectedDate || !selectedSlot}
                            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                          >
                            Continuar
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {/* --------------------------------------------------- */}
                      {/* INTERACTIVE COMPONENT: STEP 4 - USER CONTACT FORM   */}
                      {/* --------------------------------------------------- */}
                      {msg.optionsType === 'contact_form' && (
                        <form
                          onSubmit={handleSubmitContactForm}
                          className="mt-4 w-full p-5 rounded-2xl bg-white border border-emerald-100 space-y-4 animate-fadeIn text-left shadow-sm"
                        >
                          <div>
                            <div className="relative">
                              <User className="w-4 h-4 text-emerald-600/60 absolute left-4 top-3.5" />
                              <input
                                type="text"
                                required
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Nombre Completo"
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="relative">
                              <Mail className="w-4 h-4 text-emerald-600/60 absolute left-4 top-3.5" />
                              <input
                                type="email"
                                required
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder="Correo Electrónico"
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="relative">
                              <Phone className="w-4 h-4 text-emerald-600/60 absolute left-4 top-3.5" />
                              <input
                                type="tel"
                                required
                                value={userPhone}
                                onChange={(e) => setUserPhone(e.target.value)}
                                placeholder="WhatsApp (con código país)"
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                              />
                            </div>
                          </div>

                          <div>
                            <textarea
                              rows={2}
                              value={userNotes}
                              onChange={(e) => setUserNotes(e.target.value)}
                              placeholder="Tema o consulta clave (opcional)..."
                              className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white resize-none transition-colors"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-4 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md mt-4"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Confirmar Reserva</span>
                          </button>
                        </form>
                      )}

                      {/* --------------------------------------------------- */}
                      {/* INTERACTIVE COMPONENT: STEP 5 - CONFIRMATION CARD   */}
                      {/* --------------------------------------------------- */}
                      {msg.optionsType === 'confirmation' && msg.bookingData && (
                        <div className="mt-4 w-full p-5 rounded-2xl bg-white border-2 border-emerald-500 shadow-xl animate-fadeIn text-left">
                          
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="font-sans text-[9px] text-emerald-600 font-bold uppercase tracking-widest block">
                                CÓDIGO DE RESERVA
                              </span>
                              <span className="font-mono text-sm font-bold text-gray-900">
                                {msg.bookingData.bookingCode}
                              </span>
                            </div>
                          </div>

                          <div className="py-4 border-t border-b border-gray-100 space-y-3 text-sm font-sans">
                            <div className="flex justify-between text-gray-800">
                              <span className="text-gray-500">Tema:</span>
                              <span className="font-medium text-right max-w-[200px] truncate">{msg.bookingData.topicTitle}</span>
                            </div>
                            <div className="flex justify-between text-gray-800">
                              <span className="text-gray-500">Con:</span>
                              <span className="font-bold text-emerald-700">{msg.bookingData.collaboratorName}</span>
                            </div>
                            <div className="flex justify-between text-gray-800">
                              <span className="text-gray-500">Fecha:</span>
                              <span className="font-medium">{msg.bookingData.date} · {msg.bookingData.timeSlot}</span>
                            </div>
                          </div>

                          <div className="pt-4 space-y-3">
                            <a
                              href={getWhatsAppBookingUrl(msg.bookingData as VideoCallBooking)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 shadow-md text-center"
                            >
                              <MessageCircle className="w-4 h-4 fill-white" />
                              <span>Confirmar vía WhatsApp</span>
                            </a>

                            <a
                              href={getGoogleCalendarUrl(msg.bookingData as VideoCallBooking)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 font-sans text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 text-center"
                            >
                              <Calendar className="w-4 h-4 text-emerald-600" />
                              <span>Añadir a Google Calendar</span>
                            </a>

                            {/* Nueomarketing Hook: Nueva Reserva */}
                            <button
                              onClick={handleResetChat}
                              className="w-full py-3 px-4 mt-2 rounded-xl bg-transparent hover:bg-gray-50 text-emerald-600 font-sans font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 border-t border-dashed border-gray-200 cursor-pointer"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Agendar Nueva Sesión</span>
                            </button>
                          </div>

                        </div>
                      )}

                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-2 p-4 rounded-2xl bg-white border border-gray-100 text-emerald-600 max-w-[100px] shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
};
