import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('SafeShield Error Boundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center',
          justifyContent: 'center', background: '#070b14', padding: 24,
        }}>
          <div style={{
            background: '#111827', border: '1px solid #ef4444', borderRadius: 12,
            padding: 32, maxWidth: 480, textAlign: 'center',
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🛡️</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#ef4444', marginBottom: 8 }}>
              Module Error Detected
            </div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 20, lineHeight: 1.6 }}>
              SafeShield AI encountered an unexpected error in this module.
              The rest of the platform continues to operate normally.
            </div>
            <div style={{
              background: '#0d1421', border: '1px solid #2d4060', borderRadius: 8,
              padding: '10px 14px', fontSize: 11, fontFamily: 'monospace',
              color: '#64748b', marginBottom: 20, textAlign: 'left',
            }}>
              {this.state.error?.message || 'Unknown error'}
            </div>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{
                background: '#3b82f6', color: '#fff', border: 'none',
                borderRadius: 7, padding: '9px 20px', cursor: 'pointer',
                fontWeight: 600, fontSize: 13, fontFamily: 'inherit',
              }}
            >
              ↺ Reload Module
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
