import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ApiKeyBar() {
  const { backendOnline, apiKey, setApiKey } = useApp();
  const [showInput, setShowInput] = useState(false);
  const [draft, setDraft] = useState('');

  if (backendOnline) {
    return (
      <div style={{
        background: 'rgba(16,185,129,.07)', border: '1px solid rgba(16,185,129,.2)',
        borderRadius: 8, padding: '8px 14px', marginBottom: 16,
        display: 'flex', alignItems: 'center', gap: 10, fontSize: 12,
      }}>
        <span>🟢</span>
        <span style={{ color: '#10b981', fontWeight: 700 }}>Groq AI Backend Online</span>
        <span style={{ color: '#64748b' }}>— Real-time AI analysis active · Llama 3.3 70B + Llama 4 Scout Vision</span>
        <a href={`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}/docs`}
          target="_blank" rel="noreferrer"
          style={{ marginLeft: 'auto', color: '#3b82f6', fontSize: 11, textDecoration: 'none' }}>
          View API Docs ↗
        </a>
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(59,130,246,.06)',
      border: '1px solid rgba(59,130,246,.2)',
      borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span>🔑</span>
        <span style={{ color: '#3b82f6', fontWeight: 700, flexShrink: 0 }}>OpenRouter API Key</span>
        {apiKey ? (
          <>
            <span style={{ color: '#10b981' }}>✅ Active — Live AI enabled (Llama 3.3 70B via OpenRouter)</span>
            <button onClick={() => setApiKey('')}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 11 }}>
              Clear key
            </button>
          </>
        ) : (
          <>
            <span style={{ color: '#64748b', fontSize: 11 }}>
              {showInput ? 'Paste your OpenRouter key (free at openrouter.ai):' : 'Add key for live AI when backend is unavailable'}
            </span>
            {!showInput && (
              <button onClick={() => setShowInput(true)}
                style={{ marginLeft: 'auto', background: 'rgba(59,130,246,.15)', border: '1px solid rgba(59,130,246,.3)', color: '#3b82f6', borderRadius: 5, padding: '3px 10px', cursor: 'pointer', fontSize: 11 }}>
                Add OpenRouter Key
              </button>
            )}
          </>
        )}
      </div>
      {showInput && !apiKey && (
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <input
            type="password"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder="sk-or-..."
            style={{ flex: 1, background: '#0d1421', border: '1px solid #2d4060', borderRadius: 6, padding: '6px 10px', color: '#e2e8f0', fontSize: 12, outline: 'none' }}
            onKeyDown={e => { if (e.key === 'Enter' && draft.startsWith('sk-or-')) { setApiKey(draft); setShowInput(false); } }}
          />
          <button
            onClick={() => { if (draft.startsWith('sk-or-')) { setApiKey(draft); setShowInput(false); } }}
            disabled={!draft.startsWith('sk-or-')}
            style={{ background: '#3b82f6', border: 'none', color: '#fff', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', fontSize: 12, opacity: draft.startsWith('sk-or-') ? 1 : 0.4 }}>
            Save
          </button>
          <button onClick={() => setShowInput(false)}
            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 12 }}>Cancel</button>
        </div>
      )}
    </div>
  );
}
