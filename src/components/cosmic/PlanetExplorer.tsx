import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { planets } from '../../data/cosmos';
import { ExperienceSection } from './ExperienceSection';
import { entityById, planetId, relatedEntities } from '../../data/knowledge';
import { EntityArtwork } from './EntityArtwork';
import { ExploreNext } from './ExploreNext';
import { Link } from 'react-router-dom';

export function PlanetExplorer({ initialSelected = 0 }: { initialSelected?: number }) {
  const [selected, setSelected] = useState(initialSelected);
  const [view, setView] = useState<'astrology' | 'astronomy' | 'mythology'>('astrology');
  const strip = useRef<HTMLDivElement>(null);
  const planet = planets[selected];
  const entity = entityById[planetId(selected)];
  useEffect(() => {
    const node = strip.current;
    if (!node) return;
    const observer = new ResizeObserver(() => {
      const button = node.children[selected] as HTMLElement | undefined;
      if (button) node.scrollLeft = button.offsetLeft - node.offsetLeft - (node.clientWidth - button.clientWidth) / 2;
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [selected]);
  function choose(index: number) {
    const next = (index + planets.length) % planets.length;
    setSelected(next);
    strip.current?.children[next]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'instant' });
  }
  return <ExperienceSection id="planets" className="planet-experience"><div className="container">
    <div className="cosmic-heading"><div className="eyebrow">03 — NGÔN NGỮ CỦA THIÊN THỂ</div><h2>Mỗi quỹ đạo,<br/><em>một câu hỏi khác.</em></h2><p>Chạm một thiên thể để tìm hiểu vai trò biểu tượng của nó. Vuốt ngang để đi xa hơn.</p></div>
    <p className="cosmic-caption">Mặt Trời là ngôi sao, Mặt Trăng là vệ tinh của Trái Đất. Chiêm tinh gọi hai thiên thể này là hai nguồn sáng (luminaries). Dải dưới là lối khám phá biểu tượng, không phải mô hình quỹ đạo hay tỉ lệ thực.</p>
    <div className="planet-orbit" ref={strip} role="group" aria-label="Chọn thiên thể">{planets.map((p, i) => <button key={p.english} aria-pressed={selected === i} aria-controls="planet-detail" onClick={() => choose(i)} onKeyDown={e => { const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; const next = e.key === 'Home' ? 0 : e.key === 'End' ? planets.length - 1 : (i + delta + planets.length) % planets.length; if (delta || e.key === 'Home' || e.key === 'End') { e.preventDefault(); choose(next); (strip.current?.children[next] as HTMLButtonElement)?.focus(); } }} style={{ '--planet-color': p.color } as CSSProperties}><span className="planet-token" aria-hidden="true">{p.symbol}</span><span>{p.name}</span><small>{p.english}</small></button>)}</div>
    <div className="planet-controls"><button className="icon-button" aria-label="Thiên thể trước" onClick={() => choose(selected - 1)}><ArrowLeft size={18}/></button><span aria-live="polite">{selected + 1} / 10 · {planet.name}</span><button className="icon-button" aria-label="Thiên thể tiếp theo" onClick={() => choose(selected + 1)}><ArrowRight size={18}/></button></div>
    <motion.div className="planet-detail cosmic-split" id="planet-detail" key={planet.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} aria-live="polite">
      <div className="planet-art-stage"><EntityArtwork entity={entity}/><span className="planet-art-label">{planet.symbol} · {planet.english}</span><p className="cosmic-caption">Minh họa nghệ thuật · không phải ảnh quan sát</p></div>
      <div><header className="planet-identity"><div className="eyebrow">{planet.english} · {planet.type}</div><h3><span aria-hidden="true">{entity.symbol} </span>{entity.name}</h3><ul aria-label="Từ khóa thiên thể">{entity.keywords.map(word => <li key={word}>{word}</li>)}</ul></header><div className="cosmic-tabs" role="group" aria-label="Lớp thông tin thiên thể">{([['astrology', 'Chiêm tinh'], ['astronomy', 'Thiên văn'], ['mythology', 'Thần thoại']] as const).map(([key, label]) => <button key={key} aria-pressed={view === key} onClick={() => setView(key)}>{label}</button>)}</div><div className="planet-layer"><div className="eyebrow">{view === 'astronomy' ? 'THIÊN VĂN · THÔNG TIN KHOA HỌC' : view === 'mythology' ? 'THẦN THOẠI · TRUYỀN THỐNG VĂN HÓA' : 'CHIÊM TINH · DIỄN GIẢI BIỂU TƯỢNG'}</div><h4>{view === 'astrology' ? entity.shortDescription : view === 'astronomy' ? planet.type : 'Bối cảnh biểu tượng'}</h4><p>{view === 'astrology' ? planet.message : view === 'astronomy' ? entity.metadata.astronomy : entity.metadata.mythology}</p>{view === 'astrology' && <div className="planet-rulership"><p>Chủ tinh (rulership) là mối liên hệ biểu tượng giữa thiên thể và cung, không phải tác động khoa học đã được xác nhận.</p><ul>{relatedEntities(entity.id).filter(r => r.kind === 'traditional-ruler' || r.kind === 'modern-ruler').map(r => <li key={r.entity.id}><Link to={`/codex/${r.entity.id}`}>{r.entity.symbol} {r.entity.name}</Link><small>{r.kind === 'traditional-ruler' ? 'Chủ tinh truyền thống' : 'Chủ tinh hiện đại'}</small></li>)}</ul></div>}</div><ExploreNext id={entity.id}/>{view !== 'astrology' && <a className="text-link" href={view === 'astronomy' ? 'https://science.nasa.gov/solar-system/planets/' : 'https://science.nasa.gov/resource/solar-system-symbols/'} target="_blank" rel="noreferrer">{view === 'astronomy' ? 'Tham khảo phân loại thiên thể · NASA ↗' : 'Tham khảo lịch sử ký hiệu · NASA ↗'}</a>}</div>
    </motion.div>
  </div></ExperienceSection>;
}
