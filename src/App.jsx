import { useState, useEffect, useRef } from "react";
import {
  Eye, ArrowLeft, Fingerprint, ScanFace, Mic, ScanText,
  Search, Settings, LogOut, X, Check, Volume2, VolumeX,
  ZoomIn, ZoomOut, Sun, Subtitles, Brain,
  ChevronRight, Camera, Play, Square, RotateCcw
} from "lucide-react";

const C = {
  bg:       "#0b1120",
  phone:    "#111827",
  surface:  "#1a2235",
  border:   "#1e3a5f",
  blue:     "#0ea5e9",
  purple:   "#7c3aed",
  green:    "#10b981",
  amber:    "#f59e0b",
  red:      "#ef4444",
  textPrimary: "#e2e8f0",
  textMuted:   "#64748b",
  textSub:     "#94a3b8",
};

const S = {
  wrap:      { minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Segoe UI',sans-serif" },
  phone:     { width:"360px", minHeight:"720px", maxHeight:"720px", background:C.phone, borderRadius:"36px", border:`2px solid ${C.border}`, overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 24px 60px rgba(0,0,0,0.6)", position:"relative" },
  statusBar: { background:"#0d1525", padding:"10px 24px 8px", display:"flex", justifyContent:"space-between", fontSize:"11px", color:C.textMuted, flexShrink:0 },
  body:      { flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"28px 24px", gap:"18px", overflowY:"auto" },
  logo:      { width:"80px", height:"80px", borderRadius:"24px", background:`linear-gradient(135deg,${C.blue},${C.purple})`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 32px rgba(14,165,233,0.35)` },
  btn:       { width:"100%", padding:"15px", borderRadius:"14px", background:`linear-gradient(135deg,${C.blue},#0284c7)`, border:"none", color:"#fff", fontSize:"15px", fontWeight:"600", cursor:"pointer", flexShrink:0 },
  btnOut:    { width:"100%", padding:"15px", borderRadius:"14px", background:"transparent", border:`2px solid ${C.border}`, color:C.textSub, fontSize:"15px", cursor:"pointer", flexShrink:0 },
  input:     { width:"100%", padding:"13px 15px", borderRadius:"12px", background:C.surface, border:`1.5px solid ${C.border}`, color:C.textPrimary, fontSize:"14px", outline:"none", boxSizing:"border-box" },
  label:     { fontSize:"11px", color:C.textMuted, marginBottom:"4px" },
  back:      { background:"none", border:"none", color:C.textMuted, fontSize:"13px", cursor:"pointer", display:"flex", alignItems:"center", gap:"5px", alignSelf:"flex-start", padding:0 },
  hint:      { fontSize:"11px", color:"#475569", textAlign:"center" },
  divider:   { width:"100%", height:"1px", background:C.border },
  sectionTitle: { fontSize:"18px", fontWeight:"700", color:C.textPrimary, alignSelf:"flex-start" },
  sectionSub:   { fontSize:"12px", color:C.textMuted, alignSelf:"flex-start", marginTop:"-12px" },
  card:      { width:"100%", padding:"16px 18px", borderRadius:"14px", background:C.surface, border:`1.5px solid ${C.border}` },
  modal:     { position:"absolute", inset:0, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", zIndex:20 },
  modalBox:  { background:C.surface, borderRadius:"22px", padding:"28px 22px", width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:"16px", border:`1.5px solid ${C.border}` },
};

const bioBtn = (active) => ({
  flex:1, padding:"12px", borderRadius:"12px",
  background: active ? "rgba(14,165,233,0.15)" : C.surface,
  border: `1.5px solid ${active ? C.blue : C.border}`,
  color: active ? C.blue : C.textMuted,
  cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:"5px", fontSize:"11px"
});

const menuItem = (color) => ({
  width:"100%", padding:"16px 18px", borderRadius:"14px", background:C.surface,
  border:`1.5px solid ${color}20`, display:"flex", alignItems:"center", gap:"14px", cursor:"pointer",
  textAlign:"left"
});

const menuIcon = (color) => ({
  width:"44px", height:"44px", borderRadius:"12px",
  background:`${color}18`, border:`1.5px solid ${color}44`,
  display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color
});

// ── STATUS BAR ──
function StatusBar({ title = "VisionAI" }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString("es-PE", { hour:"2-digit", minute:"2-digit" }));
  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString("es-PE",{hour:"2-digit",minute:"2-digit"})), 10000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={S.statusBar}>
      <span>{time}</span><span>{title}</span><span>🔋 100%</span>
    </div>
  );
}

function SuccessScreen({ title, sub, btnLabel, onContinue, color = C.blue }) {
  return (
    <div style={{ ...S.body, justifyContent:"center" }}>
      <div style={{ width:76, height:76, borderRadius:"50%", background:`${color}18`, border:`2px solid ${color}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Check size={34} color={color} />
      </div>
      <div style={{ fontSize:"20px", fontWeight:"700", color:C.textPrimary }}>{title}</div>
      <div style={{ fontSize:"13px", color:C.textMuted }}>{sub}</div>
      <button style={S.btn} onClick={onContinue}>{btnLabel}</button>
    </div>
  );
}

// ── SCREEN 1 — WELCOME ──
function Welcome({ onLogin, onRegister }) {
  return (
    <div style={S.body}>
      <div style={S.logo}><Eye size={38} color="#fff" /></div>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:"24px", fontWeight:"800", color:C.textPrimary }}>VisionAI</div>
        <div style={{ height:6 }} />
        <div style={{ fontSize:"13px", color:C.textMuted, maxWidth:"220px", lineHeight:"1.6" }}>
          Tu asistente visual inteligente con accesibilidad avanzada
        </div>
      </div>
      <div style={S.divider} />
      <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:"10px" }}>
        <button style={S.btn} onClick={onLogin}>Ingresar</button>
        <button style={S.btnOut} onClick={onRegister}>Registrarse</button>
      </div>
      <div style={{ display:"flex", gap:"16px", flexWrap:"wrap", justifyContent:"center" }}>
        {["👁️ Visual","🦻 Auditivo","🖐️ Motor","🧠 Cognitivo","👴 Adulto mayor"].map(t=>(
          <span key={t} style={{ fontSize:"10px", color:C.textMuted, background:C.surface, padding:"4px 8px", borderRadius:"20px", border:`1px solid ${C.border}` }}>{t}</span>
        ))}
      </div>
      <div style={S.hint}>Accesible para todos · v1.0</div>
    </div>
  );
}

// ── SCREEN 2 — LOGIN ──
function Login({ onBack, onSuccess }) {
  const [bio, setBio] = useState("huella");
  const [ok, setOk] = useState(false);
  if (ok) return <SuccessScreen title="¡Bienvenido!" sub="Sesión iniciada correctamente" btnLabel="Continuar →" onContinue={onSuccess} color={C.green} />;
  return (
    <div style={S.body}>
      <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
      <div style={S.sectionTitle}>Iniciar sesión</div>
      <div style={S.sectionSub}>Habla o usa biometría</div>
      <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:"10px" }}>
        <div><div style={S.label}>📧 Correo electrónico</div>
          <input style={S.input} placeholder="Diga su correo electrónico" /></div>
        <div><div style={S.label}>🔒 Contraseña</div>
          <input style={S.input} type="password" placeholder="Diga su contraseña" /></div>
      </div>
      <div style={{ display:"flex", gap:"10px", width:"100%" }}>
        {[{k:"huella",l:"Huella",i:<Fingerprint size={20}/>},{k:"face",l:"Facial",i:<ScanFace size={20}/>},{k:"voz",l:"Voz",i:<Mic size={20}/>}]
          .map(b=><button key={b.k} style={bioBtn(bio===b.k)} onClick={()=>setBio(b.k)}>{b.i}<span>{b.l}</span></button>)}
      </div>
      <div style={{ fontSize:"13px", color:C.textMuted }}>¿Deseas ingresar? Diga Sí o No</div>
      <div style={{ display:"flex", gap:"10px", width:"100%" }}>
        <button style={{ flex:1, padding:"14px", borderRadius:"12px", background:"rgba(16,185,129,0.1)", border:`1.5px solid ${C.green}`, color:C.green, fontSize:"15px", fontWeight:"600", cursor:"pointer" }} onClick={()=>setOk(true)}>Sí</button>
        <button style={{ flex:1, padding:"14px", borderRadius:"12px", background:"rgba(100,116,139,0.1)", border:`1.5px solid #334155`, color:C.textMuted, fontSize:"15px", cursor:"pointer" }} onClick={onBack}>No</button>
      </div>
      <div style={S.hint}>Di "Sí" para confirmar · Di "No" para cancelar</div>
    </div>
  );
}

// ── SCREEN 3 — REGISTER ──
function Register({ onBack }) {
  const [f, setF] = useState({ name:"", email:"", pass:"" });
  const [done, setDone] = useState(false);
  const ok = f.name && f.email && f.pass.length >= 8;
  if (done) return <SuccessScreen title="Cuenta creada" sub="Registro exitoso" btnLabel="Ir al inicio →" onContinue={onBack} />;
  return (
    <div style={S.body}>
      <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
      <div style={S.sectionTitle}>Crear cuenta</div>
      <div style={S.sectionSub}>Completa tus datos</div>
      <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:"10px" }}>
        {[["👤 Nombre","text","Tu nombre completo","name"],["📧 Correo","email","tu@correo.com","email"],["🔒 Contraseña","password","Mínimo 8 caracteres","pass"]]
          .map(([lbl,type,ph,key])=>(
            <div key={key}><div style={S.label}>{lbl}</div>
              <input style={S.input} type={type} placeholder={ph} value={f[key]} onChange={e=>setF({...f,[key]:e.target.value})}/></div>
          ))}
      </div>
      <button style={{ ...S.btn, opacity:ok?1:0.4 }} disabled={!ok} onClick={()=>setDone(true)}>Crear cuenta</button>
      <div style={S.hint}>Al registrarte aceptas los términos de uso</div>
    </div>
  );
}

// ── SCREEN 4 — DASHBOARD ──
function Dashboard({ onNavigate, onLogout }) {
  const [showLogout, setShowLogout] = useState(false);
  const menu = [
    { key:"scanner",  icon:<ScanText size={22}/>,  label:"Escanear Texto",     desc:"Leer cualquier texto con la cámara", color:C.blue   },
    { key:"objects",  icon:<Search size={22}/>,    label:"Reconocer Objetos",  desc:"Identifica objetos en tiempo real",  color:C.green  },
    { key:"voice",    icon:<Mic size={22}/>,        label:"Asistente de Voz",   desc:"Navega con comandos de voz",         color:C.purple },
    { key:"settings", icon:<Settings size={22}/>,  label:"Configuración",      desc:"Accesibilidad y preferencias",       color:C.amber  },
  ];
  return (
    <div style={{ ...S.body, justifyContent:"flex-start", paddingTop:"24px" }}>
      <div style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontSize:"19px", fontWeight:"700", color:C.textPrimary }}>Hola 👋</div>
          <div style={{ fontSize:"12px", color:C.textMuted }}>¿Qué necesitas hoy?</div>
        </div>
        <div style={{ ...S.logo, width:44, height:44, borderRadius:"14px" }}>
          <Eye size={20} color="#fff"/>
        </div>
      </div>
      <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:"10px" }}>
        {menu.map(m=>(
          <button key={m.key} style={menuItem(m.color)} onClick={()=>onNavigate(m.key)}>
            <div style={menuIcon(m.color)}>{m.icon}</div>
            <div>
              <div style={{ fontSize:"14px", fontWeight:"600", color:C.textPrimary }}>{m.label}</div>
              <div style={{ fontSize:"11px", color:C.textMuted, marginTop:"2px" }}>{m.desc}</div>
            </div>
            <ChevronRight size={16} color="#334155" style={{ marginLeft:"auto" }}/>
          </button>
        ))}
      </div>
      <button style={{ background:"none", border:"none", color:C.red, fontSize:"13px", cursor:"pointer", display:"flex", alignItems:"center", gap:"6px", marginTop:"4px" }} onClick={()=>setShowLogout(true)}>
        <LogOut size={13}/> Cerrar sesión
      </button>
      {showLogout && (
        <div style={S.modal}>
          <div style={S.modalBox}>
            <div style={{ width:60, height:60, borderRadius:"50%", background:"rgba(239,68,68,0.1)", border:`2px solid ${C.red}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <X size={26} color={C.red}/>
            </div>
            <div style={{ fontSize:"18px", fontWeight:"700", color:C.textPrimary }}>¿Cerrar sesión?</div>
            <div style={{ fontSize:"12px", color:C.textMuted, textAlign:"center" }}>Se cerrará tu sesión de forma segura</div>
            <button style={{ ...S.btn, background:C.red }} onClick={onLogout}>Sí, salir</button>
            <button style={S.btnOut} onClick={()=>setShowLogout(false)}>Cancelar</button>
            <div style={S.hint}>Di "Sí" para confirmar · Di "No" para cancelar</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── SCREEN 5 — SCANNER (OCR real con cámara) ──
function Scanner({ onBack }) {
  const [stage, setStage] = useState("idle");
  const [fontSize, setFontSize] = useState(15);
  const [reading, setReading] = useState(false);
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setStage("camera");
    } catch (err) {
      alert("No se pudo acceder a la cámara. Verifica los permisos del navegador.");
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
  };

  const capture = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    stopCamera();
    setStage("scanning");
    setProgress(0);
    try {
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker("spa", 1, {
        logger: m => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });
      const { data: { text: result } } = await worker.recognize(canvas);
      await worker.terminate();
      setText(result.trim() || "No se detectó texto claro. Intenta con mejor iluminación.");
    } catch (e) {
      setText("Error al procesar la imagen. Intenta de nuevo.");
    }
    setStage("result");
  };

  const speak = (t) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = "es-PE";
    u.onend = () => setReading(false);
    window.speechSynthesis.speak(u);
    setReading(true);
  };

  return (
    <div style={S.body}>
      <button style={S.back} onClick={() => { stopCamera(); onBack(); }}>
        <ArrowLeft size={15}/> Volver
      </button>
      <div style={S.sectionTitle}>Escanear Texto</div>
      <div style={S.sectionSub}>Apunta la cámara al texto a leer</div>

      <div style={{ width:"100%", height:"180px", borderRadius:"16px", background:"#0d1525", border:`2px solid ${stage==="camera"?C.blue:C.border}`, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
        <video ref={videoRef} style={{ width:"100%", height:"100%", objectFit:"cover", display: stage==="camera"?"block":"none" }} playsInline muted />
        <canvas ref={canvasRef} style={{ display:"none" }} />
        {stage === "idle" && (
          <div style={{ textAlign:"center", color:C.textMuted }}>
            <Camera size={32} style={{ margin:"0 auto 8px" }}/>
            <div style={{ fontSize:"12px" }}>Presiona Activar Cámara</div>
          </div>
        )}
        {stage === "scanning" && (
          <div style={{ textAlign:"center", color:C.blue }}>
            <div style={{ fontSize:"28px", marginBottom:"8px" }}>🔍</div>
            <div style={{ fontSize:"13px", fontWeight:"600" }}>Leyendo texto... {progress}%</div>
            <div style={{ width:"120px", height:"4px", background:"#1e3a5f", borderRadius:"2px", margin:"8px auto 0" }}>
              <div style={{ width:`${progress}%`, height:"100%", background:C.blue, borderRadius:"2px", transition:"width 0.3s" }}/>
            </div>
          </div>
        )}
        {stage === "result" && (
          <div style={{ textAlign:"center", color:C.green }}>
            <div style={{ fontSize:"24px" }}>✓</div>
            <div style={{ fontSize:"12px" }}>Texto detectado</div>
          </div>
        )}
      </div>

      <div style={{ display:"flex", gap:"10px", width:"100%" }}>
        {stage === "idle" && (
          <button style={S.btn} onClick={startCamera}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
              <Camera size={15}/> Activar cámara
            </div>
          </button>
        )}
        {stage === "camera" && (
          <>
            <button style={{ ...S.btn, background:`linear-gradient(135deg,${C.green},#059669)` }} onClick={capture}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
                <ScanText size={15}/> Escanear ahora
              </div>
            </button>
            <button style={{ ...S.btnOut, width:"auto", padding:"15px 18px" }} onClick={()=>{ stopCamera(); setStage("idle"); }}>
              <X size={15}/>
            </button>
          </>
        )}
        {stage === "result" && (
          <button style={S.btnOut} onClick={() => { setText(""); setStage("idle"); }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
              <RotateCcw size={14}/> Nuevo escaneo
            </div>
          </button>
        )}
      </div>

      {stage === "result" && text && (
        <>
          <div style={{ ...S.card, display:"flex", flexDirection:"column", gap:"10px", width:"100%" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:"11px", color:C.textMuted }}>Texto detectado:</span>
              <div style={{ display:"flex", gap:"6px" }}>
                <button style={{ background:C.surface, border:`1px solid ${C.border}`, color:C.textMuted, borderRadius:"8px", padding:"4px 8px", cursor:"pointer" }} onClick={()=>setFontSize(f=>Math.max(11,f-1))}><ZoomOut size={12}/></button>
                <button style={{ background:C.surface, border:`1px solid ${C.border}`, color:C.textMuted, borderRadius:"8px", padding:"4px 8px", cursor:"pointer" }} onClick={()=>setFontSize(f=>Math.min(22,f+1))}><ZoomIn size={12}/></button>
              </div>
            </div>
            <p style={{ fontSize:`${fontSize}px`, color:C.textPrimary, lineHeight:"1.7", margin:0, whiteSpace:"pre-line" }}>{text}</p>
          </div>
          <button style={{ ...S.btn, background: reading?"rgba(14,165,233,0.15)":`linear-gradient(135deg,${C.blue},#0369a1)`, border: reading?`1.5px solid ${C.blue}`:"none", color: reading?C.blue:"#fff" }}
            onClick={()=>{ if(reading){ window.speechSynthesis.cancel(); setReading(false); } else speak(text); }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
              {reading ? <><VolumeX size={16}/> Detener lectura</> : <><Volume2 size={16}/> Escuchar contenido</>}
            </div>
          </button>
        </>
      )}
    </div>
  );
}

// ── SCREEN 6 — RECONOCER OBJETOS ──
function Objects({ onBack }) {
  const [detecting, setDetecting] = useState(false);
  const [result, setResult] = useState(null);
  const objects = [
    { label:"Silla de ruedas", conf:97, color:C.green },
    { label:"Señal de salida", conf:94, color:C.blue },
    { label:"Persona",         conf:89, color:C.purple },
  ];
  const detect = () => {
    setDetecting(true);
    setResult(null);
    setTimeout(()=>{ setDetecting(false); setResult(objects); }, 2500);
  };
  return (
    <div style={S.body}>
      <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
      <div style={S.sectionTitle}>Reconocer Objetos</div>
      <div style={S.sectionSub}>Identificación en tiempo real</div>
      <div style={{ width:"100%", height:"170px", borderRadius:"16px", background:"#0d1525", border:`2px dashed ${detecting?C.purple:C.border}`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
        {!detecting && !result && <div style={{ textAlign:"center", color:C.textMuted }}>
          <Camera size={32} style={{ margin:"0 auto 8px" }}/>
          <div style={{ fontSize:"12px" }}>Vista de cámara</div>
        </div>}
        {detecting && <div style={{ textAlign:"center", color:C.purple }}>
          <div style={{ fontSize:"28px", marginBottom:"8px" }}>🔍</div>
          <div style={{ fontSize:"12px" }}>Analizando imagen...</div>
        </div>}
        {result && <div style={{ textAlign:"center", color:C.green }}>
          <div style={{ fontSize:"24px" }}>✓</div>
          <div style={{ fontSize:"11px" }}>{result.length} objetos detectados</div>
        </div>}
      </div>
      <button style={{ ...S.btn, background:`linear-gradient(135deg,${C.green},#059669)` }} onClick={detect} disabled={detecting}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
          {detecting ? <><Square size={14}/> Analizando...</> : <><Play size={14}/> Detectar objetos</>}
        </div>
      </button>
      {result && (
        <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:"8px" }}>
          <div style={{ fontSize:"12px", color:C.textMuted }}>Objetos identificados:</div>
          {result.map((o,i)=>(
            <div key={i} style={{ ...S.card, display:"flex", alignItems:"center", gap:"12px" }}>
              <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:o.color, flexShrink:0 }}/>
              <span style={{ flex:1, fontSize:"14px", color:C.textPrimary }}>{o.label}</span>
              <span style={{ fontSize:"12px", color:o.color, fontWeight:"600" }}>{o.conf}%</span>
            </div>
          ))}
          <button style={{ ...S.btn, background:`linear-gradient(135deg,${C.blue},#0369a1)` }}
            onClick={()=>{ const u = new SpeechSynthesisUtterance("Se detectaron: "+result.map(o=>o.label).join(", ")); u.lang="es-PE"; window.speechSynthesis.speak(u); }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}><Volume2 size={15}/> Leer objetos detectados</div>
          </button>
        </div>
      )}
    </div>
  );
}

// ── SCREEN 7 — ASISTENTE DE VOZ ──
function VoiceAssistant({ onBack }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const recRef = useRef(null);

  const fakeResponses = {
    "hora":    "Son las " + new Date().toLocaleTimeString("es-PE",{hour:"2-digit",minute:"2-digit"}),
    "fecha":   "Hoy es " + new Date().toLocaleDateString("es-PE",{weekday:"long",day:"numeric",month:"long"}),
    "hola":    "Hola, estoy aquí para ayudarte. ¿Qué necesitas?",
    "ayuda":   "Puedes pedirme que lea textos, identifique objetos, o te diga la hora.",
    "gracias": "De nada, es un placer ayudarte.",
  };

  const handleListen = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setTranscript("(simulado)");
      const r = "Hola, estoy aquí para ayudarte. ¿Qué necesitas?";
      setResponse(r);
      const u = new SpeechSynthesisUtterance(r); u.lang="es-PE"; window.speechSynthesis.speak(u);
      return;
    }
    if (listening) { recRef.current?.stop(); setListening(false); return; }
    const rec = new SR();
    recRef.current = rec;
    rec.lang = "es-PE";
    rec.interimResults = false;
    rec.onstart = () => setListening(true);
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript.toLowerCase();
      setTranscript(text);
      const key = Object.keys(fakeResponses).find(k => text.includes(k));
      const reply = key ? fakeResponses[key] : `Dijiste: "${text}". ¿Cómo puedo ayudarte?`;
      setResponse(reply);
      const u = new SpeechSynthesisUtterance(reply); u.lang="es-PE"; window.speechSynthesis.speak(u);
    };
    rec.onerror = () => { setListening(false); setTranscript("Error al capturar voz"); };
    rec.onend = () => setListening(false);
    rec.start();
  };

  return (
    <div style={S.body}>
      <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
      <div style={S.sectionTitle}>Asistente de Voz</div>
      <div style={S.sectionSub}>Habla para navegar la app</div>
      <div style={{ width:"120px", height:"120px", borderRadius:"50%", background: listening?"rgba(124,58,237,0.2)":"rgba(14,165,233,0.1)", border:`3px solid ${listening?C.purple:C.blue}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.3s", boxShadow: listening?`0 0 40px rgba(124,58,237,0.3)`:"none" }} onClick={handleListen}>
        <Mic size={44} color={listening?C.purple:C.blue}/>
      </div>
      <div style={{ fontSize:"13px", color: listening?C.purple:C.textMuted, fontWeight: listening?"600":"400" }}>
        {listening ? "Escuchando..." : "Toca el micrófono"}
      </div>
      {transcript && (
        <div style={{ ...S.card, width:"100%" }}>
          <div style={{ fontSize:"11px", color:C.textMuted, marginBottom:"6px" }}>Tú dijiste:</div>
          <div style={{ fontSize:"14px", color:C.textPrimary, fontStyle:"italic" }}>"{transcript}"</div>
        </div>
      )}
      {response && (
        <div style={{ ...S.card, width:"100%", background:"rgba(14,165,233,0.08)", border:`1.5px solid ${C.blue}33` }}>
          <div style={{ fontSize:"11px", color:C.blue, marginBottom:"6px" }}>Respuesta:</div>
          <div style={{ fontSize:"14px", color:C.textPrimary }}>{response}</div>
        </div>
      )}
      <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:"6px" }}>
        <div style={{ fontSize:"11px", color:C.textMuted }}>Comandos sugeridos:</div>
        {["¿Qué hora es?","¿Qué fecha es?","Ayuda"].map(cmd=>(
          <button key={cmd} style={{ ...S.card, cursor:"pointer", fontSize:"13px", color:C.textSub, display:"flex", alignItems:"center", gap:"8px" }}
            onClick={()=>{
              setTranscript(cmd.toLowerCase());
              const key=Object.keys(fakeResponses).find(k=>cmd.toLowerCase().includes(k));
              const r=key?fakeResponses[key]:`Dijiste: "${cmd}"`;
              setResponse(r);
              const u=new SpeechSynthesisUtterance(r); u.lang="es-PE"; window.speechSynthesis.speak(u);
            }}>
            <Mic size={12} color={C.blue}/> {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── SCREEN 8 — CONFIGURACIÓN ──
function SettingsScreen({ onBack, settings, setSettings }) {
  const toggle = (key) => setSettings(s=>({...s,[key]:!s[key]}));
  const Row = ({ icon, label, desc, skey, color=C.blue }) => (
    <div style={{ ...S.card, display:"flex", alignItems:"center", gap:"12px" }}>
      <div style={{ ...menuIcon(color), width:"38px", height:"38px" }}>{icon}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:"13px", fontWeight:"600", color:C.textPrimary }}>{label}</div>
        <div style={{ fontSize:"11px", color:C.textMuted, marginTop:"2px" }}>{desc}</div>
      </div>
      <button onClick={()=>toggle(skey)} style={{ width:"44px", height:"24px", borderRadius:"12px", background: settings[skey]?C.blue:"#334155", border:"none", cursor:"pointer", position:"relative", transition:"background 0.2s" }}>
        <div style={{ width:"18px", height:"18px", borderRadius:"50%", background:"#fff", position:"absolute", top:"3px", left: settings[skey]?"23px":"3px", transition:"left 0.2s" }}/>
      </button>
    </div>
  );
  return (
    <div style={{ ...S.body, justifyContent:"flex-start", paddingTop:"24px" }}>
      <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
      <div style={S.sectionTitle}>Configuración</div>
      <div style={S.sectionSub}>Personaliza tu accesibilidad</div>
      <div style={{ ...S.card, width:"100%" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
          <div>
            <div style={{ fontSize:"13px", fontWeight:"600", color:C.textPrimary }}>Tamaño de letra</div>
            <div style={{ fontSize:"11px", color:C.textMuted }}>Ajusta para mejor lectura</div>
          </div>
          <span style={{ fontSize:"14px", fontWeight:"700", color:C.blue }}>{settings.fontSize}px</span>
        </div>
        <div style={{ display:"flex", gap:"8px" }}>
          {[12,15,18,22].map(sz=>(
            <button key={sz} style={{ flex:1, padding:"10px 0", borderRadius:"10px", background: settings.fontSize===sz?C.blue:C.surface, border:`1.5px solid ${settings.fontSize===sz?C.blue:C.border}`, color: settings.fontSize===sz?"#fff":C.textMuted, fontSize:`${sz}px`, cursor:"pointer", fontWeight:"600" }} onClick={()=>setSettings(s=>({...s,fontSize:sz}))}>A</button>
          ))}
        </div>
      </div>
      <Row icon={<Sun size={18}/>}        label="Alto contraste"          desc="Aumenta el contraste visual"       skey="highContrast" color={C.amber}  />
      <Row icon={<Volume2 size={18}/>}    label="Lectura automática"      desc="Lee el contenido al abrirlo"       skey="autoRead"     color={C.blue}   />
      <Row icon={<Subtitles size={18}/>}  label="Subtítulos automáticos"  desc="Para videos y audio"               skey="subtitles"    color={C.green}  />
      <Row icon={<Brain size={18}/>}      label="Modo cognitivo simple"   desc="Interfaz simplificada"             skey="simpleMode"   color={C.purple} />
      <Row icon={<Mic size={18}/>}        label="Navegación por voz"      desc="Activa comandos de voz globales"   skey="voiceNav"     color={C.red}    />
      {settings.simpleMode && (
        <div style={{ width:"100%", padding:"16px", borderRadius:"14px", background:"rgba(124,58,237,0.1)", border:`1.5px solid ${C.purple}44` }}>
          <div style={{ fontSize:"13px", color:C.purple, fontWeight:"600", marginBottom:"6px" }}>Modo simple activo</div>
          <div style={{ fontSize:"12px", color:C.textMuted }}>La interfaz mostrará menos opciones y textos más grandes para facilitar la navegación.</div>
        </div>
      )}
    </div>
  );
}

// ── APP ROOT ──
const defaultSettings = { fontSize:15, highContrast:false, autoRead:false, subtitles:false, simpleMode:false, voiceNav:false };

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    document.body.style.filter = settings.highContrast ? "contrast(1.3) brightness(1.1)" : "none";
  }, [settings.highContrast]);

  const nav = (s) => setScreen(s);

  return (
    <div style={S.wrap}>
      <div style={S.phone}>
        <StatusBar />
        {screen === "welcome"   && <Welcome   onLogin={()=>nav("login")} onRegister={()=>nav("register")} />}
        {screen === "login"     && <Login     onBack={()=>nav("welcome")} onSuccess={()=>nav("dashboard")} />}
        {screen === "register"  && <Register  onBack={()=>nav("welcome")} />}
        {screen === "dashboard" && <Dashboard onNavigate={nav} onLogout={()=>nav("welcome")} />}
        {screen === "scanner"   && <Scanner   onBack={()=>nav("dashboard")} />}
        {screen === "objects"   && <Objects   onBack={()=>nav("dashboard")} />}
        {screen === "voice"     && <VoiceAssistant onBack={()=>nav("dashboard")} />}
        {screen === "settings"  && <SettingsScreen onBack={()=>nav("dashboard")} settings={settings} setSettings={setSettings} />}
      </div>
    </div>
  );
}