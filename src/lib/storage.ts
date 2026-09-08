import type { Reading } from '../types';
const prefix='mystical-self:';
let issue='';
export function storageIssue(){return issue;}
export function read<T>(key:string,fallback:T):T{try{const raw=localStorage.getItem(prefix+key);return raw?JSON.parse(raw):fallback;}catch{issue='Không thể đọc dữ liệu cục bộ hoặc dữ liệu đã hỏng. Bạn vẫn có thể khám phá; dữ liệu cũ chưa bị xóa.';return fallback;}}
export function write(key:string,value:unknown){try{localStorage.setItem(prefix+key,JSON.stringify(value));return true;}catch{issue='Trình duyệt không cho phép lưu hoặc đã hết dung lượng. Kết quả hiện chỉ tồn tại trong phiên này.';return false;}}
export function getReadings():Reading[]{const value=read<unknown>('readings',[]);if(!Array.isArray(value)){issue='Dữ liệu kết quả không đúng định dạng.';return [];}return value.filter((r):r is Reading=>!!r&&typeof r.id==='string'&&typeof r.toolSlug==='string'&&typeof r.createdAt==='string'&&typeof r.result?.title==='string'&&typeof r.result?.details==='string'&&Array.isArray(r.result?.traits)&&Array.isArray(r.result?.facts));}
export function saveReadings(items:Reading[]){const ok=write('readings',items);write('saved',items.filter(r=>r.saved).map(r=>r.id));write('profile',items.filter(r=>r.addedToProfile).map(r=>r.id));return ok;}
export function clearData(){try{Object.keys(localStorage).filter(k=>k.startsWith(prefix)).forEach(k=>localStorage.removeItem(k));issue='';return true;}catch{return false;}}
