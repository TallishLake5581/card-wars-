const express = require('express');
const app = express();

app.use(express.json());

// مسار التحقق من الحالة (Status)
app.get('/api/status', (req, res) => {
    res.json({
        status: "success",
        message: "Server is online and working!",
        version: "1.0.0"
    });
});

// مسار مكافآت وبطولات Deck Wars
app.get('/api/tournament/rewards', (req, res) => {
    res.json({
        status: "success",
        rewards: [
            { id: 1, type: "CWLostRewards", amount: 100 },
            { id: 2, type: "CompleteTournamentRewards", amount: 500 }
        ]
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
