import express from 'express';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');
const staticDir = path.join(__dirname, 'static');
const publicDir = fs.existsSync(distDir) ? distDir : staticDir;

app.use(express.static(publicDir));

function firstExistingFile(paths) {
  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }
  return paths[paths.length - 1];
}

function resolveStockFile() {
  return firstExistingFile([
    path.join(distDir, 'index_stock.html'),
    path.join(staticDir, 'index_stock.html'),
    path.join(distDir, 'index.html'),
    path.join(__dirname, 'index.html'),
    path.join(staticDir, 'index.html'),
  ]);
}

function resolveAppIndexFile() {
  return firstExistingFile([
    path.join(distDir, 'index.html'),
    path.join(__dirname, 'index.html'),
    path.join(staticDir, 'index.html'),
  ]);
}

function httpGetText(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (resp) => {
      let body = '';
      resp.setEncoding('utf8');
      resp.on('data', (chunk) => {
        body += chunk;
      });
      resp.on('end', () => {
        resolve({
          statusCode: resp.statusCode || 500,
          body,
        });
      });
    });

    req.on('error', reject);
  });
}

app.get('/stock-details', (req, res) => {
  res.sendFile(resolveStockFile());
});

app.get('/api/intraday', async (req, res) => {
  try {
    const symbol = String(req.query.symbol || '').trim();
    if (!/^\d{6}$/.test(symbol)) {
      return res.status(400).json({ code: '400', status: false, message: 'Invalid symbol', data: [] });
    }

    const url = `http://qa-test.qcoral.tech/stock/getStockIntraday?symbol=${encodeURIComponent(symbol)}`;
    const resp = await httpGetText(url);

    res.status(resp.statusCode);
    res.set('Content-Type', 'application/json; charset=utf-8');
    return res.send(resp.body);
  } catch (error) {
    return res.status(502).json({
      code: '502',
      status: false,
      message: (error && error.message) || 'Upstream request failed',
      data: [],
    });
  }
});

app.get('/api/daily', async (req, res) => {
  try {
    const symbol = String(req.query.symbol || '').trim();
    const date = String(req.query.date || '').trim();
    const numRaw = String(req.query.num || '').trim();
    const num = numRaw ? Number(numRaw) : 320;

    if (!/^\d{6}$/.test(symbol)) {
      return res.status(400).json({ code: '400', status: false, message: 'Invalid symbol', data: [] });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ code: '400', status: false, message: 'Invalid date', data: [] });
    }
    if (!Number.isFinite(num) || num <= 0) {
      return res.status(400).json({ code: '400', status: false, message: 'Invalid num', data: [] });
    }

    const url = `http://qa-test.qcoral.tech/stock/getStockDaily?symbol=${encodeURIComponent(symbol)}&date=${encodeURIComponent(date)}&num=${encodeURIComponent(Math.floor(num))}`;
    console.log(`[daily] symbol=${symbol} date=${date} num=${num} url=${url}`);
    const resp = await httpGetText(url);
    console.log(`[daily] resp=${JSON.stringify(resp)}`);
    res.status(resp.statusCode);
    res.set('Content-Type', 'application/json; charset=utf-8');
    return res.send(resp.body);
  } catch (error) {
    return res.status(502).json({
      code: '502',
      status: false,
      message: (error && error.message) || 'Upstream request failed',
      data: [],
    });
  }
});

/** 轉發財經資訊列表，避免瀏覽器直連 ai.qcoral.tech 的跨域限制 */
app.get('/api/news-index', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(String(req.query.page || '1'), 10) || 1);
    const num = Math.min(100, Math.max(1, parseInt(String(req.query.num || '20'), 10) || 20));
    const url = `https://ai.qcoral.tech/news/indexNew?page=${page}&num=${num}`;
    const r = await fetch(url, { method: 'GET' });
    const text = await r.text();
    res.status(r.status);
    const ct = r.headers.get('content-type');
    res.set('Content-Type', ct && ct.includes('json') ? ct : 'application/json; charset=utf-8');
    return res.send(text);
  } catch (error) {
    return res.status(502).json({
      code: '502',
      status: false,
      message: (error && error.message) || 'Upstream request failed',
      data: [],
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(resolveAppIndexFile());
});

app.listen(PORT, () => {
  console.log(`A股K線圖已啟動：http://localhost:${PORT}`);
});
