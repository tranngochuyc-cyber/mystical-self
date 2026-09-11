import { useEffect, useState } from 'react';
import { storeSession } from '../lib/storage';

export function AccountStatus() {
  if (import.meta.env.MODE === 'github-pages') return <div className="account-status"><span>Bản công khai · lưu trên trình duyệt này<small>Kết quả không được đồng bộ giữa các thiết bị trên GitHub Pages.</small></span></div>;
  return <DynamicAccountStatus/>;
}
function DynamicAccountStatus() {
  const [session, setSession] = useState(storeSession);
  useEffect(() => {
    const refresh = () => setSession(storeSession());
    window.addEventListener('storage', refresh);
    return () => window.removeEventListener('storage', refresh);
  }, []);
  const local = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  return <div className="account-status" role="status">
    {!session.ready ? <span>Đang kiểm tra phiên lưu trữ…</span> : session.authenticated ? <><span>Đã đăng nhập · {session.name || 'Tài khoản của bạn'}<small>Kết quả đồng bộ theo tài khoản; ghi chú và bản nháp ở trình duyệt này.</small></span><a className="text-link" target="_top" href="/signout-with-chatgpt?return_to=/">Đăng xuất</a></> : <><span>{local ? 'Bản xem thử · lưu trên thiết bị' : 'Bạn đang khám phá trên thiết bị này'}<small>Kết quả cục bộ không tự chuyển sang tài khoản khác.</small></span>{!local && <a className="button" target="_top" href="/signin-with-chatgpt?return_to=/profile">Đăng nhập với ChatGPT</a>}</>}
  </div>;
}
