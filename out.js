(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/components/InterdimensionalJourney.tsx
  var InterdimensionalJourney_exports = {};
  __export(InterdimensionalJourney_exports, {
    InterdimensionalJourney: () => InterdimensionalJourney
  });
  var import_react, import_lucide_react, import_jsx_runtime, VERT, FRAG, SANCTUARY_SPOTS, LABELS, StreetView, InterdimensionalJourney;
  var init_InterdimensionalJourney = __esm({
    "src/components/InterdimensionalJourney.tsx"() {
      import_react = __require("react");
      import_lucide_react = __require("lucide-react");
      import_jsx_runtime = __require("react/jsx-runtime");
      VERT = `
  attribute vec4 a_pos;
  attribute vec2 a_uv;
  varying vec2 v_uv;
  void main(){ gl_Position=a_pos; v_uv=a_uv; }
`;
      FRAG = `
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
      SANCTUARY_SPOTS = [
        {
          id: "area",
          src: "/fotos-reales/pampa-area.jpg",
          label: "\xC1rea Central",
          desc: "Zona de trabajo comunitario y permacultura",
          coords: "-13.407585, -71.836324"
        },
        {
          id: "casa",
          src: "/fotos-reales/pampa-casa.jpg",
          label: "Casa Ecol\xF3gica",
          desc: "Bioconstrucci\xF3n en tierra y madera \xB7 Pisac, Cusco",
          coords: "-13.407585, -71.836324"
        },
        {
          id: "tipis",
          src: "/fotos-reales/pampa-tipis.jpg",
          label: "Tipis Ceremoniales",
          desc: "Espacios de retiro y ceremonia con vista a los Apus",
          coords: "-13.407585, -71.836324"
        }
      ];
      LABELS = [
        { at: 0, text: "Iniciando el Viaje Sagrado...", sub: "Tu alma est\xE1 despertando" },
        { at: 0.25, text: "Cruzando el Umbral C\xF3smico", sub: "Europa queda atr\xE1s" },
        { at: 0.5, text: "Los Apus te llaman", sub: "Sientes el coraz\xF3n de los Andes" },
        { at: 0.75, text: "Cerca de Pisac \xB7 3,347 msnm", sub: "El Wachuma guarda el portal" },
        { at: 0.92, text: "\xA1Aterrizando en Pampa \xD1usta!", sub: "Ya est\xE1s aqu\xED..." }
      ];
      StreetView = ({ onExplore }) => {
        const [active, setActive] = (0, import_react.useState)(0);
        const [dragging, setDragging] = (0, import_react.useState)(false);
        const [panX, setPanX] = (0, import_react.useState)(0);
        const [animIn, setAnimIn] = (0, import_react.useState)(true);
        const startX = (0, import_react.useRef)(0);
        const dragDelta = (0, import_react.useRef)(0);
        const imgRef = (0, import_react.useRef)(null);
        const spot = SANCTUARY_SPOTS[active];
        const goTo = (idx) => {
          setAnimIn(false);
          setTimeout(() => {
            setActive(idx);
            setPanX(0);
            setAnimIn(true);
          }, 250);
        };
        const next = () => goTo((active + 1) % SANCTUARY_SPOTS.length);
        const prev = () => goTo((active - 1 + SANCTUARY_SPOTS.length) % SANCTUARY_SPOTS.length);
        const onPointerDown = (e) => {
          setDragging(true);
          startX.current = e.clientX;
          dragDelta.current = panX;
          e.target.setPointerCapture(e.pointerId);
        };
        const onPointerMove = (e) => {
          if (!dragging) return;
          const dx = e.clientX - startX.current;
          setPanX(dragDelta.current + dx * 0.3);
        };
        const onPointerUp = () => setDragging(false);
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: {
          position: "absolute",
          inset: 0,
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          background: "#111",
          animation: "fadeInStreet 0.7s ease-out forwards"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 30,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)",
            padding: "14px 16px 32px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 8px #4ade80",
                  animation: "pulse 1.5s ease-in-out infinite"
                } }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#4ade80", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }, children: "EN VIVO \xB7 Pampa \xD1usta" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { style: { color: "#fff", fontSize: "clamp(15px, 4vw, 22px)", fontWeight: 800, margin: 0, fontFamily: "'Inter', sans-serif" }, children: [
                "\u{1F4CD} ",
                spot.label
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { color: "rgba(255,255,255,0.65)", fontSize: 11, margin: "3px 0 0", fontFamily: "'Inter', sans-serif" }, children: spot.desc })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: {
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(74,222,128,0.3)",
              borderRadius: 8,
              padding: "5px 10px",
              backdropFilter: "blur(8px)",
              textAlign: "right"
            }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { color: "#4ade80", fontSize: 8, fontWeight: 700, letterSpacing: "0.1em", fontFamily: "monospace" }, children: "COORDENADAS" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { color: "#fff", fontSize: 10, fontFamily: "monospace", marginTop: 2 }, children: spot.coords })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              ref: imgRef,
              onPointerDown,
              onPointerMove,
              onPointerUp,
              style: {
                flex: 1,
                overflow: "hidden",
                cursor: dragging ? "grabbing" : "grab",
                position: "relative"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
                  width: "160%",
                  height: "100%",
                  backgroundImage: `url(${spot.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: `${50 - panX * 0.05}% center`,
                  transform: `translateX(${Math.max(-25, Math.min(25, -panX * 0.12))}%) scale(${animIn ? 1 : 1.05})`,
                  transition: animIn ? "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.25s" : "transform 0.25s, opacity 0.25s",
                  opacity: animIn ? 1 : 0,
                  filter: `brightness(${dragging ? 0.95 : 1})`,
                  willChange: "transform",
                  userSelect: "none"
                } }),
                !dragging && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 11,
                  fontFamily: "'Inter', sans-serif",
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  animation: "fadeInOut 3s ease-in-out infinite"
                }, children: "\u2190 Arrastra para mirar en 360\xB0 \u2192" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)"
                } })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: {
            background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6))",
            padding: "12px 16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 12
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", gap: 8, justifyContent: "center" }, children: SANCTUARY_SPOTS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                onClick: () => goTo(i),
                style: {
                  width: 52,
                  height: 36,
                  borderRadius: 6,
                  overflow: "hidden",
                  border: i === active ? "2px solid #4ade80" : "2px solid transparent",
                  padding: 0,
                  cursor: "pointer",
                  boxShadow: i === active ? "0 0 10px rgba(74,222,128,0.6)" : "none",
                  transition: "all 0.2s",
                  flexShrink: 0
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: s.src, alt: s.label, style: { width: "100%", height: "100%", objectFit: "cover" } })
              },
              s.id
            )) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  onClick: prev,
                  style: {
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.1)",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  },
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronLeft, { size: 16 })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1, textAlign: "center" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: "'Inter', sans-serif" }, children: spot.label }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { color: "rgba(255,255,255,0.45)", fontSize: 10, fontFamily: "'Inter', sans-serif" }, children: [
                  active + 1,
                  " / ",
                  SANCTUARY_SPOTS.length
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  onClick: next,
                  style: {
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.1)",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  },
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronRight, { size: 16 })
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "button",
              {
                onClick: () => {
                  onExplore();
                  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 120);
                },
                style: {
                  width: "100%",
                  background: "linear-gradient(135deg, #16a34a, #15803d)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "13px 24px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  boxShadow: "0 4px 20px rgba(22,163,74,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  letterSpacing: "0.01em"
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Navigation, { size: 16 }),
                  "Explorar el Santuario Completo"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
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
      ` })
        ] });
      };
      InterdimensionalJourney = ({ onClose }) => {
        const canvasRef = (0, import_react.useRef)(null);
        const glRef = (0, import_react.useRef)(null);
        const progRef_gl = (0, import_react.useRef)(null);
        const rafRef = (0, import_react.useRef)(0);
        const t0Ref = (0, import_react.useRef)(Date.now());
        const [progress, setProgress] = (0, import_react.useState)(0);
        const progressRef = (0, import_react.useRef)(0);
        const [showStreetView, setShowStreetView] = (0, import_react.useState)(false);
        const arrived = progress >= 0.94;
        const label = LABELS.reduce((acc, l) => progress >= l.at ? l : acc, LABELS[0]);
        const speedKmH = Math.round(300 + progress * 28700);
        (0, import_react.useEffect)(() => {
          if (arrived && !showStreetView) {
            const t = setTimeout(() => setShowStreetView(true), 1200);
            return () => clearTimeout(t);
          }
        }, [arrived, showStreetView]);
        const initGL = (0, import_react.useCallback)(() => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
          if (!gl) return;
          glRef.current = gl;
          const mk = (type, src) => {
            const s = gl.createShader(type);
            gl.shaderSource(s, src);
            gl.compileShader(s);
            return s;
          };
          const prog = gl.createProgram();
          gl.attachShader(prog, mk(gl.VERTEX_SHADER, VERT));
          gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, FRAG));
          gl.linkProgram(prog);
          gl.useProgram(prog);
          progRef_gl.current = prog;
          const bind = (data, attr, size) => {
            const buf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
            const loc = gl.getAttribLocation(prog, attr);
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
          };
          bind(new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), "a_pos", 2);
          bind(new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), "a_uv", 2);
        }, []);
        const resize = (0, import_react.useCallback)(() => {
          const c = canvasRef.current;
          const gl = glRef.current;
          if (!c || !gl) return;
          c.width = window.innerWidth;
          c.height = window.innerHeight;
          gl.viewport(0, 0, c.width, c.height);
        }, []);
        const tick = (0, import_react.useCallback)(() => {
          const gl = glRef.current;
          const prog = progRef_gl.current;
          const c = canvasRef.current;
          if (!gl || !prog || !c) return;
          const t = (Date.now() - t0Ref.current) / 1e3;
          gl.uniform1f(gl.getUniformLocation(prog, "u_t"), t);
          gl.uniform1f(gl.getUniformLocation(prog, "u_p"), progressRef.current);
          gl.uniform2f(gl.getUniformLocation(prog, "u_res"), c.width, c.height);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          rafRef.current = requestAnimationFrame(tick);
        }, []);
        const advance = (0, import_react.useCallback)((delta) => {
          const next = Math.min(1, Math.max(0, progressRef.current + delta));
          progressRef.current = next;
          setProgress(next);
        }, []);
        (0, import_react.useEffect)(() => {
          initGL();
          resize();
          window.addEventListener("resize", resize);
          tick();
          document.body.style.overflow = "hidden";
          const onWheel = (e) => {
            e.preventDefault();
            advance(e.deltaY / (window.innerHeight * 3));
          };
          let touchY = 0;
          const onTouchStart = (e) => {
            touchY = e.touches[0].clientY;
          };
          const onTouchMove = (e) => {
            e.preventDefault();
            const dy = touchY - e.touches[0].clientY;
            touchY = e.touches[0].clientY;
            advance(dy / (window.innerHeight * 1.5));
          };
          window.addEventListener("wheel", onWheel, { passive: false });
          window.addEventListener("touchstart", onTouchStart, { passive: true });
          window.addEventListener("touchmove", onTouchMove, { passive: false });
          return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            cancelAnimationFrame(rafRef.current);
            document.body.style.overflow = "";
          };
        }, [initGL, resize, tick, advance]);
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "fixed", inset: 0, zIndex: 9999, overflow: "hidden", touchAction: "none", userSelect: "none" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", { ref: canvasRef, style: { position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.08)", zIndex: 10 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
            height: "100%",
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg, #4ade80, #fbbf24)",
            boxShadow: "0 0 12px #4ade80",
            transition: "width 0.08s linear"
          } }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              onClick: onClose,
              style: {
                position: "absolute",
                top: 18,
                right: 18,
                zIndex: 40,
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.45)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(8px)"
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, { size: 16 })
            }
          ),
          !showStreetView && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 10, textAlign: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: {
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(74,222,128,0.35)",
              borderRadius: 50,
              padding: "5px 16px",
              color: "#4ade80",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "'Inter', monospace",
              backdropFilter: "blur(8px)",
              whiteSpace: "nowrap"
            }, children: [
              "\u26A1 ",
              speedKmH.toLocaleString(),
              " km/h \xB7 T\xDANEL ANDINO"
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 10, zIndex: 10 }, children: LABELS.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", alignItems: "center", gap: 6, opacity: progress >= l.at ? 1 : 0.25, transition: "opacity 0.4s" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
              width: progress >= l.at ? 9 : 5,
              height: progress >= l.at ? 9 : 5,
              borderRadius: "50%",
              background: progress >= l.at ? "#4ade80" : "rgba(255,255,255,0.3)",
              boxShadow: progress >= l.at ? "0 0 10px #4ade80" : "none",
              transition: "all 0.4s"
            } }) }, i)) }),
            !arrived && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: {
              position: "absolute",
              bottom: "22%",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              zIndex: 10,
              width: "90%",
              pointerEvents: "none"
            }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: {
                fontSize: "clamp(18px, 5vw, 44px)",
                fontWeight: 900,
                color: "#fff",
                textShadow: "0 0 40px rgba(74,222,128,0.7)",
                margin: 0,
                fontFamily: "'Inter', system-ui, sans-serif"
              }, children: label.text }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: {
                fontSize: "clamp(11px, 2.5vw, 17px)",
                color: "rgba(251,191,36,0.9)",
                margin: "8px 0 0",
                fontWeight: 500,
                fontFamily: "'Inter', system-ui, sans-serif"
              }, children: label.sub })
            ] }),
            progress < 0.06 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "div",
              {
                onClick: () => advance(0.05),
                style: {
                  position: "absolute",
                  bottom: 28,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  zIndex: 20,
                  cursor: "pointer"
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
                    fontSize: 11,
                    color: "rgba(255,255,255,0.75)",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontFamily: "'Inter', sans-serif"
                  }, children: "Despl\xE1zate o toca para viajar" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronDown, { size: 20, color: "rgba(255,255,255,0.6)" })
                ]
              }
            ),
            arrived && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
              position: "absolute",
              inset: 0,
              zIndex: 15,
              background: `rgba(240,255,240,${Math.min(1, (progress - 0.94) / 0.06 * 0.95)})`,
              transition: "all 0.15s",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: {
              fontSize: "clamp(20px, 6vw, 48px)",
              fontWeight: 900,
              color: "#14532d",
              textAlign: "center",
              fontFamily: "'Inter', sans-serif",
              opacity: Math.min(1, (progress - 0.94) / 0.04)
            }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 40, marginBottom: 8 }, children: "\u{1F33F}" }),
              "Llegaste a Pampa \xD1usta"
            ] }) })
          ] }),
          showStreetView && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreetView, { onExplore: onClose }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes bounceDown {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(7px); }
        }
      ` })
        ] });
      };
    }
  });

  // src/components/LocationSection.tsx
  var import_react2 = __toESM(__require("react"), 1);
  var import_react_dom = __require("react-dom");
  var import_lucide_react2 = __require("lucide-react");
  var import_jsx_runtime2 = __require("react/jsx-runtime");
  var InterdimensionalJourney2 = import_react2.default.lazy(() => Promise.resolve().then(() => (init_InterdimensionalJourney(), InterdimensionalJourney_exports)).then((m) => ({ default: m.InterdimensionalJourney })));
  var LocationSection = () => {
    const [showJourney, setShowJourney] = (0, import_react2.useState)(false);
    const latitude = -13.407585;
    const longitude = -71.836324;
    const locationName = "Santuario Ecol\xF3gico Pampa \xD1usta, Pisac";
    const googleMapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
    const whatsappMessage = `\xA1Hola! Aqu\xED tienes la ubicaci\xF3n exacta del ${locationName}:

${googleMapsUrl}`;
    const whatsappShareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { id: "ubicacion", className: "relative py-24 bg-sadhana-dark text-white border-t border-white/5", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "max-w-7xl mx-auto px-6 md:px-12", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mb-12 text-center md:text-left", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex items-center justify-center md:justify-start gap-3 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-[10px] md:text-xs uppercase tracking-[0.3em] text-sadhana-primary font-bold", children: "04 \u2014 Coordenadas Sagradas" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("h2", { className: "text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight text-white drop-shadow-md", children: [
            "C\xD3MO ",
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-sadhana-sand/80", children: "LLEGAR" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "lg:col-span-8 rounded-3xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative h-[400px] md:h-[500px] group bg-black", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "absolute inset-0 z-10 pointer-events-none flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0 bg-sadhana-dark/20", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "bg-black/50 text-white backdrop-blur-md px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase font-bold border border-white/20", children: "Mapa Satelital Interactivo" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "iframe",
              {
                src: `https://maps.google.com/maps?q=${latitude},${longitude}&t=k&z=17&ie=UTF8&iwloc=&output=embed`,
                width: "100%",
                height: "100%",
                style: { border: 0 },
                allowFullScreen: true,
                loading: "lazy",
                referrerPolicy: "no-referrer-when-downgrade",
                className: "absolute inset-0 filter grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000",
                title: "Ubicaci\xF3n Pampa \xD1usta"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "lg:col-span-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between h-full min-h-[400px] shadow-2xl", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "w-12 h-12 bg-sadhana-primary/20 rounded-full flex items-center justify-center mb-6 shadow-inner border border-sadhana-primary/30", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react2.MapPin, { className: "w-6 h-6 text-sadhana-primary" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-2xl font-black tracking-tight text-white mb-2", children: "Comunidad de Maska" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sadhana-sand/80 font-medium text-sm mb-6 leading-relaxed", children: "A pocos minutos del pueblo de Pisac, enclavado en la pureza de las monta\xF1as del Valle Sagrado. Nuestro santuario ecol\xF3gico todav\xEDa no figura con nombre en los mapas comerciales, pero estas coordenadas te guiar\xE1n directo a la puerta." }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "space-y-4 mb-8 bg-black/20 p-4 rounded-xl border border-white/5", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react2.Navigation, { className: "w-5 h-5 text-sadhana-primary shrink-0 mt-0.5 animate-pulse" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "block text-[9px] font-mono text-sadhana-sand/60 uppercase tracking-widest mb-1", children: "Coordenadas Exactas" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "font-mono text-sm text-white font-bold", children: [
                    latitude,
                    ", ",
                    longitude
                  ] })
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "button",
                {
                  onClick: () => setShowJourney(true),
                  className: "w-full py-4 px-6 rounded-xl text-white font-black text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-all shadow-lg",
                  style: {
                    background: "linear-gradient(135deg, #0d4a1f, #1a2e50, #2d1a4a)",
                    border: "1px solid rgba(74,222,128,0.45)",
                    boxShadow: "0 0 22px rgba(74,222,128,0.25)",
                    animation: "pulse-glow-loc 2.5s ease-in-out infinite"
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react2.Zap, { className: "w-4 h-4", style: { color: "#4ade80" } }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { background: "linear-gradient(90deg,#4ade80,#fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }, children: "Ver el Lugar" })
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "a",
                {
                  href: googleMapsUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-full py-4 px-6 rounded-xl bg-white hover:bg-sadhana-primary text-sadhana-dark hover:text-white font-sans font-black text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-all shadow-lg",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "Abrir en Maps" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react2.Navigation, { className: "w-4 h-4" })
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "a",
                {
                  href: whatsappShareLink,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-full py-4 px-6 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-white font-sans font-black text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-all border border-[#25D366]/30 shadow-lg group",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "Enviar por WhatsApp" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react2.MessageCircle, { className: "w-4 h-4 group-hover:scale-110 transition-transform" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mt-8 pt-6 border-t border-white/10", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "block text-[10px] font-mono text-sadhana-primary uppercase tracking-[0.2em] font-bold mb-3", children: "Alianza del Ayllu" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "bg-black/30 rounded-2xl p-4 border border-white/5 flex flex-col gap-3", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-white font-bold text-sm", children: "Hospedaje Medicina Wallparisonqo" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sadhana-sand/70 text-xs leading-relaxed", children: "Refugio aliado para tu inmersi\xF3n y dietas, ubicado en el coraz\xF3n energ\xE9tico del valle." }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                  "a",
                  {
                    href: "https://maps.app.goo.gl/rcQ53jY81aDfykQo7",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-2 text-sadhana-primary text-xs font-bold hover:text-white transition-colors mt-1",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react2.MapPin, { className: "w-3 h-3" }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "Ver Hospedaje en Google Maps" })
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ] }) }),
      showJourney && (0, import_react_dom.createPortal)(
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.default.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "w-12 h-12 border-4 border-sadhana-primary border-t-transparent rounded-full animate-spin mb-4" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-white font-mono uppercase tracking-widest text-xs", children: "Iniciando viaje cu\xE1ntico..." })
        ] }), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InterdimensionalJourney2, { onClose: () => setShowJourney(false) }) }),
        document.body
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("style", { children: `
      @keyframes pulse-glow-loc {
        0%,100% { box-shadow: 0 0 22px rgba(74,222,128,0.25); }
        50%      { box-shadow: 0 0 36px rgba(74,222,128,0.55); }
      }
    ` })
    ] });
  };
})();
