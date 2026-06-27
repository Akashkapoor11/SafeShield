import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ApiKeyBar() {
  const { apiKey, setApiKey, backendOnline } = useApp();
  const [input, setInput] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setApiKey(input.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (backendOnline) {
    return (
      <div style={{
        background: 'rgba(16,185,129,.07)', border: '1px solid rgba(16,185,129,.2)',
        borderRadius: 8, padding: '8px 14px', marginBottom: 16,
        display: 'flex', alignItems: 'center', gap: 10, fontSize: 12,
      }}>
        <span>🟢</span>
        <span style={{ color: '#10b981', fontWeight: 700 }}>Backend Online</span>
        <span style={{ color: '#64748b' }}>— Real Claude AI active via FastAPI backend at localhost:8000</span>
        <a href="http://localhost:8000/docs" target="_blank" rel="noreferrer"
          style={{ marginLeft: 'auto', color: '#3b82f6', fontSize: 11, textDecoration: 'none' }}>
          View API Docs ↗
        </a>
      </div>
    );
  }

  return (
    <div style={{
      background: saved ? 'rgba(16,185,129,.07)' : 'rgba(245,158,11,.07)',
      border: `1px solid ${saved ? 'rgba(16,185,129,.2)' : 'rgba(245,158,11,.2)'}`,
      borderRadius: 8, padding: '8px 14px', marginBottom: 16,
      display: 'flex', alignItems: 'center', gap: 10, fontSize: 12,
    }}>
      <span>🔑</span>
      <span style={{ color: saved ? '#10b981' : '#f59e0b', fontWeight: 700, flexShrink: 0 }}>
        {saved ? '✓ API Key Saved — AI Active' : 'Anthropic API Key:'}
      </span>
      <input
        type="password"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && save()}
        placeholder="sk-ant-api03-... (powers all 5 AI agents)"
        style={{
          flex: 1, background: '#0d1421', border: '1px solid #2d4060',
          borderRadius: 5, padding: '5px 9px', color: '#e2e8f0',
          fontSize: 12, outline: 'none', fontFamily: 'monospace',
        }}
      />
      <button onClick={save} style={{
        padding: '5px 14px', background: 'rgba(245,158,11,.18)',
        border: '1px solid rgba(245,158,11,.3)', borderRadius: 5,
        color: '#f59e0b', fontSize: 12, cursor: 'pointer', fontWeight: 700,
        fontFamily: 'inherit', flexShrink: 0,
      }}>
        Activate
      </button>
      <span style={{ color: '#374151', fontSize: 11, flexShrink: 0 }}>
        Or run: <code style={{ color: '#64748b' }}>cd backend && uvicorn main:app</code>
      </span>
    </div>
  );
}
