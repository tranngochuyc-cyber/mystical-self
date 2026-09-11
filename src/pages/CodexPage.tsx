import { useState, type CSSProperties } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Search, X } from 'lucide-react';
import { activeCategories, categoryLabels, discover, entityById, knowledgeEntities, relatedEntities, type EntityType, type KnowledgeEntity } from '../data/knowledge';
import { EntityArtwork } from '../components/cosmic/EntityArtwork';
import { Constellation } from '../components/cosmic/Constellation';
import { HouseWheel } from '../components/cosmic/HouseExplorer';
import { ConnectionMap } from '../components/cosmic/ConnectionMap';
import { ExploreNext } from '../components/cosmic/ExploreNext';
import { ZodiacMatrix } from '../components/cosmic/ZodiacMatrix';

export default function CodexPage() {
  const { entityId } = useParams();
  if (!entityId) return <CodexIndex/>;
  const entity = entityById[entityId];
  if (!entity) return <div className="container page cosmos"><h1>Chưa tìm thấy mục này.</h1><Link className="button" to="/codex">Trở về Cosmic Codex</Link></div>;
  return <CodexEntry key={entity.id} entity={entity}/>;
}

function CodexIndex() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const rawCategory = params.get('category');
  const category = activeCategories.includes(rawCategory as EntityType) ? rawCategory as EntityType : 'all';
  const results = discover(query, category);
  function change(key: string, value: string) { const next = new URLSearchParams(params); if (value) next.set(key, value); else next.delete(key); setParams(next, { replace: true }); }
  return <div className="container page cosmos codex-page"><Link className="back-link" to="/"><ArrowLeft size={16}/> Trở về vũ trụ</Link><div className="codex-title"><div><div className="eyebrow">MỤC LỤC CỦA BẦU TRỜI BIỂU TƯỢNG</div><h1>Cosmic <em>Codex.</em></h1><p>Chọn một dấu hiệu. Lần theo những đường nối.</p></div><span className="codex-counter"><strong>41</strong> mục khám phá</span></div>
    <label className="search codex-search"><Search size={18}/><input aria-label="Tìm trong Cosmic Codex" placeholder="Thử Mars, Nước, House 8…" value={query} onChange={e => change('q', e.target.value)}/>{query && <button aria-label="Xóa tìm kiếm Codex" onClick={() => change('q', '')}><X size={18}/></button>}</label>
    <div className="codex-library"><nav className="codex-categories" aria-label="Danh mục Codex"><button aria-pressed={category === 'all'} onClick={() => change('category', '')}>Tất cả <span>{knowledgeEntities.length}</span></button>{activeCategories.map(type => <button aria-pressed={category === type} key={type} onClick={() => change('category', type)}>{categoryLabels[type]}<span>{knowledgeEntities.filter(e => e.type === type).length}</span></button>)}</nav>
      <div><p className="cosmic-caption" role="status">{results.length} mục · tìm cả tên và quan hệ liên quan</p><div className="codex-index">{results.map(entity => <Link to={`/codex/${entity.id}`} className="codex-index-entry" key={entity.id} style={{ '--entry-color': entity.visual.color } as CSSProperties}><div className="codex-thumb"><EntityArtwork entity={entity}/></div><div><small>{categoryLabels[entity.type]} · {entity.aliases[0]}</small><h2>{entity.name}</h2><p>{entity.description}</p></div><ArrowUpRight size={20}/></Link>)}</div>{!results.length && <div className="empty"><h2>Chưa tìm thấy đường nối này.</h2><p>Thử tên tiếng Việt, tiếng Anh hoặc bỏ bộ lọc.</p><button className="button" onClick={() => setParams({})}>Xem toàn bộ Codex</button></div>}</div>
    </div><p className="cosmic-caption">Chiêm tinh là hệ diễn giải biểu tượng. Các mục thiên văn được phân biệt riêng. <a href="/credits.txt" target="_blank" rel="noreferrer">Nguồn dữ liệu & ghi công ↗</a></p>
  </div>;
}

