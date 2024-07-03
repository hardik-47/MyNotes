
const mongoose= require("mongoose");
// const URI= "mongodb://127.0.0.1:27017/mern_admin"

const URI="mongodb+srv://hardik:U5K0fZoDhqVxJCGl@cluster0.1vrjxuo.mongodb.net/mern_note?retryWrites=true&w=majority&appName=Cluster0";

const connectDb= async()=>{
 try {
    await mongoose.connect(URI);
   console.log("Connection success to db"); 
 } catch (error) {
    console.error("database connection failed");
    process.exit(0);
 }

}

module.exports=connectDb;