const mongoose = require("mongoose");

const connectDb = async () =>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected: ", connect.connection.host, connect.connection.name)
    }
    catch(err){
        console.log(err);
        process.exit();
    }
};

module.exports = connectDb;

