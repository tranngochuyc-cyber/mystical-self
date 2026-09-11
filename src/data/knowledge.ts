import { elementColors, planets, zodiacSigns, type Element } from './cosmos';

export type EntityType = 'zodiac' | 'planet' | 'house' | 'element' | 'modality' | 'mythology' | 'kingdom' | 'character' | 'faction' | 'artifact' | 'creature' | 'story' | 'event';
export type RelationshipKind = 'element' | 'modality' | 'traditional-ruler' | 'modern-ruler' | 'analogy' | 'complement';
export interface Relationship { target: string; kind: RelationshipKind; label: string }
export interface KnowledgeEntity {
  id: string; type: EntityType; name: string; aliases: string[]; symbol: string; description: string;
  keywords: string[]; relationships: Relationship[];
  visual: { color: string; atlas?: 'zodiac' | 'planet'; index?: number };
  metadata: { strength?: string; challenge?: string; astronomy?: string; mythology?: string; question?: string; source?: string; fantasyId?: string };
}
export const categoryLabels: Partial<Record<EntityType, string>> = { zodiac: 'Hoàng đạo', planet: 'Thiên thể', house: 'Nhà', element: 'Nguyên tố', modality: 'Tính chất' };
export const activeCategories: EntityType[] = ['zodiac', 'planet', 'house', 'element', 'modality'];
const elementIds: Record<Element, string> = { Lửa: 'fire', Đất: 'earth', Khí: 'air', Nước: 'water' };
export const modalityIds = ['cardinal', 'fixed', 'mutable'];
export const modalityNames = ['Tiên phong', 'Kiên định', 'Linh hoạt'];
export const zodiacId = (index: number) => `zodiac-${zodiacSigns[index].latin.toLowerCase()}`;
export const planetId = (index: number) => `planet-${planets[index].english.toLowerCase()}`;
export const houseId = (index: number) => `house-${index + 1}`;
export const rulers = [4, 3, 2, 1, 0, 2, 3, 4, 5, 6, 6, 5];
export const modernRulers: Record<number, number> = { 7: 9, 10: 7, 11: 8 };
export const houseThemes = [
  ['Bản thân', 'Cách bắt đầu và hiện diện', 'Ấn tượng đầu', 'Chủ động', 'Bạn muốn hiện diện với người khác như thế nào?'],
  ['Giá trị', 'Nguồn lực và điều đáng giữ', 'Sở hữu', 'Tự trọng', 'Điều gì có giá trị với bạn ngoài tiền bạc?'],
  ['Giao tiếp', 'Học hỏi trong đời sống gần gũi', 'Trao đổi', 'Môi trường gần', 'Bạn học được gì từ một cuộc trò chuyện gần đây?'],
  ['Cội rễ', 'Gia đình và nền tảng riêng', 'Nhà', 'Ký ức', 'Bạn muốn tạo cảm giác thuộc về ở đâu?'],
  ['Sáng tạo', 'Niềm vui và sự biểu đạt', 'Vui chơi', 'Cảm hứng', 'Bạn muốn tạo ra điều gì chỉ vì thích nó?'],
  ['Thói quen', 'Chăm sóc và công việc thường ngày', 'Nhịp sống', 'Phục vụ', 'Thói quen nào giúp ngày của bạn nhẹ hơn?'],
  ['Quan hệ', 'Hợp tác giữa hai người', 'Đồng hành', 'Thỏa thuận', 'Bạn muốn mang điều gì vào một mối quan hệ?'],
  ['Chia sẻ', 'Nguồn lực chung và sự chuyển đổi', 'Niềm tin', 'Buông bỏ', 'Bạn đang học cách tin tưởng điều gì?'],
  ['Tầm nhìn', 'Niềm tin và khám phá xa hơn', 'Học sâu', 'Hành trình', 'Điều gì vừa mở rộng thế giới của bạn?'],
  ['Định hướng', 'Vai trò và đóng góp xã hội', 'Trách nhiệm', 'Mục tiêu', 'Bạn muốn được ghi nhận vì điều gì?'],
  ['Cộng đồng', 'Bạn bè và hy vọng chung', 'Kết nối', 'Tương lai', 'Bạn muốn góp sức cho cộng đồng nào?'],
  ['Khoảng lặng', 'Nghỉ ngơi và đời sống bên trong', 'Chiêm nghiệm', 'Buông lỏng', 'Bạn cần một khoảng riêng cho điều gì?'],
];
const symbols = ['Cừu đực', 'Bò đực', 'Cặp song sinh', 'Cua', 'Sư tử', 'Thiếu nữ & bông lúa', 'Cán cân', 'Bọ cạp', 'Người bắn cung', 'Dê biển', 'Người mang nước', 'Đôi cá'];
const planetMyths = ['Hình tượng Mặt Trời gắn với ánh sáng và nguồn sống trong nhiều truyền thống.', 'Hình tượng Mặt Trăng gắn với nhịp thời gian và chu kỳ trong nhiều truyền thống.', 'Mercury: vị thần đưa tin trong truyền thống La Mã.', 'Venus: nữ thần tình yêu trong truyền thống La Mã.', 'Mars: vị thần chiến tranh trong truyền thống La Mã.', 'Jupiter: vị thần tối cao trong truyền thống La Mã.', 'Saturn: vị thần gắn với nông nghiệp trong truyền thống La Mã.', 'Uranus: tên vị thần bầu trời trong truyền thống Hy Lạp.', 'Neptune: vị thần biển cả trong truyền thống La Mã.', 'Pluto: vị thần cõi âm trong truyền thống La Mã.'];

