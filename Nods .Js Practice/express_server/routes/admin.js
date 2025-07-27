const express = require("express");
const path = require("path");

const router = express.Router();

// Middleware for '/add-product' route
router.get('/add_product', (req, res) => {
    const filePath = path.join(__dirname, '../view', 'add_product.html');
    res.sendFile(filePath);
});

// Middleware for '/product' route
router.post('/product', (req, res) => {
    console.log("In the second middleware");
    console.log(req.body); // Logs the parsed body object
    res.redirect('/'); // Redirect to the homepage
});

module.exports = router;
