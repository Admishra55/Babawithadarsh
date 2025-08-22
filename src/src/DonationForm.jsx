import React from 'react'
import { addDonation } from '../utils/firebase'
export default function DonationForm(){
  const [form,setForm]=React.useState({ name:'', amount:'', date:new Date().toISOString().slice(0,10), note:'' })
  const submit=async(e)=>{ e.preventDefault(); if(!form.name||!form.amount) return alert('नाम और राशि आवश्यक है'); await addDonation({ ...form, amount:Number(form.amount) }); setForm({ name:'', amount:'', date:new Date().toISOString().slice(0,10), note:'' }) }
  return (
    <form className="card grid grid-3" onSubmit={submit}>
      <input className="input" placeholder="भक्त का नाम" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
      <input className="input" placeholder="राशि (₹)" type="number" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/>
      <input className="input" type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
      <input className="input" placeholder="नोट (वैकल्पिक)" value={form.note} onChange={e=>setForm({...form,note:e.target.value})}/>
      <button className="btn primary" type="submit">➕ जोड़ें</button>
    </form>
  )
}
