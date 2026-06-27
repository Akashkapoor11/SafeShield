import { useApp } from '../context/AppContext';

export default function ApiKeyBar() {
  const { backendOnline } = useApp();

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
      background: 'rgba(245,158,11,.07)',
      border: '1px solid rgba(245,158,11,.2)',
      borderRadius: 8, padding: '8px 14px', marginBottom: 16,
      display: 'flex', alignItems: 'center', gap: 10, fontSize: 12,
    }}>
      <span>🟡</span>
      <span style={{ color: '#f59e0b', fontWeight: 700, flexShrink: 0 }}>
        Connecting to AI Backend...
      </span>
      <span style={{ color: '#64748b', fontSize: 11 }}>
        Using smart fallback responses while connecting to Groq AI
      </span>
    </div>
  );
}
