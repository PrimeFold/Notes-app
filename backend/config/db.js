import mongoose from "mongoose"




const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Database connected successfully: ${conn.connection.host} / ${conn.connection.name}`)
    } catch (error) {

        console.log("Error connecting to database")
        console.log(error.message)
        process.exit(1)
    }
}

export default connectDB