const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');

const app = express();

// Importing Routers
const adminRouter = require('./routes/admin.js');
const shopRouter = require('./routes/shop.js');

// Middleware to parse body
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/admin', adminRouter); // Attach admin routes
app.use(shopRouter); // Attach shop routes

// Handle 404 errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'view', '404_page.html'));
});

// Start the server
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
