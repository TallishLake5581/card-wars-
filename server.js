const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// قراءة ملفات الويب الخاصة باللعبة مباشرة
app.use(express.static(path.join(__dirname, 'card_wars', 'web')));

app.listen(PORT, () => {
    console.log(`Card Wars game server is running on port ${PORT}`);
});
