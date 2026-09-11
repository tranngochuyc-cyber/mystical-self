import { motion } from 'framer-motion';
import { constellationCodes, constellationLines } from '../../data/constellations';
import { zodiacSigns } from '../../data/cosmos';

export function Constellation({ index, compact = false }: { index: number; compact?: boolean }) {
  const lines = constellationLines[constellationCodes[index]];
  const reference = lines[0][0][0];
  const points = lines.flat();
  const dec = points.reduce((sum, p) => sum + p[1], 0) / points.length;
  const project = ([ra, latitude]: number[]) => [-((((ra - reference) % 360) + 540) % 360 - 180) * Math.cos(dec * Math.PI / 180), -latitude];
  const projected = lines.map(line => line.map(project));
  const flat = projected.flat();
  const xs = flat.map(p => p[0]), ys = flat.map(p => p[1]);
  const minX = Math.min(...xs), minY = Math.min(...ys);
  const width = Math.max(...xs) - minX, height = Math.max(...ys) - minY;
  const scale = Math.min(240 / Math.max(width, 1), 140 / Math.max(height, 1));
  const toView = ([x, y]: number[]) => [150 + (x - minX - width / 2) * scale, 95 + (y - minY - height / 2) * scale];
  const unique = [...new Map(flat.map(p => [p.join(','), p])).values()];
  return <figure className={`constellation-figure ${compact ? 'compact' : ''}`}><svg viewBox="0 0 300 190" role="img" aria-label={`Đường nối chòm sao ${zodiacSigns[index].latin} · sơ đồ phẳng đơn giản`}>
    {projected.map((line, i) => <motion.polyline key={`${index}-${i}`} points={line.map(p => toView(p).join(',')).join(' ')} fill="none" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .55 }}/>) }
    {unique.map(p => { const [x, y] = toView(p); return <g key={p.join(',')}><circle cx={x} cy={y} r="5" fill="currentColor" opacity=".12"/><circle cx={x} cy={y} r="2" fill="currentColor"/></g>; })}
  </svg>{!compact && <figcaption>Chòm sao {zodiacSigns[index].latin} · dữ liệu đường nối D3 Celestial. Cung chiêm tinh và chòm sao thiên văn là hai khái niệm khác nhau.</figcaption>}</figure>;
}
