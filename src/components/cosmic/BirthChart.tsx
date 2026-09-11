import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { zodiacSigns } from '../../data/cosmos';
import { ExperienceSection } from './ExperienceSection';

export function BirthChartDiagram({ sunSign }: { sunSign?: string }) {
  const selected = zodiacSigns.findIndex(s => s.name === sunSign);
  return <figure className="birth-chart-figure"><svg className="cosmic-diagram" viewBox="0 0 500 500" role="img" aria-label={sunSign ? `Sơ đồ đánh dấu cung Mặt Trời gần đúng ${sunSign}, không thể hiện vị trí hành tinh` : 'Sơ đồ cấu trúc bản đồ sao minh họa, không phải lá số cá nhân'}>
    <g fill="none" stroke="currentColor" strokeOpacity=".4">{[225, 205, 155, 140].map((r, i) => <motion.circle key={r} cx="250" cy="250" r={r} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: .8, delay: i * .1 }}/>)}</g>
    {zodiacSigns.map((sign, index) => {
      const a = (index * 30 - 90) * Math.PI / 180, boundary = a - Math.PI / 12;
      return <g key={sign.name}><line x1={250 + 140 * Math.cos(boundary)} y1={250 + 140 * Math.sin(boundary)} x2={250 + 225 * Math.cos(boundary)} y2={250 + 225 * Math.sin(boundary)} stroke="currentColor" strokeOpacity=".3"/>
        {selected === index && <circle cx={250 + 180 * Math.cos(a)} cy={250 + 180 * Math.sin(a)} r="23" fill="#dfbd8233"/>}
        <text x={250 + 180 * Math.cos(a)} y={250 + 180 * Math.sin(a) + 9} fontSize="28" textAnchor="middle">{sign.symbol}</text>
      </g>;
    })}
    {!sunSign && <g fill="none" stroke="#97b9da" strokeOpacity=".45" strokeDasharray="5 7"><motion.path d="M250 120 362 315 137 315Z M137 315 340 152 250 380 160 152 362 315" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: .3 }}/></g>}
    <circle cx="250" cy="250" r="70" fill="#101827" stroke="#dfbd8244"/><text x="250" y="246" textAnchor="middle" fontSize="32">{sunSign ? '☉' : '✧'}</text><text x="250" y="275" textAnchor="middle" fontSize="13">{sunSign ? 'GẦN ĐÚNG' : 'MINH HỌA'}</text>
  </svg><figcaption className="cosmic-caption">{sunSign ? 'Vùng cung được đánh dấu theo ngày quy ước; chưa có độ số, nhà hay góc chiếu cá nhân.' : 'Sơ đồ mẫu để đọc cấu trúc: vòng hoàng đạo và các đường nối minh họa. Không phải kết quả tính toán.'}</figcaption></figure>;
}

export function BirthChartExperience() {
  return <ExperienceSection id="chart" className="chart-experience"><div className="container cosmic-split"><div className="cosmic-panel"><div className="eyebrow">04 — ĐỌC BẢN ĐỒ CỦA BẠN</div><h2>Một thời điểm.<br/><em>Nhiều câu chuyện.</em></h2><p>Bắt đầu từ ngày, giờ và nơi sinh. Bản hiện tại giúp bạn tìm cung Mặt Trời gần đúng và lưu góc nhìn này vào hồ sơ.</p><dl className="chart-capabilities"><div><dt>☉ Mặt Trời</dt><dd>Tra theo ngày quy ước · có thể lệch ở ngày chuyển cung</dd></div><div><dt>☽ Mặt Trăng</dt><dd>Chưa tính cung — cần lịch thiên văn</dd></div><div><dt>ASC · Cung Mọc</dt><dd>Chưa tính — cần tọa độ và múi giờ lịch sử</dd></div></dl><Link className="button primary" to="/tool/birth-chart">Tạo hồ sơ bầu trời cơ bản <ArrowRight size={18}/></Link></div><BirthChartDiagram/></div></ExperienceSection>;
}
