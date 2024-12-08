const mongoose = require('mongoose');

// Encode special characters in the password (e.g., @ becomes %40)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.error('Database connection error:', err);
});
