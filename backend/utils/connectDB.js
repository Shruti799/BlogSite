
const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL || 'Fallback URL';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log(`DB connected successfully`);
    } catch (error) {
        console.log(`Error connecting to Mongodb ${error.message}`);
        process.exit(1);
    }
};


module.exports = connectDB;


