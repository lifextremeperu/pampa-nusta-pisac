import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, ChevronDown, ChevronLeft, ChevronRight, MapPin, Navigation } from 'lucide-react';

interface InterdimensionalJourneyProps {
  onClose: () => void;
}

// ─── GLSL SHADERS ──────────────────────────────────────────────────────────
const VERT = `
  attribute vec4 a_pos;
  attribute vec2 a_uv;
  varying vec2 v_uv;
  void main(){ gl_Position=a_pos; v_uv=a_uv; }
`;
const FRAG = `
  precision highp float;
  varying vec2 v_uv;
  uniform float u_t;
  uniform float u_p;
  uniform vec2  u_res;
  #define PI 3.14159265359
  float hash(vec2 p){ p=fract(p*vec2(234.34,435.345)); p+=dot(p,p+34.23); return fract(p.x*p.y); }
  float noise(vec2 p){
    vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
  }
  float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<6;i++){ v+=a*noise(p); a*=0.5; p*=2.0; } return v; }
  float stars(vec2 uv){ vec2 c=floor(uv*150.0); float s=hash(c+vec2(42,13)); vec2 pos=fract(uv*150.0)-0.5; float tw=0.5+0.5*sin(u_t*2.0+s*100.0); return s>0.97?(1.0-length(pos)*8.0)*tw:0.0; }
  void main(){
    vec2 uv=v_uv; float prog=clamp(u_p,0.0,1.0);
    vec2 c=uv-0.5; float ang=atan(c.y,c.x); float rad=length(c);
    float speed=0.3+prog*4.0; float tz=u_t*speed;
    float sp=ang/(2.0*PI)+tz*0.04; float td=1.0/(rad+0.01)*0.3+tz;
    vec2 tuv=vec2(sp,td);
    vec3 col1=vec3(0.05,0.3,0.12),col2=vec3(0.12,0.05,0.35),col3=vec3(0.7,0.5,0.1),col4=vec3(0.02,0.1,0.25);
    float n1=fbm(tuv*2.0+vec2(u_t*0.05,0.0)),n2=fbm(tuv*3.0-vec2(u_t*0.08,u_t*0.03)),n3=fbm(uv*4.0+vec2(u_t*0.1));
    vec3 neb=mix(col4,col1,n1); neb=mix(neb,col2,n2*0.6); neb=mix(neb,col3,pow(n3,3.0)*0.5);
    float core=pow(1.0-smoothstep(0.0,0.15,rad),2.0)*(0.3+prog*1.5);
    float rim=(smoothstep(0.45,0.5,rad)*(1.0-smoothstep(0.5,0.55,rad))+smoothstep(0.3,0.35,rad)*(1.0-smoothstep(0.35,0.4,rad)))*0.5*(0.5+0.5*sin(ang*8.0+u_t*2.0));
    float ring=smoothstep(0.05,0.1,fract(td*0.3))*(1.0-smoothstep(0.1,0.15,fract(td*0.3)))*(1.0-smoothstep(0.0,0.5,rad))*(0.5+0.5*sin(ang*12.0+u_t));
    vec3 final=neb;
    final=mix(final,mix(col3,vec3(1,0.95,0.8),core),core);
    final+=vec3(0.1,0.8,0.4)*rim*0.8;
    final+=col3*ring*(0.5+prog);
    final+=vec3(0.9,0.95,1)*max(0.0,stars(uv))*(1.0-smoothstep(0.3,0.5,rad*2.0));
    float vig=max(0.0,1.0-smoothstep(0.3,0.7,rad*2.0)); final*=vig+0.1;
    float wo=smoothstep(0.85,1.0,prog); final=mix(final,vec3(1,0.97,0.85),wo);
    final=final/(final+vec3(0.7)); final=pow(final,vec3(0.8));
    gl_FragColor=vec4(final,1.0);
  }
`;

// ─── REAL SANCTUARY PHOTOS ─────────────────────────────────────────────────
const SANCTUARY_SPOTS = [
  {
    id: 'area',
    src: '/fotos-reales/pampa-area.jpg',
    label: 'Área Central',
    desc: 'Zona de trabajo comunitario y permacultura',
    coords: '-13.407585, -71.836324',
  },
  {
    id: 'casa',
    src: '/fotos-reales/pampa-casa.jpg',
    label: 'Casa Ecológica',
    desc: 'Bioconstrucción en tierra y madera · Pisac, Cusco',
    coords: '-13.407585, -71.836324',
  },
  {
    id: 'tipis',
    src: '/fotos-reales/pampa-tipis.jpg',
    label: 'Tipis Ceremoniales',
    desc: 'Espacios de retiro y ceremonia con vista a los Apus',
    coords: '-13.407585, -71.836324',
  },
];

