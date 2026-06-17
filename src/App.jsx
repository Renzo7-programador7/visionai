import { useState, useEffect, useRef } from "react";
import {
  Eye, ArrowLeft, Fingerprint, ScanFace, Mic, ScanText,
  Search, Settings, LogOut, X, Check, Volume2, VolumeX,
  ZoomIn, ZoomOut, Sun, Subtitles, Brain, ChevronRight,
  Camera, Play, Square, RotateCcw, Pause, SkipBack,
  SkipForward, HelpCircle, BookOpen, Video, MicOff,
  FileText, Accessibility
} from "lucide-react";

function useBreakpoint() {
  const get = () => window.innerWidth >= 1024 ? "desktop" : window.innerWidth >= 768 ? "tablet" : "mobile";
  const [bp, setBp] = useState(get);
  useEffect(() => { const fn = () => setBp(get()); window.addEventListener("resize", fn); return () => window.removeEventListener("resize", fn); }, []);
  return bp;
}

const C = {
  bg:"#0b1120", phone:"#111827", surface:"#1a2235", border:"#1e3a5f",
  blue:"#0ea5e9", purple:"#7c3aed", green:"#10b981", amber:"#f59e0b",
  red:"#ef4444", teal:"#14b8a6", pink:"#ec4899", orange:"#f97316",
  textPrimary:"#e2e8f0", textMuted:"#64748b", textSub:"#94a3b8", sidebar:"#0d1525",
};

