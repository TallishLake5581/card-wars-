const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. الصفحة الرئيسية للسيرفر
app.get('/', (req, res) => {
    res.send('Card Wars Server is Online! 🚀');
});

// 2. إعدادات السيرفر الأساسية للعبة
app.get('/server_settings.json', (req, res) => {
    res.json({
        "type": "server_settings",
        "cdn_url": "http://card-wars-1.onrender.com/persist/static/",
        "manifest_file_url": "http://card-wars-1.onrender.com/persist/static/manifest.json",
        "server_url": "http://card-wars-1.onrender.com/"
    });
});

// 3. ملف الـ Manifest بصيغة JSON صحيحة ومتكاملة لتفادي الشاشة السوداء
app.get('/persist/static/manifest.json', (req, res) => {
    res.json({
        "status": "success",
        "version": "1.11.0",
        "files": []
    });
});

// 4. مسار الـ CDN والملفات الثابتة
app.get('/persist/static/*', (req, res) => {
    res.status(200).json({
        "status": "success",
        "message": "Asset loaded"
    });
});

// 5. مسار بيانات اللعبة والحلبة
app.get('/api/deckwars', (req, res) => {
    res.json({
        "status": "success",
        "message": "Deck Wars is open!",
        "leaderboard": []
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
