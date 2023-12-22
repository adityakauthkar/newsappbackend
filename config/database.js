const mongoose=require('mongoose');
require('colors');
const connectDB = async ()=>{
    const con = await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser : true,
    });
    console.log(`cloud is connected to ${con.connection.host}`.blue);
}
module.exports = connectDB;   