const User = require("../models/User")

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: "User not found"})
    }

    res.status(201).json(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error, Enable to fetch User!" });
  }
}

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user =  await User.findById( { _id: userId })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    await User.findByIdAndDelete(userId)

    return res.status(200).json({ message: "User deleted successfully!" })
  } catch (error) {
    console.error("Delete user error:", error.message)
    return res.status(500).json({ message: "Failed to delete user", error: error.message})
  }
}

module.exports = { getUser, deleteUser }