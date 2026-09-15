import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, ChevronDown } from 'lucide-react';

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
    vec2 i=floor(p), f=fract(p);
    f=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
  }

  float fbm(vec2 p){
    float v=0.0,a=0.5;
    for(int i=0;i<6;i++){ v+=a*noise(p); a*=0.5; p*=2.0; }
    return v;
  }

  float stars(vec2 uv){
    vec2 c=floor(uv*150.0);
    float s=hash(c+vec2(42,13));
    vec2 pos=fract(uv*150.0)-0.5;
    float tw=0.5+0.5*sin(u_t*2.0+s*100.0);
    return s>0.97?(1.0-length(pos)*8.0)*tw:0.0;
  }

  void main(){
    vec2 uv=v_uv;
    float prog=clamp(u_p,0.0,1.0);

    vec2 c=uv-0.5;
    float ang=atan(c.y,c.x);
    float rad=length(c);

    float speed=0.3+prog*4.0;
    float tz=u_t*speed;

    float sp=ang/(2.0*PI)+tz*0.04;
    float td=1.0/(rad+0.01)*0.3+tz;
    vec2 tuv=vec2(sp,td);

    vec3 col1=vec3(0.05,0.3,0.12);
    vec3 col2=vec3(0.12,0.05,0.35);
    vec3 col3=vec3(0.7,0.5,0.1);
    vec3 col4=vec3(0.02,0.1,0.25);

    float n1=fbm(tuv*2.0+vec2(u_t*0.05,0));
    float n2=fbm(tuv*3.0-vec2(u_t*0.08,u_t*0.03));
    float n3=fbm(uv*4.0+vec2(u_t*0.1));

    vec3 neb=mix(col4,col1,n1);
    neb=mix(neb,col2,n2*0.6);
    neb=mix(neb,col3,pow(n3,3.0)*0.5);

    float core=pow(1.0-smoothstep(0.0,0.15,rad),2.0)*(0.3+prog*1.5);
    float rim=(smoothstep(0.45,0.5,rad)*(1.0-smoothstep(0.5,0.55,rad))+smoothstep(0.3,0.35,rad)*(1.0-smoothstep(0.35,0.4,rad)))*0.5*(0.5+0.5*sin(ang*8.0+u_t*2.0));
    float ring=smoothstep(0.05,0.1,fract(td*0.3))*(1.0-smoothstep(0.1,0.15,fract(td*0.3)))*(1.0-smoothstep(0.0,0.5,rad))*(0.5+0.5*sin(ang*12.0+u_t));

    vec3 final=neb;
    final=mix(final,mix(col3,vec3(1,0.95,0.8),core),core);
    final+=vec3(0.1,0.8,0.4)*rim*0.8;
    final+=col3*ring*(0.5+prog);
    final+=vec3(0.9,0.95,1)*max(0.0,stars(uv))*(1.0-smoothstep(0.3,0.5,rad*2.0));

    float vig=max(0.0,1.0-smoothstep(0.3,0.7,rad*2.0));
    final*=vig+0.1;

    float wo=smoothstep(0.85,1.0,prog);
    final=mix(final,vec3(1,0.97,0.85),wo);
    final=final/(final+vec3(0.7));
    final=pow(final,vec3(0.8));

    gl_FragColor=vec4(final,1.0);
  }
