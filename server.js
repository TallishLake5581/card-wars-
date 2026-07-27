const path = require('path');
const fs = require('fs');

// 1. خدعة الـ Manifest: إذا طلبت اللعبة ملف الmanifest، نعطيها محتواه مباشرة
app.get('/persist/static/manifest.json', (req, res) => {
    const manifestData = {
        "version": 51, 
        "contents": [
            // محتوى الmanifest الخاص بك هنا أو يتم قراءته من ملف manifest.json خارجي
        ]
    };
    res.status(200).json(manifestData);
});

// 2. تلبية أي ملف يتم طلبه من مجلد Blueprints الذي أنشأته
app.get('/Blueprints/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'Blueprints', filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(`الملف غير موجود في Blueprints: ${filename}`);
            return res.status(200).json({});
        }
        
        try {
            const jsonData = JSON.parse(data);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(jsonData);
        } catch (parseError) {
            res.status(500).send("Invalid JSON format");
        }
    });
});
