const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/api/health') {
    res.end(JSON.stringify({ status: 'ok', service: 'CryptoTracker API' }));
  } else {
    res.end(JSON.stringify({
      app: 'CryptoTracker',
      message: 'DevOps final exam API is running in Docker'
    }));
  }
});

server.listen(8080, '0.0.0.0', () => {
  console.log('API running on port 8080');
});
