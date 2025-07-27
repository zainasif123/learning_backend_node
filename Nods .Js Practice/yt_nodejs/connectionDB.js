const mongoose = require('mongoose');

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/usersDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('Failed to connect to MongoDB', err));

    async function connectionMongosDB (url) {
        return mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
    }

    module.exports = {
        connectionMongosDB
    }