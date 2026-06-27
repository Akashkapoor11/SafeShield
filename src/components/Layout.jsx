import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ALERT_TICKER } from '../data/mockData';

function Clock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const p = v => String(v).padStart(2, '0');
      setTime(`${p(ist.getHours())}:${p(ist.getMinutes())}:${p(ist.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

const NAV = [
  { to:'/', icon:'📊', label:'Dashboard', badge:'12', bc:'nb-r', exact:true },
  { to:'/detector', icon:'📞', label:'Scam Detector', badge:'3', bc:'nb-r' },
  { to:'/currency', icon:'💵', label:'Currency Scanner', badge:'!', bc:'nb-a' },
  { to:'/networks', icon:'🕸️', label:'Fraud Networks', badge:'7', bc:'nb-r' },
  { to:'/map', icon:'🗺️', label:'Crime Map', badge:null },
  { to:'/shield', icon:'💬', label:'Citizen Shield', badge:'AI', bc:'nb-g' },
];

export default function Layout({ children }) {
  const { threatCount, blockedCount, savedAmount, backendOnline } = useApp();

  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh' }}>
      {/* TICKER */}
      <div className="ticker-bar">
        <div className="ticker-inner">
          {ALERT_TICKER.concat(ALERT_TICKER).map((t, i) => (
            <span key={i}><span className="tl">{t.split('—')[0]}</span>{t.split('—').slice(1).join('—')}</span>
          ))}
        </div>
      </div>

      {/* HEADER */}
      <header className="header">
        <div className="logo-wrap">
          <div className="logo-icon">🛡️</div>
          <div>
            <div className="logo-name">SafeShield<span>AI</span></div>
            <div className="logo-sub">Digital Public Safety Intelligence</div>
          </div>
        </div>
        <div className="hackathon-badge">🏆 ET AI Hackathon 2026 · PS6</div>
        <div className="live-pill">
          <span className="live-dot" /><span>SYSTEM LIVE</span>
        </div>
        <div className="hdr-stats">
          <div className="hdr-stat">
            <div className="hdr-val" style={{ color:'#ef4444' }}>{threatCount.toLocaleString('en-IN')}</div>
            <div className="hdr-lbl">Threats Today</div>
          </div>
          <div className="hdr-stat">
            <div className="hdr-val" style={{ color:'#10b981' }}>{blockedCount.toLocaleString('en-IN')}</div>
            <div className="hdr-lbl">Blocked</div>
          </div>
          <div className="hdr-stat">
            <div className="hdr-val" style={{ color:'#f59e0b' }}>₹{savedAmount}Cr</div>
            <div className="hdr-lbl">Saved</div>
          </div>
          <div className="hdr-stat">
            <div className="hdr-val"><Clock /></div>
            <div className="hdr-lbl">IST</div>
          </div>
        </div>
      </header>

      <div className="app-layout">
        {/* SIDEBAR */}
        <nav className="sidebar">
          <div className="sb-lbl">Intelligence</div>
          {NAV.slice(0,1).map(n => (
            <NavLink key={n.to} to={n.to} end={n.exact} className={({isActive}) => `nav-link${isActive?' active':''}`}>
              <span className="nav-icon">{n.icon}</span>
              <span>{n.label}</span>
              {n.badge && <span className={`nav-badge ${n.bc}`}>{n.badge}</span>}
            </NavLink>
          ))}
          <div className="sb-lbl">Detection</div>
          {NAV.slice(1,4).map(n => (
            <NavLink key={n.to} to={n.to} className={({isActive}) => `nav-link${isActive?' active':''}`}>
              <span className="nav-icon">{n.icon}</span>
              <span>{n.label}</span>
              {n.badge && <span className={`nav-badge ${n.bc}`}>{n.badge}</span>}
            </NavLink>
          ))}
          <div className="sb-lbl">Operations</div>
          {NAV.slice(4).map(n => (
            <NavLink key={n.to} to={n.to} className={({isActive}) => `nav-link${isActive?' active':''}`}>
              <span className="nav-icon">{n.icon}</span>
              <span>{n.label}</span>
              {n.badge && <span className={`nav-badge ${n.bc}`}>{n.badge}</span>}
            </NavLink>
          ))}
          <div className="sb-foot">
            <div style={{ marginBottom:4, fontWeight:700, color:'#94a3b8', fontSize:10 }}>SafeShield AI v2.0.0</div>
            <div>Backend: <span style={{ color: backendOnline ? '#10b981' : '#f59e0b' }}>{backendOnline ? '● Online' : '○ Fallback'}</span></div>
            <div>Uptime: <span style={{ color:'#10b981' }}>99.97%</span></div>
            <div><span style={{ color:'#10b981' }}>● All agents nominal</span></div>
            <div style={{ marginTop:6, color:'#4b5563', fontSize:9, lineHeight:1.5 }}>
              ET AI Hackathon 2026<br/>Problem Statement 6<br/>Built for Bharat 🇮🇳
            </div>
          </div>
        </nav>

        {/* CONTENT */}
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
