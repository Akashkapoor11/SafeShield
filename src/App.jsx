import { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy-loaded pages — code splitting for faster initial load
const Dashboard     = lazy(() => import('./pages/Dashboard'));
const ScamDetector  = lazy(() => import('./pages/ScamDetector'));
const CurrencyScanner = lazy(() => import('./pages/CurrencyScanner'));
const FraudNetwork  = lazy(() => import('./pages/FraudNetwork'));
const CrimeMap      = lazy(() => import('./pages/CrimeMap'));
const CitizenShield = lazy(() => import('./pages/CitizenShield'));

function PageLoader() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'60vh', flexDirection:'column', gap:12 }}>
      <div className="dots"><span/><span/><span/></div>
      <div style={{ color:'#64748b', fontSize:13 }}>Loading module...</div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router>
          <Layout>
            <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/"          element={<Dashboard />} />
                  <Route path="/detector"  element={<ScamDetector />} />
                  <Route path="/currency"  element={<CurrencyScanner />} />
                  <Route path="/networks"  element={<FraudNetwork />} />
                  <Route path="/map"       element={<CrimeMap />} />
                  <Route path="/shield"    element={<CitizenShield />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </Layout>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
}
