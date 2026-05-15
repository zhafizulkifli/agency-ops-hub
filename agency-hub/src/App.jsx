import { useState } from "react";
import { LayoutDashboard, Users, FileText, GitBranch, Palette, Package, DollarSign, ShoppingCart, Zap, Clock, Receipt, BarChart3, TrendingUp, TrendingDown, Bell, Search, Plus, ChevronRight, CheckCircle, Circle, AlertTriangle, Mail, Phone, X, ArrowUpRight, Activity, Eye, Send, Award, Target, Building2, Filter, Star, RefreshCw, Upload, Download, Menu, ChevronDown, Repeat } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// ─── TOKENS ──────────────────────────────────────────────────────
const T = { nav:"#0C1F3F", navBorder:"rgba(255,255,255,0.08)", purple:"#6D28D9", teal:"#0D9488", orange:"#EA580C", green:"#16A34A", red:"#DC2626", amber:"#D97706", blue:"#2563EB", white:"#FFFFFF", bg:"#F8F9FC", card:"#FFFFFF", border:"#E5E8EF", textDark:"#0F172A", textMid:"#475569", textLight:"#94A3B8" };

// ─── SAMPLE DATA ─────────────────────────────────────────────────
const revData=[{m:"Jan",v:820},{m:"Feb",v:940},{m:"Mar",v:1050},{m:"Apr",v:980},{m:"May",v:1120},{m:"Jun",v:1380},{m:"Jul",v:1610}];
const propData=[{cat:"New Prod",s:620,w:280},{cat:"Promo",s:480,w:200},{cat:"Store",s:300,w:160},{cat:"Seasonal",s:220,w:120}];
const pieData=[{name:"Website",v:34,c:"#6D28D9"},{name:"Referral",v:18,c:"#0D9488"},{name:"Event",v:10,c:"#EA580C"},{name:"Cold Call",v:6,c:"#D97706"},{name:"Other",v:4,c:"#94A3B8"}];

