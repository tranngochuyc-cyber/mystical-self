import { Link } from 'react-router-dom';
import { relatedEntities } from '../../data/knowledge';

export function ExploreNext({ id, limit = 8 }: { id: string; limit?: number }) {
  const related = relatedEntities(id).slice(0, limit);
  return <div className="explore-next"><span className="eyebrow">NỐI SANG MỘT KHÁM PHÁ KHÁC</span><div>{related.map(({ entity, label }) => <Link key={entity.id} to={`/codex/${entity.id}`}><span style={{ color: entity.visual.color }}>{entity.symbol}</span><span><small>{label}</small>{entity.name}</span><span aria-hidden="true">↗</span></Link>)}</div></div>;
}
