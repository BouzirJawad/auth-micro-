const { body, validationResult } = require("express-validator");

const validateRegister = [
  body("firstName")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("First name must be between 3 and 30 characters"),
  body("lastName")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Last name must be between 3 and 30 characters"),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter"),
];

const validateLogin = [
  body("email").notEmpty().isEmail().withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validateRoleUpdate = [
  body("role")
    .isIn(["worker", "seller", "client", "admin"])
    .withMessage("Invalid rol"),
];

const validateProfile = [
  body("firstName")
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("First name must be between 3 and 30 characters"),
  body("lastName")
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Last name must be between 3 and 30 characters"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("profile.image")
    .optional()
    .isString()
    .withMessage("Profile image must be a valid string"),
  body("profile.imagePublicId")
    .optional()
    .isString()
    .withMessage("Profile image public ID must be a valid string"),
];

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: errors.array().map((err) => err.msg) });
  }
  next();
};

module.exports = {
  validateLogin,
  validateRegister,
  checkValidation,
  validateRoleUpdate,
  validateProfile,
};