// ─── HELPERS ─────────────────────────────────────────────────────
const Av=({i="?",c=T.purple,s=30})=>(<div style={{width:s,height:s,borderRadius:"50%",background:c,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:s*.36,fontWeight:700,flexShrink:0}}>{i}</div>);
const Bdg=({t,c="purple"})=>{const m={purple:"bg-purple-100 text-purple-700",teal:"bg-teal-100 text-teal-700",orange:"bg-orange-100 text-orange-700",green:"bg-green-100 text-green-700",red:"bg-red-100 text-red-600",blue:"bg-blue-100 text-blue-700",amber:"bg-amber-100 text-amber-700",gray:"bg-gray-100 text-gray-500"};return <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${m[c]||m.purple}`}>{t}</span>;};
const Card=({children,className=""})=>(<div className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${className}`}>{children}</div>);
const Kpi=({icon,label,value,delta,up,color,sub})=>(<Card className="p-4 flex-1 min-w-0"><div className="flex items-center justify-between mb-3"><div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:color+"18"}}><span style={{color}}>{icon}</span></div>{delta&&<span className={`text-xs font-bold flex items-center gap-0.5 ${up?"text-green-600":"text-red-500"}`}>{up?<TrendingUp size={10}/>:<TrendingDown size={10}/>}{delta}</span>}</div><div className="text-xl font-black text-gray-900">{value}</div><div className="text-xs text-gray-500 mt-0.5">{sub||label}</div></Card>);
const Prog=({v,max=100,color=T.purple})=>(<div className="flex items-center gap-2"><div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden"><div style={{width:(v/max*100)+"%",background:color,height:"100%",borderRadius:9}}/></div><span className="text-xs font-semibold" style={{color,minWidth:28}}>{v}%</span></div>);
const Step=({steps,current})=>(<div className="flex items-center gap-0">{steps.map((s,i)=>(<span key={i} className="flex items-center gap-0"><span className={`text-xs font-semibold px-2 py-1 rounded-lg ${i===current?"text-white":"i<current"?"text-green-600 bg-green-50":"text-gray-400 bg-gray-100"}`} style={i===current?{background:T.purple}:{}}>{s}</span>{i<steps.length-1&&<ChevronRight size={12} className="text-gray-300"/>}</span>))}</div>);

const COLORS=["#6D28D9","#0D9488","#EA580C","#D97706","#DC2626","#2563EB","#16A34A","#7C3AED"];

// ─── SCREEN: DASHBOARD ────────────────────────────────────────────
function Dashboard({go,role="natasha",setModal:setModalProp}){
  const [done,setDone]=useState([false,false,false,false,false]);
  return(
    <div className="flex flex-col gap-4">
      {/* Personalised Greeting */}
      {(()=>{
        const sp=typeof STAFF_PROFILES!=="undefined"&&STAFF_PROFILES[role]?STAFF_PROFILES[role]:null;
        const greeting=sp?.greeting||"Good morning. Let's make today count.";
        const color=sp?.color||"#6D28D9";
        return(
          <div className="rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden" style={{background:`linear-gradient(135deg,${color}12,${color}06)`,border:`1px solid ${color}25`}}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg flex-shrink-0 font-black text-white" style={{background:`linear-gradient(135deg,${color},${color}AA)`}}>{sp?.avatar||"VR"}</div>
            <div className="flex-1 min-w-0"><div className="text-base font-black text-gray-900 leading-snug">{greeting}</div><div className="text-xs text-gray-400 mt-1 italic truncate">"{sp?.quote||"Let's go."}"</div></div>
            <button onClick={()=>setModalProp&&setModalProp("target")} className="px-4 py-2 rounded-xl text-sm font-bold text-white flex-shrink-0" style={{background:color}}>🎯</button>
          </div>
        );
      })()}
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<Users size={18}/>} label="New Leads" value="28" delta="↑18%" up color={T.purple} sub="vs last 7 days"/>
        <Kpi icon={<FileText size={18}/>} label="Active Proposals" value="14" delta="↑12%" up color={T.teal} sub="vs last 7 days"/>
        <Kpi icon={<Target size={18}/>} label="Monthly Target" value="RM 850K" sub="65% achieved — RM 552K done" color={T.orange}/>
        <Kpi icon={<Activity size={18}/>} label="Pipeline Value" value="RM 1.61M" delta="↑14%" up color={T.green} sub="vs last 30 days"/>
      </div>
      {/* Middle row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pipeline summary */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3"><span className="font-bold text-gray-900">Sales Pipeline</span><button onClick={()=>go("pipeline")} className="text-xs text-purple-600 font-semibold flex items-center gap-1">View <ArrowUpRight size={11}/></button></div>
          {[{l:"Qualified",v:"RM 620K",n:13,c:T.purple},{l:"Proposal Sent",v:"RM 410K",n:11,c:T.orange},{l:"Negotiation",v:"RM 260K",n:6,c:T.teal},{l:"Closed Won",v:"RM 320K",n:8,c:T.green}].map(s=>(
            <div key={s.l} className="flex items-center gap-3 py-1.5 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{background:s.c}}/>
              <div className="flex-1 text-sm font-medium text-gray-700">{s.l}<span className="text-gray-400 text-xs ml-1">({s.n})</span></div>
              <span className="text-sm font-bold text-gray-900">{s.v}</span>
            </div>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-2"><div className="text-xs text-gray-500">Total</div><div className="text-xl font-black text-gray-900">RM 1.61M</div></div>
        </Card>
        {/* Priorities */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3"><span className="font-bold text-gray-900">Today's Priorities</span><span className="text-xs text-gray-400">{done.filter(Boolean).length}/5 done</span></div>
          {[{t:"Follow up AEON BIG — pricing discussion",p:"High",tm:"9AM"},{t:"Send proposal to MYDIN",p:"High",tm:"11AM"},{t:"Call KK Mart Procurement",p:"Med",tm:"2PM"},{t:"Jaya Grocer solution demo prep",p:"Med",tm:"4PM"},{t:"Update monthly forecast",p:"Low",tm:"5:30PM"}].map((task,i)=>(
            <div key={i} onClick={()=>setDone(d=>{const n=[...d];n[i]=!n[i];return n;})} className="flex items-start gap-2.5 py-1.5 cursor-pointer group">
              {done[i]?<CheckCircle size={15} className="text-green-500 mt-0.5 flex-shrink-0"/>:<Circle size={15} className="text-gray-200 group-hover:text-purple-400 mt-0.5 flex-shrink-0"/>}
              <span className={`text-sm flex-1 ${done[i]?"line-through text-gray-300":"text-gray-700"}`}>{task.t}</span>
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 ${task.p==="High"?"bg-red-100 text-red-600":task.p==="Med"?"bg-amber-100 text-amber-600":"bg-gray-100 text-gray-400"}`}>{task.p}</span>
            </div>
          ))}
        </Card>
        {/* AI Alerts */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3"><span className="text-lg">🤖</span><span className="font-bold text-gray-900">AI Alerts</span><span className="ml-auto bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">3</span></div>
          {[{t:"MYDIN DBP not submitted — in-charge in 14 days",c:"red",icon:"⚠️"},{t:"Sarah Lee overloaded — 52hrs assigned this week",c:"amber",icon:"👩‍💻"},{t:"AEON BIG proposal not opened after 3 days",c:"blue",icon:"📧"},{t:"KK Mart campaign ended — Exposure Report due",c:"purple",icon:"📊"}].map((a,i)=>(
            <div key={i} className={`flex items-start gap-2 p-2.5 rounded-xl mb-2 ${a.c==="red"?"bg-red-50 border border-red-100":a.c==="amber"?"bg-amber-50 border border-amber-100":a.c==="blue"?"bg-blue-50 border border-blue-100":"bg-purple-50 border border-purple-100"}`}>
              <span className="flex-shrink-0 text-sm">{a.icon}</span>
              <span className="text-xs text-gray-700 leading-snug">{a.t}</span>
            </div>
          ))}
        </Card>
      </div>
      {/* Revenue Chart */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3"><span className="font-bold text-gray-900">Revenue Trend (RM '000)</span><button onClick={()=>go("reports")} className="text-xs text-purple-600 font-semibold">Full Report →</button></div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={revData}><XAxis dataKey="m" tick={{fontSize:11,fill:"#94A3B8"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:11,fill:"#94A3B8"}} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}M`}/><Tooltip formatter={v=>`RM ${v}K`} contentStyle={{borderRadius:10,border:"none",boxShadow:"0 8px 30px rgba(0,0,0,0.12)"}}/><Bar dataKey="v" fill={T.purple} radius={[5,5,0,0]} opacity={0.85}/></BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

// ─── SCREEN: LEADS / CRM ──────────────────────────────────────────
function Leads(){
  const rows=[
    {name:"Jessica Martin",co:"AEON BIG",src:"Website",score:92,owner:"NT",next:"Follow up call · Today 9AM",status:"New",c:0},
    {name:"Ravi Pillai",co:"MYDIN",src:"Referral",score:78,owner:"AR",next:"Proposal discussion · Today 11AM",status:"Qualified",c:1},
    {name:"Siti Khadijah",co:"KK Mart",src:"Event",score:65,owner:"FL",next:"Product demo · Tomorrow 10AM",status:"Follow-Up",c:2},
    {name:"Jaya Grocer Team",co:"Jaya Grocer",src:"Website",score:88,owner:"NT",next:"Send proposal · Tomorrow 2PM",status:"Qualified",c:3},
    {name:"Daniel Lee",co:"Fresh Mart",src:"Cold Call",score:45,owner:"AR",next:"Intro call · May 20 4PM",status:"New",c:4},
  ];
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<Users size={18}/>} label="New Leads" value="28" delta="↑18%" up color={T.purple} sub="vs last 7 days"/>
        <Kpi icon={<CheckCircle size={18}/>} label="Qualified" value="41" delta="↑15%" up color={T.teal} sub="vs last 7 days"/>
        <Kpi icon={<Target size={18}/>} label="Follow-Ups Today" value="12" color={T.orange} sub="view today's follow-ups →"/>
        <Kpi icon={<Activity size={18}/>} label="Conversion Rate" value="14.6%" delta="↑2.3%" up color={T.green} sub="vs last 30 days"/>
      </div>
      <Card>
        <div className="flex items-center gap-2 p-4 border-b border-gray-100 flex-wrap gap-y-2">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 min-w-[180px]"><Search size={13} className="text-gray-400"/><input className="bg-transparent text-sm outline-none flex-1" placeholder="Search leads..."/></div>
          {["Source","Status","Owner","Score"].map(f=><button key={f} className="flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50">{f}<ChevronDown size={11}/></button>)}
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white font-bold ml-auto" style={{background:T.purple}}><Plus size={13}/>Add Lead</button>
        </div>
        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-gray-50">
          {rows.map((r,i)=>(
            <div key={i} className="p-4 flex items-start gap-3">
              <Av i={r.name.split(" ").map(n=>n[0]).join("").slice(0,2)} c={COLORS[r.c]} s={38}/>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between"><div className="text-sm font-bold text-gray-900">{r.name}</div><Bdg t={r.status} c={r.status==="New"?"blue":r.status==="Qualified"?"green":"orange"}/></div>
                <div className="text-xs text-gray-500">{r.co} · {r.src}</div>
                <div className="text-xs text-gray-500 mt-1">{r.next}</div>
                <Prog v={r.score} color={r.score>80?T.green:r.score>60?T.amber:T.red}/>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-gray-100">{["Lead","Company","Source","Score","Owner","Next Action","Status",""].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map((r,i)=>(
                <tr key={i} className="hover:bg-purple-50/20 cursor-pointer">
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><Av i={r.name.split(" ").map(n=>n[0]).join("").slice(0,2)} c={COLORS[r.c]} s={32}/><div><div className="text-sm font-semibold text-gray-800 whitespace-nowrap">{r.name}</div></div></div></td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{r.co}</td>
                  <td className="px-4 py-3"><Bdg t={r.src} c={r.src==="Website"?"blue":r.src==="Referral"?"green":"orange"}/></td>
                  <td className="px-4 py-3 w-32"><Prog v={r.score} color={r.score>80?T.green:r.score>60?T.amber:T.red}/></td>
                  <td className="px-4 py-3"><Av i={r.owner} c={COLORS[i]} s={26}/></td>
                  <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{r.next}</td>
                  <td className="px-4 py-3"><Bdg t={r.status} c={r.status==="New"?"blue":r.status==="Qualified"?"green":"orange"}/></td>
                  <td className="px-4 py-3"><div className="flex gap-1"><button className="p-1.5 hover:bg-purple-100 rounded-lg"><Mail size={13} className="text-purple-500"/></button><button className="p-1.5 hover:bg-green-100 rounded-lg"><Phone size={13} className="text-green-500"/></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[{l:"Add Lead",c:T.purple,i:"👤"},{l:"Assign Owner",c:T.teal,i:"👥"},{l:"Schedule Follow-Up",c:T.orange,i:"📅"},{l:"Send Email",c:T.amber,i:"📧"}].map(a=>(
          <button key={a.l} className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-white font-bold text-sm" style={{background:a.c}}>{a.i} {a.l}</button>
        ))}
      </div>
    </div>
  );
}

// ─── SCREEN: BRIEF MANAGEMENT ────────────────────────────────────
function Brief(){
  const briefs=[
    {client:"AEON BIG",campaign:"Raya 2025 Brand Campaign",obj:"Brand awareness + product launch",channels:"OOH + Digital + Radio",budget:"RM 500,000",period:"1 Apr – 30 Apr 2025",deadline:"Mar 10",status:"Proposal Sent",c:0},
    {client:"MYDIN",campaign:"Mid-Year Sale Campaign",obj:"Drive footfall and sales",channels:"OOH + Print + Digital",budget:"RM 300,000",period:"1 Jun – 30 Jun 2025",deadline:"May 20",status:"In Progress",c:1},
    {client:"KK Mart",campaign:"Store Launch — Klang",obj:"New store awareness",channels:"OOH + Social Media",budget:"RM 150,000",period:"15 Jun – 15 Jul 2025",deadline:"May 28",status:"New",c:2},
    {client:"Jaya Grocer",campaign:"Q3 Brand Refresh",obj:"Brand repositioning",channels:"Digital + OOH",budget:"RM 200,000",period:"1 Jul – 30 Sep 2025",deadline:"Jun 5",status:"New",c:3},
  ];
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<FileText size={18}/>} label="Total Briefs" value="12" color={T.purple} sub="this month"/>
        <Kpi icon={<Activity size={18}/>} label="In Progress" value="5" color={T.teal} sub="proposals being built"/>
        <Kpi icon={<AlertTriangle size={18}/>} label="Deadline This Week" value="3" color={T.orange} sub="urgent attention needed"/>
        <Kpi icon={<CheckCircle size={18}/>} label="Converted" value="7" delta="58%" up color={T.green} sub="to proposals"/>
      </div>
      {/* AI Brief Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3"><span className="text-lg">🤖</span><span className="font-bold text-gray-900">AI Brief Extraction</span><Bdg t="Live" c="green"/></div>
          <p className="text-sm text-gray-500 mb-3">When a brief arrives via email, Claude AI auto-extracts these fields:</p>
          <div className="grid grid-cols-2 gap-2">
            {[{f:"Campaign Objective",e:"Brand awareness — new product launch"},{f:"Target Audience",e:"Women 25–45, urban, SEC A/B"},{f:"Channels Requested",e:"OOH + Digital + Radio"},{f:"Budget Indication",e:"RM 300,000"},{f:"Campaign Period",e:"1 Jul – 31 Aug 2025"},{f:"KPIs",e:"Reach 2M, 40% brand recall"},{f:"Decision Maker",e:"Andrew Lim, Head of Marketing"},{f:"Proposal Deadline",e:"5 working days (auto)"}].map(f=>(
              <div key={f.f} className="bg-gray-50 rounded-lg p-2">
                <div className="text-xs font-bold text-purple-600">{f.f}</div>
                <div className="text-xs text-gray-600 mt-0.5">{f.e}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <div className="font-bold text-gray-900 mb-3">Auto-Triggers on Receipt</div>
          {[{icon:"✅",t:"Brief record created & linked to project"},{icon:"📋",t:"Auto-task for Channel Team: prepare proposal"},{icon:"🔔",t:"Notification sent to Channel Team Lead"},{icon:"⏳",t:"Countdown timer begins — deadline tracking"},{icon:"⚠️",t:"Escalation if proposal not started in 48hrs"},{icon:"🚨",t:"2nd escalation to Director — 2 days before deadline"}].map((s,i)=>(
            <div key={i} className="flex items-start gap-2.5 py-2 border-b border-gray-50 last:border-0">
              <span className="text-base flex-shrink-0">{s.icon}</span>
              <span className="text-sm text-gray-600">{s.t}</span>
            </div>
          ))}
        </Card>
      </div>
      {/* Brief list */}
      <Card>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-bold text-gray-900">Active Briefs</span>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white font-bold" style={{background:T.purple}}><Plus size={13}/>New Brief</button>
        </div>
        <div className="divide-y divide-gray-50">
          {briefs.map((b,i)=>(
            <div key={i} className="p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0" style={{background:COLORS[b.c]}}>{b.client.slice(0,2)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap"><span className="text-sm font-bold text-gray-900">{b.client}</span><span className="text-sm text-gray-600">—</span><span className="text-sm text-gray-700 truncate">{b.campaign}</span><Bdg t={b.status} c={b.status==="New"?"blue":b.status==="In Progress"?"teal":"green"}/></div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {[{l:"Objective",v:b.obj},{l:"Channels",v:b.channels},{l:"Budget",v:b.budget},{l:"Deadline",v:b.deadline}].map(f=>(
                      <div key={f.l}><div className="text-xs text-gray-400">{f.l}</div><div className="text-xs font-semibold text-gray-700 truncate">{f.v}</div></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}



// ─── DOCUMENT TEMPLATE PREVIEWS ──────────────────────────────────
function ProposalPreview({onClose, client="AEON BIG", campaign="Raya 2026 OOH Campaign", preparedBy="Natasha Tan"}){
  const sites=[
    {id:"VR0315",loc:"Jalan Bukit Bintang, near Pavilion KL",size:"18×12ft",px:"768×384px",eyeballs:"12.6M/mo",traffic:"10.5M/mo",hours:"6am–12am",dur6:"",dur12:"",pubRate:"",bestRate:"",sst:"",total:""},
    {id:"VR0707",loc:"Sprint Highway, near Damansara Intan",size:"32×21.5ft",px:"960×672px",eyeballs:"8.64M/mo",traffic:"7.2M/mo",hours:"6.30am–12.30am",dur6:"",dur12:"",pubRate:"",bestRate:"",sst:"",total:""},
    {id:"VR4401",loc:"Jalan Tun Razak/Jalan Ampang towards KLCC/TRX",size:"60×40ft",px:"TBA",eyeballs:"7.6M/mo",traffic:"6.33M/mo",hours:"6.30am–12.30am",dur6:"",dur12:"",pubRate:"",bestRate:"",sst:"",total:""},
  ];
  return(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 md:p-6" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="w-full max-w-3xl max-h-[92vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        {/* Dark cover */}
        <div className="flex-shrink-0 p-6 relative" style={{background:"linear-gradient(145deg,#0a0f1e 0%,#0C1F3F 50%,#0d2a1a 100%)"}}>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20"><X size={14}/></button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm" style={{background:"linear-gradient(135deg,#00D4AA,#0089CC)"}}>VR</div>
            <div className="text-white/40 text-xs tracking-widest uppercase">Visual EFX Sdn Bhd</div>
          </div>
          <div className="text-white/60 text-xs tracking-widest uppercase mb-1">Proposal</div>
          <div className="text-white text-lg font-black leading-tight mb-1">Digital Out-of-Home Advertising</div>
          <div className="text-teal-300 text-xl font-black">{campaign}</div>
          <div className="text-white/50 text-xs mt-2">Prepared for: {client} · Prepared by: {preparedBy} · {new Date().toLocaleDateString('en-MY',{day:'numeric',month:'long',year:'numeric'})}</div>
        </div>

        <div className="flex-1 overflow-y-auto bg-white">
          {/* Proposal Summary */}
          <div className="p-5 border-b border-gray-100">
            <div className="font-black text-gray-900 text-base mb-3">Proposal Summary</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl p-4" style={{background:"#0C1F3F"}}>
                <div className="text-teal-400 text-xs font-bold uppercase tracking-wide mb-2">Objective</div>
                <div className="text-white text-sm leading-relaxed">To build strong brand awareness for {client} during the {campaign.replace('OOH Campaign','').replace('Campaign','').trim()} season. To strategically position the brand across high-traffic areas in Kuala Lumpur and Selangor.</div>
              </div>
              <div className="rounded-xl p-4" style={{background:"#1a3060"}}>
                <div className="text-teal-400 text-xs font-bold uppercase tracking-wide mb-2">Strategy</div>
                <div className="text-white text-sm leading-relaxed">Execute a DOOH campaign targeting high-traffic areas. Deploy digital screens mapped for optimal visibility. Leverage digital formats for dynamic messaging and real-time engagement.</div>
              </div>
            </div>
          </div>

          {/* Campaign Strategy */}
          <div className="p-5 border-b border-gray-100 bg-gray-50">
            <div className="font-black text-gray-900 mb-2">Campaign Strategy — 1 Month (2+2 Week Approach)</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[{phase:"Before Opening (2 Weeks)",label:"Teaser & Awareness",color:"#EA580C",points:["Build brand presence before campaign launches","Create curiosity and excitement","Drive early social media engagement","Influence decision-makers early"]},{phase:"After Opening (2 Weeks)",label:"Momentum & Conversion",color:"#0D9488",points:["Sustain momentum with real campaign visuals","Establish credibility through 'Now Live' messaging","Encourage immediate response and engagement","Leverage post-launch visuals for undecided prospects"]}].map((p,i)=>(
                <div key={i} className="rounded-xl p-4 border-l-4" style={{borderColor:p.color,background:p.color+"08"}}>
                  <div className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{color:p.color}}>{p.phase}</div>
                  <div className="font-bold text-gray-800 text-sm mb-2">{p.label}</div>
                  {p.points.map((pt,j)=><div key={j} className="flex items-start gap-1.5 text-xs text-gray-600 mb-1"><span style={{color:p.color}}>✓</span>{pt}</div>)}
                </div>
              ))}
            </div>
          </div>

          {/* Site Details */}
          <div className="p-5">
            <div className="font-black text-gray-900 mb-3">Proposed Media Locations</div>
            {sites.map((s,i)=>(
              <div key={i} className="mb-5 rounded-xl overflow-hidden border border-gray-200">
                <div className="px-4 py-2 font-bold text-sm" style={{background:"#0C1F3F",color:"#00D4AA"}}>{s.id} — {s.loc}</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
                  {[{l:"Media Format",v:"DOOH"},{l:"Screen Size",v:s.size},{l:"Pixel Specs",v:s.px},{l:"Operating Hours",v:s.hours},{l:"Est. Eyeballs/mo",v:s.eyeballs},{l:"Est. Traffic/mo",v:s.traffic}].map(f=>(
                    <div key={f.l} className="p-2.5 border-b border-r border-gray-100">
                      <div className="text-xs text-gray-400">{f.l}</div>
                      <div className="text-xs font-bold text-gray-800">{f.v}</div>
                    </div>
                  ))}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr style={{background:"#0C1F3F"}}>{["Location","Size (H'×W')","Material Spec","Duration","Published Rate (RM)","Best Rate (RM)","6% SST (RM)","Total (RM)"].map(h=><th key={h} className="px-3 py-2 text-left font-semibold whitespace-nowrap" style={{color:"rgba(255,255,255,0.7)"}}>{h}</th>)}</tr></thead>
                    <tbody>
                      {["6 months","12 months"].map((dur,j)=>(
                        <tr key={j} className="border-b border-gray-100">
                          {j===0&&<td className="px-3 py-2 text-gray-600" rowSpan={2}>{s.loc}</td>}
                          {j===0&&<td className="px-3 py-2 text-gray-600 whitespace-nowrap" rowSpan={2}>{s.size}</td>}
                          {j===0&&<td className="px-3 py-2 font-mono text-gray-500 whitespace-nowrap" rowSpan={2}>{s.px}</td>}
                          <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{dur}</td>
                          <td className="px-3 py-2 text-gray-400 italic">To be quoted</td>
                          <td className="px-3 py-2 text-gray-400 italic">Negotiated</td>
                          <td className="px-3 py-2 text-gray-400 italic">6% SST</td>
                          <td className="px-3 py-2 text-gray-400 italic">—</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 pb-5 text-xs text-gray-400 italic border-t border-gray-100 pt-3">Private & Confidential · Copyright © 2026 · Properties of Visual EFX Sdn Bhd (1104483-H)</div>
        </div>
      </div>
    </div>
  );
}

function MediaOrderPreview({onClose, client="AEON BIG", contact="Andrew Lim", phone="012-3456789", email="andrew@aeonbig.com", campaign="Raya 2026 OOH", preparedBy="Shazia Ali"}){
  const today=new Date().toLocaleDateString('en-MY',{day:'2-digit',month:'2-digit',year:'numeric'});
  const quotNo=`SA/${client.replace(/\s/g,'').toUpperCase().slice(0,4)}/${new Date().getDate()}${String(new Date().getMonth()+1).padStart(2,'0')}${String(new Date().getFullYear()).slice(2)}`;
  const sites=[
    {item:1,code:"VR0315",loc:"Jalan Bukit Bintang, near Pavilion KL",size:"768×384px",rate:22000},
    {item:2,code:"VR0707",loc:"Sprint Highway, near Damansara Intan",size:"960×672px",rate:18000},
    {item:3,code:"VR4401",loc:"Jalan Tun Razak/Jalan Ampang, towards KLCC/TRX",size:"TBA",rate:32000},
  ];
  const total=sites.reduce((a,s)=>a+s.rate,0);
  const comm=total*0.1;
  const net=total-comm;
  return(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 md:p-6" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="w-full max-w-3xl max-h-[92vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl bg-white">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0">
          <span className="font-black text-gray-900">Media Order Preview</span>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200"><X size={14}/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-xs" style={{background:"linear-gradient(135deg,#00D4AA,#0089CC)"}}>VR</div>
                <div className="font-black text-gray-900 text-base">VISUAL EFX SDN BHD</div>
              </div>
              <div className="text-xs text-gray-400">Company No: 1104483-H</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Date: {today}</div>
              <div className="text-xs text-gray-500 mt-0.5">Quot No: {quotNo}</div>
            </div>
          </div>
          {/* Client Info */}
          <div className="grid grid-cols-2 gap-3 mb-4 bg-gray-50 rounded-xl p-4">
            {[{l:"Company",v:client},{l:"Attn",v:contact},{l:"Contact",v:phone},{l:"Email",v:email},{l:"Ref",v:`VR/${client.replace(/\s/g,'').toUpperCase().slice(0,4)} (${campaign})`}].map(f=>(
              <div key={f.l} className="flex gap-2">
                <span className="text-xs font-bold text-gray-500 w-16 flex-shrink-0">{f.l}</span>
                <span className="text-xs text-gray-800">: {f.v}</span>
              </div>
            ))}
          </div>
          {/* Items Table */}
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-xs border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="text-white" style={{background:"#0C1F3F"}}>{["Item","Site Code","Location Details","Material Size","Duration","Best Rate","TOTAL"].map(h=><th key={h} className="px-3 py-2.5 text-left font-semibold whitespace-nowrap">{h}</th>)}</tr></thead>
              <tbody>
                {sites.map((s,i)=>(
                  <tr key={i} className={i%2===0?"bg-white":"bg-gray-50"}>
                    <td className="px-3 py-2.5 text-center font-bold text-gray-600">{s.item}</td>
                    <td className="px-3 py-2.5 font-bold text-teal-700 whitespace-nowrap">{s.code}</td>
                    <td className="px-3 py-2.5 text-gray-700">{s.loc}</td>
                    <td className="px-3 py-2.5 font-mono text-gray-500 whitespace-nowrap">{s.size}</td>
                    <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">2 Weeks</td>
                    <td className="px-3 py-2.5 font-bold text-gray-800 whitespace-nowrap">RM {s.rate.toLocaleString()}.00</td>
                    <td className="px-3 py-2.5 font-bold text-gray-800 whitespace-nowrap">RM {s.rate.toLocaleString()}.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* In-charge date */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-2 text-xs font-bold text-teal-800 mb-4">
            IN-CHARGE DATE: {new Date(Date.now()+14*24*60*60*1000).toLocaleDateString('en-MY',{day:'2-digit',month:'2-digit',year:'numeric'})} – {new Date(Date.now()+28*24*60*60*1000).toLocaleDateString('en-MY',{day:'2-digit',month:'2-digit',year:'numeric'})}
          </div>
          {/* Totals */}
          <div className="flex justify-end mb-4">
            <div className="w-64">
              {[{l:"Total:",v:`RM ${total.toLocaleString()}.00`,bold:false},{l:"10% Commission",v:`RM ${comm.toLocaleString()}.00`,bold:false},{l:"Net Media Cost",v:`RM ${net.toLocaleString()}.00`,bold:true}].map((r,i)=>(
                <div key={i} className={`flex justify-between py-1 ${i===2?"border-t-2 border-gray-900 font-black":"border-t border-gray-200"}`}>
                  <span className="text-xs text-gray-600">{r.l}</span>
                  <span className={`text-xs ${r.bold?"font-black text-gray-900":"font-semibold text-gray-700"}`}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
          {/* T&Cs abbreviated */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="text-xs font-black text-gray-700 mb-2">TERMS & CONDITIONS</div>
            {["1. Order Confirmation — All media bookings are subject to written confirmation by Visual EFX Sdn Bhd. This signed & stamped media order constitutes confirmation of booking.",
              "2. Payment Terms — All invoices payable within ninety (90) days from invoice date. Late payment charge of 1.5% per month applies on overdue amounts.",
              "3. Cancellation — All cancellations must be submitted in writing at least four (4) weeks prior to campaign commencement. 10% cancellation fee applies upon confirmation.",
              "7. Reporting & Performance — This campaign is eligible for an Exposure Report & Proof of Play only."].map((t,i)=>(
              <div key={i} className="text-xs text-gray-500 mb-1.5 leading-relaxed">{t}</div>
            ))}
          </div>
          {/* Signatures */}
          <div className="grid grid-cols-2 gap-6">
            {[{label:"Prepared by",name:preparedBy,desig:"Campaign Specialist",date:`${new Date().getDate()}th ${new Date().toLocaleDateString('en-MY',{month:'long'})} ${new Date().getFullYear()}`},{label:"Accepted by",name:"",desig:"",date:""}].map((sig,i)=>(
              <div key={i} className="border-t-2 border-gray-300 pt-3">
                <div className="text-xs font-bold text-gray-500 mb-2">{sig.label}:</div>
                {sig.name&&<div className="font-black text-gray-800 italic text-base mb-1" style={{fontFamily:"cursive"}}>{sig.name}</div>}
                <div className="text-xs text-gray-600">Name: {sig.name||"_________________"}</div>
                <div className="text-xs text-gray-600 mt-0.5">Designation: {sig.desig||"_________________"}</div>
                <div className="text-xs text-gray-600 mt-0.5">Date: {sig.date||"_________________"}</div>
                {i===1&&<div className="text-xs text-gray-600 mt-0.5">Company Stamp:</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BriefFormPreview({onClose}){
  const [form,setForm]=useState({dateSubmit:"",salesPerson:"",client:"",brand:"",poc:"",deadline:"",campaign:"",objective:"",duration:"",budget:"",sites:"",audience:[],mediaType:[],format:"",proposalType:"",strategy:[]});
  const upd=(k,v)=>setForm(f=>({...f,[k]:v}));
  const toggleArr=(k,v)=>setForm(f=>({...f,[k]:f[k].includes(v)?f[k].filter(x=>x!==v):[...f[k],v]}));
  const labelStyle="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1";
  const inputStyle="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-400 transition-colors bg-white";
  return(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 md:p-6" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="w-full max-w-3xl max-h-[92vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl bg-white">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0" style={{background:"#0C1F3F"}}>
          <div>
            <div className="text-white font-black text-base">Channel Team — Sales Brief Request Form</div>
            <div className="text-white/50 text-xs">Please complete all fields before submitting. Incomplete briefs will not be processed.</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20"><X size={14}/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
          {/* Section A */}
          <div><div className="flex items-center gap-2 mb-3"><div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{background:"#0C1F3F"}}>A</div><div className="font-black text-gray-900 text-sm">Client & Submission Details</div></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[{l:"Date of Submission",k:"dateSubmit",type:"date"},{l:"Sales Person Name & Team",k:"salesPerson"},{l:"Client / Company Name",k:"client"},{l:"Brand Name",k:"brand"},{l:"Agency (if applicable)",k:"agency"},{l:"Point of Contact (Name & Email)",k:"poc"},{l:"Proposal Deadline / Pitch Date",k:"deadline",type:"date"}].map(f=>(
                <div key={f.k}><label className={labelStyle}>{f.l}</label><input type={f.type||"text"} className={inputStyle} onChange={e=>upd(f.k,e.target.value)} placeholder={f.l}/></div>
              ))}
            </div>
          </div>
          {/* Section B */}
          <div><div className="flex items-center gap-2 mb-3"><div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{background:"#0C1F3F"}}>B</div><div className="font-black text-gray-900 text-sm">Campaign Details</div></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[{l:"Campaign Name",k:"campaign"},{l:"Campaign Objective",k:"objective"},{l:"Campaign Duration",k:"duration"},{l:"Budget Indication (min. RM100K)",k:"budget"},{l:"No. of Sites / Screens (approx.)",k:"sites"}].map(f=>(
                <div key={f.k}><label className={labelStyle}>{f.l}</label><input type="text" className={inputStyle} onChange={e=>upd(f.k,e.target.value)} placeholder={f.l}/></div>
              ))}
            </div>
          </div>
          {/* Section C */}
          <div><div className="flex items-center gap-2 mb-3"><div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{background:"#0C1F3F"}}>C</div><div className="font-black text-gray-900 text-sm">Target Audience (Select up to 3)</div></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {["Young Adults (18–25)","Working Professionals (26–40)","Mature Adults (41–55)","Seniors (55+)","Parents / Families","Students / Campus Crowd","High-Income Individuals","Tourists & Travellers","Business Decision Makers","Health & Wellness Enthusiasts","Tech-Savvy Consumers","Upscale Shoppers"].map(a=>(
                <label key={a} className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer text-xs transition-all ${form.audience.includes(a)?"border-purple-400 bg-purple-50":"border-gray-200 bg-white hover:bg-gray-50"}`}>
                  <input type="checkbox" checked={form.audience.includes(a)} onChange={()=>toggleArr("audience",a)} className="accent-purple-600"/>
                  <span className="font-medium text-gray-700">{a}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Section D */}
          <div><div className="flex items-center gap-2 mb-3"><div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{background:"#0C1F3F"}}>D</div><div className="font-black text-gray-900 text-sm">Preferred Locations / Geography</div></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[{l:"Preferred States / Cities",k:"prefStates"},{l:"Specific Areas / Landmarks",k:"landmarks"},{l:"Locations to EXCLUDE",k:"exclude"}].map(f=>(
                <div key={f.k}><label className={labelStyle}>{f.l}</label><textarea className={inputStyle+" resize-none"} rows={2} onChange={e=>upd(f.k,e.target.value)} placeholder={f.l}/></div>
              ))}
            </div>
          </div>
          {/* Section E */}
          <div><div className="flex items-center gap-2 mb-3"><div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{background:"#0C1F3F"}}>E</div><div className="font-black text-gray-900 text-sm">Media Type & Medium (Select up to 3)</div></div>
            <div className="flex gap-3 mb-3 flex-wrap">
              {["Static (Traditional Billboard)","DOOH (Digital Out-of-Home)","Both Static & DOOH"].map(t=>(
                <label key={t} className={`flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer text-xs transition-all ${form.mediaType.includes(t)?"border-teal-400 bg-teal-50":"border-gray-200"}`}>
                  <input type="checkbox" checked={form.mediaType.includes(t)} onChange={()=>toggleArr("mediaType",t)} className="accent-teal-600"/>
                  <span className="font-medium text-gray-700">{t}</span>
                </label>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {["Large Format","Spectacular Format","Shopping Malls","Transits","Office","Residential","Cinemas","Campus","Government Screens","Retail Screens"].map(f=>(
                <label key={f} className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer text-xs transition-all ${form.format===f?"border-orange-400 bg-orange-50":"border-gray-200"}`}>
                  <input type="radio" name="format" checked={form.format===f} onChange={()=>upd("format",f)} className="accent-orange-500"/>
                  <span className="font-medium text-gray-700">{f}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Section F */}
          <div><div className="flex items-center gap-2 mb-3"><div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{background:"#0C1F3F"}}>F</div><div className="font-black text-gray-900 text-sm">Proposal Requirements</div></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelStyle}>Type of Proposal Needed</label>
                {["Mapping + Site Reference Only","Full Strategy + Mapping + Site Reference","Re-negotiation of Pricing (DOOH)"].map(t=>(
                  <label key={t} className="flex items-center gap-2 mb-2 cursor-pointer"><input type="radio" name="propType" className="accent-purple-600"/><span className="text-xs text-gray-700">{t}</span></label>
                ))}
              </div>
              <div><label className={labelStyle}>Proposal Format</label>
                {["Menu-Card Style (Up to 3 options)","Custom Package (1 tailored option)"].map(t=>(
                  <label key={t} className="flex items-center gap-2 mb-2 cursor-pointer"><input type="radio" name="propFmt" className="accent-purple-600"/><span className="text-xs text-gray-700">{t}</span></label>
                ))}
              </div>
            </div>
            <div className="mt-3"><label className={labelStyle}>Specific Must-Haves / Additional Context</label><textarea className={inputStyle+" resize-none"} rows={3} placeholder="Mandatory sites, previous campaigns, creative concept ideas..."/></div>
          </div>
          {/* Section H — SLA */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3"><div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{background:"#0C1F3F"}}>H</div><div className="font-black text-gray-900 text-sm">SLA — Turnaround Times</div></div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="bg-gray-200">{["Type","Commercial","Channel","Total"].map(h=><th key={h} className="px-3 py-2 text-left font-bold text-gray-600">{h}</th>)}</tr></thead>
                <tbody>
                  {[["Mapping + Site Reference Only","0 days","1–2 days","1–2 days"],["Full Strategy + Mapping","0 days","3–5 days","3–5 days"],["Re-negotiation of Pricing","1–2 days","2–3 days","2–3 days"],["Retail/Event Activation","1 day","5–7 days","5–7 days"]].map((r,i)=>(
                    <tr key={i} className={i%2===0?"bg-white":"bg-gray-50"}>
                      {r.map((c,j)=><td key={j} className={`px-3 py-2 ${j===0?"font-semibold text-gray-700":"text-gray-600"}`}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-xs text-gray-400 mt-2">* All timelines in working days. Cut-off time is 12:00PM. Urgent requests require mutual agreement between Commercial and Channel.</div>
          </div>
          <button className="w-full py-3 rounded-xl text-white font-bold text-sm" style={{background:"#0C1F3F"}}>Submit Brief to Channel Team →</button>
        </div>
      </div>
    </div>
  );
}


// ─── SCREEN: PROPOSAL BUILDER (WITH DEMO FLOW) ───────────────────
function Proposals(){
  const [demoOpen,setDemoOpen]=useState(false);
  const [docModal,setDocModal]=useState(null);
  const [demoStage,setDemoStage]=useState(0);
  const rows=[
    {title:"AEON BIG – Raya 2026 Campaign",client:"AEON BIG",value:"RM 350K",owner:"Natasha Tan",sent:"May 7",viewed:"Viewed May 8, 9:21AM",stage:"Awaiting Approval",sc:"amber",ver:"v2",c:0},
    {title:"MYDIN – Store Operations Transformation",client:"MYDIN",value:"RM 210K",owner:"Jason Doe",sent:"May 6",viewed:"Opened May 6, 4:32PM",stage:"Under Review",sc:"blue",ver:"v1",c:1},
    {title:"KK Mart – Inventory & Demand Planning",client:"KK Mart",value:"RM 160K",owner:"Sarah Lee",sent:"May 5",viewed:"Not Viewed",stage:"Submitted",sc:"purple",ver:"v1",c:2},
    {title:"Jaya Grocer – Pricing Strategy Proposal",client:"Jaya Grocer",value:"RM 190K",owner:"Marcus Tee",sent:"May 3",viewed:"Viewed May 3",stage:"Under Review",sc:"blue",ver:"v3",c:3},
    {title:"AEON BIG – Marketing Partnership",client:"AEON BIG",value:"RM 120K",owner:"Natasha Tan",sent:"May 1",viewed:"Not Viewed",stage:"Draft",sc:"gray",ver:"v1",c:0},
  ];

  const demoStages=[
    {step:1,label:"Brief Received",dept:"Sales",who:"Natasha Tan",date:"May 1, 9:15AM",detail:"AEON BIG sent Raya 2026 brief via email. AI extracted 10 fields: OOH + Digital + Radio, budget RM 350K, period Apr 1–30, target audience 18–45 urban. Channel team notified automatically.",status:"done",color:T.green},
    {step:2,label:"Channel Team: Media Selection",dept:"Channel",who:"Jason Doe",date:"May 2, 10:30AM",detail:"Channel team selected 8 media sites from Master Inventory. 3 highway OOH, 2 digital screens, 1 mall LED, 2 radio stations. Creative brief auto-generated for each site.",status:"done",color:T.teal},
    {step:3,label:"Creative: Superimposed Mockups",dept:"Creative",who:"Sarah Lee",date:"May 3, 2:00PM",detail:"Creative team uploaded superimposed visuals for all 8 sites. Client brand overlaid on actual site photography. 3 design rounds. All mockups attached to proposal.",status:"done",color:T.purple},
    {step:4,label:"Commercial: Pricing & Availability",dept:"Commercial",who:"Amir Rahman",date:"May 4, 9:00AM",detail:"AI Pricing Engine ran on all 8 items. Big Tree quoted RM 18K for ELITE KM14.2 — AI suggested RM 12K. After negotiation: locked at RM 13,800 (23% off). Total campaign cost secured.",status:"done",color:T.orange},
    {step:5,label:"Internal Review & Approval",dept:"Manager",who:"Sai (Director)",date:"May 5, 3:00PM",detail:"Director reviewed full proposal. GP calculated at 34.2% — above 30% threshold. Approved without special sign-off. Proposal cleared for client submission.",status:"done",color:T.navy},
    {step:6,label:"AI Auto-Generates PDF Proposal",dept:"System",who:"AI",date:"May 5, 3:05PM",detail:"Branded PDF proposal auto-generated: cover page, campaign rationale, 8 site details with mockups, reach data, pricing summary, timeline, T&Cs. 14 pages.",status:"done",color:T.teal},
    {step:7,label:"Proposal Sent to Client",dept:"Sales",who:"Natasha Tan",date:"May 7, 10:00AM",detail:"PDF sent to Andrew Lim (AEON BIG) via Outlook. AI tracking active. Email opened May 8 at 9:21AM. Viewed for 12 minutes. Auto-follow-up reminder set for May 11.",status:"done",color:T.purple},
    {step:8,label:"Client Revision Request",dept:"Client",who:"Andrew Lim",date:"May 9, 11:00AM",detail:"Client replied: 'Can we swap NST full-page for The Star? Also prefer 40-second radio over 30-second.' AI extracted 2 revision points, tasks auto-created for Channel team. Version incremented to v2.",status:"done",color:T.orange},
    {step:9,label:"Revised Proposal v2",dept:"Channel",who:"Jason Doe",date:"May 10, 4:00PM",detail:"Swapped NST for The Star (same cost). Radio extended to 40-sec (+RM 8K). Commercial re-confirmed pricing. Director re-approved. New PDF generated and sent.",status:"done",color:T.teal},
    {step:10,label:"Client Approval",dept:"Client",who:"Andrew Lim",date:"May 11, 2:30PM",detail:"Andrew replied: 'Looks great, we'd like to proceed.' AI detected approval keywords. Deal moved to Won. Media Order workflow triggered automatically. Natasha notified.",status:demoStage>=9?"done":"active",color:T.green},
    {step:11,label:"Media Order → PO → Execution",dept:"Sales → Commercial",who:"Auto-triggered",date:"Pending",detail:"Sales to generate Media Order for client signature. Once signed, Commercial raises PO to vendors. Artwork job sheet auto-created. Execution module activated.",status:demoStage>=10?"done":"pending",color:T.navy},
  ];

  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<FileText size={18}/>} label="Drafts" value="12" color={T.purple} sub="↓8% vs 7d"/>
        <Kpi icon={<Send size={18}/>} label="Sent" value="18" delta="↑20%" up color={T.teal} sub="vs last 7 days"/>
        <Kpi icon={<Eye size={18}/>} label="Awaiting Approval" value="6" color={T.orange} sub="↑2 vs 7d"/>
        <Kpi icon={<Award size={18}/>} label="Won from Proposal" value="RM 1.21M" delta="↑18%" up color={T.green}/>
      </div>

      {/* Document Templates */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📄</span>
          <div>
            <div className="font-black text-gray-900 text-sm">Document Templates</div>
            <div className="text-xs text-gray-500">Preview VR's standard document formats — click to open</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {icon:"📊",label:"Proposal Template",desc:"DOOH proposal — dark theme, site pages, pricing table",color:"#0C1F3F",action:()=>setDocModal("proposal")},
            {icon:"📋",label:"Media Order Template",desc:"Client-facing MO — based on actual KULT/Wipro-Unza format",color:"#0D9488",action:()=>setDocModal("mediaorder")},
            {icon:"📝",label:"Brief Form Template",desc:"Channel Team brief form — Sections A–H with SLA",color:"#6D28D9",action:()=>setDocModal("brief")},
          ].map(t=>(
            <button key={t.label} onClick={t.action} className="flex items-start gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-purple-300 text-left transition-all">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{background:t.color+"15"}}>{t.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-gray-900">{t.label}</div>
                <div className="text-xs text-gray-400 mt-0.5 leading-snug">{t.desc}</div>
              </div>
              <Eye size={13} className="text-gray-400 mt-1 flex-shrink-0"/>
            </button>
          ))}
        </div>
      </Card>

      {/* Demo Proposal Banner */}
      <div className="rounded-2xl p-4 flex items-center gap-4" style={{background:"linear-gradient(135deg,#0C1F3F,#1a3060)",border:"1px solid rgba(109,40,217,0.3)"}}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{background:"rgba(109,40,217,0.3)"}}>🎬</div>
        <div className="flex-1">
          <div className="text-white font-black text-sm">Demo: AEON BIG Raya 2026 — Full Proposal Journey</div>
          <div className="text-white/50 text-xs mt-0.5">Watch one proposal go through all 11 stages from brief to approval</div>
        </div>
        <button onClick={()=>setDemoOpen(true)} className="px-4 py-2 rounded-xl text-xs font-bold text-white flex-shrink-0" style={{background:T.purple}}>View Demo →</button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {["Create Proposal","Duplicate","Send for Approval","Export PDF"].map(a=>(
          <button key={a} className="px-4 py-2 rounded-xl text-sm font-bold text-white" style={{background:a==="Create Proposal"?T.purple:a==="Duplicate"?T.teal:a==="Send for Approval"?T.orange:T.green}}>{a}</button>
        ))}
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 ml-auto"><Search size={13} className="text-gray-400"/><input className="bg-transparent text-sm outline-none" placeholder="Search proposals..."/></div>
      </div>

      <Card>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-gray-100">{["","Title","Client","Value","Owner","Sent","Viewed","Version","Stage",""].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map((r,i)=>(
                <tr key={i} className="hover:bg-purple-50/20 cursor-pointer" onClick={()=>r.title.includes("Raya 2026")&&setDemoOpen(true)}>
                  <td className="px-4 py-3"><div className="w-10 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-xs font-black text-purple-400">PDF</div></td>
                  <td className="px-4 py-3"><div className="text-sm font-semibold text-gray-800 whitespace-nowrap max-w-xs truncate">{r.title}</div>{r.title.includes("Raya 2026")&&<div className="text-xs text-purple-500 font-semibold">👆 Click to see full journey</div>}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Av i={r.client.slice(0,2)} c={COLORS[r.c]} s={24}/><span className="text-sm text-gray-600 whitespace-nowrap">{r.client}</span></div></td>
                  <td className="px-4 py-3 text-sm font-black text-gray-900 whitespace-nowrap">{r.value}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{r.owner}</td>
                  <td className="px-4 py-3 text-sm text-gray-400 whitespace-nowrap">{r.sent}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-semibold flex items-center gap-1 whitespace-nowrap ${r.viewed.includes("Not")?"text-gray-400":"text-green-600"}`}><Eye size={11}/>{r.viewed}</span></td>
                  <td className="px-4 py-3"><span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">{r.ver}</span></td>
                  <td className="px-4 py-3"><Bdg t={r.stage} c={r.sc}/></td>
                  <td className="px-4 py-3 text-gray-400 cursor-pointer">⋯</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden divide-y divide-gray-50">
          {rows.map((r,i)=>(
            <div key={i} className="p-4 flex gap-3 cursor-pointer" onClick={()=>r.title.includes("Raya 2026")&&setDemoOpen(true)}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-xs font-black text-purple-400 flex-shrink-0">PDF</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-gray-900 truncate">{r.title}</div>
                <div className="text-xs text-gray-500">{r.client} · {r.value}</div>
                <div className="flex items-center gap-2 mt-1.5"><Bdg t={r.stage} c={r.sc}/><span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">{r.ver}</span></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Document Template Modals */}
      {docModal==="proposal"&&<ProposalPreview onClose={()=>setDocModal(null)}/>}
      {docModal==="mediaorder"&&<MediaOrderPreview onClose={()=>setDocModal(null)}/>}
      {docModal==="brief"&&<BriefFormPreview onClose={()=>setDocModal(null)}/>}

      {/* Demo Modal */}
      {demoOpen&&(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 flex-shrink-0">
              <div>
                <div className="font-black text-gray-900 text-lg">AEON BIG — Raya 2026</div>
                <div className="text-sm text-gray-500">Complete proposal journey · 11 stages</div>
              </div>
              <button onClick={()=>setDemoOpen(false)} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200"><X size={15}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {/* Progress bar */}
              <div className="flex items-center gap-1 mb-5 overflow-x-auto pb-2">
                {demoStages.map((s,i)=>(
                  <div key={i} onClick={()=>setDemoStage(i)} className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all" style={{background:i<demoStage?s.color:i===demoStage?s.color:"#E5E7EB",color:i<=demoStage?"#fff":"#9CA3AF"}}>
                      {i<demoStage?"✓":i+1}
                    </div>
                    {i<demoStages.length-1&&<div className="w-6 h-0.5 hidden"/>}
                  </div>
                ))}
              </div>
              {/* Current stage detail */}
              <div className="rounded-2xl p-5" style={{background:demoStages[demoStage].color+"10",border:`1.5px solid ${demoStages[demoStage].color}30`}}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{background:demoStages[demoStage].color}}>{demoStages[demoStage].step}</div>
                  <div className="flex-1">
                    <div className="font-black text-gray-900 text-base">{demoStages[demoStage].label}</div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{background:demoStages[demoStage].color+"20",color:demoStages[demoStage].color}}>{demoStages[demoStage].dept}</span>
                      <span className="text-xs text-gray-400">👤 {demoStages[demoStage].who}</span>
                      <span className="text-xs text-gray-400">📅 {demoStages[demoStage].date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed bg-white rounded-xl p-4">{demoStages[demoStage].detail}</div>
              </div>
              {/* All stages list */}
              <div className="mt-5 flex flex-col gap-2">
                {demoStages.map((s,i)=>(
                  <div key={i} onClick={()=>setDemoStage(i)} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all" style={{background:i===demoStage?s.color+"10":"#F8FAFC",border:`1px solid ${i===demoStage?s.color+"40":"transparent"}`}}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0" style={{background:i<=demoStage?s.color:"#E5E7EB",color:i<=demoStage?"#fff":"#9CA3AF"}}>{i<demoStage?"✓":i+1}</div>
                    <span className="text-sm font-semibold text-gray-700 flex-1">{s.label}</span>
                    <span className="text-xs text-gray-400 flex-shrink-0">{s.dept}</span>
                    <span className={`text-xs font-bold flex-shrink-0 ${i<demoStage?"text-green-500":i===demoStage?"text-purple-500":"text-gray-300"}`}>{i<demoStage?"Done":i===demoStage?"Active":"Pending"}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
              <button onClick={()=>setDemoStage(s=>Math.max(0,s-1))} disabled={demoStage===0} className="px-5 py-2.5 rounded-xl font-bold text-sm border border-gray-200 text-gray-600 disabled:opacity-30">← Prev</button>
              <button onClick={()=>setDemoStage(s=>Math.min(demoStages.length-1,s+1))} disabled={demoStage===demoStages.length-1} className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white" style={{background:T.purple}}>Next Stage →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 100 INVENTORY ITEMS ─────────────────────────────────────────
const ALL_INVENTORY = [
  // ─── NEW VR SITES (from Gegak Gempita + Grab NakNak campaigns) ──
  {id:"VR0403",vendor:"Ledtronics",name:"Institut Jantung Negara, KL",cat:"DOOH",type:"LED Screen",loc:"Jalan Pahang, KL",state:"KL",size:"38×25ft",pixels:"720×480px",ops:"6.30am–12.30am (18H)",minExp:250,slotDur:"15 Secs",trafficDaily:200000,trafficMo:6000000,eyeballsDaily:240000,eyeballsMo:7200000,pubRate1M:13000,pubRate2W:6500,bestRate2W:3000,payoutMO:2000,netVR:1000,netPct:0.333,reach:"200K/day",rate:3000,status:"Available"},
  {id:"VR0501",vendor:"Imec Plus",name:"Lebuhraya Sultan Iskandar, KL",cat:"DOOH",type:"LED Screen",loc:"Kerinchi, KL",state:"KL",size:"30×20ft",pixels:"1080×720px",ops:"6.30am–12.30am (18H)",minExp:200,slotDur:"15 Secs",trafficDaily:320000,trafficMo:9600000,eyeballsDaily:384000,eyeballsMo:11520000,pubRate1M:12500,pubRate2W:6250,bestRate2W:3800,payoutMO:2500,netVR:1300,netPct:0.342,reach:"320K/day",rate:3800,status:"Available"},
  {id:"VR0502",vendor:"Imec Plus",name:"Jalan Kuching, near Batu Caves junction",cat:"DOOH",type:"LED Screen",loc:"Jalan Kuching, KL",state:"KL",size:"30×20ft",pixels:"1080×720px",ops:"6.30am–12.30am (18H)",minExp:200,slotDur:"15 Secs",trafficDaily:300000,trafficMo:9000000,eyeballsDaily:360000,eyeballsMo:10800000,pubRate1M:12500,pubRate2W:6250,bestRate2W:3800,payoutMO:2500,netVR:1300,netPct:0.342,reach:"300K/day",rate:3800,status:"Available"},
  {id:"VR1201",vendor:"Warisan Ads",name:"Jalan Pinang, near KLCC Convention Centre",cat:"DOOH",type:"LED Screen",loc:"KLCC, KL",state:"KL",size:"9×8ft",pixels:"900×1080px",ops:"7.00am–1.00am (18H)",minExp:270,slotDur:"15 Secs",trafficDaily:110000,trafficMo:3300000,eyeballsDaily:132000,eyeballsMo:3960000,pubRate1M:4000,pubRate2W:2000,bestRate2W:15200,payoutMO:10000,netVR:5200,netPct:0.342,reach:"110K/day",rate:15200,status:"Available"},
  {id:"VR1202",vendor:"Warisan Ads",name:"Jalan Raja Chulan heading towards Bukit Bintang",cat:"DOOH",type:"LED Screen",loc:"Raja Chulan, KL",state:"KL",size:"9×8ft",pixels:"900×1080px",ops:"7.00am–1.00am (18H)",minExp:270,slotDur:"15 Secs",trafficDaily:100000,trafficMo:3000000,eyeballsDaily:120000,eyeballsMo:3600000,pubRate1M:4000,pubRate2W:2000,bestRate2W:0,payoutMO:0,netVR:0,netPct:0,reach:"100K/day",rate:4000,status:"Available"},
  {id:"VR1203",vendor:"Warisan Ads",name:"Jalan Bukit Bintang, near Lot 10",cat:"DOOH",type:"LED Screen",loc:"Bukit Bintang, KL",state:"KL",size:"9×8ft",pixels:"900×1080px",ops:"7.00am–1.00am (18H)",minExp:270,slotDur:"15 Secs",trafficDaily:150000,trafficMo:4500000,eyeballsDaily:180000,eyeballsMo:5400000,pubRate1M:4000,pubRate2W:2000,bestRate2W:0,payoutMO:0,netVR:0,netPct:0,reach:"150K/day",rate:4000,status:"Available"},
  {id:"VR1204",vendor:"Warisan Ads",name:"Jalan Ampang, infront of Great Eastern Mall",cat:"DOOH",type:"LED Screen",loc:"Jalan Ampang, KL",state:"KL",size:"30×20ft",pixels:"900×1080px",ops:"7.00am–1.00am (18H)",minExp:270,slotDur:"15 Secs",trafficDaily:130000,trafficMo:3900000,eyeballsDaily:156000,eyeballsMo:4680000,pubRate1M:18000,pubRate2W:9000,bestRate2W:0,payoutMO:0,netVR:0,netPct:0,reach:"130K/day",rate:9000,status:"Available"},
  {id:"VR1205",vendor:"Warisan Ads",name:"Jalan Raja Chulan to Jalan Ampang junction",cat:"DOOH",type:"LED Screen",loc:"Raja Chulan, KL",state:"KL",size:"9×8ft",pixels:"900×1080px",ops:"7.00am–1.00am (18H)",minExp:270,slotDur:"15 Secs",trafficDaily:150000,trafficMo:4500000,eyeballsDaily:180000,eyeballsMo:5400000,pubRate1M:4000,pubRate2W:2000,bestRate2W:0,payoutMO:0,netVR:0,netPct:0,reach:"150K/day",rate:4000,status:"Available"},
  {id:"VR1206",vendor:"Warisan Ads",name:"Jalan Raja Chulan facing Menara Citibank",cat:"DOOH",type:"LED Screen",loc:"Raja Chulan, KL",state:"KL",size:"10×20ft",pixels:"1080×558px",ops:"7.00am–1.00am (18H)",minExp:285,slotDur:"15 Secs",trafficDaily:300000,trafficMo:9000000,eyeballsDaily:360000,eyeballsMo:10800000,pubRate1M:10200,pubRate2W:5100,bestRate2W:0,payoutMO:0,netVR:0,netPct:0,reach:"300K/day",rate:5100,status:"Available"},
  {id:"VR1403A",vendor:"Setia Media",name:"Federal Highway Opposite Subang Parade (A)",cat:"DOOH",type:"LED Screen",loc:"Federal Highway, Selangor",state:"Selangor",size:"30×20ft",pixels:"864×576px",ops:"6.30am–12.30am (18H)",minExp:270,slotDur:"15 Secs",trafficDaily:1200000,trafficMo:36000000,eyeballsDaily:1440000,eyeballsMo:43200000,pubRate1M:13800,pubRate2W:6900,bestRate2W:3400,payoutMO:2231.25,netVR:1168.75,netPct:0.344,reach:"1.2M/day",rate:3400,status:"Available"},
  {id:"VR1403B",vendor:"Setia Media",name:"Federal Highway Opposite Subang Parade (B)",cat:"DOOH",type:"LED Screen",loc:"Federal Highway, Selangor",state:"Selangor",size:"30×20ft",pixels:"864×576px",ops:"6.30am–12.30am (18H)",minExp:270,slotDur:"15 Secs",trafficDaily:1200000,trafficMo:36000000,eyeballsDaily:1440000,eyeballsMo:43200000,pubRate1M:13800,pubRate2W:6900,bestRate2W:3400,payoutMO:2231.25,netVR:1168.75,netPct:0.344,reach:"1.2M/day",rate:3400,status:"Available"},
  {id:"VR2001",vendor:"Monster Outdoor",name:"Jalan Persiaran Jaya / Persiaran Sabak Bernam, Selangor",cat:"DOOH",type:"LED Screen",loc:"Persiaran Jaya, Selangor",state:"Selangor",size:"15×40ft",pixels:"600×1560px",ops:"7.00am–12.00am (17H)",minExp:204,slotDur:"15 Secs",trafficDaily:75600,trafficMo:2268000,eyeballsDaily:90720,eyeballsMo:2721600,pubRate1M:9000,pubRate2W:4500,bestRate2W:3800,payoutMO:2500,netVR:1300,netPct:0.342,reach:"75.6K/day",rate:3800,status:"Available"},
  {id:"VR2201",vendor:"Libroff",name:"Jalan Kuching (OHB) — Overhead Bridge",cat:"DOOH",type:"LED Screen",loc:"Jalan Kuching, KL",state:"KL",size:"15×60ft",pixels:"448×1792px",ops:"6.00am–1.00am (19H)",minExp:285,slotDur:"15 Secs",trafficDaily:85000,trafficMo:2550000,eyeballsDaily:102000,eyeballsMo:3060000,pubRate1M:15000,pubRate2W:7500,bestRate2W:3400,payoutMO:2250,netVR:1150,netPct:0.338,reach:"85K/day",rate:3400,status:"Available"},
  {id:"VR2202",vendor:"Libroff",name:"Jalan Tun Razak (OHB) — Overhead Bridge",cat:"DOOH",type:"LED Screen",loc:"Jalan Tun Razak, KL",state:"KL",size:"15×60ft",pixels:"448×1792px",ops:"6.00am–1.00am (19H)",minExp:285,slotDur:"15 Secs",trafficDaily:120000,trafficMo:3600000,eyeballsDaily:144000,eyeballsMo:4320000,pubRate1M:15000,pubRate2W:7500,bestRate2W:3400,payoutMO:2250,netVR:1150,netPct:0.338,reach:"120K/day",rate:3400,status:"Available"},
  {id:"VR3101",vendor:"Danwan",name:"Jalan Tunku Abdul Halim — 2 Screens",cat:"DOOH",type:"LED Screen",loc:"Jalan Tunku Abdul Halim, KL",state:"KL",size:"10×8.4ft",pixels:"768×640px",ops:"6.00am–1.00am (19H)",minExp:570,slotDur:"15 Secs",trafficDaily:60000,trafficMo:1800000,eyeballsDaily:72000,eyeballsMo:2160000,pubRate1M:26000,pubRate2W:13000,bestRate2W:2400,payoutMO:1600,netVR:800,netPct:0.333,reach:"60K/day",rate:2400,status:"Available"},
  {id:"VR3103A",vendor:"Danwan",name:"Jalan Cochrane, Mytown Shopping Centre",cat:"DOOH",type:"LED Screen",loc:"Cochrane, KL",state:"KL",size:"30×20ft",pixels:"1080×720px",ops:"6.00am–1.00am (19H)",minExp:570,slotDur:"15 Secs",trafficDaily:73333,trafficMo:2200000,eyeballsDaily:87999,eyeballsMo:2639988,pubRate1M:30000,pubRate2W:15000,bestRate2W:3000,payoutMO:2000,netVR:1000,netPct:0.333,reach:"73.3K/day",rate:3000,status:"Available"},
  {id:"VR0201",vendor:"Virtual Outlook",name:"Federal Highway, heading towards Kuala Lumpur",cat:"DOOH",type:"LED Screen",loc:"Federal Highway, KL",state:"KL",size:"30×20ft",pixels:"1200×720px",ops:"6.30am–12.30am (18H)",minExp:216,slotDur:"15 Secs",trafficDaily:200000,trafficMo:6000000,eyeballsDaily:240000,eyeballsMo:7200000,pubRate1M:12500,pubRate2W:6250,bestRate2W:2500,payoutMO:1750,netVR:750,netPct:0.3,reach:"200K/day",rate:2500,status:"Available"},
  {id:"VR0204",vendor:"Virtual Outlook",name:"Old Klang Road, Mid Valley vicinity",cat:"DOOH",type:"LED Screen",loc:"Old Klang Road, KL",state:"KL",size:"30×20ft",pixels:"1200×720px",ops:"6.30am–12.30am (18H)",minExp:216,slotDur:"15 Secs",trafficDaily:150000,trafficMo:4500000,eyeballsDaily:180000,eyeballsMo:5400000,pubRate1M:12500,pubRate2W:6250,bestRate2W:2500,payoutMO:1750,netVR:750,netPct:0.3,reach:"150K/day",rate:2500,status:"Available"},
  {id:"VR0507",vendor:"Imec Plus",name:"Persiaran Kuala Selangor, Shah Alam",cat:"DOOH",type:"LED Screen",loc:"Shah Alam, Selangor",state:"Selangor",size:"30×20ft",pixels:"864×576px",ops:"6.30am–12.30am (18H)",minExp:200,slotDur:"15 Secs",trafficDaily:355000,trafficMo:10650000,eyeballsDaily:426000,eyeballsMo:12780000,pubRate1M:12500,pubRate2W:6250,bestRate2W:2500,payoutMO:2000,netVR:500,netPct:0.2,reach:"355K/day",rate:2500,status:"Available"},
  {id:"VR0615",vendor:"Spectrum Outdoor",name:"LDP Highway, near SS2 Petaling Jaya",cat:"DOOH",type:"LED Screen",loc:"LDP Highway, Selangor",state:"Selangor",size:"30×20ft",pixels:"384×576px",ops:"7.00am–1.00am (18H)",minExp:216,slotDur:"15 Secs",trafficDaily:150000,trafficMo:4500000,eyeballsDaily:180000,eyeballsMo:5400000,pubRate1M:22500,pubRate2W:11250,bestRate2W:2550,payoutMO:1750,netVR:800,netPct:0.314,reach:"150K/day",rate:2550,status:"Available"},
  {id:"VR0604",vendor:"Spectrum Outdoor",name:"Jalan Tun Razak, near National Heart Institute",cat:"DOOH",type:"LED Screen",loc:"Jalan Tun Razak, KL",state:"KL",size:"30×20ft",pixels:"576×384px",ops:"7.00am–1.00am (18H)",minExp:216,slotDur:"15 Secs",trafficDaily:150000,trafficMo:4500000,eyeballsDaily:180000,eyeballsMo:5400000,pubRate1M:22500,pubRate2W:11250,bestRate2W:2550,payoutMO:1750,netVR:800,netPct:0.314,reach:"150K/day",rate:2550,status:"Available"},
  {id:"VR0606",vendor:"Spectrum Outdoor",name:"MRR2 near Taman Bukit Maluri",cat:"DOOH",type:"LED Screen",loc:"Kepong, KL",state:"KL",size:"30×20ft",pixels:"384×576px",ops:"7.00am–1.00am (18H)",minExp:216,slotDur:"15 Secs",trafficDaily:150000,trafficMo:4500000,eyeballsDaily:180000,eyeballsMo:5400000,pubRate1M:22500,pubRate2W:11250,bestRate2W:1875,payoutMO:1166.67,netVR:708.33,netPct:0.378,reach:"150K/day",rate:1875,status:"Available"},
  {id:"VR0607",vendor:"Spectrum Outdoor",name:"Jalan Damansara, nearby Bangsar",cat:"DOOH",type:"LED Screen",loc:"Bangsar, KL",state:"KL",size:"30×20ft",pixels:"576×864px",ops:"7.00am–1.00am (18H)",minExp:216,slotDur:"15 Secs",trafficDaily:300000,trafficMo:9000000,eyeballsDaily:360000,eyeballsMo:10800000,pubRate1M:22500,pubRate2W:11250,bestRate2W:2550,payoutMO:1750,netVR:800,netPct:0.314,reach:"300K/day",rate:2550,status:"Available"},
  {id:"VR0608",vendor:"Spectrum Outdoor",name:"Lebuhraya Pantai Baru (NPE)",cat:"DOOH",type:"LED Screen",loc:"NPE, KL",state:"KL",size:"30×20ft",pixels:"576×864px",ops:"7.00am–1.00am (18H)",minExp:216,slotDur:"15 Secs",trafficDaily:150000,trafficMo:4500000,eyeballsDaily:180000,eyeballsMo:5400000,pubRate1M:22500,pubRate2W:11250,bestRate2W:1875,payoutMO:1166.67,netVR:708.33,netPct:0.378,reach:"150K/day",rate:1875,status:"Available"},
  {id:"VR0614",vendor:"Spectrum Outdoor",name:"Sheraton Hotel, Petaling Jaya",cat:"DOOH",type:"LED Screen",loc:"Petaling Jaya, Selangor",state:"Selangor",size:"30×20ft",pixels:"720×1040px",ops:"7.00am–1.00am (18H)",minExp:216,slotDur:"15 Secs",trafficDaily:133333,trafficMo:4000000,eyeballsDaily:160000,eyeballsMo:4800000,pubRate1M:22500,pubRate2W:11250,bestRate2W:2550,payoutMO:1750,netVR:800,netPct:0.314,reach:"133K/day",rate:2550,status:"Available"},
  {id:"VR0203",vendor:"Virtual Outlook",name:"Jalan Damansara, near KL Sentral vicinity",cat:"DOOH",type:"LED Screen",loc:"Damansara, KL",state:"KL",size:"30×20ft",pixels:"1200×720px",ops:"6.30am–12.30am (18H)",minExp:216,slotDur:"15 Secs",trafficDaily:250000,trafficMo:7500000,eyeballsDaily:300000,eyeballsMo:9000000,pubRate1M:12500,pubRate2W:6250,bestRate2W:2550,payoutMO:1750,netVR:800,netPct:0.314,reach:"250K/day",rate:2550,status:"Available"},
  {id:"VR0708",vendor:"OOH Media",name:"Jalan Lapangan Terbang Sultan, near Subang Airport",cat:"DOOH",type:"LED Screen",loc:"Subang, Selangor",state:"Selangor",size:"31.5×22ft",pixels:"960×672px",ops:"6.30am–12.30am (18H)",minExp:200,slotDur:"15 Secs",trafficDaily:500000,trafficMo:15000000,eyeballsDaily:600000,eyeballsMo:18000000,pubRate1M:17500,pubRate2W:8750,bestRate2W:2500,payoutMO:2000,netVR:500,netPct:0.2,reach:"500K/day",rate:2500,status:"Available"},
  {id:"VR0710",vendor:"OOH Media",name:"LDP Highway, near 1 Utama Shopping Centre",cat:"DOOH",type:"LED Screen",loc:"LDP, Selangor",state:"Selangor",size:"30×20ft",pixels:"960×672px",ops:"6.30am–12.30am (18H)",minExp:200,slotDur:"15 Secs",trafficDaily:315300,trafficMo:9459000,eyeballsDaily:378360,eyeballsMo:11350800,pubRate1M:17500,pubRate2W:8750,bestRate2W:2500,payoutMO:2000,netVR:500,netPct:0.2,reach:"315K/day",rate:2500,status:"Available"},
  {id:"VR2903",vendor:"EraJaya",name:"LDP Kelana Jaya",cat:"DOOH",type:"LED Screen",loc:"Kelana Jaya, Selangor",state:"Selangor",size:"30×20ft",pixels:"880×600px",ops:"6.00am–1.00am (19H)",minExp:216,slotDur:"15 Secs",trafficDaily:140000,trafficMo:4200000,eyeballsDaily:168000,eyeballsMo:5040000,pubRate1M:15000,pubRate2W:7500,bestRate2W:3375,payoutMO:2500,netVR:875,netPct:0.259,reach:"140K/day",rate:3375,status:"Available"},
  {id:"VR3903",vendor:"Amaze Ads",name:"Sprint Highway [KGPA], Damansara",cat:"DOOH",type:"LED Screen",loc:"Sprint Highway, KL",state:"KL",size:"30×20ft",pixels:"900×640px",ops:"7.00am–1.00am (18H)",minExp:216,slotDur:"15 Secs",trafficDaily:203000,trafficMo:6090000,eyeballsDaily:243600,eyeballsMo:7308000,pubRate1M:17500,pubRate2W:8750,bestRate2W:2625,payoutMO:1750,netVR:875,netPct:0.333,reach:"203K/day",rate:2625,status:"Available"},

  // ─── REAL VR DOOH SITES (Visual EFX own inventory) ─────────────
  {id:"VR0315",vendor:"Visual EFX",name:"Jalan Bukit Bintang, near Pavilion KL",cat:"DOOH",type:"LED Screen",loc:"Bukit Bintang, KL",state:"KL",size:"18×12ft",reach:"10.5M/mo",rate:22000,status:"Available"},
  {id:"VR0317",vendor:"Visual EFX",name:"Park Royal Bukit Bintang, near TRX",cat:"DOOH",type:"LED Screen",loc:"Bukit Bintang, KL",state:"KL",size:"18×12ft",reach:"10.5M/mo",rate:20000,status:"Available"},
  {id:"VR0707",vendor:"Visual EFX",name:"Sprint Highway, near Damansara Intan",cat:"DOOH",type:"LED Screen",loc:"Damansara, Selangor",state:"Selangor",size:"32×21.5ft",reach:"7.2M/mo",rate:18000,status:"Available"},
  {id:"VR0202",vendor:"Visual EFX",name:"Jalan Damansara, Bukit Damansara",cat:"DOOH",type:"LED Screen",loc:"Bukit Damansara, KL",state:"KL",size:"30×20ft",reach:"9M/mo",rate:12000,status:"Available"},
  {id:"VR0206",vendor:"Visual EFX",name:"Jalan Sungei Besi, next to Bandar Malaysia",cat:"DOOH",type:"LED Screen",loc:"Sungei Besi, KL",state:"KL",size:"30×20ft",reach:"4.5M/mo",rate:10000,status:"Available"},
  {id:"VR4401",vendor:"Visual EFX",name:"Jalan Tun Razak / Jalan Ampang towards KLCC/TRX",cat:"DOOH",type:"LED Screen",loc:"KLCC, KL",state:"KL",size:"60×40ft",reach:"6.33M/mo",rate:32000,status:"Available"},
  {id:"VR0904",vendor:"Visual EFX",name:"Jalan Hang Tuah, near BBCC",cat:"DOOH",type:"LED Screen",loc:"Hang Tuah, KL",state:"KL",size:"12×20ft",reach:"2.48M/mo",rate:8000,status:"Available"},
  {id:"VR0906",vendor:"Visual EFX",name:"Jalan Ipoh",cat:"DOOH",type:"LED Screen",loc:"Jalan Ipoh, KL",state:"KL",size:"9×15ft",reach:"1.4M/mo",rate:5500,status:"Available"},
  {id:"VR0914",vendor:"Visual EFX",name:"Jalan Damansara (TTDI)",cat:"DOOH",type:"LED Screen",loc:"TTDI, Selangor",state:"Selangor",size:"12×20ft",reach:"1.95M/mo",rate:8000,status:"Available"},
  {id:"VR0915",vendor:"Visual EFX",name:"Jalan Sri Hartamas",cat:"DOOH",type:"LED Screen",loc:"Sri Hartamas, KL",state:"KL",size:"9×15ft",reach:"765K/mo",rate:5000,status:"Available"},
  {id:"VR0918",vendor:"Visual EFX",name:"Jalan Kuching",cat:"DOOH",type:"LED Screen",loc:"Jalan Kuching, KL",state:"KL",size:"30×20ft",reach:"1.42M/mo",rate:9000,status:"Available"},
  {id:"VR2203A",vendor:"Visual EFX",name:"Jalan Maharajalela (OHB) — Towards City Centre",cat:"DOOH",type:"LED Screen",loc:"Maharajalela, KL",state:"KL",size:"12.6×60ft",reach:"3.6M/mo",rate:18000,status:"Available"},
  {id:"VR3902",vendor:"Visual EFX",name:"KL-Seremban Highway near Giant Desa Petaling",cat:"DOOH",type:"LED Screen",loc:"Desa Petaling, KL",state:"KL",size:"60×40ft",reach:"16.8M/mo",rate:35000,status:"Available"},
  {id:"VR0101",vendor:"Visual EFX",name:"KL South, Jalan Puchong, near Old Klang Road",cat:"DOOH",type:"LED Screen",loc:"Jalan Puchong, KL",state:"KL",size:"50×30ft",reach:"2.4M/mo",rate:14000,status:"Available"},
  {id:"VR3604",vendor:"Visual EFX",name:"Simpang Tadaka, Tawau",cat:"DOOH",type:"LED Screen",loc:"Tawau, Sabah",state:"Sabah",size:"N/A",reach:"360K/mo",rate:10000,status:"Available"},
  {id:"VR0330",vendor:"Visual EFX",name:"DBKK Building, Jalan Bandaran, Kota Kinabalu",cat:"DOOH",type:"LED Screen",loc:"Kota Kinabalu, Sabah",state:"Sabah",size:"N/A",reach:"540K/mo",rate:10000,status:"Available"},
  {id:"VR5901A",vendor:"Visual EFX",name:"Jalan Tar, Yaakub Petra Jaya, Kuching (Towards Petra Jaya)",cat:"DOOH",type:"LED Screen",loc:"Petra Jaya, Sarawak",state:"Sarawak",size:"N/A",reach:"450K/mo",rate:10000,status:"Available"},
  {id:"VR5902A",vendor:"Visual EFX",name:"Tun Salahuddin Billboard, Kuching (From Kuching to Petra Jaya)",cat:"DOOH",type:"LED Screen",loc:"Kuching, Sarawak",state:"Sarawak",size:"N/A",reach:"600K/mo",rate:10000,status:"Available"},
  {id:"VR5902B",vendor:"Visual EFX",name:"Tun Salahuddin Billboard, Kuching (From Petra Jaya to Kuching)",cat:"DOOH",type:"LED Screen",loc:"Kuching, Sarawak",state:"Sarawak",size:"N/A",reach:"600K/mo",rate:10000,status:"Available"},
  // ─── RETAIL MEDIA (Visual Retale Retail Domination — 5,244+ stores) ──
  {id:"RM-MY-LED",vendor:"MYDIN",name:"MYDIN LED/TV Screen — 27 stores national",cat:"Retail Media",type:"In-Store LED",loc:"National",state:"National",size:"In-store",reach:"294K/mo per store",rate:8000,status:"Available"},
  {id:"RM-MY-SHELF",vendor:"MYDIN",name:"MYDIN Shelf Banner — 27 stores national",cat:"Retail Media",type:"Shelf Banner",loc:"National",state:"National",size:"Shelf strip",reach:"294K/mo per store",rate:2500,status:"Available"},
  {id:"RM-MY-WALL",vendor:"MYDIN",name:"MYDIN Wall Banner — 27 stores national",cat:"Retail Media",type:"Wall Banner",loc:"National",state:"National",size:"Full wall",reach:"294K/mo per store",rate:4500,status:"Available"},
  {id:"RM-MY-TRAV",vendor:"MYDIN",name:"MYDIN Travelator — 27 stores national",cat:"Retail Media",type:"Travelator",loc:"National",state:"National",size:"Travelator panels",reach:"294K/mo per store",rate:6000,status:"Available"},
  {id:"RM-AB-LED",vendor:"AEON BIG",name:"AEON BIG LED/TV Screen — 21 stores national",cat:"Retail Media",type:"In-Store LED",loc:"National",state:"National",size:"In-store",reach:"163K/mo per store",rate:7500,status:"Available"},
  {id:"RM-AB-SHELF",vendor:"AEON BIG",name:"AEON BIG Shelf Banner — 21 stores national",cat:"Retail Media",type:"Shelf Banner",loc:"National",state:"National",size:"Shelf strip",reach:"163K/mo per store",rate:2200,status:"Available"},
  {id:"RM-AB-DIGI",vendor:"AEON BIG",name:"AEON BIG Digital Standee — 21 stores national",cat:"Retail Media",type:"Digital Standee",loc:"National",state:"National",size:"55in portrait",reach:"163K/mo per store",rate:5000,status:"Available"},
  {id:"RM-AB-TRAV",vendor:"AEON BIG",name:"AEON BIG Travelator — 21 stores national",cat:"Retail Media",type:"Travelator",loc:"National",state:"National",size:"Travelator panels",reach:"163K/mo per store",rate:5500,status:"Available"},
  {id:"RM-LS-SHELF",vendor:"Lotus's",name:"Lotus's Shelf Banner — 70 stores national",cat:"Retail Media",type:"Shelf Banner",loc:"National",state:"National",size:"Shelf strip",reach:"206K/mo per store",rate:2800,status:"Available"},
  {id:"RM-LS-TRAV",vendor:"Lotus's",name:"Lotus's Travelator — 70 stores national",cat:"Retail Media",type:"Travelator",loc:"National",state:"National",size:"Travelator panels",reach:"206K/mo per store",rate:6500,status:"Available"},
  {id:"RM-LS-DIGI",vendor:"Lotus's",name:"Lotus's Digital Standee — 70 stores national",cat:"Retail Media",type:"Digital Standee",loc:"National",state:"National",size:"55in portrait",reach:"206K/mo per store",rate:5500,status:"Available"},
  {id:"RM-GI-LED",vendor:"Giant",name:"Giant LED/TV Screen — 19 hypermarket stores",cat:"Retail Media",type:"In-Store LED",loc:"National",state:"National",size:"In-store",reach:"228K/mo per store",rate:7000,status:"Available"},
  {id:"RM-GI-SHELF",vendor:"Giant",name:"Giant Shelf Banner — 19 hypermarket stores",cat:"Retail Media",type:"Shelf Banner",loc:"National",state:"National",size:"Shelf strip",reach:"228K/mo per store",rate:2500,status:"Available"},
  {id:"RM-KK-LED",vendor:"KK Mart",name:"KK Mart LED/TV Screen — 905 stores national",cat:"Retail Media",type:"In-Store LED",loc:"National",state:"National",size:"In-store TV",reach:"25.7K/mo per store",rate:1500,status:"Available"},
  {id:"RM-KK-HANG",vendor:"KK Mart",name:"KK Mart Hanging Mobile — 905 stores national",cat:"Retail Media",type:"Hanging Mobile",loc:"National",state:"National",size:"A2 double-sided",reach:"25.7K/mo per store",rate:800,status:"Available"},
  {id:"RM-7E-SHB",vendor:"7-Eleven",name:"7-Eleven Shelf Header Board — 2,409 stores",cat:"Retail Media",type:"Shelf Header Board",loc:"National",state:"National",size:"Shelf header",reach:"28.6K/mo per store",rate:1200,status:"Available"},
  {id:"RM-7E-POS",vendor:"7-Eleven",name:"7-Eleven POS Digital Screen — 2,409 stores",cat:"Retail Media",type:"POS Digital Screen",loc:"National",state:"National",size:"15in checkout",reach:"28.6K/mo per store",rate:2000,status:"Available"},
  {id:"RM-7E-CHILL",vendor:"7-Eleven",name:"7-Eleven Chiller Sticker — 2,409 stores",cat:"Retail Media",type:"Chiller Sticker",loc:"National",state:"National",size:"Chiller door panel",reach:"28.6K/mo per store",rate:900,status:"Available"},
  {id:"RM-7E-DOOR",vendor:"7-Eleven",name:"7-Eleven Entrance Door Facade — 2,409 stores",cat:"Retail Media",type:"Entrance Door Facade",loc:"National",state:"National",size:"Door facade",reach:"28.6K/mo per store",rate:1100,status:"Available"},
  {id:"RM-FM-LED",vendor:"FamilyMart",name:"FamilyMart LED Screen — 445 stores national",cat:"Retail Media",type:"In-Store LED",loc:"National",state:"National",size:"In-store TV",reach:"18.6K/mo per store",rate:2500,status:"Available"},
  {id:"RM-FM-HANG",vendor:"FamilyMart",name:"FamilyMart Hanging Mobile — 445 stores",cat:"Retail Media",type:"Hanging Mobile",loc:"National",state:"National",size:"A2 double-sided",reach:"18.6K/mo per store",rate:1200,status:"Available"},
  {id:"RM-MN-LED",vendor:"myNEWS",name:"myNEWS LED Screen — 503 stores national",cat:"Retail Media",type:"In-Store LED",loc:"National",state:"National",size:"In-store TV",reach:"22.9K/mo per store",rate:2000,status:"Available"},
  {id:"RM-EC-SHELF",vendor:"Econsave",name:"Econsave Shelf Banner — 177 stores national",cat:"Retail Media",type:"Shelf Banner",loc:"National",state:"National",size:"Shelf strip",reach:"176.5K/mo per store",rate:2000,status:"Available"},

  // HIGHWAY OOH
  {id:"BTO-ELITE-001",vendor:"Big Tree",name:"ELITE Highway KM 14.2 Northbound",cat:"OOH",type:"Billboard",loc:"Subang, Selangor",state:"Selangor",size:"40×20ft",reach:"120K/day",rate:18000,status:"Available"},
  {id:"BTO-PLUS-002",vendor:"Big Tree",name:"PLUS Highway KM 287 Northbound",cat:"OOH",type:"Unipole",loc:"Rawang, Selangor",state:"Selangor",size:"30×15ft",reach:"95K/day",rate:14000,status:"Available"},
  {id:"BTO-AKLEH-003",vendor:"Big Tree",name:"AKLEH KM 8.5 Southbound",cat:"OOH",type:"Unipole",loc:"Ampang, KL",state:"KL",size:"30×15ft",reach:"85K/day",rate:12000,status:"Booked"},
  {id:"BTO-NPE-004",vendor:"Big Tree",name:"NPE KM 3.2 Westbound",cat:"OOH",type:"Billboard",loc:"Kepong, KL",state:"KL",size:"40×20ft",reach:"78K/day",rate:11000,status:"Available"},
  {id:"BTO-LDP-005",vendor:"Big Tree",name:"LDP KM 9.8 Eastbound",cat:"OOH",type:"Billboard",loc:"Damansara, Selangor",state:"Selangor",size:"40×20ft",reach:"105K/day",rate:15000,status:"Available"},
  {id:"BTO-SPRINT-006",vendor:"Big Tree",name:"SPRINT Highway KM 5.1",cat:"OOH",type:"Unipole",loc:"Cheras, KL",state:"KL",size:"25×12ft",reach:"72K/day",rate:9500,status:"Available"},
  {id:"BTO-DUKE-007",vendor:"Big Tree",name:"DUKE Highway KM 11.3",cat:"OOH",type:"Billboard",loc:"Setapak, KL",state:"KL",size:"40×20ft",reach:"68K/day",rate:10000,status:"On Hold"},
  {id:"BTO-KESAS-008",vendor:"Big Tree",name:"KESAS Highway KM 17.5",cat:"OOH",type:"Billboard",loc:"Shah Alam, Selangor",state:"Selangor",size:"40×20ft",reach:"88K/day",rate:13000,status:"Available"},
  {id:"BTO-MEX-009",vendor:"Big Tree",name:"MEX Highway KM 4.2",cat:"OOH",type:"Unipole",loc:"Seri Kembangan, Selangor",state:"Selangor",size:"30×15ft",reach:"62K/day",rate:8500,status:"Available"},
  {id:"BTO-SILK-010",vendor:"Big Tree",name:"SILK Highway KM 8.0",cat:"OOH",type:"Billboard",loc:"Kajang, Selangor",state:"Selangor",size:"40×20ft",reach:"55K/day",rate:8000,status:"Available"},
  // PENANG OOH
  {id:"ANG-E1-011",vendor:"Angsana",name:"Penang Bridge Approach NB",cat:"OOH",type:"Billboard",loc:"Butterworth, Penang",state:"Penang",size:"40×20ft",reach:"80K/day",rate:12000,status:"Available"},
  {id:"ANG-E2-012",vendor:"Angsana",name:"Gurney Drive Billboard",cat:"OOH",type:"Billboard",loc:"Georgetown, Penang",state:"Penang",size:"30×15ft",reach:"65K/day",rate:9500,status:"Available"},
  {id:"ANG-E3-013",vendor:"Angsana",name:"Bayan Lepas Highway",cat:"OOH",type:"Unipole",loc:"Bayan Lepas, Penang",state:"Penang",size:"25×12ft",reach:"58K/day",rate:7500,status:"Booked"},
  // JOHOR OOH
  {id:"JHR-001-014",vendor:"CityAds",name:"Lebuhraya JB KM 12",cat:"OOH",type:"Billboard",loc:"Johor Bahru, Johor",state:"Johor",size:"40×20ft",reach:"90K/day",rate:13500,status:"Available"},
  {id:"JHR-002-015",vendor:"CityAds",name:"JB City Centre Unipole",cat:"OOH",type:"Unipole",loc:"Johor Bahru, Johor",state:"Johor",size:"30×15ft",reach:"75K/day",rate:10500,status:"Available"},
  // IPOH OOH
  {id:"IPH-001-016",vendor:"NorthAds",name:"Ipoh Parade Facing",cat:"OOH",type:"Billboard",loc:"Ipoh, Perak",state:"Perak",size:"30×15ft",reach:"45K/day",rate:6500,status:"Available"},
  {id:"IPH-002-017",vendor:"NorthAds",name:"PLUS Highway Ipoh KM 190",cat:"OOH",type:"Unipole",loc:"Ipoh, Perak",state:"Perak",size:"25×12ft",reach:"52K/day",rate:7000,status:"Available"},
  // DIGITAL OOH - KL
  {id:"CIT-LED-018",vendor:"Citylites",name:"Bangsar LED Screen 1920×1080",cat:"Digital OOH",type:"LED",loc:"Bangsar, KL",state:"KL",size:"1920×1080px",reach:"60K/day",rate:25000,status:"Available"},
  {id:"CIT-LED-019",vendor:"Citylites",name:"Bukit Bintang LED Tower",cat:"Digital OOH",type:"LED",loc:"Bukit Bintang, KL",state:"KL",size:"2560×1440px",reach:"85K/day",rate:38000,status:"Available"},
  {id:"CIT-LED-020",vendor:"Citylites",name:"KLCC Podium Screen",cat:"Digital OOH",type:"LED",loc:"KLCC, KL",state:"KL",size:"1920×1080px",reach:"110K/day",rate:45000,status:"Booked"},
  {id:"CIT-LED-021",vendor:"Citylites",name:"Mont Kiara Digital Billboard",cat:"Digital OOH",type:"LED",loc:"Mont Kiara, KL",state:"KL",size:"1280×720px",reach:"42K/day",rate:18000,status:"Available"},
  {id:"CIT-LED-022",vendor:"Citylites",name:"Damansara Uptown Digital",cat:"Digital OOH",type:"LED",loc:"Damansara, Selangor",state:"Selangor",size:"1920×1080px",reach:"55K/day",rate:22000,status:"Available"},
  // MALL SCREENS
  {id:"PAV-001-023",vendor:"Pavilion Media",name:"Pavilion KL Entrance Screen",cat:"Digital OOH",type:"Mall Screen",loc:"Bukit Bintang, KL",state:"KL",size:"4096×2160px",reach:"150K/day",rate:55000,status:"Available"},
  {id:"PAV-002-024",vendor:"Pavilion Media",name:"Pavilion KL Lobby Pillar ×4",cat:"Digital OOH",type:"Mall Screen",loc:"Bukit Bintang, KL",state:"KL",size:"1080×1920px",reach:"120K/day",rate:30000,status:"Available"},
  {id:"MV-001-025",vendor:"IGB Media",name:"Mid Valley Concourse Screen",cat:"Digital OOH",type:"Mall Screen",loc:"Mid Valley, KL",state:"KL",size:"3840×2160px",reach:"180K/day",rate:62000,status:"Booked"},
  {id:"MV-002-026",vendor:"IGB Media",name:"The Gardens Mall Atrium",cat:"Digital OOH",type:"Mall Screen",loc:"Mid Valley, KL",state:"KL",size:"2560×1440px",reach:"95K/day",rate:35000,status:"Available"},
  {id:"SW-001-027",vendor:"Sunway Media",name:"Sunway Pyramid Main Entrance",cat:"Digital OOH",type:"Mall Screen",loc:"Petaling Jaya, Selangor",state:"Selangor",size:"3840×2160px",reach:"160K/day",rate:52000,status:"Available"},
  {id:"SW-002-028",vendor:"Sunway Media",name:"Sunway Pyramid Ice Rink Facing",cat:"Digital OOH",type:"Mall Screen",loc:"Petaling Jaya, Selangor",state:"Selangor",size:"1920×1080px",reach:"85K/day",rate:28000,status:"Available"},
  {id:"IOI-001-029",vendor:"IOI Properties",name:"IOI City Mall Grand Atrium",cat:"Digital OOH",type:"Mall Screen",loc:"Putrajaya, Selangor",state:"Selangor",size:"2560×1440px",reach:"120K/day",rate:40000,status:"Available"},
  {id:"UTM-001-030",vendor:"Ikano Media",name:"1 Utama Main Court Screen",cat:"Digital OOH",type:"Mall Screen",loc:"Petaling Jaya, Selangor",state:"Selangor",size:"3840×2160px",reach:"140K/day",rate:48000,status:"On Hold"},
  // TRANSIT / MRT
  {id:"MRT-001-031",vendor:"Rapid Media",name:"Bukit Bintang MRT Station",cat:"Transit",type:"Station Screen",loc:"Bukit Bintang, KL",state:"KL",size:"1080×1920px",reach:"95K/day",rate:20000,status:"Available"},
  {id:"MRT-002-032",vendor:"Rapid Media",name:"KLCC MRT Concourse",cat:"Transit",type:"Station Screen",loc:"KLCC, KL",state:"KL",size:"1080×1920px",reach:"110K/day",rate:24000,status:"Available"},
  {id:"MRT-003-033",vendor:"Rapid Media",name:"Muzium Negara MRT Platform ×6",cat:"Transit",type:"Platform Screen",loc:"Muzium Negara, KL",state:"KL",size:"1080×1920px",reach:"72K/day",rate:16000,status:"Available"},
  {id:"LRT-001-034",vendor:"Rapid Media",name:"Masjid Jamek LRT Interchange",cat:"Transit",type:"Station Screen",loc:"Masjid Jamek, KL",state:"KL",size:"1920×1080px",reach:"88K/day",rate:18500,status:"Booked"},
  {id:"LRT-002-035",vendor:"Rapid Media",name:"Kelana Jaya LRT Station",cat:"Transit",type:"Station Screen",loc:"Kelana Jaya, Selangor",state:"Selangor",size:"1080×1920px",reach:"65K/day",rate:14000,status:"Available"},
  {id:"BUS-001-036",vendor:"Rapid Media",name:"RapidKL Bus Wrap ×10 Units",cat:"Transit",type:"Bus Wrap",loc:"Klang Valley",state:"Selangor",size:"Full wrap",reach:"500K/week",rate:22000,status:"Available"},
  // PRINT
  {id:"NST-001-037",vendor:"Media Prima",name:"New Straits Times Full Page",cat:"Print",type:"Newspaper",loc:"National",state:"National",size:"A4 Full Page",reach:"200K/day",rate:45000,status:"Available"},
  {id:"NST-002-038",vendor:"Media Prima",name:"New Straits Times Half Page",cat:"Print",type:"Newspaper",loc:"National",state:"National",size:"A4 Half Page",reach:"200K/day",rate:25000,status:"Available"},
  {id:"STAR-001-039",vendor:"Star Media",name:"The Star Full Page",cat:"Print",type:"Newspaper",loc:"National",state:"National",size:"A4 Full Page",reach:"350K/day",rate:55000,status:"Available"},
  {id:"STAR-002-040",vendor:"Star Media",name:"The Star Half Page",cat:"Print",type:"Newspaper",loc:"National",state:"National",size:"A4 Half Page",reach:"350K/day",rate:30000,status:"Available"},
  {id:"BH-001-041",vendor:"Media Prima",name:"Berita Harian Full Page",cat:"Print",type:"Newspaper",loc:"National",state:"National",size:"A4 Full Page",reach:"180K/day",rate:38000,status:"Available"},
  {id:"HM-001-042",vendor:"Harian Metro",name:"Harian Metro Full Page",cat:"Print",type:"Newspaper",loc:"National",state:"National",size:"Tabloid Full Page",reach:"420K/day",rate:48000,status:"Available"},
  {id:"KCH-001-043",vendor:"Sarawak Media",name:"See Hua Daily KCH Full Page",cat:"Print",type:"Newspaper",loc:"Kuching, Sarawak",state:"Sarawak",size:"Broadsheet",reach:"85K/day",rate:18000,status:"Available"},
  {id:"MAG-001-044",vendor:"Blu Inc",name:"Her World Malaysia Full Page",cat:"Print",type:"Magazine",loc:"National",state:"National",size:"A4 Full Page",reach:"75K/issue",rate:28000,status:"Available"},
  {id:"MAG-002-045",vendor:"Blu Inc",name:"Men's Health Malaysia",cat:"Print",type:"Magazine",loc:"National",state:"National",size:"A4 Full Page",reach:"55K/issue",rate:22000,status:"Available"},
  // RADIO
  {id:"HOT-001-046",vendor:"Media Prima Radio",name:"HOT FM 30sec Primetime ×28",cat:"Radio",type:"Radio Spot",loc:"National",state:"National",size:"30sec × 28 spots",reach:"3.2M listeners",rate:42000,status:"Available"},
  {id:"HOT-002-047",vendor:"Media Prima Radio",name:"HOT FM 60sec Drive Time ×14",cat:"Radio",type:"Radio Spot",loc:"National",state:"National",size:"60sec × 14 spots",reach:"3.2M listeners",rate:35000,status:"Available"},
  {id:"ERA-001-048",vendor:"Media Prima Radio",name:"ERA FM 30sec Primetime ×28",cat:"Radio",type:"Radio Spot",loc:"National",state:"National",size:"30sec × 28 spots",reach:"2.8M listeners",rate:38000,status:"Available"},
  {id:"MYF-001-049",vendor:"Astro Radio",name:"MY FM 30sec Primetime ×28",cat:"Radio",type:"Radio Spot",loc:"National",state:"National",size:"30sec × 28 spots",reach:"2.1M listeners",rate:32000,status:"Available"},
  {id:"FLY-001-050",vendor:"Astro Radio",name:"FLY FM 30sec Drive Time ×14",cat:"Radio",type:"Radio Spot",loc:"National",state:"National",size:"30sec × 14 spots",reach:"1.5M listeners",rate:22000,status:"Available"},
  {id:"SIN-001-051",vendor:"Astro Radio",name:"SINAR FM 30sec ×28",cat:"Radio",type:"Radio Spot",loc:"National",state:"National",size:"30sec × 28 spots",reach:"2.4M listeners",rate:35000,status:"Available"},
  {id:"XFM-001-052",vendor:"Astro Radio",name:"988 FM 30sec ×14",cat:"Radio",type:"Radio Spot",loc:"National",state:"National",size:"30sec × 14 spots",reach:"1.2M listeners",rate:18000,status:"Available"},
  // TV
  {id:"TV3-001-053",vendor:"Media Prima TV",name:"TV3 Primetime 30sec ×7",cat:"TV",type:"TV Spot",loc:"National",state:"National",size:"30sec × 7 spots",reach:"4.5M viewers",rate:85000,status:"Available"},
  {id:"TV3-002-054",vendor:"Media Prima TV",name:"TV3 News Hour 30sec ×7",cat:"TV",type:"TV Spot",loc:"National",state:"National",size:"30sec × 7 spots",reach:"3.8M viewers",rate:72000,status:"Available"},
  {id:"NTV7-001-055",vendor:"Media Prima TV",name:"NTV7 Primetime 30sec ×7",cat:"TV",type:"TV Spot",loc:"National",state:"National",size:"30sec × 7 spots",reach:"2.2M viewers",rate:48000,status:"Available"},
  {id:"8TV-001-056",vendor:"Media Prima TV",name:"8TV Primetime 30sec ×7",cat:"TV",type:"TV Spot",loc:"National",state:"National",size:"30sec × 7 spots",reach:"1.8M viewers",rate:38000,status:"Available"},
  {id:"AST-001-057",vendor:"Astro",name:"Astro Ria 30sec Primetime ×7",cat:"TV",type:"TV Spot",loc:"National",state:"National",size:"30sec × 7 spots",reach:"3.5M viewers",rate:65000,status:"Available"},
  {id:"AST-002-058",vendor:"Astro",name:"Astro Awani 30sec ×14",cat:"TV",type:"TV Spot",loc:"National",state:"National",size:"30sec × 14 spots",reach:"2.8M viewers",rate:55000,status:"Booked"},
  // OUTDOOR KOTA KINABALU
  {id:"KK-001-059",vendor:"Sabah Outdoor",name:"KK City Centre Unipole",cat:"OOH",type:"Unipole",loc:"Kota Kinabalu, Sabah",state:"Sabah",size:"25×12ft",reach:"38K/day",rate:5500,status:"Available"},
  {id:"KK-002-060",vendor:"Sabah Outdoor",name:"KKIA Airport Approach",cat:"OOH",type:"Billboard",loc:"Kota Kinabalu, Sabah",state:"Sabah",size:"30×15ft",reach:"45K/day",rate:7000,status:"Available"},
  // KUCHING
  {id:"KCH-002-061",vendor:"Sarawak Outdoor",name:"Kuching Waterfront Billboard",cat:"OOH",type:"Billboard",loc:"Kuching, Sarawak",state:"Sarawak",size:"30×15ft",reach:"32K/day",rate:5000,status:"Available"},
  // LIGHTBOX / INDOOR
  {id:"AIR-001-062",vendor:"JCD",name:"KLIA2 Arrival Hall Lightbox ×4",cat:"OOH",type:"Lightbox",loc:"KLIA2, Selangor",state:"Selangor",size:"2×1m each",reach:"85K/day",rate:32000,status:"Available"},
  {id:"AIR-002-063",vendor:"JCD",name:"KLIA Main Terminal Faces ×6",cat:"OOH",type:"Lightbox",loc:"KLIA, Selangor",state:"Selangor",size:"2×1m each",reach:"110K/day",rate:48000,status:"Booked"},
  {id:"AIR-003-064",vendor:"JCD",name:"Pena