const S = {
  input:   { width:"100%", padding:"13px 15px", borderRadius:"12px", background:C.surface, border:`1.5px solid ${C.border}`, color:C.textPrimary, fontSize:"14px", outline:"none", boxSizing:"border-box" },
  label:   { fontSize:"11px", color:C.textMuted, marginBottom:"4px" },
  back:    { background:"none", border:"none", color:C.textMuted, fontSize:"13px", cursor:"pointer", display:"flex", alignItems:"center", gap:"5px", alignSelf:"flex-start", padding:0 },
  card:    { width:"100%", padding:"16px 18px", borderRadius:"14px", background:C.surface, border:`1.5px solid ${C.border}` },
  modal:   { position:"absolute", inset:0, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", zIndex:20 },
  modalBox:{ background:C.surface, borderRadius:"22px", padding:"28px 22px", width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:"16px", border:`1.5px solid ${C.border}` },
  textarea:{ width:"100%", padding:"13px 15px", borderRadius:"12px", background:C.surface, border:`1.5px solid ${C.border}`, color:C.textPrimary, fontSize:"14px", outline:"none", boxSizing:"border-box", resize:"vertical", minHeight:"120px", fontFamily:"inherit", lineHeight:1.6 },
};

const mkBtn    = (bg=`linear-gradient(135deg,${C.blue},#0284c7)`, extra={}) => ({ width:"100%", padding:"15px", borderRadius:"14px", background:bg, border:"none", color:"#fff", fontSize:"15px", fontWeight:"600", cursor:"pointer", ...extra });
const mkBtnOut = (extra={}) => ({ width:"100%", padding:"15px", borderRadius:"14px", background:"transparent", border:`2px solid ${C.border}`, color:C.textSub, fontSize:"15px", cursor:"pointer", ...extra });
const mkBio    = (a) => ({ flex:1, padding:"12px", borderRadius:"12px", background:a?`rgba(14,165,233,0.15)`:C.surface, border:`1.5px solid ${a?C.blue:C.border}`, color:a?C.blue:C.textMuted, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:"5px", fontSize:"11px" });
const mkIcon   = (color, sz=44) => ({ width:sz, height:sz, borderRadius:"12px", background:`${color}18`, border:`1.5px solid ${color}44`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color });

function StatusBar({ title="VisionAI" }) {
  const [t,setT] = useState(new Date().toLocaleTimeString("es-PE",{hour:"2-digit",minute:"2-digit"}));
  useEffect(()=>{ const i=setInterval(()=>setT(new Date().toLocaleTimeString("es-PE",{hour:"2-digit",minute:"2-digit"})),10000); return()=>clearInterval(i); },[]);
  return <div style={{ background:"#0d1525",padding:"10px 24px 8px",display:"flex",justifyContent:"space-between",fontSize:"11px",color:C.textMuted,flexShrink:0 }}><span>{t}</span><span>{title}</span><span>🔋 100%</span></div>;
}

function Success({ title, sub, label, onContinue, color=C.blue }) {
  return (
    <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 24px",gap:"18px" }}>
      <div style={{ width:76,height:76,borderRadius:"50%",background:`${color}18`,border:`2px solid ${color}`,display:"flex",alignItems:"center",justifyContent:"center" }}><Check size={34} color={color}/></div>
      <div style={{ fontSize:"20px",fontWeight:"700",color:C.textPrimary }}>{title}</div>
      <div style={{ fontSize:"13px",color:C.textMuted }}>{sub}</div>
      <button style={mkBtn()} onClick={onContinue}>{label}</button>
    </div>
  );
}

const NAV = [
  { key:"dashboard",  icon:<Eye size={20}/>,           label:"Inicio"            },
  { key:"reading",    icon:<BookOpen size={20}/>,       label:"Lectura Accesible" },
  { key:"voice2text", icon:<FileText size={20}/>,       label:"Voz a Texto"       },
  { key:"scanner",    icon:<ScanText size={20}/>,       label:"Escanear Texto"    },
  { key:"objects",    icon:<Search size={20}/>,         label:"Reconocer Objetos" },
  { key:"multimedia", icon:<Video size={20}/>,          label:"Multimedia"        },
  { key:"access",     icon:<Accessibility size={20}/>,  label:"Accesibilidad"     },
  { key:"help",       icon:<HelpCircle size={20}/>,     label:"Ayuda"             },
];

function Sidebar({ screen, onNavigate, onLogout, bp }) {
  const collapsed = bp === "tablet";
  return (
    <aside style={{ width:collapsed?64:220,minHeight:"100vh",background:C.sidebar,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",flexShrink:0,transition:"width 0.25s",overflowY:"auto" }}>
      <div style={{ padding:collapsed?"18px 0":"20px 16px",display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid ${C.border}`,justifyContent:collapsed?"center":"flex-start" }}>
        <div style={{ width:36,height:36,borderRadius:"10px",background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Eye size={18} color="#fff"/></div>
        {!collapsed&&<div><div style={{ color:"#fff",fontSize:"14px",fontWeight:"700" }}>VisionAI</div><div style={{ color:C.blue,fontSize:"10px" }}>Accesibilidad con IA</div></div>}
      </div>
      <nav style={{ flex:1,padding:"12px 8px",display:"flex",flexDirection:"column",gap:2 }}>
        {NAV.map(item => {
          const active = screen === item.key;
          return (
            <button key={item.key} onClick={()=>onNavigate(item.key)} title={item.label}
              style={{ display:"flex",alignItems:"center",gap:10,padding:collapsed?0:"10px 12px",width:collapsed?44:undefined,height:collapsed?40:undefined,justifyContent:collapsed?"center":"flex-start",borderRadius:"12px",border:"none",background:active?"rgba(14,165,233,0.12)":"transparent",color:active?C.blue:C.textMuted,cursor:"pointer",fontSize:"13px",fontWeight:active?"600":"400",position:"relative",margin:collapsed?"4px auto":"2px 0" }}>
              {item.icon}
              {!collapsed&&<span>{item.label}</span>}
              {active&&<span style={{ position:"absolute",right:0,top:"50%",transform:"translateY(-50%)",width:3,height:20,background:C.blue,borderRadius:"3px 0 0 3px" }}/>}
            </button>
          );
        })}
      </nav>
      <div style={{ padding:"12px 8px",borderTop:`1px solid ${C.border}` }}>
        <button onClick={onLogout} title="Cerrar sesión"
          style={{ display:"flex",alignItems:"center",gap:8,padding:collapsed?0:"10px 12px",width:collapsed?44:undefined,height:collapsed?44:undefined,justifyContent:collapsed?"center":"flex-start",borderRadius:"12px",border:`1px solid rgba(239,68,68,0.3)`,background:"rgba(239,68,68,0.08)",color:C.red,cursor:"pointer",fontSize:"12px",margin:collapsed?"0 auto":0 }}>
          <LogOut size={16}/>{!collapsed&&<span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  );
}

const TITLES = { welcome:"VisionAI",login:"Iniciar sesión",register:"Registro",dashboard:"Panel principal",reading:"Lectura Accesible",voice2text:"Voz a Texto",scanner:"Escanear Texto",objects:"Reconocer Objetos",multimedia:"Multimedia",access:"Accesibilidad",help:"Ayuda" };

function TopBar({ screen, bp }) {
  const colors = { tablet:C.purple, desktop:C.blue };
  const labels = { tablet:"📱 Tablet", desktop:"🖥️ Escritorio" };
  return (
    <div style={{ background:C.sidebar,borderBottom:`1px solid ${C.border}`,padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0 }}>
      <div style={{ display:"flex",alignItems:"center",gap:10 }}>
        {["welcome","login","register"].includes(screen)&&<div style={{ width:32,height:32,borderRadius:"8px",background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center" }}><Eye size={16} color="#fff"/></div>}
        <span style={{ color:C.textPrimary,fontSize:"15px",fontWeight:"600" }}>{TITLES[screen]||"VisionAI"}</span>
      </div>
      <span style={{ fontSize:"11px",color:colors[bp],background:`${colors[bp]}18`,padding:"5px 12px",borderRadius:"20px",border:`1px solid ${colors[bp]}44`,fontWeight:"600" }}>{labels[bp]}</span>
    </div>
  );
}

function Welcome({ onLogin, onRegister, bp }) {
  const isMobile = bp==="mobile";
  const instructions = ["Toca un módulo para comenzar","Usa botones grandes para navegar","Activa la voz para comandos","Personaliza en Accesibilidad"];

  if (isMobile) return (
    <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"24px",gap:16,overflowY:"auto" }}>
      <div style={{ width:80,height:80,borderRadius:"24px",background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 32px rgba(14,165,233,0.35)`,marginTop:8 }}><Eye size={38} color="#fff"/></div>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:"26px",fontWeight:"800",color:C.textPrimary }}>VisionAI</div>
        <div style={{ fontSize:"13px",color:C.textMuted,marginTop:6,lineHeight:1.6 }}>Tu asistente visual inteligente con accesibilidad avanzada</div>
      </div>
      <div style={{ width:"100%",display:"flex",flexDirection:"column",gap:10 }}>
        <button style={{ ...mkBtn(),padding:"18px",fontSize:"17px" }} onClick={onLogin}>Ingresar</button>
        <button style={{ ...mkBtnOut(),padding:"18px",fontSize:"17px" }} onClick={onRegister}>Registrarse</button>
      </div>
      <div style={{ width:"100%",background:C.surface,borderRadius:"16px",border:`1px solid ${C.border}`,padding:"16px" }}>
        <div style={{ fontSize:"11px",color:C.textMuted,marginBottom:10,fontWeight:"600",letterSpacing:1 }}>INSTRUCCIONES DE USO</div>
        {instructions.map((t,i)=><div key={i} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:8 }}><div style={{ width:22,height:22,borderRadius:"50%",background:`rgba(14,165,233,0.15)`,border:`1px solid ${C.blue}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",color:C.blue,flexShrink:0,fontWeight:"700" }}>{i+1}</div><span style={{ fontSize:"12px",color:C.textSub }}>{t}</span></div>)}
      </div>
      <div style={{ display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center" }}>
        {["👁️ Visual","🦻 Auditivo","🖐️ Motor","🧠 Cognitivo"].map(t=><span key={t} style={{ fontSize:"10px",color:C.textMuted,background:C.surface,padding:"5px 10px",borderRadius:"20px",border:`1px solid ${C.border}` }}>{t}</span>)}
      </div>
    </div>
  );

  if (bp==="tablet") return (
    <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"32px" }}>
      <div style={{ width:"100%",maxWidth:560,background:C.surface,borderRadius:"24px",border:`1.5px solid ${C.border}`,padding:"40px",display:"flex",flexDirection:"column",gap:24 }}>
        <div style={{ display:"flex",alignItems:"center",gap:20 }}>
          <div style={{ width:72,height:72,borderRadius:"20px",background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Eye size={36} color="#fff"/></div>
          <div><div style={{ fontSize:"28px",fontWeight:"800",color:C.textPrimary }}>VisionAI</div><div style={{ fontSize:"13px",color:C.textMuted,marginTop:4 }}>Asistente visual inteligente</div></div>
        </div>
        <div style={{ height:1,background:C.border }}/>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
          <button style={{ ...mkBtn(),fontSize:"16px",padding:"18px" }} onClick={onLogin}>Ingresar</button>
          <button style={{ ...mkBtnOut(),fontSize:"16px",padding:"18px" }} onClick={onRegister}>Registrarse</button>
        </div>
        <div style={{ background:C.bg,borderRadius:"14px",border:`1px solid ${C.border}`,padding:"16px" }}>
          <div style={{ fontSize:"11px",color:C.textMuted,marginBottom:10,fontWeight:"600" }}>INSTRUCCIONES</div>
          {instructions.map((t,i)=><div key={i} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:8 }}><div style={{ width:22,height:22,borderRadius:"50%",background:`rgba(14,165,233,0.15)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",color:C.blue,flexShrink:0,fontWeight:"700" }}>{i+1}</div><span style={{ fontSize:"12px",color:C.textSub }}>{t}</span></div>)}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"40px" }}>
      <div style={{ width:"100%",maxWidth:960,display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"center" }}>
        <div style={{ display:"flex",flexDirection:"column",gap:24 }}>
          <div style={{ width:90,height:90,borderRadius:"24px",background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 40px rgba(14,165,233,0.4)` }}><Eye size={46} color="#fff"/></div>
          <div><div style={{ fontSize:"42px",fontWeight:"800",color:C.textPrimary,lineHeight:1.1 }}>VisionAI</div><div style={{ fontSize:"16px",color:C.textMuted,marginTop:10,lineHeight:1.6 }}>Tu asistente visual inteligente con accesibilidad avanzada para todos</div></div>
          <div style={{ background:C.surface,borderRadius:"16px",border:`1px solid ${C.border}`,padding:"20px" }}>
            <div style={{ fontSize:"11px",color:C.textMuted,marginBottom:12,fontWeight:"600",letterSpacing:1 }}>INSTRUCCIONES DE USO</div>
            {instructions.map((t,i)=><div key={i} style={{ display:"flex",alignItems:"center",gap:12,marginBottom:10 }}><div style={{ width:26,height:26,borderRadius:"50%",background:`rgba(14,165,233,0.15)`,border:`1px solid ${C.blue}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",color:C.blue,flexShrink:0,fontWeight:"700" }}>{i+1}</div><span style={{ fontSize:"13px",color:C.textSub }}>{t}</span></div>)}
          </div>
        </div>
        <div style={{ background:C.surface,borderRadius:"24px",border:`1.5px solid ${C.border}`,padding:"40px",display:"flex",flexDirection:"column",gap:20 }}>
          <div style={{ fontSize:"22px",fontWeight:"700",color:C.textPrimary }}>Bienvenido</div>
          <button style={{ ...mkBtn(),padding:"18px",fontSize:"16px" }} onClick={onLogin}>Iniciar sesión</button>
          <button style={{ ...mkBtnOut(),padding:"18px",fontSize:"16px" }} onClick={onRegister}>Crear cuenta nueva</button>
          <div style={{ height:1,background:C.border }}/>
          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
            {["👁️ Visual","🦻 Auditivo","🖐️ Motor","🧠 Cognitivo","👴 Adulto mayor"].map(t=><span key={t} style={{ fontSize:"11px",color:C.textMuted,background:C.bg,padding:"5px 10px",borderRadius:"20px",border:`1px solid ${C.border}` }}>{t}</span>)}
          </div>
          <div style={{ fontSize:"11px",color:"#475569",textAlign:"center" }}>Accesible para todos · v2.0</div>
        </div>
      </div>
    </div>
  );
}

function Login({ onBack, onSuccess, bp }) {
  const [bio,setBio] = useState("huella");
  const [ok,setOk]   = useState(false);
  if (ok) return <Success title="¡Bienvenido!" sub="Sesión iniciada correctamente" label="Continuar →" onContinue={onSuccess} color={C.green}/>;
  const fields = (
    <>
      <div><div style={S.label}>📧 Correo electrónico</div><input style={S.input} placeholder="Diga su correo electrónico"/></div>
      <div><div style={S.label}>🔒 Contraseña</div><input style={S.input} type="password" placeholder="Diga su contraseña"/></div>
      <div style={{ display:"flex",gap:10 }}>
        {[{k:"huella",l:"Huella",i:<Fingerprint size={20}/>},{k:"face",l:"Facial",i:<ScanFace size={20}/>},{k:"voz",l:"Voz",i:<Mic size={20}/>}].map(b=>(<button key={b.k} style={mkBio(bio===b.k)} onClick={()=>{ setBio(b.k); const msg=b.k==="huella"?"Huella digital seleccionada":b.k==="face"?"Reconocimiento facial seleccionado":"Reconocimiento de voz seleccionado"; const u=new SpeechSynthesisUtterance(msg); u.lang="es-PE"; window.speechSynthesis.speak(u); }}>{b.i}<span>{b.l}</span></button>))}
      </div>
    </>
  );
  if (bp==="mobile") return (
    <div style={{ flex:1,display:"flex",flexDirection:"column",padding:"24px",gap:14,overflowY:"auto" }}>
      <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
      <div style={{ fontSize:20,fontWeight:"700",color:C.textPrimary }}>Iniciar sesión</div>
      {fields}
      <div style={{ fontSize:"13px",color:C.textMuted }}>¿Deseas ingresar? Diga Sí o No</div>
      <div style={{ display:"flex",gap:10 }}>
        <button style={{ flex:1,padding:"16px",borderRadius:"12px",background:"rgba(16,185,129,0.1)",border:`1.5px solid ${C.green}`,color:C.green,fontSize:"16px",fontWeight:"600",cursor:"pointer" }} onClick={()=>setOk(true)}>✓ Sí</button>
        <button style={{ flex:1,padding:"16px",borderRadius:"12px",background:"rgba(100,116,139,0.1)",border:`1.5px solid #334155`,color:C.textMuted,fontSize:"16px",cursor:"pointer" }} onClick={onBack}>✕ No</button>
      </div>
    </div>
  );
  return (
    <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"32px" }}>
      <div style={{ width:"100%",maxWidth:bp==="desktop"?800:500,display:bp==="desktop"?"grid":"flex",gridTemplateColumns:"1fr 1fr",flexDirection:"column",gap:bp==="desktop"?32:20 }}>
        <div style={{ background:C.surface,borderRadius:"24px",border:`1.5px solid ${C.border}`,padding:"36px",display:"flex",flexDirection:"column",gap:16 }}>
          <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
          <div style={{ fontSize:bp==="desktop"?26:22,fontWeight:"700",color:C.textPrimary }}>Iniciar sesión</div>
          {fields}
        </div>
        <div style={{ background:C.surface,borderRadius:"24px",border:`1.5px solid ${C.blue}33`,padding:"36px",display:"flex",flexDirection:"column",gap:16 }}>
          <div style={{ fontSize:13,color:C.blue,fontWeight:"600" }}>🔊 Confirmación por voz</div>
          <div style={{ ...S.card,background:"rgba(14,165,233,0.06)",border:`1.5px solid ${C.blue}33` }}><div style={{ fontSize:13,color:C.textMuted }}>¿Deseas ingresar? Di <strong style={{ color:C.textPrimary }}>Sí</strong> o <strong style={{ color:C.textPrimary }}>No</strong></div></div>
          <div style={{ display:"flex",gap:10 }}>
            <button style={{ flex:1,padding:"16px",borderRadius:"12px",background:"rgba(16,185,129,0.1)",border:`1.5px solid ${C.green}`,color:C.green,fontSize:"16px",fontWeight:"600",cursor:"pointer" }} onClick={()=>setOk(true)}>✓ Sí</button>
            <button style={{ flex:1,padding:"16px",borderRadius:"12px",background:"rgba(100,116,139,0.1)",border:`1.5px solid #334155`,color:C.textMuted,fontSize:"16px",cursor:"pointer" }} onClick={onBack}>✕ No</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Register({ onBack, bp }) {
  const [f,setF] = useState({ name:"",email:"",pass:"" });
  const [done,setDone] = useState(false);
  const ok = f.name&&f.email&&f.pass.length>=8;
  if (done) return <Success title="Cuenta creada" sub="Registro exitoso" label="Ir al inicio →" onContinue={onBack}/>;
  return (
    <div style={{ flex:1,display:"flex",alignItems:bp==="mobile"?"stretch":"center",justifyContent:"center",padding:bp==="mobile"?"24px":"32px" }}>
      <div style={{ width:"100%",maxWidth:bp==="mobile"?"100%":560,background:bp==="mobile"?"transparent":C.surface,borderRadius:bp==="mobile"?0:"24px",border:bp==="mobile"?"none":`1.5px solid ${C.border}`,padding:bp==="mobile"?0:"36px",display:"flex",flexDirection:"column",gap:16 }}>
        <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
        <div style={{ fontSize:bp==="mobile"?20:24,fontWeight:"700",color:C.textPrimary }}>Crear cuenta</div>
        <div style={{ display:"grid",gridTemplateColumns:bp==="mobile"?"1fr":"1fr 1fr",gap:12 }}>
          {[["👤 Nombre","text","Tu nombre completo","name"],["📧 Correo","email","tu@correo.com","email"],["🔒 Contraseña","password","Mínimo 8 caracteres","pass"]].map(([lbl,type,ph,key])=>(
            <div key={key} style={{ gridColumn:key==="pass"&&bp!=="mobile"?"span 2":"auto" }}>
              <div style={S.label}>{lbl}</div>
              <input style={S.input} type={type} placeholder={ph} value={f[key]} onChange={e=>setF({...f,[key]:e.target.value})}/>
            </div>
          ))}
        </div>
        <button style={{ ...mkBtn(),opacity:ok?1:0.4,padding:"16px",fontSize:15 }} disabled={!ok} onClick={()=>setDone(true)}>Crear cuenta</button>
      </div>
    </div>
  );
}

function Dashboard({ onNavigate, onLogout, bp }) {
  const [showLogout,setShowLogout] = useState(false);
  const menu = [
    { key:"reading",    icon:<BookOpen size={24}/>,      label:"Lectura Accesible",  desc:"Texto a voz con control de velocidad",  color:C.blue   },
    { key:"voice2text", icon:<FileText size={24}/>,      label:"Voz a Texto",        desc:"Habla y convierte a texto automático",   color:C.purple },
    { key:"scanner",    icon:<ScanText size={24}/>,      label:"Escanear Texto",     desc:"Lee textos con la cámara (OCR)",         color:C.teal   },
    { key:"objects",    icon:<Search size={24}/>,        label:"Reconocer Objetos",  desc:"Identifica objetos en tiempo real",      color:C.green  },
    { key:"multimedia", icon:<Video size={24}/>,         label:"Multimedia",         desc:"Video de YouTube con subtítulos",        color:C.orange },
    { key:"access",     icon:<Accessibility size={24}/>, label:"Accesibilidad",      desc:"Contraste, letra y modo simplificado",   color:C.amber  },
    { key:"help",       icon:<HelpCircle size={24}/>,    label:"Ayuda",              desc:"Guía rápida e indicaciones por voz",     color:C.pink   },
  ];

  if (bp==="mobile") return (
    <div style={{ flex:1,display:"flex",flexDirection:"column",padding:"20px",gap:12,overflowY:"auto" }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4 }}>
        <div><div style={{ fontSize:20,fontWeight:"700",color:C.textPrimary }}>Hola 👋</div><div style={{ fontSize:12,color:C.textMuted }}>¿Qué necesitas hoy?</div></div>
        <div style={{ width:44,height:44,borderRadius:"14px",background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center" }}><Eye size={20} color="#fff"/></div>
      </div>
      {menu.map(m=>(
        <button key={m.key} style={{ width:"100%",padding:"16px",borderRadius:"16px",background:C.surface,border:`1.5px solid ${m.color}20`,display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left" }} onClick={()=>onNavigate(m.key)}>
          <div style={mkIcon(m.color,48)}>{m.icon}</div>
          <div style={{ flex:1 }}><div style={{ fontSize:14,fontWeight:"600",color:C.textPrimary }}>{m.label}</div><div style={{ fontSize:11,color:C.textMuted,marginTop:2 }}>{m.desc}</div></div>
          <ChevronRight size={16} color="#334155"/>
        </button>
      ))}
      <button style={{ background:"none",border:"none",color:C.red,fontSize:"13px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,marginTop:4 }} onClick={()=>setShowLogout(true)}><LogOut size={13}/> Cerrar sesión</button>
      {showLogout&&<div style={S.modal}><div style={S.modalBox}>
        <div style={{ width:60,height:60,borderRadius:"50%",background:"rgba(239,68,68,0.1)",border:`2px solid ${C.red}`,display:"flex",alignItems:"center",justifyContent:"center" }}><X size={26} color={C.red}/></div>
        <div style={{ fontSize:18,fontWeight:"700",color:C.textPrimary }}>¿Cerrar sesión?</div>
        <button style={mkBtn(`linear-gradient(135deg,${C.red},#dc2626)`)} onClick={onLogout}>Sí, salir</button>
        <button style={mkBtnOut()} onClick={()=>setShowLogout(false)}>Cancelar</button>
      </div></div>}
    </div>
  );

  if (bp==="tablet") return (
    <div style={{ flex:1,display:"flex",flexDirection:"column",padding:"24px",gap:16,overflowY:"auto" }}>
      <div style={{ display:"flex",alignItems:"center",gap:16,padding:"20px",background:C.surface,borderRadius:"18px",border:`1.5px solid ${C.border}` }}>
        <div style={{ width:54,height:54,borderRadius:"16px",background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center" }}><Eye size={26} color="#fff"/></div>
        <div><div style={{ fontSize:22,fontWeight:"700",color:C.textPrimary }}>Panel principal</div><div style={{ fontSize:13,color:C.textMuted }}>Selecciona un módulo para comenzar</div></div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
        {menu.map(m=>(
          <button key={m.key} onClick={()=>onNavigate(m.key)}
            style={{ padding:"22px 18px",borderRadius:"18px",background:C.surface,border:`1.5px solid ${m.color}30`,display:"flex",flexDirection:"column",alignItems:"flex-start",gap:12,cursor:"pointer",textAlign:"left" }}>
            <div style={mkIcon(m.color,50)}>{m.icon}</div>
            <div><div style={{ fontSize:14,fontWeight:"600",color:C.textPrimary }}>{m.label}</div><div style={{ fontSize:11,color:C.textMuted,marginTop:3 }}>{m.desc}</div></div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ flex:1,display:"flex",padding:"32px 40px",gap:28,overflowY:"auto",maxWidth:1200,width:"100%" }}>
      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:20 }}>
        <div><div style={{ fontSize:30,fontWeight:"800",color:C.textPrimary }}>Panel principal</div><div style={{ fontSize:14,color:C.textMuted,marginTop:4 }}>Selecciona un módulo para comenzar</div></div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16 }}>
          {menu.map(m=>(
            <button key={m.key} onClick={()=>onNavigate(m.key)}
              style={{ padding:"26px 22px",borderRadius:"20px",background:C.surface,border:`1.5px solid ${m.color}30`,display:"flex",flexDirection:"column",alignItems:"flex-start",gap:14,cursor:"pointer",textAlign:"left" }}>
              <div style={mkIcon(m.color,54)}>{m.icon}</div>
              <div><div style={{ fontSize:15,fontWeight:"600",color:C.textPrimary }}>{m.label}</div><div style={{ fontSize:12,color:C.textMuted,marginTop:4,lineHeight:1.5 }}>{m.desc}</div></div>
              <div style={{ display:"flex",alignItems:"center",gap:4,color:m.color,fontSize:12,fontWeight:"600" }}>Abrir <ChevronRight size={13}/></div>
            </button>
          ))}
        </div>
      </div>
      <div style={{ width:240,display:"flex",flexDirection:"column",gap:14,flexShrink:0 }}>
        <div style={{ background:C.surface,borderRadius:"18px",border:`1.5px solid ${C.border}`,padding:"20px" }}>
          <div style={{ fontSize:11,color:C.textMuted,fontWeight:"600",letterSpacing:1,marginBottom:12 }}>ACCESOS RÁPIDOS</div>
          {[["🎙️","Activar voz","voice2text"],["📖","Leer texto","reading"],["⚙️","Accesibilidad","access"],["❓","Ayuda","help"]].map(([ic,lbl,key])=>(
            <button key={key} onClick={()=>onNavigate(key)} style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:"12px",background:C.bg,border:`1px solid ${C.border}`,color:C.textSub,fontSize:13,cursor:"pointer",width:"100%",textAlign:"left",marginBottom:6 }}>
              <span style={{ fontSize:16 }}>{ic}</span>{lbl}
            </button>
          ))}
        </div>
        <div style={{ background:"rgba(14,165,233,0.06)",borderRadius:"18px",border:`1.5px solid ${C.blue}33`,padding:"20px" }}>
          <div style={{ fontSize:11,color:C.blue,fontWeight:"600",marginBottom:10 }}>🔊 COMANDOS DE VOZ</div>
          {["Abrir lectura","Activar micrófono","Ir a ayuda","Cambiar contraste"].map(c=><div key={c} style={{ fontSize:11,color:C.textMuted,padding:"5px 0",borderBottom:`1px solid ${C.border}` }}>"{c}"</div>)}
        </div>
      </div>
    </div>
  );
}

function Reading({ onBack, bp }) {
  const [text,setText]     = useState("");
  const [speed,setSpeed]   = useState(1);
  const [reading,setReading] = useState(false);
  const [paused,setPaused]  = useState(false);
  const uttRef = useRef(null);

  const speak = () => {
    if (!text.trim()) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang="es-PE"; u.rate=speed;
    u.onend=()=>{ setReading(false);setPaused(false); };
    uttRef.current=u;
    window.speechSynthesis.speak(u);
    setReading(true); setPaused(false);
  };
  const pause  = () => { window.speechSynthesis.pause();  setPaused(true); };
  const resume = () => { window.speechSynthesis.resume(); setPaused(false); };
  const stop   = () => { window.speechSynthesis.cancel(); setReading(false);setPaused(false); };
  const speedLabels = { 0.5:"Muy lenta",0.75:"Lenta",1:"Normal",1.25:"Rápida",1.5:"Muy rápida" };
  const isWide = bp!=="mobile";

  const controls = (
    <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
      <div style={{ ...S.card,display:"flex",flexDirection:"column",gap:10 }}>
        <div style={{ fontSize:12,color:C.textMuted,fontWeight:"600" }}>VELOCIDAD DE LECTURA</div>
        <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
          {[0.5,0.75,1,1.25,1.5].map(v=>(
            <button key={v} onClick={()=>setSpeed(v)} style={{ flex:1,minWidth:60,padding:"10px 6px",borderRadius:"10px",background:speed===v?C.blue:C.surface,border:`1.5px solid ${speed===v?C.blue:C.border}`,color:speed===v?"#fff":C.textMuted,fontSize:11,cursor:"pointer",fontWeight:speed===v?"700":"400" }}>
              {speedLabels[v]}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display:"flex",gap:10 }}>
        {!reading
          ? <button style={mkBtn()} onClick={speak} disabled={!text.trim()}><div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><Volume2 size={16}/> Leer texto</div></button>
          : <>
              {!paused
                ? <button style={mkBtn(`linear-gradient(135deg,${C.amber},#d97706)`)} onClick={pause}><div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><Pause size={16}/> Pausar</div></button>
                : <button style={mkBtn(`linear-gradient(135deg,${C.green},#059669)`)} onClick={resume}><div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><Play size={16}/> Reanudar</div></button>
              }
              <button style={{ ...mkBtnOut(),width:"auto",padding:"15px 20px" }} onClick={stop}><Square size={15}/></button>
            </>
        }
      </div>
      {reading&&<div style={{ background:"rgba(14,165,233,0.08)",border:`1px solid ${C.blue}33`,borderRadius:"12px",padding:"12px 16px",display:"flex",alignItems:"center",gap:10 }}><div style={{ width:8,height:8,borderRadius:"50%",background:paused?C.amber:C.blue }}/><span style={{ fontSize:12,color:C.blue }}>{paused?"Lectura pausada...":"Leyendo en voz alta..."}</span></div>}
    </div>
  );

  return (
    <div style={{ flex:1,display:"flex",padding:isWide?(bp==="desktop"?"32px 40px":"28px 24px"):"24px",gap:isWide?28:0,flexDirection:isWide?"row":"column",overflowY:"auto",maxWidth:bp==="desktop"?1000:undefined,width:"100%" }}>
      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:14 }}>
        <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
        <div style={{ fontSize:isWide?26:20,fontWeight:"700",color:C.textPrimary }}>Lectura Accesible</div>
        <div style={{ fontSize:12,color:C.textMuted }}>Ingresa o pega el texto que deseas escuchar</div>
        <textarea style={S.textarea} placeholder="Escribe o pega el texto aquí..." value={text} onChange={e=>setText(e.target.value)}/>
        <div style={{ display:"flex",gap:8 }}>
          <button style={{ ...mkBtnOut(),width:"auto",padding:"10px 16px",fontSize:12 }} onClick={()=>setText("")}><X size={13}/> Limpiar</button>
          <button style={{ ...mkBtnOut(),width:"auto",padding:"10px 16px",fontSize:12 }} onClick={()=>setText("El sistema VisionAI permite a personas con discapacidad visual interactuar con contenido digital de forma independiente y eficiente.")}>Texto de ejemplo</button>
        </div>
      </div>
      <div style={{ width:isWide?320:undefined,flexShrink:0,display:"flex",flexDirection:"column",gap:14,paddingTop:isWide?54:0 }}>
        {controls}
        <div style={{ ...S.card,background:"rgba(14,165,233,0.06)",border:`1px solid ${C.blue}33` }}>
          <div style={{ fontSize:11,color:C.blue,fontWeight:"600",marginBottom:8 }}>💡 CONSEJOS</div>
          {["Usa velocidad Lenta para mejor comprensión","Pausa cuando necesites releer algo","El texto se lee en español automáticamente"].map((t,i)=><div key={i} style={{ fontSize:11,color:C.textMuted,marginBottom:5,paddingLeft:8,borderLeft:`2px solid ${C.blue}44` }}>{t}</div>)}
        </div>
      </div>
    </div>
  );
}

function Voice2Text({ onBack, bp }) {
  const [listening,setListening] = useState(false);
  const [transcript,setTranscript] = useState("");
  const [confirmed,setConfirmed]   = useState(false);
  const recRef = useRef(null);
  const isWide = bp!=="mobile";

  const startListen = () => {
    const SR = window.SpeechRecognition||window.webkitSpeechRecognition;
    if (!SR) { setTranscript("(Simulado) Hola, esto es una prueba de reconocimiento de voz en VisionAI."); return; }
    const rec = new SR(); recRef.current=rec;
    rec.lang="es-PE"; rec.interimResults=true; rec.continuous=true;
    rec.onstart=()=>setListening(true);
    rec.onresult=(e)=>{ let t=""; for(let i=0;i<e.results.length;i++) t+=e.results[i][0].transcript; setTranscript(t); };
    rec.onerror=()=>setListening(false);
    rec.onend=()=>setListening(false);
    rec.start(); setListening(true); setConfirmed(false);
  };
  const stopListen = () => { recRef.current?.stop(); setListening(false); };
  const confirm = () => { setConfirmed(true); const u=new SpeechSynthesisUtterance("Texto guardado correctamente"); u.lang="es-PE"; window.speechSynthesis.speak(u); };

  return (
    <div style={{ flex:1,display:"flex",padding:isWide?(bp==="desktop"?"32px 40px":"28px 24px"):"24px",gap:isWide?28:0,flexDirection:isWide?"row":"column",overflowY:"auto",maxWidth:bp==="desktop"?1000:undefined,width:"100%" }}>
      <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:16,flexShrink:0 }}>
        <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
        <div style={{ width:isWide?160:130,height:isWide?160:130,borderRadius:"50%",background:listening?"rgba(124,58,237,0.2)":"rgba(14,165,233,0.1)",border:`3px solid ${listening?C.purple:C.blue}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.3s",boxShadow:listening?`0 0 40px rgba(124,58,237,0.3)`:"none" }} onClick={listening?stopListen:startListen}>
          {listening?<MicOff size={isWide?52:44} color={C.purple}/>:<Mic size={isWide?52:44} color={C.blue}/>}
        </div>
        <div style={{ fontSize:14,color:listening?C.purple:C.textMuted,fontWeight:listening?"600":"400",textAlign:"center" }}>{listening?"🔴 Escuchando...":"Toca el micrófono"}</div>
      </div>
      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:14 }}>
        <div style={{ fontSize:isWide?26:20,fontWeight:"700",color:C.textPrimary }}>Voz a Texto</div>
        <div style={{ ...S.card,minHeight:140,display:"flex",flexDirection:"column",gap:8 }}>
          <div style={{ fontSize:11,color:C.textMuted,fontWeight:"600" }}>TEXTO RECONOCIDO</div>
          {transcript ? <p style={{ fontSize:15,color:C.textPrimary,lineHeight:1.7,margin:0 }}>{transcript}</p> : <p style={{ fontSize:13,color:C.textMuted,fontStyle:"italic",margin:0 }}>El texto aparecerá aquí mientras hablas...</p>}
        </div>
        {transcript&&(
          <div style={{ display:"flex",gap:10 }}>
            <button style={mkBtn(`linear-gradient(135deg,${C.green},#059669)`)} onClick={confirm}><div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><Check size={15}/> Confirmar texto</div></button>
            <button style={{ ...mkBtnOut(),width:"auto",padding:"15px 18px" }} onClick={()=>{ setTranscript("");setConfirmed(false); }}><RotateCcw size={15}/></button>
          </div>
        )}
        {confirmed&&<div style={{ background:"rgba(16,185,129,0.1)",border:`1px solid ${C.green}44`,borderRadius:"12px",padding:"14px 16px",display:"flex",alignItems:"center",gap:10 }}><Check size={16} color={C.green}/><span style={{ fontSize:13,color:C.green,fontWeight:"600" }}>✅ Texto guardado correctamente</span></div>}
        <div style={{ ...S.card,background:"rgba(124,58,237,0.06)",border:`1px solid ${C.purple}33` }}>
          <div style={{ fontSize:11,color:C.purple,fontWeight:"600",marginBottom:8 }}>💡 CÓMO USAR</div>
          {["Toca el micrófono y habla claramente","Habla a velocidad normal","Toca de nuevo para detener","Confirma cuando el texto sea correcto"].map((t,i)=><div key={i} style={{ fontSize:11,color:C.textMuted,marginBottom:5,paddingLeft:8,borderLeft:`2px solid ${C.purple}44` }}>{t}</div>)}
        </div>
      </div>
    </div>
  );
}

function Scanner({ onBack, bp }) {
  const [stage,setStage]   = useState("idle");
  const [fontSize,setFontSize] = useState(15);
  const [reading,setReading]   = useState(false);
  const [text,setText]     = useState("");
  const [progress,setProgress] = useState(0);
  const videoRef  = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const isWide = bp!=="mobile";

  const startCamera = async () => {
    try { const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}); streamRef.current=s; if(videoRef.current){videoRef.current.srcObject=s;videoRef.current.play();} setStage("camera"); }
    catch { alert("No se pudo acceder a la cámara."); }
  };
  const stopCamera = () => { streamRef.current?.getTracks().forEach(t=>t.stop()); streamRef.current=null; };
  const capture = async () => {
    const v=videoRef.current,c=canvasRef.current; c.width=v.videoWidth;c.height=v.videoHeight; c.getContext("2d").drawImage(v,0,0); stopCamera(); setStage("scanning"); setProgress(0);
    try { const {createWorker}=await import("tesseract.js"); const w=await createWorker("spa",1,{logger:m=>{if(m.status==="recognizing text")setProgress(Math.round(m.progress*100));}}); const {data:{text:r}}=await w.recognize(c); await w.terminate(); setText(r.trim()||"No se detectó texto."); }
    catch { setText("Error al procesar."); } setStage("result");
  };
  const speak = (t) => { window.speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(t); u.lang="es-PE"; u.onend=()=>setReading(false); window.speechSynthesis.speak(u); setReading(true); };

  const camBox = (h) => (
    <div style={{ height:h,borderRadius:"16px",background:"#0d1525",border:`2px solid ${stage==="camera"?C.blue:C.border}`,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",position:"relative" }}>
      <video ref={videoRef} style={{ width:"100%",height:"100%",objectFit:"cover",display:stage==="camera"?"block":"none" }} playsInline muted/>
      <canvas ref={canvasRef} style={{ display:"none" }}/>
      {stage==="idle"&&<div style={{ textAlign:"center",color:C.textMuted }}><Camera size={32} style={{ margin:"0 auto 8px" }}/><div style={{ fontSize:12 }}>Presiona Activar Cámara</div></div>}
      {stage==="scanning"&&<div style={{ textAlign:"center",color:C.blue }}><div style={{ fontSize:28,marginBottom:8 }}>🔍</div><div style={{ fontSize:13,fontWeight:"600" }}>Leyendo... {progress}%</div><div style={{ width:120,height:4,background:"#1e3a5f",borderRadius:2,margin:"8px auto 0" }}><div style={{ width:`${progress}%`,height:"100%",background:C.blue,borderRadius:2,transition:"width 0.3s" }}/></div></div>}
      {stage==="result"&&<div style={{ textAlign:"center",color:C.green }}><div style={{ fontSize:24 }}>✓</div><div style={{ fontSize:12 }}>Texto detectado</div></div>}
    </div>
  );
  const camBtns = (
    <div style={{ display:"flex",gap:10,marginTop:10 }}>
      {stage==="idle"&&<button style={mkBtn()} onClick={startCamera}><div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><Camera size={15}/> Activar cámara</div></button>}
      {stage==="camera"&&<><button style={mkBtn(`linear-gradient(135deg,${C.green},#059669)`)} onClick={capture}><div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><ScanText size={15}/> Escanear</div></button><button style={{ ...mkBtnOut(),width:"auto",padding:"15px 18px" }} onClick={()=>{stopCamera();setStage("idle");}}><X size={15}/></button></>}
      {stage==="result"&&<button style={mkBtnOut()} onClick={()=>{setText("");setStage("idle");}}><div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><RotateCcw size={14}/> Nuevo</div></button>}
    </div>
  );

  return (
    <div style={{ flex:1,display:"flex",padding:isWide?(bp==="desktop"?"32px 40px":"28px 24px"):"24px",gap:isWide?24:0,flexDirection:isWide?"row":"column",overflowY:"auto",maxWidth:bp==="desktop"?1000:undefined,width:"100%" }}>
      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:14 }}>
        <button style={S.back} onClick={()=>{stopCamera();onBack();}}><ArrowLeft size={15}/> Volver</button>
        <div style={{ fontSize:isWide?26:20,fontWeight:"700",color:C.textPrimary }}>Escanear Texto</div>
        {camBox(isWide?260:180)}{camBtns}
      </div>
      {stage==="result"&&text&&(
        <div style={{ flex:1,display:"flex",flexDirection:"column",gap:14,paddingTop:isWide?54:0 }}>
          <div style={S.card}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
              <span style={{ fontSize:11,color:C.textMuted }}>Texto detectado:</span>
              <div style={{ display:"flex",gap:6 }}>
                <button style={{ background:C.surface,border:`1px solid ${C.border}`,color:C.textMuted,borderRadius:"8px",padding:"4px 8px",cursor:"pointer" }} onClick={()=>setFontSize(f=>Math.max(11,f-1))}><ZoomOut size={12}/></button>
                <button style={{ background:C.surface,border:`1px solid ${C.border}`,color:C.textMuted,borderRadius:"8px",padding:"4px 8px",cursor:"pointer" }} onClick={()=>setFontSize(f=>Math.min(22,f+1))}><ZoomIn size={12}/></button>
              </div>
            </div>
            <p style={{ fontSize:fontSize,color:C.textPrimary,lineHeight:1.7,margin:0,whiteSpace:"pre-line" }}>{text}</p>
          </div>
          <button style={{ ...mkBtn(reading?`rgba(14,165,233,0.15)`:`linear-gradient(135deg,${C.blue},#0369a1)`),border:reading?`1.5px solid ${C.blue}`:"none",color:reading?C.blue:"#fff" }} onClick={()=>{if(reading){window.speechSynthesis.cancel();setReading(false);}else speak(text);}}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>{reading?<><VolumeX size={16}/> Detener</>:<><Volume2 size={16}/> Escuchar</>}</div>
          </button>
        </div>
      )}
    </div>
  );
}

function Objects({ onBack, bp }) {
  const [detecting,setDetecting] = useState(false);
  const [result,setResult]       = useState(null);
  const isWide = bp!=="mobile";
  const objects = [{label:"Silla de ruedas",conf:97,color:C.green},{label:"Señal de salida",conf:94,color:C.blue},{label:"Persona",conf:89,color:C.purple}];
  const detect = () => { setDetecting(true);setResult(null);setTimeout(()=>{setDetecting(false);setResult(objects);},2500); };
  const camBox = (h) => (
    <div style={{ height:h,borderRadius:"16px",background:"#0d1525",border:`2px dashed ${detecting?C.purple:C.border}`,display:"flex",alignItems:"center",justifyContent:"center" }}>
      {!detecting&&!result&&<div style={{ textAlign:"center",color:C.textMuted }}><Camera size={32} style={{ margin:"0 auto 8px" }}/><div style={{ fontSize:12 }}>Vista de cámara</div></div>}
      {detecting&&<div style={{ textAlign:"center",color:C.purple }}><div style={{ fontSize:28,marginBottom:8 }}>🔍</div><div style={{ fontSize:12 }}>Analizando...</div></div>}
      {result&&<div style={{ textAlign:"center",color:C.green }}><div style={{ fontSize:24 }}>✓</div><div style={{ fontSize:11 }}>{result.length} objetos</div></div>}
    </div>
  );
  return (
    <div style={{ flex:1,display:"flex",padding:isWide?(bp==="desktop"?"32px 40px":"28px 24px"):"24px",gap:isWide?24:0,flexDirection:isWide?"row":"column",overflowY:"auto",maxWidth:bp==="desktop"?1000:undefined,width:"100%" }}>
      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:14 }}>
        <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
        <div style={{ fontSize:isWide?26:20,fontWeight:"700",color:C.textPrimary }}>Reconocer Objetos</div>
        {camBox(isWide?260:170)}
        <button style={mkBtn(`linear-gradient(135deg,${C.green},#059669)`)} onClick={detect} disabled={detecting}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>{detecting?<><Square size={14}/> Analizando...</>:<><Play size={14}/> Detectar objetos</>}</div>
        </button>
      </div>
      {result&&(
        <div style={{ flex:1,display:"flex",flexDirection:"column",gap:10,paddingTop:isWide?54:0 }}>
          <div style={{ fontSize:12,color:C.textMuted }}>Objetos identificados:</div>
          {result.map((o,i)=><div key={i} style={{ ...S.card,display:"flex",alignItems:"center",gap:12 }}><div style={{ width:10,height:10,borderRadius:"50%",background:o.color,flexShrink:0 }}/><span style={{ flex:1,fontSize:14,color:C.textPrimary }}>{o.label}</span><span style={{ fontSize:13,color:o.color,fontWeight:"600" }}>{o.conf}%</span></div>)}
          <button style={mkBtn(`linear-gradient(135deg,${C.blue},#0369a1)`)} onClick={()=>{const u=new SpeechSynthesisUtterance("Se detectaron: "+result.map(o=>o.label).join(", "));u.lang="es-PE";window.speechSynthesis.speak(u);}}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><Volume2 size={15}/> Leer resultados</div>
          </button>
        </div>
      )}
    </div>
  );
}

// ── MULTIMEDIA CON YOUTUBE ──
function Multimedia({ onBack, bp }) {
  const [showSub,setShowSub] = useState(true);
  const isWide = bp!=="mobile";
  const description = "Este video muestra contenido accesible. VisionAI proporciona subtítulos automáticos y descripción de audio para todo el contenido multimedia.";

  return (
    <div style={{ flex:1,display:"flex",padding:isWide?(bp==="desktop"?"32px 40px":"28px 24px"):"24px",gap:isWide?28:0,flexDirection:isWide?"row":"column",overflowY:"auto",maxWidth:bp==="desktop"?1000:undefined,width:"100%" }}>
      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:14 }}>
        <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
        <div style={{ fontSize:isWide?26:20,fontWeight:"700",color:C.textPrimary }}>Multimedia Accesible</div>
        <div style={{ fontSize:12,color:C.textMuted }}>Video con subtítulos y descripción de audio</div>

        {/* ── VIDEO DE YOUTUBE ── */}
        <div style={{ borderRadius:"16px",overflow:"hidden",border:`2px solid ${C.border}`,background:"#000" }}>
          <div style={{ position:"relative",paddingBottom:"56.25%",height:0,overflow:"hidden" }}>
            <iframe
              src="https://www.youtube.com/embed/QpJGi27KIhs?rel=0&modestbranding=1&cc_load_policy=1"
              title="Video accesible VisionAI"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none" }}
            />
          </div>
          {/* Subtítulos */}
          {showSub&&(
            <div style={{ background:"rgba(0,0,0,0.9)",padding:"12px 16px",borderTop:`1px solid ${C.border}` }}>
              <div style={{ fontSize:11,color:C.amber,marginBottom:4,fontWeight:"600" }}>SUBTÍTULOS ACTIVOS</div>
              <div style={{ fontSize:13,color:"#fff",lineHeight:1.5 }}>Activa los subtítulos del video con el ícono CC en el reproductor de YouTube.</div>
            </div>
          )}
        </div>

        {/* Descripción de audio */}
        <div style={{ ...S.card,background:"rgba(249,115,22,0.06)",border:`1px solid ${C.orange}33` }}>
          <div style={{ fontSize:11,color:C.orange,fontWeight:"600",marginBottom:8 }}>🔊 DESCRIPCIÓN DE AUDIO</div>
          <div style={{ fontSize:13,color:C.textSub,lineHeight:1.6 }}>{description}</div>
          <button style={{ ...mkBtn(`linear-gradient(135deg,${C.orange},#ea580c)`),marginTop:12 }} onClick={()=>{const u=new SpeechSynthesisUtterance(description);u.lang="es-PE";window.speechSynthesis.speak(u);}}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><Volume2 size={15}/> Escuchar descripción</div>
          </button>
        </div>
      </div>

      {/* Panel derecho */}
      <div style={{ width:isWide?260:undefined,flexShrink:0,display:"flex",flexDirection:"column",gap:14,paddingTop:isWide?54:0 }}>
        <div style={S.card}>
          <div style={{ fontSize:12,color:C.textMuted,fontWeight:"600",marginBottom:12 }}>OPCIONES DE ACCESIBILIDAD</div>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:12 }}>
            <div style={{ flex:1 }}><div style={{ fontSize:13,color:C.textPrimary,fontWeight:"600" }}>Mostrar subtítulos</div><div style={{ fontSize:11,color:C.textMuted }}>Panel debajo del video</div></div>
            <button onClick={()=>setShowSub(!showSub)} style={{ width:40,height:22,borderRadius:11,background:showSub?C.amber:"#334155",border:"none",cursor:"pointer",position:"relative",transition:"background 0.2s" }}>
              <div style={{ width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:showSub?21:3,transition:"left 0.2s" }}/>
            </button>
          </div>
        </div>

        <div style={{ ...S.card,background:"rgba(14,165,233,0.06)",border:`1px solid ${C.blue}33` }}>
          <div style={{ fontSize:11,color:C.blue,fontWeight:"600",marginBottom:10 }}>💡 CONSEJOS</div>
          {[
            "Toca CC en el video para subtítulos",
            "Usa pantalla completa para mejor visión",
            "Ajusta velocidad en el reproductor",
            "El botón ⚙️ permite configurar calidad"
          ].map((t,i)=><div key={i} style={{ fontSize:11,color:C.textMuted,marginBottom:6,paddingLeft:8,borderLeft:`2px solid ${C.blue}44` }}>{t}</div>)}
        </div>

        <button style={mkBtn(`linear-gradient(135deg,${C.purple},#6d28d9)`)} onClick={()=>{const u=new SpeechSynthesisUtterance("Video cargado. Puedes reproducirlo, pausarlo y activar subtítulos con el botón CC.");u.lang="es-PE";window.speechSynthesis.speak(u);}}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><Volume2 size={15}/> Instrucciones de uso</div>
        </button>
      </div>
    </div>
  );
}

