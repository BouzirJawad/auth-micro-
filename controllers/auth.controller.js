const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../config/jwt");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      res.status(404).json({ message: "User already exists!" });
      return;
    }

    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPass,
      role: role || "student",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!", userId: newUser._id });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error, Enable to register!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res
        .status(400)
        .json({ message: "Invalid credentials! (user not found)" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res
        .status(400)
        .json({ message: "Invalid credentials! (wrong password)" });
      return;
    }

    const token = generateToken(user._id, user.role);
    res
      .status(201)
      .json({
        messge: "Login successful",
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        },
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error, Enable to login!" });
  }
};

module.exports = { register, login };
