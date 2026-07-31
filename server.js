const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// الرد على الرابط الأساسي مثل السيرفر القديم تماماً
app.get('/', (req, res) => {
    res.status(200).send('200 App server running');
});

// استقبال أي طلب آخر من اللعبة والرد بالنجاح لكي لا تتجمد
app.all('*', (req, res) => {
    console.log(`[طلب جديد] المسار: ${req.method} ${req.path}`);
    res.status(200).json({
        status: "success",
        message: "Connected to Marwan Server"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
