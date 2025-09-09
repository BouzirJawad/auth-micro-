const User = require("../models/User");
const bcrypt = require("bcrypt")
const cloudinary = require("../config/cloudinary")
const fs = require("fs");
const { error } = require("console");

const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error, Enable to fetch User!" });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.profile && user.profile.imagePublicId) {
      await cloudinary.uploader.destroy(user.profile.imagePublicId)
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error("Delete user error:", error.message);
    return res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, confirmPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      if (req.file && req.file.path) {
        fs.unlinkSync(req.file.path)
      }
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(confirmPassword, user.password);

    if (!isMatch) {
      if (req.file && req.file.path) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ message: "Wrong password!" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    if (req.file && req.file.path) {
      try {
        if (user.profile && user.profile.imagePublicId) {
          await cloudinary.uploader.destroy(user.profile.imagePublicId)
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "users/profile",
        })

        user.profile = {
          image: result.secure_url,
          imagePublicId: result.public_id
        }

        fs.unlinkSync(req.file.path)
      } catch (uploadError) {
         console.error("Cloudinary upload error:", uploadError.message);
        if (req.file && req.file.path) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profile: user.profile || null,
      },
    });
  } catch (error) {
    console.error(error.message);
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: "Server error, unable to update profile" });
  }
};

const updateRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findById(userId).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save({ validateBeforeSave: false});

    res
      .status(200)
      .json({ message: "Role updated successfully", user: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error, unable to update role" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (users.length === 0) {
      return res.status(400).json({ message: "No users to display!"})
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error, unable to fetch users" });
  }
};

module.exports = { getUser, deleteUser, updateProfile, updateRole, getAllUsers };
