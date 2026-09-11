import { useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { zodiacSigns, elementColors } from '../../data/cosmos';
import { ExperienceSection } from './ExperienceSection';
import { Constellation } from './Constellation';
import { EntityArtwork } from './EntityArtwork';
import { ExploreNext } from './ExploreNext';
import { entityById, zodiacId, modalityNames } from '../../data/knowledge';
import { Link } from 'react-router-dom';

export function ZodiacExplorer() {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [relationship, setRelationship] = useState<'element' | 'modality' | 'opposition'>('element');
  const sign = zodiacSigns[selected];
  const preview = zodiacSigns[hovered ?? selected];
  const choose = (index: number) => setSelected((index + 12) % 12);
  const related = (index: number) => index !== selected && (relationship === 'element' ? zodiacSigns[index].element === sign.element : relationship === 'modality' ? index % 3 === selected % 3 : index === (selected + 6) % 12);
  return <ExperienceSection id="zodiac" className="zodiac-experience"><div className="container">
    <div className="cosmic-heading"><div className="eyebrow">02 — MƯỜI HAI SẮC THÁI</div><h2>Một vòng hoàng đạo.<br/><em>Muôn cách nhìn mình.</em></h2><p>Chọn một biểu tượng trên vòng tròn. Không cần biết cung của mình để bắt đầu khám phá.</p></div>
    <div className="cosmic-tabs wheel-filter" role="group" aria-label="Kiểu quan hệ hoàng đạo">{([['element', 'Cùng nguyên tố'], ['modality', 'Cùng tính chất'], ['opposition', 'Đối diện']] as const).map(([value, label]) => <button key={value} aria-pressed={relationship === value} onClick={() => setRelationship(value)}>{label}</button>)}</div>
    <div className="cosmic-split"><div>
      <div className="zodiac-wheel" style={{ '--element-color': elementColors[preview.element] } as CSSProperties}>
        <svg className="wheel-lines" viewBox="0 0 500 500" aria-hidden="true"><g fill="none" stroke="currentColor"><circle cx="250" cy="250" r="211"/><circle cx="250" cy="250" r="164"/><circle cx="250" cy="250" r="144" strokeDasharray="1 8"/>{zodiacSigns.map((_, i) => { const a = (i * 30 - 105) * Math.PI / 180; return <line key={i} x1={250 + 144 * Math.cos(a)} y1={250 + 144 * Math.sin(a)} x2={250 + 235 * Math.cos(a)} y2={250 + 235 * Math.sin(a)}/>; })}</g></svg>
        <svg className="wheel-connections" viewBox="0 0 500 500" aria-hidden="true">{zodiacSigns.map((_, index) => { if (!related(index)) return null; const a = (selected * 30 - 90) * Math.PI / 180, b = (index * 30 - 90) * Math.PI / 180; return <line key={index} x1={250 + 195 * Math.cos(a)} y1={250 + 195 * Math.sin(a)} x2={250 + 195 * Math.cos(b)} y2={250 + 195 * Math.sin(b)} stroke="currentColor" opacity=".45" strokeDasharray={relationship === 'opposition' ? '5 6' : undefined}/>; })}</svg>
        <div className="zodiac-core zodiac-core-constellation"><Constellation index={hovered ?? selected} compact/><strong>{preview.latin}</strong><small>{preview.element} · {modalityNames[(hovered ?? selected) % 3]}</small></div>
        <div role="group" aria-label="Chọn một trong 12 cung">{zodiacSigns.map((item, index) => {
          const angle = (index * 30 - 90) * Math.PI / 180;
          return <button key={item.latin} className={`zodiac-point ${related(index) ? 'related' : ''}`} style={{ left: `${50 + 40 * Math.cos(angle)}%`, top: `${50 + 40 * Math.sin(angle)}%` }} aria-label={item.name} aria-pressed={selected === index} aria-controls="zodiac-detail" onClick={() => choose(index)} onPointerEnter={e => { if (e.pointerType === 'mouse') setHovered(index); }} onPointerLeave={() => setHovered(null)} onFocus={() => setHovered(index)} onBlur={() => setHovered(null)}><span>{item.symbol}</span></button>;
        })}</div>
      </div><div className="zodiac-step"><button className="icon-button" aria-label="Cung trước" onClick={() => choose(selected - 1)}><ArrowLeft size={18}/></button><span>{selected + 1} / 12 · {sign.name}</span><button className="icon-button" aria-label="Cung tiếp theo" onClick={() => choose(selected + 1)}><ArrowRight size={18}/></button></div>
      <p className="cosmic-caption wheel-legend">Nút vàng: cung đang chọn · Viền sáng và đường nối: {relationship === 'element' ? 'cùng nguyên tố' : relationship === 'modality' ? 'cùng tính chất' : 'đối diện trên vòng cung'}. Không biểu thị độ hợp nhau.</p>
    </div><motion.div id="zodiac-detail" className="cosmic-panel zodiac-detail" key={sign.name} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .25 }} aria-live="polite">
      <EntityArtwork entity={entityById[zodiacId(selected)]} className="zodiac-detail-art"/>
      <div className="eyebrow">{sign.latin} · {sign.dates}</div><h3>{sign.name}</h3><p className="zodiac-theme">{sign.theme}</p>
      <dl className="cosmic-facts"><div><dt>Nguyên tố</dt><dd style={{ color: elementColors[sign.element] }}>{sign.element}</dd></div><div><dt>Chủ tinh · biểu tượng</dt><dd>{sign.ruler}</dd></div></dl>
      <div className="zodiac-traits"><span>{modalityNames[selected % 3]}</span><span>{sign.theme}</span></div>
      <details><summary>Nguồn lực & thử thách</summary><p>{sign.strength}</p><p>{sign.growth}</p></details>
      <details><summary>Kết nối với những sắc thái khác</summary><p>Cùng nguyên tố: {zodiacSigns.filter(s => s.element === sign.element && s.name !== sign.name).map(s => s.name).join(', ')}. Đây là liên hệ trong hệ biểu tượng, không xác định sự phù hợp giữa hai người.</p><a className="text-link" href="#compatibility">Khám phá cách kết nối <ArrowRight size={16}/></a></details>
      <Link className="button" to={`/codex/${zodiacId(selected)}`}>Mở hồ sơ {sign.name} <ArrowRight size={17}/></Link><ExploreNext id={zodiacId(selected)} limit={3}/><p className="cosmic-caption">Mốc ngày theo quy ước gần đúng. Mở hồ sơ để xem chòm sao, chủ tinh truyền thống/hiện đại và liên hệ nhà.</p>
    </motion.div></div>
  </div></ExperienceSection>;
}
