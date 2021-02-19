import mongoose from 'mongoose'

 const connectDB = async () => {
    try {
        await mongoose.createConnection(process.env.MONGO_URI, {
        useUnifiedTopology:true,
        useNewUrlParser: true,
        useCreateIndex: true
        })
        console.log(`MongoDB Connect`)
    } catch (e) {
        console.log(e, 'Server error')
    }
}


export default connectDB
