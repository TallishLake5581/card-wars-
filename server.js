const express = require('express');
const path = require('path');
const app = express();

// Handle incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: '*/*' }));

const PORT = process.env.PORT || 10000;

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`[+] Incoming Request: ${req.method} ${req.url}`);
    next();
});

// 1. Health check route
app.get('/', (req, res) => {
    res.status(200).send('Card Wars Private Server is Active!');
});

// 2. Serve static files from persist folder (including manifest.json)
app.use('/persist', express.static(path.join(__dirname, 'persist')));

// 3. Fallback response for all other API requests
app.all('*', (req, res) => {
    console.log(`[*] API Request received on: ${req.url}`);
    res.status(200).json({
        status: "success",
        code: 200,
        message: "OK",
        data: {}
    });
});

app.listen(PORT, () => {
    console.log(`[*] Server is running on port ${PORT}`);
});
