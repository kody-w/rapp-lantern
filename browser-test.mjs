import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, firefox, webkit } from 'playwright';

const root = path.dirname(fileURLToPath(import.meta.url));
const mime = {
  '.egg': 'application/json',
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json',
  '.mjs': 'text/javascript; charset=utf-8'
};
const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filename = path.resolve(root, relative);
  if (!filename.startsWith(root + path.sep) || !fs.existsSync(filename) || fs.statSync(filename).isDirectory()) {
    response.writeHead(404).end('not found');
    return;
  }
  response.setHeader('content-type', mime[path.extname(filename)] || 'application/octet-stream');
  fs.createReadStream(filename).pipe(response);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));

const engines = { chromium, firefox, webkit };
const engineName = process.env.BROWSER || 'chromium';
const engine = engines[engineName];
assert.ok(engine, `Unknown browser: ${engineName}`);
const browser = await engine.launch({ headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error));
const base = `http://127.0.0.1:${server.address().port}`;

try {
  await page.goto(`${base}/index.html`);
  await page.locator('#title').filter({ hasText: 'Huila sky' }).waitFor();
  await page.locator('#share-dock:not([hidden])').waitFor();
  await page.locator('#unload').click();
  await page.locator('#drop').waitFor();

  await page.goto(`${base}/player.html#`);
  await page.locator('#i-title').filter({ hasText: 'Could not verify this egg' }).waitFor();
  await assert.rejects(
    page.locator('#btn-link').click({ timeout: 500 }),
    /disabled|Timeout/
  );

  const registry = JSON.parse(fs.readFileSync(path.join(root, 'registry.json'), 'utf8'));
  const moon = registry.entries.find(entry => entry.name === 'moon');
  await page.goto(`${base}/player.html?id=moon&h=${moon.content_sha256}`);
  await page.locator('#i-title').filter({ hasText: "Tonight's Moon" }).waitFor();
  assert.equal(await page.locator('#btn-dl').isEnabled(), true);
  assert.deepEqual(errors, []);
  process.stdout.write(`browser smoke passed: ${engineName}\n`);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
