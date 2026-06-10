import { useState, useEffect, useRef } from "react";
import {
  Eye, ArrowLeft, Fingerprint, ScanFace, Mic, ScanText,
  Search, Settings, LogOut, X, Check, Volume2, VolumeX,
  ZoomIn, ZoomOut, Sun, Subtitles, Brain,
  ChevronRight, Camera, Play, Square, RotateCcw
} from "lucide-react";

// ── BREAKPOINT HOOK ──
function useBreakpoint() {
  const get = () => {
    if (window.innerWidth >= 1024) return "desktop";
    if (window.innerWidth >= 768)  return "tablet";
    return "mobile";
  };
  const [bp, setBp] = useState(get);
  useEffect(() => {
    const fn = () => setBp(get());
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return bp;
}

// ── COLORES ──
const C = {
  bg: "#0b1120", phone: "#111827", surface: "#1a2235", border: "#1e3a5f",
  blue: "#0ea5e9", purple: "#7c3aed", green: "#10b981", amber: "#f59e0b",
  red: "#ef4444", textPrimary: "#e2e8f0", textMuted: "#64748b",
  textSub: "#94a3b8", sidebar: "#0d1525",
};

const S = {
  input:   { width:"100%", padding:"13px 15px", borderRadius:"12px", background:C.surface, border:`1.5px solid ${C.border}`, color:C.textPrimary, fontSize:"14px", outline:"none", boxSizing:"border-box" },
  label:   { fontSize:"11px", color:C.textMuted, marginBottom:"4px" },
  back:    { background:"none", border:"none", color:C.textMuted, fontSize:"13px", cursor:"pointer", display:"flex", alignItems:"center", gap:"5px", alignSelf:"flex-start", padding:0 },
  card:    { width:"100%", padding:"16px 18px", borderRadius:"14px", background:C.surface, border:`1.5px solid ${C.border}` },
  modal:   { position:"absolute", inset:0, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", zIndex:20 },
  modalBox:{ background:C.surface, borderRadius:"22px", padding:"28px 22px", width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:"16px", border:`1.5px solid ${C.border}` },
};

const mkBtn    = (bg=`linear-gradient(135deg,${C.blue},#0284c7)`) => ({ width:"100%", padding:"15px", borderRadius:"14px", background:bg, border:"none", color:"#fff", fontSize:"15px", fontWeight:"600", cursor:"pointer" });
const mkBtnOut = () => ({ width:"100%", padding:"15px", borderRadius:"14px", background:"transparent", border:`2px solid ${C.border}`, color:C.textSub, fontSize:"15px", cursor:"pointer" });
const mkBio    = (a) => ({ flex:1, padding:"12px", borderRadius:"12px", background:a?`rgba(14,165,233,0.15)`:C.surface, border:`1.5px solid ${a?C.blue:C.border}`, color:a?C.blue:C.textMuted, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:"5px", fontSize:"11px" });
const mkIcon   = (color,sz=44) => ({ width:sz, height:sz, borderRadius:"12px", background:`${color}18`, border:`1.5px solid ${color}44`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color });

// ── STATUS BAR ──
function StatusBar({ title="VisionAI" }) {
  const [t, setT] = useState(new Date().toLocaleTimeString("es-PE",{hour:"2-digit",minute:"2-digit"}));
  useEffect(() => { const i=setInterval(()=>setT(new Date().toLocaleTimeString("es-PE",{hour:"2-digit",minute:"2-digit"})),10000); return()=>clearInterval(i); },[]);
  return <div style={{ background:"#0d1525", padding:"10px 24px 8px", display:"flex", justifyContent:"space-between", fontSize:"11px", color:C.textMuted, flexShrink:0 }}><span>{t}</span><span>{title}</span><span>🔋 100%</span></div>;
}

function Success({ title, sub, label, onContinue, color=C.blue }) {
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"28px 24px", gap:"18px" }}>
      <div style={{ width:76,height:76,borderRadius:"50%",background:`${color}18`,border:`2px solid ${color}`,display:"flex",alignItems:"center",justifyContent:"center" }}><Check size={34} color={color}/></div>
      <div style={{ fontSize:"20px",fontWeight:"700",color:C.textPrimary }}>{title}</div>
      <div style={{ fontSize:"13px",color:C.textMuted }}>{sub}</div>
      <button style={mkBtn()} onClick={onContinue}>{label}</button>
    </div>
  );
}

// ══════════════════════════════════════════════
// SIDEBAR
// ══════════════════════════════════════════════
const NAV = [
  { key:"dashboard", icon:<Eye size={20}/>,      label:"Inicio"            },
  { key:"scanner",   icon:<ScanText size={20}/>,  label:"Escanear Texto"    },
  { key:"objects",   icon:<Search size={20}/>,    label:"Reconocer Objetos" },
  { key:"voice",     icon:<Mic size={20}/>,        label:"Asistente de Voz"  },
  { key:"settings",  icon:<Settings size={20}/>,  label:"Configuración"     },
];

