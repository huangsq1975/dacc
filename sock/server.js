const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'static')));

app.get('/stock-details', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`A股K線圖已啟動：http://localhost:${PORT}`);
});
