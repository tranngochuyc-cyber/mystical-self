import { useEffect, useRef } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminView } from './AdminView';
import { clearData } from '../lib/storage';
export function Progress({value}:{value:number}){return <div className="progress" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label="Tiến độ hoàn thiện"><span style={{width:`${value}%`}}/></div>;}
export function Empty({title,description}:{title:string;description?:string}){return <div className="empty"><Sparkles size={40}/><h2>{title}</h2><p>{description||'Một góc nhìn mới đang chờ bạn khám phá.'}</p><Link className="button primary" to="/explore">Khám phá công cụ</Link></div>;}
export function Modal({title,body,onConfirm,onClose}:{title:string;body:string;onConfirm:()=>void;onClose:()=>void}){const ref=useRef<HTMLDialogElement>(null);useEffect(()=>{const el=ref.current;const before=document.activeElement as HTMLElement;el?.showModal();el?.querySelector<HTMLButtonElement>("button[autofocus]")?.focus();return()=>{el?.close();before?.focus();};},[]);return <dialog ref={ref} onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose();}}><div className="modal-content"><button className="icon-button close" aria-label="Đóng" onClick={onClose}><X/></button><h2>{title}</h2><p>{body}</p><div className="actions"><button className="button" autoFocus onClick={onClose}>Giữ lại</button><button className="button danger" onClick={()=>{onConfirm();onClose();}}>Xác nhận xóa</button></div></div></dialog>;}

