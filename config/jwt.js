const jwt = require("jsonwebtoken")

const generateToken = (userId, userRole) => {
    return jwt.sign({ userId: userId, role: userRole}, process.env.JWT_SECRET_KEY, { expiresIn: "24h"})
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}

module.exports = { generateToken, verifyToken }
