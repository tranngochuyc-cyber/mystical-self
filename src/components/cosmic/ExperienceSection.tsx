import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

export function ExperienceSection({ id, className = '', children }: { id: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { margin: '100px' });
  return <motion.section ref={ref} id={id} className={`cosmic-section ${className} ${visible ? 'is-visible' : ''}`}
    initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }}
    transition={{ duration: .5 }}>{children}</motion.section>;
}
