import cfg from '../firebaseConfig.json'
let cloudEnabled=false, sdk={}
try{
  if(cfg && cfg.apiKey && cfg.apiKey!=='YOUR_API_KEY'){
    const { initializeApp } = await import('firebase/app')
    const { getFirestore, collection, addDoc, setDoc, doc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp } = await import('firebase/firestore')
    const app = initializeApp(cfg); const db = getFirestore(app)
    sdk = { db, collection, addDoc, setDoc, doc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp }
    cloudEnabled=true; console.log('Firebase Cloud Sync ON')
  } else { console.warn('Firebase config missing; Local Mode') }
}catch(e){ console.warn('Firebase init error; Local Mode', e) }

const LS={ get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}}, set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}} }

export function onDonations(cb){
  if(cloudEnabled){
    const { db, collection, onSnapshot, query, orderBy } = sdk
    const q=query(collection(db,'donations'), orderBy('date','desc'))
    return onSnapshot(q, snap=>cb(snap.docs.map(d=>({id:d.id,...d.data()}))))
  } else { cb(LS.get('donations',[])); return ()=>{} }
}
export async function addDonation(row){
  if(cloudEnabled){
    const { db, collection, addDoc, serverTimestamp } = sdk
    await addDoc(collection(db,'donations'), { ...row, createdAt: serverTimestamp() })
  } else { const a=LS.get('donations',[]); a.unshift({ ...row, id: Math.random().toString(36).slice(2)}); LS.set('donations',a) }
}
export async function deleteDonation(id){
  if(cloudEnabled){ const { db, doc, deleteDoc } = sdk; await deleteDoc(doc(db,'donations',id)) }
  else { const a=LS.get('donations',[]); LS.set('donations', a.filter(x=>x.id!==id)) }
}

export function onEvents(cb){
  if(cloudEnabled){
    const { db, collection, onSnapshot, query, orderBy } = sdk
    const q=query(collection(db,'events'), orderBy('date','asc'))
    return onSnapshot(q, snap=>cb(snap.docs.map(d=>({id:d.id,...d.data()}))))
  } else { cb(LS.get('events',[])); return ()=>{} }
}
export async function addEvent(row){
  if(cloudEnabled){
    const { db, collection, addDoc, serverTimestamp } = sdk
    await addDoc(collection(db,'events'), { ...row, createdAt: serverTimestamp() })
  } else { const a=LS.get('events',[]); a.unshift({ ...row, id: Math.random().toString(36).slice(2)}); LS.set('events',a) }
}
export async function deleteEvent(id){
  if(cloudEnabled){ const { db, doc, deleteDoc } = sdk; await deleteDoc(doc(db,'events',id)) }
  else { const a=LS.get('events',[]); LS.set('events', a.filter(x=>x.id!==id)) }
}
export const isCloud = ()=> cloudEnabled
