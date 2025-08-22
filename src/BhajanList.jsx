import React from 'react'
import data from '../data/aartis_bhajans.json'
function useSearch(list){
  const [query,setQuery]=React.useState(''); const [cat,setCat]=React.useState('सभी'); const [inLyrics,setInLyrics]=React.useState(true)
  const cats = React.useMemo(()=>['सभी',...Array.from(new Set(list.map(x=>x.category||'अन्य')))],[list])
  const results = list.filter(x=>{ const q=query.toLowerCase().trim(); const okCat=cat==='सभी'||(x.category||'अन्य')===cat; if(!q) return okCat; const inTitle=x.title.toLowerCase().includes(q); const inBody=inLyrics?(x.lyrics||'').toLowerCase().includes(q):false; return okCat && (inTitle||inBody) })
  return {query,setQuery,cat,setCat,inLyrics,setInLyrics,cats,results}
}
export default function BhajanList(){
  const {query,setQuery,cat,setCat,inLyrics,setInLyrics,cats,results}=useSearch(data.bhajans)
  return (
    <div className="grid">
      <div className="card grid grid-3">
        <input className="input" placeholder="खोजें (नाम/शब्द)" value={query} onChange={e=>setQuery(e.target.value)} />
        <select className="select" value={cat} onChange={e=>setCat(e.target.value)}>{cats.map(c=><option key={c} value={c}>{c}</option>)}</select>
        <label className="small" style={{display:'flex',alignItems:'center',gap:8}}><input type="checkbox" checked={inLyrics} onChange={e=>setInLyrics(e.target.checked)} /> Lyrics में भी खोजें</label>
      </div>
      <div className="list">
        {results.map(x=>(
          <div key={x.id} className="card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div><div style={{fontWeight:700}}>{x.title}</div><div className="small">{x.category||'अन्य'}</div></div>
              <button className="btn" onClick={()=>{navigator.clipboard.writeText(`${x.title}\n\n${x.lyrics}`); alert('कॉपी हो गया')}}>📋 कॉपी</button>
            </div>
            <pre style={{marginTop:8}}>{x.lyrics}</pre>
          </div>
        ))}
      </div>
    </div>
  )
}