const zodiacs: KnowledgeEntity[] = zodiacSigns.map((sign, index) => ({
  id: zodiacId(index), type: 'zodiac', name: sign.name, aliases: [sign.latin], symbol: sign.symbol,
  description: sign.theme, keywords: [sign.element, modalityNames[index % 3], symbols[index]],
  visual: { color: elementColors[sign.element], atlas: 'zodiac', index },
  metadata: { strength: sign.strength, challenge: sign.growth, question: sign.reflection, mythology: `Hình tượng ${symbols[index].toLowerCase()} trong truyền thống hoàng đạo. Artwork là diễn giải nghệ thuật, không phải hình ảnh thiên văn.`, source: 'https://www.astro.com/astrowiki/en/Zodiac' },
  relationships: [
    { target: `element-${elementIds[sign.element]}`, kind: 'element', label: 'Thuộc nguyên tố' },
    { target: `modality-${modalityIds[index % 3]}`, kind: 'modality', label: 'Có tính chất' },
    { target: planetId(rulers[index]), kind: 'traditional-ruler', label: 'Chủ tinh truyền thống' },
    ...(modernRulers[index] === undefined ? [] : [{ target: planetId(modernRulers[index]), kind: 'modern-ruler' as const, label: 'Chủ tinh hiện đại' }]),
    { target: houseId(index), kind: 'analogy', label: 'Liên tưởng nhà · hiện đại' },
  ],
}));
const planetary: KnowledgeEntity[] = planets.map((p, index) => ({
  id: planetId(index), type: 'planet', name: p.name, aliases: [p.english], symbol: p.symbol,
  description: p.theme, keywords: p.theme.split(' & '), relationships: [], visual: { color: p.color, atlas: 'planet', index },
  metadata: { astronomy: `${p.name} được phân loại là ${p.type.toLowerCase()}. Sơ đồ này không thể hiện quỹ đạo hoặc vị trí hiện tại.`, mythology: planetMyths[index], question: p.message, source: 'https://science.nasa.gov/resource/solar-system-symbols/' },
}));
const houses: KnowledgeEntity[] = houseThemes.map(([theme, area, one, two, question], index) => ({
  id: houseId(index), type: 'house', name: `Nhà ${index + 1} · ${theme}`, aliases: [`House ${index + 1}`, theme], symbol: String(index + 1),
  description: area, keywords: [one, two], visual: { color: '#c5b78f', index },
  metadata: { question, source: 'https://www.astro.com/astrowiki/en/House' },
  relationships: [],
}));
const elements: KnowledgeEntity[] = (['Lửa', 'Đất', 'Khí', 'Nước'] as Element[]).map((name, index) => ({
  id: `element-${elementIds[name]}`, type: 'element', name, aliases: [elementIds[name]], symbol: ['△', '◇', '○', '≈'][index],
  description: ['Khơi động và biểu đạt', 'Xây nền và duy trì', 'Kết nối và suy nghĩ', 'Cảm nhận và thích nghi'][index],
  keywords: [['Can đảm', 'Nhiệt thành'], ['Bền bỉ', 'Thực tế'], ['Tò mò', 'Trao đổi'], ['Đồng cảm', 'Trực giác']][index],
  relationships: index < 2 ? [{ target: `element-${index === 0 ? 'air' : 'water'}`, kind: 'complement', label: 'Bổ sung trong hệ biểu tượng' }] : [],
  visual: { color: elementColors[name] },
  metadata: { strength: ['Khởi động hành động mới.', 'Tạo điểm tựa cho ý tưởng.', 'Mở rộng cách nhìn.', 'Nhận ra sắc thái cảm xúc.'][index], challenge: ['Chậm lại để nghe.', 'Đón nhận thay đổi.', 'Biến ý tưởng thành việc làm.', 'Giữ ranh giới cá nhân.'][index], source: 'https://www.astro.com/astrowiki/en/Element' },
}));
const modalities: KnowledgeEntity[] = modalityIds.map((id, index) => ({
  id: `modality-${id}`, type: 'modality', name: modalityNames[index], aliases: [id], symbol: ['↗', '◎', '↝'][index],
  description: ['Khởi đầu một hướng đi', 'Duy trì và làm sâu', 'Điều chỉnh và chuyển tiếp'][index], keywords: [['Bắt đầu', 'Chủ động'], ['Giữ nhịp', 'Cam kết'], ['Thích nghi', 'Chuyển đổi']][index], relationships: [],
  visual: { color: ['#dfbd82', '#9cc6ba', '#bba6df'][index] }, metadata: { source: 'https://www.astro.com/astrowiki/en/Quadruplicities' },
}));
export const knowledgeEntities = [...zodiacs, ...planetary, ...houses, ...elements, ...modalities];
export const entityById = Object.assign(Object.create(null), Object.fromEntries(knowledgeEntities.map(entity => [entity.id, entity]))) as Record<string, KnowledgeEntity>;
export function relatedEntities(id: string) {
  const entity = entityById[id];
  if (!entity) return [];
  const outgoing = entity.relationships.map(r => ({ entity: entityById[r.target], kind: r.kind, label: r.label }));
  const incoming = knowledgeEntities.flatMap(other => other.relationships.filter(r => r.target === id).map(r => ({ entity: other, kind: r.kind, label: r.kind === 'analogy' ? 'Liên tưởng cung · hiện đại' : r.kind.includes('ruler') ? r.label : 'Cùng hệ phân loại' })));
  return [...outgoing, ...incoming].filter(r => !!r.entity);
}
export function normalizeSearch(text: string) { return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLowerCase(); }
export function discover(query: string, category: EntityType | 'all' = 'all') {
  const term = normalizeSearch(query.trim());
  return knowledgeEntities.filter(entity => (category === 'all' || entity.type === category) && (!term || normalizeSearch([entity.name, ...entity.aliases, ...entity.keywords, ...relatedEntities(entity.id).flatMap(r => [r.entity.name, ...r.entity.aliases])].join(' ')).includes(term)));
}
