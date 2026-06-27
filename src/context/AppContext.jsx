import { createContext, useContext, useState, useEffect } from 'react';
import { ALERTS, LIVE_ALERTS } from '../data/mockData';
import { checkBackendHealth, fetchDashboardStats } from '../services/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [apiKey, setApiKey] = useState('');
  const [backendOnline, setBackendOnline] = useState(false);
  const [threatCount, setThreatCount] = useState(0);
  const [blockedCount, setBlockedCount] = useState(0);
  const [savedAmount, setSavedAmount] = useState(0);
  const [alertFeed, setAlertFeed] = useState(ALERTS);
  const [liveIdx, setLiveIdx] = useState(0);

  useEffect(() => {
    checkBackendHealth().then(online => {
      setBackendOnline(online);
      console.info(online ? '✅ Backend online' : 'ℹ️ Backend offline — fallback mode');
    });
    const id = setInterval(() => checkBackendHealth().then(setBackendOnline), 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const targets = { threats: 247, blocked: 891, saved: 4.7 };
    const dur = 2200; const start = Date.now();
    const frame = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setThreatCount(Math.floor(targets.threats * e));
      setBlockedCount(Math.floor(targets.blocked * e));
      setSavedAmount(parseFloat((targets.saved * e).toFixed(1)));
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!backendOnline) return;
    fetchDashboardStats().then(data => {
      if (!data) return;
      setThreatCount(data.threats_today);
      setBlockedCount(data.blocked_today);
      setSavedAmount(data.amount_saved_cr);
    });
  }, [backendOnline]);

  useEffect(() => {
    const id = setInterval(() => {
      const alert = LIVE_ALERTS[liveIdx % LIVE_ALERTS.length];
      setLiveIdx(i => i + 1);
      setAlertFeed(prev => [{ ...alert, time: 'Just now' }, ...prev.slice(0, 12)]);
      setThreatCount(c => c + 1);
    }, 14000);
    return () => clearInterval(id);
  }, [liveIdx]);

  return (
    <AppContext.Provider value={{ apiKey, setApiKey, backendOnline, threatCount, blockedCount, savedAmount, alertFeed }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
