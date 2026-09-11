import { entityById, knowledgeEntities, relatedEntities } from '../data/knowledge';

export const identityRoles = [
  { key: 'sun', label: 'Sun', symbol: '☉', title: 'Bản sắc cốt lõi', explanation: 'Biểu tượng về bản sắc và cách biểu đạt ý chí trong chiêm tinh.', prompt: 'Điều gì khiến bạn cảm thấy đang sống đúng với mình?' },
  { key: 'moon', label: 'Moon', symbol: '☽', title: 'Thế giới bên trong', explanation: 'Biểu tượng cảm xúc, nhu cầu riêng và cảm giác thân thuộc trong chiêm tinh.', prompt: 'Bạn thường tìm sự an tâm ở đâu?' },
  { key: 'rising', label: 'Rising', symbol: '↑', title: 'Cách bước vào thế giới', explanation: 'Cách tiếp cận thế giới bên ngoài theo diễn giải chiêm tinh truyền thống.', prompt: 'Bạn muốn mang điều gì vào một cuộc gặp gỡ mới?' },
] as const;
export type IdentityRole = typeof identityRoles[number]['key'];
export type IdentitySelection = Record<IdentityRole, string>;
// Manual provenance is explicit. A future calculated profile needs its own validated
// provider contract; never promote these self-selected signs to calculated positions.
export interface CosmicProfile { version: 1; source: 'manual'; selections: IdentitySelection }
export const identitySigns = knowledgeEntities.filter(e => e.type === 'zodiac');
export function validCosmicProfile(value: unknown): value is CosmicProfile {
  if (!value || typeof value !== 'object') return false;
  const p = value as Partial<CosmicProfile>;
  return p.version === 1 && p.source === 'manual' && !!p.selections && identityRoles.every(r => typeof p.selections?.[r.key] === 'string' && entityById[p.selections[r.key]]?.type === 'zodiac');
}
export function createCosmicProfile(selections: IdentitySelection): CosmicProfile | null {
  const profile = { version: 1, source: 'manual', selections: { ...selections } } as const;
  return validCosmicProfile(profile) ? profile : null;
}
const elementPoetry: Record<string, { adjective: string; affinity: string; invitation: string }> = {
  'element-fire': { adjective: 'Solar', affinity: 'Ánh lửa', invitation: 'Cho một ý tưởng đủ không gian để bừng sáng; cũng dành thời gian nghe phản hồi.' },
  'element-earth': { adjective: 'Rooted', affinity: 'Mạch đất', invitation: 'Chọn một việc nhỏ để xây nền; để lại chỗ cho những thay đổi ngoài dự tính.' },
  'element-air': { adjective: 'Sky', affinity: 'Gió trời', invitation: 'Theo một câu hỏi mới; thử biến một điều học được thành hành động cụ thể.' },
  'element-water': { adjective: 'Deep', affinity: 'Thủy triều', invitation: 'Lắng nghe một cảm xúc đang có mặt; nhớ giữ khoảng riêng và ranh giới của mình.' },
};
const modalityPoetry: Record<string, { noun: string; meaning: string }> = {
  'modality-cardinal': { noun: 'Pioneer', meaning: 'người mở lối' },
  'modality-fixed': { noun: 'Keeper', meaning: 'người gìn giữ' },
  'modality-mutable': { noun: 'Wanderer', meaning: 'người khám phá' },
};
export function deriveCosmicIdentity(profile: CosmicProfile) {
  if (!validCosmicProfile(profile)) throw new Error('Hồ sơ cần đủ ba cung hợp lệ.');
  const placements = identityRoles.map(role => ({ ...role, sign: entityById[profile.selections[role.key]], connections: relatedEntities(profile.selections[role.key]) }));
  function balance(type: 'element' | 'modality') {
    return knowledgeEntities.filter(e => e.type === type).map(entity => ({ entity, count: placements.filter(p => p.connections.some(r => r.kind === type && r.entity.id === entity.id)).length }));
  }
  const elements = balance('element');
  const modalities = balance('modality');
  function dominant(rows: typeof elements, type: 'element' | 'modality') {
    const max = Math.max(...rows.map(r => r.count));
    const tied = rows.filter(r => r.count === max);
    // Ties use role order (Sun, Moon, Rising), not random or dataset order.
    return placements.flatMap(p => p.connections.filter(r => r.kind === type).map(r => r.entity)).find(e => tied.some(t => t.entity.id === e.id))!;
  }
  const element = dominant(elements, 'element');
  const modality = dominant(modalities, 'modality');
  const poetry = elementPoetry[element.id];
  const mode = modalityPoetry[modality.id];
  return { placements, elements, modalities, element, modality,
    archetype: { name: `The ${poetry.adjective} ${mode.noun}`, affinity: poetry.affinity, description: `Hình tượng ${mode.meaning} mang sắc thái ${element.name.toLowerCase()}. Đây là lời mời tưởng tượng từ tổ hợp bạn chọn, không phải kết luận về tính cách.`, invitation: poetry.invitation },
  };
}
