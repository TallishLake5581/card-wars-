const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// السماح بقواعد البيانات والـ Headers الخاصة باللعبة
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// التعامل مع الـ Headers والاتصالات
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

// 1. مسارات الـ Manifest (بكل الأشكال المحتملة التي قد تطلبها اللعبة)
app.get('/manifest.json', (req, res) => {
    res.status(200).json({
        "version": 51,
        "contents": []
    });
});

app.get('/persist/static/manifest.json', (req, res) => {
    res.status(200).json({
        "version": 51,
        "contents": []
    });
});

// 2. مسار التحليلات الوهمي لتجنب أخطاء 404
app.get('/api/v1/:appId/pgr/', (req, res) => {
    res.status(200).send("OK");
});

// 3. قراءة ملفات الـ Blueprints ديناميكياً
app.get('/Blueprints/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'Blueprints', filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
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

// تشغيل السيرفر على البورت المطلوب من المنصة
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running securely on port ${PORT}`);
});
