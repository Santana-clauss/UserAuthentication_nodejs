const mongoose = require("mongoose");

const connectDB = (url) => {
    return mongoose.connect(url, {  // Add this line to enable the new parser
        
        
    });
};

module.exports = connectDB;
