import { Link } from 'react-router-dom';
import { categoryLabels, entityById, relatedEntities } from '../../data/knowledge';

export function ConnectionMap({ id }: { id: string }) {
  const entity = entityById[id];
  const neighbors = relatedEntities(id);
  const positions = neighbors.map((_, i) => { const angle = (i / neighbors.length * 360 - 90) * Math.PI / 180; return { x: 50 + 35 * Math.cos(angle), y: 50 + 35 * Math.sin(angle) }; });
  return <div className="connection-map-wrap"><div className="connection-map" aria-label={`Bản đồ liên kết của ${entity.name}`}>
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{neighbors.map(({ entity: target, kind }, index) => <line key={target.id} x1="50" y1="50" x2={positions[index].x} y2={positions[index].y} stroke={kind === 'analogy' ? '#d2ae90' : target.visual.color} strokeDasharray={kind === 'analogy' ? '1 1' : undefined} strokeWidth=".16"/> )}<circle cx="50" cy="50" r="35" fill="none" stroke="#b6c7dc22" strokeWidth=".15" strokeDasharray=".3 1"/></svg>
    <div className="connection-center" style={{ borderColor: entity.visual.color }}><span>{entity.symbol}</span><strong>{entity.name}</strong><small>ĐANG KHÁM PHÁ</small></div>
    {neighbors.map(({ entity: target, label }, index) => <Link key={target.id} className="connection-node" style={{ left: `${positions[index].x}%`, top: `${positions[index].y}%`, borderColor: `${target.visual.color}88` }} to={`/codex/${target.id}`}><span style={{ color: target.visual.color }}>{target.symbol}</span><strong>{target.name}</strong><small>{label}</small></Link>)}
  </div><p className="cosmic-caption">Chạm một nút để đi sâu hơn. Đường liền: quan hệ phân loại hoặc chủ tinh. Đường đứt: liên tưởng nhà–cung hiện đại, không phải vị trí trong lá số cá nhân.</p><div className="connection-key"><span>{categoryLabels[entity.type]}</span><span>↔</span><span>{neighbors.length} kết nối để khám phá</span></div></div>;
}
