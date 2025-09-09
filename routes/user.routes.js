const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")
const { validateProfile, validateRoleUpdate, checkValidation } = require("../middleware/validate.middleware")
const upload = require("../middleware/upload")

router.get("/", userController.getAllUsers)
router.get("/:userId", userController.getUser)
router.put("/:userId/profile", upload.single("image"), validateProfile, checkValidation, userController.updateProfile)
router.put("/:userId/role", validateRoleUpdate, checkValidation, userController.updateRole)
router.delete("/:userId/delete", userController.deleteUser)

module.exports = router