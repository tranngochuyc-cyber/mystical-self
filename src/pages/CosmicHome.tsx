import '../components/cosmic/cosmicIdentity.css';
import { useEffect } from 'react';
import { entityById } from '../data/knowledge';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useApp } from '../App';
import { CosmicHero } from '../components/cosmic/CosmicHero';
import { CosmicNavigation } from '../components/cosmic/CosmicNavigation';
import { ZodiacExplorer } from '../components/cosmic/ZodiacExplorer';
import { PlanetExplorer } from '../components/cosmic/PlanetExplorer';
import { MoonExperience } from '../components/cosmic/MoonExperience';
import { BirthChartExperience } from '../components/cosmic/BirthChart';
import { CompatibilityExperience } from '../components/cosmic/CompatibilityExperience';
import { ElementBalance } from '../components/cosmic/ElementBalance';
import { DailyReading } from '../components/cosmic/DailyReading';
import { CosmicKnowledge } from '../components/cosmic/CosmicKnowledge';
import { HouseExplorer } from '../components/cosmic/HouseExplorer';
import { tools } from '../data/content';

export default function CosmicHome() {
  const { readings } = useApp();
  const [params] = useSearchParams();
  const entity = entityById[params.get('entity') || ''];
  useEffect(()=>{if(!entity)return; const section = entity.type === 'zodiac' ? 'zodiac' : entity.type === 'planet' ? 'planets' : entity.type === 'house' ? 'houses' : 'elements';const frame=requestAnimationFrame(()=>{const node=document.getElementById(section);node?.scrollIntoView({block:'start',behavior:'instant'});node?.setAttribute('tabindex','-1');node?.focus({preventScroll:true});});return()=>cancelAnimationFrame(frame);},[entity]);
  return <div className="cosmos"><CosmicHero/><CosmicNavigation/><section className="container identity-entry"><div><div className="eyebrow">DISCOVER YOUR COSMIC IDENTITY</div><h2>Ba cung bạn chọn. Một chân dung biểu tượng.</h2><p>Sun · Moon · Rising — hồ sơ tự chọn, lưu trên trình duyệt.</p></div><Link className="button primary" to="/profile">Tạo Cosmic Profile <ArrowUpRight size={18}/></Link></section>
    {readings.length > 0 && <div className="container cosmic-return"><span>Tiếp nối hành trình</span><Link to={`/result/${readings[0].id}`}>{readings[0].result.title} <ArrowUpRight size={18}/></Link></div>}
    <ZodiacExplorer initialSelected={entity?.type === 'zodiac' ? entity.visual.index : undefined}/>
    <PlanetExplorer initialSelected={entity?.type === 'planet' ? entity.visual.index : undefined}/>
    <BirthChartExperience/>
    <HouseExplorer initialSelected={entity?.type === 'house' ? entity.visual.index : undefined}/>
    <ElementBalance/>
    <MoonExperience/>
    <CompatibilityExperience/>
    <DailyReading/>
    <CosmicKnowledge/>
    <section className="container codex-invitation"><div><div className="eyebrow">COSMIC CODEX</div><h2>Một biểu tượng.<br/><em>Một mạng lưới ý nghĩa.</em></h2><p>Lần theo 41 mục: cung, thiên thể, nhà, nguyên tố và tính chất.</p></div><Link className="button primary" to="/codex">Mở bản đồ kiến thức <ArrowUpRight size={18}/></Link></section>
    <section className="container cosmic-section" id="journeys"><div className="cosmic-heading"><div className="eyebrow">CHÍN CÁNH CỬA</div><h2>Bạn muốn bắt đầu<br/>từ <em>điều gì?</em></h2></div>
      <div className="journey-index">{tools.map((tool, index) => <Link to={`/tool/${tool.slug}`} key={tool.slug}><span>0{index + 1}</span><h3>{tool.name}</h3><span>{tool.input}</span><ArrowUpRight size={22}/></Link>)}</div>
    </section>
    <section className="container cosmic-finale"><span aria-hidden="true">✧</span><h2>Những vì sao còn đó.<br/><em>Câu chuyện thuộc về bạn.</em></h2><Link className="button primary" to="/explore">Tiếp tục khám phá <ArrowUpRight size={18}/></Link><Link className="text-link" to="/saved">Mở những điều đã lưu</Link></section>
  </div>;
}