function AccessModule({ onBack, settings, setSettings, bp }) {
  const toggle = (key) => setSettings(s=>({...s,[key]:!s[key]}));
  const isWide = bp!=="mobile";

  const Toggle = ({ label, desc, skey, color=C.blue, icon }) => (
    <div style={{ ...S.card,display:"flex",alignItems:"center",gap:12 }}>
      <div style={mkIcon(color,42)}>{icon}</div>
      <div style={{ flex:1 }}><div style={{ fontSize:14,fontWeight:"600",color:C.textPrimary }}>{label}</div><div style={{ fontSize:11,color:C.textMuted,marginTop:2 }}>{desc}</div></div>
      <button onClick={()=>toggle(skey)} style={{ width:48,height:26,borderRadius:13,background:settings[skey]?color:"#334155",border:"none",cursor:"pointer",position:"relative",transition:"background 0.2s",flexShrink:0 }}>
        <div style={{ width:20,height:20,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:settings[skey]?25:3,transition:"left 0.2s" }}/>
      </button>
    </div>
  );

  return (
    <div style={{ flex:1,display:"flex",padding:isWide?(bp==="desktop"?"32px 40px":"28px 24px"):"24px",gap:isWide?28:0,flexDirection:isWide?"row":"column",overflowY:"auto",maxWidth:bp==="desktop"?1000:undefined,width:"100%" }}>
      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:14 }}>
        <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
        <div style={{ fontSize:isWide?26:20,fontWeight:"700",color:C.textPrimary }}>Accesibilidad</div>
        <div style={{ fontSize:12,color:C.textMuted }}>Personaliza la app para tus necesidades</div>
        <div style={S.card}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
            <div><div style={{ fontSize:14,fontWeight:"600",color:C.textPrimary }}>Tamaño de letra</div><div style={{ fontSize:11,color:C.textMuted }}>Ajusta para mejor lectura</div></div>
            <span style={{ fontSize:14,fontWeight:"700",color:C.blue }}>{settings.fontSize}px</span>
          </div>
          <div style={{ display:"flex",gap:8 }}>
            {[12,15,18,22].map(sz=>(
              <button key={sz} onClick={()=>setSettings(s=>({...s,fontSize:sz}))} style={{ flex:1,padding:"12px 0",borderRadius:10,background:settings.fontSize===sz?C.blue:C.surface,border:`1.5px solid ${settings.fontSize===sz?C.blue:C.border}`,color:settings.fontSize===sz?"#fff":C.textMuted,fontSize:sz,cursor:"pointer",fontWeight:"700" }}>A</button>
            ))}
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:isWide?"1fr 1fr":"1fr",gap:10 }}>
          <Toggle label="Alto contraste"         desc="Mejora la visibilidad"          skey="highContrast" color={C.amber}  icon={<Sun size={18}/>}/>
          <Toggle label="Lectura automática"     desc="Lee el contenido al abrirlo"    skey="autoRead"     color={C.blue}   icon={<Volume2 size={18}/>}/>
          <Toggle label="Subtítulos automáticos" desc="Para videos y audio"            skey="subtitles"    color={C.green}  icon={<Subtitles size={18}/>}/>
          <Toggle label="Modo simplificado"      desc="Interfaz con menos opciones"    skey="simpleMode"   color={C.purple} icon={<Brain size={18}/>}/>
          <Toggle label="Navegación por voz"     desc="Comandos de voz globales"       skey="voiceNav"     color={C.red}    icon={<Mic size={18}/>}/>
          <Toggle label="Letras legibles"        desc="Fuente optimizada para lectura" skey="readableFont" color={C.teal}   icon={<BookOpen size={18}/>}/>
        </div>
      </div>
      {isWide&&(
        <div style={{ width:260,flexShrink:0,display:"flex",flexDirection:"column",gap:14,paddingTop:54 }}>
          <div style={{ ...S.card,background:"rgba(245,158,11,0.06)",border:`1px solid ${C.amber}33` }}>
            <div style={{ fontSize:11,color:C.amber,fontWeight:"600",marginBottom:10 }}>♿ COMPATIBILIDAD</div>
            {["Lector de pantalla (NVDA, JAWS)","Navegación por teclado","Zoom del sistema operativo","Modo oscuro del sistema"].map((t,i)=><div key={i} style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}><Check size={12} color={C.green}/><span style={{ fontSize:12,color:C.textSub }}>{t}</span></div>)}
          </div>
          <div style={S.card}>
            <div style={{ fontSize:11,color:C.textMuted,fontWeight:"600",marginBottom:10 }}>CONFIGURACIÓN ACTIVA</div>
            {Object.entries(settings).filter(([k,v])=>v===true).length===0
              ? <div style={{ fontSize:12,color:C.textMuted,fontStyle:"italic" }}>Sin opciones activas</div>
              : Object.entries(settings).filter(([k,v])=>v===true).map(([k])=><div key={k} style={{ fontSize:12,color:C.green,marginBottom:4 }}>✓ {k}</div>)
            }
          </div>
        </div>
      )}
    </div>
  );
}

