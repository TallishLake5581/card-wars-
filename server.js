let express = require('express');
let fs = require('fs');
let path = require('path');
let app = express();

app.use(express.json());

let dbFile = path.join(__dirname, 'leaderboard.json');

function getLeaderboard() {
    if (!fs.existsSync(dbFile)) {
        fs.writeFileSync(dbFile, JSON.stringify([]));
    }
    let data = fs.readFileSync(dbFile, 'utf8');
    return JSON.parse(data);
}

function saveLeaderboard(data) {
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

app.get('/api/status', (req, res) => {
    res.json({
        status: "success",
        message: "Server is online!",
        version: "1.0.0"
    });
});

app.get('/api/tournament/rewards', (req, res) => {
    res.json({
        status: "success",
        rewards: [
            { id: 1, name: "CWLost Card" },
            { id: 2, name: "Full Deck" }
        ]
    });
});

app.get('/api/leaderboard', (req, res) => {
    let leaderboard = getLeaderboard();
    leaderboard.sort((a, b) => b.score - a.score);
    res.json(leaderboard.slice(0, 10));
});

app.post('/api/score', (req, res) => {
    let username = req.body.username;
    let score = req.body.score;
    
    if (!username || score === undefined) {
        return res.status(400).json({ error: 'Provide username and score' });
    }

    let leaderboard = getLeaderboard();
    let player = leaderboard.find(p => p.username === username);

    if (player) {
        player.score += score;
    } else {
        leaderboard.push({ username: username, score: score });
    }

    saveLeaderboard(leaderboard);
    res.json({ success: true, message: 'Updated', leaderboard: leaderboard });
});

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
