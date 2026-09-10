import type { Reading } from '../types';
export interface Session { authenticated:boolean; id?:string; email?:string; name?:string; isAdmin?:boolean }
async function request<T>(path:string,init:RequestInit={}):Promise<T>{const response=await fetch(path,{credentials:'include',headers:{'content-type':'application/json',...(init.headers||{})},...init});if(!response.ok)throw new Error((await response.json().catch(()=>null))?.error||`Yêu cầu thất bại (${response.status})`);return response.json();}
export const getSession=()=>request<Session>('/api/me');
export const getRemoteReadings=()=>request<Reading[]>('/api/readings');
export const createRemoteReading=(reading:Reading)=>request<{ok:boolean}>('/api/readings',{method:'POST',body:JSON.stringify(reading)});
export const updateRemoteReading=(id:string,patch:Partial<Pick<Reading,'saved'|'addedToProfile'>>)=>request<{ok:boolean}>(`/api/readings/${encodeURIComponent(id)}`,{method:'PATCH',body:JSON.stringify(patch)});
export const deleteRemoteReading=(id:string)=>request<{ok:boolean}>(`/api/readings/${encodeURIComponent(id)}`,{method:'DELETE'});
export const clearRemoteReadings=()=>request<{ok:boolean}>('/api/readings',{method:'DELETE'});
export interface EditableTool { slug:string; name:string; description:string; category:string; color:string; minutes:number; input:string; method:string; updated_at?:string }
export const getAdminContent=()=>request<EditableTool[]>('/api/admin/content');
export const saveAdminContent=(tool:EditableTool)=>request<{ok:boolean}>(`/api/admin/content/${tool.slug}`,{method:'PUT',body:JSON.stringify(tool)});
export const getAdminOverview=()=>request<{readings:number;users:number}>('/api/admin/overview');
