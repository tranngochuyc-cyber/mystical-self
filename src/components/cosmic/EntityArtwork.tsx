import type { KnowledgeEntity } from '../../data/knowledge';

export function EntityArtwork({ entity, className = '' }: { entity: KnowledgeEntity; className?: string }) {
  const { atlas, index = 0 } = entity.visual;
  if (!atlas) return <div className={`entity-glyph ${className}`} style={{ color: entity.visual.color }} aria-hidden="true">{entity.symbol}</div>;
  const columns = atlas === 'zodiac' ? 4 : 5;
  const rows = atlas === 'zodiac' ? 3 : 2;
  return <div className={`entity-artwork ${className}`} role="img" aria-label={`Minh họa nghệ thuật ${entity.name}`}>
    <img src={`/art/${atlas}-atlas.webp`} alt="" loading="lazy" decoding="async" style={{ width: `${columns * 100}%`, height: `${rows * 100}%`, left: `${-(index % columns) * 100}%`, top: `${-Math.floor(index / columns) * 100}%` }}/>
  </div>;
}
