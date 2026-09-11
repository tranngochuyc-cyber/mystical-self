import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, LockKeyhole, RotateCcw, Save } from 'lucide-react';
import { entityById, type AstrologyEntity } from '../../data/knowledge';
import { createCosmicProfile, deriveCosmicIdentity, identityRoles, identitySigns, type CosmicProfile, type IdentitySelection } from '../../lib/cosmicIdentity';
import { loadCosmicProfile, resetCosmicProfile, saveCosmicProfile } from '../../lib/cosmicProfileStorage';
import './cosmicIdentity.css';

const empty: IdentitySelection = { sun: '', moon: '', rising: '' };
function EntityLink({ entity }: { entity: AstrologyEntity }) { return <Link to={`/codex/${entity.id}`}>{entity.symbol} {entity.name} <ArrowUpRight size={14}/></Link>; }

export function CosmicIdentity() {
  const [initial] = useState(loadCosmicProfile);
  const [profile, setProfile] = useState<CosmicProfile | null>(initial.profile);
  const [draft, setDraft] = useState<IdentitySelection>(initial.profile?.selections ?? empty);
  const [editing, setEditing] = useState(!initial.profile);
  const [saved, setSaved] = useState(!!initial.profile);
  const [message, setMessage] = useState(initial.invalid ? 'Bản lưu không hợp lệ nên chưa thể mở. Dữ liệu cũ được giữ cho đến khi bạn lưu hoặc đặt lại hồ sơ.' : '');
  const [error, setError] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const changedView = useRef(false);
  useEffect(() => { if (changedView.current) heading.current?.focus({ preventScroll: true }); }, [editing]);
  const identity = profile ? deriveCosmicIdentity(profile) : null;
  function generate(event: React.FormEvent) {
    event.preventDefault();
    const next = createCosmicProfile(draft);
    if (!next) { setError('Hãy chọn đủ Sun, Moon và Rising trước khi tạo hồ sơ.'); document.getElementById(`identity-${identityRoles.find(r => !draft[r.key])?.key || 'sun'}`)?.focus(); return; }
    setProfile(next); setSaved(false); setEditing(false); changedView.current = true; setError(''); setMessage('Hồ sơ mới chưa được lưu. Chọn Lưu hồ sơ để giữ trên trình duyệt này.');
  }
  function reset() {
    if (!resetCosmicProfile()) { setError('Chưa thể xóa bản lưu. Hãy kiểm tra quyền lưu trữ của trình duyệt rồi thử lại.'); return; }
    setProfile(null); setDraft({ ...empty }); setSaved(false); setEditing(true); changedView.current = true; setConfirmReset(false); setError(''); setMessage('Đã đặt lại Cosmic Profile. Kết quả công cụ và ghi chép của bạn được giữ nguyên.');
  }
  return <section className="cosmic-identity" aria-labelledby="identity-heading">
    <header className="identity-heading"><div className="eyebrow">{editing ? 'DISCOVER YOUR COSMIC IDENTITY' : 'YOUR COSMIC IDENTITY'}</div><h2 id="identity-heading" ref={heading} tabIndex={-1}>{editing ? <>Ba biểu tượng.<br/><em>Một góc nhìn của bạn.</em></> : <>Chân dung <em>giữa các vì sao.</em></>}</h2><p className="identity-provenance">Manual profile / self-selected astrology profile</p><p>{editing ? 'Tự chọn ba cung bạn muốn khám phá. Chưa biết Moon hoặc Rising? Bạn có thể thử một tổ hợp để học, rồi chỉnh lại bất cứ lúc nào.' : 'Ba cung do bạn tự chọn — một bản đồ biểu tượng để suy ngẫm, không phải bản đồ sao được tính từ ngày sinh.'}</p></header>
    {editing ? <form onSubmit={generate} noValidate className="identity-builder">
      <div className="identity-choices">{identityRoles.map((role, i) => { const sign = entityById[draft[role.key]]; return <div className="identity-choice" key={role.key} style={{ '--identity-accent': sign?.visual.color || '#c5b78f' } as CSSProperties}>
        <span className="identity-step">0{i + 1} · {role.label.toUpperCase()}</span><span className="identity-choice-symbol" aria-hidden="true">{sign?.symbol || role.symbol}</span><label htmlFor={`identity-${role.key}`}>Chọn {role.label}</label><select id={`identity-${role.key}`} value={draft[role.key]} required aria-describedby={`identity-help-${role.key}`} aria-invalid={!!error && !sign} onChange={e => { setDraft({ ...draft, [role.key]: e.target.value }); setError(''); }}><option value="">Chưa chọn cung</option>{identitySigns.map(s => <option value={s.id} key={s.id}>{s.symbol} {s.name} · {s.aliases[0]}</option>)}</select><h3>{role.title}</h3><p id={`identity-help-${role.key}`}>{role.explanation}</p>{sign && <p className="identity-choice-keywords">{sign.shortDescription}</p>}
      </div>; })}</div>
      <div className="identity-builder-footer"><p>Không cần tài khoản hay ngày, giờ, nơi sinh. Lựa chọn thử không xác nhận cung thật của bạn.</p><div className="actions"><button className="button primary" type="submit">Tạo Cosmic Identity <ArrowUpRight size={18}/></button>{profile && <button type="button" className="button" onClick={() => { setDraft(profile.selections); setEditing(false); setError(''); changedView.current = true; }}>Hủy chỉnh sửa</button>}</div></div>
    </form> : identity && <>
      <div className="identity-summary"><div className="identity-seal" aria-label={`Biểu tượng ba cung: ${identity.placements.map(p => p.sign.name).join(', ')}`}><span aria-hidden="true">{identity.placements.map(p => p.sign.symbol).join(' · ')}</span><small>SUN · MOON · RISING</small></div><div><div className="eyebrow">MYSTICAL SELF ARCHETYPE</div><h3 className="identity-archetype-title">{identity.archetype.name}</h3><p>{identity.archetype.description}</p><span className="identity-caption">Creative interpretation · diễn giải sáng tạo</span></div></div>
      <div className="identity-big-three">{identity.placements.map(p => <article key={p.key} style={{ '--identity-accent': p.sign.visual.color } as CSSProperties}><div className="eyebrow">{p.label} · {p.title}</div><h3><span aria-hidden="true">{p.sign.symbol}</span> {p.sign.name}</h3><p className="identity-caption">{p.explanation}</p><p>{p.sign.shortDescription}</p><dl><dt>Nguồn lực biểu tượng</dt><dd>{p.sign.metadata.strength}</dd><dt>Khoảng để phát triển</dt><dd>{p.sign.metadata.challenge}</dd></dl><p className="identity-question">{p.prompt}</p><EntityLink entity={p.sign}/></article>)}</div>
      <section className="identity-distributions" aria-labelledby="identity-balance"><div className="identity-section-title"><div className="eyebrow">BA LỰA CHỌN, BA PHẦN BẰNG NHAU</div><h3 id="identity-balance">Nhịp điệu của tổ hợp</h3><p>Based on the three signs you selected. Mỗi cung đóng góp 1/3; số 0 chỉ có nghĩa là nguyên tố hoặc tính chất đó không xuất hiện trong ba lựa chọn.</p></div><div className="identity-balance-grid"><Balance title="Element balance" description="Nguyên tố: sắc thái biểu tượng của các cung." rows={identity.elements}/><Balance title="Modality balance" description="Tính chất: khởi đầu, duy trì hoặc thích nghi." rows={identity.modalities}/></div><p className="identity-caption">Đây không phải đánh giá tâm lý, mức năng lực hay tỷ lệ các hành tinh trong bản đồ sao.</p></section>
      <section className="identity-fantasy"><div><div className="eyebrow">FANTASY IDENTITY · CREATIVE INTERPRETATION</div><h3>{identity.archetype.name}</h3><p>{identity.archetype.invitation}</p><dl><dt>Celestial affinity</dt><dd>{identity.archetype.affinity} · tên gọi sáng tạo</dd><dt>Elemental signature</dt><dd>{identity.elements.filter(e => e.count).map(e => `${e.entity.name} ${e.count}/3`).join(' · ')}</dd></dl><details><summary>Vì sao có hình tượng này?</summary><p>Tên ghép từ nguyên tố xuất hiện nhiều nhất ({identity.element.name}) và tính chất xuất hiện nhiều nhất ({identity.modality.name}). Nếu bằng nhau, ưu tiên cung Sun, rồi Moon, rồi Rising. Cùng lựa chọn luôn cho cùng tên; quy tắc này dành cho sáng tạo, không phải quy tắc luận đoán chiêm tinh.</p></details></div><dl className="identity-locked">{[['Kingdom', 'Locked'], ['Faction', 'Locked'], ['Artifact', 'Locked'], ['Destiny', 'Unknown']].map(([name, value]) => <div key={name}><dt><LockKeyhole size={15}/>{name}</dt><dd>{value}</dd></div>)}<p>Những cánh cửa dành cho chương sau.</p></dl></section>
      <section className="identity-connections"><div className="eyebrow">EXPLORE YOUR PROFILE</div><h3>Những đường nối để khám phá</h3><p>Chủ tinh là liên hệ chiêm tinh của cung. Liên tưởng nhà bên dưới là phép so sánh hiện đại, không phải vị trí nhà của bạn.</p>{identity.placements.map(p => <div className="identity-connection-row" key={p.key}><h4>{p.label}<br/><EntityLink entity={p.sign}/></h4><div>{p.connections.filter(c => ['element', 'modality', 'traditional-ruler', 'modern-ruler', 'analogy'].includes(c.kind)).map(c => <div key={`${c.kind}-${c.entity.id}`}><span>{c.label}</span><EntityLink entity={c.entity}/>{c.kind === 'analogy' && <small>{c.entity.concepts.join(' · ')}</small>}</div>)}</div></div>)}</section>
      <section className="identity-share" aria-label="Cosmic Identity Card"><div className="eyebrow">MYSTICAL SELF</div><h3>Cosmic Identity</h3><div className="identity-card-signs">{identity.placements.map(p => <div key={p.key}><small>{p.label}</small><span aria-hidden="true">{p.sign.symbol}</span><strong>{p.sign.name}</strong></div>)}</div><p>{identity.archetype.name}</p><small>Manual profile · Creative interpretation</small></section>
      <div className="identity-actions actions"><button className="button primary" disabled={saved} onClick={() => { if (saveCosmicProfile(profile!)) { setSaved(true); setError(''); setMessage('Đã lưu Cosmic Profile trên trình duyệt này.'); } else { setError('Không thể lưu hồ sơ. Kết quả vẫn ở đây; hãy cho phép lưu trữ hoặc giải phóng dung lượng rồi thử lại.'); } }}>{saved ? <Check size={17}/> : <Save size={17}/>} {saved ? 'Đã lưu hồ sơ' : 'Lưu hồ sơ'}</button><button className="button" onClick={() => { setDraft(profile!.selections); setEditing(true); setError(''); changedView.current = true; }}>Chỉnh sửa hồ sơ</button></div>
    </>}
    {(profile || initial.invalid) && <button className="text-link identity-reset" onClick={() => setConfirmReset(true)}><RotateCcw size={15}/> Đặt lại Cosmic Profile</button>}
    {confirmReset && <div className="identity-reset-confirm" role="group" aria-label="Xác nhận đặt lại"><p>Chỉ xóa Cosmic Profile trên trình duyệt này và bắt đầu lại?</p><div className="actions"><button className="button" onClick={reset}>Xác nhận đặt lại</button><button className="button" onClick={() => setConfirmReset(false)}>Giữ hồ sơ</button></div></div>}
    <p className="identity-privacy">Hồ sơ này lưu riêng trên trình duyệt, không đồng bộ tài khoản hay thiết bị. Người dùng chung trình duyệt có thể xem bản đã lưu. Dùng Đặt lại Cosmic Profile để xóa riêng hồ sơ này.</p>
    <div role="status" className="identity-status">{message}</div>{error && <p role="alert" className="identity-error">{error}</p>}
  </section>;
}
function Balance({ title, description, rows }: { title: string; description: string; rows: { entity: AstrologyEntity; count: number }[] }) {
  return <div className="identity-balance"><h4>{title}</h4><p>{description}</p>{rows.map(({ entity, count }) => <div className="identity-meter" key={entity.id} data-entity={entity.id} data-count={count}><div><EntityLink entity={entity}/><strong>{count}/3</strong></div><meter min={0} max={3} value={count} aria-label={`${entity.name}: ${count} trong 3 cung`} style={{ '--identity-accent': entity.visual.color } as CSSProperties}/><small>{entity.description}</small></div>)}</div>;
}
