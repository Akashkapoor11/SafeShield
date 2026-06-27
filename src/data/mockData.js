export const ALERT_TICKER = [
  '🔴 LIVE — Digital Arrest Scam active | Mumbai | Spoofed: +91-11-2309-XXXX (CBI) | Score: 98.7%',
  '⚠️ ALERT — FICN Cluster: 14 fake ₹500 notes — 4 banks | Connaught Place, New Delhi',
  '✅ BLOCKED — Wire transfer ₹8.5L intercepted | Victim: Pune | SafeShield real-time intervention',
  '🔴 LIVE — Investment Scam "GrowthMax" — 83 victims | ₹1.8Cr cumulative loss',
  '⚠️ ALERT — Phishing domain: edigitalarrest-mha.in — Takedown request sent to NCIIPC',
];

export const ALERTS = [
  { t:'critical', txt:'Digital Arrest Scam — Active call | Mumbai | Spoofed IB Director +91-11-2734-XXXX', time:'Just now' },
  { t:'critical', txt:'Suspicious UPI chain ₹4.2L — 7 accounts | Mule network | Delhi-Noida', time:'2 min ago' },
  { t:'warning', txt:'FICN ₹500 cluster — 12 notes in 3 banks | Connaught Place', time:'5 min ago' },
  { t:'info', txt:'SafeShield blocked ₹8.5L transfer — Victim protected | Pune', time:'8 min ago' },
  { t:'critical', txt:'Pig-butchering ring — 47 victims | ₹1.2Cr | Platform: GrowthMax', time:'11 min ago' },
  { t:'warning', txt:'Phishing domain: edigitalarrest-mha.in — Takedown initiated', time:'14 min ago' },
  { t:'info', txt:'New mule cluster — 9 accounts | Rajasthan', time:'18 min ago' },
  { t:'critical', txt:'Money mule RTGS ₹23.1L | Hyderabad–Chennai | 5 accounts', time:'29 min ago' },
];

export const LIVE_ALERTS = [
  { t:'critical', txt:'NEW: Digital arrest scam — Victim: Retired banker | ₹32L at risk | INTERVENING' },
  { t:'warning', txt:'NEW: Suspicious transactions | Bank: SBI | 4-node account cluster' },
  { t:'info', txt:'NEW: Fraud ring link confirmed — Meerut ↔ Dubai connection' },
  { t:'critical', txt:'NEW: WhatsApp OTP scam — 8 victims in last hour | Elderly targeted' },
];

export const INVESTIGATIONS = [
  { id:'SS-2026-4821', type:'Digital Arrest', amount:'₹42.5L', amtColor:'red', status:'Active', statusClass:'pill-r' },
  { id:'SS-2026-4819', type:'Pig Butchering', amount:'₹1.2Cr', amtColor:'red', status:'Active', statusClass:'pill-r' },
  { id:'SS-2026-4815', type:'FICN Ring', amount:'₹18L', amtColor:'amber', status:'Monitor', statusClass:'pill-a' },
  { id:'SS-2026-4809', type:'Job Fraud', amount:'₹8.3L', amtColor:'red', status:'Monitor', statusClass:'pill-a' },
  { id:'SS-2026-4801', type:'UPI Mule Chain', amount:'₹23.1L', amtColor:'red', status:'Active', statusClass:'pill-r' },
  { id:'SS-2026-4788', type:'Investment App', amount:'₹56.8L', amtColor:'green', status:'Closed ✓', statusClass:'pill-g' },
];

export const CRIME_CITIES = [
  { lat:28.6139, lng:77.2090, city:'Delhi NCR', cases:4821, amt:'₹89Cr', r:.95, color:'#ef4444' },
  { lat:19.0760, lng:72.8777, city:'Mumbai', cases:3947, amt:'₹76Cr', r:.82, color:'#ef4444' },
  { lat:17.3850, lng:78.4867, city:'Hyderabad', cases:2103, amt:'₹41Cr', r:.60, color:'#f59e0b' },
  { lat:12.9716, lng:77.5946, city:'Bengaluru', cases:1876, amt:'₹38Cr', r:.55, color:'#f59e0b' },
  { lat:18.5204, lng:73.8567, city:'Pune', cases:1234, amt:'₹24Cr', r:.42, color:'#3b82f6' },
  { lat:13.0827, lng:80.2707, city:'Chennai', cases:987, amt:'₹19Cr', r:.35, color:'#3b82f6' },
  { lat:22.5726, lng:88.3639, city:'Kolkata', cases:854, amt:'₹17Cr', r:.30, color:'#f59e0b' },
  { lat:23.0225, lng:72.5714, city:'Ahmedabad', cases:743, amt:'₹14Cr', r:.27, color:'#ef4444' },
  { lat:26.9124, lng:75.7873, city:'Jaipur', cases:621, amt:'₹12Cr', r:.22, color:'#10b981' },
  { lat:26.8467, lng:80.9462, city:'Lucknow', cases:589, amt:'₹11Cr', r:.20, color:'#8b5cf6' },
  { lat:30.7333, lng:76.7794, city:'Chandigarh', cases:423, amt:'₹8Cr', r:.17, color:'#ef4444' },
  { lat:25.5941, lng:85.1376, city:'Patna', cases:387, amt:'₹7Cr', r:.15, color:'#3b82f6' },
];

