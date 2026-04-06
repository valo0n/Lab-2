const mongoose = require('mongoose');
require('dotenv').config();

const connectMongoDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI, { dbName: 'clicon_ecommerce' });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectMongoDB;
