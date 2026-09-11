import { useEffect, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { lunar } from '../../lib/engine';
import { moonPhases, moonPrompts } from '../../data/cosmos';
import { ExperienceSection } from './ExperienceSection';

const synodicMonth = 29.530588853;
function utc7Date(date: Date) { return new Date(date.getTime() + 7 * 3600000).toISOString().slice(0, 10); }

export function MoonVisual({ age }: { age: number }) {
  const id = useId();
  const phase = age / synodicMonth;
  // Orthographic light/shadow diagram: one lit semicircle plus/minus the terminator ellipse.
  const waxing = phase < .5;
  const cosine = Math.cos(phase * Math.PI * 2);
  const rx = Math.abs(cosine) * 100;
  return <svg className="moon-diagram" viewBox="0 0 300 300" role="img" aria-label="Sơ đồ phần sáng của Mặt Trăng, hướng minh họa nhìn từ Bắc bán cầu">
    <defs><radialGradient id={`${id}-light`}><stop stopColor="#f4f0df"/><stop offset="1" stopColor="#bacbda"/></radialGradient></defs>
    <circle cx="150" cy="150" r="140" fill="none" stroke="#bed7f133" strokeDasharray="1 8"/>
    <circle cx="150" cy="150" r="118" fill="none" stroke="#bed7f122"/>
    <circle cx="150" cy="150" r="100" fill="#1b293e"/>
    <path d={waxing ? 'M150 50 A100 100 0 0 1 150 250Z' : 'M150 50 A100 100 0 0 0 150 250Z'} fill={`url(#${id}-light)`}/>
    <ellipse cx="150" cy="150" rx={rx} ry="100" fill={cosine >= 0 ? '#1b293e' : `url(#${id}-light)`}/>
    <circle cx="150" cy="150" r="100" fill="none" stroke="#bdd6e755"/>
  </svg>;
}

export function MoonExperience() {
  const [today, setToday] = useState(() => utc7Date(new Date()));
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const refresh = () => setToday(utc7Date(new Date()));
    const timer = window.setInterval(refresh, 60000);
    document.addEventListener('visibilitychange', refresh);
    return () => { clearInterval(timer); document.removeEventListener('visibilitychange', refresh); };
  }, []);
  const date = new Date(`${today}T12:00:00+07:00`);
  date.setUTCDate(date.getUTCDate() + offset);
  const selectedDate = utc7Date(date);
  const moon = lunar(selectedDate);
  return <ExperienceSection id="moon" className="moon-experience"><div className="container cosmic-split">
    <div className="moon-stage"><MoonVisual age={moon.age}/><p className="cosmic-caption">Ánh sáng thay đổi. Bạn cũng được phép đổi nhịp.</p></div>
    <div className="cosmic-panel"><div className="eyebrow">05 — NHỊP MẶT TRĂNG</div><h2>{offset === 0 ? 'Dưới ánh trăng' : 'Một nhịp trăng'}<br/><em>{offset === 0 ? 'hôm nay.' : 'khác.'}</em></h2>
      <div aria-live="polite"><h3>{moonPhases[moon.phase]}</h3><dl className="cosmic-facts"><div><dt>Chiếu sáng ước tính</dt><dd>{moon.illumination}%</dd></div><div><dt>Tuổi trăng</dt><dd>{moon.age.toFixed(1)} ngày</dd></div><div><dt>Ngày · lúc 12:00 UTC+7</dt><dd>{selectedDate.split('-').reverse().join('.')}</dd></div></dl><p>{moonPrompts[moon.phase]}</p></div>
      <label className="moon-timeline"><span>Khám phá 29 ngày tiếp theo <strong>+{offset} ngày</strong></span><input aria-label="Ngày trong chu kỳ Mặt Trăng" type="range" min="0" max="29" step="1" value={offset} onChange={e => setOffset(Number(e.target.value))}/></label>
      <div className="actions"><button className="button" disabled={offset === 0} onClick={() => setOffset(0)}>Về hôm nay</button><Link className="text-link" to="/tool/lunar-profile">Nhịp trăng ngày sinh <ArrowRight size={17}/></Link></div>
      <p className="cosmic-caption">Ước tính theo chu kỳ trung bình, không phải lịch thiên văn chính xác. Lời gợi ý là nội dung suy ngẫm, không phải tác động được đo lường của Mặt Trăng.</p><a className="text-link" href="https://science.nasa.gov/moon/moon-phases/" target="_blank" rel="noreferrer">Vì sao Mặt Trăng đổi pha? · NASA ↗</a>
    </div>
  </div></ExperienceSection>;
}
