import React from 'react'
import { onEvents, deleteEvent } from '../utils/firebase'
export default function EventList(){
  const [rows,setRows]=React.useState([]); const [q,setQ]=React.useState('')
  React.useEffect(()=>{ const unsub = onEvents(setRows); return ()=> unsub && unsub() },[])
  const list = rows.filter(e=>{ const s=q.toLowerCase().trim(); return !s || (e.title||'').toLowerCase().includes(s) || (e.description||'').toLowerCase().includes(s) })
  return (
    <div className="grid">
      <div className="card"><input className="input" placeholder="खोजें (शीर्षक/विवरण)" value={q} onChange={e=>setQ(e.target.value)} /></div>
      <div className="list">
        {list.map(e=> (
          <div key={e.id || e.title+e.date} className="card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div><div style={{fontWeight:700}}>{e.title}</div><div className="small">{e.date}</div></div>
              <button className="btn" onClick={()=>deleteEvent(e.id)}>🗑️</button>
            </div>
            <div style={{marginTop:6}}>{e.description}</div>
            <div style={{display:'flex',gap:8,marginTop:8}}>
              <button className="btn" onClick={()=>{ const txt=`${e.title}\n${e.date}\n${e.description||''}`; if(navigator.share){ navigator.share({title:e.title, text: txt, url: location.href}) } else { navigator.clipboard.writeText(txt); alert('कॉपी हो गया') } }}>🔗 शेयर</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
