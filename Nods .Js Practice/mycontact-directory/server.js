const app = require('./app');

// Connect to DB and start server
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});