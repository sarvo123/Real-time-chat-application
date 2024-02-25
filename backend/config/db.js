const mongoose = require('mongoose');


const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // userNewUrlParser : true,
            // useUnifiedTopology : true,
            // useFindAndModify : true,
        });

        console.log(`MongoDB is Connected : ${conn.connection.host}`.cyan.red);
    } catch(error){

        console.log(`Error : ${error.message}`.bgMagenta.bold);
        process.exit();

    }
}

module.exports = connectDB;