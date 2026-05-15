import { useState } from "react";
import { LayoutDashboard, Users, GitBranch, Building2, FileText, Calendar, BarChart3, Clock, Bell, Search, Plus, ChevronRight, TrendingUp, TrendingDown, Target, Mail, Phone, CheckCircle, Circle, AlertTriangle, Star, Filter, ArrowUpRight, Zap, X, Award, Activity, DollarSign, Eye, Send, Briefcase, Palette, ShoppingCart } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, FunnelChart, Funnel, LabelList } from "recharts";

// ─── DESIGN TOKENS ───────────────────────────────────────────────
const NAV = "#0F2444";
const NAV_ACTIVE = "rgba(255,255,255,0.12)";
const PURPLE = "#6D28D9";
const TEAL = "#0D9488";
const ORANGE = "#EA580C";
const GREEN = "#16A34A";
const RED = "#DC2626";
const GOLD = "#D97706";

// ─── SAMPLE DATA ─────────────────────────────────────────────────
const revenueData = [
  {m:"Jan",rev:820},{m:"Feb",rev:940},{m:"Mar",rev:1050},{m:"Apr",rev:980},
  {m:"May",rev:1120},{m:"Jun",rev:1380},{m:"Jul",rev:1610},
];
const proposalData = [
  {cat:"New Product",sent:620,won:280},{cat:"Promo",sent:480,won:200},
  {cat:"Store Exp",sent:300,won:160},{cat:"Seasonal",sent:220,won:120},{cat:"Others",sent:180,won:60},
];
const leads = [
  {id:1,name:"Jessica Martin",co:"AEON BIG",src:"Website",score:92,owner:"NT",next:"Follow up call",date:"Today 9:00AM",status:"New",email:"jessica@aeonbig.com"},
  {id:2,name:"Ravi Pillai",co:"MYDIN",src:"Referral",score:78,owner:"AR",next:"Proposal discussion",date:"Today 11:00AM",status:"Qualified",email:"ravi@mydin.com"},
  {id:3,name:"Siti Khadijah",co:"KK Mart",src:"Event",score:65,owner:"FL",next:"Product demo",date:"Tomorrow 10:00AM",status:"Follow-Up",email:"siti@kkmart.com"},
  {id:4,name:"Jaya Grocer Team",co:"Jaya Grocer",src:"Website",score:88,owner:"NT",next:"Send proposal",date:"Tomorrow 2:00PM",status:"Qualified",email:"info@jayagrocer.com"},
  {id:5,name:"Daniel Lee",co:"Fresh Mart",src:"Cold Call",score:45,owner:"AR",next:"Intro call",date:"May 20 4:00PM",status:"New",email:"daniel@freshmart.com"},
];
const deals = {
  "New Lead":    [{co:"AEON BIG",val:"RM 60K",owner:"NT",prob:10,next:"Follow up call",date:"May 13"},{co:"MYDIN",val:"RM 40K",owner:"AR",prob:10,next:"Discovery call",date:"May 14"}],
  "Qualified":   [{co:"KK Mart",val:"RM 120K",owner:"JL",prob:25,next:"Needs analysis",date:"May 15"},{co:"Jaya Grocer",val:"RM 80K",owner:"NT",prob:25,next:"Solution demo",date:"May 16"}],
  "Proposal Sent":[{co:"MYDIN",val:"RM 150K",owner:"AR",prob:50,next:"Proposal review",date:"May 19"},{co:"AEON BIG",val:"RM 130K",owner:"JL",prob:50,next:"Proposal review",date:"May 20"}],
  "Negotiation": [{co:"AEON",val:"RM 180K",owner:"NT",prob:70,next:"Contract review",date:"May 21"},{co:"KK Mart",val:"RM 80K",owner:"JL",prob:70,next:"Final approval",date:"May 22"}],
  "Closed Won":  [{co:"MYDIN",val:"RM 160K",owner:"AR",prob:100,next:"Closed May 7",date:""},{co:"Jaya Grocer",val:"RM 160K",owner:"NT",prob:100,next:"Closed May 6",date:""}],
};
const clients = [
  {name:"AEON BIG",ind:"Retail",owner:"Natasha Tan",campaigns:3,health:85,revenue:"RM 620K",meet:"May 9"},
  {name:"MYDIN",ind:"Retail",owner:"Arif Rahman",campaigns:2,health:52,revenue:"RM 410K",meet:"May 10"},
  {name:"KK Mart",ind:"Retail",owner:"Siti Aisyah",campaigns:1,health:90,revenue:"RM 260K",meet:"May 12"},
  {name:"Jaya Grocer",ind:"Grocery",owner:"Daniel Wong",campaigns:2,health:68,revenue:"RM 320K",meet:"May 14"},
  {name:"7-Eleven MY",ind:"Convenience",owner:"Melissa Lee",campaigns:2,health:88,revenue:"RM 280K",meet:"May 15"},
];
const proposals = [
  {title:"AEON BIG – Retail Optimisation Solution",client:"AEON BIG",value:"RM 280K",owner:"Natasha Tan",sent:"May 7, 2025",viewed:"Viewed May 8, 9:21AM",stage:"Awaiting Approval",stageColor:"bg-amber-100 text-amber-700"},
  {title:"MYDIN – Store Operations Transformation",client:"MYDIN",value:"RM 210K",owner:"Jason Doe",sent:"May 6, 2025",viewed:"Opened May 6, 4:32PM",stage:"Under Review",stageColor:"bg-blue-100 text-blue-700"},
  {title:"KK Mart – Inventory & Demand Planning",client:"KK Mart",value:"RM 160K",owner:"Sarah Lee",sent:"May 5, 2025",viewed:"Not Viewed",stage:"Submitted",stageColor:"bg-purple-100 text-purple-700"},
  {title:"Jaya Grocer – Pricing Strategy Proposal",client:"Jaya Grocer",value:"RM 190K",owner:"Marcus Tee",sent:"May 3, 2025",viewed:"Viewed May 3, 11:08AM",stage:"Under Review",stageColor:"bg-blue-100 text-blue-700"},
  {title:"AEON BIG – Marketing Partnership",client:"AEON BIG",value:"RM 120K",owner:"Natasha Tan",sent:"May 1, 2025",viewed:"Not Viewed",stage:"Draft",stageColor:"bg-gray-100 text-gray-600"},
];
const execCampaigns = [
  {client:"AEON BIG",campaign:"Raya 2025 OOH",incharge:"Jun 1",artwork:"✅",dbp:"✅",proof:"✅",pop:"⏳",report:"⬜",status:"Live"},
  {client:"MYDIN",campaign:"Mid-Year Sale Digital",incharge:"Jun 5",artwork:"✅",dbp:"⏳",proof:"⬜",pop:"⬜",report:"⬜",status:"In Progress"},
  {client:"KK Mart",campaign:"Store Launch Billboard",incharge:"Jun 10",artwork:"⏳",dbp:"⬜",proof:"⬜",pop:"⬜",report:"⬜",status:"Pending"},
  {client:"Jaya Grocer",campaign:"Q3 Brand Campaign",incharge:"Jul 1",artwork:"⬜",dbp:"⬜",proof:"⬜",pop:"⬜",report:"⬜",status:"Not Started"},
];
const timeEntries = [
  {user:"Sarah Lee",dept:"Creative",project:"AEON BIG Raya 2025",task:"Artwork Adaptation",hours:3.5,billable:true,rate:150,category:"Creative Production"},
  {user:"Jason Doe",dept:"Channel",project:"MYDIN Store Ops",task:"Proposal Writing",hours:2.0,billable:true,rate:120,category:"Proposal Prep"},
  {user:"Natasha Tan",dept:"Sales",project:"KK Mart Launch",task:"Client Meeting",hours:1.5,billable:false,rate:0,category:"Client Meeting"},
  {user:"Amir Rahman",dept:"Commercial",project:"Jaya Grocer Q3",task:"Vendor Negotiation",hours:2.5,billable:false,rate:0,category:"Commercial"},
  {user:"Farah Lim",dept:"Creative",project:"AEON BIG Raya 2025",task:"Superimposed Mockup",hours:4.0,billable:true,rate:150,category:"Creative Production"},
];
const avatarColors = {NT:"#6D28D9",AR:"#0D9488",JL:"#EA580C",FL:"#DC2626",NT2:"#D97706",SL:"#16A34A",MT:"#0369A1"};

