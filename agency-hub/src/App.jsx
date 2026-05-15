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
function Dashboard({go}){
  const [done,setDone]=useState([false,false,false,false,false]);
  return(
    <div className="flex flex-col gap-4">
      {/* Greeting */}
      <div className="rounded-2xl p-5 flex items-center gap-4" style={{background:"linear-gradient(120deg,#EEF2FF,#F0FDF9)",border:"1px solid #E0E7FF"}}>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{background:"linear-gradient(135deg,#6D28D9,#0D9488)"}}>🌅</div>
        <div className="flex-1"><div className="text-lg font-black text-gray-900">Good morning, Natasha.</div><div className="text-sm text-gray-500">Today: follow up 5 hot leads · send 2 proposals · close AEON BIG pitch by Friday</div></div>
        <button className="px-4 py-2 rounded-xl text-sm font-bold text-white flex-shrink-0" style={{background:T.purple}}>🎯 View Target</button>
      </div>
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

// ─── SCREEN: PROPOSAL BUILDER ────────────────────────────────────
function Proposals(){
  const rows=[
    {title:"AEON BIG – Retail Optimisation Solution",client:"AEON BIG",value:"RM 280K",owner:"Natasha Tan",sent:"May 7",viewed:"Viewed May 8, 9:21AM",stage:"Awaiting Approval",sc:"amber",ver:"v2",c:0},
    {title:"MYDIN – Store Operations Transformation",client:"MYDIN",value:"RM 210K",owner:"Jason Doe",sent:"May 6",viewed:"Opened May 6, 4:32PM",stage:"Under Review",sc:"blue",ver:"v1",c:1},
    {title:"KK Mart – Inventory & Demand Planning",client:"KK Mart",value:"RM 160K",owner:"Sarah Lee",sent:"May 5",viewed:"Not Viewed",stage:"Submitted",sc:"purple",ver:"v1",c:2},
    {title:"Jaya Grocer – Pricing Strategy Proposal",client:"Jaya Grocer",value:"RM 190K",owner:"Marcus Tee",sent:"May 3",viewed:"Viewed May 3",stage:"Under Review",sc:"blue",ver:"v3",c:3},
    {title:"AEON BIG – Marketing Partnership",client:"AEON BIG",value:"RM 120K",owner:"Natasha Tan",sent:"May 1",viewed:"Not Viewed",stage:"Draft",sc:"gray",ver:"v1",c:0},
  ];
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<FileText size={18}/>} label="Drafts" value="12" color={T.purple} sub="↓8% vs last 7 days"/>
        <Kpi icon={<Send size={18}/>} label="Sent" value="18" delta="↑20%" up color={T.teal} sub="vs last 7 days"/>
        <Kpi icon={<Eye size={18}/>} label="Awaiting Approval" value="6" color={T.orange} sub="↑2 vs last 7 days"/>
        <Kpi icon={<Award size={18}/>} label="Won from Proposal" value="RM 1.21M" delta="↑18%" up color={T.green} sub="vs last 7 days"/>
      </div>
      {/* Workflow */}
      <Card className="p-4">
        <div className="font-bold text-gray-900 mb-3">Proposal Workflow — 11 Steps</div>
        <div className="flex flex-wrap gap-2">
          {["Brief Received","Select Inventory","Creative Brief","Commercial Pricing","Creative Mockups","Internal Review","PDF Generated","Send to Client","Client Reviews","Revisions","Client Approval"].map((s,i)=>(
            <div key={s} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${i<3?"bg-green-100 text-green-700":i<7?"bg-purple-100 text-purple-700":"bg-gray-100 text-gray-500"}`}><span className="w-4 h-4 rounded-full flex items-center justify-center text-white font-black text-xs flex-shrink-0" style={{background:i<3?T.green:i<7?T.purple:T.textLight,fontSize:9}}>{i+1}</span>{s}</div>
          ))}
        </div>
      </Card>
      <div className="flex items-center gap-2 flex-wrap">
        {[{l:"Create Proposal",c:T.purple},{l:"Duplicate",c:T.teal},{l:"Send for Approval",c:T.orange},{l:"Export PDF",c:T.green}].map(a=>(
          <button key={a.l} className="px-4 py-2 rounded-xl text-sm text-white font-bold" style={{background:a.c}}>{a.l}</button>
        ))}
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 ml-auto"><Search size={13} className="text-gray-400"/><input className="bg-transparent text-sm outline-none" placeholder="Search proposals..."/></div>
      </div>
      <Card>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-gray-100">{["","Title","Client","Value","Owner","Sent","Viewed","Version","Stage",""].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map((r,i)=>(
                <tr key={i} className="hover:bg-purple-50/20 cursor-pointer">
                  <td className="px-4 py-3"><div className="w-10 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-xs font-black text-purple-400">PDF</div></td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800 whitespace-nowrap max-w-xs truncate">{r.title}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Av i={r.client.slice(0,2)} c={COLORS[r.c]} s={24}/><span className="text-sm text-gray-600 whitespace-nowrap">{r.client}</span></div></td>
                  <td className="px-4 py-3 text-sm font-black text-gray-900 whitespace-nowrap">{r.value}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{r.owner}</td>
                  <td className="px-4 py-3 text-sm text-gray-400 whitespace-nowrap">{r.sent}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-semibold flex items-center gap-1 whitespace-nowrap ${r.viewed.includes("Not")?"text-gray-400":"text-green-600"}`}><Eye size={11}/>{r.viewed}</span></td>
                  <td className="px-4 py-3"><span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">{r.ver}</span></td>
                  <td className="px-4 py-3"><Bdg t={r.stage} c={r.sc}/></td>
                  <td className="px-4 py-3 text-gray-400 cursor-pointer hover:text-gray-600">⋯</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden divide-y divide-gray-50">
          {rows.map((r,i)=>(
            <div key={i} className="p-4 flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-xs font-black text-purple-400 flex-shrink-0">PDF</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-gray-900 truncate">{r.title}</div>
                <div className="text-xs text-gray-500">{r.client} · {r.value} · {r.owner}</div>
                <div className="flex items-center gap-2 mt-1.5"><Bdg t={r.stage} c={r.sc}/><span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">{r.ver}</span></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── SCREEN: DEAL PIPELINE ────────────────────────────────────────
function Pipeline(){
  const stC={"New Lead":T.purple,"Qualified":T.teal,"Proposal Sent":T.orange,"Negotiation":"#7C3AED","Closed Won":T.green};
  const deals={"New Lead":[{co:"AEON BIG",v:"RM 60K",p:10,next:"Follow up call · May 13"},{co:"MYDIN",v:"RM 40K",p:10,next:"Discovery call · May 14"}],"Qualified":[{co:"KK Mart",v:"RM 120K",p:25,next:"Needs analysis · May 15"},{co:"Jaya Grocer",v:"RM 80K",p:25,next:"Solution demo · May 16"}],"Proposal Sent":[{co:"MYDIN",v:"RM 150K",p:50,next:"Proposal review · May 19"},{co:"AEON BIG",v:"RM 130K",p:50,next:"Proposal review · May 20"}],"Negotiation":[{co:"AEON",v:"RM 180K",p:70,next:"Contract review · May 21"},{co:"KK Mart",v:"RM 80K",p:70,next:"Final approval · May 22"}],"Closed Won":[{co:"MYDIN",v:"RM 160K",p:100,next:"Closed May 7"},{co:"Jaya Grocer",v:"RM 160K",p:100,next:"Closed May 6"}]};
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<BarChart3 size={18}/>} label="Pipeline Value" value="RM 1.61M" delta="↑18%" up color={T.purple} sub="vs last 30 days"/>
        <Kpi icon={<Activity size={18}/>} label="Weighted Forecast" value="RM 620K" delta="↑16%" up color={T.teal} sub="vs last 30 days"/>
        <Kpi icon={<Target size={18}/>} label="Win Rate" value="38%" delta="↑8pp" up color={T.orange} sub="vs last 30 days"/>
        <Kpi icon={<DollarSign size={18}/>} label="Avg Deal Size" value="RM 85K" delta="↑5%" up color={T.green} sub="vs last 30 days"/>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 md:mx-0 px-4 md:px-0">
        {Object.entries(deals).map(([stage,cards])=>(
          <div key={stage} className="flex-shrink-0 w-48 md:w-52">
            <div className="px-3 py-2 rounded-xl mb-2 text-white text-xs font-black" style={{background:stC[stage]}}>{stage}</div>
            {cards.map((d,i)=>(
              <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 mb-2 hover:shadow-md cursor-pointer">
                <div className="flex items-center gap-2 mb-2"><div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black text-white flex-shrink-0" style={{background:stC[stage]}}>{d.co.slice(0,2)}</div><span className="text-xs font-black text-gray-800 truncate">{d.co}</span></div>
                <div className="text-base font-black text-gray-900 mb-1.5">{d.v}</div>
                <div className="flex items-center gap-1 mb-1.5"><div className="flex-1 h-1 bg-gray-100 rounded-full"><div style={{width:d.p+"%",background:stC[stage],height:"100%",borderRadius:9}}/></div><span className="text-xs text-gray-400">{d.p}%</span></div>
                <div className="text-xs text-gray-400 truncate">{d.next}</div>
              </div>
            ))}
            <button className="w-full py-1.5 text-xs font-semibold rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-purple-300 hover:text-purple-400">+ Add Deal</button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="font-bold text-gray-900 mb-3">Revenue Forecast</div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={revData}><XAxis dataKey="m" tick={{fontSize:10,fill:"#94A3B8"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10,fill:"#94A3B8"}} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}M`}/><Tooltip formatter={v=>`RM ${v}K`} contentStyle={{borderRadius:8,border:"none"}}/><Bar dataKey="v" fill={T.purple} radius={[4,4,0,0]} opacity={0.8}/></BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-4">
          <div className="font-bold text-gray-900 mb-3">⚠️ Deals Needing Attention</div>
          {[{co:"AEON",v:"RM 180K · Negotiation",alert:"Overdue: Contract review",ac:"red",date:"May 7"},{co:"KK Mart",v:"RM 80K · Negotiation",alert:"No activity in 7 days",ac:"amber",date:"May 8"},{co:"MYDIN",v:"RM 120K · Qualified",alert:"No activity in 5 days",ac:"amber",date:"May 9"},{co:"Jaya Grocer",v:"RM 80K · Qualified",alert:"Needs next step",ac:"blue",date:"May 10"}].map((d,i)=>(
            <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
              <Av i={d.co.slice(0,2)} c={COLORS[i]} s={30}/>
              <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-gray-800">{d.co}</div><div className="text-xs text-gray-400">{d.v}</div></div>
              <Bdg t={d.alert} c={d.ac}/>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── SCREEN: CREATIVE HUB ────────────────────────────────────────
function Creative(){
  const [tab,setTab]=useState("mockups");
  const mockups=[
    {campaign:"AEON BIG Raya 2025",site:"ELITE Highway KM14.2",type:"Billboard",deadline:"Mar 10",status:"Done",c:0},
    {campaign:"MYDIN Mid-Year Sale",site:"Bangsar LED Screen",type:"Digital LED",deadline:"May 20",status:"In Progress",c:1},
    {campaign:"KK Mart Klang Launch",site:"Klang Town Centre",type:"Unipole",deadline:"May 28",status:"Pending",c:2},
  ];
  const artworks=[
    {campaign:"AEON BIG Raya 2025",site:"ELITE Highway KM14.2",dims:"40x20ft",format:"PDF/CMYK",dpi:"25",deadline:"May 28",status:"Sent to Vendor",validation:"✅ Passed",c:0},
    {campaign:"AEON BIG Raya 2025",site:"Bangsar LED 1920x1080",dims:"1920x1080px",format:"JPEG/RGB",dpi:"72",deadline:"May 28",status:"In Progress",validation:"⚠️ Check DPI",c:0},
    {campaign:"MYDIN Mid-Year",site:"Sunway Pyramid Portrait",dims:"3x6m",format:"PDF/CMYK",dpi:"30",deadline:"May 30",status:"Done",validation:"✅ Passed",c:1},
    {campaign:"KK Mart Launch",site:"Klang Town Unipole",dims:"20x10ft",format:"PDF/CMYK",dpi:"25",deadline:"Jun 5",status:"Pending",validation:"⬜ Not started",c:2},
  ];
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<Palette size={18}/>} label="Mockup Tasks" value="8" color={T.purple} sub="active this week"/>
        <Kpi icon={<FileText size={18}/>} label="Artwork Jobs" value="12" color={T.teal} sub="sites to adapt"/>
        <Kpi icon={<AlertTriangle size={18}/>} label="Spec Failures" value="2" color={T.red} sub="need correction"/>
        <Kpi icon={<CheckCircle size={18}/>} label="Delivered to Vendor" value="5" color={T.green} sub="this week"/>
      </div>
      {/* Tabs */}
      <div className="flex gap-2">
        {[{id:"mockups",l:"📐 Phase 1 — Proposal Mockups"},{id:"artworks",l:"🎨 Phase 2 — Artwork Adaptation"}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab===t.id?"text-white":"text-gray-500 bg-gray-100 hover:bg-gray-200"}`} style={tab===t.id?{background:T.purple}:{}}>{t.l}</button>
        ))}
      </div>
      {tab==="mockups"&&(
        <Card>
          <div className="flex items-center justify-between p-4 border-b border-gray-100"><span className="font-bold text-gray-900">Superimposed Mockup Tasks</span><Bdg t="Auto-created when sites selected in Proposal" c="purple"/></div>
          <div className="divide-y divide-gray-50">
            {mockups.map((m,i)=>(
              <div key={i} className="p-4 flex items-center gap-4">
                <div className="w-16 h-12 rounded-xl flex items-center justify-center text-white font-black text-xs flex-shrink-0" style={{background:`linear-gradient(135deg,${COLORS[m.c]},${COLORS[(m.c+1)%COLORS.length]})`}}>SITE{i+1}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-gray-900 truncate">{m.campaign}</div>
                  <div className="text-xs text-gray-500">{m.site} · {m.type}</div>
                </div>
                <div className="text-xs text-gray-400 flex-shrink-0">📅 {m.deadline}</div>
                <Bdg t={m.status} c={m.status==="Done"?"green":m.status==="In Progress"?"teal":"orange"}/>
                <button className="px-3 py-1.5 rounded-xl text-xs font-bold border border-purple-200 text-purple-600 hover:bg-purple-50 flex-shrink-0"><Upload size={11} className="inline mr-1"/>Upload</button>
              </div>
            ))}
          </div>
        </Card>
      )}
      {tab==="artworks"&&(
        <>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2">
            <span className="text-lg flex-shrink-0">🤖</span>
            <div className="text-sm text-amber-700"><strong>AI Auto-Generated:</strong> Artwork Job Sheet created from Master Inventory specs when PO confirmed. Client provides one master — system lists all sites with exact specs for adaptation.</div>
          </div>
          <Card>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between"><span className="font-bold text-gray-900">Artwork Job Sheet — Active Campaigns</span><button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white font-bold" style={{background:T.purple}}><Download size={13}/>Export Job Sheet</button></div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-gray-100">{["Campaign","Site","Dimensions","Format","DPI","Deadline","Validation","Status",""].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase whitespace-nowrap">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-gray-50">
                  {artworks.map((a,i)=>(
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800 whitespace-nowrap">{a.campaign}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{a.site}</td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-600 whitespace-nowrap">{a.dims}</td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-600 whitespace-nowrap">{a.format}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{a.dpi}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{a.deadline}</td>
                      <td className="px-4 py-3 text-sm">{a.validation}</td>
                      <td className="px-4 py-3"><Bdg t={a.status} c={a.status==="Sent to Vendor"?"green":a.status==="Done"?"teal":a.status==="In Progress"?"blue":"gray"}/></td>
                      <td className="px-4 py-3"><button className="px-2 py-1 rounded-lg text-xs font-bold border border-gray-200 hover:bg-gray-50 text-gray-500 whitespace-nowrap"><Upload size={10} className="inline mr-1"/>Upload</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card className="p-4">
            <div className="font-bold text-gray-900 mb-3">File Validation Rules — System Enforced</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[{r:"Dimensions must match spec ±5%",a:"Warning — manual override required",t:"warn"},{r:"PDF must be CMYK, not RGB",a:"Hard block — file rejected",t:"block"},{r:"Resolution below min DPI",a:"Warning — correction guide shown",t:"warn"},{r:"File size exceeds vendor limit",a:"Warning — compression suggested",t:"warn"},{r:"Wrong file format submitted",a:"Hard block — correct format specified",t:"block"}].map((v,i)=>(
                <div key={i} className={`flex items-start gap-2 p-2.5 rounded-xl ${v.t==="block"?"bg-red-50 border border-red-100":"bg-amber-50 border border-amber-100"}`}>
                  <span className="text-sm flex-shrink-0">{v.t==="block"?"🔴":"⚠️"}</span>
                  <div><div className="text-xs font-bold text-gray-800">{v.r}</div><div className="text-xs text-gray-500">{v.a}</div></div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

// ─── SCREEN: MASTER INVENTORY ─────────────────────────────────────
function Inventory(){
  const [tab,setTab]=useState("media");
  const media=[
    {id:"BTO-ELITE-KL-001",vendor:"Big Tree",name:"ELITE Highway KM14.2 NB",cat:"OOH",type:"Billboard",loc:"Selangor",size:"40x20ft",reach:"120K/day",rate:"RM 18,000",status:"Available"},
    {id:"BTO-AKLEH-KL-002",vendor:"Big Tree",name:"AKLEH KM 8.5 Southbound",cat:"OOH",type:"Unipole",loc:"KL",size:"30x15ft",reach:"85K/day",rate:"RM 12,000",status:"Booked"},
    {id:"LED-BSR-001",vendor:"Citylites",name:"Bangsar LED Screen",cat:"Digital OOH",type:"LED",loc:"KL",size:"1920x1080px",reach:"60K/day",rate:"RM 25,000",status:"Available"},
    {id:"PRINT-NST-001",vendor:"Media Prima",name:"NST Full Page",cat:"Print",type:"Newspaper",loc:"National",size:"A4",reach:"200K/day",rate:"RM 45,000",status:"Available"},
  ];
  const physical=[
    {vendor:"Printmaster",name:"Pull-Up Banner — Fabric",cat:"Standee",dims:"85x200cm",cost:"RM 180/unit",moq:"10",lead:"5 days",stock:"50"},
    {vendor:"Signcraft",name:"Foam Board Display",cat:"Display",dims:"60x90cm",cost:"RM 95/unit",moq:"20",lead:"3 days",stock:"120"},
    {vendor:"Fabrica",name:"Custom Printed T-Shirt",cat:"Merchandise",dims:"All sizes",cost:"RM 35/unit",moq:"50",lead:"7 days",stock:"200"},
  ];
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<Package size={18}/>} label="Media Inventory" value="1,248" color={T.purple} sub="sites standardised"/>
        <Kpi icon={<Package size={18}/>} label="Physical Items" value="84" color={T.teal} sub="fabrication items"/>
        <Kpi icon={<CheckCircle size={18}/>} label="Available" value="891" color={T.green} sub="ready to book"/>
        <Kpi icon={<AlertTriangle size={18}/>} label="Booked" value="357" color={T.orange} sub="currently active"/>
      </div>
      {/* AI Extraction */}
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-3"><span className="text-lg">🤖</span><div><div className="font-bold text-gray-900">AI Extraction Pipeline</div><div className="text-xs text-gray-500">Upload any vendor PDF or PPT — AI standardises into Master Inventory automatically</div></div></div>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] border-2 border-dashed border-purple-200 rounded-xl px-4 py-3 bg-purple-50 cursor-pointer hover:bg-purple-100">
            <Upload size={16} className="text-purple-500"/><span className="text-sm text-purple-600 font-semibold">Drop vendor PDF or PPT here</span>
          </div>
          {["Upload","Convert PPT→PDF","AI Extract","Preview","Review & Save"].map((s,i)=>(
            <div key={s} className="flex items-center gap-1">
              <div className={`px-3 py-1.5 rounded-lg text-xs font-bold ${i<2?"bg-green-100 text-green-700":"bg-gray-100 text-gray-500"}`}>{s}</div>
              {i<4&&<ChevronRight size={12} className="text-gray-300"/>}
            </div>
          ))}
        </div>
      </Card>
      <div className="flex gap-2">
        {[{id:"media",l:"📡 Media Inventory"},{id:"physical",l:"📦 Physical & Fabrication"}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab===t.id?"text-white":"bg-gray-100 text-gray-500"}`} style={tab===t.id?{background:T.purple}:{}}>{t.l}</button>
        ))}
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 ml-auto"><Search size={13} className="text-gray-400"/><input className="bg-transparent text-sm outline-none" placeholder="Search inventory..."/></div>
      </div>
      {tab==="media"&&(
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-gray-100">{["ID","Vendor","Site Name","Category","Type","Location","Size","Reach","Rate Card","Status"].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase whitespace-nowrap">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-gray-50">
                {media.map((m,i)=>(
                  <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500 whitespace-nowrap">{m.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{m.vendor}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 whitespace-nowrap">{m.name}</td>
                    <td className="px-4 py-3"><Bdg t={m.cat} c="purple"/></td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{m.type}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{m.loc}</td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-600 whitespace-nowrap">{m.size}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{m.reach}</td>
                    <td className="px-4 py-3 text-sm font-black text-gray-900 whitespace-nowrap">{m.rate}</td>
                    <td className="px-4 py-3"><Bdg t={m.status} c={m.status==="Available"?"green":"orange"}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      {tab==="physical"&&(
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-gray-100">{["Vendor","Item","Category","Dimensions","Unit Cost","Min Order","Lead Time","Stock"].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase whitespace-nowrap">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-gray-50">
                {physical.map((p,i)=>(
                  <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-4 py-3 text-sm text-gray-700">{p.vendor}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{p.name}</td>
                    <td className="px-4 py-3"><Bdg t={p.cat} c="teal"/></td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-600">{p.dims}</td>
                    <td className="px-4 py-3 text-sm font-black text-gray-900">{p.cost}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{p.moq}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{p.lead}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── SCREEN: MEDIA ORDER & PO ─────────────────────────────────────
function Orders({role="admin"}){
  // Roles that can see vendor cost, PO, and AI pricing
  const canSeeCost = ["admin","commercial","finance"].includes(role);
  const canSeePO   = ["admin","commercial","finance"].includes(role);

  const orders=[
    {ref:"MO-2025-041",client:"AEON BIG",campaign:"Raya 2025 OOH",value:"RM 230,000",issued:"May 7",expires:"May 14",status:"Signed",c:0},
    {ref:"MO-2025-040",client:"MYDIN",campaign:"Mid-Year Sale Digital",value:"RM 180,000",issued:"May 6",expires:"May 13",status:"Awaiting Signature",c:1},
    {ref:"MO-2025-039",client:"KK Mart",campaign:"Store Launch Billboard",value:"RM 95,000",issued:"May 5",expires:"May 12",status:"Signed",c:2},
  ];
  const pos=[
    {ref:"PO-2025-041",vendor:"Big Tree",mo:"MO-2025-041",items:"ELITE KM14 (1 month)",quoted:"RM 18,000",nego:"RM 14,500",saving:"19.4%",status:"Sent",c:0},
    {ref:"PO-2025-040B",vendor:"Citylites",mo:"MO-2025-041",items:"Bangsar LED (1 month)",quoted:"RM 25,000",nego:"RM 19,800",saving:"20.8%",status:"Approved",c:1},
    {ref:"PO-2025-039",vendor:"Big Tree",mo:"MO-2025-039",items:"Klang Unipole (2 months)",quoted:"RM 24,000",nego:"RM 18,500",saving:"22.9%",status:"Pending Approval",c:2},
  ];
  return(
    <div className="flex flex-col gap-4">

      {/* Sales-only notice */}
      {!canSeeCost&&(
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-xl flex-shrink-0">ℹ️</span>
          <div>
            <div className="font-bold text-blue-900 text-sm">Sales View — Media Orders Only</div>
            <div className="text-sm text-blue-700">You can create and manage Company Media Orders for client signature. Vendor costs and Purchase Orders are handled by the Commercial team.</div>
          </div>
        </div>
      )}

      {/* Rule Banner — shown to all */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
        <span className="text-xl flex-shrink-0">🔒</span>
        <div><div className="font-bold text-red-800 text-sm">System Rule — Enforced</div><div className="text-sm text-red-700">A Purchase Order to any media owner CANNOT be created until the Company Media Order has been signed by the client. This is not optional.</div></div>
      </div>

      <div className={`grid grid-cols-1 ${canSeePO?"md:grid-cols-2":""} gap-4`}>

        {/* Media Orders — visible to all with access */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-gray-900">📄 Company Media Orders</h3>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white font-bold" style={{background:T.purple}}><Plus size={13}/>Generate</button>
          </div>
          <div className="text-xs text-gray-500 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">Created by <strong>Sales Team</strong> · Signed by <strong>Client</strong> · Sent via Outlook · AI detects signed copy in email</div>
          {orders.map((o,i)=>(
            <Card key={i} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2"><span className="text-xs font-mono text-gray-400">{o.ref}</span><Bdg t={o.status} c={o.status==="Signed"?"green":"amber"}/></div>
                  <div className="text-sm font-bold text-gray-900 mt-1">{o.client} — {o.campaign}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Issued {o.issued} · Expires {o.expires}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-base font-black text-gray-900">{o.value}</div>
                  <div className="text-xs text-gray-400">Client price</div>
                </div>
              </div>
              {o.status==="Awaiting Signature"&&(
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-2 flex items-center gap-2">
                  <span className="text-sm">⏳</span>
                  <span className="text-xs text-amber-700 font-semibold">Waiting for client signature. PO locked until signed.</span>
                </div>
              )}
              {o.status==="Signed"&&canSeePO&&(
                <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-2 flex items-center gap-2">
                  <span className="text-sm">✅</span>
                  <span className="text-xs text-green-700 font-semibold">Signed. Commercial team may now raise PO.</span>
                </div>
              )}
              {o.status==="Signed"&&!canSeePO&&(
                <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-2 flex items-center gap-2">
                  <span className="text-sm">✅</span>
                  <span className="text-xs text-green-700 font-semibold">Signed. Commercial team notified to proceed with booking.</span>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Purchase Orders — HIDDEN from Sales */}
        {canSeePO&&(
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-gray-900">🛒 Purchase Orders <span className="text-xs font-normal text-gray-400 ml-1">(Commercial only)</span></h3>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white font-bold" style={{background:T.teal}}><Plus size={13}/>Raise PO</button>
            </div>
            <div className="text-xs text-gray-500 bg-teal-50 border border-teal-100 rounded-xl px-3 py-2">Created by <strong>Commercial Team</strong> · Sent to <strong>Media Owner</strong> · Unlocked only after MO signed · AI Pricing shown</div>
            {pos.map((p,i)=>(
              <Card key={i} className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2"><span className="text-xs font-mono text-gray-400">{p.ref}</span><Bdg t={p.status} c={p.status==="Sent"?"blue":p.status==="Approved"?"green":"amber"}/></div>
                    <div className="text-sm font-bold text-gray-900 mt-1">{p.vendor} — {p.items}</div>
                    <div className="text-xs text-gray-400 mt-0.5">Linked to {p.mo}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2 text-center"><div className="text-xs text-gray-400">Vendor Quoted</div><div className="text-sm font-black text-gray-700">{p.quoted}</div></div>
                  <div className="bg-green-50 rounded-lg p-2 text-center"><div className="text-xs text-gray-400">Negotiated</div><div className="text-sm font-black text-green-700">{p.nego}</div></div>
                  <div className="bg-purple-50 rounded-lg p-2 text-center"><div className="text-xs text-gray-400">Saving</div><div className="text-sm font-black text-purple-700">{p.saving}</div></div>
                </div>
              </Card>
            ))}

            {/* AI Pricing — Commercial/Admin/Finance only */}
            <Card className="p-4 border-2 border-purple-200 bg-purple-50">
              <div className="flex items-center gap-2 mb-3"><span className="text-lg">🤖</span><span className="font-bold text-purple-900">AI Pricing Intelligence</span><Bdg t="Commercial only" c="purple"/></div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[{l:"Vendor Quoted",v:"RM 18,000",c:"text-gray-700"},{l:"Your Historical Avg",v:"RM 14,200",c:"text-blue-700"},{l:"Best Price Achieved",v:"RM 11,500",c:"text-green-700"},{l:"Fair Market Range",v:"RM 13,500–15,000",c:"text-teal-700"},{l:"Suggested Opening",v:"RM 12,000",c:"text-purple-700 font-black"},{l:"Walk Away Above",v:"RM 16,500",c:"text-red-600"}].map(f=>(
                  <div key={f.l} className="bg-white rounded-lg p-2"><div className="text-xs text-gray-400">{f.l}</div><div className={`font-bold ${f.c}`}>{f.v}</div></div>
                ))}
              </div>
            </Card>

            {/* Margin — Admin/Finance only */}
            {["admin","finance"].includes(role)&&(
              <Card className="p-4 border-2 border-amber-200 bg-amber-50">
                <div className="flex items-center gap-2 mb-3"><span className="text-lg">💰</span><span className="font-bold text-amber-900">Agency Margin</span><Bdg t="Admin & Finance only" c="amber"/></div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-xl p-3 text-center"><div className="text-xs text-gray-400">Client Billed (MO)</div><div className="text-base font-black text-gray-900">RM 230,000</div></div>
                  <div className="bg-white rounded-xl p-3 text-center"><div className="text-xs text-gray-400">Vendor Cost (PO)</div><div className="text-base font-black text-gray-700">RM 180,000</div></div>
                  <div className="bg-white rounded-xl p-3 text-center border-2 border-green-200"><div className="text-xs text-gray-400">Agency Margin</div><div className="text-base font-black text-green-700">RM 50,000</div><div className="text-xs text-green-600 font-bold">21.7%</div></div>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SCREEN: CAMPAIGN EXECUTION ───────────────────────────────────
function Execution(){
  const campaigns=[
    {client:"AEON BIG",name:"Raya 2025 OOH",incharge:"Jun 1",artwork:"✅",dbp:"✅",proof:"✅",pop:"⏳",report:"⬜",status:"Live",c:0},
    {client:"MYDIN",name:"Mid-Year Sale Digital",incharge:"Jun 5",artwork:"✅",dbp:"⏳",proof:"⬜",pop:"⬜",report:"⬜",status:"At Risk",c:1},
    {client:"KK Mart",name:"Store Launch Billboard",incharge:"Jun 10",artwork:"⏳",dbp:"⬜",proof:"⬜",pop:"⬜",report:"⬜",status:"In Progress",c:2},
    {client:"Jaya Grocer",name:"Q3 Brand Campaign",incharge:"Jul 1",artwork:"⬜",dbp:"⬜",proof:"⬜",pop:"⬜",report:"⬜",status:"Not Started",c:3},
  ];
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<Zap size={18}/>} label="Active Campaigns" value="8" color={T.purple}/>
        <Kpi icon={<AlertTriangle size={18}/>} label="DBP Pending" value="3" color={T.orange} sub="needs action"/>
        <Kpi icon={<CheckCircle size={18}/>} label="Proof of Play Done" value="5" color={T.green}/>
        <Kpi icon={<FileText size={18}/>} label="Reports Due" value="2" color={T.red} sub="overdue"/>
      </div>
      {/* Pipeline status */}
      <Card className="p-4">
        <div className="font-bold text-gray-900 mb-3">Campaign Execution Checkpoints</div>
        <div className="flex items-center gap-1 flex-wrap">
          {["PO Confirmed","Artwork","DBP Approval","Colour Proof","In-Charge","LIVE","Exposure Report"].map((s,i)=>(
            <div key={s} className="flex items-center gap-1">
              <div className={`px-3 py-1.5 rounded-xl text-xs font-bold ${i<4?"bg-green-100 text-green-700":i===4?"text-white":"bg-gray-100 text-gray-400"}`} style={i===4?{background:T.teal}:{}}>{s}</div>
              {i<6&&<ChevronRight size={12} className="text-gray-300"/>}
            </div>
          ))}
        </div>
      </Card>
      {/* Campaign tracker - mobile cards */}
      <div className="md:hidden flex flex-col gap-3">
        {campaigns.map((c,i)=>(
          <Card key={i} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2"><Av i={c.client.slice(0,2)} c={COLORS[c.c]} s={32}/><div><div className="text-sm font-bold text-gray-900">{c.client}</div><div className="text-xs text-gray-500">{c.name}</div></div></div>
              <Bdg t={c.status} c={c.status==="Live"?"green":c.status==="At Risk"?"red":c.status==="In Progress"?"blue":"gray"}/>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {[{l:"Art",v:c.artwork},{l:"DBP",v:c.dbp},{l:"Proof",v:c.proof},{l:"PoP",v:c.pop},{l:"Report",v:c.report}].map(s=>(
                <div key={s.l} className="bg-gray-50 rounded-lg p-2 text-center"><div className="text-base">{s.v}</div><div className="text-xs text-gray-400">{s.l}</div></div>
              ))}
            </div>
            <div className="text-xs text-gray-400 mt-2">📅 In-charge: {c.incharge}</div>
          </Card>
        ))}
      </div>
      {/* Desktop table */}
      <Card className="hidden md:block">
        <div className="flex items-center justify-between p-4 border-b border-gray-100"><span className="font-bold text-gray-900">Campaign Execution Tracker</span><button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white font-bold" style={{background:T.purple}}><Plus size={13}/>New Campaign</button></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-gray-100">{["Client","Campaign","In-Charge","Artwork","DBP","Colour Proof","Proof of Play","Report","Status"].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-50">
              {campaigns.map((c,i)=>(
                <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Av i={c.client.slice(0,2)} c={COLORS[c.c]} s={28}/><span className="text-sm font-semibold whitespace-nowrap">{c.client}</span></div></td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{c.name}</td>
                  <td className="px-4 py-3 text-sm font-semibold whitespace-nowrap">{c.incharge}</td>
                  {[c.artwork,c.dbp,c.proof,c.pop,c.report].map((s,j)=><td key={j} className="px-4 py-3 text-center text-lg">{s}</td>)}
                  <td className="px-4 py-3"><Bdg t={c.status} c={c.status==="Live"?"green":c.status==="At Risk"?"red":c.status==="In Progress"?"blue":"gray"}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {/* Alerts */}
      <Card className="p-4">
        <div className="font-bold text-gray-900 mb-3">⚠️ Active Alerts — AI Monitored</div>
        {[{msg:"MYDIN Mid-Year Sale — DBP not submitted. In-charge in 14 days.",c:"orange"},{msg:"KK Mart Store Launch — Artwork not uploaded. In-charge in 21 days.",c:"red"},{msg:"Jaya Grocer Q3 — Creative brief not yet issued to Creative team.",c:"blue"}].map((a,i)=>(
          <div key={i} className={`flex items-start gap-2 p-3 rounded-xl mb-2 ${a.c==="orange"?"bg-amber-50 border border-amber-200":a.c==="red"?"bg-red-50 border border-red-200":"bg-blue-50 border border-blue-200"}`}>
            <AlertTriangle size={14} className={`flex-shrink-0 mt-0.5 ${a.c==="orange"?"text-amber-500":a.c==="red"?"text-red-500":"text-blue-500"}`}/>
            <span className="text-sm text-gray-700">{a.msg}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── SCREEN: TIME TRACKER ─────────────────────────────────────────
function TimeTracker(){
  const [active,setActive]=useState(null);
  const entries=[
    {user:"Sarah Lee",dept:"Creative",project:"AEON BIG Raya",task:"Artwork Adaptation",hrs:3.5,billable:true,rate:150,c:0},
    {user:"Jason Doe",dept:"Channel",project:"MYDIN Store Ops",task:"Proposal Writing",hrs:2.0,billable:true,rate:120,c:1},
    {user:"Natasha Tan",dept:"Sales",project:"KK Mart Launch",task:"Client Meeting",hrs:1.5,billable:false,rate:0,c:2},
    {user:"Amir Rahman",dept:"Commercial",project:"Jaya Grocer Q3",task:"Vendor Negotiation",hrs:2.5,billable:false,rate:0,c:3},
    {user:"Farah Lim",dept:"Creative",project:"AEON BIG Raya",task:"Superimposed Mockup",hrs:4.0,billable:true,rate:150,c:4},
  ];
  const billableTotal=entries.filter(e=>e.billable).reduce((a,e)=>a+e.hrs*e.rate,0);
  const totalHrs=entries.reduce((a,e)=>a+e.hrs,0);
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<Clock size={18}/>} label="Total Hours Today" value={`${totalHrs}h`} color={T.purple} sub="team total"/>
        <Kpi icon={<DollarSign size={18}/>} label="Billable Value" value={`RM ${(billableTotal/1000).toFixed(1)}K`} color={T.green} sub="this week"/>
        <Kpi icon={<Activity size={18}/>} label="Utilisation Rate" value="72%" delta="↑3%" up color={T.teal} sub="vs last week"/>
        <Kpi icon={<AlertTriangle size={18}/>} label="Overloaded Staff" value="1" color={T.red} sub="Sarah Lee — 52hrs"/>
      </div>
      {/* AI Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-xl flex-shrink-0">🤖</span>
        <div className="flex-1"><span className="font-bold text-amber-800">AI Overload Alert: </span><span className="text-sm text-amber-700">Sarah Lee has 52hrs assigned this week — 12hrs over capacity. Farah Lim has 12hrs available. Suggest reassigning MYDIN mockup to Farah.</span></div>
        <button className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-amber-500 flex-shrink-0">Reassign</button>
      </div>
      {/* Entry methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[{icon:"▶️",title:"Live Timer",desc:"Click Start on task, Stop when done",color:T.green},{icon:"📝",title:"End-of-Day Entry",desc:"Review task list, enter hours manually",color:T.blue},{icon:"🤖",title:"AI-Assisted",desc:"AI reviews calendar & files, suggests hours for approval",color:T.purple}].map(m=>(
          <Card key={m.title} className="p-4">
            <div className="text-2xl mb-2">{m.icon}</div>
            <div className="font-bold text-gray-900 text-sm mb-1">{m.title}</div>
            <div className="text-xs text-gray-500">{m.desc}</div>
          </Card>
        ))}
      </div>
      {/* Entries - mobile cards */}
      <div className="md:hidden flex flex-col gap-3">
        {entries.map((e,i)=>(
          <Card key={i} className="p-4">
            <div className="flex items-start gap-3">
              <Av i={e.user.split(" ").map(n=>n[0]).join("")} c={COLORS[e.c]} s={36}/>
              <div className="flex-1">
                <div className="flex items-center justify-between"><div className="text-sm font-bold text-gray-900">{e.user}</div><div className="text-sm font-black text-gray-900">{e.hrs}h</div></div>
                <div className="text-xs text-gray-500">{e.task} · {e.project}</div>
                <div className="flex items-center justify-between mt-2">
                  <Bdg t={e.dept} c={e.dept==="Creative"?"purple":e.dept==="Channel"?"teal":"gray"}/>
                  <span className={`text-xs font-bold ${e.billable?"text-green-600":"text-gray-400"}`}>{e.billable?`RM ${(e.hrs*e.rate).toLocaleString()}`:"Internal"}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {/* Desktop table */}
      <Card className="hidden md:block">
        <div className="flex items-center justify-between p-4 border-b border-gray-100"><span className="font-bold text-gray-900">Today's Time Entries</span><button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white font-bold" style={{background:T.purple}}><Plus size={13}/>Log Time</button></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-gray-100">{["Staff","Dept","Project","Task","Hours","Billable","Amount",""].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-50">
              {entries.map((e,i)=>(
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Av i={e.user.split(" ").map(n=>n[0]).join("")} c={COLORS[e.c]} s={28}/><span className="text-sm font-semibold whitespace-nowrap">{e.user}</span></div></td>
                  <td className="px-4 py-3"><Bdg t={e.dept} c={e.dept==="Creative"?"purple":e.dept==="Channel"?"teal":"gray"}/></td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{e.project}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{e.task}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><span className="text-sm font-black text-gray-900">{e.hrs}h</span><button onClick={()=>setActive(active===i?null:i)} className={`px-2 py-1 rounded-lg text-xs font-bold ${active===i?"bg-red-100 text-red-600":"bg-green-100 text-green-600"}`}>{active===i?"■ Stop":"▶ Start"}</button></div></td>
                  <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-1 rounded-full ${e.billable?"bg-green-100 text-green-700":"bg-gray-100 text-gray-400"}`}>{e.billable?"Billable":"Internal"}</span></td>
                  <td className="px-4 py-3 text-sm font-black text-gray-900">{e.billable?`RM ${(e.hrs*e.rate).toLocaleString()}`:"—"}</td>
                  <td className="px-4 py-3 text-gray-400 cursor-pointer">⋯</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex justify-between text-sm"><span className="text-gray-500">Total: <strong className="text-gray-900">{totalHrs}h</strong></span><span className="text-gray-500">Billable value: <strong className="text-green-700">RM {billableTotal.toLocaleString()}</strong></span></div>
      </Card>
    </div>
  );
}

// ─── SCREEN: INVOICING ───────────────────────────────────────────
function Invoicing(){
  const [tab,setTab]=useState("ar");
  const ar=[
    {ref:"INV-2025-041",client:"AEON BIG",campaign:"Raya 2025 OOH",amount:"RM 230,000",due:"Jun 7",status:"Sent",c:0},
    {ref:"INV-2025-040",client:"MYDIN",campaign:"Mid-Year Sale",amount:"RM 180,000",due:"Jun 6",status:"Paid",c:1},
    {ref:"INV-2025-039",client:"KK Mart",campaign:"Store Launch",amount:"RM 95,000",due:"Jun 5",status:"Overdue",c:2},
    {ref:"INV-2025-038",client:"Jaya Grocer",campaign:"Q2 Campaign",amount:"RM 120,000",due:"May 31",status:"Paid",c:3},
  ];
  const ap=[
    {ref:"SINV-041A",vendor:"Big Tree",po:"PO-2025-041",amount:"RM 14,500",match:"✅ 3-Way Match Passed",status:"Auto-Approved",c:0},
    {ref:"SINV-041B",vendor:"Citylites",po:"PO-2025-041",amount:"RM 21,000",match:"⚠️ Amount differs >5%",status:"Finance Review",c:1},
    {ref:"SINV-039",vendor:"Big Tree",po:"PO-2025-039",amount:"RM 18,500",match:"✅ 3-Way Match Passed",status:"Pending Payment",c:2},
  ];
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<Receipt size={18}/>} label="Invoiced This Month" value="RM 625K" color={T.purple} sub="total AR raised"/>
        <Kpi icon={<CheckCircle size={18}/>} label="Collected" value="RM 300K" color={T.green} sub="48% collection rate"/>
        <Kpi icon={<AlertTriangle size={18}/>} label="Outstanding AR" value="RM 325K" color={T.orange} sub="pending collection"/>
        <Kpi icon={<RefreshCw size={18}/>} label="AutoCount Sync" value="Today 8AM" color={T.teal} sub="last synced"/>
      </div>
      <div className="flex gap-2">
        {[{id:"ar",l:"📤 Client Invoices (AR)"},{id:"ap",l:"📥 Supplier Invoices (AP)"}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab===t.id?"text-white":"bg-gray-100 text-gray-500"}`} style={tab===t.id?{background:T.purple}:{}}>{t.l}</button>
        ))}
      </div>
      {tab==="ar"&&(
        <>
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 text-sm text-teal-700"><strong>Auto-generated</strong> from confirmed Media Orders · Auto-synced to AutoCount · Auto-emailed to client billing contact via Outlook</div>
          <Card>
            <div className="flex items-center justify-between p-4 border-b border-gray-100"><span className="font-bold text-gray-900">Client Invoices</span><button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white font-bold" style={{background:T.purple}}><Plus size={13}/>Generate Invoice</button></div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-gray-100">{["Reference","Client","Campaign","Amount","Due Date","Status",""].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase whitespace-nowrap">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-gray-50">
                  {ar.map((r,i)=>(
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-xs font-mono text-gray-500 whitespace-nowrap">{r.ref}</td>
                      <td className="px-4 py-3"><div className="flex items-center gap-2"><Av i={r.client.slice(0,2)} c={COLORS[r.c]} s={24}/><span className="text-sm font-semibold text-gray-800 whitespace-nowrap">{r.client}</span></div></td>
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{r.campaign}</td>
                      <td className="px-4 py-3 text-sm font-black text-gray-900 whitespace-nowrap">{r.amount}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{r.due}</td>
                      <td className="px-4 py-3"><Bdg t={r.status} c={r.status==="Paid"?"green":r.status==="Overdue"?"red":"blue"}/></td>
                      <td className="px-4 py-3"><button className="px-3 py-1 rounded-lg text-xs font-bold border border-gray-200 hover:bg-gray-50 text-gray-500">View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
      {tab==="ap"&&(
        <>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-700"><strong>AI extracts</strong> supplier invoices from crm@youragency.com · Performs 3-way match (PO + Delivery + Invoice) · Auto-synced to AutoCount if match passes</div>
          <Card>
            <div className="p-4 border-b border-gray-100 font-bold text-gray-900">Supplier Invoices — 3-Way Match</div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-gray-100">{["Reference","Vendor","PO Linked","Amount","3-Way Match","Status",""].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase whitespace-nowrap">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-gray-50">
                  {ap.map((r,i)=>(
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-xs font-mono text-gray-500">{r.ref}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{r.vendor}</td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-400">{r.po}</td>
                      <td className="px-4 py-3 text-sm font-black text-gray-900">{r.amount}</td>
                      <td className="px-4 py-3 text-sm">{r.match}</td>
                      <td className="px-4 py-3"><Bdg t={r.status} c={r.status==="Auto-Approved"?"green":r.status==="Finance Review"?"red":"amber"}/></td>
                      <td className="px-4 py-3"><button className="px-3 py-1 rounded-lg text-xs font-bold border border-gray-200 hover:bg-gray-50 text-gray-500">Review</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

// ─── SCREEN: FINANCE DASHBOARD ────────────────────────────────────
function Finance(){
  const aging=[{age:"Current",amt:180,c:"#16A34A"},{age:"1–30 days",amt:95,c:"#D97706"},{age:"31–60 days",amt:35,c:"#EA580C"},{age:"60+ days",amt:15,c:"#DC2626"}];
  return(
    <div className="flex flex-col gap-4">
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3">
        <span className="text-xl">🔗</span>
        <div className="flex-1"><div className="font-bold text-blue-900 text-sm">AutoCount Integration — Read Only</div><div className="text-xs text-blue-700">Syncs via email AI extraction (real-time) + CSV export (daily). Last sync: Today 8:00 AM. Finance team never enters data manually.</div></div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-blue-700 font-bold border border-blue-300 bg-white flex-shrink-0"><RefreshCw size={13}/>Sync Now</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<DollarSign size={18}/>} label="Revenue This Month" value="RM 1.61M" delta="↑14%" up color={T.purple} sub="total AR invoiced"/>
        <Kpi icon={<CheckCircle size={18}/>} label="Collected" value="RM 920K" delta="↑18%" up color={T.green} sub="57% collection rate"/>
        <Kpi icon={<AlertTriangle size={18}/>} label="Outstanding AR" value="RM 690K" color={T.orange} sub="across all clients"/>
        <Kpi icon={<Receipt size={18}/>} label="Outstanding AP" value="RM 340K" color={T.red} sub="to pay vendors"/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Revenue trend */}
        <Card className="p-4">
          <div className="font-bold text-gray-900 mb-3">Revenue Trend (RM '000)</div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={revData}><XAxis dataKey="m" tick={{fontSize:10,fill:"#94A3B8"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10,fill:"#94A3B8"}} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}M`}/><Tooltip formatter={v=>`RM ${v}K`} contentStyle={{borderRadius:8,border:"none"}}/><Bar dataKey="v" fill={T.purple} radius={[4,4,0,0]} opacity={0.85}/></BarChart>
          </ResponsiveContainer>
        </Card>
        {/* AR Aging */}
        <Card className="p-4">
          <div className="font-bold text-gray-900 mb-4">AR Aging Analysis</div>
          {aging.map(a=>(
            <div key={a.age} className="flex items-center gap-3 mb-3">
              <div className="w-24 text-xs text-gray-600 text-right flex-shrink-0">{a.age}</div>
              <div className="flex-1 h-6 bg-gray-100 rounded-lg overflow-hidden"><div style={{width:(a.amt/325*100)+"%",background:a.c,height:"100%",borderRadius:6,display:"flex",alignItems:"center",paddingLeft:8}}><span className="text-xs text-white font-bold">RM {a.amt}K</span></div></div>
            </div>
          ))}
          <div className="text-xs text-gray-400 mt-2 text-right">Total Outstanding: RM 325K</div>
        </Card>
        {/* Campaign margins */}
        <Card className="p-4">
          <div className="font-bold text-gray-900 mb-3">Campaign Profitability</div>
          {[{camp:"AEON BIG Raya 2025",mo:"RM 230K",po:"RM 180K",margin:"RM 50K",pct:"21.7%",c:0},{camp:"MYDIN Mid-Year",mo:"RM 180K",po:"RM 140K",margin:"RM 40K",pct:"22.2%",c:1},{camp:"KK Mart Launch",mo:"RM 95K",po:"RM 72K",margin:"RM 23K",pct:"24.2%",c:2}].map((r,i)=>(
            <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
              <Av i={r.camp.slice(0,2)} c={COLORS[r.c]} s={28}/>
              <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-gray-800 truncate">{r.camp}</div><div className="text-xs text-gray-400">MO: {r.mo} · PO: {r.po}</div></div>
              <div className="text-right flex-shrink-0"><div className="text-sm font-black text-green-700">{r.margin}</div><div className="text-xs text-gray-400">{r.pct}</div></div>
            </div>
          ))}
        </Card>
        {/* Top clients */}
        <Card className="p-4">
          <div className="font-bold text-gray-900 mb-3">Top Revenue Clients (MTD)</div>
          {[{n:"AEON BIG",v:"RM 620K",pct:38,c:0},{n:"MYDIN",v:"RM 410K",pct:25,c:1},{n:"Jaya Grocer",v:"RM 320K",pct:20,c:3},{n:"KK Mart",v:"RM 260K",pct:16,c:2}].map((r,i)=>(
            <div key={i} className="flex items-center gap-3 mb-3">
              <Av i={r.n.slice(0,2)} c={COLORS[r.c]} s={28}/>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1"><span className="text-sm font-semibold text-gray-800">{r.n}</span><span className="text-sm font-black text-gray-900">{r.v}</span></div>
                <Prog v={r.pct} color={COLORS[r.c]}/>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── SCREEN: COLLECTION & RETENTION ──────────────────────────────
function Collection(){
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<DollarSign size={18}/>} label="Total Invoiced" value="RM 625K" color={T.purple} sub="this month"/>
        <Kpi icon={<CheckCircle size={18}/>} label="Collected" value="RM 300K" color={T.green} sub="48% rate"/>
        <Kpi icon={<AlertTriangle size={18}/>} label="Overdue" value="RM 95K" color={T.red} sub="3 clients"/>
        <Kpi icon={<Repeat size={18}/>} label="Retention Tasks" value="4" color={T.teal} sub="post-campaign"/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Collection alerts */}
        <Card className="p-4">
          <div className="font-bold text-gray-900 mb-3">💰 Collection Alerts — Auto-Triggered</div>
          {[{trigger:"7 days before due",action:"Friendly reminder auto-emailed to client",c:"blue"},{trigger:"On due date if unpaid",action:"Second email with invoice attached",c:"amber"},{trigger:"7 days overdue",action:"Email to client + alert to account owner",c:"orange"},{trigger:"14 days overdue",action:"Escalation from Sales Manager",c:"red"},{trigger:"30 days overdue",action:"Director flagged — potential hold on new work",c:"red"}].map((a,i)=>(
            <div key={i} className={`flex items-start gap-2.5 p-2.5 rounded-xl mb-2 ${a.c==="blue"?"bg-blue-50":a.c==="amber"?"bg-amber-50":a.c==="orange"?"bg-orange-50":"bg-red-50"}`}>
              <div className="text-xs font-bold text-gray-600 w-32 flex-shrink-0">{a.trigger}</div>
              <div className="text-xs text-gray-700">{a.action}</div>
            </div>
          ))}
        </Card>
        {/* Retention */}
        <Card className="p-4">
          <div className="font-bold text-gray-900 mb-3">🔄 Client Retention Program — AI-Triggered</div>
          <p className="text-xs text-gray-500 mb-3">After every campaign ends and exposure report is delivered, AI analyses performance and triggers retention workflow automatically.</p>
          {[{client:"AEON BIG",signal:"Campaign ROI exceeded target 110%",action:"Pitch next quarter — priority renewal",score:"High",c:0},{client:"MYDIN",signal:"Client paid on time, no issues",action:"Introduce new channels or formats",score:"High",c:1},{client:"KK Mart",signal:"5 revision rounds — high-maintenance",action:"Internal debrief before next brief",score:"Medium",c:2},{client:"7-Eleven",signal:"No new brief in 60 days",action:"Director personal outreach — at risk",score:"Low",c:4}].map((r,i)=>(
            <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
              <Av i={r.client.slice(0,2)} c={COLORS[r.c]} s={30}/>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-gray-900">{r.client}</div>
                <div className="text-xs text-gray-500 mb-1">{r.signal}</div>
                <div className="text-xs font-semibold text-purple-600">{r.action}</div>
              </div>
              <Bdg t={r.score} c={r.score==="High"?"green":r.score==="Medium"?"amber":"red"}/>
            </div>
          ))}
        </Card>
      </div>
      {/* Client health */}
      <Card className="p-4">
        <div className="font-bold text-gray-900 mb-3">Client Health Scores — Auto-Calculated</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[{n:"AEON BIG",score:88,signals:["✅ Campaign ROI hit","✅ Paid on time","✅ Low revision rounds"],c:0},{n:"MYDIN",score:52,signals:["⚠️ At Risk score","✅ Good payment history","⚠️ Many revisions"],c:1},{n:"KK Mart",score:90,signals:["✅ Excellent ROI","✅ On-time payment","✅ Clean execution"],c:2},{n:"Jaya Grocer",score:65,signals:["✅ Good engagement","⚠️ Delayed payments","⏳ No new brief 45 days"],c:3}].map((r,i)=>(
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <Av i={r.n.slice(0,2)} c={COLORS[r.c]} s={36}/>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1"><span className="text-sm font-bold text-gray-900">{r.n}</span><span className="text-sm font-black" style={{color:r.score>75?T.green:r.score>50?T.amber:T.red}}>{r.score}/100</span></div>
                <Prog v={r.score} color={r.score>75?T.green:r.score>50?T.amber:T.red}/>
                <div className="flex gap-2 mt-1.5 flex-wrap">{r.signals.map((s,j)=><span key={j} className="text-xs text-gray-500">{s}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── SCREEN: REPORTS ────────────────────────────────────────────
function Reports(){
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<DollarSign size={18}/>} label="Revenue This Month" value="RM 1.61M" delta="↑14%" up color={T.purple}/>
        <Kpi icon={<CheckCircle size={18}/>} label="Closed Won" value="RM 920K" delta="↑18%" up color={T.green}/>
        <Kpi icon={<Target size={18}/>} label="Win Rate" value="38%" delta="↑5pp" up color={T.teal}/>
        <Kpi icon={<Activity size={18}/>} label="Target Achievement" value="65%" delta="↑7pp" up color={T.orange}/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="font-bold text-gray-900 mb-3">Revenue Trend</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={revData}><XAxis dataKey="m" tick={{fontSize:10,fill:"#94A3B8"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10,fill:"#94A3B8"}} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}M`}/><Tooltip formatter={v=>`RM ${v}K`} contentStyle={{borderRadius:8,border:"none"}}/><Bar dataKey="v" fill={T.purple} radius={[4,4,0,0]} opacity={0.85}/></BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-4">
          <div className="font-bold text-gray-900 mb-3">Funnel Conversion</div>
          {[{s:"Leads",n:312,p:100,c:T.purple},{s:"Proposals Sent",n:144,p:46,c:"#7C3AED"},{s:"Negotiation",n:78,p:25,c:T.orange},{s:"Closed Won",n:54,p:17,c:T.green}].map(f=>(
            <div key={f.s} className="flex items-center gap-3 mb-2">
              <div className="w-28 text-xs text-gray-500 text-right flex-shrink-0">{f.s}</div>
              <div className="flex-1 h-6 bg-gray-100 rounded-lg overflow-hidden"><div style={{width:f.p+"%",background:f.c,height:"100%",borderRadius:6,display:"flex",alignItems:"center",paddingLeft:8}}><span className="text-xs text-white font-bold whitespace-nowrap">{f.n} ({f.p}%)</span></div></div>
            </div>
          ))}
        </Card>
        <Card className="p-4">
          <div className="font-bold text-gray-900 mb-3">Proposal Performance</div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={propData}><XAxis dataKey="cat" tick={{fontSize:9,fill:"#94A3B8"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:9,fill:"#94A3B8"}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{borderRadius:8,border:"none"}}/><Bar dataKey="s" fill="#C4B5FD" radius={[3,3,0,0]} name="Sent"/><Bar dataKey="w" fill={T.green} radius={[3,3,0,0]} name="Won"/></BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-4">
          <div className="font-bold text-gray-900 mb-3">Lead Sources</div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={120} height={120}><PieChart><Pie data={pieData} dataKey="v" innerRadius={35} outerRadius={55}>{pieData.map((d,i)=><Cell key={i} fill={d.c}/>)}</Pie></PieChart></ResponsiveContainer>
            <div className="flex-1">{pieData.map(d=><div key={d.name} className="flex items-center gap-2 mb-1.5"><div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{background:d.c}}/><span className="text-sm text-gray-600 flex-1">{d.name}</span><span className="text-sm font-bold text-gray-900">{d.v}</span></div>)}</div>
          </div>
        </Card>
      </div>
      <Card className="p-4">
        <div className="font-bold text-gray-900 mb-3">Rep Performance Summary</div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-gray-100">{["Rep","Revenue","Closed Won","Win Rate","Target Achievement"].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-50">
              {[{n:"Natasha Tan",r:"1.61M",c:"920K",w:"38%",a:65},{n:"Amir Rahman",r:"980K",c:"560K",w:"36%",a:60},{n:"Sarah Lim",r:"720K",c:"410K",w:"34%",a:58},{n:"Kai Chen",r:"610K",c:"330K",w:"31%",a:52}].map((r,i)=>(
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Av i={r.n.split(" ").map(n=>n[0]).join("")} c={COLORS[i]} s={26}/><span className="text-sm font-semibold text-gray-800 whitespace-nowrap">{r.n}</span></div></td>
                  <td className="px-4 py-3 text-sm font-black text-gray-900 whitespace-nowrap">RM {r.r}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">RM {r.c}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{r.w}</td>
                  <td className="px-4 py-3 w-40"><Prog v={r.a} color={COLORS[i]}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}


// ─── SCREEN: SAI'S VIEW (OWNER) ───────────────────────────────────
function OwnerView({go}){
  const autoROI=[
    {task:"CRM updates from email",hrs:42,rate:50,icon:"📧"},
    {task:"Inventory extraction (PDF/PPT)",hrs:18,rate:50,icon:"📄"},
    {task:"Invoice 3-way matching",hrs:12,rate:50,icon:"🧾"},
    {task:"Artwork spec validation",hrs:8,rate:50,icon:"🎨"},
    {task:"Exposure report generation",hrs:6,rate:50,icon:"📊"},
  ];
  const totalHrs=autoROI.reduce((a,e)=>a+e.hrs,0);
  const totalSaved=autoROI.reduce((a,e)=>a+e.hrs*e.rate,0);

  const teamBuilds=[
    {icon:"🤖",t:"AI pricing engine updated — 23 new PO records added",dept:"Commercial",date:"Today"},
    {icon:"📐",t:"New artwork job sheet template for LED screens deployed",dept:"Creative",date:"Yesterday"},
    {icon:"📋",t:"AEON BIG proposal template v3 — new format with ROI projections",dept:"Channel",date:"May 13"},
    {icon:"⚡",t:"AutoCount 3-way match automation — zero manual reconciliation this week",dept:"Finance",date:"May 12"},
    {icon:"💡",t:"New vendor onboarded — 47 OOH sites in East Malaysia added",dept:"Commercial",date:"May 11"},
    {icon:"🔔",t:"DBP deadline auto-alert system — reduced missed submissions to zero",dept:"Channel",date:"May 10"},
  ];

  const ideas=[
    {icon:"🍔",t:"F&B vertical — 3 restaurant chains identified as prospects",status:"Exploring",c:"blue"},
    {icon:"📱",t:"Programmatic DOOH — digital OOH buying research in progress",status:"Research",c:"purple"},
    {icon:"📣",t:"Social amplification add-on for OOH campaigns",status:"Proposed",c:"teal"},
    {icon:"🔄",t:"Auto rate-comparison when new PO raised — saves nego prep time",status:"Queued",c:"amber"},
  ];

  const revPerHead=[
    {q:"Q1 2025",rev:580,head:8,rph:72.5},{q:"Q2 2025",rev:720,head:8,rph:90},
    {q:"Q3 2025",rev:890,head:8,rph:111.3},{q:"Q4 2025",rev:1040,head:8,rph:130},
    {q:"Q1 2026",rev:1210,head:8,rph:151.3},{q:"Q2 2026",rev:1610,head:8,rph:201.3},
  ];

  return(
    <div className="flex flex-col gap-5">

      {/* Owner greeting — distinct from operational */}
      <div className="rounded-2xl p-5 relative overflow-hidden" style={{background:"linear-gradient(135deg,#0C1F3F 0%,#1a3060 50%,#0D2847 100%)"}}>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(circle at 80% 50%, #6D28D9 0%, transparent 60%)"}}/>
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <div className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Owner View</div>
            <div className="text-2xl font-black text-white mb-1">Good morning, Sai. 👋</div>
            <div className="text-white/60 text-sm">Agency is growing. Here's the story this week.</div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-white/40 text-xs">Revenue per head</div>
            <div className="text-3xl font-black text-white">RM 201K</div>
            <div className="text-green-400 text-xs font-bold flex items-center justify-end gap-1"><TrendingUp size={11}/>↑33% vs last quarter</div>
          </div>
        </div>
        {/* Mini metric strip */}
        <div className="relative z-10 grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/10">
          {[{l:"Revenue MTD",v:"RM 1.61M",d:"↑14%",up:true},{l:"Agency Margin",v:"21.7%",d:"↑2.1pp",up:true},{l:"Cash Collected",v:"RM 920K",d:"57%",up:true},{l:"Pipeline",v:"RM 1.61M",d:"↑18%",up:true}].map(m=>(
            <div key={m.l} className="text-center">
              <div className="text-white/40 text-xs mb-0.5">{m.l}</div>
              <div className="text-white font-black text-base leading-tight">{m.v}</div>
              <div className={`text-xs font-bold ${m.up?"text-green-400":"text-red-400"}`}>{m.d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Revenue per head chart — his north star */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <Card className="p-4">
            <div className="flex items-start justify-between mb-1">
              <div>
                <div className="font-black text-gray-900">Revenue Per Head</div>
                <div className="text-xs text-gray-400">Same 8 people. Growing faster. This is the goal.</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-gray-900">RM 201K</div>
                <div className="text-xs font-bold text-green-600 flex items-center justify-end gap-1"><TrendingUp size={11}/>↑33% this quarter</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={revPerHead}>
                <XAxis dataKey="q" tick={{fontSize:9,fill:"#94A3B8"}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:9,fill:"#94A3B8"}} axisLine={false} tickLine={false} tickFormatter={v=>`RM ${v}K`}/>
                <Tooltip formatter={(v,n)=>n==="rph"?`RM ${v}K/person`:`RM ${v}K`} contentStyle={{borderRadius:10,border:"none",boxShadow:"0 8px 30px rgba(0,0,0,0.12)"}}/>
                <Bar dataKey="rev" fill="#E0E7FF" radius={[4,4,0,0]} name="Revenue"/>
                <Bar dataKey="rph" fill="#6D28D9" radius={[4,4,0,0]} name="Per Head"/>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-indigo-200"/><span className="text-xs text-gray-500">Total Revenue (RM '000)</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{background:T.purple}}/><span className="text-xs text-gray-500">Revenue per Person</span></div>
              <div className="ml-auto flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full"><span className="text-xs font-bold text-green-700">8 staff · headcount unchanged 6 quarters</span></div>
            </div>
          </Card>

          {/* Automation ROI */}
          <Card className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-black text-gray-900">🤖 Automation ROI — This Month</div>
                <div className="text-xs text-gray-400">What the system did so your team didn't have to</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-green-700">RM {totalSaved.toLocaleString()}</div>
                <div className="text-xs text-gray-400">{totalHrs} hours saved</div>
              </div>
            </div>
            {autoROI.map((a,i)=>(
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className="text-lg flex-shrink-0">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-800">{a.task}</div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                    <div style={{width:(a.hrs/totalHrs*100)+"%",background:"linear-gradient(90deg,#6D28D9,#0D9488)",height:"100%",borderRadius:9}}/>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-black text-gray-900">{a.hrs}h</div>
                  <div className="text-xs text-green-600 font-semibold">RM {(a.hrs*a.rate).toLocaleString()}</div>
                </div>
              </div>
            ))}
            <div className="mt-3 p-3 rounded-xl flex items-center justify-between" style={{background:"linear-gradient(135deg,#F5F3FF,#F0FDF9)"}}>
              <div className="text-sm font-bold text-gray-700">System cost this month</div>
              <div className="text-right"><div className="text-sm font-black text-gray-900">RM 1,200</div></div>
              <div className="text-gray-300 mx-3">vs</div>
              <div className="text-sm font-bold text-gray-700">Value generated</div>
              <div className="text-right"><div className="text-sm font-black text-green-700">RM {totalSaved.toLocaleString()}</div></div>
              <div className="ml-3 bg-green-100 text-green-700 text-xs font-black px-3 py-1.5 rounded-full">{Math.round(totalSaved/1200)}x ROI</div>
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">

          {/* 3 things that need attention */}
          <Card className="p-4">
            <div className="font-black text-gray-900 mb-3">⚠️ Needs Your Eye</div>
            {[{t:"AEON BIG overdue RM 95K — 30 days",c:"red",icon:"💰",action:"Call client"},{t:"KK Mart — DBP not submitted, 14 days to in-charge",c:"orange",icon:"📋",action:"Alert team"},{t:"Win rate 38% — below your 45% target",c:"amber",icon:"🎯",action:"Review pitches"}].map((a,i)=>(
              <div key={i} className={`p-3 rounded-xl mb-2 ${a.c==="red"?"bg-red-50 border border-red-100":a.c==="orange"?"bg-orange-50 border border-orange-100":"bg-amber-50 border border-amber-100"}`}>
                <div className="flex items-start gap-2">
                  <span className="text-base flex-shrink-0">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-gray-800 leading-snug">{a.t}</div>
                    <button className={`text-xs font-black mt-1 ${a.c==="red"?"text-red-600":a.c==="orange"?"text-orange-600":"text-amber-600"}`}>{a.action} →</button>
                  </div>
                </div>
              </div>
            ))}
          </Card>

          {/* Growth indicators */}
          <Card className="p-4">
            <div className="font-black text-gray-900 mb-3">📈 Growth Signals</div>
            {[{l:"New clients this month",v:"3",prev:"1",up:true},{l:"Avg deal size",v:"RM 92K",prev:"RM 85K",up:true},{l:"Client retention",v:"91%",prev:"88%",up:true},{l:"New revenue streams",v:"T&M billing",prev:"Active",up:true},{l:"Client lifetime value",v:"RM 1.2M",prev:"RM 980K",up:true}].map((g,i)=>(
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-600">{g.l}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 line-through">{g.prev}</span>
                  <span className="text-sm font-black text-gray-900">{g.v}</span>
                  {g.up?<TrendingUp size={12} className="text-green-500"/>:<TrendingDown size={12} className="text-red-500"/>}
                </div>
              </div>
            ))}
          </Card>

          {/* People efficiency */}
          <Card className="p-4">
            <div className="font-black text-gray-900 mb-3">👥 People Efficiency</div>
            {[{n:"Natasha Tan",dept:"Sales",rph:"RM 115",util:82,c:0},{n:"Jason Doe",dept:"Channel",rph:"RM 96",util:71,c:1},{n:"Sarah Lee",dept:"Creative",rph:"RM 88",util:92,c:2},{n:"Amir Rahman",dept:"Commercial",rph:"RM 105",util:68,c:3}].map((p,i)=>(
              <div key={i} className="flex items-center gap-2 mb-2.5">
                <Av i={p.n.split(" ").map(n=>n[0]).join("")} c={COLORS[p.c]} s={28}/>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between"><span className="text-xs font-bold text-gray-800 truncate">{p.n}</span><span className="text-xs font-black text-gray-900 flex-shrink-0 ml-2">{p.rph}/hr</span></div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden"><div style={{width:p.util+"%",background:p.util>85?"#DC2626":p.util>70?T.green:T.amber,height:"100%",borderRadius:9}}/></div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{p.util}%</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-2 p-2 bg-purple-50 rounded-xl text-center">
              <span className="text-xs text-purple-700 font-semibold">Automation coverage: <strong>68%</strong> of repetitive tasks · Manual work ↓34% vs 6 months ago</span>
            </div>
          </Card>
        </div>
      </div>

      {/* What the team built */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-black text-gray-900">🛠️ What The Team Built & Developed</div>
            <div className="text-xs text-gray-400">Your team is building, not just executing</div>
          </div>
          <Bdg t="6 this week" c="green"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {teamBuilds.map((b,i)=>(
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-purple-50/30 cursor-pointer transition-colors">
              <span className="text-xl flex-shrink-0">{b.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800 leading-snug">{b.t}</div>
                <div className="flex items-center gap-2 mt-1"><Bdg t={b.dept} c={b.dept==="Commercial"?"amber":b.dept==="Creative"?"red":b.dept==="Finance"?"blue":"teal"}/><span className="text-xs text-gray-400">{b.date}</span></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Creative & Innovation Pipeline */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-black text-gray-900">💡 Innovation & Growth Pipeline</div>
            <div className="text-xs text-gray-400">New ideas being explored — your next revenue streams</div>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white font-bold" style={{background:T.purple}}><Plus size={13}/>Add Idea</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ideas.map((d,i)=>(
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-purple-200 cursor-pointer transition-all">
              <span className="text-2xl flex-shrink-0">{d.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-gray-900 leading-snug">{d.t}</div>
                <div className="mt-2"><Bdg t={d.status} c={d.c}/></div>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-purple-300 cursor-pointer">
            <div className="text-center"><div className="text-2xl mb-1">➕</div><div className="text-sm font-semibold text-gray-400">Submit new idea</div></div>
          </div>
        </div>
      </Card>

      {/* Drill down shortcuts */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {[{l:"Revenue",icon:"💰",id:"reports"},{l:"Pipeline",icon:"📊",id:"pipeline"},{l:"Collection",icon:"💳",id:"collection"},{l:"Team Time",icon:"⏱",id:"timetracker"},{l:"Proposals",icon:"📋",id:"proposals"},{l:"Finance",icon:"📈",id:"finance"}].map(s=>(
          <button key={s.l} onClick={()=>go(s.id)} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-all shadow-sm">
            <span className="text-xl">{s.icon}</span>
            <span className="text-xs font-bold text-gray-600">{s.l}</span>
          </button>
        ))}
      </div>

    </div>
  );
}

// ─── ROLE CONFIG ─────────────────────────────────────────────────
const ROLES = {
  owner:      { label:"Sai (Owner)",      color:"#0C1F3F", avatar:"SA",
                screens:["owner","dashboard","leads","brief","proposals","pipeline","inventory","orders","creative","execution","timetracker","invoicing","finance","collection","reports"] },
  admin:      { label:"Admin / Director", color:"#6D28D9", avatar:"AD",
                screens:["dashboard","leads","brief","proposals","pipeline","inventory","orders","creative","execution","timetracker","invoicing","finance","collection","reports"] },
  sales:      { label:"Sales",            color:"#0D9488", avatar:"NT",
                screens:["dashboard","leads","brief","proposals","pipeline","orders","timetracker","reports"] },
  channel:    { label:"Channel Team",     color:"#EA580C", avatar:"JD",
                screens:["dashboard","leads","brief","proposals","pipeline","creative","execution","timetracker"] },
  commercial: { label:"Commercial",       color:"#D97706", avatar:"AR",
                screens:["dashboard","leads","inventory","orders","pipeline","timetracker","reports"] },
  creative:   { label:"Creative",         color:"#DC2626", avatar:"SL",
                screens:["dashboard","proposals","creative","execution","timetracker"] },
  finance:    { label:"Finance",          color:"#2563EB", avatar:"FL",
                screens:["dashboard","invoicing","finance","collection","reports","timetracker"] },
};

// ─── NAV CONFIG ───────────────────────────────────────────────────
const GROUPS=[
  {label:"OVERVIEW",   items:[{id:"owner",       icon:<Star size={16}/>,            label:"Sai's View"},
                               {id:"dashboard",   icon:<LayoutDashboard size={16}/>, label:"Dashboard"}]},
  {label:"SALES",      items:[{id:"leads",       icon:<Users size={16}/>,           label:"Leads / CRM"},
                               {id:"brief",       icon:<FileText size={16}/>,        label:"Brief Management"},
                               {id:"proposals",   icon:<Send size={16}/>,            label:"Proposals"},
                               {id:"pipeline",    icon:<GitBranch size={16}/>,       label:"Deal Pipeline"},
                               {id:"orders",      icon:<ShoppingCart size={16}/>,    label:"Media Order & PO"}]},
  {label:"COMMERCIAL", items:[{id:"inventory",   icon:<Package size={16}/>,         label:"Master Inventory"}]},
  {label:"CREATIVE",   items:[{id:"creative",    icon:<Palette size={16}/>,         label:"Creative Hub"}]},
  {label:"EXECUTION",  items:[{id:"execution",   icon:<Zap size={16}/>,             label:"Campaign Execution"}]},
  {label:"FINANCE",    items:[{id:"timetracker", icon:<Clock size={16}/>,           label:"Time Tracker"},
                               {id:"invoicing",   icon:<Receipt size={16}/>,         label:"Invoicing"},
                               {id:"finance",     icon:<DollarSign size={16}/>,      label:"Finance Dashboard"},
                               {id:"collection",  icon:<Repeat size={16}/>,          label:"Collection & Retention"}]},
  {label:"ANALYTICS",  items:[{id:"reports",     icon:<BarChart3 size={16}/>,       label:"Reports"}]},
];

const ALL_ITEMS = GROUPS.flatMap(g=>g.items);

// ─── AI SUGGESTIONS PER SCREEN ───────────────────────────────────
const AI_SUGGESTIONS = {
  dashboard:[
    {type:"alert",icon:"📧",title:"AEON BIG not responding",body:"Proposal viewed 3x but no reply in 3 days. Best time to call: 9–11 AM based on past response pattern.",action:"Draft follow-up"},
    {type:"insight",icon:"🎯",title:"Win rate below target",body:"38% this month vs your 45% target. Pattern shows proposals over RM 200K have lower close rate. Consider splitting into phases.",action:"View analysis"},
    {type:"tip",icon:"💡",title:"Pipeline health",body:"3 deals stalled in Negotiation for 7+ days. Deals that stall here historically close 60% less often after 10 days.",action:"View deals"},
  ],
  leads:[
    {type:"alert",icon:"⚡",title:"Jessica Martin — high intent",body:"Score 92. Visited pricing page 4x this week. Best window to call: today before 11AM based on her activity pattern.",action:"Call now"},
    {type:"insight",icon:"🔍",title:"Referral leads converting 2x better",body:"Your referral leads close at 28% vs 12% for cold calls. Jaya Grocer team came from referral — prioritise them.",action:"See breakdown"},
    {type:"tip",icon:"📊",title:"5 leads with no follow-up in 7 days",body:"Daniel Lee, Wong Chee and 3 others haven't been contacted. Leads go cold after 5 days — act now.",action:"View leads"},
  ],
  brief:[
    {type:"alert",icon:"⏰",title:"MYDIN brief — deadline in 2 days",body:"Proposal due May 20. Channel team workspace not yet opened. Escalation will trigger automatically in 48 hours.",action:"Notify team"},
    {type:"insight",icon:"🧠",title:"Similar brief won last quarter",body:"AEON BIG Raya 2025 brief had similar objectives. That proposal achieved RM 280K. Reuse as starting template.",action:"Use template"},
    {type:"tip",icon:"💬",title:"Decision maker identified",body:"AI detected Andrew Lim (Head of Marketing) as signatory on AEON BIG email. Add him as key contact.",action:"Add contact"},
  ],
  proposals:[
    {type:"alert",icon:"👁️",title:"AEON BIG viewed 3x — not approved",body:"Viewed May 8 at 9:21AM, 2:14PM and May 9 at 10:05AM. Usually signals internal review. Follow up before May 12.",action:"Send follow-up"},
    {type:"insight",icon:"📈",title:"v3 proposals close 40% faster",body:"Proposals on their 3rd revision historically close faster — client is invested. Push Jaya Grocer to finalise.",action:"View Jaya Grocer"},
    {type:"tip",icon:"🎨",title:"KK Mart not viewed after 5 days",body:"Proposal sent May 5 — not opened. Try resending with a different subject line or call to confirm receipt.",action:"Resend"},
  ],
  pipeline:[
    {type:"alert",icon:"🚨",title:"3 deals stalled in Negotiation",body:"AEON, KK Mart and MYDIN have had no activity for 7+ days. Deals stalled here close 60% less often after 10 days.",action:"View deals"},
    {type:"insight",icon:"💰",title:"Close 2 deals this week = hit target",body:"Closing AEON BIG (RM 180K) and MYDIN (RM 150K) would bring you to 102% of monthly target.",action:"Prioritise these"},
    {type:"tip",icon:"📅",title:"Best closing window: Tue–Wed",body:"Your historical data shows 67% of deals close on Tuesday or Wednesday. Schedule your push calls for tomorrow.",action:"Schedule calls"},
  ],
  inventory:[
    {type:"alert",icon:"🆕",title:"Big Tree sent new rate card",body:"Email received today. 47 new OOH sites — 12 in Penang, 8 in Johor. AI extracting now. Review before booking season.",action:"View extraction"},
    {type:"insight",icon:"📍",title:"Penang sites — best value right now",body:"Penang OOH currently 30% cheaper than KL equivalents with similar reach. Good for Q3 campaigns.",action:"Filter Penang"},
    {type:"tip",icon:"🔄",title:"28 sites need availability update",body:"Last updated over 30 days ago. Vendors may have already booked some — confirm before proposing to clients.",action:"Update now"},
  ],
  orders:[
    {type:"alert",icon:"⚠️",title:"AEON BIG Media Order unsigned — 5 days",body:"Vendor slot at ELITE Highway expires May 16. Client must sign by tomorrow or you risk losing the booking.",action:"Chase client"},
    {type:"nego",icon:"🤖",title:"AI nego suggestion — ELITE Highway",body:"Big Tree quoted RM 18,000. Based on 12 past bookings here, your average paid was RM 14,200. Last time they accepted RM 13,800 (23.3% off). Open at RM 12,000.",stats:[{l:"Vendor quoted",v:"RM 18,000"},{l:"Your avg paid",v:"RM 14,200"},{l:"Best ever",v:"RM 11,500"},{l:"Open at",v:"RM 12,000"},{l:"Walk away",v:"> RM 16,500"}],action:"Use this in nego"},
    {type:"insight",icon:"💡",title:"Bundle opportunity with Big Tree",body:"You're booking 2 Big Tree sites this month. Adding a 3rd unlocks their 15% bundle rate — saves RM 5,400.",action:"Check availability"},
  ],
  creative:[
    {type:"alert",icon:"👩‍💻",title:"Sarah Lee at 130% capacity",body:"52hrs assigned this week. MYDIN mockup (est. 4hrs) can be reassigned to Farah Lim who has 12hrs free.",action:"Reassign now"},
    {type:"alert",icon:"📁",title:"KK Mart artwork spec mismatch",body:"Uploaded file is RGB, not CMYK. Vendor requires CMYK. File has been flagged — Creative team notified.",action:"View file"},
    {type:"tip",icon:"⏱️",title:"ELITE Highway deadline in 3 days",body:"Artwork must reach Big Tree by May 28 for Jun 1 in-charge. Today is May 15 — time is tight.",action:"Check status"},
  ],
  execution:[
    {type:"alert",icon:"🔴",title:"MYDIN — DBP not submitted",body:"In-charge June 5. DBP must be submitted by May 22 (14 days prior). Today is May 15 — 7 days to submit.",action:"Submit now"},
    {type:"alert",icon:"🟡",title:"KK Mart — artwork not uploaded",body:"In-charge June 10. Artwork needed by May 20 (21 days prior). Creative team has not started.",action:"Brief creative"},
    {type:"insight",icon:"📊",title:"AEON BIG — proof of play pending",body:"In-charge was June 1. Vendor upload link sent but no photos received yet. Auto-escalation in 3 days.",action:"Chase vendor"},
  ],
  timetracker:[
    {type:"alert",icon:"⚠️",title:"Sarah Lee overloaded",body:"52hrs assigned vs 40hr capacity. Recommend reassigning MYDIN mockup (4hrs) to Farah Lim. Farah has 12hrs available.",action:"Reassign task"},
    {type:"insight",icon:"💰",title:"Billable hours below target",body:"Team at 72% utilisation. Billable ratio is 58% — target is 70%. 3 staff spending >30% on internal meetings.",action:"View breakdown"},
    {type:"tip",icon:"🤖",title:"AI time suggestions ready",body:"Based on calendar and files uploaded today, AI has pre-filled 8 time entries for team review. 2 mins to approve.",action:"Review suggestions"},
  ],
  invoicing:[
    {type:"alert",icon:"✅",title:"3 invoices auto-matched",body:"PO-2025-041, PO-2025-039 and PO-2025-038 passed 3-way match. Pushed to AutoCount. No action needed.",action:"View in AutoCount"},
    {type:"alert",icon:"⚠️",title:"Citylites invoice — 8% variance",body:"Invoiced RM 21,000 vs PO approved RM 19,800. Difference RM 1,200. Finance review required before payment.",action:"Review now"},
    {type:"tip",icon:"📧",title:"KK Mart invoice not yet received",body:"Campaign ended May 15. Vendor invoice expected within 14 days. Auto-chase will trigger May 29.",action:"Chase vendor"},
  ],
  finance:[
    {type:"alert",icon:"💰",title:"Collection rate below target",body:"57% collected vs 65% target. AEON BIG RM 95K overdue 30 days is the main gap. One call could fix this.",action:"Call AEON BIG"},
    {type:"insight",icon:"📈",title:"Margin improving",body:"Agency margin at 21.7% — up 2.1pp from last month. AI pricing engine saved an estimated RM 38,000 in vendor costs this month.",action:"See detail"},
    {type:"tip",icon:"🔄",title:"AutoCount sync — 4 items pending",body:"4 new invoices in system not yet synced to AutoCount. Last sync was 8AM today. Click to sync now.",action:"Sync now"},
  ],
  collection:[
    {type:"alert",icon:"🚨",title:"AEON BIG — 30 days overdue",body:"RM 95,000 unpaid since May 7. Auto-reminders sent 3x. Next step: Director personal outreach or hold new work.",action:"Escalate now"},
    {type:"insight",icon:"🔄",title:"Retention trigger — MYDIN",body:"Campaign ended successfully. AI suggests scheduling retention call. MYDIN historically re-books within 45 days.",action:"Schedule call"},
    {type:"tip",icon:"💚",title:"KK Mart — high retention score",body:"Paid on time, only 1 revision round, campaign delivered 115% of promised reach. Prime upsell opportunity.",action:"View upsell ideas"},
  ],
  reports:[
    {type:"insight",icon:"📉",title:"Win rate dropped 5pp",body:"38% this month vs 43% last month. Proposals above RM 200K are closing at only 22%. Consider phased approach.",action:"Analyse deals"},
    {type:"insight",icon:"🏆",title:"Top performer: Natasha Tan",body:"RM 1.61M revenue, 38% win rate, 65% target achievement. Natasha's proposal style closes 2x faster than team average.",action:"View her proposals"},
    {type:"tip",icon:"📅",title:"Schedule this report",body:"Get this report delivered to your inbox every Monday 8AM — one click to set up.",action:"Schedule now"},
  ],
  owner:[
    {type:"insight",icon:"🚀",title:"Revenue per head up 33%",body:"Same 8 people generating 33% more revenue than last quarter. Automation is working — 86 hours saved this month alone.",action:"See breakdown"},
    {type:"alert",icon:"💰",title:"AEON BIG overdue RM 95K",body:"30 days overdue. Collection rate 57% vs target 65%. A director-level call typically resolves within 48 hours.",action:"Make the call"},
    {type:"insight",icon:"💡",title:"F&B vertical — right time to move",body:"3 restaurant chains in pipeline. Raya season historically drives F&B marketing spend. Window is now.",action:"View prospects"},
  ],
};

const SCREENS = {owner:OwnerView,dashboard:Dashboard,leads:Leads,brief:Brief,proposals:Proposals,pipeline:Pipeline,creative:Creative,inventory:Inventory,orders:Orders,execution:Execution,timetracker:TimeTracker,invoicing:Invoicing,finance:Finance,collection:Collection,reports:Reports};


// ─── AI ASSISTANT PANEL ───────────────────────────────────────────
function AiPanel({screen, role, onClose}){
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const suggestions = AI_SUGGESTIONS[screen] || AI_SUGGESTIONS.dashboard;

  const send = () => {
    if(!input.trim()) return;
    setChat(c=>[...c,{from:"user",text:input},{from:"ai",text:"Got it — let me pull that up for you. This would connect to Claude API in the live system."}]);
    setInput("");
  };

  return(
    <div className="fixed inset-y-0 right-0 z-50 flex flex-col bg-white shadow-2xl border-l border-gray-200" style={{width:"320px",maxWidth:"90vw"}}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100" style={{background:"linear-gradient(135deg,#0C1F3F,#1a3060)"}}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{background:"rgba(109,40,217,0.8)"}}>🤖</div>
          <div><div className="text-white text-sm font-bold">AI Assistant</div><div className="text-white/50 text-xs">Context-aware · {ALL_ITEMS.find(i=>i.id===screen)?.label||"Dashboard"}</div></div>
        </div>
        <button onClick={onClose} className="text-white/60 hover:text-white p-1"><X size={16}/></button>
      </div>

      {/* Suggestions */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Proactive Insights</div>
        {suggestions.map((s,i)=>(
          <div key={i} className={`rounded-xl p-3 border ${s.type==="alert"?"bg-red-50 border-red-100":s.type==="nego"?"bg-purple-50 border-purple-200":s.type==="insight"?"bg-blue-50 border-blue-100":"bg-amber-50 border-amber-100"}`}>
            <div className="flex items-start gap-2 mb-1.5">
              <span className="text-base flex-shrink-0">{s.icon}</span>
              <div className="font-bold text-gray-900 text-xs leading-snug">{s.title}</div>
            </div>
            <div className="text-xs text-gray-600 leading-relaxed ml-6 mb-2">{s.body}</div>
            {s.stats&&(
              <div className="ml-6 grid grid-cols-2 gap-1 mb-2">
                {s.stats.map((st,j)=>(
                  <div key={j} className="bg-white rounded-lg p-1.5">
                    <div className="text-xs text-gray-400" style={{fontSize:9}}>{st.l}</div>
                    <div className="text-xs font-black text-purple-700">{st.v}</div>
                  </div>
                ))}
              </div>
            )}
            <button className={`ml-6 text-xs font-bold ${s.type==="alert"?"text-red-600":s.type==="nego"?"text-purple-600":s.type==="insight"?"text-blue-600":"text-amber-600"}`}>{s.action} →</button>
          </div>
        ))}

        {/* Chat history */}
        {chat.length>0&&(
          <div className="mt-2">
            <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Chat</div>
            {chat.map((m,i)=>(
              <div key={i} className={`mb-2 flex ${m.from==="user"?"justify-end":""}`}>
                <div className={`rounded-xl px-3 py-2 text-xs max-w-[85%] ${m.from==="user"?"text-white":"bg-gray-100 text-gray-700"}`} style={m.from==="user"?{background:"#6D28D9"}:{}}>{m.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&send()}
            placeholder="Ask AI anything..."
            className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-purple-400"
          />
          <button onClick={send} className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{background:"#6D28D9"}}>
            <Send size={14}/>
          </button>
        </div>
        <div className="text-xs text-gray-400 mt-2 text-center">Powered by Claude AI · Connects to live data</div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────
export default function App(){
  const [screen,   setScreen]   = useState("dashboard");
  const [role,     setRole]     = useState("admin");
  const [roleOpen, setRoleOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [aiOpen,   setAiOpen]   = useState(false);

  const currentRole   = ROLES[role];
  const allowed       = currentRole.screens;

  const visibleGroups = GROUPS
    .map(g=>({...g, items:g.items.filter(i=>allowed.includes(i.id))}))
    .filter(g=>g.items.length>0);
  const visibleItems  = visibleGroups.flatMap(g=>g.items);
  const activeScreen  = allowed.includes(screen) ? screen : "dashboard";
  const S             = SCREENS[activeScreen] || Dashboard;
  const title         = ALL_ITEMS.find(i=>i.id===activeScreen)?.label || "Dashboard";
  const mobileItems   = visibleItems.slice(0,4);

  const switchRole = (r) => { setRole(r); setRoleOpen(false); setScreen(r==="owner"?"owner":"dashboard"); };

  return(
    <div className="flex h-screen overflow-hidden" style={{background:T.bg,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>

      {/* SIDEBAR — desktop */}
      <div className="hidden md:flex flex-col w-56 flex-shrink-0 overflow-y-auto" style={{background:T.nav}}>
        <div className="flex items-center gap-3 px-5 py-5 border-b" style={{borderColor:T.navBorder}}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0" style={{background:"linear-gradient(135deg,#6D28D9,#0D9488)"}}>VR</div>
          <div><div className="text-white font-black text-sm leading-none">Visual Retale</div><div className="text-white/50 text-xs mt-0.5">Ops Hub v1.0</div></div>
        </div>

        {/* Role switcher in sidebar */}
        <div className="px-3 py-3 border-b" style={{borderColor:T.navBorder}}>
          <div className="text-white/30 text-xs font-black tracking-widest mb-1.5 px-1">VIEWING AS</div>
          <div className="relative">
            <button onClick={()=>setRoleOpen(!roleOpen)} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-all" style={{background:"rgba(255,255,255,0.1)"}}>
              <Av i={currentRole.avatar} c={currentRole.color} s={24}/>
              <span className="flex-1 text-left text-sm">{currentRole.label}</span>
              <ChevronDown size={13} className={`text-white/50 transition-transform ${roleOpen?"rotate-180":""}`}/>
            </button>
            {roleOpen&&(
              <div className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden shadow-2xl z-50" style={{background:"#1a3060",border:"1px solid rgba(255,255,255,0.12)"}}>
                {Object.entries(ROLES).map(([key,r])=>(
                  <button key={key} onClick={()=>switchRole(key)} className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/10 transition-all" style={{background:role===key?"rgba(255,255,255,0.12)":"transparent"}}>
                    <Av i={r.avatar} c={r.color} s={22}/>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-semibold" style={{color:role===key?"#fff":"rgba(255,255,255,0.65)"}}>{r.label}</div>
                      <div className="text-xs" style={{color:"rgba(255,255,255,0.35)"}}>{r.screens.length} modules</div>
                    </div>
                    {role===key&&<CheckCircle size={13} className="text-green-400 flex-shrink-0"/>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Nav filtered by role */}
        <div className="flex-1 px-3 py-4 overflow-y-auto">
          {visibleGroups.map(g=>(
            <div key={g.label} className="mb-4">
              <div className="text-white/30 text-xs font-black tracking-widest px-3 mb-1">{g.label}</div>
              {g.items.map(item=>(
                <button key={item.id} onClick={()=>setScreen(item.id)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all w-full text-left mb-0.5" style={{background:activeScreen===item.id?"rgba(255,255,255,0.12)":"transparent",color:activeScreen===item.id?"#fff":"rgba(255,255,255,0.5)"}}>
                  <span style={{color:activeScreen===item.id?"#A78BFA":"rgba(255,255,255,0.35)"}}>{item.icon}</span>{item.label}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="mx-3 mb-4 p-3 rounded-xl cursor-pointer hover:bg-white/10 transition-colors" style={{background:"rgba(255,255,255,0.06)"}}>
          <div className="flex items-center gap-2"><span className="text-base">🤖</span><div><div className="text-white text-xs font-bold">AI Assistant</div><div className="text-white/40 text-xs">Ask anything →</div></div></div>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOP BAR */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 flex-shrink-0">
          <div className="md:hidden w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white flex-shrink-0" style={{background:"linear-gradient(135deg,#6D28D9,#0D9488)"}}>VR</div>
          <h1 className="text-base md:text-lg font-black text-gray-900 truncate" style={{maxWidth:"35%"}}>{title}</h1>
          <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 max-w-sm"><Search size={13} className="text-gray-400"/><input className="bg-transparent text-sm outline-none flex-1 min-w-0" placeholder="Search..."/></div>
          <div className="flex-1 md:flex-none"/>

          {/* Role badge desktop */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold flex-shrink-0" style={{borderColor:currentRole.color+"44",background:currentRole.color+"11",color:currentRole.color}}>
            <Av i={currentRole.avatar} c={currentRole.color} s={18}/>
            {currentRole.label}
          </div>

          {/* Role switcher mobile */}
          <div className="md:hidden relative">
            <button onClick={()=>setRoleOpen(!roleOpen)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold" style={{borderColor:currentRole.color+"44",background:currentRole.color+"11",color:currentRole.color}}>
              <Av i={currentRole.avatar} c={currentRole.color} s={16}/>
              <ChevronDown size={11}/>
            </button>
            {roleOpen&&(
              <div className="absolute top-full right-0 mt-2 w-52 rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100 z-50">
                <div className="px-4 py-3 border-b border-gray-100 text-xs font-black text-gray-400 uppercase tracking-wide">Switch Role</div>
                {Object.entries(ROLES).map(([key,r])=>(
                  <button key={key} onClick={()=>switchRole(key)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all" style={{background:role===key?"#F5F3FF":"transparent"}}>
                    <Av i={r.avatar} c={r.color} s={28}/>
                    <div className="flex-1 text-left"><div className="text-sm font-semibold text-gray-800">{r.label}</div><div className="text-xs text-gray-400">{r.screens.length} modules</div></div>
                    {role===key&&<CheckCircle size={14} className="text-purple-500"/>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative flex-shrink-0">
            <button className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center"><Bell size={15} className="text-gray-600"/></button>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white flex items-center justify-center font-black" style={{background:T.red,fontSize:8}}>3</div>
          </div>
          <button className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white font-bold flex-shrink-0" style={{background:T.purple}}><Plus size={13}/>New</button>
          <button onClick={()=>setAiOpen(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold border flex-shrink-0" style={{borderColor:"#6D28D9",color:"#6D28D9",background:"#F5F3FF"}}>🤖 <span className="hidden sm:inline">AI</span></button>
          <Av i={currentRole.avatar} c={currentRole.color} s={32}/>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-20 md:pb-4">
          <S go={(id)=>{ if(allowed.includes(id)) setScreen(id); }} role={role}/>
        </div>

        {/* Floating AI button — mobile */}
        <button onClick={()=>setAiOpen(true)} className="fixed bottom-20 right-4 md:hidden w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center text-xl z-30" style={{background:"linear-gradient(135deg,#6D28D9,#7C3AED)"}}>🤖</button>

        {/* BOTTOM NAV — mobile, role-filtered */}}
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 z-40" style={{paddingBottom:"env(safe-area-inset-bottom)"}}>
          <div className="flex">
            {mobileItems.map(item=>(
              <button key={item.id} onClick={()=>{setScreen(item.id);setMoreOpen(false);}} className="flex-1 flex flex-col items-center py-2 gap-0.5" style={{color:activeScreen===item.id?currentRole.color:"#9CA3AF"}}>
                {item.icon}<span style={{fontSize:9}} className="font-semibold">{item.label.split(" ")[0]}</span>
              </button>
            ))}
            {visibleItems.length>4&&(
              <button onClick={()=>setMoreOpen(!moreOpen)} className="flex-1 flex flex-col items-center py-2 gap-0.5" style={{color:"#9CA3AF"}}>
                <Menu size={20}/><span style={{fontSize:9}} className="font-semibold">More</span>
              </button>
            )}
          </div>
          {moreOpen&&(
            <div className="absolute bottom-full left-0 right-0 bg-white border-t border-gray-200 shadow-2xl">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <span className="text-xs font-black text-gray-400 uppercase tracking-wide">More Modules</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{background:currentRole.color+"18",color:currentRole.color}}>{currentRole.label}</span>
              </div>
              <div className="grid grid-cols-3">
                {visibleItems.slice(4).map(item=>(
                  <button key={item.id} onClick={()=>{setScreen(item.id);setMoreOpen(false);}} className="flex flex-col items-center py-4 gap-1 hover:bg-gray-50 border-b border-gray-100" style={{color:activeScreen===item.id?currentRole.color:"#6B7280"}}>
                    {item.icon}<span className="text-xs font-semibold text-center px-1 leading-tight">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Panel overlay */}
      {aiOpen&&(
        <>
          <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={()=>setAiOpen(false)}/>
          <AiPanel screen={activeScreen} role={role} onClose={()=>setAiOpen(false)}/>
        </>
      )}

    </div>
  );
}
