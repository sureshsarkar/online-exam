const mongoose = require('mongoose');

const connectToMongo = () => {
    mongoose.connect(process.env.DB_URI);
    console.log("DB Connected");   
}
module.exports = connectToMongo;