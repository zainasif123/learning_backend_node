//* simple start server 
// const http = require("http");

// const server = http.createServer();

// // Listen to the request event
// server.on('request', (request, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.end(JSON.stringify({
//     data: 'Hello World!',
//   }));
// });

// server.listen(8000);


//* without express
//
// Import required modules
// const http = require('http');
// const url = require('url');

// // Create the server
// const server = http.createServer((req, res) => {
//   // Parse the URL
//   const parsedUrl = url.parse(req.url, true);
//   const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, ''); // Remove leading and trailing slashes
//   const query = parsedUrl.query;

//   // Routing
//   if (path === '') {
//     // Home route
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end('<h1>Welcome to the Homepage!</h1>');
//   } else if (path === 'about') {
//     // About route
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end('<h1>About Us Page</h1>');
//   } else if (path === 'api/data') {
//     // API route with optional query parameters
//     const message = query.message || 'Default message';
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ success: true, message }));
//   } else {
//     // 404 Not Found
//     res.writeHead(404, { 'Content-Type': 'text/html' });
//     res.end('<h1>404 Not Found</h1>');
//   }
// });

// // Start the server
// const PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}/`);
// });



//* with express 
// Import required modules
// const express = require('express');
// const users = require("./MOCK_DATA.json");
// // Create the Express application
// const app = express();

// // Home route
// app.get('/', (req, res) => {
//   res.status(200).send('<h1>Welcome to the Homepage!</h1>');
// });

// // About route
// app.get('/about', (req, res) => {
//   res.status(200).send('<h1>About Us Page</h1>');
// });

// // Show Use route
// app.get('/users', (req, res) => {
//   res.json(users);
// });

// // API route with query parameters
// app.get('/api/data', (req, res) => {
//   const message = req.query.message || 'Default message';
//   res.status(200).json({ success: true, message });
// });

// // Catch-all route for 404 Not Found
// app.use((req, res) => {
//   res.status(404).send('<h1>404 Not Found</h1>');
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}/`);
// });



//! user crud with mongo db and express 

const express = require('express');
const userRouter = require('./routes/user');
const {connectionMongosDB} = require("./connectionDB");

const {logReqRes}= require("./middleware/userlog");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

//connection db
connectionMongosDB("mongodb://localhost:27017/usersDB");

//log file middleware
app.use(logReqRes("log.txt"));


//router
app.use('/users', userRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});