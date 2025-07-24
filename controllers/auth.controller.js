const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../config/jwt");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(404).json({ message: "User already exists!" });
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

    const user = {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
    };

    res.status(201).json({
      message: "User registered successfully!",
      user
    });
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
    res.status(201).json({
      messge: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error, Enable to login!" });
  }
};

module.exports = { register, login };