const LABELS = [
  { at: 0.00, text: 'Iniciando el Viaje Sagrado...', sub: 'Tu alma está despertando' },
  { at: 0.25, text: 'Cruzando el Umbral Cósmico', sub: 'Europa queda atrás' },
  { at: 0.50, text: 'Los Apus te llaman', sub: 'Sientes el corazón de los Andes' },
  { at: 0.75, text: 'Cerca de Pisac · 3,347 msnm', sub: 'El Wachuma guarda el portal' },
  { at: 0.92, text: '¡Aterrizando en Pampa Ñusta!', sub: 'Ya estás aquí...' },
];

// ─── STREET VIEW 360° COMPONENT ────────────────────────────────────────────
const StreetView: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [panX, setPanX] = useState(0);
  const [animIn, setAnimIn] = useState(true);
  const startX = useRef(0);
  const dragDelta = useRef(0);
  const imgRef = useRef<HTMLDivElement>(null);

  const spot = SANCTUARY_SPOTS[active];

  const goTo = (idx: number) => {
    setAnimIn(false);
    setTimeout(() => {
      setActive(idx);
      setPanX(0);
      setAnimIn(true);
    }, 250);
  };

  const next = () => goTo((active + 1) % SANCTUARY_SPOTS.length);
  const prev = () => goTo((active - 1 + SANCTUARY_SPOTS.length) % SANCTUARY_SPOTS.length);

  // Drag / pan horizontally to simulate 360 look-around
  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    startX.current = e.clientX;
    dragDelta.current = panX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - startX.current;
    setPanX(dragDelta.current + dx * 0.3); // slow drag = realistic pan
  };
  const onPointerUp = () => setDragging(false);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 20,
      display: 'flex', flexDirection: 'column',
      background: '#111',
      animation: 'fadeInStreet 0.7s ease-out forwards',
    }}>

      {/* ── GOOGLE STREET VIEW TOP BAR ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)',
        padding: '14px 16px 32px',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      }}>
        {/* Location info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#4ade80', boxShadow: '0 0 8px #4ade80',
              animation: 'pulse 1.5s ease-in-out infinite',
            }} />
            <span style={{ color: '#4ade80', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
              EN VIVO · Pampa Ñusta
            </span>
          </div>
          <h3 style={{ color: '#fff', fontSize: 'clamp(15px, 4vw, 22px)', fontWeight: 800, margin: 0, fontFamily: "'Inter', sans-serif" }}>
            📍 {spot.label}
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, margin: '3px 0 0', fontFamily: "'Inter', sans-serif" }}>
            {spot.desc}
          </p>
        </div>

        {/* Coords badge */}
        <div style={{
          background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(74,222,128,0.3)',
          borderRadius: 8, padding: '5px 10px', backdropFilter: 'blur(8px)',
          textAlign: 'right',
        }}>
          <div style={{ color: '#4ade80', fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'monospace' }}>COORDENADAS</div>
          <div style={{ color: '#fff', fontSize: 10, fontFamily: 'monospace', marginTop: 2 }}>{spot.coords}</div>
        </div>
      </div>

      {/* ── PANORAMIC IMAGE VIEWER ── */}
      <div
        ref={imgRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{
          flex: 1, overflow: 'hidden', cursor: dragging ? 'grabbing' : 'grab',
          position: 'relative',
        }}
      >
        <div style={{
          width: '160%',
          height: '100%',
          backgroundImage: `url(${spot.src})`,
          backgroundSize: 'cover',
          backgroundPosition: `${50 - panX * 0.05}% center`,
          transform: `translateX(${Math.max(-25, Math.min(25, -panX * 0.12))}%) scale(${animIn ? 1 : 1.05})`,
          transition: animIn
            ? 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.25s'
            : 'transform 0.25s, opacity 0.25s',
          opacity: animIn ? 1 : 0,
          filter: `brightness(${dragging ? 0.95 : 1})`,
          willChange: 'transform',
          userSelect: 'none',
        }} />

        {/* Pan hint */}
        {!dragging && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'rgba(255,255,255,0.35)', fontSize: 11,
            fontFamily: "'Inter', sans-serif", pointerEvents: 'none',
            display: 'flex', alignItems: 'center', gap: 4,
            animation: 'fadeInOut 3s ease-in-out infinite',
          }}>
            ← Arrastra para mirar en 360° →
          </div>
        )}

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)',
        }} />
      </div>

      {/* ── BOTTOM CONTROL BAR ── */}
      <div style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6))',
        padding: '12px 16px 20px',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {/* Thumbnail nav row */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {SANCTUARY_SPOTS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              style={{
                width: 52, height: 36, borderRadius: 6, overflow: 'hidden',
                border: i === active ? '2px solid #4ade80' : '2px solid transparent',
                padding: 0, cursor: 'pointer',
                boxShadow: i === active ? '0 0 10px rgba(74,222,128,0.6)' : 'none',
                transition: 'all 0.2s', flexShrink: 0,
              }}
            >
              <img src={s.src} alt={s.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>

        {/* Nav arrows + spot label + Explore button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={prev}
            style={{
              width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            <ChevronLeft size={16} />
          </button>

          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ color: '#fff', fontSize: 12, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>{spot.label}</div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10, fontFamily: "'Inter', sans-serif" }}>
              {active + 1} / {SANCTUARY_SPOTS.length}
            </div>
          </div>

          <button
            onClick={next}
            style={{
              width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Explore button */}
        <button
          onClick={onExplore}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #16a34a, #15803d)',
            color: '#fff', border: 'none', borderRadius: 12,
            padding: '13px 24px', fontSize: 14, fontWeight: 700,
            cursor: 'pointer', fontFamily: "'Inter', system-ui, sans-serif",
            boxShadow: '0 4px 20px rgba(22,163,74,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            letterSpacing: '0.01em',
          }}
        >
          <Navigation size={16} />
          Explorar el Santuario Completo
        </button>
      </div>

      <style>{`
        @keyframes fadeInStreet {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes fadeInOut {
          0%,100% { opacity: 0; }
          40%,60% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// ─── MAIN TUNNEL COMPONENT ─────────────────────────────────────────────────
export const InterdimensionalJourney: React.FC<InterdimensionalJourneyProps> = ({ onClose }) => {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const glRef       = useRef<WebGLRenderingContext | null>(null);
  const progRef_gl  = useRef<WebGLProgram | null>(null);
  const rafRef      = useRef<number>(0);
  const t0Ref       = useRef<number>(Date.now());

  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  // Show street view when fully arrived
  const [showStreetView, setShowStreetView] = useState(false);

  const arrived = progress >= 0.94;
  const label = LABELS.reduce((acc, l) => progress >= l.at ? l : acc, LABELS[0]);
  const speedKmH = Math.round(300 + progress * 28700);

  // Trigger street view shortly after arrival
  useEffect(() => {
    if (arrived && !showStreetView) {
      const t = setTimeout(() => setShowStreetView(true), 1200);
      return () => clearTimeout(t);
    }
  }, [arrived, showStreetView]);

  // ── WebGL boot ──────────────────────────────────────────────────────────
  const initGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;
    glRef.current = gl;
    const mk = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, mk(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);
    progRef_gl.current = prog;
    const bind = (data: Float32Array, attr: string, size: number) => {
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, attr);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    };
    bind(new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), 'a_pos', 2);
    bind(new Float32Array([0,0, 1,0, 0,1, 1,1]), 'a_uv', 2);
  }, []);

  const resize = useCallback(() => {
    const c = canvasRef.current; const gl = glRef.current;
    if (!c || !gl) return;
    c.width = window.innerWidth; c.height = window.innerHeight;
    gl.viewport(0, 0, c.width, c.height);
  }, []);

  const tick = useCallback(() => {
    const gl = glRef.current; const prog = progRef_gl.current; const c = canvasRef.current;
    if (!gl || !prog || !c) return;
    const t = (Date.now() - t0Ref.current) / 1000;
    gl.uniform1f(gl.getUniformLocation(prog, 'u_t'), t);
    gl.uniform1f(gl.getUniformLocation(prog, 'u_p'), progressRef.current);
    gl.uniform2f(gl.getUniformLocation(prog, 'u_res'), c.width, c.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const advance = useCallback((delta: number) => {
    const next = Math.min(1, Math.max(0, progressRef.current + delta));
    progressRef.current = next;
    setProgress(next);
  }, []);

  useEffect(() => {
    initGL(); resize(); window.addEventListener('resize', resize);
    tick();
    document.body.style.overflow = 'hidden';

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      advance(e.deltaY / (window.innerHeight * 3));
    };
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const dy = touchY - e.touches[0].clientY;
      touchY = e.touches[0].clientY;
      advance(dy / (window.innerHeight * 1.5));
    };

    window.addEventListener('wheel',      onWheel,      { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true  });
    window.addEventListener('touchmove',  onTouchMove,  { passive: false });

    return () => {
      window.removeEventListener('resize',     resize);
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove);
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = '';
    };
  }, [initGL, resize, tick, advance]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden', touchAction: 'none', userSelect: 'none' }}>

      {/* WebGL Canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />

      {/* Progress bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.08)', zIndex: 10 }}>
        <div style={{
          height: '100%', width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, #4ade80, #fbbf24)',
          boxShadow: '0 0 12px #4ade80', transition: 'width 0.08s linear',
        }} />
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 18, right: 18, zIndex: 40,
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.18)',
          color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)',
        }}
      >
        <X size={16} />
      </button>

      {/* HUD (hidden when street view is shown) */}
      {!showStreetView && (
        <>
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 10, textAlign: 'center' }}>
            <div style={{
              background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(74,222,128,0.35)',
              borderRadius: 50, padding: '5px 16px', color: '#4ade80', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Inter', monospace",
              backdropFilter: 'blur(8px)', whiteSpace: 'nowrap',
            }}>
              ⚡ {speedKmH.toLocaleString()} km/h · TÚNEL ANDINO
            </div>
          </div>

          <div style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 10 }}>
            {LABELS.map((l, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: progress >= l.at ? 1 : 0.25, transition: 'opacity 0.4s' }}>
                <div style={{
                  width: progress >= l.at ? 9 : 5, height: progress >= l.at ? 9 : 5,
                  borderRadius: '50%',
                  background: progress >= l.at ? '#4ade80' : 'rgba(255,255,255,0.3)',
                  boxShadow: progress >= l.at ? '0 0 10px #4ade80' : 'none',
                  transition: 'all 0.4s',
                }} />
              </div>
            ))}
          </div>

          {!arrived && (
            <div style={{
              position: 'absolute', bottom: '22%', left: '50%', transform: 'translateX(-50%)',
              textAlign: 'center', zIndex: 10, width: '90%', pointerEvents: 'none',
            }}>
              <p style={{
                fontSize: 'clamp(18px, 5vw, 44px)', fontWeight: 900, color: '#fff',
                textShadow: '0 0 40px rgba(74,222,128,0.7)',
                margin: 0, fontFamily: "'Inter', system-ui, sans-serif",
              }}>
                {label.text}
              </p>
              <p style={{
                fontSize: 'clamp(11px, 2.5vw, 17px)', color: 'rgba(251,191,36,0.9)',
                margin: '8px 0 0', fontWeight: 500,
                fontFamily: "'Inter', system-ui, sans-serif",
              }}>
                {label.sub}
              </p>
            </div>
          )}

          {progress < 0.06 && (
            <div
              onClick={() => advance(0.05)}
              style={{
                position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                zIndex: 20, cursor: 'pointer',
              }}
            >
              <span style={{
                fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                fontFamily: "'Inter', sans-serif",
              }}>
                Desplázate o toca para viajar
              </span>
              <ChevronDown size={20} color="rgba(255,255,255,0.6)" />
            </div>
          )}

          {/* White flash transition */}
          {arrived && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 15,
              background: `rgba(240,255,240,${Math.min(1, (progress - 0.94) / 0.06 * 0.95)})`,
              transition: 'all 0.15s',
              pointerEvents: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                fontSize: 'clamp(20px, 6vw, 48px)', fontWeight: 900,
                color: '#14532d', textAlign: 'center',
                fontFamily: "'Inter', sans-serif",
                opacity: Math.min(1, (progress - 0.94) / 0.04),
              }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🌿</div>
                Llegaste a Pampa Ñusta
              </div>
            </div>
          )}
        </>
      )}

      {/* ── STREET VIEW OVERLAY ── */}
      {showStreetView && (
        <StreetView onExplore={onClose} />
      )}

      <style>{`
        @keyframes bounceDown {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(7px); }
        }
      `}</style>
    </div>
  );
};
