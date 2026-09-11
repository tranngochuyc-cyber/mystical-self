import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExperienceSection } from './ExperienceSection';
import { localToday } from '../../lib/engine';

const readings = [
  ['Một khoảng lặng', 'Chậm lại', 'Dành mười phút không thông báo để nhận ra điều mình cần.', 'Nước', 'Không phải mọi khoảng trống đều cần được lấp đầy.'],
  ['Bước đi đầu tiên', 'Chủ động', 'Chọn một việc nhỏ có thể làm trong hôm nay.', 'Lửa', 'Bạn không cần thấy cả con đường để đi một bước.'],
  ['Điều đang lớn lên', 'Bền bỉ', 'Ghi nhận một thói quen bạn đã duy trì.', 'Đất', 'Những điều bền vững thường lớn lên rất khẽ.'],
  ['Một góc nhìn khác', 'Tò mò', 'Hỏi thêm một câu trước khi kết luận.', 'Khí', 'Sự tò mò mở một cánh cửa mà sự chắc chắn có thể đóng lại.'],
  ['Sợi dây kết nối', 'Quan tâm', 'Nhắn một lời hỏi thăm chân thành tới người bạn quý.', 'Nước', 'Đôi khi một lời lắng nghe đã đủ.'],
  ['Chỗ cho niềm vui', 'Sáng tạo', 'Làm một điều bạn yêu thích mà không cần đánh giá kết quả.', 'Lửa', 'Niềm vui không phải phần thưởng cần phải kiếm được.'],
  ['Trở về nền tảng', 'Vững vàng', 'Chăm sóc bữa ăn, giấc ngủ hoặc góc sống của mình.', 'Đất', 'Một điểm tựa nhỏ cũng có thể thay đổi cả ngày.'],
];
export function DailyReading() {
  const [revealed, setRevealed] = useState(false);
  const date = localToday();
  const index = Math.floor(Date.parse(`${date}T12:00:00Z`) / 86400000) % readings.length;
  const [theme, energy, advice, element, message] = readings[index];
  return <ExperienceSection id="daily" className="daily-experience"><div className="container daily-layout"><div><div className="eyebrow">07 — MỘT KHOẢNG DÀNH CHO HÔM NAY</div><h2>Mở một thông điệp.<br/><em>Giữ một điều nhỏ.</em></h2><p>Mỗi ngày một gợi ý để tự quan sát. Hãy giữ lại điều phù hợp và bỏ qua điều không đồng điệu.</p><p className="cosmic-caption">Nội dung biên tập luân phiên theo ngày trên thiết bị; không dựa trên vận động thiên thể hay dự đoán vận may.</p></div>
    <div className="daily-portal">{!revealed ? <motion.button className="daily-seal" whileHover={{ scale: 1.025 }} whileTap={{ scale: .98 }} onClick={() => setRevealed(true)}><span aria-hidden="true">✧</span><small>{date.split('-').reverse().join('.')}</small><strong>Mở thông điệp hôm nay</strong><span className="daily-seal-line" aria-hidden="true"/></motion.button> : <motion.div className="daily-message" initial={{ opacity: 0, rotateY: -30 }} animate={{ opacity: 1, rotateY: 0 }} transition={{ duration: .5 }} aria-live="polite"><div className="eyebrow">{energy} · {element}</div><h3>{theme}</h3><blockquote>{message}</blockquote><p>{advice}</p><Link className="text-link" to="/profile">Trở về hồ sơ để viết suy ngẫm ↗</Link><button className="text-link" onClick={() => setRevealed(false)}>Khép thông điệp</button></motion.div>}</div>
  </div></ExperienceSection>;
}