function Sidebar({ screen, onNavigate, onLogout, bp }) {
  const collapsed = bp === "tablet";
  return (
    <aside style={{ width:collapsed?64:220, minHeight:"100vh", background:C.sidebar, borderRight:`1px solid ${C.border}`, display:"flex", flexDirection:"column", flexShrink:0, transition:"width 0.25s" }}>
      {/* Brand */}
      <div style={{ padding:collapsed?"18px 0":"20px 16px", display:"flex", alignItems:"center", gap:10, borderBottom:`1px solid ${C.border}`, justifyContent:collapsed?"center":"flex-start" }}>
        <div style={{ width:36,height:36,borderRadius:"10px",background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <Eye size={18} color="#fff"/>
        </div>
        {!collapsed && <div><div style={{ color:"#fff",fontSize:"14px",fontWeight:"700" }}>VisionAI</div><div style={{ color:C.blue,fontSize:"10px" }}>Accesibilidad con IA</div></div>}
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:"12px 8px", display:"flex", flexDirection:"column", gap:4 }}>
        {NAV.map(item => {
          const active = screen === item.key;
          return (
            <button key={item.key} onClick={()=>onNavigate(item.key)} title={item.label}
              style={{ display:"flex", alignItems:"center", gap:10, padding:collapsed?0:"11px 12px", width:collapsed?44:undefined, height:collapsed?44:undefined, justifyContent:collapsed?"center":"flex-start", borderRadius:"12px", border:"none", background:active?"rgba(14,165,233,0.12)":"transparent", color:active?C.blue:C.textMuted, cursor:"pointer", fontSize:"13px", fontWeight:active?"600":"400", position:"relative", margin:collapsed?"0 auto":0 }}>
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
              {active && <span style={{ position:"absolute", right:0, top:"50%", transform:"translateY(-50%)", width:3, height:20, background:C.blue, borderRadius:"3px 0 0 3px" }}/>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding:"12px 8px", borderTop:`1px solid ${C.border}` }}>
        <button onClick={onLogout} title="Cerrar sesión"
          style={{ display:"flex", alignItems:"center", gap:8, padding:collapsed?0:"10px 12px", width:collapsed?44:undefined, height:collapsed?44:undefined, justifyContent:collapsed?"center":"flex-start", borderRadius:"12px", border:`1px solid rgba(239,68,68,0.3)`, background:"rgba(239,68,68,0.08)", color:C.red, cursor:"pointer", fontSize:"12px", margin:collapsed?"0 auto":0 }}>
          <LogOut size={16}/>
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  );
}

// ══════════════════════════════════════════════
// TOP BAR
// ══════════════════════════════════════════════
const TITLES = { welcome:"VisionAI", login:"Iniciar sesión", register:"Registro", dashboard:"Panel principal", scanner:"Escanear Texto", objects:"Reconocer Objetos", voice:"Asistente de Voz", settings:"Configuración" };
const BP_LABELS = { tablet:"📱 Tablet — 768px", desktop:"🖥️ Escritorio — 1024px+" };
const BP_COLORS = { tablet:"rgba(124,58,237,0.15)", desktop:"rgba(14,165,233,0.15)" };
const BP_BORDERS = { tablet:`1px solid ${C.purple}44`, desktop:`1px solid ${C.blue}44` };
const BP_TEXT = { tablet:C.purple, desktop:C.blue };

function TopBar({ screen, bp }) {
  return (
    <div style={{ background:C.sidebar, borderBottom:`1px solid ${C.border}`, padding:"14px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        {(screen==="welcome"||screen==="login"||screen==="register") && (
          <div style={{ width:32,height:32,borderRadius:"8px",background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center" }}>
            <Eye size={16} color="#fff"/>
          </div>
        )}
        <span style={{ color:C.textPrimary, fontSize:"15px", fontWeight:"600" }}>{TITLES[screen]||"VisionAI"}</span>
      </div>
      <span style={{ fontSize:"11px", color:BP_TEXT[bp], background:BP_COLORS[bp], padding:"5px 12px", borderRadius:"20px", border:BP_BORDERS[bp], fontWeight:"600" }}>
        {BP_LABELS[bp]}
      </span>
    </div>
  );
}

// ══════════════════════════════════════════════
// WELCOME
// ══════════════════════════════════════════════
function Welcome({ onLogin, onRegister, bp }) {
  const isTablet  = bp === "tablet";
  const isDesktop = bp === "desktop";
  const isMobile  = bp === "mobile";

  if (isMobile) return (
    <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 24px",gap:"18px" }}>
      <div style={{ width:80,height:80,borderRadius:"24px",background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 32px rgba(14,165,233,0.35)` }}><Eye size={38} color="#fff"/></div>
      <div style={{ textAlign:"center" }}><div style={{ fontSize:"24px",fontWeight:"800",color:C.textPrimary }}>VisionAI</div><div style={{ height:6 }}/><div style={{ fontSize:"13px",color:C.textMuted,maxWidth:"220px",lineHeight:"1.6" }}>Tu asistente visual inteligente con accesibilidad avanzada</div></div>
      <div style={{ width:"100%",height:"1px",background:C.border }}/>
      <div style={{ width:"100%",display:"flex",flexDirection:"column",gap:"10px" }}>
        <button style={mkBtn()} onClick={onLogin}>Ingresar</button>
        <button style={mkBtnOut()} onClick={onRegister}>Registrarse</button>
      </div>
      <div style={{ display:"flex",gap:"10px",flexWrap:"wrap",justifyContent:"center" }}>
        {["👁️ Visual","🦻 Auditivo","🖐️ Motor","🧠 Cognitivo","👴 Adulto mayor"].map(t=><span key={t} style={{ fontSize:"10px",color:C.textMuted,background:C.surface,padding:"4px 8px",borderRadius:"20px",border:`1px solid ${C.border}` }}>{t}</span>)}
      </div>
      <div style={{ fontSize:"11px",color:"#475569" }}>Accesible para todos · v1.0</div>
    </div>
  );

  // TABLET — layout centrado con tarjeta grande
  if (isTablet) return (
    <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 32px" }}>
      <div style={{ width:"100%",maxWidth:560,background:C.surface,borderRadius:"24px",border:`1.5px solid ${C.border}`,padding:"40px",display:"flex",flexDirection:"column",gap:24 }}>
        <div style={{ display:"flex",alignItems:"center",gap:20 }}>
          <div style={{ width:72,height:72,borderRadius:"20px",background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 0 28px rgba(14,165,233,0.3)` }}><Eye size={36} color="#fff"/></div>
          <div><div style={{ fontSize:"28px",fontWeight:"800",color:C.textPrimary }}>VisionAI</div><div style={{ fontSize:"13px",color:C.textMuted,marginTop:4 }}>Tu asistente visual inteligente</div></div>
        </div>
        <div style={{ height:1,background:C.border }}/>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
          <button style={{ ...mkBtn(),fontSize:"16px",padding:"18px" }} onClick={onLogin}>Ingresar</button>
          <button style={{ ...mkBtnOut(),fontSize:"16px",padding:"18px" }} onClick={onRegister}>Registrarse</button>
        </div>
        <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
          {["👁️ Visual","🦻 Auditivo","🖐️ Motor","🧠 Cognitivo","👴 Adulto mayor"].map(t=><span key={t} style={{ fontSize:"11px",color:C.textMuted,background:C.bg,padding:"5px 10px",borderRadius:"20px",border:`1px solid ${C.border}` }}>{t}</span>)}
        </div>
        <div style={{ fontSize:"11px",color:"#475569",textAlign:"center" }}>Accesible para todos · v1.0</div>
      </div>
    </div>
  );

  // DESKTOP — dos columnas: info izquierda + form derecha
  return (
    <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"40px" }}>
      <div style={{ width:"100%",maxWidth:900,display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"center" }}>
        {/* Columna izquierda — info */}
        <div style={{ display:"flex",flexDirection:"column",gap:24 }}>
          <div style={{ width:90,height:90,borderRadius:"24px",background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 40px rgba(14,165,233,0.4)` }}><Eye size={46} color="#fff"/></div>
          <div><div style={{ fontSize:"38px",fontWeight:"800",color:C.textPrimary,lineHeight:1.1 }}>VisionAI</div><div style={{ fontSize:"16px",color:C.textMuted,marginTop:10,lineHeight:1.6,maxWidth:320 }}>Tu asistente visual inteligente con accesibilidad avanzada para todos</div></div>
          <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            {[["👁️","Reconocimiento visual en tiempo real"],["🎙️","Asistente de voz integrado"],["📄","Lectura de textos con OCR"],["⚙️","Configuración personalizada"]].map(([ic,tx])=>(
              <div key={tx} style={{ display:"flex",alignItems:"center",gap:12,color:C.textSub,fontSize:"14px" }}>
                <span style={{ fontSize:"18px" }}>{ic}</span>{tx}
              </div>
            ))}
          </div>
        </div>
        {/* Columna derecha — form */}
        <div style={{ background:C.surface,borderRadius:"24px",border:`1.5px solid ${C.border}`,padding:"36px",display:"flex",flexDirection:"column",gap:20 }}>
          <div style={{ fontSize:"22px",fontWeight:"700",color:C.textPrimary }}>Bienvenido</div>
          <div style={{ fontSize:"13px",color:C.textMuted }}>¿Ya tienes cuenta o eres nuevo?</div>
          <button style={{ ...mkBtn(),padding:"17px",fontSize:"16px" }} onClick={onLogin}>Iniciar sesión</button>
          <button style={{ ...mkBtnOut(),padding:"17px",fontSize:"16px" }} onClick={onRegister}>Crear cuenta nueva</button>
          <div style={{ height:1,background:C.border }}/>
          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
            {["👁️ Visual","🦻 Auditivo","🖐️ Motor","🧠 Cognitivo"].map(t=><span key={t} style={{ fontSize:"11px",color:C.textMuted,background:C.bg,padding:"5px 10px",borderRadius:"20px",border:`1px solid ${C.border}` }}>{t}</span>)}
          </div>
          <div style={{ fontSize:"11px",color:"#475569",textAlign:"center" }}>Accesible para todos · v1.0</div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// LOGIN
// ══════════════════════════════════════════════
function Login({ onBack, onSuccess, bp }) {
  const [bio, setBio] = useState("huella");
  const [ok, setOk] = useState(false);
  if (ok) return <Success title="¡Bienvenido!" sub="Sesión iniciada correctamente" label="Continuar →" onContinue={onSuccess} color={C.green}/>;

  const fields = (
    <>
      <div><div style={S.label}>📧 Correo electrónico</div><input style={S.input} placeholder="Diga su correo electrónico"/></div>
      <div><div style={S.label}>🔒 Contraseña</div><input style={S.input} type="password" placeholder="Diga su contraseña"/></div>
      <div style={{ display:"flex",gap:10 }}>
        {[{k:"huella",l:"Huella",i:<Fingerprint size={20}/>},{k:"face",l:"Facial",i:<ScanFace size={20}/>},{k:"voz",l:"Voz",i:<Mic size={20}/>}].map(b=><button key={b.k} style={mkBio(bio===b.k)} onClick={()=>setBio(b.k)}>{b.i}<span>{b.l}</span></button>)}
      </div>
    </>
  );

  const confirm = (
    <>
      <div style={{ fontSize:"13px",color:C.textMuted }}>¿Deseas ingresar? Diga Sí o No</div>
      <div style={{ display:"flex",gap:10,width:"100%" }}>
        <button style={{ flex:1,padding:"14px",borderRadius:"12px",background:"rgba(16,185,129,0.1)",border:`1.5px solid ${C.green}`,color:C.green,fontSize:"15px",fontWeight:"600",cursor:"pointer" }} onClick={()=>setOk(true)}>✓ Sí</button>
        <button style={{ flex:1,padding:"14px",borderRadius:"12px",background:"rgba(100,116,139,0.1)",border:`1.5px solid #334155`,color:C.textMuted,fontSize:"15px",cursor:"pointer" }} onClick={onBack}>✕ No</button>
      </div>
    </>
  );

  // MOBILE
  if (bp==="mobile") return (
    <div style={{ flex:1,display:"flex",flexDirection:"column",padding:"28px 24px",gap:14,overflowY:"auto" }}>
      <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
      <div style={{ fontSize:18,fontWeight:"700",color:C.textPrimary }}>Iniciar sesión</div>
      {fields}{confirm}
      <div style={{ fontSize:"11px",color:"#475569",textAlign:"center" }}>Di "Sí" para confirmar</div>
    </div>
  );

  // TABLET — tarjeta centrada
  if (bp==="tablet") return (
    <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"32px" }}>
      <div style={{ width:"100%",maxWidth:500,background:C.surface,borderRadius:"24px",border:`1.5px solid ${C.border}`,padding:"36px",display:"flex",flexDirection:"column",gap:16 }}>
        <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
        <div style={{ fontSize:24,fontWeight:"700",color:C.textPrimary }}>Iniciar sesión</div>
        <div style={{ fontSize:12,color:C.textMuted }}>Habla o usa biometría para ingresar</div>
        {fields}
        <div style={{ height:1,background:C.border }}/>
        {confirm}
      </div>
    </div>
  );

  // DESKTOP — dos columnas
  return (
    <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"40px" }}>
      <div style={{ width:"100%",maxWidth:860,display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start" }}>
        <div style={{ background:C.surface,borderRadius:"24px",border:`1.5px solid ${C.border}`,padding:"36px",display:"flex",flexDirection:"column",gap:16 }}>
          <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
          <div style={{ fontSize:26,fontWeight:"700",color:C.textPrimary }}>Iniciar sesión</div>
          {fields}
        </div>
        <div style={{ background:C.surface,borderRadius:"24px",border:`1.5px solid ${C.blue}33`,padding:"36px",display:"flex",flexDirection:"column",gap:16 }}>
          <div style={{ fontSize:14,color:C.blue,fontWeight:"600" }}>🔊 Confirmación por voz</div>
          <div style={{ ...S.card,background:"rgba(14,165,233,0.06)",border:`1.5px solid ${C.blue}33` }}>
            <div style={{ fontSize:13,color:C.textMuted }}>¿Deseas ingresar? Di <strong style={{ color:C.textPrimary }}>Sí</strong> o <strong style={{ color:C.textPrimary }}>No</strong></div>
          </div>
          <div style={{ display:"flex",gap:10 }}>
            <button style={{ flex:1,padding:"16px",borderRadius:"12px",background:"rgba(16,185,129,0.1)",border:`1.5px solid ${C.green}`,color:C.green,fontSize:"16px",fontWeight:"600",cursor:"pointer" }} onClick={()=>setOk(true)}>✓ Sí</button>
            <button style={{ flex:1,padding:"16px",borderRadius:"12px",background:"rgba(100,116,139,0.1)",border:`1.5px solid #334155`,color:C.textMuted,fontSize:"16px",cursor:"pointer" }} onClick={onBack}>✕ No</button>
          </div>
          <div style={{ fontSize:11,color:"#475569" }}>Di "Sí" para confirmar · Di "No" para cancelar</div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// REGISTER
// ══════════════════════════════════════════════
function Register({ onBack, bp }) {
  const [f, setF] = useState({ name:"", email:"", pass:"" });
  const [done, setDone] = useState(false);
  const ok = f.name && f.email && f.pass.length >= 8;
  if (done) return <Success title="Cuenta creada" sub="Registro exitoso" label="Ir al inicio →" onContinue={onBack}/>;

  const fields = (
    <div style={{ display:"grid", gridTemplateColumns: bp==="mobile"?"1fr":"1fr 1fr", gap:12, width:"100%" }}>
      {[["👤 Nombre","text","Tu nombre completo","name"],["📧 Correo","email","tu@correo.com","email"],["🔒 Contraseña","password","Mínimo 8 caracteres","pass"]]
        .map(([lbl,type,ph,key])=>(
          <div key={key} style={{ gridColumn: key==="pass"&&bp!=="mobile"?"span 2":"auto" }}>
            <div style={S.label}>{lbl}</div>
            <input style={S.input} type={type} placeholder={ph} value={f[key]} onChange={e=>setF({...f,[key]:e.target.value})}/>
          </div>
        ))}
    </div>
  );

  if (bp==="mobile") return (
    <div style={{ flex:1,display:"flex",flexDirection:"column",padding:"28px 24px",gap:14,overflowY:"auto" }}>
      <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
      <div style={{ fontSize:18,fontWeight:"700",color:C.textPrimary }}>Crear cuenta</div>
      {fields}
      <button style={{ ...mkBtn(),opacity:ok?1:0.4 }} disabled={!ok} onClick={()=>setDone(true)}>Crear cuenta</button>
    </div>
  );

  return (
    <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:bp==="desktop"?"40px":"32px" }}>
      <div style={{ width:"100%",maxWidth:bp==="desktop"?640:520,background:C.surface,borderRadius:"24px",border:`1.5px solid ${C.border}`,padding:bp==="desktop"?"40px":"36px",display:"flex",flexDirection:"column",gap:20 }}>
        <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
        <div style={{ fontSize:bp==="desktop"?28:22,fontWeight:"700",color:C.textPrimary }}>Crear cuenta</div>
        {fields}
        <button style={{ ...mkBtn(),opacity:ok?1:0.4,padding:"16px",fontSize:15 }} disabled={!ok} onClick={()=>setDone(true)}>Crear cuenta</button>
        <div style={{ fontSize:11,color:"#475569",textAlign:"center" }}>Al registrarte aceptas los términos de uso</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════════
function Dashboard({ onNavigate, onLogout, bp }) {
  const [showLogout, setShowLogout] = useState(false);
  const menu = [
    { key:"scanner",  icon:<ScanText size={24}/>,  label:"Escanear Texto",    desc:"Leer cualquier texto con la cámara", color:C.blue   },
    { key:"objects",  icon:<Search size={24}/>,    label:"Reconocer Objetos", desc:"Identifica objetos en tiempo real",  color:C.green  },
    { key:"voice",    icon:<Mic size={24}/>,        label:"Asistente de Voz",  desc:"Navega con comandos de voz",         color:C.purple },
    { key:"settings", icon:<Settings size={24}/>,  label:"Configuración",     desc:"Accesibilidad y preferencias",       color:C.amber  },
  ];

  // MOBILE
  if (bp==="mobile") return (
    <div style={{ flex:1,display:"flex",flexDirection:"column",padding:"24px",gap:14,overflowY:"auto" }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
        <div><div style={{ fontSize:19,fontWeight:"700",color:C.textPrimary }}>Hola 👋</div><div style={{ fontSize:12,color:C.textMuted }}>¿Qué necesitas hoy?</div></div>
        <div style={{ width:44,height:44,borderRadius:"14px",background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center" }}><Eye size={20} color="#fff"/></div>
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
        {menu.map(m=>(
          <button key={m.key} style={{ width:"100%",padding:"16px 18px",borderRadius:"14px",background:C.surface,border:`1.5px solid ${m.color}20`,display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left" }} onClick={()=>onNavigate(m.key)}>
            <div style={mkIcon(m.color)}>{m.icon}</div>
            <div><div style={{ fontSize:14,fontWeight:"600",color:C.textPrimary }}>{m.label}</div><div style={{ fontSize:11,color:C.textMuted,marginTop:2 }}>{m.desc}</div></div>
            <ChevronRight size={16} color="#334155" style={{ marginLeft:"auto" }}/>
          </button>
        ))}
      </div>
      <button style={{ background:"none",border:"none",color:C.red,fontSize:"13px",cursor:"pointer",display:"flex",alignItems:"center",gap:6 }} onClick={()=>setShowLogout(true)}>
        <LogOut size={13}/> Cerrar sesión
      </button>
      {showLogout&&<div style={S.modal}><div style={S.modalBox}>
        <div style={{ width:60,height:60,borderRadius:"50%",background:"rgba(239,68,68,0.1)",border:`2px solid ${C.red}`,display:"flex",alignItems:"center",justifyContent:"center" }}><X size={26} color={C.red}/></div>
        <div style={{ fontSize:18,fontWeight:"700",color:C.textPrimary }}>¿Cerrar sesión?</div>
        <button style={mkBtn(`linear-gradient(135deg,${C.red},#dc2626)`)} onClick={onLogout}>Sí, salir</button>
        <button style={mkBtnOut()} onClick={()=>setShowLogout(false)}>Cancelar</button>
      </div></div>}
    </div>
  );

  // TABLET — grid 2x2 con tarjetas grandes
  if (bp==="tablet") return (
    <div style={{ flex:1,display:"flex",flexDirection:"column",padding:"28px 24px",gap:20,overflowY:"auto" }}>
      <div style={{ display:"flex",alignItems:"center",gap:16,padding:"20px",background:C.surface,borderRadius:"18px",border:`1.5px solid ${C.border}` }}>
        <div style={{ width:54,height:54,borderRadius:"16px",background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center" }}><Eye size={26} color="#fff"/></div>
        <div><div style={{ fontSize:22,fontWeight:"700",color:C.textPrimary }}>Hola 👋</div><div style={{ fontSize:13,color:C.textMuted }}>¿Qué necesitas hoy?</div></div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
        {menu.map(m=>(
          <button key={m.key} onClick={()=>onNavigate(m.key)}
            style={{ padding:"24px 20px",borderRadius:"18px",background:C.surface,border:`1.5px solid ${m.color}30`,display:"flex",flexDirection:"column",alignItems:"flex-start",gap:14,cursor:"pointer",textAlign:"left",transition:"border-color 0.2s" }}>
            <div style={mkIcon(m.color,52)}>{m.icon}</div>
            <div><div style={{ fontSize:15,fontWeight:"600",color:C.textPrimary }}>{m.label}</div><div style={{ fontSize:12,color:C.textMuted,marginTop:4 }}>{m.desc}</div></div>
          </button>
        ))}
      </div>
    </div>
  );

  // DESKTOP — grid 2x2 con panel lateral derecho
  return (
    <div style={{ flex:1,display:"flex",padding:"32px 40px",gap:28,overflowY:"auto",maxWidth:1100,width:"100%" }}>
      {/* Main */}
      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:20 }}>
        <div><div style={{ fontSize:28,fontWeight:"800",color:C.textPrimary }}>Hola 👋</div><div style={{ fontSize:14,color:C.textMuted,marginTop:4 }}>¿Qué necesitas hoy? Selecciona una opción.</div></div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
          {menu.map(m=>(
            <button key={m.key} onClick={()=>onNavigate(m.key)}
              style={{ padding:"28px 24px",borderRadius:"20px",background:C.surface,border:`1.5px solid ${m.color}30`,display:"flex",flexDirection:"column",alignItems:"flex-start",gap:16,cursor:"pointer",textAlign:"left" }}>
              <div style={mkIcon(m.color,56)}>{m.icon}</div>
              <div><div style={{ fontSize:16,fontWeight:"600",color:C.textPrimary }}>{m.label}</div><div style={{ fontSize:12,color:C.textMuted,marginTop:5,lineHeight:1.5 }}>{m.desc}</div></div>
              <div style={{ display:"flex",alignItems:"center",gap:4,color:m.color,fontSize:12,fontWeight:"600" }}>Abrir <ChevronRight size={13}/></div>
            </button>
          ))}
        </div>
      </div>
      {/* Panel derecho */}
      <div style={{ width:240,display:"flex",flexDirection:"column",gap:14,flexShrink:0 }}>
        <div style={{ background:C.surface,borderRadius:"18px",border:`1.5px solid ${C.border}`,padding:"20px",display:"flex",flexDirection:"column",gap:12 }}>
          <div style={{ fontSize:12,color:C.textMuted,fontWeight:"600",letterSpacing:1 }}>ACCESOS RÁPIDOS</div>
          {[["🎙️","Activar voz","voice"],[" ⚙️","Configuración","settings"]].map(([ic,lbl,key])=>(
            <button key={key} onClick={()=>onNavigate(key)} style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:"12px",background:C.bg,border:`1px solid ${C.border}`,color:C.textSub,fontSize:13,cursor:"pointer",width:"100%",textAlign:"left" }}>
              <span style={{ fontSize:16 }}>{ic}</span>{lbl}
            </button>
          ))}
        </div>
        <div style={{ background:"rgba(14,165,233,0.06)",borderRadius:"18px",border:`1.5px solid ${C.blue}33`,padding:"20px" }}>
          <div style={{ fontSize:12,color:C.blue,fontWeight:"600",marginBottom:10 }}>🔊 COMANDOS DE VOZ</div>
          {["Abrir escáner","Reconocer objeto","Ir a configuración"].map(c=><div key={c} style={{ fontSize:11,color:C.textMuted,padding:"5px 0",borderBottom:`1px solid ${C.border}` }}>"{c}"</div>)}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// SCANNER
// ══════════════════════════════════════════════
function Scanner({ onBack, bp }) {
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
      const stream = await navigator.mediaDevices.getUserMedia({ video:{ facingMode:"environment" } });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject=stream; videoRef.current.play(); }
      setStage("camera");
    } catch { alert("No se pudo acceder a la cámara."); }
  };
  const stopCamera = () => { streamRef.current?.getTracks().forEach(t=>t.stop()); streamRef.current=null; };
  const capture = async () => {
    const v=videoRef.current,c=canvasRef.current;
    c.width=v.videoWidth; c.height=v.videoHeight;
    c.getContext("2d").drawImage(v,0,0);
    stopCamera(); setStage("scanning"); setProgress(0);
    try {
      const { createWorker } = await import("tesseract.js");
      const w = await createWorker("spa",1,{ logger:m=>{ if(m.status==="recognizing text") setProgress(Math.round(m.progress*100)); } });
      const { data:{ text:r } } = await w.recognize(c);
      await w.terminate();
      setText(r.trim()||"No se detectó texto claro.");
    } catch { setText("Error al procesar."); }
    setStage("result");
  };
  const speak = (t) => {
    window.speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(t); u.lang="es-PE"; u.onend=()=>setReading(false);
    window.speechSynthesis.speak(u); setReading(true);
  };

  const camBox = (h) => (
    <div style={{ height,borderRadius:"16px",background:"#0d1525",border:`2px solid ${stage==="camera"?C.blue:C.border}`,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",position:"relative" }}>
      <video ref={videoRef} style={{ width:"100%",height:"100%",objectFit:"cover",display:stage==="camera"?"block":"none" }} playsInline muted/>
      <canvas ref={canvasRef} style={{ display:"none" }}/>
      {stage==="idle"     && <div style={{ textAlign:"center",color:C.textMuted }}><Camera size={32} style={{ margin:"0 auto 8px" }}/><div style={{ fontSize:12 }}>Presiona Activar Cámara</div></div>}
      {stage==="scanning" && <div style={{ textAlign:"center",color:C.blue }}><div style={{ fontSize:28,marginBottom:8 }}>🔍</div><div style={{ fontSize:13,fontWeight:"600" }}>Leyendo... {progress}%</div><div style={{ width:120,height:4,background:"#1e3a5f",borderRadius:2,margin:"8px auto 0" }}><div style={{ width:`${progress}%`,height:"100%",background:C.blue,borderRadius:2,transition:"width 0.3s" }}/></div></div>}
      {stage==="result"   && <div style={{ textAlign:"center",color:C.green }}><div style={{ fontSize:24 }}>✓</div><div style={{ fontSize:12 }}>Detectado</div></div>}
    </div>
  );
  const camBtns = (
    <div style={{ display:"flex",gap:10,marginTop:10 }}>
      {stage==="idle"   && <button style={mkBtn()} onClick={startCamera}><div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><Camera size={15}/> Activar cámara</div></button>}
      {stage==="camera" && <><button style={mkBtn(`linear-gradient(135deg,${C.green},#059669)`)} onClick={capture}><div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><ScanText size={15}/> Escanear</div></button><button style={{ ...mkBtnOut(),width:"auto",padding:"15px 18px" }} onClick={()=>{ stopCamera();setStage("idle"); }}><X size={15}/></button></>}
      {stage==="result" && <button style={mkBtnOut()} onClick={()=>{ setText("");setStage("idle"); }}><div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><RotateCcw size={14}/> Nuevo</div></button>}
    </div>
  );
  const resultBox = stage==="result"&&text&&(
    <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
      <div style={{ ...S.card }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
          <span style={{ fontSize:11,color:C.textMuted }}>Texto:</span>
          <div style={{ display:"flex",gap:6 }}>
            <button style={{ background:C.surface,border:`1px solid ${C.border}`,color:C.textMuted,borderRadius:"8px",padding:"4px 8px",cursor:"pointer" }} onClick={()=>setFontSize(f=>Math.max(11,f-1))}><ZoomOut size={12}/></button>
            <button style={{ background:C.surface,border:`1px solid ${C.border}`,color:C.textMuted,borderRadius:"8px",padding:"4px 8px",cursor:"pointer" }} onClick={()=>setFontSize(f=>Math.min(22,f+1))}><ZoomIn size={12}/></button>
          </div>
        </div>
        <p style={{ fontSize:fontSize,color:C.textPrimary,lineHeight:1.7,margin:0,whiteSpace:"pre-line" }}>{text}</p>
      </div>
      <button style={{ ...mkBtn(reading?`rgba(14,165,233,0.15)`:`linear-gradient(135deg,${C.blue},#0369a1)`),border:reading?`1.5px solid ${C.blue}`:"none",color:reading?C.blue:"#fff" }}
        onClick={()=>{ if(reading){ window.speechSynthesis.cancel();setReading(false); } else speak(text); }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>{reading?<><VolumeX size={16}/>Detener</>:<><Volume2 size={16}/>Escuchar</>}</div>
      </button>
    </div>
  );

  if (bp==="mobile") return (
    <div style={{ flex:1,display:"flex",flexDirection:"column",padding:"24px",gap:14,overflowY:"auto" }}>
      <button style={S.back} onClick={()=>{ stopCamera();onBack(); }}><ArrowLeft size={15}/> Volver</button>
      <div style={{ fontSize:18,fontWeight:"700",color:C.textPrimary }}>Escanear Texto</div>
      {camBox(180)}{camBtns}{resultBox}
    </div>
  );

  return (
    <div style={{ flex:1,display:"flex",padding:bp==="desktop"?"32px 40px":"28px 24px",gap:24,overflowY:"auto",maxWidth:bp==="desktop"?1000:undefined,width:"100%" }}>
      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:14 }}>
        <button style={S.back} onClick={()=>{ stopCamera();onBack(); }}><ArrowLeft size={15}/> Volver</button>
        <div style={{ fontSize:bp==="desktop"?26:20,fontWeight:"700",color:C.textPrimary }}>Escanear Texto</div>
        {camBox(bp==="desktop"?280:220)}{camBtns}
      </div>
      {stage==="result"&&text&&<div style={{ flex:1,display:"flex",flexDirection:"column",gap:14,paddingTop:bp==="desktop"?54:40 }}>{resultBox}</div>}
    </div>
  );
}

// ══════════════════════════════════════════════
// OBJECTS
// ══════════════════════════════════════════════
function Objects({ onBack, bp }) {
  const [detecting, setDetecting] = useState(false);
  const [result, setResult] = useState(null);
  const objects = [{ label:"Silla de ruedas",conf:97,color:C.green },{ label:"Señal de salida",conf:94,color:C.blue },{ label:"Persona",conf:89,color:C.purple }];
  const detect = () => { setDetecting(true);setResult(null);setTimeout(()=>{ setDetecting(false);setResult(objects); },2500); };

  const camBox = (h) => (
    <div style={{ height:h,borderRadius:"16px",background:"#0d1525",border:`2px dashed ${detecting?C.purple:C.border}`,display:"flex",alignItems:"center",justifyContent:"center" }}>
      {!detecting&&!result&&<div style={{ textAlign:"center",color:C.textMuted }}><Camera size={32} style={{ margin:"0 auto 8px" }}/><div style={{ fontSize:12 }}>Vista de cámara</div></div>}
      {detecting&&<div style={{ textAlign:"center",color:C.purple }}><div style={{ fontSize:28,marginBottom:8 }}>🔍</div><div style={{ fontSize:12 }}>Analizando...</div></div>}
      {result&&<div style={{ textAlign:"center",color:C.green }}><div style={{ fontSize:24 }}>✓</div><div style={{ fontSize:11 }}>{result.length} objetos</div></div>}
    </div>
  );

  if (bp==="mobile") return (
    <div style={{ flex:1,display:"flex",flexDirection:"column",padding:"24px",gap:14,overflowY:"auto" }}>
      <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
      <div style={{ fontSize:18,fontWeight:"700",color:C.textPrimary }}>Reconocer Objetos</div>
      {camBox(170)}
      <button style={mkBtn(`linear-gradient(135deg,${C.green},#059669)`)} onClick={detect} disabled={detecting}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>{detecting?<><Square size={14}/>Analizando...</>:<><Play size={14}/>Detectar</>}</div>
      </button>
      {result&&<div style={{ display:"flex",flexDirection:"column",gap:8 }}>
        {result.map((o,i)=><div key={i} style={{ ...S.card,display:"flex",alignItems:"center",gap:12 }}><div style={{ width:8,height:8,borderRadius:"50%",background:o.color,flexShrink:0 }}/><span style={{ flex:1,fontSize:14,color:C.textPrimary }}>{o.label}</span><span style={{ fontSize:12,color:o.color,fontWeight:"600" }}>{o.conf}%</span></div>)}
        <button style={mkBtn(`linear-gradient(135deg,${C.blue},#0369a1)`)} onClick={()=>{ const u=new SpeechSynthesisUtterance("Se detectaron: "+result.map(o=>o.label).join(", ")); u.lang="es-PE"; window.speechSynthesis.speak(u); }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><Volume2 size={15}/>Leer resultados</div>
        </button>
      </div>}
    </div>
  );

  return (
    <div style={{ flex:1,display:"flex",padding:bp==="desktop"?"32px 40px":"28px 24px",gap:24,overflowY:"auto",maxWidth:bp==="desktop"?1000:undefined,width:"100%" }}>
      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:14 }}>
        <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
        <div style={{ fontSize:bp==="desktop"?26:20,fontWeight:"700",color:C.textPrimary }}>Reconocer Objetos</div>
        {camBox(bp==="desktop"?280:220)}
        <button style={mkBtn(`linear-gradient(135deg,${C.green},#059669)`)} onClick={detect} disabled={detecting}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>{detecting?<><Square size={14}/>Analizando...</>:<><Play size={14}/>Detectar objetos</>}</div>
        </button>
      </div>
      {result&&(
        <div style={{ flex:1,display:"flex",flexDirection:"column",gap:10,paddingTop:bp==="desktop"?54:40 }}>
          <div style={{ fontSize:12,color:C.textMuted }}>Objetos identificados:</div>
          {result.map((o,i)=><div key={i} style={{ ...S.card,display:"flex",alignItems:"center",gap:12 }}><div style={{ width:10,height:10,borderRadius:"50%",background:o.color,flexShrink:0 }}/><span style={{ flex:1,fontSize:14,color:C.textPrimary }}>{o.label}</span><span style={{ fontSize:13,color:o.color,fontWeight:"600" }}>{o.conf}%</span></div>)}
          <button style={mkBtn(`linear-gradient(135deg,${C.blue},#0369a1)`)} onClick={()=>{ const u=new SpeechSynthesisUtterance("Se detectaron: "+result.map(o=>o.label).join(", ")); u.lang="es-PE"; window.speechSynthesis.speak(u); }}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><Volume2 size={15}/>Leer resultados</div>
          </button>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════
// VOICE ASSISTANT
// ══════════════════════════════════════════════
function VoiceAssistant({ onBack, bp }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const recRef = useRef(null);
  const fakeRes = { "hora":"Son las "+new Date().toLocaleTimeString("es-PE",{hour:"2-digit",minute:"2-digit"}), "fecha":"Hoy es "+new Date().toLocaleDateString("es-PE",{weekday:"long",day:"numeric",month:"long"}), "hola":"Hola, estoy aquí para ayudarte.", "ayuda":"Puedes pedirme que lea textos o identifique objetos.", "gracias":"De nada, es un placer." };
  const handleListen = () => {
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){ setTranscript("(simulado)"); const r="Hola, estoy aquí."; setResponse(r); const u=new SpeechSynthesisUtterance(r); u.lang="es-PE"; window.speechSynthesis.speak(u); return; }
    if(listening){ recRef.current?.stop();setListening(false);return; }
    const rec=new SR(); recRef.current=rec; rec.lang="es-PE"; rec.interimResults=false;
    rec.onstart=()=>setListening(true);
    rec.onresult=(e)=>{ const t=e.results[0][0].transcript.toLowerCase(); setTranscript(t); const k=Object.keys(fakeRes).find(k=>t.includes(k)); const r=k?fakeRes[k]:`Dijiste: "${t}"`; setResponse(r); const u=new SpeechSynthesisUtterance(r); u.lang="es-PE"; window.speechSynthesis.speak(u); };
    rec.onerror=()=>{ setListening(false);setTranscript("Error"); };
    rec.onend=()=>setListening(false);
    rec.start();
  };
  const cmds = ["¿Qué hora es?","¿Qué fecha es?","Ayuda"];
  const micBtn = (sz) => (
    <div style={{ width:sz,height:sz,borderRadius:"50%",background:listening?"rgba(124,58,237,0.2)":"rgba(14,165,233,0.1)",border:`3px solid ${listening?C.purple:C.blue}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.3s",boxShadow:listening?`0 0 40px rgba(124,58,237,0.3)`:"none",flexShrink:0 }} onClick={handleListen}>
      <Mic size={sz*0.35} color={listening?C.purple:C.blue}/>
    </div>
  );

  if (bp==="mobile") return (
    <div style={{ flex:1,display:"flex",flexDirection:"column",padding:"24px",gap:14,overflowY:"auto",alignItems:"center" }}>
      <button style={{ ...S.back,alignSelf:"flex-start" }} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
      <div style={{ fontSize:18,fontWeight:"700",color:C.textPrimary,alignSelf:"flex-start" }}>Asistente de Voz</div>
      {micBtn(120)}
      <div style={{ fontSize:13,color:listening?C.purple:C.textMuted,fontWeight:listening?"600":"400" }}>{listening?"Escuchando...":"Toca el micrófono"}</div>
      {transcript&&<div style={S.card}><div style={{ fontSize:11,color:C.textMuted,marginBottom:6 }}>Dijiste:</div><div style={{ fontSize:14,color:C.textPrimary,fontStyle:"italic" }}>"{transcript}"</div></div>}
      {response&&<div style={{ ...S.card,background:"rgba(14,165,233,0.08)",border:`1.5px solid ${C.blue}33` }}><div style={{ fontSize:11,color:C.blue,marginBottom:6 }}>Respuesta:</div><div style={{ fontSize:14,color:C.textPrimary }}>{response}</div></div>}
      <div style={{ width:"100%",display:"flex",flexDirection:"column",gap:6 }}>
        <div style={{ fontSize:11,color:C.textMuted }}>Comandos:</div>
        {cmds.map(cmd=><button key={cmd} style={{ ...S.card,cursor:"pointer",fontSize:13,color:C.textSub,display:"flex",alignItems:"center",gap:8 }} onClick={()=>{ setTranscript(cmd.toLowerCase());const k=Object.keys(fakeRes).find(k=>cmd.toLowerCase().includes(k));const r=k?fakeRes[k]:`Dijiste: "${cmd}"`;setResponse(r);const u=new SpeechSynthesisUtterance(r);u.lang="es-PE";window.speechSynthesis.speak(u); }}><Mic size={12} color={C.blue}/>{cmd}</button>)}
      </div>
    </div>
  );

  return (
    <div style={{ flex:1,display:"flex",padding:bp==="desktop"?"32px 40px":"28px 24px",gap:bp==="desktop"?40:28,overflowY:"auto",maxWidth:bp==="desktop"?1000:undefined,width:"100%",alignItems:"flex-start" }}>
      <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:16,flexShrink:0 }}>
        <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
        {micBtn(bp==="desktop"?160:130)}
        <div style={{ fontSize:14,color:listening?C.purple:C.textMuted,fontWeight:listening?"600":"400",textAlign:"center" }}>{listening?"Escuchando...":"Toca el micrófono"}</div>
      </div>
      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:12 }}>
        <div style={{ fontSize:bp==="desktop"?26:20,fontWeight:"700",color:C.textPrimary }}>Asistente de Voz</div>
        {transcript&&<div style={S.card}><div style={{ fontSize:11,color:C.textMuted,marginBottom:6 }}>Dijiste:</div><div style={{ fontSize:14,color:C.textPrimary,fontStyle:"italic" }}>"{transcript}"</div></div>}
        {response&&<div style={{ ...S.card,background:"rgba(14,165,233,0.08)",border:`1.5px solid ${C.blue}33` }}><div style={{ fontSize:11,color:C.blue,marginBottom:6 }}>Respuesta:</div><div style={{ fontSize:14,color:C.textPrimary }}>{response}</div></div>}
        <div style={{ fontSize:11,color:C.textMuted,marginTop:4 }}>Comandos sugeridos:</div>
        {cmds.map(cmd=><button key={cmd} style={{ ...S.card,cursor:"pointer",fontSize:13,color:C.textSub,display:"flex",alignItems:"center",gap:8 }} onClick={()=>{ setTranscript(cmd.toLowerCase());const k=Object.keys(fakeRes).find(k=>cmd.toLowerCase().includes(k));const r=k?fakeRes[k]:`Dijiste: "${cmd}"`;setResponse(r);const u=new SpeechSynthesisUtterance(r);u.lang="es-PE";window.speechSynthesis.speak(u); }}><Mic size={12} color={C.blue}/>{cmd}</button>)}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// SETTINGS
// ══════════════════════════════════════════════
function SettingsScreen({ onBack, settings, setSettings, bp }) {
  const toggle = (key) => setSettings(s=>({...s,[key]:!s[key]}));
  const Row = ({ icon, label, desc, skey, color=C.blue }) => (
    <div style={{ ...S.card,display:"flex",alignItems:"center",gap:12 }}>
      <div style={mkIcon(color,38)}>{icon}</div>
      <div style={{ flex:1 }}><div style={{ fontSize:13,fontWeight:"600",color:C.textPrimary }}>{label}</div><div style={{ fontSize:11,color:C.textMuted,marginTop:2 }}>{desc}</div></div>
      <button onClick={()=>toggle(skey)} style={{ width:44,height:24,borderRadius:12,background:settings[skey]?C.blue:"#334155",border:"none",cursor:"pointer",position:"relative",transition:"background 0.2s",flexShrink:0 }}>
        <div style={{ width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:settings[skey]?23:3,transition:"left 0.2s" }}/>
      </button>
    </div>
  );
  const rows = [
    <Row key="hc" icon={<Sun size={18}/>}       label="Alto contraste"         desc="Aumenta el contraste visual"   skey="highContrast" color={C.amber}/>,
    <Row key="ar" icon={<Volume2 size={18}/>}   label="Lectura automática"     desc="Lee el contenido al abrirlo"   skey="autoRead"     color={C.blue}/>,
    <Row key="st" icon={<Subtitles size={18}/>} label="Subtítulos automáticos" desc="Para videos y audio"           skey="subtitles"    color={C.green}/>,
    <Row key="sm" icon={<Brain size={18}/>}     label="Modo cognitivo simple"  desc="Interfaz simplificada"         skey="simpleMode"   color={C.purple}/>,
    <Row key="vn" icon={<Mic size={18}/>}       label="Navegación por voz"     desc="Activa comandos globales"      skey="voiceNav"     color={C.red}/>,
  ];
  const fontCtrl = (
    <div style={S.card}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
        <div><div style={{ fontSize:13,fontWeight:"600",color:C.textPrimary }}>Tamaño de letra</div><div style={{ fontSize:11,color:C.textMuted }}>Ajusta para mejor lectura</div></div>
        <span style={{ fontSize:14,fontWeight:"700",color:C.blue }}>{settings.fontSize}px</span>
      </div>
      <div style={{ display:"flex",gap:8 }}>
        {[12,15,18,22].map(sz=><button key={sz} style={{ flex:1,padding:"10px 0",borderRadius:10,background:settings.fontSize===sz?C.blue:C.surface,border:`1.5px solid ${settings.fontSize===sz?C.blue:C.border}`,color:settings.fontSize===sz?"#fff":C.textMuted,fontSize:sz,cursor:"pointer",fontWeight:"600" }} onClick={()=>setSettings(s=>({...s,fontSize:sz}))}>A</button>)}
      </div>
    </div>
  );

  if (bp==="mobile") return (
    <div style={{ flex:1,display:"flex",flexDirection:"column",padding:"24px",gap:12,overflowY:"auto" }}>
      <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
      <div style={{ fontSize:18,fontWeight:"700",color:C.textPrimary }}>Configuración</div>
      {fontCtrl}{rows}
    </div>
  );

  return (
    <div style={{ flex:1,display:"flex",padding:bp==="desktop"?"32px 40px":"28px 24px",gap:24,overflowY:"auto",maxWidth:bp==="desktop"?1000:undefined,width:"100%" }}>
      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:14 }}>
        <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
        <div style={{ fontSize:bp==="desktop"?26:20,fontWeight:"700",color:C.textPrimary }}>Configuración</div>
        {fontCtrl}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>{rows}</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════════════
const defaultSettings = { fontSize:15, highContrast:false, autoRead:false, subtitles:false, simpleMode:false, voiceNav:false };

export default function App() {
  const [screen, setScreen]     = useState("welcome");
  const [settings, setSettings] = useState(defaultSettings);
  const bp = useBreakpoint();

  useEffect(() => {
    document.body.style.filter = settings.highContrast ? "contrast(1.3) brightness(1.1)" : "none";
  }, [settings.highContrast]);

  const nav = (s) => setScreen(s);
  const p = { bp };
  const hasSidebar = bp!=="mobile" && screen!=="welcome" && screen!=="login" && screen!=="register";

  const renderScreen = () => {
    switch(screen) {
      case "welcome":   return <Welcome   {...p} onLogin={()=>nav("login")} onRegister={()=>nav("register")}/>;
      case "login":     return <Login     {...p} onBack={()=>nav("welcome")} onSuccess={()=>nav("dashboard")}/>;
      case "register":  return <Register  {...p} onBack={()=>nav("welcome")}/>;
      case "dashboard": return <Dashboard {...p} onNavigate={nav} onLogout={()=>nav("welcome")}/>;
      case "scanner":   return <Scanner   {...p} onBack={()=>nav("dashboard")}/>;
      case "objects":   return <Objects   {...p} onBack={()=>nav("dashboard")}/>;
      case "voice":     return <VoiceAssistant {...p} onBack={()=>nav("dashboard")}/>;
      case "settings":  return <SettingsScreen {...p} onBack={()=>nav("dashboard")} settings={settings} setSettings={setSettings}/>;
      default: return null;
    }
  };

  // MOBILE — frame de teléfono
  if (bp==="mobile") return (
    <div style={{ minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Segoe UI',sans-serif" }}>
      <div style={{ width:360,minHeight:720,maxHeight:720,background:C.phone,borderRadius:"36px",border:`2px solid ${C.border}`,overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 24px 60px rgba(0,0,0,0.6)",position:"relative" }}>
        <StatusBar/>
        {renderScreen()}
      </div>
    </div>
  );

  // TABLET / DESKTOP
  return (
    <div style={{ minHeight:"100vh",background:C.bg,display:"flex",fontFamily:"'Segoe UI',sans-serif" }}>
      {hasSidebar && <Sidebar screen={screen} onNavigate={nav} onLogout={()=>nav("welcome")} bp={bp}/>}
      <div style={{ flex:1,display:"flex",flexDirection:"column",overflow:"hidden" }}>
        <TopBar screen={screen} bp={bp}/>
        <div style={{ flex:1,overflowY:"auto",display:"flex",justifyContent:bp==="desktop"?"center":"flex-start" }}>
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}