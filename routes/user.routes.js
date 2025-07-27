const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")

router.get("/user/:userId", userController.getUser)
router.delete("/user/delete/:userId", userController.deleteUser)
router.get("/test", async (req, res) => {
    res.send("hello test")
})

module.exports = router