import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  integrations: [mdx()],
  vite: {
    plugins: [
      {
        name: '98css-valid-hover-query',
        enforce: 'pre',
        transform(code, id) {
          // 98.css 0.1.21 ships a legacy query rejected by Lightning CSS.
          // Normalize the dependency in-memory; keep node_modules untouched.
          if (id.includes('/98.css/') && id.endsWith('.css')) {
            return {
              code: code.replace('@media (not(hover))', '@media (hover: none)'),
              map: null,
            };
          }
        },
      },
    ],
  },
});
