import type { Reading } from '../types';
import { tools } from '../data/content';
const prefix='mystical-self:';
let issue='';
export function storageIssue(){return issue;}
export function read<T>(key:string,fallback:T):T{try{const raw=localStorage.getItem(prefix+key);return raw?JSON.parse(raw):fallback;}catch{issue='Không thể đọc dữ liệu cục bộ hoặc dữ liệu đã hỏng. Bạn vẫn có thể khám phá; dữ liệu cũ chưa bị xóa.';return fallback;}}
export function write(key:string,value:unknown){try{localStorage.setItem(prefix+key,JSON.stringify(value));return true;}catch{issue='Trình duyệt không cho phép lưu hoặc đã hết dung lượng. Kết quả hiện chỉ tồn tại trong phiên này.';return false;}}
export function getReadings():Reading[]{const value=read<unknown>('readings',[]);if(!Array.isArray(value)){issue='Dữ liệu kết quả không đúng định dạng.';return [];}return value.filter((r):r is Reading=>!!r&&typeof r.id==='string'&&typeof r.toolSlug==='string'&&typeof r.createdAt==='string'&&typeof r.result?.title==='string'&&typeof r.result?.details==='string'&&Array.isArray(r.result?.traits)&&Array.isArray(r.result?.facts));}
export function saveReadings(items:Reading[]){const ok=write('readings',items);write('saved',items.filter(r=>r.saved).map(r=>r.id));write('profile',items.filter(r=>r.addedToProfile).map(r=>r.id));
  if(typeof window!=='undefined'&&window.location.protocol.startsWith('http')){
    void fetch('/api/readings',{method:'DELETE',credentials:'include'}).then(response=>response.ok?Promise.all(items.map(reading=>fetch('/api/readings',{method:'POST',credentials:'include',headers:{'content-type':'application/json'},body:JSON.stringify(reading)}))):[]).catch(()=>{});
  }
  return ok;
}
export function clearData(){try{Object.keys(localStorage).filter(k=>k.startsWith(prefix)).forEach(k=>localStorage.removeItem(k));if(typeof window!=='undefined'){if(window.location.protocol.startsWith('http'))void fetch('/api/readings',{method:'DELETE',credentials:'include'}).catch(()=>{});window.dispatchEvent(new Event('storage'));}issue='';return true;}catch{return false;}}

if(typeof window!=='undefined'&&window.location.protocol.startsWith('http')){
  void fetch('/api/readings',{credentials:'include'}).then(async response=>response.ok?await response.json():null).then((remote:unknown)=>{
    if(!Array.isArray(remote))return;
    const local=getReadings();
    if(remote.length){write('readings',remote);window.dispatchEvent(new Event('storage'));}
    else if(local.length){void saveReadings(local);}
  }).catch(()=>{});
  void fetch('/api/admin/content',{credentials:'include'}).then(async response=>response.ok?await response.json():null).then((remote:unknown)=>{
    if(!Array.isArray(remote))return;
    for(const item of remote){if(!item||typeof item.slug!=='string')continue;const local=tools.find(tool=>tool.slug===item.slug);if(local)Object.assign(local,{name:item.name,description:item.description,category:item.category,color:item.color,minutes:Number(item.minutes),input:item.input,method:item.method});}
    window.dispatchEvent(new Event('storage'));
  }).catch(()=>{});
}
