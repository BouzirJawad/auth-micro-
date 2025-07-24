const express = require("express")
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth.routes")
const userRoutes = require("./routes/user.routes")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 7464

app.use(express.json())

connectDB()

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.listen(PORT, ()=> {
    console.log(`Auth server is running on port ${PORT}`)
})

