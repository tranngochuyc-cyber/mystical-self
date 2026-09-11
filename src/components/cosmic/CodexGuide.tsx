import type { EntityType } from '../../data/knowledge';
const explanations: Partial<Record<EntityType, [string,string]>> = {
 zodiac: ['Cung hoàng đạo · HOW', 'Phong cách biểu đạt trong hệ chiêm tinh. Mốc ngày quy ước chỉ cho cung Mặt Trời gần đúng; cung không đồng nhất với chòm sao thiên văn.'],
 planet: ['Thiên thể · WHAT', 'Chức năng biểu tượng trong chiêm tinh. Mặt Trời là ngôi sao, Mặt Trăng là vệ tinh; cách nhóm ở đây không thay đổi phân loại thiên văn.'],
 house: ['Nhà · WHERE', 'Lĩnh vực đời sống. Vòng chia đều là sơ đồ học; nhà trong lá số cần giờ, địa điểm sinh và phương pháp chia nhà.'],
 element: ['Nguyên tố · Cách biểu đạt', 'Lửa, Đất, Khí, Nước là bốn nhóm biểu tượng; mỗi nhóm gồm ba cung. Đây không phải thành phần vật chất hay phép đo tính cách.'],
 modality: ['Tính chất · Cách vận động', 'Tiên phong: bắt đầu; Kiên định: duy trì; Linh hoạt: thích nghi. Mỗi nhóm gồm bốn cung, mỗi nguyên tố một cung.'],
};
export function CodexGuide({type}:{type:EntityType}) {
 const entry=explanations[type];
 return <details className="codex-guide"><summary>Đọc mục này như thế nào?</summary>{entry&&<><h3>{entry[0]}</h3><p>{entry[1]}</p></>}<dl><div><dt>Chiêm tinh</dt><dd>Diễn giải biểu tượng để học hỏi, tự suy ngẫm.</dd></div><div><dt>Thiên văn</dt><dd>Phân loại và thông tin khoa học về thiên thể.</dd></div><div><dt>Thần thoại</dt><dd>Truyện tích, truyền thống văn hóa và lịch sử biểu tượng.</dd></div></dl><p>Chủ tinh: thiên thể gắn với cung theo một trường phái. Nhãn truyền thống/hiện đại phân biệt hai hệ quy chiếu. Liên tưởng nhà–cung không có nghĩa hai mục là một.</p><p>Chọn “Bản đồ liên kết” để xem lý do nối; chọn một nút để đưa mục đó vào tâm.</p></details>;
}
