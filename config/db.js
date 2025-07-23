const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("AuthManager is Connected"))
    } catch (error) {
       console.error("Error connecting Auth MongoDB", error) 
    }
}

module.exports = connectDB