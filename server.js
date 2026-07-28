if (req.url.includes('manifest.json')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        version: "1.0.0",
        files: []
    }));
}
