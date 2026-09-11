import { useState } from 'react';
import { Link } from 'react-router-dom';
import { knowledgeEntities, entityById, relatedEntities } from '../../data/knowledge';
const elements = knowledgeEntities.filter(e => e.type === 'element');
const modalities = knowledgeEntities.filter(e => e.type === 'modality');
const signs = knowledgeEntities.filter(e => e.type === 'zodiac');
const belongs = (id: string, target: string) => entityById[id].relationships.some(r => r.target === target);
export function ZodiacMatrix() {
  const [selected, setSelected] = useState(signs[0].id);
  const entity = entityById[selected];
  const highlighted = (id: string) => selected === id || (entity.type === 'zodiac' ? entity.relationships.some(r => ['element','modality'].includes(r.kind) && belongs(id,r.target)) : belongs(id, selected));
  return <section className="zodiac-matrix-section structure-matrix" aria-label="Nguyên tố và tính chất"><div className="cosmic-heading"><div className="eyebrow">4 NGUYÊN TỐ × 3 TÍNH CHẤT = 12 CUNG</div><h2>Bốn nguyên tố.<br/><em>Ba cách chuyển động.</em></h2><p>Nguyên tố gợi cách biểu đạt; tính chất gợi cách khởi đầu, duy trì hoặc thích nghi. Chọn tên hàng, cột hoặc một cung để lần theo mối liên hệ.</p></div>
    <div className="zodiac-matrix" role="table" aria-label="Ma trận 4 nguyên tố và 3 tính chất"><div className="matrix-row" role="row"><span role="columnheader">Nguyên tố ↓<br/>Tính chất →</span>{modalities.map(m => <div role="columnheader" key={m.id}><button aria-pressed={selected === m.id} onClick={()=>setSelected(m.id)} style={{color:m.visual.color}}><span>{m.symbol}</span><strong>{m.name}</strong></button></div>)}</div>
    {elements.map(element => <div className="matrix-row" role="row" key={element.id}><div role="rowheader"><button aria-pressed={selected === element.id} onClick={()=>setSelected(element.id)} style={{color:element.visual.color}}><span>{element.symbol}</span><strong>{element.name}</strong></button></div>{modalities.map(modality => { const sign = signs.find(s=>belongs(s.id,element.id)&&belongs(s.id,modality.id))!;return <div role="cell" key={modality.id}><button className={selected === sign.id ? 'matrix-selected' : highlighted(sign.id) ? 'matrix-related' : ''} aria-label={`${sign.name}: ${element.name}, ${modality.name}`} aria-pressed={selected === sign.id} onClick={()=>setSelected(sign.id)} style={{color:element.visual.color}}><span aria-hidden="true">{sign.symbol}</span><strong>{sign.name}</strong></button></div>;})}</div>)}
    </div><div className="matrix-summary" aria-live="polite"><div><h3 style={{color:entity.visual.color}}>{entity.symbol} {entity.name}</h3><p>{entity.shortDescription}</p><p>{entity.keywords.join(' · ')}</p><div className="matrix-links">{relatedEntities(entity.id).filter(r=>entity.type === 'zodiac' ? ['element','modality'].includes(r.kind) : r.entity.type === 'zodiac').map(r=><Link key={r.entity.id} to={`/codex/${r.entity.id}`}>{r.entity.symbol} {r.entity.name}</Link>)}</div></div><Link className="text-link" to={`/codex/${entity.id}`}>Khám phá hồ sơ ↗</Link></div>
    <p className="cosmic-caption">Các ô sáng cho thấy cùng nguyên tố hoặc tính chất trong hệ biểu tượng, không đánh giá tính cách hay độ hợp nhau.</p>
  </section>;
}
