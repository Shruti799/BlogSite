
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

// pass: i5mFePqeLL5PSubZ
// user: shrutijwal999
// url: mongodb+srv://shrutijwal999:i5mFePqeLL5PSubZ@blogsite-cluster.57cdi.mongodb.net/?retryWrites=true&w=majority&appName=BlogSite-cluster

module.exports = connectDB;


