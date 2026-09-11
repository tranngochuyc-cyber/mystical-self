import { useState } from 'react';
import { motion } from 'framer-motion';
import { zodiacSigns } from '../../data/cosmos';
import { ExperienceSection } from './ExperienceSection';
import { ZodiacComparison } from './ZodiacComparison';

const dimensions = ['Tình cảm', 'Giao tiếp', 'Cảm xúc', 'Năng lượng', 'Đường dài'];
const prompts = [
  'Mỗi người cảm thấy được yêu thương qua hành động nào? Hãy hỏi trực tiếp thay vì đoán từ cung hoàng đạo.',
  'Thử nói “mình đang cần…” và để người kia kể lại điều họ vừa nghe. Cả hai đã hiểu cùng một ý chưa?',
  'Khi một người cần yên tĩnh còn người kia cần trò chuyện, hai bạn có thể thống nhất cách báo hiệu nào?',
  'Chọn một hoạt động mới và một khoảng nghỉ chung. Nhịp nào khiến cả hai thấy thoải mái?',
  'Mỗi người hãy viết một giá trị quan trọng và một điều có thể linh hoạt. Hai danh sách gặp nhau ở đâu?',
];

export function CompatibilityExperience() {
  const [a, setA] = useState(0), [b, setB] = useState(6);
  const [revealed, setRevealed] = useState(false), [dimension, setDimension] = useState(0);
  const first = zodiacSigns[a], second = zodiacSigns[b];
  function change(side: 'a' | 'b', value: string) { (side === 'a' ? setA : setB)(Number(value)); setRevealed(false); }
  return <ExperienceSection id="compatibility" className="compatibility-experience"><div className="container">
    <div className="cosmic-heading"><div className="eyebrow">06 — HAI THẾ GIỚI GẶP NHAU</div><h2>Không cần giống nhau<br/>để <em>thấu hiểu nhau.</em></h2><p>Chọn hai cung và mở một cuộc trò chuyện về cách kết nối. Đây là trải nghiệm suy ngẫm, không chấm điểm độ hợp nhau.</p></div>
    <div className="compatibility-stage"><svg viewBox="0 0 800 160" preserveAspectRatio="none" aria-hidden="true"><motion.path d="M120 80 300 25 500 135 680 80M120 80H680M120 80 300 135 500 25 680 80" fill="none" stroke="#db9eae" strokeWidth="1" animate={{ opacity: revealed ? .7 : .15, pathLength: revealed ? 1 : .25 }} transition={{ duration: .7 }}/></svg>
      {([['a', a, first], ['b', b, second]] as const).map(([side, index, sign]) => <div className="compatibility-person" key={side}><motion.div className="compatibility-symbol" animate={{ x: revealed ? (side === 'a' ? 10 : -10) : 0 }} aria-hidden="true">{sign.symbol}</motion.div><label className="field"><span>{side === 'a' ? 'Cung thứ nhất' : 'Cung thứ hai'}</span><select value={index} onChange={e => change(side, e.target.value)}>{zodiacSigns.map((s, i) => <option key={s.name} value={i}>{s.name}</option>)}</select></label></div>)}
    </div><div className="actions centered"><button className="button primary" onClick={() => setRevealed(true)}>Khám phá sự kết nối ✧</button></div>
    {revealed && <ZodiacComparison first={a} second={b}/>}
    {revealed && <motion.div className="compatibility-result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} aria-live="polite"><div className="eyebrow">{first.name} + {second.name} · GỢI Ý BIÊN TẬP</div><h3>{first.element === second.element ? `Cùng sắc thái ${first.element.toLowerCase()}, mỗi người một cách thể hiện.` : `${first.element} gặp ${second.element.toLowerCase()} — hai góc nhìn cùng hiện diện.`}</h3><p>{first.name}: {first.theme.toLowerCase()}. {second.name}: {second.theme.toLowerCase()}. Những liên tưởng này có giống trải nghiệm thật của hai bạn không?</p><div className="cosmic-tabs" role="group" aria-label="Góc nhìn kết nối">{dimensions.map((label, i) => <button key={label} aria-pressed={dimension === i} onClick={() => setDimension(i)}>{label}</button>)}</div><p className="compatibility-prompt">{prompts[dimension]}</p></motion.div>}
  </div></ExperienceSection>;
}
