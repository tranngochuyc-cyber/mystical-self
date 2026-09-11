import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { Celestial } from '../Visuals';

export function CosmicHero() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const x = useMotionValue(0), y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 25 });
  const springY = useSpring(y, { stiffness: 60, damping: 25 });
  return <section ref={ref} id="cosmic-entry" className={`cosmic-hero ${visible ? 'is-visible' : ''}`}
    onPointerMove={event => {
      if (reduced || event.pointerType !== 'mouse' || !window.matchMedia('(min-width: 900px)').matches) return;
      const rect = event.currentTarget.getBoundingClientRect();
      x.set((event.clientX - rect.left - rect.width / 2) / rect.width * 18);
      y.set((event.clientY - rect.top - rect.height / 2) / rect.height * 18);
    }} onPointerLeave={() => { x.set(0); y.set(0); }}>
    <div className="cosmic-stars" aria-hidden="true"/>
    <div className="container cosmic-hero-layout">
      <div className="cosmic-hero-copy"><div className="eyebrow">MYSTICAL SELF · ĐÀI QUAN SÁT BÊN TRONG</div>
        <h1>Cả một vũ trụ.<br/><em>Một bản thể bạn.</em></h1>
        <p>Đi qua những vì sao, chạm vào những biểu tượng.<br/>Tìm một góc nhìn khiến bạn hiểu mình thêm.</p>
        <div className="actions"><a className="button primary" href="#zodiac">Bước vào hoàng đạo <ArrowDown size={18}/></a><Link className="text-link" to="/profile">Chòm sao của tôi <ArrowUpRight size={17}/></Link></div>
        <p className="cosmic-caption">Khám phá biểu tượng · Giải trí & tự suy ngẫm</p>
      </div>
      <motion.div className="cosmic-hero-map" style={{ x: reduced ? 0 : springX, y: reduced ? 0 : springY }}>
        <Celestial/><a className="hero-coordinate coordinate-sun" href="#chart"><span>☉</span> Bản đồ sao</a><a className="hero-coordinate coordinate-moon" href="#moon"><span>☽</span> Nhịp Mặt Trăng</a>
      </motion.div>
      <div className="cosmic-hero-foot"><span>01 — CÁNH CỬA ĐẦU TIÊN</span><a href="#zodiac">Đi theo sự tò mò ↓</a><span>AS ABOVE, SO WITHIN</span></div>
    </div>
  </section>;
}
