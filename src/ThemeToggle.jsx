import React from 'react'
export default function ThemeToggle({theme,setTheme}){
  return (
    <label style={{display:'flex',alignItems:'center',gap:8}}>
      <input type="checkbox" checked={theme==='dark'} onChange={e=>setTheme(e.target.checked?'dark':'light')}/>
      {theme==='dark'?'🌙 डार्क':'☀️ लाइट'}
    </label>
  )
}
