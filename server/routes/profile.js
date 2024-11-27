const express = require("express")
const router = express.Router()

const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  changePassword,
  getAllUsers,
  getUserDetails,
} = require("../controllers/profile")
const { auth } = require("../middleware/auth")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delete User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
// Route for Changing the password
router.post("/changepassword", auth, changePassword)
router.get("/getAllUsers", auth, getAllUsers)
router.get("/getUserDetails/:userId", auth, getUserDetails)

module.exports = router