// ─── HELPERS ─────────────────────────────────────────────────────
const Avatar = ({initials,color="#6D28D9",size=28})=>(
  <div style={{width:size,height:size,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:size*0.38,fontWeight:700,flexShrink:0}}>{initials}</div>
);
const Badge = ({text,color="purple"})=>{
  const map={purple:"bg-purple-100 text-purple-700",teal:"bg-teal-100 text-teal-700",orange:"bg-orange-100 text-orange-700",green:"bg-green-100 text-green-700",red:"bg-red-100 text-red-700",blue:"bg-blue-100 text-blue-700",gray:"bg-gray-100 text-gray-600",amber:"bg-amber-100 text-amber-700"};
  return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${map[color]||map.purple}`}>{text}</span>;
};
const KpiCard = ({icon,label,value,delta,deltaUp,color,chart})=>(
  <div className="bg-white rounded-2xl p-5 flex flex-col gap-2 shadow-sm border border-gray-100 flex-1 min-w-0">
    <div className="flex items-center justify-between">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center`} style={{background:color+"22"}}><span style={{color}}>{icon}</span></div>
      {chart&&<div className="w-20 h-8 opacity-60">{chart}</div>}
    </div>
    <div className="text-2xl font-bold text-gray-900 leading-tight">{value}</div>
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">{label}</span>
      {delta&&<span className={`text-xs font-semibold flex items-center gap-0.5 ${deltaUp?"text-green-600":"text-red-500"}`}>{deltaUp?<TrendingUp size={11}/>:<TrendingDown size={11}/>}{delta}</span>}
    </div>
  </div>
);
const SparkLine = ({data,color})=>(
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}><Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false}/></LineChart>
  </ResponsiveContainer>
);
const ScoreBar = ({score,max=100})=>{
  const pct=score/max*100;
  const color=pct>75?"#16A34A":pct>50?"#D97706":"#DC2626";
  return <div className="flex items-center gap-2"><div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden"><div style={{width:pct+"%",background:color,height:"100%",borderRadius:9}}></div></div><span className="text-xs font-semibold" style={{color}}>{score}</span></div>;
};
const HealthDots = ({score})=>{
  const filled=Math.round(score/20);
  const color=score>75?"#16A34A":score>50?"#D97706":"#DC2626";
  return <div className="flex gap-1">{[0,1,2,3,4].map(i=><div key={i} style={{width:10,height:10,borderRadius:"50%",background:i<filled?color:"#E5E7EB"}}/>)}</div>;
};

// ─── SCREENS ─────────────────────────────────────────────────────

