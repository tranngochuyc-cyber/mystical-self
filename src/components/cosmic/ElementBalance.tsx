import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { elementColors, type Element } from '../../data/cosmos';
import { ExperienceSection } from './ExperienceSection';
import { ExploreNext } from './ExploreNext';
import { ZodiacMatrix } from './ZodiacMatrix';
import { entityById } from '../../data/knowledge';

const elements: { name: Element; symbol: string; action: string; question: string }[] = [
  { name: 'Lửa', symbol: '△', action: 'Bắt đầu', question: 'Một hành động nhỏ nào khiến bạn thấy mình chủ động hơn?' },
  { name: 'Đất', symbol: '◇', action: 'Xây nền', question: 'Thói quen nào giúp bạn có một điểm tựa vững vàng?' },
  { name: 'Khí', symbol: '○', action: 'Mở rộng', question: 'Bạn muốn dành không gian cho ý tưởng mới nào?' },
  { name: 'Nước', symbol: '≈', action: 'Lắng nghe', question: 'Cảm xúc nào cần được bạn gọi tên và đón nhận?' },
];
export function ElementBalance() {
  const [selected, setSelected] = useState(0);
  const element = elements[selected];
  const entity = entityById[`element-${['fire', 'earth', 'air', 'water'][selected]}`];
  return <ExperienceSection id="elements" className="elements-experience"><div className="container cosmic-split">
    <div className="element-compass"><svg className="element-connections" viewBox="0 0 400 400" aria-hidden="true"><path d={selected === 0 || selected === 2 ? 'M200 70Q330 200 200 330' : 'M70 200Q200 70 330 200'} fill="none" stroke={elementColors[element.name]} strokeWidth="1" strokeDasharray="5 6"/></svg><div className="element-compass-core" aria-hidden="true">{element.symbol}</div>{elements.map((e, i) => <button key={e.name} className={`element-point element-${i}`} style={{ color: elementColors[e.name] }} aria-pressed={selected === i} onClick={() => setSelected(i)}><span aria-hidden="true">{e.symbol}</span><strong>{e.name}</strong><small>{e.action}</small></button>)}<p className="element-pair-label">{selected === 0 || selected === 2 ? 'Lửa ↔ Khí' : 'Đất ↔ Nước'} · liên tưởng bổ sung</p></div>
    <div><div className="eyebrow">BỐN NGUYÊN TỐ · BỐN CÁCH TIẾP CẬN</div><h2>Bạn cần điều gì<br/>để <em>cân bằng?</em></h2><div className={`element-motif motif-${selected}`} aria-hidden="true"><i/><i/><i/></div><div className="element-reading" aria-live="polite"><h3 style={{ color: elementColors[element.name] }}>{element.name} — {element.action}</h3><p>{element.question}</p><div className="element-balance-pair"><span>+ {entity.metadata.strength}</span><span>↝ {entity.metadata.challenge}</span></div></div><ExploreNext id={entity.id} limit={4}/><Link className="text-link" to="/tool/element-personality">Khám phá qua sáu câu hỏi <ArrowRight size={18}/></Link><p className="cosmic-caption">Đường liên hệ là diễn giải biểu tượng, không phải phép đo mức tương hợp hay tỷ lệ nguyên tố cá nhân.</p></div>
  </div><div className="container"><ZodiacMatrix/></div></ExperienceSection>;
}
