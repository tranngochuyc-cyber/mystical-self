import { Component, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import './release.css';
export function NotFound() { return <section className="container page release-fallback"><span className="eyebrow">404 · NGOÀI TỌA ĐỘ</span><Sparkles size={48} aria-hidden="true"/><h1>Bạn đã trôi ra ngoài<br/><em>bản đồ các vì sao.</em></h1><p>Đường dẫn này không còn ở đây. Chọn một điểm đến để tiếp tục khám phá.</p><div className="actions"><Link className="button primary" to="/">Return Home</Link><Link className="button" to="/codex">Explore Cosmos</Link></div></section>; }
export class LoadBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <section className="container page release-fallback" role="alert"><Sparkles size={40}/><h1>Chưa thể mở vùng trời này.</h1><p>Kết nối có thể gián đoạn hoặc website vừa được cập nhật. Dữ liệu đã lưu vẫn được giữ.</p><div className="actions"><button className="button primary" onClick={() => window.location.reload()}>Tải lại trang</button><Link className="button" to="/">Trở về trang chủ</Link></div></section> : this.props.children; }
}
export function FinalFooter() { return <footer className="container release-footer"><div><Link className="brand" to="/"><Sparkles size={22}/>Mystical Self.</Link><p>Interactive Astrology Exploration<br/>+ Cosmic Identity</p><small>Chiêm tinh: diễn giải biểu tượng. Thiên văn: thông tin khoa học được phân biệt trong từng mục. Archetype: sáng tạo để suy ngẫm.</small></div><nav aria-label="Liên kết cuối trang"><Link to="/explore">Explore</Link><Link to="/codex">Cosmic Codex</Link><Link to="/profile">Cosmic Profile</Link><Link to="/about">Riêng tư & phương pháp</Link><a href="https://github.com/tranngochuyc-cyber/mystical-self">GitHub · mã nguồn</a></nav><span className="release-version">V1 · © {new Date().getFullYear()} Mystical Self</span></footer>; }
