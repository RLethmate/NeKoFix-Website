'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const STATE_FILE = process.env.STATE_FILE || '/data/state.json';
const DYNAMIC_DIR = process.env.DYNAMIC_DIR || '/dynamic';
const PLACEHOLDER_SERVICE_URL = process.env.PLACEHOLDER_SERVICE_URL || 'http://notaus-placeholder:80';
const PORT = process.env.PORT || 3000;

// Whitelist: neue Schalter hier ergänzen (nicht aus Nutzereingaben ableiten).
const TOGGLES = {
  website: {
    label: 'Marketing-Website',
    domains: ['nekofix.de', 'www.nekofix.de'],
  },
  app: {
    label: 'App (app.nekofix.de)',
    domains: ['app.nekofix.de'],
  },
};

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch {
    const initial = {};
    for (const key of Object.keys(TOGGLES)) initial[key] = false;
    return initial;
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function dynamicFilePath(key) {
  return path.join(DYNAMIC_DIR, `notaus-${key}.yml`);
}

function applyToggle(key, active) {
  const cfg = TOGGLES[key];
  const file = dynamicFilePath(key);

  if (!active) {
    if (fs.existsSync(file)) fs.unlinkSync(file);
    return;
  }

  const hostRule = cfg.domains.map((d) => 'Host(`' + d + '`)').join(' || ');
  const routerName = `notaus-${key}`;
  const yaml = `http:
  routers:
    ${routerName}:
      rule: "${hostRule}"
      entryPoints:
        - https
      tls:
        certResolver: letsencrypt
      priority: 1000
      service: ${routerName}-svc
  services:
    ${routerName}-svc:
      loadBalancer:
        servers:
          - url: "${PLACEHOLDER_SERVICE_URL}"
`;
  fs.writeFileSync(file, yaml);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function renderPage(state) {
  const rows = Object.entries(TOGGLES)
    .map(([key, cfg]) => {
      const active = !!state[key];
      const statusText = active ? 'AUS (Platzhalter aktiv)' : 'AN (normal erreichbar)';
      const statusColor = active ? '#b91c1c' : '#15803d';
      const btnLabel = active ? 'Wieder einschalten' : 'Not-Aus auslösen';
      const btnColor = active ? '#15803d' : '#b91c1c';
      return `
      <div style="border:1px solid #ddd;border-radius:12px;padding:16px;margin-bottom:16px;">
        <div style="font-size:18px;font-weight:600;margin-bottom:4px;">${escapeHtml(cfg.label)}</div>
        <div style="color:${statusColor};font-weight:600;margin-bottom:12px;">${statusText}</div>
        <form method="POST" action="/toggle/${encodeURIComponent(key)}">
          <button type="submit" style="background:${btnColor};color:white;border:none;border-radius:8px;padding:12px 20px;font-size:16px;width:100%;">${btnLabel}</button>
        </form>
      </div>`;
    })
    .join('\n');

  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>NeKoFix Not-Aus</title>
</head>
<body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:480px;margin:40px auto;padding:0 16px;">
  <h1 style="font-size:22px;">NeKoFix Not-Aus</h1>
  ${rows}
  <p style="color:#888;font-size:13px;">Diese Seite nicht verlinken oder teilen.</p>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    const state = loadState();
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
    });
    res.end(renderPage(state));
    return;
  }

  const toggleMatch = req.method === 'POST' && req.url.match(/^\/toggle\/([a-z]+)$/);
  if (toggleMatch) {
    const key = toggleMatch[1];
    if (!Object.prototype.hasOwnProperty.call(TOGGLES, key)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Unbekannter Schalter');
      return;
    }
    const state = loadState();
    const newActive = !state[key];
    state[key] = newActive;
    saveState(state);
    applyToggle(key, newActive);
    res.writeHead(303, { Location: '/' });
    res.end();
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Notaus-Panel läuft auf Port ${PORT}`);
});
