const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// نقطة البداية القديمة (عشان ما نخرب شي) //
app.get('/', (req, res) => {
    res.status(200).send('Card Wars Server is active!');
});

// استقبال طلبات اللعبة القديمة //
app.all('/api/*', (req, res) => {
    console.log(`Received ${req.method} request`);
    res.status(200).json({
        status: "success",
        message: "Connected to server successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
