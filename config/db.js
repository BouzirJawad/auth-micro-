const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("Auth-Manager connected"))
    } catch (error) {
       console.error("Error connecting auth database", error) 
    }
}

module.exports = connectDB