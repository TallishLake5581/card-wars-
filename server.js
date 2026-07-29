const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// نقطة البداية أو التحقق من الاتصال
app.get('/', (req, res) => {
    res.status(200).send('Card Wars Server is Online!');
});

// استقبال طلبات اللعبة (يمكنك إضافة الـ Routes الخاصة بالتشكيلات والبطولات هنا)
app.all('*', (req, res) => {
    console.log(`Received ${req.method} request to ${req.url}`);
    res.status(200).json({
        status: "success",
        message: "Connected to Marwan's custom server successfully!"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
