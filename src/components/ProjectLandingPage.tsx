import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Download, CheckCircle2, Leaf, Shield, Globe, Heart, 
  TrendingUp, Award, Target, GitCommit, Sparkles, MapPin, DownloadCloud,
  FileText
} from 'lucide-react';
import { SanctuaryFacility, SanctuaryProjectBenefit } from '../data/sanctuaryFacilities';

interface ProjectLandingPageProps {
  project: SanctuaryFacility;
  onBack: () => void;
}

const getIconComponent = (iconName: SanctuaryProjectBenefit['icon']) => {
  switch (iconName) {
    case 'leaf': return <Leaf className="w-6 h-6" />;
    case 'globe': return <Globe className="w-6 h-6" />;
    case 'heart': return <Heart className="w-6 h-6" />;
    case 'trending-up': return <TrendingUp className="w-6 h-6" />;
    case 'shield': return <Shield className="w-6 h-6" />;
    case 'award': return <Award className="w-6 h-6" />;
    default: return <Sparkles className="w-6 h-6" />;
  }
};

export const ProjectLandingPage: React.FC<ProjectLandingPageProps> = ({ project, onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Programmatically trigger the PDF download
      const link = document.createElement('a');
      link.href = '/dossier_proyecto.pdf';
      link.download = `Dossier_Proyecto_${project.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-sadhana-dark font-sans relative">
      {/* 1. HERO SECTION (Cinematic) */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-sadhana-dark">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={project.imageUrl} 
            alt={project.name} 
            className="w-full h-full object-cover object-center opacity-40 brightness-75 mix-blend-luminosity scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-sadhana-dark/50 to-sadhana-dark/80" />
        </div>

        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-sadhana-dark transition-all cursor-pointer font-mono text-xs uppercase tracking-widest font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sadhana-primary/50 bg-sadhana-dark/60 text-sadhana-primary text-xs font-mono tracking-widest uppercase mb-6 shadow-xl backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proyecto de Inversión · {project.category}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-cinzel text-white drop-shadow-2xl mb-4 leading-tight">
            {project.name}
          </h1>
          <p className="text-lg md:text-xl text-sadhana-sand italic font-serif opacity-90 mb-10">
            {project.quechuaName}
          </p>
          
          {/* Neuromarketing Hook */}
          <div className="max-w-3xl mx-auto p-6 md:p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl relative">
            <p className="text-xl md:text-2xl font-sans font-medium text-white leading-relaxed">
              "{project.neuromarketingHook}"
            </p>
          </div>
        </div>
      </section>

      {/* 2. BODY SECTION */}
      <section className="relative w-full max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        
        {/* Left Column: Project Details (2/3 width) */}
        <div className="lg:col-span-2 space-y-16">
          
          {/* Alcance y Resumen */}
          <div>
            <div className="flex items-center gap-3 text-sadhana-primary mb-6">
              <MapPin className="w-6 h-6" />
              <h2 className="text-2xl font-cinzel font-bold uppercase tracking-widest text-sadhana-dark">Alcance del Proyecto</h2>
            </div>
            <p className="text-lg text-stone-700 leading-relaxed font-sans mb-6">
              {project.fullDesc}
            </p>
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200">
              <p className="text-base text-amber-900 font-medium leading-relaxed">
                <strong>Impacto Directo:</strong> {project.scope}
              </p>
            </div>
          </div>

          {/* Render Custom Sections if they exist */}
          {project.customSections && project.customSections.length > 0 && (
            <div className="space-y-12 mt-12">
              {project.customSections.map((section, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-3 text-sadhana-primary mb-6">
                    <Sparkles className="w-6 h-6" />
                    <h2 className="text-2xl font-cinzel font-bold uppercase tracking-widest text-sadhana-dark">{section.title}</h2>
                  </div>

                  {section.type === 'text' && (
                    <div className="space-y-4">
                      {section.content && <p className="text-lg text-stone-700 leading-relaxed font-sans">{section.content}</p>}
                      {section.bullets && (
                        <ul className="space-y-3 mt-4 ml-2">
                          {section.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-sadhana-primary mt-2 shrink-0" />
                              <span className="text-stone-700 leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {section.type === 'taxonomy' && section.metrics && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {section.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex flex-col justify-center">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 mb-1">{metric.label}</span>
                          <span className="font-bold font-sans text-stone-900">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.type === 'highlight' && section.content && (
                    <div className="p-8 rounded-2xl bg-sadhana-dark text-white shadow-xl relative overflow-hidden border border-sadhana-primary/30">
                      {/* Decorative Background Icon */}
                      <div className="absolute -right-4 -bottom-4 opacity-10">
                        <Leaf className="w-32 h-32 text-sadhana-primary" />
                      </div>
                      
                      <div className="relative z-10 whitespace-pre-wrap font-serif text-lg leading-relaxed text-sadhana-sand/90">
                        {section.content.split('\n').map((paragraph, pIdx) => (
                          <p key={pIdx} className={pIdx > 0 ? 'mt-4' : ''}>
                            {paragraph.includes('**') 
                              ? <span dangerouslySetInnerHTML={{__html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-cinzel text-xl">$1</strong>')}} />
                              : paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Objetivos Científicos */}
          <div>
            <div className="flex items-center gap-3 text-sadhana-primary mb-6">
              <Target className="w-6 h-6" />
              <h2 className="text-2xl font-cinzel font-bold uppercase tracking-widest text-sadhana-dark">Objetivos Científicos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.researchObjectives.map((obj, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-stone-700 leading-relaxed">{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div>
            <div className="flex items-center gap-3 text-sadhana-primary mb-8">
              <GitCommit className="w-6 h-6" />
              <h2 className="text-2xl font-cinzel font-bold uppercase tracking-widest text-sadhana-dark">Hoja de Ruta (Roadmap)</h2>
            </div>
            <div className="relative border-l-2 border-stone-200 ml-4 space-y-10">
              {project.roadmap.map((phase, idx) => (
                <div key={idx} className="relative pl-8">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white flex items-center justify-center ${
                    phase.status === 'completed' ? 'bg-emerald-500' :
                    phase.status === 'in-progress' ? 'bg-amber-500' :
                    'bg-stone-300'
                  }`}>
                  </div>
                  
                  <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-md bg-stone-100 text-stone-600 font-mono text-[10px] font-bold uppercase tracking-widest">
                        {phase.phase}
                      </span>
                      <h3 className="text-lg font-bold font-sans text-stone-800">{phase.title}</h3>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beneficios Mecenas */}
          <div>
            <div className="flex items-center gap-3 text-sadhana-primary mb-6">
              <Award className="w-6 h-6" />
              <h2 className="text-2xl font-cinzel font-bold uppercase tracking-widest text-sadhana-dark">Beneficios para el Mecenas</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.benefits.map((benefit, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-sadhana-dark text-white shadow-xl flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-sadhana-primary/20 flex items-center justify-center mb-4 text-sadhana-primary">
                    {getIconComponent(benefit.icon)}
                  </div>
                  <h4 className="font-bold font-sans mb-2 text-sm">{benefit.title}</h4>
                  <p className="text-xs text-stone-300 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Lead Capture & Budget (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 space-y-6">
            
            {/* Presupuesto Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-stone-900 to-black text-white shadow-2xl border border-stone-800">
              <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest mb-2">Presupuesto Estimado</p>
              <div className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sadhana-sand to-white">
                {project.projectBudget}
              </div>
              <p className="text-xs text-stone-500 mt-4 leading-relaxed">
                Fondos auditables destinados 100% al desarrollo técnico y ejecución de la hoja de ruta descrita.
              </p>
            </div>

            {/* Lead Capture Form (Dossier Download) */}
            <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FileText className="w-24 h-24 text-sadhana-primary" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold font-cinzel text-stone-900 mb-2">Dossier Ejecutivo</h3>
                <p className="text-sm text-stone-600 mb-6 leading-relaxed">
                  Descarga el documento PDF con todos los detalles técnicos, arquitectónicos y financieros de este proyecto.
                </p>

                {isSuccess ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-fadeIn">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                      <DownloadCloud className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h4 className="font-bold text-emerald-900 mb-1">¡Descarga Iniciada!</h4>
                    <p className="text-xs text-emerald-700">El dossier se ha descargado a tu dispositivo. Revisa tu bandeja de descargas.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-[10px] font-mono uppercase tracking-widest text-stone-500 mb-1">Nombre Completo</label>
                      <input 
                        id="name"
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-sadhana-primary focus:ring-1 focus:ring-sadhana-primary outline-none transition-all text-sm"
                        placeholder="Ej. Juan Pérez"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-mono uppercase tracking-widest text-stone-500 mb-1">Correo Electrónico</label>
                      <input 
                        id="email"
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-sadhana-primary focus:ring-1 focus:ring-sadhana-primary outline-none transition-all text-sm"
                        placeholder="correo@empresa.com"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 py-4 px-6 rounded-xl bg-sadhana-primary hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Descargar PDF</span>
                        </>
                      )}
                    </button>
                    <p className="text-[9px] text-center text-stone-400 mt-2">
                      Tus datos están protegidos. No enviaremos spam.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
