const express = require("express");
const path = require("path");

const router = express.Router(); // Use `express.Router()` correctly

// Middleware for '/'
router.get('/', (req, res) => {
    console.log("In the shop middleware");
    res.sendFile(path.join(__dirname, '../view', 'shop.html'));
});

module.exports = router;
