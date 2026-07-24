const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. نقطة التحقق أو الصفحة الرئيسية للسيرفر
app.get('/', (req, res) => {
    res.send('Card Wars Server is Online! 🚀');
});

// 2. مسار ملفات الإعدادات (server_settings.json) إذا طلبته اللعبة مباشرة من السيرفر
app.get('/server_settings.json', (req, res) => {
    res.json({
        "type": "server_settings",
        "cdn_url": "https://card-wars-1.onrender.com/persist/static/",
        "manifest_file_url": "https://card-wars-1.onrender.com/persist/static/manifest.json",
        "server_url": "https://card-wars-1.onrender.com/"
    });
});

// 3. مسار الـ Manifest الثابت (لتفادي الشاشة السوداء)
app.get('/persist/static/manifest.json', (req, res) => {
    res.json({
        "version": "1.0.0",
        "assets": []
    });
});

// 4. مسار الحلبة أو بيانات اللعب (Deck Wars / PvP endpoints المتوقعة)
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
