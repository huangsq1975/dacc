const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'static')));

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
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`A股K線圖已啟動：http://localhost:${PORT}`);
});
