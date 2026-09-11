import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({mode}) => { const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'mystical-self'; return { base: mode === 'github-pages' ? `/${repository}/` : '/', plugins: [react()], build: { outDir: 'dist/client' } }; });
