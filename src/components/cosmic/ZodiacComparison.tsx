import { Link } from 'react-router-dom';
import { entityById, modalityNames, zodiacId } from '../../data/knowledge';
import { zodiacSigns } from '../../data/cosmos';
import { EntityArtwork } from './EntityArtwork';

export function ZodiacComparison({ first, second }: { first: number; second: number }) {
  const a = zodiacSigns[first], b = zodiacSigns[second];
  const rows = [['Nguyên tố', a.element, b.element], ['Tính chất', modalityNames[first % 3], modalityNames[second % 3]], ['Chủ tinh', a.ruler, b.ruler], ['Nguồn lực', a.strength, b.strength], ['Thử thách', a.growth, b.growth]];
  return <div className="zodiac-comparison"><div className="comparison-art-row"><div><EntityArtwork entity={entityById[zodiacId(first)]}/><Link to={`/codex/${zodiacId(first)}`}>{a.name} ↗</Link></div><span>↔</span><div><EntityArtwork entity={entityById[zodiacId(second)]}/><Link to={`/codex/${zodiacId(second)}`}>{b.name} ↗</Link></div></div><div className="comparison-table" role="table" aria-label={`So sánh ${a.name} và ${b.name}`}><div className="comparison-row comparison-head" role="row"><span role="columnheader">{a.name}</span><span role="columnheader">Góc nhìn</span><span role="columnheader">{b.name}</span></div>{rows.map(([label, left, right]) => <div className="comparison-row" role="row" key={label}><span role="cell">{left}</span><strong role="rowheader">{label}</strong><span role="cell">{right}</span></div>)}</div><p className="cosmic-caption">So sánh diễn giải biểu tượng, không phải đo tính cách hay dự đoán mối quan hệ.</p></div>;
}
