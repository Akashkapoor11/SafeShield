import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { NETWORK_DATA, TYPE_COLORS } from '../data/mockData';

export default function FraudNetwork() {
  const svgRef = useRef(null);
  const ttRef = useRef(null);
  const simRef = useRef(null);
  const [filters, setFilters] = useState({ mastermind:true, mule:true, victim:true, infra:true });
  const [selectedNode, setSelectedNode] = useState(null);

  const toggleFilter = (type) => setFilters(f => ({ ...f, [type]: !f[type] }));

  useEffect(() => {
    if (!svgRef.current) return;
    const container = svgRef.current;
    const W = container.getBoundingClientRect().width || 700;
    const H = 510;

    d3.select(container).selectAll('*').remove();
    if (simRef.current) simRef.current.stop();

    const nodes = NETWORK_DATA.nodes.filter(n => filters[n.type]).map(n => ({ ...n }));
    const nodeIds = new Set(nodes.map(n => n.id));
    const links = NETWORK_DATA.links
      .filter(l => nodeIds.has(l.s) && nodeIds.has(l.t))
      .map(l => ({ source: l.s, target: l.t, label: l.l }));

    const svg = d3.select(container).attr('viewBox', `0 0 ${W} ${H}`);

    // Defs
    const defs = svg.append('defs');
    Object.entries(TYPE_COLORS).forEach(([type, color]) => {
      defs.append('marker').attr('id', `arr-${type}`)
        .attr('viewBox', '0 -5 10 10').attr('refX', 26).attr('refY', 0)
        .attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto')
        .append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', color).attr('opacity', .55);
    });
    const flt = defs.append('filter').attr('id', 'glow');
    flt.append('feGaussianBlur').attr('stdDeviation', '3.5').attr('result', 'blur');
    const fm = flt.append('feMerge');
    fm.append('feMergeNode').attr('in', 'blur');
    fm.append('feMergeNode').attr('in', 'SourceGraphic');

    const sim = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(85))
      .force('charge', d3.forceManyBody().strength(-280))
      .force('center', d3.forceCenter(W / 2, H / 2))
      .force('collide', d3.forceCollide(30));
    simRef.current = sim;

    const link = svg.append('g').selectAll('line').data(links).enter().append('line')
      .attr('stroke', d => { const tgt = nodes.find(n => n.id === (d.target.id || d.target)); return tgt ? TYPE_COLORS[tgt.type] : '#2d4060'; })
      .attr('stroke-opacity', .45).attr('stroke-width', 1.8)
      .attr('stroke-dasharray', d => d.label === 'recruits' ? '5,3' : 'none')
      .attr('marker-end', d => { const tgt = nodes.find(n => n.id === (d.target.id || d.target)); return tgt ? `url(#arr-${tgt.type})` : ''; });

    const nodeG = svg.append('g').selectAll('g').data(nodes).enter().append('g')
      .call(d3.drag()
        .on('start', (e, d) => { if (!e.active) sim.alphaTarget(.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on('end', (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }))
      .on('click', (e, d) => setSelectedNode(d))
      .on('mouseover', (e, d) => {
        if (!ttRef.current) return;
        ttRef.current.style.display = 'block';
        ttRef.current.style.left = (e.clientX + 12) + 'px';
        ttRef.current.style.top = (e.clientY - 28) + 'px';
        ttRef.current.innerHTML = `<div style="font-weight:700;color:#e2e8f0;margin-bottom:3px">${d.lbl}</div><div style="color:#64748b">${d.city}</div>${d.amount ? `<div style="color:${TYPE_COLORS[d.type]};font-weight:700">${d.amount}</div>` : ''}`;
      })
      .on('mouseout', () => { if (ttRef.current) ttRef.current.style.display = 'none'; })
      .style('cursor', 'pointer');

    nodeG.append('circle')
      .attr('r', d => d.type === 'mastermind' ? 21 : d.type === 'infra' ? 15 : d.type === 'mule' ? 13 : 9)
      .attr('fill', d => TYPE_COLORS[d.type] + '18')
      .attr('stroke', d => TYPE_COLORS[d.type]).attr('stroke-width', d => d.type === 'mastermind' ? 3 : 2)
      .attr('filter', d => d.type === 'mastermind' ? 'url(#glow)' : 'none');

    nodeG.append('text').attr('text-anchor', 'middle').attr('dy', 5)
      .attr('font-size', d => d.type === 'mastermind' ? '13px' : '10px')
      .attr('fill', d => TYPE_COLORS[d.type]).attr('pointer-events', 'none')
      .text(d => ({ mastermind:'★', mule:'◈', victim:'●', infra:'◆' })[d.type]);

    nodeG.append('text').attr('text-anchor', 'middle').attr('dy', d => d.type === 'mastermind' ? 36 : 26)
      .attr('font-size', '9px').attr('fill', '#94a3b8').attr('pointer-events', 'none')
      .text(d => d.lbl.split(' ')[0]);

    sim.on('tick', () => {
      link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
      nodeG.attr('transform', d => `translate(${Math.max(24, Math.min(W - 24, d.x))},${Math.max(24, Math.min(H - 24, d.y))})`);
    });

    return () => sim.stop();
  }, [filters]);

  const filterBtns = [
    { type:'mastermind', label:'🔴 Masterminds (2)', cls:'on-mm' },
    { type:'mule', label:'🟡 Money Mules (6)', cls:'on-mu' },
    { type:'victim', label:'🔵 Victims (8)', cls:'on-v' },
    { type:'infra', label:'🟣 Infrastructure (4)', cls:'on-i' },
  ];

  return (
    <div>
      <div className="pg-title">Fraud Network Intelligence</div>
      <div className="pg-sub">Graph AI mapping — Operation Cyber Havala Ring (Active Investigation)</div>
      <div className="grid2-l">
        <div>
          <div className="net-controls">
            <span style={{ fontSize:10, color:'#64748b', fontWeight:700 }}>FILTER:</span>
            {filterBtns.map(f => (
              <button key={f.type} className={`filter-btn ${filters[f.type] ? f.cls : ''}`} onClick={() => toggleFilter(f.type)}>
                {f.label}
              </button>
            ))}
          </div>
          <svg ref={svgRef} className="net-svg" />
          <div ref={ttRef} className="node-tt" style={{ display:'none' }} />
        </div>

        <div>
          <div className="card mb4">
            <div className="card-title">Operation Summary</div>
            {[
              ['Operation', 'Cyber Havala Ring', '#ef4444'],
              ['Status', 'Active Investigation', null, 'pill-r'],
              ['Total Fraud', '₹4.2 Crore', '#ef4444'],
              ['Victims Identified', '8 confirmed / est. 40+', null],
              ['States Involved', '6 states + Dubai', null],
              ['Nodes Mapped', '20', null],
            ].map(([k, v, c, pill], i) => (
              <div key={i} className="stat-row">
                <span className="sr-k">{k}</span>
                {pill
                  ? <span className={`pill ${pill}`}>{v}</span>
                  : <span className="sr-v" style={c ? { color:c } : {}}>{v}</span>
                }
              </div>
            ))}
          </div>

          <div className="card mb4">
            <div className="card-title">Node Details</div>
            {selectedNode ? (
              <div style={{ fontSize:12 }}>
                <div style={{ fontWeight:700, color:TYPE_COLORS[selectedNode.type], marginBottom:7, fontSize:10, textTransform:'uppercase', letterSpacing:1 }}>
                  {{ mastermind:'MASTERMIND', mule:'MONEY MULE', victim:'VICTIM', infra:'INFRASTRUCTURE' }[selectedNode.type]}
                </div>
                <div style={{ color:'#e2e8f0', fontWeight:600, marginBottom:8, fontSize:13 }}>{selectedNode.lbl}</div>
                {[
                  ['Location', selectedNode.city],
                  selectedNode.amount ? ['Amount', selectedNode.amount] : null,
                  selectedNode.role ? ['Role', selectedNode.role] : null,
                  selectedNode.detail ? ['Notes', selectedNode.detail] : null,
                ].filter(Boolean).map(([k, v], i) => (
                  <div key={i} className="stat-row">
                    <span className="sr-k">{k}</span>
                    <span className="sr-v" style={k === 'Amount' ? { color:TYPE_COLORS[selectedNode.type], fontWeight:800 } : {}}>{v}</span>
                  </div>
                ))}
                <button className="btn btn-s" style={{ width:'100%', justifyContent:'center', marginTop:9, fontSize:11 }}>
                  📋 Add to Evidence Package
                </button>
              </div>
            ) : (
              <div style={{ fontSize:12, color:'#374151', fontStyle:'italic' }}>Click any node to view details</div>
            )}
          </div>

          <div className="insight">
            <div className="insight-t">⚖️ Court-Admissible Evidence</div>
            SafeShield auto-generates blockchain-timestamped evidence packages — transaction metadata, call records, and
            network maps — admissible under IT Act 2000 Sec. 65B.
          </div>
        </div>
      </div>
    </div>
  );
}
