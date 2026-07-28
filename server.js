const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    console.log(`طلب وارد إلى: ${parsedUrl.pathname}`);

    // الرد السريع لفحص الصحة الخاص بالمنصة
    if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
        res.end('Server is active and running!');
        return;
    }

    // تنظيف مسار الطلب للبحث عن الملف المطابق محلياً
    let filePath = path.join(__dirname, parsedUrl.pathname);

    // التحقق مما إذا كان الملف موجوداً في المشروع (مثل مجلد Blueprints أو Languages)
    fs.readFile(filePath, (err, data) => {
        if (!err) {
            // تحديد نوع المحتوى بناءً على امتداد الملف
            let ext = path.extname(filePath);
            let contentType = 'application/octet-stream';
            if (ext === '.json') contentType = 'application/json';
            else if (ext === '.xml') contentType = 'application/xml';
            else if (ext === '.txt') contentType = 'text/plain';

            res.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' });
            res.end(data);
        } else {
            // في حال لم يتم العثور على الملف حرفياً، نرد بـ JSON افتراضي حتى لا ينقطع الاتصال
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ status: "success", requested: parsedUrl.pathname }));
        }
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
