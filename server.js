const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    console.log(`تم استلام طلب للرابط: ${parsedUrl.pathname}`);
    
    if (parsedUrl.pathname.includes('manifest.json')) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            version: "1.0.0",
            files: []
        }));
        return;
    }
    
    if (parsedUrl.pathname.endsWith('.json') || parsedUrl.pathname.includes('config') || parsedUrl.pathname.includes('data')) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({}));
        return;
    }
    
    res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
    res.end();
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

