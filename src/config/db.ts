import mongoose from 'mongoose';
 const db_url = process.env.DB_URL;
const connectDB=async()=>{
  try{
    await mongoose.connect(db_url as string);
    console.log("E-commerce-mvc connection successfull")
    //process.exit(1);
  }catch(err:any){
  console.log(err.message)
  }
}
export default connectDB;