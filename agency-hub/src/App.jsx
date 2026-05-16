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

  // Route to role-specific dashboard content
  const isSales       = ["natasha","karan"].includes(role);
  const isSalesSupport= role==="azrina";
  const isMichelle    = role==="michelle";
  const isChannel     = ["shazia","meiyin","nicole"].includes(role);
  const isMarketing   = role==="yash";
  const isOps         = role==="kavita";
  const isCommHOD     = role==="mahen";
  const isComm        = role==="najwa";
  const isCommGW      = role==="apit";
  const isCreativeHOD = role==="aliff";
  const isCreative    = ["nazri","shariff"].includes(role);
  const isFinanceHOD  = role==="phylicia";
  const isFinance     = role==="nik";
  const isDriver      = role==="nazreey";

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
      {/* Role-specific dashboard content */}
      {isSales&&<SalesDashboard go={go} name={sp?.name} role={role}/>}
      {isSalesSupport&&<SalesDashboard go={go} name={sp?.name} noTarget={true}/>}
      {isMichelle&&<MichelleDashboard go={go}/>}
      {isChannel&&<ChannelDashboard go={go} isHOD={role==="shazia"} name={sp?.name}/>}
      {isMarketing&&<MarketingDashboard go={go}/>}
      {isOps&&<OperationsDashboard go={go}/>}
      {(isCommHOD||isComm||isCommGW)&&<CommercialDashboard go={go} isHOD={isCommHOD} noPricing={isCommGW}/>}
      {(isCreativeHOD||isCreative)&&<CreativeDashboard go={go} isHOD={isCreativeHOD} name={sp?.name}/>}
      {(isFinanceHOD||isFinance)&&<FinanceDashboard2 go={go} isHOD={isFinanceHOD}/>}
      {isDriver&&<DriverDashboard go={go}/>}

      {/* Generic fallback for owner/admin/unknown — show full dashboard */}
      {!isSales&&!isSalesSupport&&!isMichelle&&!isChannel&&!isMarketing&&!isOps&&!isCommHOD&&!isComm&&!isCommGW&&!isCreativeHOD&&!isCreative&&!isFinanceHOD&&!isFinance&&!isDriver&&(
      <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<Users size={18}/>} label="New Leads" value="28" delta="↑18%" up color={T.purple} sub="vs last 7 days"/>
        <Kpi icon={<FileText size={18}/>} label="Active Proposals" value="14" delta="↑12%" up color={T.teal} sub="vs last 7 days"/>
        <Kpi icon={<Target size={18}/>} label="Monthly Target" value="RM 850K" sub="65% achieved" color={T.orange}/>
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
          {[{t:"MYDIN DBP not submitted — in-charge in 14 days",c:"red",icon:"⚠️"},{t:"Nazri overloaded — 52hrs assigned this week",c:"amber",icon:"👩‍💻"},{t:"AEON BIG proposal not opened after 3 days",c:"blue",icon:"📧"},{t:"KK Mart campaign ended — Exposure Report due",c:"purple",icon:"📊"}].map((a,i)=>(
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
      )}
    </div>
  );
}

