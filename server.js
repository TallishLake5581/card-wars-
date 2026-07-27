const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// إعدادات أساسية لضمان قبول البيانات
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. مسار خدعة الـ Manifest: لإعطاء اللعبة محتوى الملفات والنسخة مباشرة
app.get('/persist/static/manifest.json', (req, res) => {
    const manifestData = {
        "version": 51, 
        "contents": []
    };
    res.status(200).json(manifestData);
});

// 2. المسار الديناميكي الآمن لقراءة أي ملف من مجلد Blueprints دون انقطاع الاتصال
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
            console.log(`خطأ في قراءة JSON لملف: ${filename}`);
            res.status(500).send("Invalid JSON format");
        }
    });
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
