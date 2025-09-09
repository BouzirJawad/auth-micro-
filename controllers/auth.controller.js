const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../config/jwt");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords must match"})
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }


    const hashPass = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPass,
      role: "client"
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      }
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
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profile: user.profile || null,
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error, Enable to login!" });
  }
};

module.exports = { register, login };
