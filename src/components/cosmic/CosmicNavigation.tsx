import { useEffect, useState } from 'react';
const sections = [['cosmic-entry', 'Bắt đầu'], ['zodiac', 'Hoàng đạo'], ['planets', 'Thiên thể'], ['houses', '12 nhà'], ['elements', 'Nguyên tố'], ['chart', 'Bản đồ sao'], ['moon', 'Trăng'], ['compatibility', 'Kết nối']];

export function CosmicNavigation() {
  const [active, setActive] = useState('cosmic-entry');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const entry = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (entry) setActive(entry.target.id);
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    sections.forEach(([id]) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, []);
  return <nav className="cosmic-nav" aria-label="Các vùng khám phá">{sections.map(([id, label]) =>
    <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setActive(id)}>{label}</a>)}</nav>;
}
