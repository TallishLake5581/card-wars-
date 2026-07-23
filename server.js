const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// استدعاء ملفات الـ JSON
const configData = require('./config.json');
const userData = require('./user.json');

// لمعرفة أي مسار تطلبه اللعبة
app.use((req, res, next) => {
    console.log(`[Request] ${req.method} ${req.url}`);
    next();
});

// مسار الإعدادات
app.get('/api/config', (req, res) => {
    res.json(configData);
});

// مسارات بيانات اللاعب والتسجيل
app.get('/api/user/profile', (req, res) => {
    res.json(userData);
});

app.post('/api/user/login', (req, res) => {
    res.json(userData);
});

// مسار احتياطي عام
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Card Wars Server is running on port ${PORT}`);
});
