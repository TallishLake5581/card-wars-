const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. الصفحة الرئيسية للسيرفر
app.get('/', (req, res) => {
    res.send('Card Wars Server is Online! 🚀');
});

// 2. مسار ملفات الإعدادات
app.get('/server_settings.json', (req, res) => {
    res.json({
        "type": "server_settings",
        "cdn_url": "https://card-wars-1.onrender.com/persist/static/",
        "manifest_file_url": "https://card-wars-1.onrender.com/persist/static/manifest.json",
        "server_url": "https://card-wars-1.onrender.com/"
    });
});

// 3. مسار Manifest لتفادي الشاشة السوداء
app.get('/persist/static/manifest.json', (req, res) => {

    res.json({
        "status": "success",
        "version": "1.0.0",
        "files": []
    });
});

// 4. مسار الحلبة أو بيانات اللعب
app.get('/api/deckwars', (req, res) => {
    res.json({
        "status": "success",
        "message": "Deck Wars is open!",
        "leaderboard": []
    });
});

// 5. مسار عام لتفادي أخطاء 404
app.use('/persist/static/', (req, res) => {
    res.status(200).send("OK");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
