import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { entityById, houseId, houseThemes } from '../../data/knowledge';
import { ExperienceSection } from './ExperienceSection';
import { ExploreNext } from './ExploreNext';

function point(angle: number, radius: number) { const a = angle * Math.PI / 180; return `${250 + radius * Math.cos(a)},${250 + radius * Math.sin(a)}`; }
export function HouseWheel({ selected, onSelect }: { selected: number; onSelect?: (index: number) => void }) {
  return <div className="house-wheel"><svg viewBox="0 0 500 500" aria-hidden="true">{houseThemes.map((_, index) => {
    const start = index * 30 - 105, end = start + 30;
    return <path key={index} d={`M${point(start, 225)} A225 225 0 0 1 ${point(end, 225)} L${point(end, 125)} A125 125 0 0 0 ${point(start, 125)}Z`} fill={selected === index ? '#dfbd8244' : '#dfbd8206'} stroke="#dfbd8255" strokeWidth="1"/>;
  })}<circle cx="250" cy="250" r="110" fill="none" stroke="#dfbd8233" strokeDasharray="2 8"/></svg>
    <div className="house-core"><span>NHÀ</span><strong>{selected + 1}</strong><span>{houseThemes[selected][0]}</span></div>
    {houseThemes.map(([theme], index) => { const angle = (index * 30 - 90) * Math.PI / 180; const style = { left: `${50 + 36 * Math.cos(angle)}%`, top: `${50 + 36 * Math.sin(angle)}%` }; return onSelect ? <button className="house-point" key={index} style={style} aria-label={`Nhà ${index + 1}: ${theme}`} aria-pressed={index === selected} onClick={() => onSelect(index)}>{index + 1}</button> : <span className={`house-point ${selected === index ? 'selected' : ''}`} key={index} style={style}>{index + 1}</span>; })}
  </div>;
}
export function HouseExplorer() {
  const [selected, setSelected] = useState(0);
  const house = entityById[houseId(selected)];
  return <ExperienceSection id="houses" className="house-experience"><div className="container"><div className="cosmic-heading"><div className="eyebrow">MƯỜI HAI LĨNH VỰC ĐỜI SỐNG</div><h2>Những căn phòng<br/>trong <em>một cuộc đời.</em></h2><p>Trong chiêm tinh, “nhà” là một vùng trải nghiệm: bản thân, quan hệ, công việc… Chọn một vùng để khám phá.</p></div><div className="cosmic-split"><div><HouseWheel selected={selected} onSelect={setSelected}/><div className="zodiac-step"><button className="icon-button" aria-label="Nhà trước" onClick={() => setSelected((selected + 11) % 12)}><ArrowLeft size={18}/></button><span>Nhà {selected + 1} / 12</span><button className="icon-button" aria-label="Nhà tiếp theo" onClick={() => setSelected((selected + 1) % 12)}><ArrowRight size={18}/></button></div></div><div className="cosmic-panel house-detail" aria-live="polite"><div className="eyebrow">HOUSE {selected + 1}</div><h3>{house.name}</h3><p>{house.description}</p><div className="house-keywords">{house.keywords.map(keyword => <span key={keyword}>{keyword}</span>)}</div><blockquote>{house.metadata.question}</blockquote><ExploreNext id={house.id}/><details><summary>Nhà có phải là cung hoàng đạo?</summary><p>Không. Liên hệ nhà–cung trong phần này là phép liên tưởng thường dùng trong chiêm tinh hiện đại. Nhà trong lá số thật cần giờ, địa điểm sinh và phương pháp chia nhà. Vòng chia đều ở đây dùng để học khái niệm.</p><a className="text-link" href="https://www.astro.com/astrowiki/en/House" target="_blank" rel="noreferrer">Tìm hiểu các hệ nhà · Astrodienst ↗</a></details></div></div></div></ExperienceSection>;
}
