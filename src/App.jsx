import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import ThemeToggle from './components/ThemeToggle'
import DonationForm from './components/DonationForm'
import DonationList from './components/DonationList'
import EventForm from './components/EventForm'
import EventList from './components/EventList'
import AartiList from './components/AartiList'
import BhajanList from './components/BhajanList'
import { isCloud } from './utils/firebase'

export default function App(){
  const [theme,setTheme]=React.useState(()=>localStorage.getItem('theme')||'light')
  React.useEffect(()=>{ document.documentElement.classList.toggle('dark', theme==='dark'); localStorage.setItem('theme',theme)},[theme])
  const loc=useLocation()
  return (
    <div>
      <header>
        <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div className="logo"><img src="./logo.png" alt="logo" style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>
            <div>
              <div style={{fontWeight:700}}>BabaturantnathMandirApp</div>
              <div className="small">दान • आरती • भजन • आयोजन {isCloud()?'• Cloud ON':'• Local Mode'}</div>
            </div>
          </div>
          <ThemeToggle theme={theme} setTheme={setTheme}/>
        </div>
        <nav className="container tabs">
          <Link className={`tab ${loc.pathname==='/#/'||loc.hash==='#/'?'active':''}`} to="/">🏠 गृह</Link>
          <Link className={`tab ${loc.hash.startsWith('#/donations')?'active':''}`} to="/donations">🪙 दान</Link>
          <Link className={`tab ${loc.hash.startsWith('#/aarti')?'active':''}`} to="/aarti">🪔 आरती</Link>
          <Link className={`tab ${loc.hash.startsWith('#/bhajan')?'active':''}`} to="/bhajan">🎶 भजन</Link>
          <Link className={`tab ${loc.hash.startsWith('#/events')?'active':''}`} to="/events">📅 आयोजन</Link>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/donations" element={<DonationsPage/>}/>
          <Route path="/events" element={<EventsPage/>}/>
          <Route path="/aarti" element={<AartiList/>}/>
          <Route path="/bhajan" element={<BhajanList/>}/>
        </Routes>
      </div>
      <div className="footer">© Babaturantnath Mandir • PWA</div>
    </div>
  )
}
function Home(){ return (
  <div className="grid grid-3">
    <div className="card"><div className="small">ऐप</div><div style={{fontSize:24,fontWeight:700}}>Babaturantnath Mandir</div><div className="small">PWA • ऑफलाइन • Web→APK</div></div>
    <div className="card"><div className="small">सेक्शन</div><div>दान, आयोजन, आरती, भजन</div></div>
    <div className="card"><div className="small">थीम</div><div>लाइट/डार्क टॉगल</div></div>
  </div>
)}
function DonationsPage(){ return (<div className="grid"><DonationForm/><DonationList/></div>) }
function EventsPage(){ return (<div className="grid"><EventForm/><EventList/></div>) }
