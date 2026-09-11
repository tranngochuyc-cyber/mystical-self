import { useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { zodiacSigns, elementColors } from '../../data/cosmos';
import { ExperienceSection } from './ExperienceSection';
import { Constellation } from './Constellation';
import { EntityArtwork } from './EntityArtwork';
import { ExploreNext } from './ExploreNext';
import { entityById, zodiacId } from '../../data/knowledge';
import { Link } from 'react-router-dom';

export function ZodiacExplorer({ initialSelected = 0 }: { initialSelected?: number }) {
  const [selected, setSelected] = useState(initialSelected);
  const [hovered, setHovered] = useState<number | null>(null);
  const [relationship, setRelationship] = useState<'element' | 'modality' | 'opposition'>('element');
  const sign = zodiacSigns[selected];
  const entity = entityById[zodiacId(selected)];
  const classification = (index: number, kind: 'element' | 'modality') => entityById[zodiacId(index)].relationships.find(r => r.kind === kind)!.target;
  const preview = zodiacSigns[hovered ?? selected];
  const choose = (index: number) => setSelected((index + 12) % 12);
  const related = (index: number) => index !== selected && (relationship === 'opposition' ? index === (selected + 6) % 12 : classification(index, relationship) === classification(selected, relationship));
  return <ExperienceSection id="zodiac" className="zodiac-experience"><div className="container">
    <div className="cosmic-heading"><div className="eyebrow">02 — MƯỜI HAI SẮC THÁI</div><h2>Một vòng hoàng đạo.<br/><em>Muôn cách nhìn mình.</em></h2><p>Chọn một biểu tượng trên vòng tròn. Không cần biết cung của mình để bắt đầu khám phá.</p></div>
    <div className="cosmic-tabs wheel-filter" role="group" aria-label="Kiểu quan hệ hoàng đạo">{([['element', 'Cùng nguyên tố'], ['modality', 'Cùng tính chất'], ['opposition', 'Đối diện']] as const).map(([value, label]) => <button key={value} aria-pressed={relationship === value} onClick={() => setRelationship(value)}>{label}</button>)}</div>
    <div className="cosmic-split"><div>
      <div className="zodiac-wheel" style={{ '--element-color': elementColors[preview.element] } as CSSProperties}>
        <svg className="wheel-lines" viewBox="0 0 500 500" aria-hidden="true"><g fill="none" stroke="currentColor"><circle cx="250" cy="250" r="211"/><circle cx="250" cy="250" r="164"/><circle cx="250" cy="250" r="144" strokeDasharray="1 8"/>{zodiacSigns.map((_, i) => { const a = (i * 30 - 105) * Math.PI / 180; return <line key={i} x1={250 + 144 * Math.cos(a)} y1={250 + 144 * Math.sin(a)} x2={250 + 235 * Math.cos(a)} y2={250 + 235 * Math.sin(a)}/>; })}</g></svg>
        <svg className="wheel-connections" viewBox="0 0 500 500" aria-hidden="true">{zodiacSigns.map((_, index) => { if (!related(index)) return null; const a = (selected * 30 - 90) * Math.PI / 180, b = (index * 30 - 90) * Math.PI / 180; return <line key={index} x1={250 + 195 * Math.cos(a)} y1={250 + 195 * Math.sin(a)} x2={250 + 195 * Math.cos(b)} y2={250 + 195 * Math.sin(b)} stroke="currentColor" opacity=".45" strokeDasharray={relationship === 'opposition' ? '5 6' : undefined}/>; })}</svg>
        <div className="zodiac-core zodiac-core-constellation"><Constellation index={hovered ?? selected} compact/><strong>{preview.name}</strong><small>{preview.element} · {entityById[classification(hovered ?? selected, 'modality')].name}</small></div>
        <div role="group" aria-label="Chọn một trong 12 cung">{zodiacSigns.map((item, index) => {
          const angle = (index * 30 - 90) * Math.PI / 180;
          return <button key={item.latin} className={`zodiac-point ${related(index) ? 'related' : ''}`} style={{ left: `${50 + 40 * Math.cos(angle)}%`, top: `${50 + 40 * Math.sin(angle)}%` }} aria-label={item.name} aria-pressed={selected === index} title={item.name} aria-controls="zodiac-detail" onKeyDown={e => { const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0; const next = e.key === 'Home' ? 0 : e.key === 'End' ? 11 : (index + delta + 12) % 12; if (delta || e.key === 'Home' || e.key === 'End') { e.preventDefault(); choose(next); e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('button')[next].focus(); } }} onClick={() => choose(index)} onPointerEnter={e => { if (e.pointerType === 'mouse') setHovered(index); }} onPointerLeave={() => setHovered(null)} onFocus={() => setHovered(index)} onBlur={() => setHovered(null)}><span>{item.symbol}</span></button>;
        })}</div>
      </div><label className="zodiac-mobile-select">Chọn cung theo tên<select value={selected} onChange={e => { choose(Number(e.target.value)); setHovered(null); }}>{zodiacSigns.map((item, index) => <option key={item.latin} value={index}>{item.symbol} {item.name}</option>)}</select></label><div className="zodiac-step"><button className="icon-button" aria-label="Cung trước" onClick={() => choose(selected - 1)}><ArrowLeft size={18}/></button><span>{selected + 1} / 12 · {sign.name}</span><button className="icon-button" aria-label="Cung tiếp theo" onClick={() => choose(selected + 1)}><ArrowRight size={18}/></button></div>
      <p className="cosmic-caption wheel-legend">Nút vàng: cung đang chọn · Viền sáng và đường nối: {relationship === 'element' ? 'cùng nguyên tố' : relationship === 'modality' ? 'cùng tính chất' : 'đối diện trên vòng cung'}. Không biểu thị độ hợp nhau.</p>
    </div><motion.div id="zodiac-detail" className="cosmic-panel zodiac-detail" key={sign.name} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .25 }} aria-live="polite">
      <EntityArtwork entity={entityById[zodiacId(selected)]} className="zodiac-detail-art"/>
      <div className="eyebrow">{sign.latin} · {sign.dates}</div><h3><span aria-hidden="true">{sign.symbol} </span>{sign.name}</h3><p className="zodiac-theme">{sign.theme}</p>
      <dl className="cosmic-facts zodiac-relationships">{entity.relationships.filter(r => r.kind !== 'analogy').map(r => <div key={r.kind}><dt>{r.label}</dt><dd><Link to={`/codex/${r.target}`}>{entityById[r.target].symbol} {entityById[r.target].name}</Link></dd></div>)}</dl>
      <div className="zodiac-traits" aria-label="Từ khóa">{entity.keywords.map(word => <span key={word}>{word}</span>)}</div>
      <dl className="zodiac-strengths"><div><dt>Nguồn lực</dt><dd>{entity.metadata.strength}</dd></div><div><dt>Thử thách</dt><dd>{entity.metadata.challenge}</dd></div></dl>
      <details><summary>Hiểu nhanh các mối liên hệ</summary><dl className="zodiac-terms"><div><dt>Nguyên tố · Element</dt><dd>Cách biểu đạt trong hệ biểu tượng: Lửa, Đất, Khí hoặc Nước.</dd></div><div><dt>Tính chất · Modality</dt><dd>Cách khởi đầu, duy trì hoặc thích nghi.</dd></div><div><dt>Chủ tinh · Ruling planet</dt><dd>Thiên thể gắn với cung theo truyền thống chiêm tinh; trường phái hiện đại có thể dùng thêm chủ tinh.</dd></div><div><dt>Nhà · House</dt><dd>Lĩnh vực đời sống. Liên hệ cung–nhà ở đây là liên tưởng hiện đại, không phải vị trí nhà trong lá số của bạn.</dd></div></dl></details>
      <details><summary>Kết nối với những sắc thái khác</summary><p>Cùng nguyên tố: {zodiacSigns.filter((_, i) => i !== selected && classification(i, 'element') === classification(selected, 'element')).map(s => s.name).join(', ')}. Đây là liên hệ trong hệ biểu tượng, không xác định sự phù hợp giữa hai người.</p><a className="text-link" href="#compatibility">Khám phá cách kết nối <ArrowRight size={16}/></a></details>
      <Link className="button" to={`/codex/${zodiacId(selected)}`}>Mở hồ sơ {sign.name} <ArrowRight size={17}/></Link><ExploreNext id={zodiacId(selected)}/><p className="cosmic-caption">Mốc ngày theo quy ước gần đúng. Mở hồ sơ để xem chòm sao, chủ tinh truyền thống/hiện đại và liên hệ nhà.</p>
    </motion.div></div>
  </div></ExperienceSection>;
}
