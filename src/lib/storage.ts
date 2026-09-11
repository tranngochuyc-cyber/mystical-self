import type { Reading } from '../types';
import { tools } from '../data/content';
import { getSession, getRemoteReadings, createRemoteReading, updateRemoteReading, deleteRemoteReading, clearRemoteReadings, type Session } from './api';

const prefix = 'mystical-self:';
let issue = '';
let account: Session = { authenticated: false };
let readingsKey = 'readings';
let ready = false;
let syncQueue: Promise<void> = Promise.resolve();
export function storageIssue() { return issue; }
export function storeSession() { return { ...account, ready }; }
function announce() { window.dispatchEvent(new Event('storage')); }
function report(error: unknown) {
  issue = error instanceof Error ? `Chưa đồng bộ: ${error.message} Bản sao trên trình duyệt vẫn được giữ.` : 'Chưa đồng bộ được. Bản sao trên trình duyệt vẫn được giữ.';
  announce();
}
export function read<T>(key: string, fallback: T): T {
  try { const raw = localStorage.getItem(prefix + key); return raw ? JSON.parse(raw) : fallback; }
  catch { issue = 'Không thể đọc dữ liệu cục bộ. Dữ liệu cũ chưa bị xóa.'; return fallback; }
}
export function write(key: string, value: unknown) {
  try { localStorage.setItem(prefix + key, JSON.stringify(value)); return true; }
  catch { issue = 'Trình duyệt không cho phép lưu hoặc đã hết dung lượng. Kết quả hiện chỉ tồn tại trong phiên này.'; return false; }
}
export function validReadings(value: unknown): Reading[] {
  if (!Array.isArray(value)) return [];
  return value.filter((r): r is Reading => !!r && typeof r.id === 'string' && tools.some(t => t.slug === r.toolSlug) && typeof r.createdAt === 'string' && typeof r.result?.title === 'string' && typeof r.result?.details === 'string' && Array.isArray(r.result?.traits) && Array.isArray(r.result?.facts));
}
export function getReadings() { return validReadings(read<unknown>(readingsKey, [])); }
async function verifyAccount(id: string) {
  const current = await getSession();
  if (!current.authenticated || current.id !== id) throw new Error('Phiên đăng nhập đã thay đổi. Hãy tải lại trang.');
}
export function saveReadings(items: Reading[]) {
  const previous = getReadings();
  const ok = write(readingsKey, items);
  if (!ready || !account.authenticated || !account.id) return ok;
  const accountId = account.id;
  // Send only explicit changes; never delete the account to save one reading.
  const previousById = new Map(previous.map(r => [r.id, r]));
  const nextIds = new Set(items.map(r => r.id));
  const additions = items.filter(r => !previousById.has(r.id));
  const changes = items.flatMap(r => {
    const old = previousById.get(r.id);
    if (!old) return [];
    const patch: Partial<Pick<Reading, 'saved' | 'addedToProfile'>> = {};
    if (old.saved !== r.saved) patch.saved = r.saved;
    if (old.addedToProfile !== r.addedToProfile) patch.addedToProfile = r.addedToProfile;
    return Object.keys(patch).length ? [{ id: r.id, patch }] : [];
  });
  const deleted = previous.filter(r => !nextIds.has(r.id));
  syncQueue = syncQueue.then(async () => {
    await verifyAccount(accountId);
    for (const reading of additions) await createRemoteReading(reading);
    for (const change of changes) await updateRemoteReading(change.id, change.patch);
    for (const reading of deleted) await deleteRemoteReading(reading.id);
  }).catch(report);
  return ok;
}
export async function clearData() {
  try {
    await syncQueue;
    if (account.authenticated && account.id) {
      await verifyAccount(account.id);
      await clearRemoteReadings();
    }
    // Keep cached readings belonging to other accounts.
    for (const key of [readingsKey, `${readingsKey}:recovery`, 'notes', 'drafts', 'recent', 'saved', 'profile']) localStorage.removeItem(prefix + key);
    issue = '';
    announce();
    return true;
  } catch (error) { report(error); return false; }
}
if (typeof window !== 'undefined' && window.location.protocol.startsWith('http')) {
  void (async () => {
    try {
      account = await getSession();
      if (account.authenticated && account.id) {
        readingsKey = `account:${account.id}:readings`;
        const remote = await getRemoteReadings();
        const cached = getReadings();
        if (cached.length) write(`${readingsKey}:recovery`, cached);
        write(readingsKey, validReadings(remote));
      }
    } catch {
      // Vite-only preview has no API. Guest readings remain on this device.
      if (account.authenticated) issue = 'Máy chủ chưa sẵn sàng. Đang dùng bản sao của tài khoản trên trình duyệt.';
    } finally { ready = true; announce(); }
  })();
  void fetch('/api/content', { credentials: 'include' }).then(async response => response.ok ? await response.json() : null).then((remote: unknown) => {
    if (!Array.isArray(remote)) return;
    for (const item of remote) {
      if (!item || typeof item.slug !== 'string') continue;
      const local = tools.find(tool => tool.slug === item.slug);
      if (!local) continue;
      for (const key of ['name', 'description', 'category', 'color', 'input', 'method'] as const) if (typeof item[key] === 'string') local[key] = item[key];
      if (typeof item.minutes === 'number') local.minutes = item.minutes;
    }
    announce();
  }).catch(() => {});
}
