const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    // الرد الفوري والصريح على أي فحص صحة من المنصة لضمان عدم إغلاق الحاوية
    if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/health' || parsedUrl.pathname === '/ping') {
        res.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
        res.end('OK');
        return;
    }

    // التعامل مع ملف الـ manifest أو ملفات اللعبة والـ CDN
    let targetPath = path.join(__dirname, parsedUrl.pathname);
    
    fs.readFile(targetPath, (err, data) => {
        if (!err) {
            let ext = path.extname(targetPath);
            let contentType = 'application/octet-stream';
            if (ext === '.json') contentType = 'application/json';
            else if (ext === '.xml') contentType = 'application/xml';
            else if (ext === '.txt') contentType = 'text/plain';

            res.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' });
            res.end(data);
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ status: "active", endpoint: parsedUrl.pathname }));
        }
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Card Wars Server successfully listening on port ${PORT}`);
});
