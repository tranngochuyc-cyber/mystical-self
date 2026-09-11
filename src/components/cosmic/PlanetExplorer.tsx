import { useRef, useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { planets } from '../../data/cosmos';
import { ExperienceSection } from './ExperienceSection';
import { entityById, planetId } from '../../data/knowledge';
import { EntityArtwork } from './EntityArtwork';
import { ExploreNext } from './ExploreNext';

export function PlanetExplorer() {
  const [selected, setSelected] = useState(0);
  const [view, setView] = useState<'astrology' | 'astronomy' | 'mythology'>('astrology');
  const strip = useRef<HTMLDivElement>(null);
  const planet = planets[selected];
  const entity = entityById[planetId(selected)];
  function choose(index: number) {
    const next = (index + planets.length) % planets.length;
    setSelected(next);
    strip.current?.children[next]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'instant' });
  }
  return <ExperienceSection id="planets" className="planet-experience"><div className="container">
    <div className="cosmic-heading"><div className="eyebrow">03 — NGÔN NGỮ CỦA THIÊN THỂ</div><h2>Mỗi quỹ đạo,<br/><em>một câu hỏi khác.</em></h2><p>Chạm một thiên thể để tìm hiểu vai trò biểu tượng của nó. Vuốt ngang để đi xa hơn.</p></div>
    <div className="planet-orbit" ref={strip} role="group" aria-label="Chọn thiên thể">{planets.map((p, i) => <button key={p.english} aria-pressed={selected === i} aria-controls="planet-detail" onClick={() => setSelected(i)} style={{ '--planet-color': p.color } as CSSProperties}><span className="planet-token" aria-hidden="true">{p.symbol}</span><span>{p.name}</span><small>{p.english}</small></button>)}</div>
    <div className="planet-controls"><button className="icon-button" aria-label="Thiên thể trước" onClick={() => choose(selected - 1)}><ArrowLeft size={18}/></button><span>{selected + 1} / 10</span><button className="icon-button" aria-label="Thiên thể tiếp theo" onClick={() => choose(selected + 1)}><ArrowRight size={18}/></button></div>
    <motion.div className="planet-detail cosmic-split" id="planet-detail" key={planet.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} aria-live="polite">
      <div className="planet-art-stage"><EntityArtwork entity={entity}/><span className="planet-art-label">{planet.symbol} · {planet.english}</span><p className="cosmic-caption">Minh họa nghệ thuật · không phải ảnh quan sát</p></div>
      <div><div className="cosmic-tabs" role="group" aria-label="Lớp thông tin thiên thể">{([['astrology', 'Chiêm tinh'], ['astronomy', 'Thiên văn'], ['mythology', 'Thần thoại']] as const).map(([key, label]) => <button key={key} aria-pressed={view === key} onClick={() => setView(key)}>{label}</button>)}</div><div className="planet-layer"><div className="eyebrow">{view === 'astronomy' ? planet.type : view === 'mythology' ? 'TRUYỀN THỐNG VĂN HÓA' : 'DIỄN GIẢI BIỂU TƯỢNG'}</div><h3>{planet.name}{view === 'astrology' ? ` — ${planet.theme}` : ''}</h3><p>{view === 'astrology' ? planet.message : view === 'astronomy' ? entity.metadata.astronomy : entity.metadata.mythology}</p></div><ExploreNext id={entity.id}/><a className="text-link" href={view === 'astronomy' ? 'https://science.nasa.gov/solar-system/planets/' : 'https://science.nasa.gov/resource/solar-system-symbols/'} target="_blank" rel="noreferrer">Nguồn về thiên thể & ký hiệu · NASA ↗</a></div>
    </motion.div>
  </div></ExperienceSection>;
}