`;

// ─── LABELS ────────────────────────────────────────────────────────────────
const LABELS = [
  { at: 0.00, text: 'Iniciando el Viaje Sagrado...', sub: 'Tu alma está despertando' },
  { at: 0.25, text: 'Cruzando el Umbral Cósmico', sub: 'Europa queda atrás' },
  { at: 0.50, text: 'Los Apus te llaman', sub: 'Sientes el corazón de los Andes' },
  { at: 0.75, text: 'Cerca de Pisac · 3,347 msnm', sub: 'El Wachuma guarda el portal' },
  { at: 0.93, text: '¡Bienvenido, Viajero!', sub: 'Pampa Ñusta te recibe' },
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────
export const InterdimensionalJourney: React.FC<InterdimensionalJourneyProps> = ({ onClose }) => {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const glRef       = useRef<WebGLRenderingContext | null>(null);
  const progRef     = useRef<WebGLProgram | null>(null);
  const rafRef      = useRef<number>(0);
  const t0Ref       = useRef<number>(Date.now());

  // progress as STATE so the UI re-renders
  const [progress, setProgress]   = useState(0);
  const progressRef = useRef(0);   // mirror for WebGL reads (no closure stale)

  const arrived = progress >= 0.93;
  const label   = LABELS.reduce((acc, l) => progress >= l.at ? l : acc, LABELS[0]);
  const speedKmH = Math.round(300 + progress * 28700);

  // ── WebGL boot ──────────────────────────────────────────────────────────
  const initGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;
    glRef.current = gl;

    const mk = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, mk(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    progRef.current = prog;

    const pos = new Float32Array([-1,-1, 1,-1, -1,1, 1,1]);
    const uvs = new Float32Array([0,0, 1,0, 0,1, 1,1]);

    const bind = (data: Float32Array, attr: string, size: number) => {
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, attr);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    };
    bind(pos, 'a_pos', 2);
    bind(uvs, 'a_uv',  2);
  }, []);

  const resize = useCallback(() => {
    const c = canvasRef.current;
    const gl = glRef.current;
    if (!c || !gl) return;
    c.width  = window.innerWidth;
    c.height = window.innerHeight;
    gl.viewport(0, 0, c.width, c.height);
  }, []);

  const tick = useCallback(() => {
    const gl   = glRef.current;
    const prog = progRef.current;
    const c    = canvasRef.current;
    if (!gl || !prog || !c) return;
    const t = (Date.now() - t0Ref.current) / 1000;
    gl.uniform1f(gl.getUniformLocation(prog, 'u_t'),   t);
    gl.uniform1f(gl.getUniformLocation(prog, 'u_p'),   progressRef.current);
    gl.uniform2f(gl.getUniformLocation(prog, 'u_res'), c.width, c.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // ── Scroll / wheel / touch ──────────────────────────────────────────────
  const advance = useCallback((delta: number) => {
    // delta > 0 = forward, delta < 0 = backward
    const next = Math.min(1, Math.max(0, progressRef.current + delta));
    progressRef.current = next;
    setProgress(next);
  }, []);

  useEffect(() => {
    initGL();
    resize();
    window.addEventListener('resize', resize);
    tick();
    document.body.style.overflow = 'hidden';

    // ── WHEEL (desktop) ─────────────────────────────────────────
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY / (window.innerHeight * 3); // normalise
      advance(delta);
    };

    // ── TOUCH (mobile) ──────────────────────────────────────────
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const dy = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      const delta = dy / (window.innerHeight * 1.5);
      advance(delta);
    };

    // Attach to the window so events are always captured
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

  // ── Arrival auto-close (optional: let user press button) ────────────────
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        userSelect: 'none', touchAction: 'none',
        overflow: 'hidden',
      }}
    >
      {/* WebGL Canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />

      {/* Progress bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.08)', zIndex: 10 }}>
        <div style={{
          height: '100%', width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, #4ade80, #fbbf24)',
          boxShadow: '0 0 12px #4ade80',
          transition: 'width 0.08s linear',
        }} />
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 18, right: 18, zIndex: 20,
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.18)',
          color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)',
        }}
      >
        <X size={16} />
      </button>

      {/* Top HUD */}
      <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 10, textAlign: 'center' }}>
        <div style={{
          background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(74,222,128,0.35)',
          borderRadius: 50, padding: '5px 16px',
          color: '#4ade80', fontSize: 10, fontWeight: 700,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          fontFamily: "'Inter', monospace",
          backdropFilter: 'blur(8px)',
          whiteSpace: 'nowrap',
        }}>
          ⚡ {speedKmH.toLocaleString()} km/h · TÚNEL ANDINO
        </div>
      </div>

      {/* Right progress dots */}
      <div style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 10 }}>
        {LABELS.map((l, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: progress >= l.at ? 1 : 0.25, transition: 'opacity 0.4s' }}>
            <div style={{
              width: progress >= l.at ? 9 : 5,
              height: progress >= l.at ? 9 : 5,
              borderRadius: '50%',
              background: progress >= l.at ? '#4ade80' : 'rgba(255,255,255,0.3)',
              boxShadow: progress >= l.at ? '0 0 10px #4ade80' : 'none',
              transition: 'all 0.4s',
            }} />
          </div>
        ))}
      </div>

      {/* Center label */}
      {!arrived && (
        <div style={{
          position: 'absolute', bottom: '22%', left: '50%', transform: 'translateX(-50%)',
          textAlign: 'center', zIndex: 10, width: '90%', pointerEvents: 'none',
        }}>
          <p style={{
            fontSize: 'clamp(18px, 5vw, 44px)', fontWeight: 900, color: '#fff',
            textShadow: '0 0 40px rgba(74,222,128,0.7), 0 0 80px rgba(74,222,128,0.3)',
            margin: 0, letterSpacing: '-0.01em',
            fontFamily: "'Inter', system-ui, sans-serif",
            transition: 'opacity 0.4s',
          }}>
            {label.text}
          </p>
          <p style={{
            fontSize: 'clamp(11px, 2.5vw, 17px)', color: 'rgba(251,191,36,0.9)',
            margin: '8px 0 0', fontWeight: 500,
            textShadow: '0 0 20px rgba(251,191,36,0.5)',
            fontFamily: "'Inter', system-ui, sans-serif",
          }}>
            {label.sub}
          </p>
        </div>
      )}

      {/* Scroll hint – visible at start and interactable */}
      {progress < 0.06 && (
        <div
          style={{
            position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            zIndex: 20, cursor: 'pointer',
          }}
          onClick={() => advance(0.05)}  // tap = nudge forward
        >
          <span style={{
            fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            fontFamily: "'Inter', system-ui, sans-serif",
            animation: 'fadeInOut 2s ease-in-out infinite',
          }}>
            Desplázate o toca para viajar
          </span>
          <ChevronDown
            size={20}
            color="rgba(255,255,255,0.6)"
            style={{ animation: 'bounceDown 1.5s ease-in-out infinite' }}
          />
        </div>
      )}

      {/* Arrival screen */}
      {arrived && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 15,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: `rgba(235,248,235,${Math.min(1, (progress - 0.93) / 0.07 * 0.9)})`,
          backdropFilter: `blur(${Math.min(12, (progress - 0.93) / 0.07 * 12)}px)`,
          transition: 'all 0.2s',
          padding: 24,
        }}>
          <div style={{ textAlign: 'center', animation: 'fadeInUp 0.6s ease-out' }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>🌿</div>
            <h2 style={{
              fontSize: 'clamp(26px, 6vw, 52px)', fontWeight: 900,
              color: '#14532d', margin: '0 0 10px',
              fontFamily: "'Inter', system-ui, sans-serif",
            }}>
              Pampa Ñusta te espera
            </h2>
            <p style={{
              fontSize: 'clamp(13px, 2.5vw, 18px)', color: '#166534', fontWeight: 600,
              fontFamily: "'Inter', system-ui, sans-serif",
              margin: '0 0 28px',
            }}>
              3,347 msnm · Valle Sagrado de los Incas · Pisac
            </p>
            <button
              onClick={onClose}
              style={{
                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                color: '#fff', border: 'none', borderRadius: 50,
                padding: '14px 36px', fontSize: 15, fontWeight: 700,
                cursor: 'pointer', fontFamily: "'Inter', system-ui, sans-serif",
                boxShadow: '0 8px 24px rgba(22,163,74,0.45)',
                letterSpacing: '0.02em',
              }}
            >
              ✨ Explorar el Santuario
            </button>
          </div>
        </div>
      )}

      {/* Keyframes */}
      <style>{`
        @keyframes bounceDown {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(7px); }
        }
        @keyframes fadeInOut {
          0%,100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
