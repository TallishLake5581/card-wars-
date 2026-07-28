const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`تم استلام طلب للرابط: ${req.url}`);
    
    // الرد على ملف الـ manifest
    if (req.url.includes('manifest.json')) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            version: "1.0.0",
            files: []
        }));
        return;
    }
    
    // الرد على أي طلب آخر يخص الـ CDN أو الاتصال العام
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server & CDN is active!');
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`السيرفر يعمل على البورت ${PORT}`);
});
