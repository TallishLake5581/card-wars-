const tls = require('tls');
const fs = require('fs');
const path = require('path');

// البورت الذي تستخدمه المنصة للاتصالات الخام
const PORT = process.env.PORT || 443;

const server = tls.createServer((socket) => {
    console.log('تم استقبال اتصال TLS TCP خام من اللعبة بنجاح!');

    socket.on('data', (data) => {
        const requestString = data.toString();
        console.log('البيانات المستلمة:', requestString.slice(0, 100));

        // التحقق مما إذا كانت اللعبة تطلب ملف الـ manifest أو أصول الـ CDN
        if (requestString.includes('manifest.json')) {
            try {
                const manifestPath = path.join(__dirname, 'manifest.json');
                const manifestData = fs.readFileSync(manifestPath, 'utf8');
                
                // الرد ببروتوكول HTTP فوق اتصال الـ TLS الخام
                const response = `HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nContent-Length: ${Buffer.byteLength(manifestData)}\r\n\r\n${manifestData}`;
                socket.write(response);
            } catch (err) {
                console.error('خطأ في قراءة ملف الـ manifest:', err);
            }
        } else {
            // محاولة جلب أي ملف آخر يطلبه الـ CDN بناءً على المسار
            try {
                // استخراج اسم الملف المطلوب من الطلب إذا وجد
                const match = requestString.match(/GET\s+\/([^\s]+)\s+HTTP/);
                if (match && match[1]) {
                    const filePath = path.join(__dirname, match[1]);
                    if (fs.existsSync(filePath)) {
                        const fileData = fs.readFileSync(filePath);
                        const response = `HTTP/1.1 200 OK\r\nContent-Length: ${fileData.length}\r\n\r\n`;
                        socket.write(response);
                        socket.write(fileData);
                        return;
                    }
                }
            } catch (e) {
                // تجاهل الأخطاء البسيطة في استخراج المسار
            }

            // استجابة افتراضية لإبقاء الاتصال مستقراً وثابتاً
            socket.write('HTTP/1.1 200 OK\r\n\r\n');
        }
    });

    socket.on('error', (err) => {
        console.error('خطأ في السوكيت:', err);
    });

    socket.on('end', () => {
        console.log('تم قطع الاتصال من قبل اللعبة.');
    });
});

server.listen(PORT, () => {
    console.log(`سيرفر TLS TCP الخام يعمل بكفاءة على البورت: ${PORT}`);
});
