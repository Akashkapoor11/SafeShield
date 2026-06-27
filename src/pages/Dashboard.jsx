import { useEffect, useRef, useState } from 'react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useApp } from '../context/AppContext';
import { INVESTIGATIONS } from '../data/mockData';

function useCountUp(target, duration = 2000) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const frame = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(target * e));
      if (p < 1) requestAnimationFrame(frame);
    };
    setTimeout(() => requestAnimationFrame(frame), 200);
  }, [target, duration]);
  return val;
}

function generateTrend() {
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (29 - i));
    const v = Math.floor(150 + Math.random() * 130 + i * 3.2);
    return { date: d.toLocaleDateString('en-IN', { day:'2-digit', month:'short' }), detected: v, blocked: Math.floor(v * 0.942) };
  });
}

const TREND_DATA = generateTrend();
const PIE_DATA = [
  { name:'Digital Arrest', value:38, color:'#ef4444' },
  { name:'Investment', value:24, color:'#f59e0b' },
  { name:'UPI Fraud', value:19, color:'#3b82f6' },
  { name:'Job Scam', value:12, color:'#8b5cf6' },
  { name:'Other', value:7, color:'#10b981' },
];

const PC_BARS = [
  { label:'Digital Arrest Risk', score:73, color:'#ef4444' },
  { label:'Investment Scam Risk', score:68, color:'#f59e0b' },
  { label:'FICN Circulation Risk', score:45, color:'#f59e0b' },
  { label:'UPI Fraud Risk', score:58, color:'#3b82f6' },
];

export default function Dashboard() {
  const { alertFeed } = useApp();
  const [pcWidths, setPcWidths] = useState([0, 0, 0, 0]);
  const t = useCountUp(247); const b = useCountUp(891); const c = useCountUp(12847); const n = useCountUp(31); const f = useCountUp(184);
  const [saved, setSaved] = useState(0);

  useEffect(() => {
    const start = Date.now(); const dur = 2400;
    const fr = () => { const p = Math.min((Date.now()-start)/dur,1); const e=1-Math.pow(1-p,3); setSaved(parseFloat((4.7*e).toFixed(1))); if(p<1)requestAnimationFrame(fr); };
    setTimeout(()=>requestAnimationFrame(fr),300);
    setTimeout(() => setPcWidths([73, 68, 45, 58]), 500);
  }, []);

  const kpis = [
    { icon:'⚠️', val:t, lbl:'Active Threats', cls:'red', delta:'↑ +23% vs yesterday', dc:'dn' },
    { icon:'🛡️', val:b, lbl:'Scams Blocked', cls:'green', delta:'↑ 94.2% block rate', dc:'up' },
    { icon:'💰', val:`₹${saved}Cr`, lbl:'Amount Saved', cls:'amber', delta:'↑ ₹1.6Cr vs yesterday', dc:'up', raw:true },
    { icon:'👥', val:c, lbl:'Citizens Protected', cls:'blue', delta:'↑ 2,341 new today', dc:'up' },
    { icon:'🕸️', val:n, lbl:'Networks Mapped', cls:'purple', delta:'↑ 3 new rings', dc:'up' },
    { icon:'🔬', val:f, lbl:'FICN Detected', cls:'green', delta:'↓ 12% vs last week', dc:'up' },
  ];

  return (
    <div>
      <div className="pg-title">Threat Intelligence Dashboard</div>
      <div className="pg-sub">Real-time digital public safety intelligence — India National Operations Center</div>

      {/* KPIs */}
      <div className="kpi-grid">
        {kpis.map((k, i) => (
          <div key={i} className={`kpi-card ${k.cls}`}>
            <div className="kpi-icon">{k.icon}</div>
            <div className="kpi-val">{k.raw ? k.val : k.val.toLocaleString('en-IN')}</div>
            <div className="kpi-lbl">{k.lbl}</div>
            <div className={`kpi-delta ${k.dc}`}>{k.delta}</div>
          </div>
        ))}
      </div>

      {/* PreCrime Scores */}
      <div style={{ marginBottom:7, fontSize:10, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:1 }}>
        ⚡ PreCrime Risk Scores — Live Predictive Intelligence
      </div>
      <div className="precrime-grid mb5">
        {PC_BARS.map((pc, i) => (
          <div key={i} className="pc-card">
            <div className="pc-label">
              <span>{pc.label}</span>
              <span className="pc-score" style={{ color:pc.color }}>{pc.score}/100</span>
            </div>
            <div className="pc-bar">
              <div className="pc-fill" style={{ background:pc.color, width:`${pcWidths[i]}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="card">
          <div className="card-title">Threat Activity — Last 30 Days</div>
          <ResponsiveContainer width="100%" height={130}>
            <AreaChart data={TREND_DATA}>
              <defs>
                <linearGradient id="det" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
              <XAxis dataKey="date" tick={{ fill:'#4b5563', fontSize:8 }} interval={6} />
              <YAxis tick={{ fill:'#4b5563', fontSize:9 }} />
              <Tooltip contentStyle={{ background:'#111827', border:'1px solid #2d4060', borderRadius:8, fontSize:11 }} />
              <Area type="monotone" dataKey="detected" stroke="#ef4444" fill="url(#det)" strokeWidth={2} dot={false} name="Detected" />
              <Line type="monotone" dataKey="blocked" stroke="#10b981" strokeWidth={2} dot={false} strokeDasharray="5 3" name="Blocked" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-title">Scam Category Breakdown</div>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={38} outerRadius={58} dataKey="value" strokeWidth={3} stroke="#111827">
                {PIE_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background:'#111827', border:'1px solid #2d4060', borderRadius:8, fontSize:11 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ marginTop:8 }}>
            {PIE_DATA.map((p, i) => <span key={i} className={`tag tag-${p.color==='#ef4444'?'r':p.color==='#f59e0b'?'a':p.color==='#3b82f6'?'b':p.color==='#8b5cf6'?'p':'g'}`}>{p.name} {p.value}%</span>)}
          </div>
        </div>
      </div>

      {/* Feed + Investigations */}
      <div className="grid2">
        <div className="card">
          <div className="flex jb aic mb4">
            <div className="card-title" style={{ marginBottom:0 }}>Live Alert Feed</div>
            <span style={{ fontSize:10, color:'#10b981' }}>● LIVE</span>
          </div>
          <div className="alert-feed">
            {alertFeed.map((a, i) => (
              <div key={i} className="alert-item">
                <div className={`a-dot ${a.t==='critical'?'r':a.t==='warning'?'a':'b'}`} />
                <span className={`badge ${a.t==='critical'?'bc':a.t==='warning'?'bw':'bi'}`}>{a.t.toUpperCase()}</span>
                <span className="a-text">{a.txt}</span>
                <span className="a-time">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-title">Active Investigations</div>
          <table className="data-table">
            <thead><tr><th>Case ID</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {INVESTIGATIONS.map((inv, i) => (
                <tr key={i}>
                  <td style={{ color:'#3b82f6', fontFamily:'monospace' }}>{inv.id}</td>
                  <td>{inv.type}</td>
                  <td style={{ color:inv.amtColor==='red'?'#ef4444':inv.amtColor==='amber'?'#f59e0b':'#10b981', fontWeight:700 }}>{inv.amount}</td>
                  <td><span className={`pill ${inv.statusClass}`}>{inv.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
