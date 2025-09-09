const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")
const { validateProfile, validateRoleUpdate, checkValidation } = require("../middleware/validate.middleware")
const authMiddleware = require("../middleware/auth.middleware")
const checkRole = require("../middleware/role.middleware")
const upload = require("../middleware/upload")

router.get("/", authMiddleware, checkRole(["admin"]), userController.getAllUsers)
router.get("/:userId", authMiddleware, userController.getUser)
router.put("/:userId/profile", authMiddleware, upload.single("image"), validateProfile, checkValidation, userController.updateProfile)
router.put("/:userId/role", authMiddleware, checkRole(["admin"]), validateRoleUpdate, checkValidation, userController.updateRole)
router.delete("/:userId/delete", authMiddleware, userController.deleteUser)

module.exports = router