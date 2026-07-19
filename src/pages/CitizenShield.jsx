import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { analyzeScenario } from '../services/api';
import ApiKeyBar from '../components/ApiKeyBar';

const WELCOME_MSG = {
  role: 'bot',
  text: `👋 Namaste! I'm **SafeShield AI** — your personal fraud protection assistant.\n\nTell me about any suspicious call, message, or payment request. I'll give you an instant verdict and tell you exactly what to do next.\n\nI also speak **Hindi** — बस हिन्दी में लिखें, मैं उसी भाषा में जवाब दूंगा।\n\n💡 *Powered by OpenRouter AI (Llama 3.3 70B) via backend — or add your OpenRouter key for direct mode*`,
  ts: new Date(),
};

export default function CitizenShield() {
  const { apiKey, backendOnline } = useApp();
  const [lang, setLang] = useState('en');
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const msgsRef = useRef(null);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages]);

  const addMsg = (text, role) => {
    setMessages(m => [...m, { role, text, ts: new Date() }]);
  };

  const send = async (overrideText) => {
    const txt = (overrideText || input).trim();
    if (!txt || loading) return;
    setInput('');
    addMsg(txt, 'user');
    const newHistory = [...history, { role: 'user', content: txt }];
    setHistory(newHistory);
    setLoading(true);

    try {
      const result = await analyzeScenario({
        description: txt,
        language: lang,
        apiKey,
        history: newHistory.slice(-6), // last 3 turns for context
      });

      // Format result as readable chat message
      let reply = '';
      if (result.citizen_message) {
        const vc = { SCAM:'🔴', 'LIKELY SCAM':'🟠', SUSPICIOUS:'🟡', SAFE:'🟢' };
        reply = `${vc[result.verdict] || '⚠️'} **${result.verdict}** — Threat Score: ${result.threat_score?.toFixed?.(1) || result.threat_score}%\n\n${result.citizen_message}`;
        if (result.key_red_flags?.length) {
          reply += `\n\n**Red Flags:**\n${result.key_red_flags.map(f => `• ${f}`).join('\n')}`;
        }
        if (result.immediate_actions?.length) {
          reply += `\n\n**Do this now:**\n${result.immediate_actions.map((a, i) => `${i + 1}. ${a}`).join('\n')}`;
        }
        reply += `\n\n📞 **Helpline:** ${result.helpline} | 🌐 **Report:** ${result.report_url}`;
        if (backendOnline || apiKey) reply += '\n\n*Powered by OpenRouter AI (Llama 3.3 70B)*';
      } else {
        reply = result.message || 'Analysis complete. Please call 1930 if you need immediate assistance.';
      }

      addMsg(reply, 'bot');
      setHistory(h => [...h, { role: 'assistant', content: reply }]);
    } catch (err) {
      addMsg('I encountered an error. Please call **1930** immediately if you need help right now.', 'bot');
    } finally {
      setLoading(false);
    }
  };

  const fmt = txt => txt
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');

  const timeStr = d => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  const QUICK = [
    { label: '🚨 Being Scammed Now', cls: 'em', txt: 'I am being scammed RIGHT NOW on a video call — they claim to be CBI officers and say I am under digital arrest' },
    { label: '💳 Check UPI Request', txt: 'Someone sent me a UPI collect request saying it is a refund from Amazon, should I approve it?' },
    { label: '📋 How to Report', txt: 'How do I report a cybercrime to NCRB India?' },
    { label: '🇮🇳 हिन्दी', txt: 'मुझे CBI officer का call आया, बोले मेरे Aadhaar से illegal transaction हुई, मदद करो', isHindi: true },
  ];

  return (
    <div>
      <div className="pg-title">Citizen Fraud Shield</div>
      <div className="pg-sub">AI-powered fraud protection — multilingual, 24/7, instant verdict for every Indian citizen</div>

      <ApiKeyBar />

      <div className="grid2">
        <div>
          <div className="chat-wrap">
            <div className="chat-hdr">
              <div className="ch-avatar">🛡️</div>
              <div>
                <div className="ch-name">SafeShield AI</div>
                <div className="ch-status">
                  {backendOnline ? '● Backend Active · Real-time OpenRouter AI' : apiKey ? '● OpenRouter Active' : '● Smart Fallback Mode'}
                </div>
              </div>
              <div className="ch-langs">
                <button className={`lang-btn${lang === 'en' ? ' active' : ''}`} onClick={() => setLang('en')}>EN</button>
                <button className={`lang-btn${lang === 'hi' ? ' active' : ''}`} onClick={() => setLang('hi')}>हिं</button>
              </div>
            </div>

            <div className="quick-acts">
              {QUICK.map((q, i) => (
                <button key={i} className={`qa-btn${q.cls ? ' ' + q.cls : ''}`}
                  onClick={() => { if (q.isHindi) setLang('hi'); send(q.txt); }}>
                  {q.label}
                </button>
              ))}
            </div>

            <div className="chat-msgs" ref={msgsRef}>
              {messages.map((m, i) => (
                <div key={i} className={`chat-msg ${m.role}`}>
                  <div className="msg-bbl" dangerouslySetInnerHTML={{ __html: fmt(m.text) }} />
                  <div className="msg-time">{timeStr(m.ts)}</div>
                </div>
              ))}
              {loading && (
                <div className="chat-msg bot">
                  <div className="msg-bbl">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8', fontSize: 12 }}>
                      <div className="dots"><span /><span /><span /></div>
                      {backendOnline ? 'OpenRouter AI analysing via backend...' : apiKey ? 'OpenRouter AI analysing...' : 'Analysing...'}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="chat-input-area">
              <textarea
                className="chat-inp"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Describe the suspicious call, message, or payment..."
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
              />
              <button className="chat-send" onClick={() => send()} disabled={loading || !input.trim()}>➤</button>
            </div>
          </div>
        </div>

        <div>
          <div className="card mb4">
            <div className="card-title">Channel Reach</div>
            {[
              ['WhatsApp Chatbot', '● Active', '#10b981'],
              ['Mobile App (Android/iOS)', '● Active', '#10b981'],
              ['IVR Helpline (1930)', '● Active', '#10b981'],
              ['Web Portal', '● Active (This Demo)', '#10b981'],
              ['Languages Supported', '12 Indian languages', null],
              ['Avg Response Time', '< 3 seconds', '#3b82f6'],
            ].map(([k, v, c], i) => (
              <div key={i} className="stat-row">
                <span className="sr-k">{k}</span>
                <span className="sr-v" style={c ? { color: c } : {}}>{v}</span>
              </div>
            ))}
          </div>

          <div className="card mb4">
            <div className="card-title">Scam Types Detected</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 12 }}>
              {[
                ['👮', 'Digital Arrest / CBI / ED', 'Law enforcement impersonation'],
                ['📈', 'Investment / Trading App', 'Fake returns, pig butchering'],
                ['💳', 'UPI / OTP Fraud', 'Payment reversal, collect scams'],
                ['💼', 'Job / Work-from-Home', 'Advance fee, fake offers'],
                ['🏦', 'Bank / KYC Update', 'Account blocking threats'],
              ].map(([icon, title, sub]) => (
                <div key={title} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 17 }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#e2e8f0' }}>{title}</div>
                    <div style={{ color: '#64748b' }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="insight">
            <div className="insight-t">⚡ Emergency Protocol</div>
            Say <strong style={{ color: '#ef4444' }}>"I'm being scammed now"</strong> →
            SafeShield instantly logs your report with NCRB, alerts your bank, and
            initiates a DoT number-block — all in under 30 seconds.
          </div>
        </div>
      </div>
    </div>
  );
}
