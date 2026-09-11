import { useState } from 'react';
import { Link } from 'react-router-dom';
import { zodiacSigns, elementColors, type Element } from '../../data/cosmos';
import { modalityNames, zodiacId } from '../../data/knowledge';
const elementOrder: Element[] = ['Lửa', 'Đất', 'Khí', 'Nước'];
export function ZodiacMatrix() {
  const [selected, setSelected] = useState(0);
  const sign = zodiacSigns[selected];
  return <div className="zodiac-matrix-section"><div className="cosmic-heading"><div className="eyebrow">ĐỌC CẤU TRÚC HOÀNG ĐẠO</div><h2>Bốn nguyên tố.<br/><em>Ba cách chuyển động.</em></h2><p>Nguyên tố gợi cách biểu đạt. Tính chất — modality — gợi cách bắt đầu, duy trì hoặc thay đổi. Chọn một ô để nhìn mối liên hệ.</p></div>
    <div className="zodiac-matrix" role="table" aria-label="Ma trận nguyên tố và tính chất của 12 cung"><div className="matrix-row" role="row"><span role="columnheader">Tính chất</span>{elementOrder.map(element => <span role="columnheader" key={element} style={{ color: elementColors[element] }}>{element}</span>)}</div>
      {modalityNames.map((modality, row) => <div role="row" className="matrix-row" key={modality}><span role="rowheader"><strong>{modality}</strong><small>{['Khởi đầu', 'Duy trì', 'Thích nghi'][row]}</small></span>{elementOrder.map(element => {
        const index = zodiacSigns.findIndex((s, i) => s.element === element && i % 3 === row);
        const item = zodiacSigns[index];
        return <div role="cell" key={element}><button className={index === selected ? 'matrix-selected' : item.element === sign.element || index % 3 === selected % 3 ? 'matrix-related' : ''} aria-label={`${item.name}: ${element}, ${modality}`} aria-pressed={index === selected} onClick={() => setSelected(index)} style={{ color: elementColors[element] }}><span aria-hidden="true">{item.symbol}</span><strong>{item.name}</strong></button></div>;
      })}</div>)}
    </div><div className="matrix-summary" aria-live="polite"><span className="matrix-equation"><strong>{sign.symbol}</strong> {sign.name} <span>=</span> <span style={{ color: elementColors[sign.element] }}>{sign.element}</span> <span>+</span> {modalityNames[selected % 3]}</span><Link className="text-link" to={`/codex/${zodiacId(selected)}`}>Khám phá hồ sơ ↗</Link></div>
    <div className="modality-flow" aria-label="Ba cách vận động"><span>↗ <strong>Tiên phong</strong><small>Bắt đầu một hướng đi</small></span><span>◎ <strong>Kiên định</strong><small>Giữ nhịp và làm sâu</small></span><span>↝ <strong>Linh hoạt</strong><small>Điều chỉnh để chuyển tiếp</small></span></div>
  </div>;
}
