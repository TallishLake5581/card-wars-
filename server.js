const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // الرد على فحص الصحة لتبقى الحاوية مستقرة في Railway
    if (pathname === '/' || pathname === '/health' || pathname === '/ping') {
        res.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
        res.end('OK');
        return;
    }

    // مطابقة المسار الحقيقي الذي أنشأته في المستودع (persist/static/...)
    let filePath = path.join(__dirname, pathname);

    fs.readFile(filePath, (err, data) => {
        if (!err) {
            let ext = path.extname(filePath).toLowerCase();
            let contentType = 'application/octet-stream';
            if (ext === '.json') contentType = 'application/json';
            else if (ext === '.xml') contentType = 'application/xml';
            
            res.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' });
            res.end(data);
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ error: "File or route not found in repository", path: pathname }));
        }
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Repo-Mapped Server running on port ${PORT}`);
});
