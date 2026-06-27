import { MapContainer, TileLayer, Circle, CircleMarker, Popup } from 'react-leaflet';
import { CRIME_CITIES } from '../data/mockData';

export default function CrimeMap() {
  return (
    <div>
      <div className="pg-title">Geospatial Crime Intelligence</div>
      <div className="pg-sub">Real-time fraud and cybercrime hotspot mapping — national operations view</div>
      <div className="grid2-l">
        <div>
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height:470, borderRadius:11, border:'1px solid #1e2d45' }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution="© OpenStreetMap © CartoDB"
            />
            {CRIME_CITIES.map((c, i) => (
              <Circle
                key={i}
                center={[c.lat, c.lng]}
                radius={14000 + c.r * 88000}
                pathOptions={{ color:c.color, fillColor:c.color, fillOpacity:.18, opacity:.7, weight:2 }}
              >
                <Popup>
                  <div style={{ fontFamily:'sans-serif', minWidth:150 }}>
                    <strong style={{ fontSize:14 }}>{c.city}</strong><br />
                    <span style={{ fontSize:12 }}>Cases: <strong style={{ color:c.color }}>{c.cases.toLocaleString()}</strong></span><br />
                    <span style={{ fontSize:12 }}>Loss: <strong>{c.amt}</strong></span>
                  </div>
                </Popup>
              </Circle>
            ))}
            {CRIME_CITIES.map((c, i) => (
              <CircleMarker key={`m-${i}`} center={[c.lat, c.lng]} radius={5}
                pathOptions={{ color:c.color, fillColor:c.color, fillOpacity:1, weight:2 }} />
            ))}
          </MapContainer>
        </div>

        <div>
          <div className="card mb4">
            <div className="card-title">Top Affected Cities</div>
            <table className="data-table">
              <thead><tr><th>City</th><th>Cases</th><th>Amount</th></tr></thead>
              <tbody>
                {CRIME_CITIES.slice(0, 8).map((c, i) => (
                  <tr key={i}>
                    <td>{c.city}</td>
                    <td style={{ color: c.r > .6 ? '#ef4444' : c.r > .4 ? '#f59e0b' : '#94a3b8', fontWeight:600 }}>{c.cases.toLocaleString()}</td>
                    <td style={{ color: c.r > .6 ? '#ef4444' : c.r > .4 ? '#f59e0b' : '#94a3b8', fontWeight:600 }}>{c.amt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card mb4">
            <div className="card-title">Crime Type Filter</div>
            <div style={{ display:'flex', flexDirection:'column', gap:9, fontSize:12 }}>
              {[
                ['#ef4444', 'Digital Arrest Scams'],
                ['#f59e0b', 'Investment Fraud'],
                ['#3b82f6', 'UPI / Payment Fraud'],
                ['#8b5cf6', 'FICN Circulation'],
                ['#10b981', 'Job / Loan Scams'],
              ].map(([color, label]) => (
                <label key={label} style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}>
                  <input type="checkbox" defaultChecked />
                  <span style={{ display:'inline-block', width:11, height:11, background:color, borderRadius:2 }} />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div className="insight">
            <div className="insight-t">📍 Predictive Deployment</div>
            SafeShield identifies tomorrow's hotspots today — enabling proactive patrol deployment
            12–24 hours before predicted crime surge using LSTM forecasting.
          </div>

          <div style={{ marginTop:14 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:7, fontSize:11 }}>
              {[
                ['#ef4444', 'High (> 3000 cases)'],
                ['#f59e0b', 'Medium (1000–3000)'],
                ['#3b82f6', 'Moderate (500–1000)'],
                ['#10b981', 'Low (< 500)'],
              ].map(([c, l]) => (
                <div key={l} style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ width:10, height:10, borderRadius:'50%', background:c, display:'inline-block' }} />
                  <span style={{ color:'#94a3b8' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
