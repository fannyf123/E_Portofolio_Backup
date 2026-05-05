import { defineConfig } from 'vite';
import { cpSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(fileURLToPath(import.meta.url));

function copyPdfAssets() {
  return {
    name: 'copy-pdf-assets',
    closeBundle() {
      const source = resolve(projectRoot, 'assets/pdf');
      const target = resolve(projectRoot, 'dist/assets/pdf');

      if (existsSync(source)) {
        cpSync(source, target, { recursive: true });
      }
    }
  };
}

export default defineConfig({
  base: '/E_Portofolio_Backup/',
  plugins: [copyPdfAssets()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 5173,
    strictPort: false
  },
  preview: {
    port: 4173,
    strictPort: false
  }
});