export const NETWORK_DATA = {
  nodes: [
    { id:'M1', lbl:'Boss (Meerut)', type:'mastermind', city:'Meerut, UP', amount:'₹2.3Cr', role:'Operation Lead' },
    { id:'M2', lbl:'Dubai Coordinator', type:'mastermind', city:'Dubai', amount:'₹1.9Cr', role:'International Handler' },
    { id:'I1', lbl:'Call Centre Hisar', type:'infra', city:'Hisar, HR', detail:'Registered as BPO front' },
    { id:'I2', lbl:'Fake Portal', type:'infra', city:'Cloud', detail:'cbihelpdesk.co.in (TAKEDOWN)' },
    { id:'I3', lbl:'Crypto Wallets', type:'infra', city:'Decentralized', detail:'₹1.4Cr USDT' },
    { id:'I4', lbl:'Hawala Node', type:'infra', city:'Delhi/Dubai', detail:'₹2.8Cr transacted' },
    { id:'MU1', lbl:'Mule Delhi', type:'mule', city:'Delhi', amount:'₹42L' },
    { id:'MU2', lbl:'Mule Noida', type:'mule', city:'Noida', amount:'₹31L' },
    { id:'MU3', lbl:'Mule Gurgaon', type:'mule', city:'Gurgaon', amount:'₹28L' },
    { id:'MU4', lbl:'Mule Jaipur', type:'mule', city:'Jaipur', amount:'₹19L' },
    { id:'MU5', lbl:'Mule Lucknow', type:'mule', city:'Lucknow', amount:'₹23L' },
    { id:'MU6', lbl:'Mule Chandigarh', type:'mule', city:'Chandigarh', amount:'₹17L' },
    { id:'V1', lbl:'Victim Mumbai ₹8.5L', type:'victim', city:'Mumbai', amount:'₹8.5L' },
    { id:'V2', lbl:'Victim Pune ₹12L', type:'victim', city:'Pune', amount:'₹12L' },
    { id:'V3', lbl:'Victim Bengaluru ₹3.2L', type:'victim', city:'Bengaluru', amount:'₹3.2L' },
    { id:'V4', lbl:'Victim Chennai ₹6.8L', type:'victim', city:'Chennai', amount:'₹6.8L' },
    { id:'V5', lbl:'Victim Delhi ₹15L', type:'victim', city:'Delhi', amount:'₹15L' },
    { id:'V6', lbl:'Victim Hyderabad ₹4.5L', type:'victim', city:'Hyderabad', amount:'₹4.5L' },
    { id:'V7', lbl:'Victim Kolkata ₹9.1L', type:'victim', city:'Kolkata', amount:'₹9.1L' },
    { id:'V8', lbl:'Victim Ahmedabad ₹11.3L', type:'victim', city:'Ahmedabad', amount:'₹11.3L' },
  ],
  links: [
    {s:'M2',t:'M1',l:'directs'},{s:'M1',t:'I1',l:'operates'},{s:'M2',t:'I2',l:'hosts'},
    {s:'M1',t:'I3',l:'launders'},{s:'I3',t:'I4',l:'converts'},
    {s:'I1',t:'MU1',l:'recruits'},{s:'I1',t:'MU2',l:'recruits'},{s:'I1',t:'MU3',l:'recruits'},
    {s:'M1',t:'MU4',l:'recruits'},{s:'M1',t:'MU5',l:'recruits'},{s:'M2',t:'MU6',l:'recruits'},
    {s:'MU1',t:'V1',l:'defrauds'},{s:'MU1',t:'V2',l:'defrauds'},{s:'MU2',t:'V3',l:'defrauds'},
    {s:'MU3',t:'V4',l:'defrauds'},{s:'MU4',t:'V5',l:'defrauds'},{s:'MU5',t:'V6',l:'defrauds'},
    {s:'MU6',t:'V7',l:'defrauds'},{s:'MU3',t:'V8',l:'defrauds'},
    {s:'MU4',t:'I4',l:'deposits'},{s:'MU5',t:'I4',l:'deposits'},{s:'MU6',t:'I3',l:'deposits'},
  ],
};

export const TYPE_COLORS = {
  mastermind: '#ef4444',
  mule: '#f59e0b',
  victim: '#3b82f6',
  infra: '#8b5cf6',
};

export const CURRENCY_CHECKS = [
  { icon:'🔢', lbl:'Serial Number Pattern', result:'ANOMALY DETECTED', color:'#ef4444', score:92 },
  { icon:'🧵', lbl:'Security Thread Verification', result:'THREAD ABSENT', color:'#ef4444', score:88 },
  { icon:'🔍', lbl:'Microprint Analysis', result:'DEGRADED QUALITY', color:'#f59e0b', score:71 },
  { icon:'🌈', lbl:'Colour Shift Ink (OVI)', result:'ABSENT', color:'#ef4444', score:95 },
  { icon:'☢️', lbl:'UV Feature Simulation', result:'PASS', color:'#10b981', score:97 },
  { icon:'📐', lbl:'Dimensional Analysis', result:'PASS (±0.3mm)', color:'#10b981', score:99 },
  { icon:'🖨️', lbl:'Intaglio Print Quality', result:'INTAGLIO ABSENT', color:'#ef4444', score:89 },
];

export const CLAUDE_SYSTEM = `You are SafeShield AI, India's citizen fraud protection assistant. Help detect fraud instantly.

ALWAYS give: 1) VERDICT (SCAM/LIKELY SCAM/SAFE) with confidence %, 2) immediate action steps, 3) relevant helpline.

Key facts:
- Digital arrest = 100% SCAM. No government agency uses video call arrest.
- You never need PIN to receive UPI money. Anyone asking = scammer.
- Call 1930 for cybercrime. Report at cybercrime.gov.in.

If emergency ("being scammed now"): give steps first, explain later. Be calm and clear. Under 200 words. Support Hindi when user writes Hindi.`;
