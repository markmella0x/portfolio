import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { defineConfig } from 'vite';
import { caseStudies } from './src/data/caseStudies';

const canonicalPaths = new Map<string, string>([
  ['', '/'],
  ['/resume', '/resume/'],
  ['/about', '/about/'],
  ['/contact', '/contact/'],
  ...caseStudies.map((study): [string, string] => [
    '/projects/' + study.slug,
    '/projects/' + study.slug,
  ]),
]);

export default defineConfig(({ isPreview }) => ({
  // Development needs the router fallback; the built site has a file for each route.
  appType: isPreview ? 'mpa' : 'spa',
  plugins: [
    {
      name: 'portfolio-preview-routes',
      configurePreviewServer(server) {
        const notFoundFile = resolve(
          server.config.root,
          server.config.build.outDir,
          '404.html',
        );
        async function notFound(
          request: IncomingMessage,
          response: ServerResponse,
          next: (error?: unknown) => void,
        ): Promise<void> {
          try {
            // Read the current build so rebuilding cannot leave stale asset references.
            const html =
              request.method === 'HEAD' ? undefined : await readFile(notFoundFile, 'utf8');
            response.statusCode = 404;
            response.setHeader('Content-Type', 'text/html; charset=utf-8');
            response.setHeader('X-Robots-Tag', 'noindex');
            response.end(html);
          } catch (error) {
            next(error);
          }
        }
        server.middlewares.use((request, response, next) => {
          if (request.method !== 'GET' && request.method !== 'HEAD') return next();
          const url = new URL(request.url ?? '/', 'http://preview.invalid');
          if (url.pathname === '/404.html') {
            void notFound(request, response, next);
            return;
          }
          const normalized = url.pathname
            .toLowerCase()
            .replace(/\/index\.html$/, '')
            .replace(/\/+$/, '');
          const canonical = canonicalPaths.get(normalized);
          if (canonical && canonical !== url.pathname) {
            response.statusCode = 301;
            response.setHeader('Location', canonical + url.search);
            response.end();
            return;
          }
          if (canonical) {
            const file =
              canonical === '/' ? '/index.html' : canonical.replace(/\/$/, '') + '/index.html';
            request.url = file + url.search;
          }
          next();
        });
        return () => {
          // Existing static routes and assets have already been served at this point.
          server.middlewares.use((request, response, next) => {
            if (request.method === 'GET' || request.method === 'HEAD') {
              const pathname = new URL(request.url ?? '/', 'http://preview.invalid').pathname;
              const normalized = pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '');
              if (canonicalPaths.has(normalized)) return next();
              void notFound(request, response, next);
              return;
            }
            next();
          });
        };
      },
    },
  ],
}));