function Help({ onBack, bp }) {
  const [activeSection, setActiveSection] = useState(null);
  const isWide = bp!=="mobile";
  const sections = [
    { id:"start",    icon:"🚀", title:"¿Cómo empezar?",      color:C.blue,   steps:["Inicia sesión con tu correo o biometría","En el panel principal elige un módulo","Usa botones grandes para navegar","Activa la voz en cualquier momento"] },
    { id:"reading",  icon:"📖", title:"Lectura Accesible",    color:C.green,  steps:["Ingresa o pega el texto en el campo","Ajusta la velocidad de lectura","Presiona Leer texto para escuchar","Usa Pausar y Reanudar cuando necesites"] },
    { id:"voice",    icon:"🎙️", title:"Voz a Texto",          color:C.purple, steps:["Toca el micrófono grande","Habla claramente en español","El texto aparece automáticamente","Toca Confirmar para guardar"] },
    { id:"scanner",  icon:"📷", title:"Escanear Texto",       color:C.teal,   steps:["Activa la cámara con el botón","Apunta al texto que deseas leer","Presiona Escanear ahora","El texto se lee automáticamente"] },
    { id:"media",    icon:"▶️", title:"Multimedia",           color:C.orange, steps:["Abre el módulo Multimedia","El video de YouTube carga automáticamente","Activa CC para subtítulos en el video","Toca Escuchar descripción para narración"] },
    { id:"access",   icon:"⚙️", title:"Accesibilidad",        color:C.amber,  steps:["Ve a Accesibilidad en el menú","Activa Alto contraste si lo necesitas","Ajusta el tamaño de letra","Activa el Modo simplificado si prefieres"] },
  ];
  const readSection = (s) => { const u=new SpeechSynthesisUtterance(s.title+". "+s.steps.join(". ")); u.lang="es-PE"; window.speechSynthesis.speak(u); };

  return (
    <div style={{ flex:1,display:"flex",padding:isWide?(bp==="desktop"?"32px 40px":"28px 24px"):"24px",gap:isWide?28:0,flexDirection:isWide?"row":"column",overflowY:"auto",maxWidth:bp==="desktop"?1100:undefined,width:"100%" }}>
      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:14 }}>
        <button style={S.back} onClick={onBack}><ArrowLeft size={15}/> Volver</button>
        <div style={{ fontSize:isWide?26:20,fontWeight:"700",color:C.textPrimary }}>Ayuda</div>
        <div style={{ fontSize:12,color:C.textMuted }}>Guía rápida · Toca una sección para ver los pasos</div>
        <div style={{ display:"grid",gridTemplateColumns:isWide?"1fr 1fr":"1fr",gap:10 }}>
          {sections.map(s=>(
            <div key={s.id}>
              <button onClick={()=>setActiveSection(activeSection===s.id?null:s.id)}
                style={{ width:"100%",padding:"16px",borderRadius:"14px",background:activeSection===s.id?`${s.color}12`:C.surface,border:`1.5px solid ${activeSection===s.id?s.color:C.border}`,display:"flex",alignItems:"center",gap:12,cursor:"pointer",textAlign:"left" }}>
                <div style={{ width:42,height:42,borderRadius:"12px",background:`${s.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>{s.icon}</div>
                <div style={{ flex:1 }}><div style={{ fontSize:14,fontWeight:"600",color:C.textPrimary }}>{s.title}</div><div style={{ fontSize:11,color:C.textMuted,marginTop:2 }}>{s.steps.length} pasos</div></div>
                <div style={{ fontSize:18,color:C.textMuted,transform:activeSection===s.id?"rotate(90deg)":"none",transition:"transform 0.2s" }}>›</div>
              </button>
              {activeSection===s.id&&(
                <div style={{ background:`${s.color}08`,border:`1px solid ${s.color}22`,borderRadius:"0 0 14px 14px",padding:"14px 16px",marginTop:-2 }}>
                  {s.steps.map((step,i)=>(
                    <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:10,marginBottom:10 }}>
                      <div style={{ width:22,height:22,borderRadius:"50%",background:`${s.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:s.color,flexShrink:0,fontWeight:"700",marginTop:1 }}>{i+1}</div>
                      <span style={{ fontSize:13,color:C.textSub,lineHeight:1.5 }}>{step}</span>
                    </div>
                  ))}
                  <button onClick={()=>readSection(s)} style={{ display:"flex",alignItems:"center",gap:6,background:`${s.color}15`,border:`1px solid ${s.color}44`,borderRadius:"8px",padding:"8px 12px",color:s.color,fontSize:11,fontWeight:"600",cursor:"pointer",marginTop:6 }}>
                    <Volume2 size={13}/> Escuchar esta guía
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {isWide&&(
        <div style={{ width:260,flexShrink:0,display:"flex",flexDirection:"column",gap:14,paddingTop:54 }}>
          <div style={{ ...S.card,background:"rgba(236,72,153,0.06)",border:`1px solid ${C.pink}33` }}>
            <div style={{ fontSize:11,color:C.pink,fontWeight:"600",marginBottom:10 }}>📞 SOPORTE</div>
            <div style={{ fontSize:12,color:C.textMuted,lineHeight:1.6,marginBottom:12 }}>¿Necesitas más ayuda? Di "Ayuda" en cualquier pantalla.</div>
            <button style={mkBtn(`linear-gradient(135deg,${C.pink},#db2777)`)} onClick={()=>{const u=new SpeechSynthesisUtterance("Bienvenido a la guía de VisionAI. Selecciona una sección.");u.lang="es-PE";window.speechSynthesis.speak(u);}}>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6 }}><Volume2 size={14}/> Escuchar guía</div>
            </button>
          </div>
          <div style={S.card}>
            <div style={{ fontSize:11,color:C.textMuted,fontWeight:"600",marginBottom:10 }}>⌨️ ATAJOS DE TECLADO</div>
            {[["Tab","Navegar"],["Enter","Seleccionar"],["Esc","Volver"],["Space","Pausar"]].map(([k,v])=>(
              <div key={k} style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
                <span style={{ background:C.surface,border:`1px solid ${C.border}`,borderRadius:"6px",padding:"2px 8px",fontSize:11,color:C.blue,fontWeight:"700",flexShrink:0 }}>{k}</span>
                <span style={{ fontSize:11,color:C.textMuted }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const defaultSettings = { fontSize:15, highContrast:false, autoRead:false, subtitles:false, simpleMode:false, voiceNav:false, readableFont:false };

export default function App() {
  const [screen,setScreen]     = useState("welcome");
  const [settings,setSettings] = useState(defaultSettings);
  const bp = useBreakpoint();

  useEffect(() => { document.body.style.filter = settings.highContrast?"contrast(1.3) brightness(1.1)":"none"; }, [settings.highContrast]);

  const nav = (s) => setScreen(s);
  const p   = { bp };
  const hasSidebar = bp!=="mobile" && !["welcome","login","register"].includes(screen);

  const renderScreen = () => {
    switch(screen) {
      case "welcome":    return <Welcome    {...p} onLogin={()=>nav("login")} onRegister={()=>nav("register")}/>;
      case "login":      return <Login      {...p} onBack={()=>nav("welcome")} onSuccess={()=>nav("dashboard")}/>;
      case "register":   return <Register   {...p} onBack={()=>nav("welcome")}/>;
      case "dashboard":  return <Dashboard  {...p} onNavigate={nav} onLogout={()=>nav("welcome")}/>;
      case "reading":    return <Reading    {...p} onBack={()=>nav("dashboard")}/>;
      case "voice2text": return <Voice2Text {...p} onBack={()=>nav("dashboard")}/>;
      case "scanner":    return <Scanner    {...p} onBack={()=>nav("dashboard")}/>;
      case "objects":    return <Objects    {...p} onBack={()=>nav("dashboard")}/>;
      case "multimedia": return <Multimedia {...p} onBack={()=>nav("dashboard")}/>;
      case "access":     return <AccessModule {...p} onBack={()=>nav("dashboard")} settings={settings} setSettings={setSettings}/>;
      case "help":       return <Help       {...p} onBack={()=>nav("dashboard")}/>;
      default: return null;
    }
  };

  if (bp==="mobile") return (
    <div style={{ minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Segoe UI',sans-serif" }}>
      <div style={{ width:360,minHeight:720,maxHeight:720,background:C.phone,borderRadius:"36px",border:`2px solid ${C.border}`,overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 24px 60px rgba(0,0,0,0.6)",position:"relative" }}>
        <StatusBar/>{renderScreen()}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh",background:C.bg,display:"flex",fontFamily:"'Segoe UI',sans-serif" }}>
      {hasSidebar&&<Sidebar screen={screen} onNavigate={nav} onLogout={()=>nav("welcome")} bp={bp}/>}
      <div style={{ flex:1,display:"flex",flexDirection:"column",overflow:"hidden" }}>
        <TopBar screen={screen} bp={bp}/>
        <div style={{ flex:1,overflowY:"auto",display:"flex",justifyContent:bp==="desktop"?"center":"flex-start" }}>
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}