function Dashboard({setModal}){
  const [tasks,setTasks]=useState([false,false,false,false,false]);
  return(
    <div className="flex flex-col gap-5">
      {/* Greeting */}
      <div className="rounded-2xl p-5 flex items-center gap-4" style={{background:"linear-gradient(135deg,#EEF2FF 0%,#FAF5FF 100%)",border:"1px solid #E0E7FF"}}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{background:"linear-gradient(135deg,#6D28D9,#0D9488)"}}>🌅</div>
        <div className="flex-1">
          <div className="text-lg font-bold text-gray-900">Good morning, Natasha.</div>
          <div className="text-sm text-gray-500">Today's goal: follow up 5 hot leads, send 2 proposals, and close the AEON BIG pitch by Friday.</div>
        </div>
        <button onClick={()=>setModal("target")} className="px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{background:"linear-gradient(135deg,#6D28D9,#7C3AED)"}}>View Target</button>
      </div>
      {/* KPIs */}
      <div className="flex gap-4">
        <KpiCard icon={<Users size={20}/>} label="New Leads" value="28" delta="18% vs 7d" deltaUp color="#6D28D9" chart={<SparkLine data={[{v:18},{v:21},{v:19},{v:24},{v:22},{v:26},{v:28}]} color="#6D28D9"/>}/>
        <KpiCard icon={<FileText size={20}/>} label="Active Proposals" value="14" delta="12% vs 7d" deltaUp color="#0D9488" chart={<SparkLine data={[{v:10},{v:11},{v:12},{v:11},{v:13},{v:13},{v:14}]} color="#0D9488"/>}/>
        <KpiCard icon={<Calendar size={20}/>} label="Meetings Today" value="6" delta="" color="#EA580C" chart={<SparkLine data={[{v:4},{v:5},{v:3},{v:6},{v:5},{v:7},{v:6}]} color="#EA580C"/>}/>
        <KpiCard icon={<Target size={20}/>} label="Monthly Target" value="RM 850K" delta="65% achieved" deltaUp color="#16A34A" chart={<SparkLine data={[{v:200},{v:350},{v:420},{v:480},{v:520},{v:550},{v:552}]} color="#16A34A"/>}/>
      </div>
      {/* Pipeline + Priorities + Opportunities */}
      <div className="grid grid-cols-3 gap-4">
        {/* Pipeline */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 col-span-1">
          <div className="flex items-center justify-between mb-4"><span className="font-bold text-gray-900">Sales Pipeline</span><button className="text-xs text-purple-600 font-semibold flex items-center gap-1">View Pipeline <ArrowUpRight size={12}/></button></div>
          {[{label:"Qualified",val:"RM 620K",n:13,color:"#6D28D9"},{label:"Proposal Sent",val:"RM 410K",n:11,color:"#EA580C"},{label:"Negotiation",val:"RM 260K",n:6,color:"#7C3AED"},{label:"Closed Won",val:"RM 320K",n:8,color:"#16A34A"}].map(s=>(
            <div key={s.label} className="flex items-center gap-3 mb-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer">
              <div className="w-3 h-3 rounded-full" style={{background:s.color}}/>
              <div className="flex-1 min-w-0"><div className="text-xs font-semibold text-gray-700">{s.label}</div><div className="text-xs text-gray-400">{s.n} deals</div></div>
              <span className="text-sm font-bold text-gray-900">{s.val}</span>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-gray-100"><div className="text-xs text-gray-500">Total Pipeline Value</div><div className="text-xl font-bold text-gray-900">RM 1.61M</div></div>
        </div>
        {/* Today's Priorities */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4"><span className="font-bold text-gray-900">Today's Priorities</span><button className="text-xs text-purple-600 font-semibold">View all</button></div>
          {[{t:"Follow up with AEON BIG",sub:"Discuss proposal and pricing",pri:"High",time:"9:00 AM"},{t:"Send proposal to MYDIN",sub:"Retail Analysis Solution",pri:"Medium",time:"11:00 AM"},{t:"Call KK Mart Procurement",sub:"Invite to view feature steps",pri:"Medium",time:"2:00 PM"},{t:"Prepare for Jaya Grocer meeting",sub:"Solution demo & Q&A",pri:"Low",time:"4:00 PM"},{t:"Update forecast for this month",sub:"Pipeline review",pri:"Low",time:"5:30 PM"}].map((task,i)=>(
            <div key={i} className="flex items-start gap-3 mb-3 cursor-pointer group" onClick={()=>setTasks(t=>{const n=[...t];n[i]=!n[i];return n;})}>
              <div className="mt-0.5">{tasks[i]?<CheckCircle size={16} className="text-green-500"/>:<Circle size={16} className="text-gray-300 group-hover:text-purple-400"/>}</div>
              <div className="flex-1 min-w-0"><div className={`text-sm font-medium ${tasks[i]?"line-through text-gray-400":"text-gray-800"}`}>{task.t}</div><div className="text-xs text-gray-400">{task.sub}</div></div>
              <div className="flex flex-col items-end gap-1"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${task.pri==="High"?"bg-red-100 text-red-600":task.pri==="Medium"?"bg-amber-100 text-amber-600":"bg-gray-100 text-gray-500"}`}>{task.pri}</span><span className="text-xs text-gray-400">{task.time}</span></div>
            </div>
          ))}
        </div>
        {/* Top Opportunities */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4"><span className="font-bold text-gray-900">Top Opportunities</span><button className="text-xs text-purple-600 font-semibold flex items-center gap-1">View All <ArrowUpRight size={12}/></button></div>
          {[{co:"AEON BIG",val:"RM 280K",stage:"Negotiation",stageColor:"bg-orange-100 text-orange-700",next:"Follow up call",time:"Today 9:00AM"},{co:"MYDIN",val:"RM 210K",stage:"Proposal Sent",stageColor:"bg-blue-100 text-blue-700",next:"Send proposal",time:"Today 11:00AM"},{co:"KK Mart",val:"RM 160K",stage:"Qualified",stageColor:"bg-purple-100 text-purple-700",next:"Intro call",time:"Today 2:00PM"},{co:"Jaya Grocer",val:"RM 190K",stage:"Proposal Sent",stageColor:"bg-blue-100 text-blue-700",next:"Demo meeting",time:"Today 4:00PM"}].map((op,i)=>(
            <div key={i} className="flex items-center gap-3 mb-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{background:["#6D28D9","#0D9488","#EA580C","#D97706"][i]}}>{op.co.slice(0,2)}</div>
              <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-gray-800">{op.co}</div><div className="text-xs text-gray-400">{op.next} · {op.time}</div></div>
              <div className="flex flex-col items-end gap-1"><span className="text-sm font-bold text-gray-900">{op.val}</span><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${op.stageColor}`}>{op.stage}</span></div>
            </div>
          ))}
        </div>
      </div>
      {/* Meetings + Quick Actions */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4"><span className="font-bold text-gray-900">Upcoming Meetings</span><button className="text-xs text-purple-600 font-semibold flex items-center gap-1">View Calendar <ArrowUpRight size={12}/></button></div>
        <div className="flex gap-4">
          {[{t:"9:00 AM",co:"AEON BIG",label:"Follow up Call",color:"#6D28D9"},{t:"11:00 AM",co:"MYDIN",label:"Proposal Discussion",color:"#0D9488"},{t:"2:00 PM",co:"KK Mart",label:"Intro Call",color:"#EA580C"},{t:"4:00 PM",co:"Jaya Grocer",label:"Solution Demo",color:"#D97706"}].map((m,i)=>(
            <div key={i} className="flex items-center gap-3 flex-1 p-3 rounded-xl border border-gray-100 hover:border-purple-200 cursor-pointer">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white" style={{background:m.color}}>{m.co.slice(0,2)}</div>
              <div><div className="text-xs font-bold" style={{color:m.color}}>{m.t}</div><div className="text-sm font-semibold text-gray-800">{m.co}</div><div className="text-xs text-gray-400">{m.label}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Leads(){
  const [sel,setSel]=useState(null);
  return(
    <div className="flex flex-col gap-5">
      <div className="flex gap-4">
        <KpiCard icon={<Users size={20}/>} label="New Leads" value="28" delta="18% vs 7d" deltaUp color="#6D28D9"/>
        <KpiCard icon={<CheckCircle size={20}/>} label="Qualified Leads" value="41" delta="15% vs 7d" deltaUp color="#0D9488"/>
        <KpiCard icon={<Calendar size={20}/>} label="Follow-Ups Today" value="12" color="#EA580C"/>
        <KpiCard icon={<Target size={20}/>} label="Conversion Rate" value="14.6%" delta="2.3% vs 30d" deltaUp color="#16A34A"/>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 flex-1 bg-gray-50 rounded-xl px-3 py-2"><Search size={14} className="text-gray-400"/><input className="bg-transparent text-sm outline-none flex-1 text-gray-600" placeholder="Search leads by name, company, or email..."/></div>
          {["Source","Status","Owner","Score"].map(f=><button key={f} className="flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">{f} <ChevronRight size={12}/></button>)}
        </div>
        <table className="w-full">
          <thead><tr className="border-b border-gray-100">{["Lead Name","Company","Source","Score","Owner","Next Action","Status",""].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>)}</tr></thead>
          <tbody>
            {leads.map((l,i)=>(
              <tr key={i} className="border-b border-gray-50 hover:bg-purple-50/30 cursor-pointer" onClick={()=>setSel(sel===i?null:i)}>
                <td className="px-4 py-3"><div className="flex items-center gap-3"><Avatar initials={l.name.split(" ").map(n=>n[0]).join("").slice(0,2)} color={["#6D28D9","#0D9488","#EA580C","#D97706","#DC2626"][i]}/><div><div className="text-sm font-semibold text-gray-800">{l.name}</div><div className="text-xs text-gray-400">{l.email}</div></div></div></td>
                <td className="px-4 py-3 text-sm text-gray-700">{l.co}</td>
                <td className="px-4 py-3"><Badge text={l.src} color={l.src==="Website"?"blue":l.src==="Referral"?"green":l.src==="Event"?"purple":"orange"}/></td>
                <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-16"><ScoreBar score={l.score}/></div></div></td>
                <td className="px-4 py-3"><Avatar initials={l.owner} color={["#6D28D9","#0D9488","#EA580C","#D97706","#DC2626"][i]} size={26}/></td>
                <td className="px-4 py-3"><div className="text-sm text-gray-700">{l.next}</div><div className="text-xs text-gray-400">{l.date}</div></td>
                <td className="px-4 py-3"><Badge text={l.status} color={l.status==="New"?"blue":l.status==="Qualified"?"green":"orange"}/></td>
                <td className="px-4 py-3"><div className="flex gap-2"><button className="p-1 hover:bg-purple-100 rounded-lg"><Mail size={14} className="text-purple-500"/></button><button className="p-1 hover:bg-green-100 rounded-lg"><Phone size={14} className="text-green-500"/></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-3">
        {[{icon:<Users size={16}/>,label:"Add Lead",color:"#6D28D9"},{icon:<Activity size={16}/>,label:"Assign Owner",color:"#0D9488"},{icon:<Calendar size={16}/>,label:"Schedule Follow-Up",color:"#EA580C"},{icon:<Mail size={16}/>,label:"Send Email",color:"#D97706"}].map(a=>(
          <button key={a.label} className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm flex-1 justify-center" style={{background:a.color}}>{a.icon}{a.label}</button>
        ))}
      </div>
    </div>
  );
}

function Pipeline(){
  const stageColors={"New Lead":"#6D28D9","Qualified":"#0D9488","Proposal Sent":"#EA580C","Negotiation":"#7C3AED","Closed Won":"#16A34A"};
  const stageVals={"New Lead":"RM 280K","Qualified":"RM 310K","Proposal Sent":"RM 410K","Negotiation":"RM 260K","Closed Won":"RM 320K"};
  const stageCounts={"New Lead":28,"Qualified":13,"Proposal Sent":11,"Negotiation":6,"Closed Won":8};
  return(
    <div className="flex flex-col gap-5">
      <div className="flex gap-4">
        <KpiCard icon={<BarChart3 size={20}/>} label="Pipeline Value" value="RM 1.61M" delta="18% vs 30d" deltaUp color="#6D28D9"/>
        <KpiCard icon={<Activity size={20}/>} label="Weighted Forecast" value="RM 620K" delta="16% vs 30d" deltaUp color="#0D9488"/>
        <KpiCard icon={<Target size={20}/>} label="Win Rate" value="38%" delta="8pp vs 30d" deltaUp color="#EA580C"/>
        <KpiCard icon={<DollarSign size={20}/>} label="Avg Deal Size" value="RM 85K" delta="5% vs 30d" deltaUp color="#D97706"/>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {Object.entries(deals).map(([stage,stageDels])=>(
          <div key={stage} className="flex-shrink-0 w-56">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl mb-3 text-white text-sm font-bold" style={{background:stageColors[stage]}}>
              <span>{stage}</span><span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-xs">{stageCounts[stage]}</span>
            </div>
            <div className="text-xs text-gray-500 mb-2 px-1">{stageVals[stage]}</div>
            {stageDels.map((d,i)=>(
              <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 mb-2 hover:shadow-md cursor-pointer transition-shadow">
                <div className="flex items-center gap-2 mb-2"><div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{background:stageColors[stage]}}>{d.co.slice(0,2)}</div><span className="text-sm font-bold text-gray-800">{d.co}</span></div>
                <div className="text-base font-bold text-gray-900 mb-2">{d.val}</div>
                <div className="text-xs text-gray-500 mb-1">Owner: <span className="font-semibold text-gray-700">{d.owner}</span></div>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full"><div style={{width:d.prob+"%",background:stageColors[stage],height:"100%",borderRadius:9}}/></div>
                  <span className="text-xs text-gray-500">{d.prob}%</span>
                </div>
                <div className="text-xs text-gray-400">{d.next}{d.date&&` · ${d.date}`}</div>
              </div>
            ))}
            <button className="w-full py-2 text-xs font-semibold rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-purple-300 hover:text-purple-400">+ Add Deal</button>
          </div>
        ))}
      </div>
      {/* Revenue Forecast Chart */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4"><span className="font-bold text-gray-900">Revenue Forecast</span><button className="text-xs text-purple-600 font-semibold">View Full Forecast →</button></div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={revenueData}>
            <XAxis dataKey="m" tick={{fontSize:11,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:11,fill:"#9CA3AF"}} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}M`}/>
            <Tooltip formatter={v=>`RM ${v}K`} contentStyle={{borderRadius:8,border:"none",boxShadow:"0 4px 20px rgba(0,0,0,0.1)"}}/>
            <Bar dataKey="rev" fill="#6D28D9" radius={[6,6,0,0]} opacity={0.8}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Clients(){
  return(
    <div className="flex flex-col gap-5">
      <div className="flex gap-4">
        <KpiCard icon={<Building2 size={20}/>} label="Active Clients" value="128" delta="12% vs 30d" deltaUp color="#6D28D9"/>
        <KpiCard icon={<AlertTriangle size={20}/>} label="At-Risk Accounts" value="9" delta="8% vs 30d" deltaUp={false} color="#DC2626"/>
        <KpiCard icon={<Activity size={20}/>} label="Avg Relationship Health" value="74/100" delta="6pts vs 30d" deltaUp color="#0D9488"/>
        <KpiCard icon={<DollarSign size={20}/>} label="Monthly Revenue" value="RM 2.85M" delta="14% vs 30d" deltaUp color="#16A34A"/>
      </div>
      <div className="flex gap-4">
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b border-gray-100">
            <span className="font-bold text-gray-900 flex-1">Client Directory</span>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2"><Search size={14} className="text-gray-400"/><input className="bg-transparent text-sm outline-none text-gray-600 w-40" placeholder="Search clients..."/></div>
            <button className="px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">All Industries</button>
            <button className="px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">All Tiers</button>
            <button className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm text-white font-semibold" style={{background:"#6D28D9"}}><Plus size={14}/>Add Client</button>
          </div>
          <table className="w-full">
            <thead><tr className="border-b border-gray-100">{["Client","Account Owner","Active Campaigns","Relationship Health","Revenue (MTD)","Next Meeting",""].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>)}</tr></thead>
            <tbody>
              {clients.map((c,i)=>(
                <tr key={i} className="border-b border-gray-50 hover:bg-purple-50/30 cursor-pointer">
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{background:["#6D28D9","#0D9488","#EA580C","#D97706","#16A34A"][i]}}>{c.name.slice(0,2)}</div><div><div className="text-sm font-semibold text-gray-800">{c.name}</div><div className="text-xs text-gray-400">{c.ind}</div></div></div></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Avatar initials={c.owner.split(" ").map(n=>n[0]).join("")} color={["#6D28D9","#0D9488","#EA580C","#D97706","#16A34A"][i]} size={26}/><span className="text-sm text-gray-700">{c.owner}</span></div></td>
                  <td className="px-4 py-3"><div className="text-sm font-semibold text-gray-800">{c.campaigns}</div><div className="text-xs text-green-600 font-medium">Active</div></td>
                  <td className="px-4 py-3"><HealthDots score={c.health}/><div className="text-xs mt-1" style={{color:c.health>75?"#16A34A":c.health>50?"#D97706":"#DC2626"}}>{c.health>75?"Healthy":c.health>50?"Neutral":"At Risk"}</div></td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-900">{c.revenue}</td>
                  <td className="px-4 py-3"><div className="text-sm text-gray-700">{c.meet}</div></td>
                  <td className="px-4 py-3"><div className="flex gap-1"><button className="p-1.5 hover:bg-purple-100 rounded-lg"><Mail size={14} className="text-purple-500"/></button><button className="p-1.5 hover:bg-green-100 rounded-lg"><Phone size={14} className="text-green-500"/></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Key Contacts */}
        <div className="w-56 flex flex-col gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="font-bold text-gray-900 mb-3 text-sm">Key Contacts</div>
            {[{name:"Andrew Lim",role:"Head of Merchandising",co:"AEON BIG"},{name:"Farah Hassan",role:"Category Manager",co:"MYDIN"},{name:"Kenji Tanaka",role:"Operations Director",co:"KK Mart"}].map((c,i)=>(
              <div key={i} className="flex items-center gap-2 mb-3"><Avatar initials={c.name.split(" ").map(n=>n[0]).join("")} color={["#6D28D9","#0D9488","#EA580C"][i]} size={32}/><div className="flex-1 min-w-0"><div className="text-xs font-semibold text-gray-800 truncate">{c.name}</div><div className="text-xs text-gray-400 truncate">{c.role}</div></div><div className="flex gap-1"><Mail size={12} className="text-gray-400 cursor-pointer hover:text-purple-500"/><Phone size={12} className="text-gray-400 cursor-pointer hover:text-green-500"/></div></div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="font-bold text-gray-900 mb-3 text-sm">Recent Activity</div>
            {[{icon:"👁","text":"Proposal viewed by AEON BIG","time":"May 6"},{"icon":"📅","text":"Meeting completed with MYDIN","time":"May 5"},{"icon":"🚀","text":"Campaign launched for Jaya Grocer","time":"May 3"}].map((a,i)=>(
              <div key={i} className="flex gap-2 mb-3"><span className="text-sm">{a.icon}</span><div className="flex-1"><div className="text-xs text-gray-700">{a.text}</div><div className="text-xs text-gray-400">{a.time}</div></div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Proposals(){
  return(
    <div className="flex flex-col gap-5">
      <div className="flex gap-4">
        <KpiCard icon={<FileText size={20}/>} label="Drafts" value="12" delta="8% vs 7d" deltaUp={false} color="#6D28D9"/>
        <KpiCard icon={<Send size={20}/>} label="Sent" value="18" delta="20% vs 7d" deltaUp color="#0D9488"/>
        <KpiCard icon={<Eye size={20}/>} label="Awaiting Approval" value="6" delta="2 vs 7d" deltaUp color="#EA580C"/>
        <KpiCard icon={<Award size={20}/>} label="Won from Proposal" value="RM 1.21M" delta="18% vs 7d" deltaUp color="#16A34A"/>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white font-semibold" style={{background:"#6D28D9"}}><Plus size={14}/>Create Proposal</button>
          {["Duplicate","Send for Approval","Export PDF"].map(a=><button key={a} className="px-4 py-2 rounded-xl text-sm text-gray-600 border border-gray-200 hover:bg-gray-50">{a}</button>)}
          <div className="flex-1"/>
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2"><Search size={14} className="text-gray-400"/><input className="bg-transparent text-sm outline-none text-gray-600 w-40" placeholder="Search proposals..."/></div>
          <button className="flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-600"><Filter size={13}/>Filter</button>
        </div>
        <table className="w-full">
          <thead><tr className="border-b border-gray-100">{["","Proposal Title","Client","Value","Owner","Sent Date","Viewed/Opened","Approval Stage",""].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>)}</tr></thead>
          <tbody>
            {proposals.map((p,i)=>(
              <tr key={i} className="border-b border-gray-50 hover:bg-purple-50/30 cursor-pointer">
                <td className="px-4 py-3"><div className="w-12 h-9 rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-xs font-bold text-purple-400">PDF</div></td>
                <td className="px-4 py-3"><div className="text-sm font-semibold text-gray-800">{p.title}</div></td>
                <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{background:["#6D28D9","#0D9488","#EA580C","#D97706","#6D28D9"][i]}}>{p.client.slice(0,2)}</div><span className="text-sm text-gray-700">{p.client}</span></div></td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">{p.value}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{p.owner}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{p.sent}</td>
                <td className="px-4 py-3"><div className={`flex items-center gap-1 text-xs font-semibold ${p.viewed.includes("Not")?"text-gray-400":"text-green-600"}`}><Eye size={12}/>{p.viewed}</div></td>
                <td className="px-4 py-3"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${p.stageColor}`}>{p.stage}</span></td>
                <td className="px-4 py-3"><button className="text-gray-400 hover:text-gray-600">⋯</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Templates */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4"><span className="font-bold text-gray-900">Proposal Templates</span><button className="text-xs text-purple-600 font-semibold">View all templates →</button></div>
        <div className="flex gap-3">
          {["Retail Solution","Marketing","Operations","Partnership"].map((t,i)=>(
            <div key={t} className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-gray-100 hover:border-purple-300 cursor-pointer hover:bg-purple-50/30 flex-1">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{background:["#6D28D9","#EA580C","#0D9488","#16A34A"][i]}}><FileText size={18}/></div>
              <span className="text-xs font-semibold text-gray-700 text-center">{t} Proposal</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-purple-300 cursor-pointer hover:bg-purple-50/30 flex-1">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100"><Plus size={18} className="text-gray-400"/></div>
            <span className="text-xs font-semibold text-gray-400">New Template</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Execution(){
  return(
    <div className="flex flex-col gap-5">
      <div className="flex gap-4">
        <KpiCard icon={<Zap size={20}/>} label="Active Campaigns" value="8" color="#6D28D9"/>
        <KpiCard icon={<AlertTriangle size={20}/>} label="DBP Pending" value="3" color="#EA580C"/>
        <KpiCard icon={<CheckCircle size={20}/>} label="Proof of Play Done" value="5" color="#16A34A"/>
        <KpiCard icon={<FileText size={20}/>} label="Reports Due" value="2" color="#D97706"/>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-gray-100"><span className="font-bold text-gray-900 flex-1">Campaign Execution Tracker</span><button className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm text-white font-semibold" style={{background:"#6D28D9"}}><Plus size={14}/>New Campaign</button></div>
        <table className="w-full">
          <thead><tr className="border-b border-gray-100">{["Client","Campaign","In-Charge","Artwork","DBP","Colour Proof","Proof of Play","Report","Status",""].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>)}</tr></thead>
          <tbody>
            {execCampaigns.map((c,i)=>(
              <tr key={i} className="border-b border-gray-50 hover:bg-purple-50/30 cursor-pointer">
                <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{background:["#6D28D9","#0D9488","#EA580C","#D97706"][i]}}>{c.client.slice(0,2)}</div><span className="text-sm font-semibold text-gray-800">{c.client}</span></div></td>
                <td className="px-4 py-3 text-sm text-gray-700">{c.campaign}</td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-800">{c.incharge}</td>
                {[c.artwork,c.dbp,c.proof,c.pop,c.report].map((s,j)=><td key={j} className="px-4 py-3 text-center text-lg">{s}</td>)}
                <td className="px-4 py-3"><Badge text={c.status} color={c.status==="Live"?"green":c.status==="In Progress"?"blue":c.status==="Pending"?"orange":"gray"}/></td>
                <td className="px-4 py-3"><button className="text-xs text-purple-600 font-semibold hover:underline">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Legend */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="text-sm font-bold text-gray-700 mb-3">Execution Checklist Legend</div>
        <div className="flex gap-6">
          {[{icon:"✅",label:"Completed"},{icon:"⏳",label:"In Progress"},{icon:"⬜",label:"Not Started"},{icon:"🔴",label:"Overdue"}].map(l=><div key={l.label} className="flex items-center gap-2"><span className="text-lg">{l.icon}</span><span className="text-sm text-gray-600">{l.label}</span></div>)}
        </div>
      </div>
      {/* Alerts */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="text-sm font-bold text-gray-900 mb-3">⚠️ Active Alerts</div>
        {[{msg:"MYDIN Mid-Year Sale — DBP not yet submitted. In-charge in 14 days.",color:"orange"},{msg:"KK Mart Store Launch — Artwork not uploaded. In-charge in 21 days.",color:"red"},{msg:"Jaya Grocer Q3 — Brief pending. Campaign starts in 45 days.",color:"blue"}].map((a,i)=>(
          <div key={i} className={`flex items-center gap-3 p-3 rounded-xl mb-2 ${a.color==="orange"?"bg-amber-50 border border-amber-200":a.color==="red"?"bg-red-50 border border-red-200":"bg-blue-50 border border-blue-200"}`}>
            <AlertTriangle size={15} className={a.color==="orange"?"text-amber-500":a.color==="red"?"text-red-500":"text-blue-500"}/>
            <span className="text-sm text-gray-700">{a.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimeTracker(){
  const [active,setActive]=useState(null);
  const total=timeEntries.reduce((a,e)=>a+e.hours,0);
  const billable=timeEntries.filter(e=>e.billable).reduce((a,e)=>a+e.hours*e.rate,0);
  return(
    <div className="flex flex-col gap-5">
      <div className="flex gap-4">
        <KpiCard icon={<Clock size={20}/>} label="Hours Today" value="13.5h" delta="Team total" color="#6D28D9"/>
        <KpiCard icon={<DollarSign size={20}/>} label="Billable Value" value={`RM ${(billable/1000).toFixed(1)}K`} delta="This week" color="#16A34A"/>
        <KpiCard icon={<Activity size={20}/>} label="Utilisation Rate" value="72%" delta="3% vs last week" deltaUp color="#0D9488"/>
        <KpiCard icon={<AlertTriangle size={20}/>} label="Overloaded Staff" value="1" color="#EA580C"/>
      </div>
      {/* AI Overload Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-200 flex items-center justify-center text-amber-700">🤖</div>
        <div className="flex-1"><span className="font-semibold text-amber-800 text-sm">AI Workload Alert: </span><span className="text-sm text-amber-700">Sarah Lee has 52hrs assigned this week — 12hrs over capacity. Farah Lim has 12hrs available. Suggest reassigning MYDIN mockup to Farah.</span></div>
        <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600">Reassign</button>
        <button className="px-3 py-2 rounded-xl text-sm text-amber-600 border border-amber-300">Dismiss</button>
      </div>
      {/* Time Entries */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <span className="font-bold text-gray-900 flex-1">Today's Time Entries</span>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white font-semibold" style={{background:"#6D28D9"}}><Plus size={14}/>Log Time</button>
        </div>
        <table className="w-full">
          <thead><tr className="border-b border-gray-100">{["Team Member","Dept","Project","Task","Category","Hours","Billable","Amount",""].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>)}</tr></thead>
          <tbody>
            {timeEntries.map((e,i)=>(
              <tr key={i} className="border-b border-gray-50 hover:bg-purple-50/30 cursor-pointer" onClick={()=>setActive(active===i?null:i)}>
                <td className="px-4 py-3"><div className="flex items-center gap-2"><Avatar initials={e.user.split(" ").map(n=>n[0]).join("")} color={["#6D28D9","#0D9488","#EA580C","#D97706","#DC2626"][i]} size={28}/><span className="text-sm font-semibold text-gray-800">{e.user}</span></div></td>
                <td className="px-4 py-3"><Badge text={e.dept} color={e.dept==="Creative"?"purple":e.dept==="Channel"?"teal":e.dept==="Sales"?"orange":"gray"}/></td>
                <td className="px-4 py-3 text-sm text-gray-700">{e.project}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{e.task}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{e.category}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{e.hours}h</span>
                    {active===i
                      ? <button className="px-2 py-1 rounded-lg text-xs bg-red-100 text-red-600 font-semibold">■ Stop</button>
                      : <button className="px-2 py-1 rounded-lg text-xs bg-green-100 text-green-600 font-semibold">▶ Start</button>
                    }
                  </div>
                </td>
                <td className="px-4 py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${e.billable?"bg-green-100 text-green-700":"bg-gray-100 text-gray-500"}`}>{e.billable?"Billable":"Internal"}</span></td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">{e.billable?`RM ${(e.hours*e.rate).toLocaleString()}`:"—"}</td>
                <td className="px-4 py-3"><button className="text-gray-400 hover:text-gray-600">⋯</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center bg-gray-50">
          <span className="text-sm text-gray-500">Total hours today: <strong className="text-gray-900">{total}h</strong></span>
          <span className="text-sm text-gray-500">Total billable value: <strong className="text-green-700">RM {billable.toLocaleString()}</strong></span>
        </div>
      </div>
    </div>
  );
}

function Reports(){
  return(
    <div className="flex flex-col gap-5">
      <div className="flex gap-4">
        <KpiCard icon={<DollarSign size={20}/>} label="Revenue This Month" value="RM 1.61M" delta="14% vs last month" deltaUp color="#6D28D9"/>
        <KpiCard icon={<CheckCircle size={20}/>} label="Closed Won" value="RM 920K" delta="18% vs last month" deltaUp color="#16A34A"/>
        <KpiCard icon={<Target size={20}/>} label="Win Rate" value="38%" delta="5pp vs last month" deltaUp color="#0D9488"/>
        <KpiCard icon={<Activity size={20}/>} label="Target Achievement" value="65%" delta="7pp vs last month" deltaUp color="#EA580C"/>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* Revenue Trend */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4"><span className="font-bold text-gray-900">Revenue Trend</span><span className="text-xs text-gray-400">Monthly (RM)</span></div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={revenueData}>
              <XAxis dataKey="m" tick={{fontSize:11,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:"#9CA3AF"}} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}M`}/>
              <Tooltip formatter={v=>`RM ${v}K`} contentStyle={{borderRadius:8,border:"none",boxShadow:"0 4px 20px rgba(0,0,0,0.1)"}}/>
              <Bar dataKey="rev" fill="#6D28D9" radius={[6,6,0,0]} opacity={0.85}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Funnel */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4"><span className="font-bold text-gray-900">Funnel Conversion</span><span className="text-xs text-gray-400">This month</span></div>
          <div className="flex flex-col gap-2 mt-4">
            {[{stage:"Leads",n:312,pct:100,color:"#6D28D9"},{stage:"Proposals Sent",n:144,pct:46,color:"#7C3AED"},{stage:"Negotiation",n:78,pct:25,color:"#EA580C"},{stage:"Closed Won",n:54,pct:17,color:"#16A34A"}].map(f=>(
              <div key={f.stage} className="flex items-center gap-3">
                <div className="w-28 text-xs text-gray-600 text-right">{f.stage}</div>
                <div className="flex-1 h-7 rounded-lg overflow-hidden bg-gray-100"><div style={{width:f.pct+"%",background:f.color,height:"100%",borderRadius:6,display:"flex",alignItems:"center",paddingLeft:8}}><span className="text-xs text-white font-semibold">{f.n} ({f.pct}%)</span></div></div>
              </div>
            ))}
          </div>
        </div>
        {/* Proposal Performance */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4"><span className="font-bold text-gray-900">Proposal Performance</span></div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={proposalData}>
              <XAxis dataKey="cat" tick={{fontSize:10,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:10,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{borderRadius:8,border:"none",boxShadow:"0 4px 20px rgba(0,0,0,0.1)"}}/>
              <Bar dataKey="sent" fill="#C4B5FD" radius={[4,4,0,0]} name="Proposal Sent"/>
              <Bar dataKey="won" fill="#16A34A" radius={[4,4,0,0]} name="Closed Won"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Rep Performance */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="font-bold text-gray-900 mb-4">Rep Performance Summary</div>
          <table className="w-full">
            <thead><tr className="border-b border-gray-100">{["Rep","Revenue","Closed Won","Win Rate","Achievement"].map(h=><th key={h} className="text-left py-2 text-xs font-semibold text-gray-500">{h}</th>)}</tr></thead>
            <tbody>
              {[{n:"Natasha Tan",r:"1.61M",c:"920K",w:"38%",a:65},{n:"Amir Rahman",r:"980K",c:"560K",w:"36%",a:60},{n:"Sarah Lim",r:"720K",c:"410K",w:"34%",a:58},{n:"Kai Chen",r:"610K",c:"330K",w:"31%",a:52}].map((r,i)=>(
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2"><div className="flex items-center gap-2"><Avatar initials={r.n.split(" ").map(n=>n[0]).join("")} color={["#6D28D9","#0D9488","#EA580C","#D97706"][i]} size={26}/><span className="text-sm text-gray-700">{r.n}</span></div></td>
                  <td className="py-2 text-sm font-semibold text-gray-800">RM {r.r}</td>
                  <td className="py-2 text-sm text-gray-600">RM {r.c}</td>
                  <td className="py-2 text-sm text-gray-600">{r.w}</td>
                  <td className="py-2"><div className="flex items-center gap-2"><div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden"><div style={{width:r.a+"%",background:"#6D28D9",height:"100%",borderRadius:9}}/></div><span className="text-xs text-gray-600">{r.a}%</span></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── MODALS ───────────────────────────────────────────────────────
function TargetModal({onClose}){
  return(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl" style={{background:"linear-gradient(160deg,#F5F0FF 0%,#EFF9F7 100%)"}}>
        <div className="p-8 text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100"><X size={14}/></button>
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl text-white font-black" style={{background:"linear-gradient(135deg,#6D28D9,#0D9488)"}}>VR</div>
          <div className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-2">🎉 Amazing Work!</div>
          <h2 className="text-4xl font-black text-gray-900 mb-2">Target Achieved!</h2>
          <p className="text-gray-500 mb-6">Congratulations, Natasha! Your sales team has hit the monthly target. 💜</p>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">🏆</div><div><div className="text-2xl font-black text-gray-900">RM 850K</div><div className="text-xs text-gray-500">goal reached</div></div></div>
            <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">🎯</div><div><div className="text-2xl font-black text-gray-900">110%</div><div className="text-xs text-gray-500">of target achieved</div></div></div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl text-white font-bold text-sm" style={{background:"#6D28D9"}}>🎊 Celebrate Team</button>
            <button className="flex-1 py-3 rounded-xl text-gray-700 font-bold text-sm border-2 border-gray-200 hover:bg-gray-50">📊 View Performance</button>
            <button onClick={onClose} className="px-5 py-3 rounded-xl text-gray-500 font-bold text-sm border-2 border-gray-200 hover:bg-gray-50">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIModal({onClose}){
  return(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl" style={{background:"linear-gradient(160deg,#F5F0FF 0%,#EFF9F7 100%)"}}>
        <div className="p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100"><X size={14}/></button>
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-xl text-white font-black" style={{background:"linear-gradient(135deg,#6D28D9,#0D9488)"}}>VR</div>
            <div className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-2">AI Performance Insight</div>
            <h2 className="text-3xl font-black text-gray-900">You're Close, Natasha.</h2>
            <p className="text-gray-500 mt-2">You reached <strong className="text-purple-600">85%</strong> of the monthly target — and your effort is strong.</p>
          </div>
          <div className="flex gap-4 mb-5">
            <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm"><div className="text-xl font-black text-gray-900">RM 722K</div><div className="text-xs text-gray-500">achieved this month</div></div>
            <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm"><div className="text-xl font-black text-purple-600">85%</div><div className="text-xs text-gray-500">of RM 850K target</div></div>
            <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm"><div className="text-xl font-black text-teal-600">High Activity</div><div className="text-xs text-gray-500">strong effort level</div></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="font-bold text-gray-900 mb-3 text-sm">⚡ Why the target wasn't achieved</div>
              {[{icon:"📨",t:"18 proposals were sent this month"},{icon:"👥",t:"24 client follow-ups were completed"},{icon:"💰",t:"3 high-value deals worth RM 260K are still pending"},{icon:"⏰",t:"2 approvals were pushed to next month"}].map((r,i)=>(
                <div key={i} className="flex gap-2 mb-2 text-sm text-gray-600"><span>{r.icon}</span>{r.t}</div>
              ))}
            </div>
            <div className="bg-purple-50 rounded-2xl p-4">
              <div className="font-bold text-purple-800 mb-2 text-sm">💜 AI Motivation</div>
              <p className="text-sm text-purple-700">You've been consistent, proactive, and active. The shortfall appears to be timing, not lack of effort.</p>
              <p className="text-sm text-purple-700 mt-2">Keep pushing — these pending deals could help you hit the target next month. ✨</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl text-white font-bold text-sm" style={{background:"#6D28D9"}}>👁 View AI Analysis</button>
            <button className="flex-1 py-3 rounded-xl text-gray-700 font-bold text-sm border-2 border-gray-200">📅 Plan Next Month</button>
            <button onClick={onClose} className="px-5 py-3 rounded-xl text-gray-500 font-bold text-sm border-2 border-gray-200">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR NAV ─────────────────────────────────────────────────
const NAV_ITEMS = [
  {id:"dashboard",icon:<LayoutDashboard size={18}/>,label:"Dashboard"},
  {id:"leads",icon:<Users size={18}/>,label:"Leads"},
  {id:"pipeline",icon:<GitBranch size={18}/>,label:"Pipeline"},
  {id:"clients",icon:<Building2 size={18}/>,label:"Clients"},
  {id:"proposals",icon:<FileText size={18}/>,label:"Proposals"},
  {id:"execution",icon:<Zap size={18}/>,label:"Execution"},
  {id:"timetracker",icon:<Clock size={18}/>,label:"Time Tracker"},
  {id:"reports",icon:<BarChart3 size={18}/>,label:"Reports"},
];
const SCREEN_TITLES = {
  dashboard:"Sales Command Center",leads:"Lead Manager",pipeline:"Deal Pipeline",
  clients:"Client Hub",proposals:"Proposal Center",execution:"Campaign Execution",
  timetracker:"Time Tracker",reports:"Sales Reports",
};

// ─── MAIN APP ─────────────────────────────────────────────────────
export default function App(){
  const [screen,setScreen]=useState("dashboard");
  const [modal,setModal]=useState(null);

  const screens = {
    dashboard:<Dashboard setModal={setModal}/>,
    leads:<Leads/>,
    pipeline:<Pipeline/>,
    clients:<Clients/>,
    proposals:<Proposals/>,
    execution:<Execution/>,
    timetracker:<TimeTracker/>,
    reports:<Reports/>,
  };

  return(
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>

      {/* SIDEBAR */}
      <div className="w-52 flex flex-col flex-shrink-0 overflow-y-auto" style={{background:NAV}}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white" style={{background:"linear-gradient(135deg,#6D28D9,#0D9488)"}}>VR</div>
          <div><div className="text-white font-black text-sm leading-tight">Visual</div><div className="text-white/60 font-semibold text-xs">Retale</div></div>
        </div>
        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map(item=>(
            <button key={item.id} onClick={()=>setScreen(item.id)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all w-full text-left" style={{background:screen===item.id?NAV_ACTIVE:"transparent",color:screen===item.id?"#fff":"rgba(255,255,255,0.55)"}}>
              <span style={{color:screen===item.id?"#A78BFA":"rgba(255,255,255,0.45)"}}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        {/* AI Assistant */}
        <div className="mx-3 mb-4 p-3 rounded-xl cursor-pointer hover:bg-white/10" style={{background:"rgba(255,255,255,0.07)"}} onClick={()=>setModal("ai")}>
          <div className="flex items-center gap-2 mb-1"><div className="w-6 h-6 rounded-lg bg-purple-500 flex items-center justify-center text-white text-xs">🤖</div><span className="text-white text-xs font-semibold">AI Assistant</span></div>
          <div className="text-white/50 text-xs">Ask your AI Assistant →</div>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP BAR */}
        <div className="flex items-center gap-4 px-6 py-3 bg-white border-b border-gray-100 flex-shrink-0">
          <div className="flex-1">
            <h1 className="text-xl font-black text-gray-900">{SCREEN_TITLES[screen]}</h1>
          </div>
          <div className="flex items-center gap-3 flex-1 bg-gray-50 rounded-xl px-3 py-2 max-w-xs"><Search size={14} className="text-gray-400"/><input className="bg-transparent text-sm outline-none flex-1 text-gray-600" placeholder="Search opportunities, clients..."/><kbd className="text-xs text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded font-mono">⌘K</kbd></div>
          {/* Floral decoration */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200"><Bell size={16} className="text-gray-600"/></button>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{background:"#DC2626",fontSize:9}}>3</div>
            </div>
            <button onClick={()=>setModal("target")} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white font-bold" style={{background:"linear-gradient(135deg,#6D28D9,#7C3AED)"}}><Plus size={14}/>New Opportunity</button>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar initials="NT" color="#6D28D9" size={34}/>
              <div className="hidden md:block"><div className="text-sm font-semibold text-gray-800">Natasha</div></div>
              <ChevronRight size={14} className="text-gray-400"/>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {screens[screen]}
        </div>

        {/* QUICK ACTIONS BAR */}
        <div className="flex gap-3 px-6 py-3 bg-white border-t border-gray-100 flex-shrink-0">
          {[{icon:"📞",label:"Call Client",color:"#6D28D9"},{icon:"📨",label:"Send Proposal",color:"#0D9488"},{icon:"📅",label:"Add Meeting",color:"#EA580C"},{icon:"✏️",label:"Update Deal",color:"#D97706"}].map(a=>(
            <button key={a.label} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm" style={{background:a.color}}><span>{a.icon}</span>{a.label}</button>
          ))}
        </div>
      </div>

      {/* MODALS */}
      {modal==="target"&&<TargetModal onClose={()=>setModal(null)}/>}
      {modal==="ai"&&<AIModal onClose={()=>setModal(null)}/>}
    </div>
  );
}
