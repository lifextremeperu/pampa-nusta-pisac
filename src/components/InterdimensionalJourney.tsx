import React, { useRef, useEffect, useCallback } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface InterdimensionalJourneyProps {
  onClose: () => void;
}

// --- GLSL Shader Sources ---
const vertexShaderSource = `
  attribute vec4 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = a_position;
    v_texCoord = a_texCoord;
  }
`;

const fragmentShaderSource = `
  precision highp float;
  varying vec2 v_texCoord;
  uniform float u_time;
  uniform float u_progress; // 0.0 = start, 1.0 = end
  uniform vec2 u_resolution;

  #define PI 3.14159265359

  // Hash function for pseudo-random noise
  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  // 2D smooth noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1,0)), f.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
      f.y
    );
  }

  // FBM - Fractal Brownian Motion for cloud-like texture
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 6; i++) {
      value += amplitude * noise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  // Convert UV to polar coordinates (tunnel effect)
  vec2 toPolar(vec2 uv) {
    uv -= 0.5;
    float angle = atan(uv.y, uv.x);
    float radius = length(uv);
    return vec2(angle / (2.0 * PI), radius);
  }

  // Star field
  float stars(vec2 uv, float threshold) {
    vec2 cell = floor(uv * 150.0);
    float star = hash(cell + vec2(42.0, 13.0));
    vec2 pos = fract(uv * 150.0) - 0.5;
    float twinkle = 0.5 + 0.5 * sin(u_time * 2.0 + star * 100.0);
    return star > threshold ? (1.0 - length(pos) * 8.0) * twinkle : 0.0;
  }

  void main() {
    vec2 uv = v_texCoord;
    vec2 aspect_uv = vec2(uv.x * u_resolution.x / u_resolution.y, uv.y);
    float progress = clamp(u_progress, 0.0, 1.0);

    // --- TUNNEL COORDINATES ---
    vec2 centered = uv - 0.5;
    float angle = atan(centered.y, centered.x);
    float radius = length(centered);

    // Speed increasing with progress
    float speed = 0.3 + progress * 3.0;
    float tunnelZ = u_time * speed;

    // Tunnel UV with spiral
    float spiralAngle = angle / (2.0 * PI) + tunnelZ * 0.03;
    float tunnelDepth = 1.0 / (radius + 0.01) * 0.3 + tunnelZ;
    vec2 tunnelUV = vec2(spiralAngle, tunnelDepth);

    // --- NEBULA COLORS ---
    // Color palette: deep Andean cosmos
    vec3 color1 = vec3(0.05, 0.3, 0.12);   // Deep jade green
    vec3 color2 = vec3(0.12, 0.05, 0.35);  // Deep violet/amethyst  
    vec3 color3 = vec3(0.7, 0.5, 0.1);     // Sacred gold
    vec3 color4 = vec3(0.02, 0.1, 0.25);   // Deep cosmos blue

    // Build nebula layers using FBM
    float n1 = fbm(tunnelUV * 2.0 + vec2(u_time * 0.05, 0.0));
    float n2 = fbm(tunnelUV * 3.0 - vec2(u_time * 0.08, u_time * 0.03));
    float n3 = fbm(uv * 4.0 + vec2(u_time * 0.1));

    // Mix nebula colors
    vec3 nebula = mix(color4, color1, n1);
    nebula = mix(nebula, color2, n2 * 0.6);
    nebula = mix(nebula, color3, pow(n3, 3.0) * 0.5); // Gold accents

    // --- TUNNEL WALLS ---
    // Create a bright core that brightens as we accelerate
    float core = 1.0 - smoothstep(0.0, 0.15, radius);
    core = pow(core, 2.0);
    float coreIntensity = 0.3 + progress * 1.5;

    // Tunnel rim glow
    float rimGlow = smoothstep(0.45, 0.5, radius) * (1.0 - smoothstep(0.5, 0.55, radius));
    rimGlow += smoothstep(0.3, 0.35, radius) * (1.0 - smoothstep(0.35, 0.4, radius));
    rimGlow *= 0.5 + 0.5 * sin(angle * 8.0 + u_time * 2.0);

    // Energy rings flying toward viewer
    float ringZ = fract(tunnelDepth * 0.3);
    float ring = smoothstep(0.05, 0.1, ringZ) * (1.0 - smoothstep(0.1, 0.15, ringZ));
    ring *= (1.0 - smoothstep(0.0, 0.5, radius));
    ring *= 0.5 + 0.5 * sin(angle * 12.0 + u_time);

    // --- STAR FIELD (background) ---
    float starField = max(0.0, stars(uv + vec2(u_time * 0.01, 0.0), 0.97));
    starField += max(0.0, stars(uv * 1.5 + vec2(0.3, 0.7), 0.98)) * 0.5;

    // --- ASSEMBLE FINAL COLOR ---
    vec3 finalColor = nebula;
    
    // Add core glow (white-hot center)
    vec3 coreColor = mix(color3, vec3(1.0, 0.95, 0.8), core);
    finalColor = mix(finalColor, coreColor, core * coreIntensity);

    // Add rim glow (sacred green)
    finalColor += vec3(0.1, 0.8, 0.4) * rimGlow * 0.8;

    // Add energy rings (gold)
    finalColor += color3 * ring * (0.5 + progress);

    // Add stars in the outer regions
    finalColor += vec3(0.9, 0.95, 1.0) * starField * (1.0 - smoothstep(0.3, 0.5, radius));

    // --- VIGNETTE ---
    float vignette = 1.0 - smoothstep(0.3, 0.7, radius * 2.0);
    vignette = max(0.0, vignette);
    finalColor *= vignette + 0.1;

    // --- BRIGHTNESS SURGE near the end ---
    float whiteOut = smoothstep(0.85, 1.0, progress);
    finalColor = mix(finalColor, vec3(1.0, 0.97, 0.85), whiteOut);

    // Tone mapping
    finalColor = finalColor / (finalColor + vec3(0.7));
    finalColor = pow(finalColor, vec3(0.8)); // Gamma

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// --- Floating particles for the overlay ---
const PARTICLE_COUNT = 60;

export const InterdimensionalJourney: React.FC<InterdimensionalJourneyProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());
  const scrollProgressRef = useRef<number>(0);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[]>([]);

  const labels = [
    { progress: 0.05, text: 'Iniciando el Viaje Sagrado...', sub: 'Tu alma está despertando' },
    { progress: 0.25, text: 'Cruzando el Umbral Cósmico', sub: 'Europa queda atrás' },
    { progress: 0.50, text: 'Los Apus te llaman', sub: 'Sientes el corazón de los Andes' },
    { progress: 0.75, text: 'Cerca de Pisac · 3,347 msnm', sub: 'El Wachuma guarda el portal' },
    { progress: 0.95, text: '¡Bienvenido, Viajero!', sub: 'Pampa Ñusta te recibe' },
  ];

  // --- WebGL Setup ---
  const initGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;
    glRef.current = gl;

    const compileShader = (type: number, src: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);
    programRef.current = program;

    // Fullscreen quad
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const texCoords = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const aPosLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    const texBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    const aTexLoc = gl.getAttribLocation(program, 'a_texCoord');
    gl.enableVertexAttribArray(aTexLoc);
    gl.vertexAttribPointer(aTexLoc, 2, gl.FLOAT, false, 0, 0);
  }, []);

  const initParticles = useCallback(() => {
    const colors = ['#4ade80', '#fbbf24', '#a78bfa', '#34d399', '#f59e0b'];
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const gl = glRef.current;
    if (!canvas || !gl) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }, []);

  const render = useCallback(() => {
    const gl = glRef.current;
    const program = programRef.current;
    const canvas = canvasRef.current;
    if (!gl || !program || !canvas) return;

    const elapsed = (Date.now() - startTimeRef.current) / 1000;

    // Uniforms
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const progressLoc = gl.getUniformLocation(program, 'u_progress');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');

    gl.uniform1f(timeLoc, elapsed);
    gl.uniform1f(progressLoc, scrollProgressRef.current);
    gl.uniform2f(resLoc, canvas.width, canvas.height);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    animFrameRef.current = requestAnimationFrame(render);
  }, []);

  // Handle scroll within the container to drive progress
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    scrollProgressRef.current = Math.min(1, scrollTop / (scrollHeight - clientHeight));
  }, []);

  useEffect(() => {
    initGL();
    initParticles();
    resize();
    window.addEventListener('resize', resize);
    render();
    document.body.style.overflow = 'hidden'; // Lock page scroll while open

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
      document.body.style.overflow = '';
    };
  }, [initGL, initParticles, resize, render]);

  // Determine current label based on progress
  const currentLabel = labels.reduce((acc, l) =>
    scrollProgressRef.current >= l.progress ? l : acc, labels[0]);

  const progress = scrollProgressRef.current;
  const speedKmH = Math.round(300 + progress * 28700); // 300 → 29,000 km/h

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        overflowY: 'scroll',
        overscrollBehavior: 'contain',
      }}
    >
      {/* Tall scroll container to drive progress */}
      <div style={{ height: '600vh', position: 'relative' }}>

        {/* Sticky WebGL canvas - always full screen */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

          {/* WebGL Canvas */}
          <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

          {/* Particle overlay canvas */}
          <ParticleOverlay progress={progress} />

          {/* === UI OVERLAY === */}

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 20, right: 20, zIndex: 100,
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%', width: 44, height: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s',
            }}
          >
            <X size={18} />
          </button>

          {/* Top HUD */}
          <div style={{
            position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)',
            zIndex: 50, textAlign: 'center',
          }}>
            <div style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(74,222,128,0.3)',
              borderRadius: 50, padding: '6px 20px',
              backdropFilter: 'blur(10px)',
              color: '#4ade80', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              fontFamily: 'monospace',
            }}>
              ⚡ {speedKmH.toLocaleString()} km/h · TÚNEL ANDINO CUÁNTICO
            </div>
          </div>

          {/* Progress bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: 'rgba(255,255,255,0.1)', zIndex: 60,
          }}>
            <div style={{
              height: '100%',
              width: `${progress * 100}%`,
              background: 'linear-gradient(90deg, #4ade80, #fbbf24)',
              transition: 'width 0.1s',
              boxShadow: '0 0 12px #4ade80',
            }} />
          </div>

          {/* Center Label */}
          <div style={{
            position: 'absolute', bottom: '20%', left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50, textAlign: 'center',
            opacity: 0.9 + Math.sin(Date.now() / 1000) * 0.1,
          }}>
            <p style={{
              fontSize: 'clamp(22px, 4vw, 48px)', fontWeight: 900,
              color: 'white',
              textShadow: '0 0 40px rgba(74,222,128,0.8), 0 0 80px rgba(74,222,128,0.4)',
              margin: 0, letterSpacing: '-0.01em',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}>
              {labels.reduce((acc, l) => progress >= l.progress ? l : acc, labels[0]).text}
            </p>
            <p style={{
              fontSize: 'clamp(12px, 2vw, 18px)', color: 'rgba(251,191,36,0.9)',
              margin: '8px 0 0', fontWeight: 500,
              textShadow: '0 0 20px rgba(251,191,36,0.5)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}>
              {labels.reduce((acc, l) => progress >= l.progress ? l : acc, labels[0]).sub}
            </p>
          </div>

          {/* Journey stops (right column) */}
          <div style={{
            position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column', gap: 12, zIndex: 50,
          }}>
            {labels.map((l, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                opacity: progress >= l.progress ? 1 : 0.3,
                transition: 'opacity 0.5s',
              }}>
                <div style={{
                  width: progress >= l.progress ? 10 : 6,
                  height: progress >= l.progress ? 10 : 6,
                  borderRadius: '50%',
                  background: progress >= l.progress ? '#4ade80' : 'rgba(255,255,255,0.3)',
                  boxShadow: progress >= l.progress ? '0 0 12px #4ade80' : 'none',
                  transition: 'all 0.5s',
                }} />
                <span style={{
                  fontSize: 10, color: 'rgba(255,255,255,0.7)',
                  fontWeight: 600, letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: window.innerWidth < 480 ? 'none' : 'block',
                }}>
                  {Math.round(l.progress * 100)}%
                </span>
              </div>
            ))}
          </div>

          {/* Scroll hint (only at beginning) */}
          {progress < 0.05 && (
            <div style={{
              position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
              color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              animation: 'bounce 2s infinite',
              zIndex: 50,
            }}>
              <span>Desplázate para viajar</span>
              <ChevronDown size={20} style={{ animation: 'bounce 1.5s infinite' }} />
            </div>
          )}

          {/* Final message - arrival */}
          {progress >= 0.92 && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 60,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              background: `rgba(245,235,200,${(progress - 0.92) / 0.08 * 0.85})`,
              backdropFilter: `blur(${(progress - 0.92) / 0.08 * 8}px)`,
              transition: 'all 0.2s',
              pointerEvents: 'none',
            }}>
              {progress > 0.97 && (
                <div style={{ textAlign: 'center', padding: 32 }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
                  <h2 style={{
                    fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 900,
                    color: '#1a3a1a', margin: '0 0 12px',
                    letterSpacing: '-0.02em',
                  }}>
                    Pampa Ñusta te espera
                  </h2>
                  <p style={{ fontSize: 18, color: '#3d7a3d', fontWeight: 600 }}>
                    3,347 msnm · Valle Sagrado de los Incas · Pisac
                  </p>
                  <button
                    onClick={onClose}
                    style={{
                      marginTop: 32,
                      background: 'linear-gradient(135deg, #16a34a, #15803d)',
                      color: 'white', border: 'none', borderRadius: 50,
                      padding: '14px 36px', fontSize: 15, fontWeight: 700,
                      cursor: 'pointer', letterSpacing: '0.05em',
                      boxShadow: '0 8px 24px rgba(22,163,74,0.4)',
                      pointerEvents: 'all',
                    }}
                    onClick={onClose}
                  >
                    ✨ Explorar el Santuario
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(8px) translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

// --- Particle Overlay as a separate Canvas2D component ---
const ParticleOverlay: React.FC<{ progress: number }> = ({ progress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number; hue: number }[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const count = Math.floor(30 + progress * 120);
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (0.5 + progress * 3),
      vy: (Math.random() - 0.5) * (0.5 + progress * 3) - 0.5,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      hue: Math.random() > 0.5 ? 140 : 45, // green or gold
    }));

    const ctx = canvas.getContext('2d')!;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.alpha})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(rafRef.current);
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
};
