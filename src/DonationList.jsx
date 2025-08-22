import React from 'react'
import { onDonations, deleteDonation } from '../utils/firebase'
const currency = n => new Intl.NumberFormat('hi-IN',{style:'currency',currency:'INR'}).format(Number(n||0))
export default function DonationList(){
  const [rows,setRows]=React.useState([]); const [q,setQ]=React.useState(''); const [from,setFrom]=React.useState(''); const [to,setTo]=React.useState('')
  React.useEffect(()=>{ const unsub = onDonations(setRows); return ()=> unsub && unsub() },[])
  const filtered = rows.filter(d=>{ const okQ=!q||(d.name||'').toLowerCase().includes(q.toLowerCase())||(d.note||'').toLowerCase().includes(q.toLowerCase()); const okF=!from||(d.date||'')>=from; const okT=!to||(d.date||'')<=to; return okQ&&okF&&okT })
  const total = filtered.reduce((s,d)=>s+Number(d.amount||0),0)
  const exportCSV = ()=>{ const header=['नाम','राशि(₹)','तारीख','नोट']; const rowsCsv=filtered.map(d=>[d.name,d.amount,d.date,d.note||'']); const csv=[header,...rowsCsv].map(r=>r.map(x=>`"${String(x).replaceAll('"','""')}"`).join(',')).join('\n'); const blob=new Blob(["\uFEFF"+csv],{type:'text/csv;charset=utf-8;'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`Donations_${new Date().toISOString().slice(0,10)}.csv`; a.click(); URL.revokeObjectURL(url) }
  return (
    <div className="grid">
      <div className="card grid grid-3">
        <input className="input" placeholder="Search (नाम/नोट)" value={q} onChange={e=>setQ(e.target.value)} />
        <input className="input" type="date" value={from} onChange={e=>setFrom(e.target.value)} />
        <input className="input" type="date" value={to} onChange={e=>setTo(e.target.value)} />
        <div className="small">कुल: <b>{currency(total)}</b> • प्रविष्टियाँ: {filtered.length}</div>
        <button className="btn" onClick={exportCSV}>⬇️ CSV</button>
      </div>
      <div className="card">
        <table className="table">
          <thead><tr><th>नाम</th><th>राशि</th><th>तारीख</th><th>नोट</th><th></th></tr></thead>
          <tbody>
            {filtered.map(d=> (
              <tr key={d.id || d.name+d.date}>
                <td>{d.name}</td><td>{currency(d.amount)}</td><td>{d.date}</td><td>{d.note}</td>
                <td><button className="btn" onClick={()=>deleteDonation(d.id)}>🗑️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