// ─── SCREEN: LEADS / CRM ──────────────────────────────────────────
function Leads(){
  const rows=[
    {name:"Jessica Martin",co:"AEON BIG",src:"Website",score:92,owner:"NT",next:"Follow up call · Today 9AM",status:"New",c:0},
    {name:"Ravi Pillai",co:"MYDIN",src:"Referral",score:78,owner:"MH",next:"Proposal discussion · Today 11AM",status:"Qualified",c:1},
    {name:"Siti Khadijah",co:"KK Mart",src:"Event",score:65,owner:"SF",next:"Product demo · Tomorrow 10AM",status:"Follow-Up",c:2},
    {name:"Jaya Grocer Team",co:"Jaya Grocer",src:"Website",score:88,owner:"NT",next:"Send proposal · Tomorrow 2PM",status:"Qualified",c:3},
    {name:"Daniel Lee",co:"Fresh Mart",src:"Cold Call",score:45,owner:"MH",next:"Intro call · May 20 4PM",status:"New",c:4},
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
function ProposalPreview({onClose, client="AEON BIG", campaign="Raya 2026 OOH Campaign", preparedBy="Natasha"}){
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
    {title:"AEON BIG – Raya 2026 Campaign",client:"AEON BIG",value:"RM 350K",owner:"Natasha",sent:"May 7",viewed:"Viewed May 8, 9:21AM",stage:"Awaiting Approval",sc:"amber",ver:"v2",c:0},
    {title:"MYDIN – Store Operations Transformation",client:"MYDIN",value:"RM 210K",owner:"Shazia",sent:"May 6",viewed:"Opened May 6, 4:32PM",stage:"Under Review",sc:"blue",ver:"v1",c:1},
    {title:"KK Mart – Inventory & Demand Planning",client:"KK Mart",value:"RM 160K",owner:"Nazri",sent:"May 5",viewed:"Not Viewed",stage:"Submitted",sc:"purple",ver:"v1",c:2},
    {title:"Jaya Grocer – Pricing Strategy Proposal",client:"Jaya Grocer",value:"RM 190K",owner:"Mei Yin",sent:"May 3",viewed:"Viewed May 3",stage:"Under Review",sc:"blue",ver:"v3",c:3},
    {title:"AEON BIG – Marketing Partnership",client:"AEON BIG",value:"RM 120K",owner:"Natasha",sent:"May 1",viewed:"Not Viewed",stage:"Draft",sc:"gray",ver:"v1",c:0},
  ];

  const demoStages=[
    {step:1,label:"Brief Received",dept:"Sales",who:"Natasha",date:"May 1, 9:15AM",detail:"AEON BIG sent Raya 2026 brief via email. AI extracted 10 fields: OOH + Digital + Radio, budget RM 350K, period Apr 1–30, target audience 18–45 urban. Channel team notified automatically.",status:"done",color:T.green},
    {step:2,label:"Channel Team: Media Selection",dept:"Channel",who:"Shazia",date:"May 2, 10:30AM",detail:"Channel team selected 8 media sites from Master Inventory. 3 highway OOH, 2 digital screens, 1 mall LED, 2 radio stations. Creative brief auto-generated for each site.",status:"done",color:T.teal},
    {step:3,label:"Creative: Superimposed Mockups",dept:"Creative",who:"Nazri",date:"May 3, 2:00PM",detail:"Creative team uploaded superimposed visuals for all 8 sites. Client brand overlaid on actual site photography. 3 design rounds. All mockups attached to proposal.",status:"done",color:T.purple},
    {step:4,label:"Commercial: Pricing & Availability",dept:"Commercial",who:"Mahen",date:"May 4, 9:00AM",detail:"AI Pricing Engine ran on all 8 items. Big Tree quoted RM 18K for ELITE KM14.2 — AI suggested RM 12K. After negotiation: locked at RM 13,800 (23% off). Total campaign cost secured.",status:"done",color:T.orange},
    {step:5,label:"Internal Review & Approval",dept:"Manager",who:"Sai (Director)",date:"May 5, 3:00PM",detail:"Director reviewed full proposal. GP calculated at 34.2% — above 30% threshold. Approved without special sign-off. Proposal cleared for client submission.",status:"done",color:T.nav},
    {step:6,label:"AI Auto-Generates PDF Proposal",dept:"System",who:"AI",date:"May 5, 3:05PM",detail:"Branded PDF proposal auto-generated: cover page, campaign rationale, 8 site details with mockups, reach data, pricing summary, timeline, T&Cs. 14 pages.",status:"done",color:T.teal},
    {step:7,label:"Proposal Sent to Client",dept:"Sales",who:"Natasha",date:"May 7, 10:00AM",detail:"PDF sent to Andrew Lim (AEON BIG) via Outlook. AI tracking active. Email opened May 8 at 9:21AM. Viewed for 12 minutes. Auto-follow-up reminder set for May 11.",status:"done",color:T.purple},
    {step:8,label:"Client Revision Request",dept:"Client",who:"Andrew Lim",date:"May 9, 11:00AM",detail:"Client replied: 'Can we swap NST full-page for The Star? Also prefer 40-second radio over 30-second.' AI extracted 2 revision points, tasks auto-created for Channel team. Version incremented to v2.",status:"done",color:T.orange},
    {step:9,label:"Revised Proposal v2",dept:"Channel",who:"Shazia",date:"May 10, 4:00PM",detail:"Swapped NST for The Star (same cost). Radio extended to 40-sec (+RM 8K). Commercial re-confirmed pricing. Director re-approved. New PDF generated and sent.",status:"done",color:T.teal},
    {step:10,label:"Client Approval",dept:"Client",who:"Andrew Lim",date:"May 11, 2:30PM",detail:"Andrew replied: 'Looks great, we'd like to proceed.' AI detected approval keywords. Deal moved to Won. Media Order workflow triggered automatically. Natasha notified.",status:demoStage>=9?"done":"active",color:T.green},
    {step:11,label:"Media Order → PO → Execution",dept:"Sales → Commercial",who:"Auto-triggered",date:"Pending",detail:"Sales to generate Media Order for client signature. Once signed, Commercial raises PO to vendors. Artwork job sheet auto-created. Execution module activated.",status:demoStage>=10?"done":"pending",color:T.nav},
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
  {id:"AIR-003-064",vendor:"JCD",name:"Penang Airport Departures ×4",cat:"OOH",type:"Lightbox",loc:"Penang Airport",state:"Penang",size:"2×1m each",reach:"28K/day",rate:16000,status:"Available"},
  // PETROL STATION
  {id:"PET-001-065",vendor:"AdPetro",name:"Shell KESAS Petrol Screen ×5",cat:"Digital OOH",type:"Petrol Screen",loc:"Shah Alam, Selangor",state:"Selangor",size:"32in screens",reach:"8K/day",rate:4500,status:"Available"},
  {id:"PET-002-066",vendor:"AdPetro",name:"Petronas PLUS Rest Area KM180",cat:"OOH",type:"Billboard",loc:"PLUS Rest Area",state:"Selangor",size:"20×10ft",reach:"22K/day",rate:5000,status:"Available"},
  // ROADSIDE / CITY OOH
  {id:"JCD-001-067",vendor:"JCD",name:"Jalan Tuanku Abdul Halim",cat:"OOH",type:"Billboard",loc:"KL City, KL",state:"KL",size:"20×10ft",reach:"55K/day",rate:12000,status:"Available"},
  {id:"JCD-002-068",vendor:"JCD",name:"Jalan Maharajalela Billboard",cat:"OOH",type:"Billboard",loc:"KL City, KL",state:"KL",size:"20×10ft",reach:"48K/day",rate:10500,status:"Available"},
  {id:"JCD-003-069",vendor:"JCD",name:"Lorong Haji Taib Digital",cat:"Digital OOH",type:"LED",loc:"Chow Kit, KL",state:"KL",size:"1280×720px",reach:"35K/day",rate:8500,status:"Available"},
  {id:"OCT-001-070",vendor:"Ocean Outdoor",name:"Jalan Ampang Corner LED",cat:"Digital OOH",type:"LED",loc:"Ampang, KL",state:"KL",size:"1920×1080px",reach:"72K/day",rate:28000,status:"Available"},
  {id:"OCT-002-071",vendor:"Ocean Outdoor",name:"Jalan Imbi Giant Screen",cat:"Digital OOH",type:"LED",loc:"Imbi, KL",state:"KL",size:"3072×1728px",reach:"90K/day",rate:42000,status:"Available"},
  // COMMUNITY MALL
  {id:"AEO-001-072",vendor:"AEON Media",name:"AEON Mall Shah Alam Entrance",cat:"Digital OOH",type:"Mall Screen",loc:"Shah Alam, Selangor",state:"Selangor",size:"1920×1080px",reach:"65K/day",rate:16000,status:"Available"},
  {id:"AEO-002-073",vendor:"AEON Media",name:"AEON Tebrau City Screen",cat:"Digital OOH",type:"Mall Screen",loc:"Johor Bahru, Johor",state:"Johor",size:"1920×1080px",reach:"72K/day",rate:18000,status:"Available"},
  {id:"AEO-003-074",vendor:"AEON Media",name:"AEON Seremban 2 Atrium",cat:"Digital OOH",type:"Mall Screen",loc:"Seremban, Negeri Sembilan",state:"NS",size:"1280×720px",reach:"42K/day",rate:10000,status:"Available"},
  {id:"MCM-001-075",vendor:"Mitsui Media",name:"Mitsui Outlet Park KLIA Screen",cat:"Digital OOH",type:"Mall Screen",loc:"Sepang, Selangor",state:"Selangor",size:"1920×1080px",reach:"55K/day",rate:14000,status:"Available"},
  // SPORTS VENUE
  {id:"SPT-001-076",vendor:"Stadium Negara",name:"National Stadium Perimeter ×8",cat:"OOH",type:"Stadium Board",loc:"Bukit Jalil, KL",state:"KL",size:"3×1m each",reach:"50K/match",rate:28000,status:"Available"},
  {id:"SPT-002-077",vendor:"Stadium Negara",name:"Axiata Arena Fascia LED",cat:"Digital OOH",type:"Arena Screen",loc:"Bukit Jalil, KL",state:"KL",size:"Full fascia",reach:"12K/event",rate:18000,status:"Available"},
  // FABRICATION
  {id:"FAB-001-078",vendor:"Printmaster",name:"Pull-Up Banner Fabric 85×200cm",cat:"Fabrication",type:"Standee",loc:"Malaysia",state:"National",size:"85×200cm",reach:"Per unit",rate:180,status:"Available"},
  {id:"FAB-002-079",vendor:"Printmaster",name:"X-Banner 60×160cm",cat:"Fabrication",type:"Standee",loc:"Malaysia",state:"National",size:"60×160cm",reach:"Per unit",rate:120,status:"Available"},
  {id:"FAB-003-080",vendor:"Printmaster",name:"Foam Board 60×90cm",cat:"Fabrication",type:"Display",loc:"Malaysia",state:"National",size:"60×90cm",reach:"Per unit",rate:95,status:"Available"},
  {id:"FAB-004-081",vendor:"Signcraft",name:"Acrylic Signage 1×0.5m",cat:"Fabrication",type:"Signage",loc:"Malaysia",state:"National",size:"1×0.5m",reach:"Per unit",rate:350,status:"Available"},
  {id:"FAB-005-082",vendor:"Signcraft",name:"Canvas Banner 3×1m",cat:"Fabrication",type:"Banner",loc:"Malaysia",state:"National",size:"3×1m",reach:"Per unit",rate:220,status:"Available"},
  // DIGITAL
  {id:"DIG-001-083",vendor:"Google",name:"Google Display Network — National",cat:"Digital",type:"Programmatic",loc:"National",state:"National",size:"Various formats",reach:"5M impressions",rate:8500,status:"Available"},
  {id:"DIG-002-084",vendor:"Meta",name:"Facebook + Instagram — National",cat:"Digital",type:"Social Media",loc:"National",state:"National",size:"1080×1080px",reach:"3M reach",rate:12000,status:"Available"},
  {id:"DIG-003-085",vendor:"TikTok",name:"TikTok In-Feed Ads — National",cat:"Digital",type:"Social Media",loc:"National",state:"National",size:"1080×1920px",reach:"2.5M reach",rate:9500,status:"Available"},
  {id:"DIG-004-086",vendor:"YouTube",name:"YouTube Pre-roll — National",cat:"Digital",type:"Video",loc:"National",state:"National",size:"15-30sec video",reach:"4M impressions",rate:15000,status:"Available"},
  // SELANGOR ADDITIONAL
  {id:"SEL-001-087",vendor:"Media Outdoor",name:"Shah Alam City Centre Billboard",cat:"OOH",type:"Billboard",loc:"Shah Alam, Selangor",state:"Selangor",size:"30×15ft",reach:"55K/day",rate:8000,status:"Available"},
  {id:"SEL-002-088",vendor:"Media Outdoor",name:"Subang Jaya Commercial Area",cat:"OOH",type:"Billboard",loc:"Subang Jaya, Selangor",state:"Selangor",size:"20×10ft",reach:"42K/day",rate:6500,status:"Available"},
  {id:"SEL-003-089",vendor:"Media Outdoor",name:"Puchong IOI Facing",cat:"OOH",type:"Unipole",loc:"Puchong, Selangor",state:"Selangor",size:"25×12ft",reach:"38K/day",rate:5500,status:"Available"},
  {id:"SEL-004-090",vendor:"Media Outdoor",name:"Klang Parade Billboard",cat:"OOH",type:"Billboard",loc:"Klang, Selangor",state:"Selangor",size:"30×15ft",reach:"45K/day",rate:7000,status:"Available"},
  // CINEMA
  {id:"CIN-001-091",vendor:"GSC Media",name:"GSC Mid Valley 30sec Pre-show ×7days",cat:"Cinema",type:"Cinema Screen",loc:"Mid Valley, KL",state:"KL",size:"4K cinema screen",reach:"12K/week",rate:18000,status:"Available"},
  {id:"CIN-002-092",vendor:"TGV Media",name:"TGV KLCC 30sec Pre-show ×7days",cat:"Cinema",type:"Cinema Screen",loc:"KLCC, KL",state:"KL",size:"4K cinema screen",reach:"9K/week",rate:14000,status:"Available"},
  {id:"CIN-003-093",vendor:"MBO Media",name:"MBO Cinemas 30sec Nationwide ×7",cat:"Cinema",type:"Cinema Screen",loc:"National",state:"National",size:"4K cinema screen",reach:"45K/week",rate:42000,status:"Available"},
  // ELEVATOR
  {id:"ELV-001-094",vendor:"Altel Media",name:"KLCC Twin Tower Elevator LCD",cat:"Digital OOH",type:"Elevator Screen",loc:"KLCC, KL",state:"KL",size:"42in screens ×8",reach:"15K/day",rate:12000,status:"Available"},
  {id:"ELV-002-095",vendor:"Altel Media",name:"Mid Valley Office Tower Elevator",cat:"Digital OOH",type:"Elevator Screen",loc:"Mid Valley, KL",state:"KL",size:"42in screens ×6",reach:"8K/day",rate:8000,status:"Available"},
  // CONVENIENCE STORE
  {id:"CNV-001-096",vendor:"7-Eleven Media",name:"7-Eleven Checkout Screen KL ×50",cat:"Digital OOH",type:"Convenience Screen",loc:"KL & Selangor",state:"KL",size:"15in screens",reach:"25K/day",rate:9500,status:"Available"},
  {id:"CNV-002-097",vendor:"myNEWS Media",name:"myNEWS Store Screen ×30",cat:"Digital OOH",type:"Convenience Screen",loc:"KL & Selangor",state:"KL",size:"15in screens",reach:"15K/day",rate:5500,status:"Available"},
  // EAST MALAYSIA
  {id:"MRI-001-098",vendor:"Miri Outdoor",name:"Miri City Billboard",cat:"OOH",type:"Billboard",loc:"Miri, Sarawak",state:"Sarawak",size:"20×10ft",reach:"18K/day",rate:3500,status:"Available"},
  {id:"SDK-001-099",vendor:"Sandakan Ads",name:"Sandakan Town Centre",cat:"OOH",type:"Billboard",loc:"Sandakan, Sabah",state:"Sabah",size:"20×10ft",reach:"15K/day",rate:3000,status:"Available"},
  {id:"TTU-001-100",vendor:"Tawau Media",name:"Tawau Central Unipole",cat:"OOH",type:"Unipole",loc:"Tawau, Sabah",state:"Sabah",size:"15×8ft",reach:"12K/day",rate:2500,status:"Available"},
];

// ─── SCREEN: MASTER INVENTORY ─────────────────────────────────────
function Inventory(){
  const [tab,setTab]=useState("media");
  const [search,setSearch]=useState("");
  const [catFilter,setCatFilter]=useState("All");
  const [stateFilter,setStateFilter]=useState("All");
  const [page,setPage]=useState(0);
  const PER_PAGE=15;

  const cats=["All",...new Set(ALL_INVENTORY.map(i=>i.cat))];
  const states=["All",...new Set(ALL_INVENTORY.map(i=>i.state))];

  const filtered=ALL_INVENTORY.filter(i=>{
    const matchSearch=!search||i.name.toLowerCase().includes(search.toLowerCase())||i.vendor.toLowerCase().includes(search.toLowerCase())||i.loc.toLowerCase().includes(search.toLowerCase());
    const matchCat=catFilter==="All"||i.cat===catFilter;
    const matchState=stateFilter==="All"||i.state===stateFilter;
    return matchSearch&&matchCat&&matchState;
  });

  const paginated=filtered.slice(page*PER_PAGE,(page+1)*PER_PAGE);
  const totalPages=Math.ceil(filtered.length/PER_PAGE);

  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<Package size={18}/>} label="Total Inventory" value="100" color={T.purple} sub="sites standardised"/>
        <Kpi icon={<CheckCircle size={18}/>} label="Available" value={ALL_INVENTORY.filter(i=>i.status==="Available").length} color={T.green} sub="ready to book"/>
        <Kpi icon={<Activity size={18}/>} label="Booked" value={ALL_INVENTORY.filter(i=>i.status==="Booked").length} color={T.orange} sub="currently active"/>
        <Kpi icon={<AlertTriangle size={18}/>} label="On Hold" value={ALL_INVENTORY.filter(i=>i.status==="On Hold").length} color={T.amber} sub="pending confirmation"/>
      </div>

      {/* AI Extraction */}
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-3"><span className="text-lg">🤖</span><div><div className="font-bold text-gray-900">AI Extraction Pipeline</div><div className="text-xs text-gray-500">Upload any vendor PDF or PPT — AI standardises into Master Inventory automatically</div></div></div>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] border-2 border-dashed border-purple-200 rounded-xl px-4 py-3 bg-purple-50 cursor-pointer hover:bg-purple-100">
            <Upload size={16} className="text-purple-500"/><span className="text-sm text-purple-600 font-semibold">Drop vendor PDF or PPT here to extract</span>
          </div>
          {["Upload","Convert","AI Extract","Preview","Save"].map((s,i)=>(
            <div key={s} className="flex items-center gap-1">
              <div className={`px-3 py-1.5 rounded-lg text-xs font-bold ${i<2?"bg-green-100 text-green-700":"bg-gray-100 text-gray-500"}`}>{s}</div>
              {i<4&&<ChevronRight size={12} className="text-gray-300"/>}
            </div>
          ))}
        </div>
      </Card>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap items-center">
        <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-200 flex-1 min-w-[180px]"><Search size={13} className="text-gray-400"/><input className="bg-transparent text-sm outline-none flex-1" placeholder={`Search ${ALL_INVENTORY.length} inventory items...`} value={search} onChange={e=>{setSearch(e.target.value);setPage(0);}}/></div>
        <select value={catFilter} onChange={e=>{setCatFilter(e.target.value);setPage(0);}} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white outline-none text-gray-600">
          {cats.map(c=><option key={c}>{c}</option>)}
        </select>
        <select value={stateFilter} onChange={e=>{setStateFilter(e.target.value);setPage(0);}} className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white outline-none text-gray-600">
          {states.map(s=><option key={s}>{s}</option>)}
        </select>
        <span className="text-xs text-gray-400 font-semibold">{filtered.length} items</span>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-gray-100">{["Site Code","Vendor/MO","Location","Cat","Type","Pixels","Ops Hours","Min Exp/Day","Pub Rate 1M","Pub Rate 2W","Eyeballs/mo","Status",""].map(h=><th key={h} className="text-left px-3 py-3 text-xs font-semibold text-gray-400 uppercase whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.map((m,i)=>(
                <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-3 py-2.5 text-xs font-bold font-mono text-teal-700 whitespace-nowrap">{m.id}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-600 whitespace-nowrap">{m.vendor}</td>
                  <td className="px-3 py-2.5 text-xs font-semibold text-gray-900 max-w-[180px] truncate">{m.name}</td>
                  <td className="px-3 py-2.5"><Bdg t={m.cat} c={m.cat==="OOH"?"purple":m.cat==="DOOH"?"teal":m.cat==="Print"?"blue":m.cat==="Radio"?"orange":m.cat==="TV"?"red":m.cat==="Transit"?"amber":m.cat==="Retail Media"?"green":"gray"}/></td>
                  <td className="px-3 py-2.5 text-xs text-gray-500 whitespace-nowrap">{m.type}</td>
                  <td className="px-3 py-2.5 text-xs font-mono text-gray-500 whitespace-nowrap">{m.pixels||m.size||"—"}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-500 whitespace-nowrap">{m.ops||"—"}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-600 whitespace-nowrap">{m.minExp?`${m.minExp}/day`:"—"}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-500 whitespace-nowrap">{m.pubRate1M?`RM ${m.pubRate1M.toLocaleString()}`:"—"}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-500 whitespace-nowrap">{m.pubRate2W?`RM ${m.pubRate2W.toLocaleString()}`:"—"}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-600 whitespace-nowrap">{m.eyeballsMo?(m.eyeballsMo>=1000000?(m.eyeballsMo/1000000).toFixed(1)+"M":m.eyeballsMo>=1000?Math.round(m.eyeballsMo/1000)+"K":m.eyeballsMo)+"/mo":m.reach||"—"}</td>
                  <td className="px-3 py-2.5"><Bdg t={m.status} c={m.status==="Available"?"green":m.status==="Booked"?"orange":"amber"}/></td>
                  <td className="px-3 py-2.5"><button className="text-xs text-purple-600 font-semibold hover:underline whitespace-nowrap">+ Add</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">Showing {page*PER_PAGE+1}–{Math.min((page+1)*PER_PAGE,filtered.length)} of {filtered.length}</span>
          <div className="flex gap-2">
            <button disabled={page===0} onClick={()=>setPage(p=>p-1)} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 disabled:opacity-30 hover:bg-gray-50">← Prev</button>
            {[...Array(Math.min(totalPages,5))].map((_,i)=>{
              const pg=page<=2?i:page>=totalPages-3?totalPages-5+i:page-2+i;
              return pg>=0&&pg<totalPages?<button key={pg} onClick={()=>setPage(pg)} className="w-8 h-8 rounded-lg text-xs font-semibold border" style={pg===page?{background:T.purple,color:"#fff",border:`1px solid ${T.purple}`}:{background:"#fff",color:"#475569",border:"1px solid #E2E8F0"}}>{pg+1}</button>:null;
            })}
            <button disabled={page>=totalPages-1} onClick={()=>setPage(p=>p+1)} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 disabled:opacity-30 hover:bg-gray-50">Next →</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── SCREEN: MEDIA ORDER & PO (AI PREDICTIVE PRICING) ─────────────
function Orders({role="admin"}){
  const currentStaff = STAFF_PROFILES[role]||STAFF_PROFILES.natasha;
  const canSeeCost = currentStaff.canSeeSupplierCost===true;
  const noPricing  = currentStaff.noPricing===true;
  const canSeePO=["admin","commercial","finance"].includes(role);
  const [selectedSite,setSelectedSite]=useState(0);
  const [negoPrice,setNegoPrice]=useState(13800);
  const [clientBilled,setClientBilled]=useState(23000);
  const [showPricing,setShowPricing]=useState(false);

  const sites=[
    {id:"BTO-ELITE-001",name:"ELITE Highway KM14.2 NB",vendor:"Big Tree",type:"Billboard 40×20ft",reach:"120K/day",rateCard:18000,
     history:[{period:"Mar 2025",paid:13800,disc:23.3},{period:"Nov 2024",paid:14200,disc:21.1},{period:"Jul 2024",paid:15000,disc:16.7},{period:"Mar 2024",paid:14800,disc:17.8},{period:"Nov 2023",paid:15500,disc:13.9}],
     prediction:{min:12000,likely:13500,max:16000,confidence:87,pattern:"Vendor accepts 20-25% off on repeat bookings. Q4 season premium ~15%."}},
    {id:"BTO-LDP-005",name:"LDP KM9.8 Eastbound",vendor:"Big Tree",type:"Billboard 40×20ft",reach:"105K/day",rateCard:15000,
     history:[{period:"Apr 2025",paid:11200,disc:25.3},{period:"Dec 2024",paid:11800,disc:21.3},{period:"Aug 2024",paid:12500,disc:16.7}],
     prediction:{min:10500,likely:11500,max:14000,confidence:81,pattern:"Consistent 20-25% discount achievable. Peak season adds ~10%."}},
    {id:"CIT-LED-018",name:"Bangsar LED Screen",vendor:"Citylites",type:"Digital LED 1920×1080px",reach:"60K/day",rateCard:25000,
     history:[{period:"Feb 2025",paid:19500,disc:22.0},{period:"Oct 2024",paid:20000,disc:20.0},{period:"Jun 2024",paid:21000,disc:16.0}],
     prediction:{min:18000,likely:19500,max:23000,confidence:79,pattern:"Digital inventory less flexible. 18-22% typical. Bundle with other Citylites sites for better rate."}},
  ];

  const site=sites[selectedSite];
  const gpPct=clientBilled>0?((clientBilled-negoPrice)/clientBilled*100):0;
  const gpRM=clientBilled-negoPrice;
  const gpColor=gpPct>=40?T.green:gpPct>=30?T.amber:T.red;
  const maxHist=Math.max(...site.history.map(h=>h.paid),site.rateCard);

  const orders=[
    {ref:"MO-2025-041",client:"AEON BIG",campaign:"Raya 2026 OOH",value:"RM 350,000",issued:"May 7",status:"Signed",c:0},
    {ref:"MO-2025-040",client:"MYDIN",campaign:"Mid-Year Sale Digital",value:"RM 180,000",issued:"May 6",status:"Awaiting Signature",c:1},
    {ref:"MO-2025-039",client:"KK Mart",campaign:"Store Launch Billboard",value:"RM 95,000",issued:"May 5",status:"Signed",c:2},
  ];

  return(
    <div className="flex flex-col gap-4">
      {!canSeeCost&&(
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-xl flex-shrink-0">ℹ️</span>
          <div><div className="font-bold text-blue-900 text-sm">Sales View — Media Orders Only</div><div className="text-sm text-blue-700">You can create and manage Company Media Orders for client signature. Vendor costs and AI pricing are handled by the Commercial team.</div></div>
        </div>
      )}

      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
        <span className="text-xl flex-shrink-0">🔒</span>
        <div><div className="font-bold text-red-800 text-sm">System Rule — Enforced</div><div className="text-sm text-red-700">Purchase Order to any media owner CANNOT be created until Company Media Order is signed by client.</div></div>
      </div>

      {canSeePO&&(
        <>
          {/* AI PREDICTIVE PRICING */}
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2"><span className="text-lg">🤖</span><div><div className="font-bold text-gray-900">AI Predictive Pricing Engine</div><div className="text-xs text-gray-400">Select a site to see AI-powered negotiation intelligence</div></div></div>
              <Bdg t="Commercial Only" c="purple"/>
            </div>
            {/* Site selector */}
            <div className="flex gap-2 p-4 pb-0 overflow-x-auto">
              {sites.map((s,i)=>(
                <button key={i} onClick={()=>{setSelectedSite(i);setNegoPrice(Math.round(s.history[0].paid));}} className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all" style={{borderColor:selectedSite===i?T.purple:"#E2E8F0",background:selectedSite===i?T.purple+"10":"#fff",color:selectedSite===i?T.purple:"#6B7280"}}>
                  {s.name.split(" ").slice(0,3).join(" ")}
                </button>
              ))}
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Inventory Detail */}
              <div className="rounded-2xl p-4" style={{background:"#0C1F3F"}}>
                <div className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">Inventory Detail</div>
                <div className="text-xs text-white/40 mb-3">{site.id} · {site.vendor}</div>
                <div className="text-base font-black text-white mb-4 leading-snug">{site.name}</div>
                {[{l:"Type",v:site.type},{l:"Reach",v:site.reach},{l:"Rate Card",v:`RM ${site.rateCard.toLocaleString()}/mo`}].map(f=>(
                  <div key={f.l} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                    <span className="text-xs text-white/40">{f.l}</span>
                    <span className="text-xs font-bold text-white">{f.v}</span>
                  </div>
                ))}
              </div>

              {/* AI Pricing */}
              <div className="rounded-2xl p-4" style={{background:"#0C1F3F"}}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-bold uppercase tracking-widest text-white/30">AI Pricing Engine</div>
                  <div className="text-xs font-bold px-2 py-0.5 rounded text-teal-400 border border-teal-400/30 bg-teal-400/10">{site.prediction.confidence}% confidence</div>
                </div>
                <div className="flex flex-col gap-2 mb-3">
                  {[{l:"Published Rate (2W)",v:`RM ${site.rateCard.toLocaleString()}`,c:"text-white"},{l:"Avg Payout to MO",v:`RM ${Math.round(site.history.reduce((a,h)=>a+h.paid,0)/site.history.length).toLocaleString()}`,c:"text-blue-300"},{l:"Lowest MO Payout",v:`RM ${Math.min(...site.history.map(h=>h.paid)).toLocaleString()}`,c:"text-green-400"},{l:"Fair Range",v:`RM ${site.prediction.min.toLocaleString()} – ${site.prediction.likely.toLocaleString()}`,c:"text-teal-300"}].map(r=>(
                    <div key={r.l} className="flex justify-between"><span className="text-xs text-white/40">{r.l}</span><span className={`text-xs font-bold ${r.c}`}>{r.v}</span></div>
                  ))}
                </div>
                <div className="rounded-lg p-2.5 mb-2" style={{background:"rgba(0,212,170,0.1)",border:"1px solid rgba(0,212,170,0.4)"}}>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-teal-400">🎯 Suggested Payout to MO</span>
                    <span className="text-sm font-black text-teal-400">RM {site.prediction.min.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex justify-between mb-3"><span className="text-xs text-white/40">Walk away above</span><span className="text-xs font-bold text-red-400">RM {site.prediction.max.toLocaleString()}</span></div>
                <div className="text-xs text-white/30 italic leading-relaxed">{site.prediction.pattern}</div>
              </div>

              {/* GP Calculator + Booking History */}
              <div className="flex flex-col gap-3">
                {/* Net to VR Calculator — matches VR actual Excel format */}
                <div className="rounded-2xl p-4" style={{background:"#0C1F3F",flex:1}}>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">Net to VR Calculator</div>
                  <div className="text-xs text-white/20 mb-3 italic">Net to VR (%) = (Best Rate − Payout to MO) ÷ Best Rate</div>
                  <div className="mb-2">
                    <div className="text-xs text-white/40 mb-1">Best Rate — 2 Weeks (Client Pays VR)</div>
                    <input type="number" value={clientBilled} onChange={e=>{setClientBilled(Number(e.target.value));}} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-bold outline-none" style={{fontFamily:"inherit"}}/>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-white/40 mb-1"><span>Payout to MO — 2 Weeks (VR pays Media Owner)</span><span style={{color:"#00D4AA"}}>RM {negoPrice.toLocaleString()}</span></div>
                    <input type="range" min={site.prediction.min} max={site.rateCard} step={100} value={negoPrice} onChange={e=>setNegoPrice(Number(e.target.value))} className="w-full" style={{accentColor:"#00D4AA"}}/>
                    <div className="flex justify-between text-xs text-white/30 mt-1"><span>RM {site.prediction.min.toLocaleString()}</span><span>RM {site.rateCard.toLocaleString()}</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-white/5 rounded-lg p-2 text-center"><div className="text-xs text-white/30 mb-0.5">Net to VR (RM)</div><div className="text-base font-black" style={{color:"#00D4AA"}}>RM {gpRM.toLocaleString()}</div></div>
                    <div className="rounded-lg p-2 text-center" style={{background:`rgba(${gpPct>=33?"0,212,170":gpPct>=30?"215,119,6":"220,38,38"},0.15)`,border:`1px solid rgba(${gpPct>=33?"0,212,170":gpPct>=30?"215,119,6":"220,38,38"},0.4)`}}>
                      <div className="text-xs text-white/30 mb-0.5">Net to VR (%)</div>
                      <div className="text-2xl font-black" style={{color:gpPct>=33?"#00D4AA":gpPct>=30?"#FAC775":"#F09595"}}>{gpPct.toFixed(1)}%</div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2.5 mb-3">
                    <div className="text-xs text-white/20 mb-1.5 italic">Typical VR target: ~33–34% Net to VR</div>
                    {[{l:"Published Rate (2W)",v:`RM ${site.rateCard.toLocaleString()}`},{l:"Best Rate (Client)",v:`RM ${clientBilled.toLocaleString()}`},{l:"Payout to MO",v:`RM ${negoPrice.toLocaleString()}`},{l:"Net to VR",v:`RM ${gpRM.toLocaleString()}`}].map(r=>(
                      <div key={r.l} className="flex justify-between text-xs py-0.5 border-b border-white/5 last:border-0"><span className="text-white/40">{r.l}</span><span className="text-white font-bold">{r.v}</span></div>
                    ))}
                  </div>
                  {gpPct<30&&gpPct>0&&(
                    <div className="rounded-xl p-3" style={{background:"rgba(220,38,38,0.1)",border:"1px solid rgba(220,38,38,0.3)"}}>
                      <div className="text-xs font-bold text-red-400 flex items-center gap-1"><AlertTriangle size={11}/>Special Approval Required</div>
                      <div className="text-xs text-red-300/70 mt-1">Net to VR below 30%. Director sign-off needed before PO can be raised.</div>
                      <button className="w-full mt-2 py-1.5 rounded-lg text-xs font-bold text-red-400 border border-red-400/30 bg-transparent" style={{fontFamily:"inherit"}}>Request Director Approval →</button>
                    </div>
                  )}
                  {gpPct>=33&&<div className="text-xs text-teal-400/70 text-center">✅ On target — proceed</div>}
                  {gpPct>=30&&gpPct<33&&<div className="text-xs text-amber-400/70 text-center">⚠️ Below target — negotiate lower MO payout</div>}
                </div>

                {/* Booking history mini */}
                <div className="rounded-2xl p-4" style={{background:"#0C1F3F"}}>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/30 mb-2">Historical Payout to MO</div>
                  {site.history.map((h,i)=>(
                    <div key={i} className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs text-white/30 w-20 flex-shrink-0">{h.period}</span>
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div style={{width:(h.paid/maxHist*100)+"%",background:"#00D4AA",height:"100%",borderRadius:9}}/>
                      </div>
                      <span className="text-xs font-bold text-white w-20 text-right">RM {h.paid.toLocaleString()}</span>
                      <span className="text-xs text-green-400 w-10 text-right">-{h.disc}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </>
      )}

      {/* Media Orders */}
      <div className={`grid grid-cols-1 ${canSeePO?"md:grid-cols-2":""} gap-4`}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between"><h3 className="font-black text-gray-900">📄 Company Media Orders</h3><button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white font-bold" style={{background:T.purple}}><Plus size={13}/>Generate</button></div>
          <div className="text-xs text-gray-500 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">Created by Sales · Signed by Client · Sent via Outlook · AI detects signed copy in email</div>
          {orders.map((o,i)=>(
            <Card key={i} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div><div className="flex items-center gap-2"><span className="text-xs font-mono text-gray-400">{o.ref}</span><Bdg t={o.status} c={o.status==="Signed"?"green":"amber"}/></div><div className="text-sm font-bold text-gray-900 mt-1">{o.client} — {o.campaign}</div><div className="text-xs text-gray-500 mt-0.5">Issued {o.issued}</div></div>
                <div className="text-right flex-shrink-0"><div className="text-base font-black text-gray-900">{o.value}</div></div>
              </div>
              {o.status==="Awaiting Signature"&&<div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-2 flex items-center gap-2"><span className="text-sm">⏳</span><span className="text-xs text-amber-700 font-semibold">Waiting for client signature. PO locked until signed.</span></div>}
              {o.status==="Signed"&&<div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-2 flex items-center gap-2"><span className="text-sm">✅</span><span className="text-xs text-green-700 font-semibold">{canSeePO?"Signed. Commercial team may now raise PO.":"Signed. Commercial team notified to proceed with booking."}</span></div>}
            </Card>
          ))}
        </div>

        {canSeePO&&(
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between"><h3 className="font-black text-gray-900">🛒 Purchase Orders <span className="text-xs font-normal text-gray-400 ml-1">(Commercial only)</span></h3><button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white font-bold" style={{background:T.teal}}><Plus size={13}/>Raise PO</button></div>
            <div className="text-xs text-gray-500 bg-teal-50 border border-teal-100 rounded-xl px-3 py-2">Created by Commercial · Sent to Media Owner · Unlocked only after MO signed · AI Pricing shown above</div>
            {[{ref:"PO-2025-041A",vendor:"Big Tree",mo:"MO-2025-041",items:"ELITE KM14 (1 month)",quoted:"RM 18,000",nego:"RM 13,800",saving:"23.3%",status:"Sent",c:0},{ref:"PO-2025-041B",vendor:"Citylites",mo:"MO-2025-041",items:"Bangsar LED (1 month)",quoted:"RM 25,000",nego:"RM 19,500",saving:"22.0%",status:"Approved",c:1},{ref:"PO-2025-039",vendor:"Big Tree",mo:"MO-2025-039",items:"Klang Unipole (2 months)",quoted:"RM 24,000",nego:"RM 18,500",saving:"22.9%",status:"Pending Approval",c:2}].map((p,i)=>(
              <Card key={i} className="p-4">
                <div className="flex items-start justify-between gap-2 mb-3"><div><div className="flex items-center gap-2"><span className="text-xs font-mono text-gray-400">{p.ref}</span><Bdg t={p.status} c={p.status==="Sent"?"blue":p.status==="Approved"?"green":"amber"}/></div><div className="text-sm font-bold text-gray-900 mt-1">{p.vendor} — {p.items}</div><div className="text-xs text-gray-400 mt-0.5">Linked to {p.mo}</div></div></div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2 text-center"><div className="text-xs text-gray-400">Vendor Rate</div><div className="text-sm font-black text-gray-700">{p.quoted}</div></div>
                  <div className="bg-green-50 rounded-lg p-2 text-center"><div className="text-xs text-gray-400">Negotiated</div><div className="text-sm font-black text-green-700">{p.nego}</div></div>
                  <div className="bg-purple-50 rounded-lg p-2 text-center"><div className="text-xs text-gray-400">Saving</div><div className="text-sm font-black text-purple-700">{p.saving}</div></div>
                </div>
              </Card>
            ))}
            {["admin","finance"].includes(role)&&(
              <Card className="p-4 border-2 border-amber-200 bg-amber-50">
                <div className="flex items-center gap-2 mb-3"><span className="text-lg">💰</span><span className="font-bold text-amber-900">Agency Margin</span><Bdg t="Admin & Finance only" c="amber"/></div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-xl p-3 text-center"><div className="text-xs text-gray-400">Client Billed</div><div className="text-base font-black text-gray-900">RM 350,000</div></div>
                  <div className="bg-white rounded-xl p-3 text-center"><div className="text-xs text-gray-400">Vendor Cost</div><div className="text-base font-black text-gray-700">RM 230,000</div></div>
                  <div className="bg-white rounded-xl p-3 text-center border-2 border-green-200"><div className="text-xs text-gray-400">Margin</div><div className="text-base font-black text-green-700">RM 120K</div><div className="text-xs text-green-600 font-bold">34.3%</div></div>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
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
    {user:"Nazri",dept:"Creative",project:"AEON BIG Raya 2026",task:"Artwork Adaptation",hrs:3.5,billable:true,rate:150,c:3},
    {user:"Shazia",dept:"Channel",project:"MYDIN Mid-Year Sale",task:"Proposal Writing",hrs:2.0,billable:true,rate:120,c:2},
    {user:"Natasha",dept:"Sales",project:"KK Mart Launch",task:"Client Meeting",hrs:1.5,billable:false,rate:0,c:1},
    {user:"Mahen",dept:"Commercial",project:"Jaya Grocer Q3",task:"Vendor Negotiation",hrs:2.5,billable:false,rate:0,c:4},
    {user:"Shariff",dept:"Creative",project:"AEON BIG Raya 2026",task:"Superimposed Mockup",hrs:4.0,billable:true,rate:150,c:3},
    {user:"Yash",dept:"Marketing",project:"MYDIN Mid-Year Sale",task:"Campaign Planning",hrs:2.0,billable:true,rate:120,c:5},
    {user:"Najwa",dept:"Commercial",project:"KK Mart Launch",task:"PO Processing",hrs:1.5,billable:false,rate:0,c:4},
  ];
  const billableTotal=entries.filter(e=>e.billable).reduce((a,e)=>a+e.hrs*e.rate,0);
  const totalHrs=entries.reduce((a,e)=>a+e.hrs,0);
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<Clock size={18}/>} label="Total Hours Today" value={`${totalHrs}h`} color={T.purple} sub="team total"/>
        <Kpi icon={<DollarSign size={18}/>} label="Billable Value" value={`RM ${(billableTotal/1000).toFixed(1)}K`} color={T.green} sub="this week"/>
        <Kpi icon={<Activity size={18}/>} label="Utilisation Rate" value="72%" delta="↑3%" up color={T.teal} sub="vs last week"/>
        <Kpi icon={<AlertTriangle size={18}/>} label="Overloaded Staff" value="1" color={T.red} sub="Nazri — 52hrs"/>
      </div>
      {/* AI Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-xl flex-shrink-0">🤖</span>
        <div className="flex-1"><span className="font-bold text-amber-800">AI Overload Alert: </span><span className="text-sm text-amber-700">Nazri has 52hrs assigned this week — 12hrs over capacity. Shariff has 12hrs available. Suggest reassigning AEON BIG mockup to Shariff.</span></div>
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
              {[{n:"Natasha",r:"1.61M",c:"920K",w:"38%",a:65},{n:"Mahen",r:"980K",c:"560K",w:"36%",a:60},{n:"Azrina",r:"720K",c:"410K",w:"34%",a:58},{n:"Shazia",r:"610K",c:"330K",w:"31%",a:52}].map((r,i)=>(
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
            {[{n:"Natasha",dept:"Sales",rph:"RM 115",util:82,c:1},{n:"Shazia",dept:"Channel",rph:"RM 96",util:71,c:2},{n:"Nazri",dept:"Creative",rph:"RM 88",util:92,c:3},{n:"Mahen",dept:"Commercial",rph:"RM 105",util:68,c:4}].map((p,i)=>(
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



// ─── SCREEN: MARKETING HUB (Yash) ────────────────────────────────
function Marketing(){
  const [tab,setTab]=useState("overview");
  const [newContent,setNewContent]=useState(false);

  const contentCal=[
    {type:"Instagram",title:"VR Raya campaign case study — AEON BIG",status:"Published",date:"May 14",reach:"4.2K",eng:"8.3%",cat:"Case Study"},
    {type:"LinkedIn",title:"Why DOOH outperforms print in high-traffic corridors",status:"Published",date:"May 12",reach:"2.8K",eng:"6.1%",cat:"Thought Leadership"},
    {type:"Instagram",title:"KK Mart launch — behind the scenes",status:"Scheduled",date:"May 17",reach:"—",eng:"—",cat:"BTS"},
    {type:"LinkedIn",title:"Visual EFX Q2 2026 — industry insights",status:"Draft",date:"May 20",reach:"—",eng:"—",cat:"Report"},
    {type:"Instagram Reel",title:"How we built 14 DOOH sites for Grab NakNak",status:"Draft",date:"May 22",reach:"—",eng:"—",cat:"Case Study"},
    {type:"LinkedIn",title:"Retail media 101 — why in-store screens convert",status:"Planned",date:"May 28",reach:"—",eng:"—",cat:"Thought Leadership"},
  ];

  const awards=[
    {event:"MARKies Awards 2026",category:"Best OOH Campaign",client:"AEON BIG Raya 2025",deadline:"Jun 30",status:"In Progress",fit:82},
    {event:"Effie Awards Malaysia 2026",category:"Retail Media Effectiveness",client:"MYDIN Mid-Year",deadline:"Jul 15",status:"Not Started",fit:75},
    {event:"Campaign Asia Agency of the Year",category:"Best Independent Agency",client:"Visual EFX",deadline:"Aug 1",status:"Researching",fit:68},
  ];

  const events=[
    {name:"AMIC Conference 2026",type:"Industry",date:"Jun 5–6",loc:"Kuala Lumpur","status":"Attending"},
    {name:"Client Appreciation Dinner — AEON BIG",type:"Client",date:"Jun 20",loc:"Kuala Lumpur","status":"Organising"},
    {name:"Digital Media Summit",type:"Industry",date:"Jul 8",loc:"KL Convention Centre","status":"Registering"},
    {name:"MYDIN Mid-Year Campaign Launch",type:"Client Activation",date:"Jun 1",loc:"MYDIN Shah Alam","status":"Supporting"},
  ];

  const pitchSupport=[
    {client:"KK Mart",deliverable:"Campaign proposal deck",status:"Done",doneBy:"May 5",helpedClose:true},
    {client:"Jaya Grocer",deliverable:"Retail media overview deck",status:"Done",doneBy:"May 8",helpedClose:false},
    {client:"New Prospect — F&B",deliverable:"DOOH + Retail media intro pack",status:"In Progress",doneBy:"May 20",helpedClose:false},
    {client:"7-Eleven",deliverable:"Case study compilation",status:"Planned",doneBy:"May 25",helpedClose:false},
  ];

  const tabs=[{id:"overview",l:"Overview"},{id:"content",l:"Content Calendar"},{id:"pitch",l:"Pitch Support"},{id:"awards",l:"Awards"},{id:"events",l:"Events"}];

  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<Activity size={18}/>} label="Content Published" value="8" sub="this month · target 12" color={T.purple} delta="↑3" up/>
        <Kpi icon={<FileText size={18}/>} label="Pitch Decks Created" value="4" sub="3 converted to proposals" color={T.teal} delta="↑1" up/>
        <Kpi icon={<Star size={18}/>} label="Awards Submitted" value="1" sub="2 in progress" color={T.orange}/>
        <Kpi icon={<Zap size={18}/>} label="Events This Month" value="2" sub="1 organising · 1 attending" color={T.green}/>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all" style={{background:tab===t.id?T.purple:"#F1F5F9",color:tab===t.id?"#fff":"#475569"}}>{t.l}</button>
        ))}
      </div>

      {tab==="overview"&&(
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="font-black text-gray-900 mb-3">📱 Agency Brand — Social Media</div>
              {[
                {platform:"Instagram",handle:"@visualefx.my",followers:"4.2K",growth:"+12%",eng:"6.8%",up:true},
                {platform:"LinkedIn",handle:"Visual EFX Sdn Bhd",followers:"1.8K",growth:"+8%",eng:"4.2%",up:true},
                {platform:"TikTok",handle:"@visualefx",followers:"890",growth:"+31%",eng:"9.1%",up:true},
              ].map((s,i)=>(
                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{background:["#E1306C15","#0A66C215","#00000015"][i]}}>
                    {["📸","💼","🎵"][i]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-gray-900">{s.platform}</div>
                    <div className="text-xs text-gray-400">{s.handle}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-gray-900">{s.followers}</div>
                    <div className="text-xs text-green-600 font-semibold">{s.growth} this month</div>
                  </div>
                  <div className="text-right w-16">
                    <div className="text-xs text-gray-400">Eng. rate</div>
                    <div className="text-xs font-bold text-gray-700">{s.eng}</div>
                  </div>
                </div>
              ))}
            </Card>
            <Card className="p-4">
              <div className="font-black text-gray-900 mb-3">📅 This Month at a Glance</div>
              <div className="flex flex-col gap-2">
                {[
                  {icon:"✅",t:"8 of 12 content pieces published",c:"green"},
                  {icon:"🎯",t:"3 pitch decks sent — 2 converted to proposals",c:"purple"},
                  {icon:"🏆",t:"MARKies submission in progress — due Jun 30",c:"amber"},
                  {icon:"📍",t:"Client dinner for AEON BIG — organising",c:"teal"},
                  {icon:"🎬",t:"Behind-the-scenes Reel for KK Mart — Draft",c:"orange"},
                  {icon:"📊",t:"Q2 industry report — planned for May 28",c:"blue"},
                ].map((a,i)=>(
                  <div key={i} className={`flex items-start gap-2 px-3 py-2 rounded-xl text-xs ${a.c==="green"?"bg-green-50":a.c==="amber"?"bg-amber-50":a.c==="purple"?"bg-purple-50":a.c==="teal"?"bg-teal-50":a.c==="orange"?"bg-orange-50":"bg-blue-50"}`}>
                    <span className="flex-shrink-0">{a.icon}</span>
                    <span className="text-gray-700">{a.t}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab==="content"&&(
        <Card>
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div>
              <div className="font-black text-gray-900">Content Calendar</div>
              <div className="text-xs text-gray-400">May 2026 · Target: 12 pieces</div>
            </div>
            <button onClick={()=>setNewContent(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white font-bold" style={{background:T.purple}}><Plus size={13}/>Add Content</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-gray-100">{["Platform","Title","Category","Status","Date","Reach","Engagement"].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase whitespace-nowrap">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-gray-50">
                {contentCal.map((c,i)=>(
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">{c.type}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 max-w-xs truncate">{c.title}</td>
                    <td className="px-4 py-3"><Bdg t={c.cat} c={c.cat==="Case Study"?"green":c.cat==="Thought Leadership"?"purple":"gray"}/></td>
                    <td className="px-4 py-3"><Bdg t={c.status} c={c.status==="Published"?"green":c.status==="Scheduled"?"teal":c.status==="Draft"?"amber":"gray"}/></td>
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{c.date}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-gray-700">{c.reach}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-gray-700">{c.eng}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab==="pitch"&&(
        <Card>
          <div className="p-4 border-b border-gray-100 font-black text-gray-900">Pitch & Sales Support</div>
          <div className="divide-y divide-gray-50">
            {pitchSupport.map((p,i)=>(
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center text-sm font-black text-purple-600 flex-shrink-0">{p.client.slice(0,2)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-gray-900">{p.client}</div>
                  <div className="text-xs text-gray-500">{p.deliverable}</div>
                </div>
                <div className="text-xs text-gray-400 flex-shrink-0">By {p.doneBy}</div>
                <Bdg t={p.status} c={p.status==="Done"?"green":p.status==="In Progress"?"teal":"gray"}/>
                {p.helpedClose&&<Bdg t="Converted ✓" c="purple"/>}
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab==="awards"&&(
        <div className="flex flex-col gap-3">
          {awards.map((a,i)=>(
            <Card key={i} className="p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="font-bold text-gray-900">{a.event}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{a.category} · {a.client}</div>
                </div>
                <Bdg t={a.status} c={a.status==="In Progress"?"teal":a.status==="Not Started"?"gray":"blue"}/>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-red-500 font-semibold">📅 Deadline: {a.deadline}</div>
                <div className="flex items-center gap-2"><span className="text-xs text-gray-400">AI Fit Score:</span><span className="text-sm font-black" style={{color:a.fit>=80?T.green:T.amber}}>{a.fit}%</span></div>
              </div>
            </Card>
          ))}
          <button className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-purple-300 hover:text-purple-500 text-sm font-semibold"><Plus size={14}/>Track New Award</button>
        </div>
      )}

      {tab==="events"&&(
        <div className="flex flex-col gap-3">
          {events.map((e,i)=>(
            <Card key={i} className="p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{background:e.type==="Industry"?"#EDE9FE":e.type==="Client"?"#DCFCE7":"#FEF3C7"}}>
                {e.type==="Industry"?"🎪":e.type==="Client"?"🤝":"🎬"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-gray-900">{e.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">📅 {e.date} · 📍 {e.loc}</div>
                <div className="mt-1.5 flex gap-2"><Bdg t={e.type} c={e.type==="Industry"?"purple":e.type==="Client"?"green":"amber"}/><Bdg t={e.status} c="teal"/></div>
              </div>
            </Card>
          ))}
          <button className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-purple-300 hover:text-purple-500 text-sm font-semibold"><Plus size={14}/>Add Event</button>
        </div>
      )}
    </div>
  );
}

// ─── ROLE-SPECIFIC DASHBOARD SECTIONS ────────────────────────────
function SalesDashboard({go,name,noTarget=false}){
  const [done,setDone]=useState([false,false,false,false]);
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        {noTarget?(
          <>
            <Kpi icon={<FileText size={18}/>} label="Proposals Supported" value="6" sub="this month" color={T.teal}/>
            <Kpi icon={<CheckCircle size={18}/>} label="Tasks Done Today" value="4/7" color={T.green} sub="3 remaining"/>
          </>
        ):(
          <>
            <Kpi icon={<Target size={18}/>} label="Target This Month" value="65%" color={T.purple} sub="RM 552K of RM 850K" delta="↑8%" up/>
            <Kpi icon={<Activity size={18}/>} label="Pipeline Value" value="RM 620K" color={T.teal} delta="↑14%" up sub="active deals"/>
          </>
        )}
        <Kpi icon={<Users size={18}/>} label="New Leads" value="8" sub="this week" color={T.orange} delta="↑3" up/>
        <Kpi icon={<Send size={18}/>} label="Proposals Sent" value="5" sub="2 awaiting response" color={T.green}/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3"><span className="font-black text-gray-900">Today's Follow-Ups</span><span className="text-xs text-gray-400">{done.filter(Boolean).length}/4</span></div>
          {[{co:"AEON BIG",contact:"Andrew Lim",type:"Pricing discussion",time:"9AM",hot:true},{co:"MYDIN",contact:"Ravi Pillai",type:"Proposal review",time:"11AM",hot:true},{co:"KK Mart",contact:"Siti Khadijah",type:"Demo prep",time:"2PM",hot:false},{co:"Jaya Grocer",contact:"Team",type:"Send revised proposal",time:"4PM",hot:false}].map((t,i)=>(
            <div key={i} onClick={()=>setDone(d=>{const n=[...d];n[i]=!n[i];return n;})} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0 cursor-pointer group">
              {done[i]?<CheckCircle size={14} className="text-green-500 flex-shrink-0"/>:<Circle size={14} className="text-gray-200 group-hover:text-purple-400 flex-shrink-0"/>}
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-semibold ${done[i]?"line-through text-gray-300":"text-gray-800"}`}>{t.co} — {t.contact}</div>
                <div className="text-xs text-gray-400">{t.type}</div>
              </div>
              {t.hot&&<Bdg t="Hot 🔥" c="orange"/>}
              <div className="text-xs text-gray-400 flex-shrink-0">{t.time}</div>
            </div>
          ))}
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3"><span className="font-black text-gray-900">Proposals Awaiting Response</span><button onClick={()=>go("proposals")} className="text-xs text-purple-600 font-semibold">View all →</button></div>
          {[{co:"AEON BIG",val:"RM 280K",sent:"May 7",viewed:"Viewed May 8",days:3,action:"Follow up now"},{co:"KK Mart",val:"RM 160K",sent:"May 5",viewed:"Not viewed",days:5,action:"Resend + call"},{co:"MYDIN",val:"RM 210K",sent:"May 6",viewed:"Opened May 6",days:4,action:"Check status"}].map((p,i)=>(
            <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
              <Av i={p.co.slice(0,2)} c={COLORS[i]} s={28}/>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800">{p.co} · {p.val}</div>
                <div className="text-xs text-gray-400">{p.viewed} · {p.days} days ago</div>
              </div>
              <button className="text-xs font-bold text-purple-600 whitespace-nowrap">{p.action}</button>
            </div>
          ))}
        </Card>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[{l:"Add Lead",icon:"👤",id:"leads",c:T.purple},{l:"Send Proposal",icon:"📋",id:"proposals",c:T.teal},{l:"Update Pipeline",icon:"📊",id:"pipeline",c:T.orange}].map(a=>(
          <button key={a.l} onClick={()=>go(a.id)} className="flex flex-col items-center gap-1.5 py-3 rounded-xl text-white font-bold text-xs" style={{background:a.c}}><span className="text-base">{a.icon}</span>{a.l}</button>
        ))}
      </div>
    </div>
  );
}

function MichelleDashboard({go}){
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi icon={<DollarSign size={18}/>} label="Team Revenue MTD" value="RM 1.61M" delta="↑14%" up color={T.purple} sub="Sales + Channel + Mktg"/>
        <Kpi icon={<Target size={18}/>} label="Team Target" value="72%" color={T.teal} delta="↑7pp" up sub="combined achievement"/>
        <Kpi icon={<Activity size={18}/>} label="Active Proposals" value="14" color={T.orange} sub="across all teams"/>
        <Kpi icon={<CheckCircle size={18}/>} label="Win Rate" value="38%" color={T.green} delta="↑5pp" up sub="this month"/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{dept:"Sales",lead:"Natasha",target:65,revenue:"RM 620K",proposals:8,color:T.purple},{dept:"Channel",lead:"Shazia",target:78,revenue:"RM 720K",proposals:4,color:T.orange},{dept:"Marketing",lead:"Yash",target:70,revenue:"Supporting",proposals:3,color:T.teal}].map((d,i)=>(
          <Card key={i} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="font-black text-gray-900">{d.dept}</div>
              <Av i={d.lead.slice(0,2)} c={d.color} s={26}/>
            </div>
            <div className="text-2xl font-black text-gray-900 mb-1">{d.revenue}</div>
            <div className="text-xs text-gray-500 mb-2">Lead: {d.lead} · {d.proposals} proposals</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div style={{width:d.target+"%",background:d.color,height:"100%",borderRadius:9}}/>
              </div>
              <span className="text-xs font-bold" style={{color:d.color}}>{d.target}%</span>
            </div>
          </Card>
        ))}
      </div>
      <Card className="p-4">
        <div className="font-black text-gray-900 mb-3">⚠️ Needs Your Attention</div>
        {[{t:"Win rate 38% — below 45% target. Review pitch approach.",c:"amber"},{t:"AEON BIG proposal not approved after 5 days — Natasha to follow up.",c:"orange"},{t:"MYDIN not viewed proposal — Channel team to check.",c:"blue"}].map((a,i)=>(
          <div key={i} className={`flex items-start gap-2 p-3 rounded-xl mb-2 ${a.c==="amber"?"bg-amber-50 border border-amber-100":a.c==="orange"?"bg-orange-50 border border-orange-100":"bg-blue-50 border border-blue-100"}`}>
            <AlertTriangle size={13} className={`flex-shrink-0 mt-0.5 ${a.c==="amber"?"text-amber-500":a.c==="orange"?"text-orange-500":"text-blue-500"}`}/>
            <span className="text-xs text-gray-700">{a.t}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

function ChannelDashboard({go,isHOD=false,name="Shazia"}){
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Kpi icon={<Zap size={18}/>} label="Active Campaigns" value={isHOD?"8":"3"} color={T.purple} sub={isHOD?"team total":"assigned to me"}/>
        <Kpi icon={<AlertTriangle size={18}/>} label="DBP Pending" value="2" color={T.red} sub="submit before in-charge"/>
        <Kpi icon={<CheckCircle size={18}/>} label="Artwork Uploaded" value="5/8" color={T.teal} sub="3 pending upload"/>
        <Kpi icon={<Clock size={18}/>} label="Deadlines This Week" value="3" color={T.orange} sub="urgent"/>
      </div>
      <Card className="p-4">
        <div className="font-black text-gray-900 mb-3">🗓️ {isHOD?"Team Campaign Status":"My Campaigns"}</div>
        {[{camp:"AEON BIG Raya 2026",incharge:"Jun 1",dbp:"✅ Submitted",artwork:"✅ Uploaded",status:"Live"},{camp:"MYDIN Mid-Year Sale",incharge:"Jun 5",dbp:"⚠️ Due May 22",artwork:"⏳ Pending",status:"At Risk"},{camp:"KK Mart Launch",incharge:"Jun 10",dbp:"⬜ Not Started",artwork:"⬜ Not Started",status:"In Progress"}].map((c,i)=>(
          <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-800">{c.camp}</div>
              <div className="text-xs text-gray-400">In-charge: {c.incharge}</div>
            </div>
            <div className="text-xs text-gray-600 hidden md:block">{c.dbp}</div>
            <div className="text-xs text-gray-600 hidden md:block">{c.artwork}</div>
            <Bdg t={c.status} c={c.status==="Live"?"green":c.status==="At Risk"?"red":"blue"}/>
          </div>
        ))}
        <button onClick={()=>go("execution")} className="mt-3 text-xs text-purple-600 font-semibold">View full execution tracker →</button>
      </Card>
      {isHOD&&(
        <Card className="p-4">
          <div className="font-black text-gray-900 mb-3">👥 Team Workload</div>
          {[{n:"Shazia",campaigns:4,hrs:38,cap:40},{n:"Mei Yin",campaigns:2,hrs:28,cap:40},{n:"Nicole",campaigns:2,hrs:25,cap:40}].map((p,i)=>(
            <div key={i} className="flex items-center gap-3 mb-2">
              <Av i={p.n.slice(0,2)} c={COLORS[i+2]} s={26}/>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1"><span className="text-xs font-semibold text-gray-700">{p.n}</span><span className="text-xs text-gray-400">{p.hrs}/{p.cap}hrs</span></div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"><div style={{width:(p.hrs/p.cap*100)+"%",background:p.hrs/p.cap>0.9?T.red:T.green,height:"100%",borderRadius:9}}/></div>
              </div>
              <span className="text-xs text-gray-400">{p.campaigns} campaigns</span>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

function MarketingDashboard({go}){
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Kpi icon={<Activity size={18}/>} label="Content Published" value="8/12" sub="target for May" color={T.purple} delta="↑3" up/>
        <Kpi icon={<Star size={18}/>} label="Awards in Pipeline" value="3" sub="1 in progress" color={T.orange}/>
        <Kpi icon={<FileText size={18}/>} label="Pitch Decks Created" value="4" sub="3 helped close" color={T.teal} delta="↑1" up/>
        <Kpi icon={<Zap size={18}/>} label="Events This Month" value="2" sub="1 organising" color={T.green}/>
      </div>
      <Card className="p-4">
        <div className="font-black text-gray-900 mb-3">📅 Content This Week</div>
        {[{title:"KK Mart BTS — Instagram",due:"Today",status:"Draft",type:"BTS"},{title:"Q2 Industry Report — LinkedIn",due:"May 20",status:"In Progress",type:"Report"},{title:"DOOH vs Print article",due:"May 22",status:"Planned",type:"Thought Leadership"}].map((c,i)=>(
          <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
            <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-gray-800 truncate">{c.title}</div><div className="text-xs text-gray-400">{c.type} · Due {c.due}</div></div>
            <Bdg t={c.status} c={c.status==="Draft"?"amber":c.status==="In Progress"?"teal":"gray"}/>
          </div>
        ))}
        <button onClick={()=>go("marketing")} className="mt-3 text-xs text-purple-600 font-semibold">View full content calendar →</button>
      </Card>
      <div className="grid grid-cols-2 gap-3">
        {[{l:"Add Content",icon:"✍️",c:T.purple},{l:"Track Award",icon:"🏆",c:T.orange},{l:"Add Event",icon:"📍",c:T.teal},{l:"Create Deck",icon:"📊",c:T.green}].map(a=>(
          <button key={a.l} onClick={()=>go("marketing")} className="flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm" style={{background:a.c}}>{a.icon} {a.l}</button>
        ))}
      </div>
    </div>
  );
}

function OperationsDashboard({go}){
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Kpi icon={<CheckCircle size={18}/>} label="Depts On Track" value="5/7" color={T.green} sub="2 need attention"/>
        <Kpi icon={<AlertTriangle size={18}/>} label="Escalations" value="2" color={T.red} sub="need your decision"/>
        <Kpi icon={<Activity size={18}/>} label="Active POs" value="12" color={T.purple} sub="Commercial team"/>
        <Kpi icon={<DollarSign size={18}/>} label="Avg Net to VR" value="33.4%" color={T.teal} sub="this month"/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="font-black text-gray-900 mb-3">🏢 Department Health</div>
          {[{dept:"Sales",status:"On Track",detail:"65% target achieved",c:"green"},{dept:"Channel",status:"At Risk",detail:"MYDIN DBP overdue",c:"red"},{dept:"Commercial",status:"On Track",detail:"Avg 33.4% Net to VR",c:"green"},{dept:"Creative",status:"Watch",detail:"Nazri at 92% capacity",c:"amber"},{dept:"Finance",status:"On Track",detail:"AutoCount synced today",c:"green"}].map((d,i)=>(
            <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${d.c==="green"?"bg-green-500":d.c==="red"?"bg-red-500":"bg-amber-500"}`}/>
              <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-gray-800">{d.dept}</div><div className="text-xs text-gray-400">{d.detail}</div></div>
              <Bdg t={d.status} c={d.c==="green"?"green":d.c==="red"?"red":"amber"}/>
            </div>
          ))}
        </Card>
        <Card className="p-4">
          <div className="font-black text-gray-900 mb-3">⚠️ Escalations for You</div>
          {[{t:"MYDIN campaign — DBP not submitted, 14 days to in-charge",dept:"Channel",urgency:"High"},{t:"KK Mart artwork spec failed validation — Creative to redo",dept:"Creative",urgency:"Medium"}].map((e,i)=>(
            <div key={i} className={`p-3 rounded-xl mb-2 ${e.urgency==="High"?"bg-red-50 border border-red-100":"bg-amber-50 border border-amber-100"}`}>
              <div className="flex items-center gap-2 mb-1"><Bdg t={e.dept} c="purple"/><Bdg t={e.urgency} c={e.urgency==="High"?"red":"amber"}/></div>
              <div className="text-xs text-gray-700">{e.t}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function CommercialDashboard({go,isHOD=false,noPricing=false}){
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Kpi icon={<ShoppingCart size={18}/>} label="POs to Raise" value="3" color={T.purple} sub="MO signed"/>
        <Kpi icon={<Package size={18}/>} label="Sites to Confirm" value="5" color={T.teal} sub="pending MO reply"/>
        {!noPricing&&<Kpi icon={<DollarSign size={18}/>} label="Avg Net to VR" value="33.4%" color={T.green} sub="this month" delta="↑1.2pp" up/>}
        {noPricing&&<Kpi icon={<CheckCircle size={18}/>} label="Tasks Done" value="6/10" color={T.green} sub="today"/>}
        {isHOD&&<Kpi icon={<AlertTriangle size={18}/>} label="Special Approvals" value="1" color={T.red} sub="below 30% Net to VR"/>}
        {!isHOD&&<Kpi icon={<Clock size={18}/>} label="Docs Pending" value="2" color={T.orange} sub="to process"/>}
      </div>
      <Card className="p-4">
        <div className="font-black text-gray-900 mb-3">{noPricing?"📋 Today's Tasks":"🛒 POs — Priority Queue"}</div>
        {noPricing?(
          [{t:"Deliver printed materials — MYDIN Shah Alam",done:false},{t:"Collect signed documents from Big Tree",done:false},{t:"File completed POs from last week",done:true}].map((t,i)=>(
            <div key={i} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0">
              {t.done?<CheckCircle size={14} className="text-green-500"/>:<Circle size={14} className="text-gray-200"/>}
              <span className={`text-sm ${t.done?"line-through text-gray-300":"text-gray-700"}`}>{t.t}</span>
            </div>
          ))
        ):(
          [{ref:"PO-041",site:"VR0315 · Bukit Bintang",mo:"MO signed ✅",net:"33.3%",status:"Ready to raise"},{ref:"PO-042",site:"VR0707 · Sprint Hwy",mo:"MO signed ✅",net:"34.2%",status:"Ready to raise"},{ref:"PO-043",site:"VR2903 · LDP Kelana",mo:"⚠️ Net 25.9%",net:"25.9%",status:"Approval needed"}].map((p,i)=>(
            <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
              <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-gray-800">{p.site}</div><div className="text-xs text-gray-400">{p.ref} · MO: {p.mo}</div></div>
              {!noPricing&&<span className="text-xs font-black" style={{color:parseFloat(p.net)>=30?T.green:T.red}}>{p.net}</span>}
              <Bdg t={p.status} c={p.status==="Ready to raise"?"green":"red"}/>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}

function CreativeDashboard({go,isHOD=false,name="Aliff"}){
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Kpi icon={<Palette size={18}/>} label={isHOD?"Active Briefs":"My Jobs"} value="8" color={T.purple} sub="artwork in progress"/>
        <Kpi icon={<AlertTriangle size={18}/>} label="Due This Week" value="3" color={T.red} sub="urgent"/>
        <Kpi icon={<CheckCircle size={18}/>} label="Completed" value="5" color={T.green} sub="this month" delta="↑2" up/>
        <Kpi icon={<Activity size={18}/>} label="Revision Rounds" value="2.1" sub="avg per project" color={T.amber}/>
      </div>
      <Card className="p-4">
        <div className="font-black text-gray-900 mb-3">🎨 Active Artwork Jobs</div>
        {[{camp:"AEON BIG Raya 2026",site:"VR0315 · Bukit Bintang",due:"May 28",spec:"768×384px JPEG",status:"In Progress",assignee:isHOD?"Nazri":"Me"},{camp:"MYDIN Mid-Year",site:"VR0707 · Sprint Hwy",due:"May 30",spec:"960×672px JPEG",status:"Not Started",assignee:isHOD?"Shariff":"Me"},{camp:"KK Mart Launch",site:"VR0914 · TTDI",due:"Jun 5",spec:"384×576px JPEG",status:"Done ✅",assignee:isHOD?"Nazri":"Me"}].map((j,i)=>(
          <div key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-800">{j.camp}</div>
              <div className="text-xs text-gray-400">{j.site} · {j.spec}</div>
              {isHOD&&<div className="text-xs text-purple-600 font-semibold mt-0.5">→ {j.assignee}</div>}
            </div>
            <div className="text-xs text-gray-400 flex-shrink-0">📅 {j.due}</div>
            <Bdg t={j.status} c={j.status==="Done ✅"?"green":j.status==="In Progress"?"teal":"gray"}/>
          </div>
        ))}
        <button onClick={()=>go("creative")} className="mt-3 text-xs text-purple-600 font-semibold">View full artwork tracker →</button>
      </Card>
      {isHOD&&(
        <Card className="p-4">
          <div className="font-black text-gray-900 mb-3">👥 Creative Team Capacity</div>
          {[{n:"Nazri",jobs:4,hrs:38,cap:40},{n:"Shariff",jobs:3,hrs:31,cap:40}].map((p,i)=>(
            <div key={i} className="flex items-center gap-3 mb-2">
              <Av i={p.n.slice(0,2)} c={COLORS[i+3]} s={26}/>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1"><span className="text-xs font-semibold">{p.n}</span><span className="text-xs text-gray-400">{p.hrs}/{p.cap}hrs · {p.jobs} jobs</span></div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"><div style={{width:(p.hrs/p.cap*100)+"%",background:p.hrs/p.cap>0.9?T.red:T.green,height:"100%",borderRadius:9}}/></div>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

function FinanceDashboard2({go,isHOD=false}){
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Kpi icon={<AlertTriangle size={18}/>} label="Outstanding AR" value="RM 325K" color={T.red} sub="3 clients overdue"/>
        <Kpi icon={<Receipt size={18}/>} label="Invoices Pending" value="4" color={T.orange} sub="to process today"/>
        <Kpi icon={<CheckCircle size={18}/>} label="3-Way Match" value="3 passed" color={T.green} sub="1 needs review"/>
        <Kpi icon={<RefreshCw size={18}/>} label="AutoCount Sync" value="Today 8AM" color={T.teal} sub="all up to date"/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="font-black text-gray-900 mb-3">💳 Collection Priority</div>
          {[{client:"AEON BIG",amount:"RM 230K",days:30,status:"Overdue",action:"Director call"},{client:"KK Mart",amount:"RM 95K",days:14,status:"Due Soon",action:"Send reminder"},{client:"Jaya Grocer",amount:"RM 0",days:0,status:"Paid ✅",action:"Done"}].map((c,i)=>(
            <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
              <Av i={c.client.slice(0,2)} c={COLORS[i]} s={26}/>
              <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-gray-800">{c.client}</div><div className="text-xs text-gray-400">{c.amount} · {c.days>0?`${c.days} days`:""}</div></div>
              <div className="text-right"><Bdg t={c.status} c={c.status==="Overdue"?"red":c.status==="Paid ✅"?"green":"amber"}/></div>
            </div>
          ))}
        </Card>
        <Card className="p-4">
          <div className="font-black text-gray-900 mb-3">🧾 Today's Finance Tasks</div>
          {[{t:"Review Citylites invoice — RM1,200 variance",urgent:true},{t:"Process 3 matched supplier invoices to AutoCount",urgent:false},{t:`${isHOD?"Approve":"Process"} Aliff's expense claim — RM450`,urgent:false},{t:"Send payment advice to Big Tree (PO-041)",urgent:false}].map((t,i)=>(
            <div key={i} className={`flex items-start gap-2 p-2.5 rounded-xl mb-2 ${t.urgent?"bg-red-50 border border-red-100":"bg-gray-50"}`}>
              <span className="text-sm flex-shrink-0">{t.urgent?"🔴":"⬜"}</span>
              <span className="text-xs text-gray-700">{t.t}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function DriverDashboard({go}){
  return(
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Kpi icon={<Zap size={18}/>} label="Runs Today" value="4" color={T.purple} sub="2 completed"/>
        <Kpi icon={<Clock size={18}/>} label="Mileage Today" value="87 km" color={T.teal} sub="log before 6PM"/>
      </div>
      <Card className="p-4">
        <div className="font-black text-gray-900 mb-3">🚗 Today's Schedule</div>
        {[{time:"9AM",task:"Send documents to Big Tree — Bangsar South",done:true},{time:"11AM",task:"Collect signed MO from AEON BIG HQ — Shah Alam",done:true},{time:"2PM",task:"Deliver materials — Printer, Puchong",done:false},{time:"4PM",task:"Pick up Shazia from site visit — LDP Kelana Jaya",done:false}].map((r,i)=>(
          <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
            <div className="w-12 text-xs font-bold text-gray-400 flex-shrink-0">{r.time}</div>
            <span className="text-sm flex-1 text-gray-700" style={{textDecoration:r.done?"line-through":"none",color:r.done?"#9CA3AF":""}}>{r.task}</span>
            {r.done&&<CheckCircle size={14} className="text-green-500 flex-shrink-0"/>}
          </div>
        ))}
      </Card>
      <button onClick={()=>go("hr")} className="w-full py-3 rounded-xl text-white font-bold" style={{background:T.purple}}>📋 Submit Mileage Claim</button>
    </div>
  );
}


// ─── STAFF PROFILES & GREETINGS ─────────────────────────────────
const STAFF_PROFILES = {
  sai:      { name:"Sai",      dept:"Owner",          color:"#0C1F3F", avatar:"SA", 
              greeting:"When Sai asks 'quick update?', the whole system starts preparing evidence.",
              quote:"The whole company runs so Sai can ask better questions.",
              canSeeSupplierCost:true,  noPricing:false, driverOnly:false, noTarget:false },
  michelle: { name:"Michelle", dept:"Top Management", color:"#6D28D9", avatar:"ML",
              greeting:"Good morning, Michelle. Sales, Channel, and Marketing are all under your radar today.",
              quote:"Michelle's morning briefing is basically a board meeting in 15 minutes.",
              canSeeSupplierCost:false, noPricing:false, driverOnly:false, noTarget:false },
  natasha:  { name:"Natasha",  dept:"Sales",          color:"#0D9488", avatar:"NT",
              greeting:"Good morning, Natasha. Time to turn follow-ups into closed deals.",
              quote:"Targets are just numbers until Natasha starts negotiating.",
              canSeeSupplierCost:false, noPricing:false, driverOnly:false, noTarget:false },
  karan:    { name:"Karan",    dept:"Sales",          color:"#0D9488", avatar:"KR",
              greeting:"Good morning, Karan. Your pipeline won't close itself — let's move.",
              quote:"Karan treats every lead like it's the last deal of the quarter.",
              canSeeSupplierCost:false, noPricing:false, driverOnly:false, noTarget:false },
  azrina:   { name:"Azrina",   dept:"Sales Support",  color:"#0891B2", avatar:"AZ",
              greeting:"Good morning, Azrina. The team runs smoother because you're here.",
              quote:"No target, still somehow solving everyone's problem.",
              canSeeSupplierCost:false, noPricing:false, driverOnly:false, noTarget:true  },
  shazia:   { name:"Shazia",   dept:"Channel HOD",    color:"#EA580C", avatar:"SZ",
              greeting:"Good morning, Shazia. Let's keep the sites moving and the media network aligned.",
              quote:"Shazia doesn't chase sites. Sites emotionally prepare for Shazia.",
              canSeeSupplierCost:false, noPricing:false, driverOnly:false, noTarget:false },
  meiyin:   { name:"Mei Yin",  dept:"Channel",        color:"#EA580C", avatar:"MY",
              greeting:"Good morning, Mei Yin. Sites need confirming, vendors need chasing.",
              quote:"Mei Yin tracks 20 sites and still replies the fastest.",
              canSeeSupplierCost:false, noPricing:false, driverOnly:false, noTarget:false },
  nicole:   { name:"Nicole",   dept:"Channel",        color:"#EA580C", avatar:"NC",
              greeting:"Good morning, Nicole. Your checklist is ready — let's execute.",
              quote:"Nicole's execution checklist is the reason deadlines exist.",
              canSeeSupplierCost:false, noPricing:false, driverOnly:false, noTarget:false },
  yash:     { name:"Yash",     dept:"Marketing",      color:"#7C3AED", avatar:"YS",
              greeting:"Good morning, Yash. Campaign visibility starts with one sharp idea.",
              quote:"Yash turns one campaign idea into ten slides and one visibility strategy.",
              canSeeSupplierCost:false, noPricing:false, driverOnly:false, noTarget:false },
  kavita:   { name:"Kavita",   dept:"Operations",     color:"#DC2626", avatar:"KV",
              greeting:"Good morning, Kavita. Let's turn today's chaos into a proper action plan.",
              quote:"Kavita's department: where chaos goes to get a schedule.",
              canSeeSupplierCost:true,  noPricing:false, driverOnly:false, noTarget:false },
  mahen:    { name:"Mahen",    dept:"Commercial HOD", color:"#D97706", avatar:"MH",
              greeting:"Good morning, Mahen. Pricing, proposals, and protection mode are now online.",
              quote:"Mahen protects pricing like it's national security.",
              canSeeSupplierCost:true,  noPricing:false, driverOnly:false, noTarget:false },
  najwa:    { name:"Najwa",    dept:"Commercial",     color:"#D97706", avatar:"NJ",
              greeting:"Good morning, Najwa. Vendors are waiting, POs need moving.",
              quote:"Najwa makes sure every PO is airtight before it leaves the building.",
              canSeeSupplierCost:false, noPricing:false, driverOnly:false, noTarget:false },
  apit:     { name:"Apit",     dept:"Commercial",     color:"#B45309", avatar:"AP",
              greeting:"Good morning, Apit. Plenty to support today — let's go.",
              quote:"Apit can help with everything except pricing. Pricing is a forbidden kingdom.",
              canSeeSupplierCost:false, noPricing:true,  driverOnly:false, noTarget:false },
  aliff:    { name:"Aliff",    dept:"Creative HOD",   color:"#16A34A", avatar:"AL",
              greeting:"Good morning, Aliff. May today's revisions be fewer than yesterday's.",
              quote:"Aliff's team can survive deadlines, revisions, and 'just make it pop'.",
              canSeeSupplierCost:false, noPricing:false, driverOnly:false, noTarget:false },
  nazri:    { name:"Nazri",    dept:"Creative",       color:"#16A34A", avatar:"NZ",
              greeting:"Good morning, Nazri. The artwork needs you and so does Aliff.",
              quote:"Nazri can redesign anything — except the client's taste.",
              canSeeSupplierCost:false, noPricing:false, driverOnly:false, noTarget:false },
  shariff:  { name:"Shariff",  dept:"Creative",       color:"#16A34A", avatar:"SF",
              greeting:"Good morning, Shariff. Let's make something today that doesn't need three revisions.",
              quote:"Shariff's best work always happens 10 minutes before the deadline.",
              canSeeSupplierCost:false, noPricing:false, driverOnly:false, noTarget:false },
  phylicia: { name:"Phylicia", dept:"Finance HOD",    color:"#2563EB", avatar:"PH",
              greeting:"Good morning, Phylicia. Numbers, claims, and payment reality checks await.",
              quote:"Phylicia doesn't reject claims. She gently introduces them to reality.",
              canSeeSupplierCost:true,  noPricing:false, driverOnly:false, noTarget:false },
  nik:      { name:"Nik",      dept:"Finance",        color:"#2563EB", avatar:"NK",
              greeting:"Good morning, Nik. The ledger needs balancing and the invoices need love.",
              quote:"Nik reconciles AutoCount faster than most people open Excel.",
              canSeeSupplierCost:true,  noPricing:false, driverOnly:false, noTarget:false },
  nazreey:  { name:"Nazreey",  dept:"Driver / HRA",   color:"#6B7280", avatar:"NR",
              greeting:"Good morning, Nazreey. Ready for the day's runs and admin.",
              quote:"Nazreey moves people, documents, and sometimes the entire day's timeline.",
              canSeeSupplierCost:false, noPricing:true,  driverOnly:true,  noTarget:false },
};

// Screen access per role type
const ROLE_SCREENS = {
  owner:          ["owner","dashboard","leads","brief","proposals","pipeline","inventory","orders","creative","execution","timetracker","invoicing","finance","collection","reports","hr"],
  michelle:       ["dashboard","leads","brief","proposals","pipeline","creative","execution","reports","hr"],
  sales:          ["dashboard","leads","brief","proposals","pipeline","orders","timetracker","reports","hr"],
  sales_support:  ["dashboard","leads","proposals","timetracker","hr"],
  channel_hod:    ["dashboard","leads","brief","proposals","pipeline","creative","execution","timetracker","reports","hr"],
  channel:        ["dashboard","brief","proposals","pipeline","creative","execution","timetracker","hr"],
  marketing:      ["dashboard","brief","proposals","creative","execution","timetracker","reports","hr"],
  operations:     ["dashboard","leads","brief","proposals","pipeline","inventory","orders","creative","execution","timetracker","invoicing","finance","collection","reports","hr"],
  commercial_hod: ["dashboard","leads","inventory","orders","pipeline","timetracker","reports","hr"],
  commercial:     ["dashboard","inventory","orders","timetracker","hr"],
  commercial_gw:  ["dashboard","timetracker","hr"],
  creative_hod:   ["dashboard","proposals","creative","execution","timetracker","hr"],
  creative:       ["dashboard","creative","execution","timetracker","hr"],
  finance_hod:    ["dashboard","invoicing","finance","collection","reports","timetracker","hr"],
  finance:        ["dashboard","invoicing","finance","collection","timetracker","hr"],
  driver_hra:     ["hr"],
};

const STAFF_ROLE_MAP = {
  sai:"owner", michelle:"michelle",
  natasha:"sales", karan:"sales", azrina:"sales_support",
  shazia:"channel_hod", meiyin:"channel", nicole:"channel",
  yash:"marketing",
  kavita:"operations",
  mahen:"commercial_hod", najwa:"commercial", apit:"commercial_gw",
  aliff:"creative_hod", nazri:"creative", shariff:"creative",
  phylicia:"finance_hod", nik:"finance", nazreey:"driver_hra",
};

const DEPT_GROUPS_STAFF = [
  { dept:"Owner",          color:"#0C1F3F", staff:["sai"] },
  { dept:"Top Management", color:"#6D28D9", staff:["michelle"] },
  { dept:"Sales",          color:"#0D9488", staff:["natasha","karan","azrina"] },
  { dept:"Channel",        color:"#EA580C", staff:["shazia","meiyin","nicole"] },
  { dept:"Marketing",      color:"#7C3AED", staff:["yash"] },
  { dept:"Operations",     color:"#DC2626", staff:["kavita"] },
  { dept:"Commercial",     color:"#D97706", staff:["mahen","najwa","apit"] },
  { dept:"Creative",       color:"#16A34A", staff:["aliff","nazri","shariff"] },
  { dept:"Finance",        color:"#2563EB", staff:["phylicia","nik","nazreey"] },
];

// ─── SCREEN: HR HUB ───────────────────────────────────────────────
function HRHub({staffKey="natasha"}){
  const [tab,setTab]=useState("dashboard");
  const [wishModal,setWishModal]=useState(false);
  const [wishInput,setWishInput]=useState("");
  const [wishCat,setWishCat]=useState("Office");
  const [wishes,setWishes]=useState([
    {id:1,text:"Standing desk option for creative team",cat:"Office",votes:7,voted:false,by:"Aliff",dept:"Creative"},
    {id:2,text:"Figma Pro subscription for design team",cat:"Tools",votes:5,voted:false,by:"Nazri",dept:"Creative"},
    {id:3,text:"Monthly team lunch — rotating restaurant",cat:"Team",votes:9,voted:false,by:"Natasha",dept:"Sales"},
    {id:4,text:"Adobe Creative Cloud upgrade",cat:"Tools",votes:6,voted:false,by:"Shariff",dept:"Creative"},
    {id:5,text:"Presentation skills training",cat:"Training",votes:4,voted:false,by:"Yash",dept:"Marketing"},
    {id:6,text:"Friday afternoon half-day once a month",cat:"Team",votes:11,voted:false,by:"Karan",dept:"Sales"},
  ]);
  const [pantrySelections,setPantrySelections]=useState({});
  const [jobModal,setJobModal]=useState(null);
  const [applicantModal,setApplicantModal]=useState(null);
  const profile = STAFF_PROFILES[staffKey]||STAFF_PROFILES.natasha;
  const roleType = STAFF_ROLE_MAP[staffKey]||"sales";
  const isManagement = ["owner","michelle","kavita","operations","commercial_hod","finance_hod","creative_hod","channel_hod"].includes(staffKey)||["owner","michelle","kavita","operations","commercial_hod","finance_hod","creative_hod","channel_hod"].includes(roleType);
  const pantryBudget = 50;
  const pantrySpent = Object.values(pantrySelections).reduce((a,v)=>a+v,0);

  const pantryCategories=[
    {id:"hot",label:"☕ Hot Drinks",desc:"Coffee, tea, Milo, 3-in-1, hot chocolate",price:8,unit:"per box"},
    {id:"cold",label:"🥤 Cold Drinks",desc:"Isotonic, juice, mineral water, sparkling",price:6,unit:"per pack"},
    {id:"savoury",label:"🍟 Savoury Snacks",desc:"Chips, crackers, popcorn, seaweed",price:5,unit:"per bag"},
    {id:"sweet",label:"🍪 Sweet Snacks",desc:"Biscuits, cookies, chocolate, wafers",price:5,unit:"per pack"},
    {id:"healthy",label:"🥜 Healthy Options",desc:"Mixed nuts, granola bars, dried fruits, seeds",price:7,unit:"per bag"},
    {id:"instant",label:"🍜 Instant Meals",desc:"Instant noodles, oat packets, cup soup",price:4,unit:"per pack"},
    {id:"condiments",label:"🧴 Pantry Essentials",desc:"Sugar, creamer, salt, pepper, sauces",price:5,unit:"per item"},
  ];

  const jobOpenings=[
    {id:1,title:"Head of Making Things Work",dept:"Operations",type:"Head",status:"Open",posted:"May 10",applicants:3,
     desc:"We need someone who makes chaos look like strategy. Reporting to Kavita. Must be able to turn 'urgent' into 'done'.",
     requirements:["5+ years in operations or similar chaos management","Calm under fire","Excel in Excel (literally)","Can read a room and a report"],
     candidates:[
       {name:"Ahmad Firdaus",exp:"6 years Ops Director",fit:88,summary:"Strong operations background at 2 media agencies. Managed 40-person team. Excellent process documentation.",strengths:["Cross-dept coordination","Budget management","Crisis resolution"],concerns:["Limited digital marketing exposure"],verdict:"Strong candidate — recommend interview"},
       {name:"Priya Subramaniam",exp:"4 years Senior Ops Manager",fit:76,summary:"Fast-growing startup background. Built SOPs from scratch. High energy, strong communicator.",strengths:["SOP development","Vendor management","Tech-savvy"],concerns:["Shorter tenure, may seek growth quickly"],verdict:"Good potential — culture fit interview needed"},
     ]},
    {id:2,title:"Director of Common Sense Operations",dept:"Management",type:"Director",status:"Open",posted:"May 8",applicants:2,
     desc:"Someone who can diplomatically say 'no' to bad ideas while making everyone feel heard. Reports to Sai.",
     requirements:["10+ years leadership","High EQ essential","Strategy + execution balance","Has survived at least 2 company pivots"],
     candidates:[
       {name:"Ravi Krishnamurthy",exp:"12 years GMD",fit:91,summary:"Veteran of 3 agency groups. Known for building high-performance cultures. Excellent stakeholder management.",strengths:["Strategic clarity","Team development","Calm leadership"],concerns:["May be overqualified — retention risk"],verdict:"Top candidate — fast-track interview"},
     ]},
    {id:3,title:"Automation Witch Doctor",dept:"Technology",type:"Specialist",status:"Open",posted:"May 5",applicants:5,
     desc:"You automate things normal people accept as manual forever. If you've ever built a Make.com flow that saves 10 hours/week, you're who we need.",
     requirements:["Proficient in Make.com, Zapier, or n8n","Experience with APIs and webhooks","AI tools enthusiast","Can explain tech to non-tech people without sighing"],
     candidates:[
       {name:"Lim Wei Ting",exp:"3 years Automation Engineer",fit:94,summary:"Built 50+ Make.com automations at fintech company. Also comfortable with Python and Airtable.",strengths:["Make.com expert","AI integration","Fast learner"],concerns:["No media industry experience"],verdict:"Hire immediately"},
       {name:"Kevin Raj",exp:"2 years Digital Operations",fit:79,summary:"Strong Zapier user, has automated HR and finance workflows. Good communicator.",strengths:["Non-technical stakeholder management","HubSpot CRM integration"],concerns:["Limited Make.com, more Zapier-focused"],verdict:"Good backup option"},
     ]},
    {id:4,title:"Others — Open Category",dept:"TBD",type:"Others",status:"Open",posted:"—",applicants:0,
     desc:"Future roles that don't fit the existing categories. Use this slot for emerging or ad-hoc hiring needs.",
     requirements:["TBD based on role","Will be updated when position is defined"],
     candidates:[]},
  ];

  const performanceData = {
    sai:      {billable:95,target:110,ontime:98,quality:92,ai_adoption:88,score:97},
    michelle: {billable:82,target:105,ontime:90,quality:88,ai_adoption:75,score:89},
    natasha:  {billable:78,target:95,ontime:88,quality:82,ai_adoption:71,score:83},
    karan:    {billable:72,target:82,ontime:85,quality:78,ai_adoption:65,score:77},
    azrina:   {billable:85,target:null,ontime:92,quality:89,ai_adoption:70,score:84},
    shazia:   {billable:80,target:88,ontime:91,quality:85,ai_adoption:76,score:84},
    meiyin:   {billable:75,target:79,ontime:87,quality:80,ai_adoption:68,score:78},
    nicole:   {billable:73,target:75,ontime:89,quality:81,ai_adoption:66,score:77},
    yash:     {billable:70,target:72,ontime:84,quality:83,ai_adoption:79,score:78},
    kavita:   {billable:88,target:102,ontime:94,quality:91,ai_adoption:85,score:92},
    mahen:    {billable:86,target:98,ontime:93,quality:90,ai_adoption:82,score:90},
    najwa:    {billable:74,target:80,ontime:86,quality:79,ai_adoption:67,score:77},
    apit:     {billable:65,target:null,ontime:88,quality:75,ai_adoption:55,score:71},
    aliff:    {billable:82,target:90,ontime:87,quality:93,ai_adoption:78,score:86},
    nazri:    {billable:76,target:82,ontime:85,quality:88,ai_adoption:70,score:80},
    shariff:  {billable:74,target:80,ontime:83,quality:86,ai_adoption:68,score:78},
    phylicia: {billable:89,target:96,ontime:95,quality:92,ai_adoption:84,score:91},
    nik:      {billable:82,target:88,ontime:92,quality:88,ai_adoption:78,score:86},
    nazreey:  {billable:null,target:null,ontime:94,quality:90,ai_adoption:45,score:76},
  };
  const perf = performanceData[staffKey]||performanceData.natasha;

  const tabs=[
    {id:"dashboard",l:"My Dashboard"},
    {id:"leave",l:"Leave & Claims"},
    {id:"wishlist",l:"Staff Wishlist"},
    {id:"pantry",l:"Pantry RM50"},
    ...(isManagement||["owner","michelle","kavita","aliff","phylicia"].includes(staffKey)?[{id:"jobs",l:"Job Openings"}]:[]),
  ];

  const vote=(id)=>setWishes(w=>w.map(x=>x.id===id?{...x,votes:x.voted?x.votes-1:x.votes+1,voted:!x.voted}:x));
  const addWish=()=>{if(!wishInput.trim())return;setWishes(w=>[...w,{id:Date.now(),text:wishInput,cat:wishCat,votes:0,voted:false,by:profile.name,dept:profile.dept}]);setWishInput("");setWishModal(false);};

  return(
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="rounded-2xl p-5 flex items-center gap-4" style={{background:`linear-gradient(135deg,${profile.color},${profile.color}CC)`}}>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0" style={{background:"rgba(255,255,255,0.2)"}}>{profile.avatar}</div>
        <div className="flex-1"><div className="text-white font-black text-lg">{profile.name}</div><div className="text-white/70 text-sm">{profile.dept} · HR Hub</div><div className="text-white/50 text-xs italic mt-0.5">"{profile.quote}"</div></div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all" style={{background:tab===t.id?profile.color:"#F1F5F9",color:tab===t.id?"#fff":"#475569"}}>{t.l}</button>
        ))}
      </div>

      {/* MY DASHBOARD TAB */}
      {tab==="dashboard"&&(
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {l:"Performance Score",v:`${perf.score}/100`,color:perf.score>=85?T.green:perf.score>=70?T.amber:T.red},
              {l:"Billable Rate",v:perf.billable?`${perf.billable}%`:"N/A",color:T.purple},
              {l:"On-Time Delivery",v:`${perf.ontime}%`,color:T.teal},
              {l:"AI Adoption",v:`${perf.ai_adoption}%`,color:T.orange},
            ].map((m,i)=>(
              <Card key={i} className="p-4">
                <div className="text-xl font-black" style={{color:m.color||"#0F172A"}}>{m.v}</div>
                <div className="text-xs text-gray-500 mt-1">{m.l}</div>
              </Card>
            ))}
          </div>

          {/* Performance Index */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="font-black text-gray-900">Personalised Performance Index</div>
              <div className="text-2xl font-black" style={{color:perf.score>=85?T.green:perf.score>=70?T.amber:T.red}}>{perf.score}/100</div>
            </div>
            {[
              {l:"Billable Hours %",v:perf.billable,w:25,note:"vs team target"},
              {l:"Target Achievement",v:perf.target,w:25,note:profile.noTarget?"No sales target":"vs monthly target"},
              {l:"On-Time Delivery",v:perf.ontime,w:20,note:"execution checklist"},
              {l:"Proposal Quality",v:perf.quality,w:15,note:"fewer revisions = higher score"},
              {l:"AI / Automation Adoption",v:perf.ai_adoption,w:15,note:"system usage rate"},
            ].map((m,i)=>(
              <div key={i} className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-semibold text-gray-700">{m.l} <span className="text-xs text-gray-400">({m.w}% weight)</span></div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{m.note}</span>
                    <span className="text-sm font-black" style={{color:!m.v?"#9CA3AF":m.v>=80?T.green:m.v>=60?T.amber:T.red}}>{m.v?`${m.v}%`:"N/A"}</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div style={{width:`${m.v||0}%`,background:!m.v?"#E5E7EB":m.v>=80?T.green:m.v>=60?T.amber:T.red,height:"100%",borderRadius:9,transition:"width 0.5s"}}/>
                </div>
              </div>
            ))}
          </Card>

          {/* Complaint/Feedback — Coming Soon */}
          <Card className="p-5 border-2 border-dashed border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">🔒</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-700">Feedback & Complaint — AI Triage</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">Final Rollout</span>
                </div>
                <div className="text-sm text-gray-500 leading-relaxed">Submit workplace feedback or complaints. AI classifies severity — minor cases get AI guidance, serious cases go directly to Sai with full confidentiality. Coming in the next phase.</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* LEAVE & CLAIMS TAB */}
      {tab==="leave"&&(
        <div className="flex flex-col gap-4">
          <Card className="p-5">
            <div className="font-black text-gray-900 mb-1">HRMS — AutoCount Direct Links</div>
            <div className="text-sm text-gray-500 mb-4">Opens AutoCount HR system in a new tab. Login with your staff credentials.</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {icon:"🏖️",title:"Apply Leave",desc:"Annual, medical, emergency, replacement leave",url:"#autocount-leave",color:T.teal},
                {icon:"🧾",title:"Submit Expense Claim",desc:"Business travel, meals, stationery, miscellaneous",url:"#autocount-claim",color:T.purple},
                {icon:"💰",title:"View Payslip",desc:"Monthly salary, deductions, allowances, EPF",url:"#autocount-payslip",color:T.green},
                {icon:"📊",title:"Leave Balance",desc:"Check remaining annual, medical, and other leaves",url:"#autocount-balance",color:T.orange},
                ...(profile.driverOnly?[{icon:"🚗",title:"Mileage Claim",desc:"Submit vehicle mileage for reimbursement",url:"#autocount-mileage",color:"#6B7280"},{icon:"📋",title:"Driver Log",desc:"Daily trip log and scheduling",url:"#autocount-driverlog",color:"#6B7280"}]:[]),
              ].map((link,i)=>(
                <button key={i} onClick={()=>window.open(link.url,"_blank")} className="flex items-start gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-purple-300 text-left transition-all" style={{cursor:"pointer"}}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{background:link.color+"15"}}>{link.icon}</div>
                  <div><div className="font-bold text-gray-900 text-sm">{link.title}</div><div className="text-xs text-gray-500 mt-0.5">{link.desc}</div></div>
                  <ArrowUpRight size={14} className="text-gray-400 ml-auto mt-1 flex-shrink-0"/>
                </button>
              ))}
            </div>
          </Card>
          <Card className="p-4 bg-blue-50 border border-blue-100">
            <div className="text-sm font-bold text-blue-800 mb-1">⚠️ Important</div>
            <div className="text-sm text-blue-700">All HR transactions (leave, claims, payroll) are processed in AutoCount. This system provides quick access links only. For issues, contact Phylicia or Nik in Finance.</div>
          </Card>
        </div>
      )}

      {/* STAFF WISHLIST TAB */}
      {tab==="wishlist"&&(
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-black text-gray-900">Staff Wishlist & Objectives Vote</div>
              <div className="text-xs text-gray-500">Submit ideas. Everyone votes. Top wishes reviewed by Sai quarterly.</div>
            </div>
            <button onClick={()=>setWishModal(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white font-bold" style={{background:profile.color}}><Plus size={13}/>Add Wish</button>
          </div>
          {["Office","Tools","Training","Team","Business"].map(cat=>{
            const catWishes=wishes.filter(w=>w.cat===cat).sort((a,b)=>b.votes-a.votes);
            if(!catWishes.length) return null;
            return(
              <Card key={cat} className="overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 font-bold text-gray-700 text-sm">
                  {{"Office":"🏢 Office Improvement","Tools":"🛠️ Tools & Software","Training":"📚 Training & Skills","Team":"🎉 Team Activities","Business":"💡 Business Ideas"}[cat]}
                </div>
                {catWishes.map((w,i)=>(
                  <div key={w.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-800">{w.text}</div>
                      <div className="text-xs text-gray-400 mt-0.5">by {w.by} · {w.dept}</div>
                    </div>
                    <button onClick={()=>vote(w.id)} className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-bold transition-all" style={{background:w.voted?profile.color+"15":"#F8FAFC",color:w.voted?profile.color:"#475569",border:`1px solid ${w.voted?profile.color+"44":"#E2E8F0"}`}}>
                      👍 {w.votes}
                    </button>
                  </div>
                ))}
              </Card>
            );
          })}
          {wishModal&&(
            <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-2xl">
                <div className="flex items-center justify-between mb-4"><span className="font-black text-gray-900">Add to Wishlist</span><button onClick={()=>setWishModal(false)} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center"><X size={14}/></button></div>
                <div className="mb-3"><div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Category</div>
                  <div className="flex gap-2 flex-wrap">{["Office","Tools","Training","Team","Business"].map(c=><button key={c} onClick={()=>setWishCat(c)} className="px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all" style={{borderColor:wishCat===c?profile.color:"#E2E8F0",background:wishCat===c?profile.color+"10":"#fff",color:wishCat===c?profile.color:"#475569"}}>{c}</button>)}</div>
                </div>
                <div className="mb-4"><div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Your Wish / Idea</div><textarea value={wishInput} onChange={e=>setWishInput(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none resize-none" rows={3} placeholder="What would make work better or more fun?"/></div>
                <div className="flex gap-3"><button onClick={addWish} className="flex-1 py-3 rounded-xl text-white font-bold text-sm" style={{background:profile.color}}>Submit Wish</button><button onClick={()=>setWishModal(false)} className="flex-1 py-3 rounded-xl font-bold text-sm border border-gray-200 text-gray-600">Cancel</button></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PANTRY TAB */}
      {tab==="pantry"&&(
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 rounded-2xl" style={{background:`linear-gradient(135deg,${profile.color}15,${profile.color}08)`,border:`1px solid ${profile.color}30`}}>
            <div><div className="font-black text-gray-900">Quarterly Pantry Budget</div><div className="text-sm text-gray-500">RM 50.00 per person · Q2 2025 (Apr–Jun)</div></div>
            <div className="text-right">
              <div className="text-2xl font-black" style={{color:pantrySpent>pantryBudget?T.red:pantrySpent>pantryBudget*0.8?T.amber:T.green}}>RM {pantrySpent.toFixed(0)}</div>
              <div className="text-xs text-gray-500">of RM {pantryBudget} spent</div>
              <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
                <div style={{width:`${Math.min(pantrySpent/pantryBudget*100,100)}%`,background:pantrySpent>pantryBudget?T.red:pantrySpent>pantryBudget*0.8?T.amber:T.green,height:"100%",borderRadius:9}}/>
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5">📌 Select by category, not brand. Pantry coordinator will purchase based on availability and best value. Selections are submitted quarterly.</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pantryCategories.map(cat=>{
              const qty=pantrySelections[cat.id]||0;
              const subtotal=qty*cat.price;
              return(
                <Card key={cat.id} className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 text-sm">{cat.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{cat.desc}</div>
                      <div className="text-xs text-gray-400 mt-0.5">~RM {cat.price} {cat.unit}</div>
                    </div>
                    {subtotal>0&&<div className="text-sm font-black flex-shrink-0" style={{color:profile.color}}>RM {subtotal}</div>}
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <button onClick={()=>setPantrySelections(s=>({...s,[cat.id]:Math.max(0,(s[cat.id]||0)-1)})) } className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 font-bold hover:bg-gray-50">−</button>
                    <span className="text-sm font-black text-gray-900 w-6 text-center">{qty}</span>
                    <button onClick={()=>{if(pantrySpent+cat.price<=pantryBudget)setPantrySelections(s=>({...s,[cat.id]:(s[cat.id]||0)+1}));}} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 font-bold hover:bg-gray-50" disabled={pantrySpent+cat.price>pantryBudget}>+</button>
                    <div className="flex-1 text-xs text-gray-400">{qty>0?`${qty}× selected`:""}</div>
                  </div>
                </Card>
              );
            })}
          </div>
          {pantrySpent>0&&(
            <button className="w-full py-3 rounded-xl text-white font-bold text-sm" style={{background:profile.color}}>Submit Pantry Selection — RM {pantrySpent.toFixed(0)} / RM {pantryBudget}</button>
          )}
        </div>
      )}

      {/* JOB OPENINGS TAB */}
      {tab==="jobs"&&(
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div><div className="font-black text-gray-900">Job / Position Openings</div><div className="text-xs text-gray-500">Create, post, and track applicants from one place</div></div>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white font-bold" style={{background:profile.color}}><Plus size={13}/>New Position</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {jobOpenings.map((job,i)=>(
              <Card key={job.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={()=>setJobModal(job)}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{background:["#EDE9FE","#DCFCE7","#FEF3C7","#F3F4F6"][i]}}>{["🏆","🎯","🪄","📂"][i]}</div>
                  <div className="flex flex-col items-end gap-1"><Bdg t={job.status} c={job.status==="Open"?"green":"gray"}/><span className="text-xs text-gray-400">{job.applicants} applicants</span></div>
                </div>
                <div className="font-bold text-gray-900 text-sm mb-1">{job.title}</div>
                <div className="text-xs text-gray-500 mb-2">{job.dept} · {job.type} · Posted {job.posted}</div>
                <div className="text-xs text-gray-600 line-clamp-2">{job.desc}</div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 py-2 text-xs font-bold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Share to Job Sites</button>
                  <button className="flex-1 py-2 text-xs font-bold rounded-lg text-white" style={{background:profile.color}}>View Applicants</button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* JOB DETAIL MODAL */}
      {jobModal&&(
        <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 flex-shrink-0">
              <div><div className="font-black text-gray-900 text-lg">{jobModal.title}</div><div className="text-sm text-gray-500">{jobModal.dept} · {jobModal.applicants} applicants</div></div>
              <button onClick={()=>setJobModal(null)} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"><X size={14}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              <div className="bg-gray-50 rounded-xl p-4"><div className="font-bold text-gray-700 text-sm mb-2">Job Description</div><div className="text-sm text-gray-600 leading-relaxed">{jobModal.desc}</div></div>
              <div className="bg-gray-50 rounded-xl p-4"><div className="font-bold text-gray-700 text-sm mb-2">Requirements</div>{jobModal.requirements.map((r,i)=><div key={i} className="flex items-start gap-2 text-sm text-gray-600 mb-1.5"><CheckCircle size={13} className="text-green-500 mt-0.5 flex-shrink-0"/>{r}</div>)}</div>
              {jobModal.candidates.length>0&&(
                <div>
                  <div className="font-bold text-gray-900 mb-3">🤖 AI Applicant Insights</div>
                  {jobModal.candidates.map((c,i)=>(
                    <Card key={i} className="p-4 mb-3 cursor-pointer" onClick={()=>setApplicantModal(c)}>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-sm flex-shrink-0">{c.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div><div><div className="font-bold text-gray-900 text-sm">{c.name}</div><div className="text-xs text-gray-500">{c.exp}</div></div></div>
                        <div className="flex items-center gap-2 flex-shrink-0"><div className="text-lg font-black" style={{color:c.fit>=85?T.green:c.fit>=70?T.amber:T.red}}>{c.fit}%</div><div className="text-xs text-gray-400">fit</div></div>
                      </div>
                      <div className="text-xs text-gray-600 leading-relaxed mb-2">{c.summary}</div>
                      <div className="flex items-center justify-between"><div className="text-xs font-bold" style={{color:c.fit>=85?T.green:T.amber}}>{c.verdict}</div><button className="text-xs text-purple-600 font-semibold">Full Analysis →</button></div>
                    </Card>
                  ))}
                </div>
              )}
              {jobModal.candidates.length===0&&<div className="text-center py-8 text-gray-400"><div className="text-3xl mb-2">📭</div><div className="text-sm font-semibold">No applicants yet</div><div className="text-xs mt-1">Share the position to job sites to start receiving applications</div></div>}
            </div>
          </div>
        </div>
      )}

      {/* APPLICANT DETAIL MODAL */}
      {applicantModal&&(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="font-black text-gray-900">{applicantModal.name}</div>
              <button onClick={()=>setApplicantModal(null)} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"><X size={14}/></button>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between p-3 rounded-xl" style={{background:applicantModal.fit>=85?"#DCFCE7":applicantModal.fit>=70?"#FEF3C7":"#FEE2E2"}}>
                <span className="text-sm font-bold text-gray-800">Role Suitability</span>
                <span className="text-xl font-black" style={{color:applicantModal.fit>=85?T.green:applicantModal.fit>=70?T.amber:T.red}}>{applicantModal.fit}%</span>
              </div>
              {[{l:"Summary",v:applicantModal.summary},{l:"Key Strengths",v:applicantModal.strengths.join(" · ")},{l:"Possible Concerns",v:applicantModal.concerns.join(" · ")},{l:"Recommended Next Step",v:applicantModal.verdict}].map((s,i)=>(
                <div key={i} className="bg-gray-50 rounded-xl p-3"><div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{s.l}</div><div className="text-sm text-gray-700 leading-relaxed">{s.v}</div></div>
              ))}
              <div className="flex gap-3 mt-2">
                <button className="flex-1 py-3 rounded-xl text-white font-bold text-sm" style={{background:T.green}}>✅ Shortlist</button>
                <button className="flex-1 py-3 rounded-xl font-bold text-sm border border-gray-200 text-gray-600">Schedule Interview</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ─── ROLE CONFIG ─────────────────────────────────────────────────
// ROLES is now derived from STAFF_PROFILES + ROLE_SCREENS
const ROLES = Object.fromEntries(
  Object.entries(STAFF_PROFILES).map(([key,p])=>[key,{
    label: p.name,
    dept:  p.dept,
    color: p.color,
    avatar:p.avatar,
    screens: ROLE_SCREENS[STAFF_ROLE_MAP[key]]||ROLE_SCREENS.sales,
    canSeeSupplierCost: p.canSeeSupplierCost,
    noPricing: p.noPricing,
    driverOnly: p.driverOnly,
    noTarget: p.noTarget,
  }])
);

// ─── NAV CONFIG ───────────────────────────────────────────────────
const GROUPS=[
  {label:"OVERVIEW",   items:[{id:"owner",       icon:<Star size={16}/>,            label:"Sai's View"},
                               {id:"dashboard",   icon:<LayoutDashboard size={16}/>, label:"Dashboard"}]},
  {label:"SALES",      items:[{id:"leads",       icon:<Users size={16}/>,           label:"Leads / CRM"},
                               {id:"brief",       icon:<FileText size={16}/>,        label:"Brief Management"},
                               {id:"proposals",   icon:<Send size={16}/>,            label:"Proposals"},
                               {id:"pipeline",    icon:<GitBranch size={16}/>,       label:"Deal Pipeline"},
                               {id:"orders",      icon:<ShoppingCart size={16}/>,    label:"Media Order & PO"},
                               {id:"marketing",   icon:<Star size={16}/>,            label:"Marketing Hub"}]},
  {label:"COMMERCIAL", items:[{id:"inventory",   icon:<Package size={16}/>,         label:"Master Inventory"}]},
  {label:"CREATIVE",   items:[{id:"creative",    icon:<Palette size={16}/>,         label:"Creative Hub"}]},
  {label:"EXECUTION",  items:[{id:"execution",   icon:<Zap size={16}/>,             label:"Campaign Execution"}]},
  {label:"FINANCE",    items:[{id:"timetracker", icon:<Clock size={16}/>,           label:"Time Tracker"},
                               {id:"invoicing",   icon:<Receipt size={16}/>,         label:"Invoicing"},
                               {id:"finance",     icon:<DollarSign size={16}/>,      label:"Finance Dashboard"},
                               {id:"collection",  icon:<Repeat size={16}/>,          label:"Collection & Retention"}]},
  {label:"PEOPLE",      items:[{id:"hr",          icon:<Users size={16}/>,          label:"HR Hub"}]},
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
    {type:"alert",icon:"👩‍💻",title:"Nazri at 130% capacity",body:"52hrs assigned this week. MYDIN mockup (est. 4hrs) can be reassigned to Shariff who has 12hrs free.",action:"Reassign now"},
    {type:"alert",icon:"📁",title:"KK Mart artwork spec mismatch",body:"Uploaded file is RGB, not CMYK. Vendor requires CMYK. File has been flagged — Creative team notified.",action:"View file"},
    {type:"tip",icon:"⏱️",title:"ELITE Highway deadline in 3 days",body:"Artwork must reach Big Tree by May 28 for Jun 1 in-charge. Today is May 15 — time is tight.",action:"Check status"},
  ],
  execution:[
    {type:"alert",icon:"🔴",title:"MYDIN — DBP not submitted",body:"In-charge June 5. DBP must be submitted by May 22 (14 days prior). Today is May 15 — 7 days to submit.",action:"Submit now"},
    {type:"alert",icon:"🟡",title:"KK Mart — artwork not uploaded",body:"In-charge June 10. Artwork needed by May 20 (21 days prior). Creative team has not started.",action:"Brief creative"},
    {type:"insight",icon:"📊",title:"AEON BIG — proof of play pending",body:"In-charge was June 1. Vendor upload link sent but no photos received yet. Auto-escalation in 3 days.",action:"Chase vendor"},
  ],
  timetracker:[
    {type:"alert",icon:"⚠️",title:"Nazri overloaded",body:"52hrs assigned vs 40hr capacity. Recommend reassigning MYDIN mockup (4hrs) to Shariff. Farah has 12hrs available.",action:"Reassign task"},
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
    {type:"insight",icon:"🏆",title:"Top performer: Natasha",body:"RM 1.61M revenue, 38% win rate, 65% target achievement. Natasha's proposal style closes 2x faster than team average.",action:"View her proposals"},
    {type:"tip",icon:"📅",title:"Schedule this report",body:"Get this report delivered to your inbox every Monday 8AM — one click to set up.",action:"Schedule now"},
  ],
  owner:[
    {type:"insight",icon:"🚀",title:"Revenue per head up 33%",body:"Same 8 people generating 33% more revenue than last quarter. Automation is working — 86 hours saved this month alone.",action:"See breakdown"},
    {type:"alert",icon:"💰",title:"AEON BIG overdue RM 95K",body:"30 days overdue. Collection rate 57% vs target 65%. A director-level call typically resolves within 48 hours.",action:"Make the call"},
    {type:"insight",icon:"💡",title:"F&B vertical — right time to move",body:"3 restaurant chains in pipeline. Raya season historically drives F&B marketing spend. Window is now.",action:"View prospects"},
  ],
};

const SCREENS = {owner:OwnerView,dashboard:Dashboard,hr:(({role})=><HRHub staffKey={role}/>),marketing:Marketing,leads:Leads,brief:Brief,proposals:Proposals,pipeline:Pipeline,creative:Creative,inventory:Inventory,orders:Orders,execution:Execution,timetracker:TimeTracker,invoicing:Invoicing,finance:Finance,collection:Collection,reports:Reports};


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
  const [role,     setRole]     = useState("natasha");
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
                {typeof DEPT_GROUPS_STAFF!=="undefined"&&DEPT_GROUPS_STAFF.map(group=>(
                  <div key={group.dept}>
                    <div className="px-3 py-1 text-xs font-black uppercase tracking-widest" style={{color:"rgba(255,255,255,0.2)"}}>{group.dept}</div>
                    {group.staff.map(key=>{
                      const r=ROLES[key];
                      const sp=STAFF_PROFILES[key];
                      if(!r)return null;
                      return(
                        <button key={key} onClick={()=>switchRole(key)} className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/10 transition-all" style={{background:role===key?"rgba(255,255,255,0.12)":"transparent"}}>
                          <Av i={r.avatar} c={r.color} s={20}/>
                          <div className="flex-1 text-left min-w-0">
                            <div className="text-xs font-semibold truncate" style={{color:role===key?"#fff":"rgba(255,255,255,0.65)"}}>{r.label}</div>
                            {sp?.noTarget&&<div className="text-xs" style={{color:"rgba(255,255,255,0.25)"}}>No target</div>}
                            {sp?.noPricing&&<div className="text-xs" style={{color:"rgba(255,255,255,0.25)"}}>No pricing</div>}
                          </div>
                          {role===key&&<CheckCircle size={11} className="text-green-400 flex-shrink-0"/>}
                        </button>
                      );
                    })}
                  </div>
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
                {typeof DEPT_GROUPS_STAFF!=="undefined"&&DEPT_GROUPS_STAFF.map(group=>(
                  <div key={group.dept}>
                    <div className="px-4 py-1.5 text-xs font-black text-gray-400 uppercase tracking-wide bg-gray-50">{group.dept}</div>
                    {group.staff.map(key=>{
                      const r=ROLES[key];
                      if(!r)return null;
                      return(
                        <button key={key} onClick={()=>switchRole(key)} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all" style={{background:role===key?"#F5F3FF":"transparent"}}>
                          <Av i={r.avatar} c={r.color} s={28}/>
                          <div className="flex-1 text-left min-w-0"><div className="text-sm font-semibold text-gray-800 truncate">{r.label}</div><div className="text-xs text-gray-400">{r.dept}</div></div>
                          {role===key&&<CheckCircle size={14} className="text-purple-500"/>}
                        </button>
                      );
                    })}
                  </div>
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
          <S go={(id)=>{ if(allowed.includes(id)) setScreen(id); }} role={role} staffKey={role}/>
        </div>

        {/* Floating AI button — mobile */}
        <button onClick={()=>setAiOpen(true)} className="fixed bottom-20 right-4 md:hidden w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center text-xl z-30" style={{background:"linear-gradient(135deg,#6D28D9,#7C3AED)"}}>🤖</button>

        {/* BOTTOM NAV — mobile, role-filtered */}
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
