import React from 'react'
import { addEvent } from '../utils/firebase'
export default function EventForm(){
  const [form,setForm]=React.useState({ title:'', date:new Date().toISOString().slice(0,10), description:'' })
  const submit=async(e)=>{ e.preventDefault(); if(!form.title) return alert('शीर्षक लिखें'); await addEvent(form); if('Notification' in window){ if(Notification.permission==='granted') new Notification('नया आयोजन',{body:form.title, icon:'./logo.png'}); else if(Notification.permission!=='denied') Notification.requestPermission() } setForm({ title:'', date:new Date().toISOString().slice(0,10), description:'' }) }
  return (
    <form className="card grid grid-3" onSubmit={submit}>
      <input className="input" placeholder="कार्यक्रम शीर्षक" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
      <input className="input" type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
      <input className="input" placeholder="विवरण" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
      <button className="btn primary" type="submit">➕ जोड़ें</button>
    </form>
  )
}
