export type ToolSlug = 'numerology' | 'tarot' | 'lunar-profile' | 'dream-interpretation' | 'birth-chart' | 'element-personality' | 'chinese-zodiac' | 'spirit-animal' | 'fantasy-archetype';
export interface Tool { slug: ToolSlug; name: string; description: string; category: string; color: string; icon: string; input: string; minutes: number; kind: 'date' | 'quiz' | 'tarot' | 'dream'; method: string }
export interface Result { title: string; subtitle: string; symbol: string; traits: string[]; details: string; strength: string; growth: string; reflection: string; facts: { label: string; value: string }[] }
export interface Reading { id: string; toolSlug: ToolSlug; createdAt: string; inputSummary: string; result: Result; saved: boolean; addedToProfile: boolean }
export interface Inputs { name?: string; date?: string; time?: string; place?: string; question?: string; spread?: string; dream?: string; emotion?: string; symbols?: string; answers?: number[] }
