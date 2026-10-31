#!/usr/bin/env node
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PUBLIC_DIR = resolve(__dirname, '../public');
const PORT = parseInt(process.env.PORT || '8080', 10);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

const server = createServer((req, res) => {
  // Only allow GET and HEAD requests
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Method Not Allowed');
    return;
  }

  // Parse path and sanitize against directory traversal
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath.endsWith('/')) {
    reqPath += 'index.html';
  }

  const filePath = resolve(PUBLIC_DIR, '.' + reqPath);

  // Security: Prevent directory traversal outside of PUBLIC_DIR
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  if (!existsSync(filePath)) {
    // If it's a directory without trailing slash, redirect with slash
    if (existsSync(filePath) && statSync(filePath).isDirectory()) {
      res.writeHead(301, { Location: reqPath + '/' });
      res.end();
      return;
    }
    // Check if path with /index.html exists
    const tryIndex = join(filePath, 'index.html');
    if (existsSync(tryIndex) && statSync(tryIndex).isFile()) {
      res.writeHead(301, { Location: req.url.split('?')[0] + '/' });
      res.end();
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>404 Not Found</title></head><body><h1>404 Not Found</h1><p>The requested file <code>${reqPath}</code> was not found.</p><p><a href="/">&larr; Back to Arcade</a></p></body></html>`);
    return;
  }

  const stat = statSync(filePath);
  if (stat.isDirectory()) {
    const indexPath = join(filePath, 'index.html');
    if (existsSync(indexPath)) {
      res.writeHead(301, { Location: req.url.split('?')[0] + '/' });
      res.end();
      return;
    }
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden: Directory listing disabled');
    return;
  }

  const ext = extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': stat.size,
    'Cache-Control': 'no-cache'
  });

  if (req.method === 'HEAD') {
    res.end();
    return;
  }

  const stream = createReadStream(filePath);
  stream.pipe(res);
});

server.listen(PORT, () => {
  console.log(`[bruce-box-server] Serving ${PUBLIC_DIR}`);
  console.log(`[bruce-box-server] Running at http://localhost:${PORT}/`);
  console.log(`[bruce-box-server] Press Ctrl+C to stop.`);
});

export default server;
