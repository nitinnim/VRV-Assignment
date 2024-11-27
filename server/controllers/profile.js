const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageOnCloudinary } = require("../utils/imageUploader");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

exports.updateProfile = async (req, res) => {
  try {
    // fetch data
    const {
      firstName = "",
      lastName = "",
      gender = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
    } = req.body;

    // get userId
    const userId = req.user.id;
    // console.log("userid -> " + userId);
    // validation
    if (!userId) {
      return res.status(402).json({
        success: false,
        message: "Invalid user",
      });
    }

    // find profile
    const userDetails = await User.findById(userId);
    const profileDetails = await Profile.findById(
      userDetails.additionalDetails
    );

    const user = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
      },
      { new: true }
    );
    await user.save();

    // update profile (we are using save method because we have already created a profile object)
    profileDetails.gender = gender;
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.contactNumber = contactNumber;
    profileDetails.about = about;
    await profileDetails.save();

    const updatedUserDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      updatedUserDetails,
      message: "Profile updated successfully",
    });
  } catch (err) {
    console.log("Error in updating the profile", err);
    return res.status(500).json({
      success: false,
      message: "Can not update profile",
    });
  }
};

// delete user
exports.deleteAccount = async (req, res) => {
  try {
    // fetch id
    const userId = req.user.id;
    const userDetails = await User.findById({ _id: userId });

    // validation
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "Invalid user",
      });
    }

    // delete profile first
    await Profile.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(userDetails.additionalDetails),
    });

    // delete user
    await User.findByIdAndDelete({ _id: userId });

    // return response
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log("Error in deleting the user - ", err);
    return res.status(500).json({
      success: false,
      message: "Can not delete account, try again later",
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    // console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    // console.log("inside controller 1");
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageOnCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    // console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
    // console.log("inside controller 2");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// change password
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id);

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body;

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    // Match new password and confirm new password
    // if (newPassword !== confirmNewPassword) {
    // 	// If new password and confirm new password do not match, return a 400 (Bad Request) error
    // 	return res.status(400).json({
    // 		success: false,
    // 		message: "The password and confirm password does not match",
    // 	});
    // }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 12);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // // Send notification email
    // try {
    // 	const emailResponse = await mailSender(
    // 		updatedUserDetails.email,
    //             "Password for your account has been updated",
    // 		passwordUpdated(
    // 			updatedUserDetails.email,
    // 			`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
    // 		)
    // 	);
    // 	// console.log("Email sent successfully:", emailResponse.response);
    // } catch (error) {
    // 	// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
    // 	console.error("Error occurred while sending email:", error);
    // 	return res.status(500).json({
    // 		success: false,
    // 		message: "Error occurred while sending email",
    // 		error: error.message,
    // 	});
    // }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};

// get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json({
      success: true,
      message: "Got All Users Successfully",
      data: allUsers,
    });
  } catch (error) {
    console.error("Error in getting users: ", error);
    return res.status(500).json({
      success: false,
      message: "Error in getting users",
      error: error.message,
    });
  }
};

// get User details
exports.getUserDetails = async (req, res) => {
  try {

    const userId = req.params.userId;
    console.log(userId, '-userId');

    const userDetails = await User.findById(userId);
    if(!userDetails) {
      return res.status(402).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Got User Details Successfully",
      data: userDetails,
    });
  } catch (error) {
    console.error("Error in getting users: ", error);
    return res.status(500).json({
      success: false,
      message: "Error in getting users",
      error: error.message,
    });
  }
};