function CodexEntry({ entity }: { entity: KnowledgeEntity }) {
  const [view, setView] = useState<'profile' | 'connections'>('profile');
  const [planetLayer, setPlanetLayer] = useState<'astrology' | 'astronomy' | 'mythology'>('astrology');
  const related = relatedEntities(entity.id);
  return <div className="container page cosmos codex-page"><Link className="back-link" to="/codex"><ArrowLeft size={16}/> Mục lục Cosmic Codex</Link><div className="codex-entry-heading"><div><div className="eyebrow">{categoryLabels[entity.type]} · {entity.aliases[0]}</div><h1>{entity.name}</h1><p>{entity.description}</p></div><div className="cosmic-tabs" role="group" aria-label="Cách xem mục Codex"><button aria-pressed={view === 'profile'} onClick={() => setView('profile')}>Hồ sơ trực quan</button><button aria-pressed={view === 'connections'} onClick={() => setView('connections')}>Bản đồ liên kết ({related.length})</button></div></div>
    {view === 'connections' ? <ConnectionMap id={entity.id}/> : <div className="codex-entry-layout"><div className="codex-visual">{entity.type === 'house' ? <HouseWheel selected={entity.visual.index || 0}/> : <EntityArtwork entity={entity}/>}<p className="cosmic-caption">{entity.visual.atlas ? 'Artwork diễn giải nghệ thuật' : 'Sơ đồ học khái niệm, không phải dữ liệu lá số cá nhân'}</p>{entity.type === 'zodiac' && <Constellation index={entity.visual.index || 0}/>}</div>
      <div className="codex-entry-content"><div className="codex-keywords">{entity.keywords.map(keyword => <span key={keyword}>{keyword}</span>)}</div>
        {entity.type === 'planet' && <><div className="cosmic-tabs" role="group" aria-label="Phân biệt thiên văn và chiêm tinh">{([['astrology', 'Chiêm tinh'], ['astronomy', 'Thiên văn'], ['mythology', 'Thần thoại']] as const).map(([key, label]) => <button key={key} aria-pressed={planetLayer === key} onClick={() => setPlanetLayer(key)}>{label}</button>)}</div><p className="codex-layer-text" aria-live="polite">{planetLayer === 'astrology' ? entity.metadata.question : planetLayer === 'astronomy' ? entity.metadata.astronomy : entity.metadata.mythology}</p></>}
        {(entity.metadata.strength || entity.metadata.challenge) && <div className="codex-polarities"><div><span>+</span><h3>Nguồn lực</h3><p>{entity.metadata.strength}</p></div><div><span>↝</span><h3>Khoảng phát triển</h3><p>{entity.metadata.challenge}</p></div></div>}
        <div className="codex-relation-list">{related.map(({ entity: target, label }) => <Link to={`/codex/${target.id}`} key={target.id}><span style={{ color: target.visual.color }}>{target.symbol}</span><div><small>{label}</small><strong>{target.name}</strong></div><ArrowUpRight size={17}/></Link>)}</div>
        {entity.type === 'zodiac' && <details className="codex-deeper"><summary>Hình tượng & cách đọc liên hệ</summary><p>{entity.metadata.mythology}</p><p>Chủ tinh truyền thống và hiện đại là hai hệ quy chiếu. Liên tưởng nhà–cung không thay thế việc tính nhà trong lá số.</p></details>}
        {entity.type === 'house' && <p className="cosmic-caption">Nhà là lĩnh vực trải nghiệm, không đồng nhất với cung. Liên hệ cung phía trên là phép liên tưởng hiện đại. Chưa tính nhà cá nhân từ ngày, giờ, nơi sinh.</p>}
        {entity.metadata.question && entity.type !== 'planet' && <blockquote className="codex-question">{entity.metadata.question}</blockquote>}
        {entity.metadata.source && <a className="text-link" href={entity.metadata.source} target="_blank" rel="noreferrer">Đọc nguồn & tìm hiểu thêm ↗</a>}
      </div></div>}
    {entity.type === 'modality' && view === 'profile' && <ZodiacMatrix/>}
    <ExploreNext id={entity.id}/><div className="codex-footer-links"><Link to="/codex">Tiếp tục trong Codex</Link><Link to="/explore">Thử một công cụ tự khám phá ↗</Link></div>
  </div>;
}
