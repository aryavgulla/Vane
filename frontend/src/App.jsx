import React, { useState, useRef, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [simulationPct, setSimulationPct] = useState(15);
  const [systemToast, setSystemToast] = useState(null); // Production notifications
  const chatEndRef = useRef(null);

  const [chatHistory, setChatHistory] = useState([
    { sender: 'vane', text: 'VANE KERNEL ONLINE. Enterprise security verified. Awaiting telemetry stream.' }
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const showToast = (message, type = 'info') => {
    setSystemToast({ message, type });
    setTimeout(() => setSystemToast(null), 4000);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      showToast('System Error: Strict CSV format required.', 'error');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Ingestion pipeline failed.');

      const data = await res.json();
      setDashboardData(data);
      showToast('Telemetry stream successfully mapped.', 'success');

      setChatHistory(prev => [...prev, {
        sender: 'vane',
        text: `TELEMETRY INGESTED. Parsed ${data.summary.length} facility nodes. Critical anomaly detected in ${data.critical_building} (+${data.highest_spike}%). Ready for mitigation protocols.`
      }]);
    } catch (err) {
      showToast('Gateway Timeout: Could not reach Vane API.', 'error');
    } finally {
      setUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  const handleAgentQuery = async (e, directQuery = null) => {
    if (e) e.preventDefault();
    const userMessage = directQuery || query;
    if (!userMessage.trim()) return;

    setQuery('');
    setChatHistory(prev => [...prev, { sender: 'user', text: userMessage }]);
    setLoading(true);

    const formData = new FormData();
    formData.append('query', userMessage);

    // Production Market Data Injection
    const context = dashboardData ? JSON.stringify({
      metrics: dashboardData.summary,
      temporal_insight: dashboardData.temporal_insight,
      market_costs: "1. Optimize AC schedules: ₹40,000 | 2. Change lighting schedule: ₹85,000 | 3. Rooftop solar implementation: ₹12,000,000 (12 Lakhs)"
    }) : "No telemetry data ingested yet.";

    formData.append('context', context);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/agent', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('AI Engine Timeout');

      const data = await res.json();
      setChatHistory(prev => [...prev, { sender: 'vane', text: data.response }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { sender: 'vane', text: 'SYSTEM ERROR: Gemini LLM Gateway timeout.' }]);
    } finally {
      setLoading(false);
    }
  };

  const totalEnergy = dashboardData ? dashboardData.total_kwh : 0;
  const highestSpike = dashboardData ? dashboardData.highest_spike : 0;
  const criticalNode = dashboardData ? dashboardData.critical_building : 'None';

  const savedKwh = (totalEnergy * (simulationPct / 100)).toFixed(1);
  const opexRecovered = (savedKwh * 8.5).toFixed(0);
  const co2Offset = (savedKwh * 0.82).toFixed(1);

  return (
    <div className="bg-[#090a0d] text-slate-200 font-sans antialiased min-h-screen relative overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-300 p-6 lg:p-10">

      {/* Toast Notification System */}
      {systemToast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg text-xs font-bold tracking-wide border shadow-2xl transition-all ${
          systemToast.type === 'error' ? 'bg-rose-500/10 border-rose-500/40 text-rose-300' : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
        }`}>
          {systemToast.message}
        </div>
      )}

      <input type="file" id="hidden-csv-input" accept=".csv" onChange={handleFileUpload} className="hidden" />

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-white/[0.04]">
        <div className="flex items-center gap-4">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            VANE
            <span className="relative flex h-2.5 w-2.5 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_12px_#38bdf8]"></span>
            </span>
          </span>
          <div className="h-5 w-[1px] bg-white/10 hidden sm:block"></div>
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
            Enterprise Environmental Agent
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#171920]/80 border border-white/[0.04]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">System Status</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"></span>
              <span className="text-xs font-semibold text-emerald-400 tracking-wide">SECURE / ACTIVE</span>
            </div>
          </div>
          <button
            onClick={() => document.getElementById('hidden-csv-input').click()}
            disabled={uploading}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-semibold tracking-wide transition-all border border-white/[0.06] disabled:opacity-50"
          >
            <span>{uploading ? 'Ingesting...' : 'Ingest CSV'}</span>
          </button>
        </div>
      </header>

      {/* Dynamic KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 my-7">
        <div className="rounded-2xl bg-[#171920]/90 p-5 border border-white/[0.04]">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Air (AQI)</span>
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${dashboardData?.kpis?.aqi > 150 ? 'bg-amber-500/10 text-amber-300' : 'bg-emerald-500/10 text-emerald-300'}`}>
              {dashboardData ? (dashboardData.kpis.aqi > 150 ? 'Moderate' : 'Good') : '---'}
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white">{dashboardData ? dashboardData.kpis.aqi : '--'}</div>
        </div>

        <div className={`rounded-2xl p-5 border transition-all ${highestSpike > 15 ? 'bg-[#1d1418]/90 border-rose-500/25 shadow-[0_0_15px_-3px_rgba(244,63,94,0.15)]' : 'bg-[#171920]/90 border-white/[0.04]'}`}>
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-200">Energy Load</span>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${highestSpike > 15 ? 'bg-rose-500/20 text-rose-300 animate-pulse' : 'bg-emerald-500/10 text-emerald-300'}`}>
              {highestSpike > 15 ? 'Critical Anomaly' : 'Nominal'}
            </span>
          </div>
          <div className={`text-3xl font-black flex items-end gap-1.5 ${highestSpike > 15 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {dashboardData ? totalEnergy : '--'}
            {dashboardData && <span className="text-sm font-semibold mb-1">kWh</span>}
          </div>
        </div>

        <div className="rounded-2xl bg-[#171920]/90 p-5 border border-white/[0.04]">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Water</span>
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${dashboardData?.kpis?.water_pct > 0 ? 'bg-sky-500/10 text-sky-300' : 'bg-emerald-500/10 text-emerald-300'}`}>
              {dashboardData ? (dashboardData.kpis.water_pct > 0 ? 'Elevated' : 'Optimal') : '---'}
            </span>
          </div>
          <div className="text-3xl font-extrabold text-sky-400">{dashboardData ? `+${dashboardData.kpis.water_pct}%` : '--'}</div>
        </div>

        <div className="rounded-2xl bg-[#171920]/90 p-5 border border-white/[0.04]">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Waste</span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300">
              {dashboardData ? 'Below Baseline' : '---'}
            </span>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">{dashboardData ? `${dashboardData.kpis.waste_pct}%` : '--'}</div>
        </div>
      </section>

      {/* Main Grid Layout */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <section className="rounded-2xl bg-[#171920]/90 p-6 border border-white/[0.04]">
            <h2 className="text-xs font-extrabold tracking-wider text-rose-400 uppercase mb-3">Priority Alert</h2>
            <p className="text-sm text-slate-300 mb-4">
              {dashboardData && highestSpike > 15 ? (
                <>Electricity consumption in <strong className="text-white">{criticalNode}</strong> is <span className="text-rose-400">+{highestSpike}%</span> above normal.</>
              ) : (
                <span className="text-slate-500">Awaiting telemetry ingestion to evaluate anomaly indexes.</span>
              )}
            </p>
            <button
              onClick={(e) => handleAgentQuery(e, `Investigate the +${highestSpike}% anomaly in ${criticalNode} and pinpoint the cause.`)}
              disabled={!dashboardData || loading}
              className="w-full py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-200 text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              [ Investigate Root Cause ]
            </button>
          </section>

          <section className="rounded-2xl bg-[#171920]/90 p-6 border border-white/[0.04]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Facility Breakdown</h2>
            <div className="space-y-3">
              {dashboardData ? (
                dashboardData.summary.map((b, idx) => (
                  <div key={idx} className={`p-3 border rounded-lg flex justify-between items-center text-xs ${b.status === 'CRITICAL' ? 'bg-rose-500/5 border-rose-500/20' : 'bg-black/20 border-white/5'}`}>
                    <div>
                      <div className="font-semibold text-white">{b.building}</div>
                      <div className="text-[10px] text-slate-500 font-mono">Base: {b.baseline_kwh} kWh</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-mono font-bold ${b.status === 'CRITICAL' ? 'text-rose-400' : 'text-emerald-400'}`}>{b.current_kwh} kWh</div>
                      <div className="text-[10px] text-slate-400 font-mono">{b.spike_pct > 0 ? `+${b.spike_pct}%` : `${b.spike_pct}%`}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-500 text-center py-6 border border-dashed border-white/10 rounded-lg">
                  Offline. Upload CSV.
                </div>
              )}
            </div>
          </section>

          <section className="rounded-2xl bg-[#171920]/90 p-6 border border-white/[0.04]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4">IMPACT SIMULATOR</h2>
            <div className="flex flex-col gap-3 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Target Reduction</span>
                <span className="text-cyan-400 font-mono font-bold">{simulationPct}%</span>
              </div>
              <input
                type="range" min="0" max="50" value={simulationPct}
                onChange={(e) => setSimulationPct(e.target.value)}
                disabled={!dashboardData}
                className="w-full h-1.5 bg-[#1c1f27] rounded-lg cursor-pointer accent-cyan-400 disabled:opacity-50"
              />
            </div>
            <div className="space-y-3 pt-3 border-t border-white/[0.04] text-xs">
              <div className="flex justify-between"><span className="text-slate-400">Energy Saved</span><span className="font-mono font-bold text-white">{dashboardData ? savedKwh : '--'} kWh</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Opex Recovered</span><span className="font-mono font-bold text-emerald-400">₹{dashboardData ? opexRecovered : '--'}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">CO₂ Avoided</span><span className="font-mono font-bold text-cyan-400">{dashboardData ? co2Offset : '--'} kg</span></div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          <section className="rounded-2xl bg-[#171920]/90 p-6 border border-white/[0.04]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white">
                {dashboardData ? `${criticalNode} Load Profile` : "Telemetry Load Profile"}
              </h2>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span> Current
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-slate-500"></span> Baseline
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              {dashboardData && dashboardData.chart_data ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboardData.chart_data}>
                    <defs>
                      <linearGradient id="roseGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                    <XAxis dataKey="time" stroke="#737373" fontSize={10} tickLine={false} />
                    <YAxis stroke="#737373" fontSize={10} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#111317', borderColor: '#262626', color: '#fff', fontSize: '11px' }} />
                    <Area type="monotone" dataKey="current" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#roseGrad)" />
                    <Line type="monotone" dataKey="baseline" stroke="#64748b" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-slate-500 border border-dashed border-white/10 rounded-lg">
                  Awaiting Telemetry Sync
                </div>
              )}
            </div>
          </section>

          <section className="rounded-2xl bg-[#171920]/90 border border-white/[0.04] flex flex-col overflow-hidden min-h-[420px]">
            <div className="px-6 py-4 border-b border-white/[0.04] bg-[#1c1f27]/40 flex justify-between items-center">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">Ask Vane</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-slate-300 border border-white/[0.05]">LLM: GEMINI-3.8-FLASH</span>
            </div>

            <div className="p-6 flex-1 flex flex-col gap-4 max-h-[340px] overflow-y-auto">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex flex-col gap-1.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    {msg.sender === 'user' ? 'OPERATOR' : 'VANE AGENT'}
                  </span>
                  <div className={`p-4 rounded-xl text-xs leading-relaxed max-w-lg ${
                    msg.sender === 'user' 
                      ? 'bg-cyan-500/10 border border-cyan-500/20 text-slate-200' 
                      : 'bg-[#1c1f27]/80 border border-white/[0.03] text-slate-300 font-mono whitespace-pre-wrap'
                  }`}>
                    <div dangerouslySetInnerHTML={{__html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')}} />
                  </div>
                </div>
              ))}
              {loading && (
                <div className="p-4 rounded-xl bg-[#1c1f27]/80 border border-white/[0.03] text-xs text-slate-400 animate-pulse font-mono">
                  Computing operational directives...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="px-4 pt-3 flex flex-wrap gap-2 bg-[#1c1f27]/40 border-t border-white/[0.04]">
              <button onClick={(e) => handleAgentQuery(e, "Why did our energy consumption increase this week?")} disabled={!dashboardData || loading} className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-[11px] text-slate-300 transition-colors disabled:opacity-30">
                1. Investigate
              </button>
              <button onClick={(e) => handleAgentQuery(e, "What are the three highest-impact things we can do?")} disabled={!dashboardData || loading} className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-[11px] text-slate-300 transition-colors disabled:opacity-30">
                2. Recommend
              </button>
              <button onClick={(e) => handleAgentQuery(e, "I only have ₹1 lakh. What should I prioritize?")} disabled={!dashboardData || loading} className="px-3 py-1.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-[11px] text-rose-300 transition-colors disabled:opacity-30 font-semibold">
                3. Optimize Budget
              </button>
            </div>

            <form onSubmit={handleAgentQuery} className="p-4 bg-[#1c1f27]/40 flex gap-2">
              <input
                type="text"
                placeholder={dashboardData ? "Command Vane Kernel..." : "Upload telemetry CSV to initialize..."}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={!dashboardData || loading}
                className="flex-1 py-3 px-4 rounded-xl bg-[#111317] border border-white/[0.06] text-xs text-slate-100 focus:outline-none focus:border-cyan-500/40 disabled:opacity-50"
              />
              <button type="submit" disabled={loading || !dashboardData} className="px-5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition-colors disabled:opacity-50">
                Execute
              </button>
            </form>
          </section>

        </div>
      </main>
    </div>
  );
}