const express = require("express");
const User = require("../models/UserSchema")
const jwt = require("jsonwebtoken")
const router = express.Router();
const OTP = require("../models/OtpSchema")
const sendMail = require("../config/SendMail")


//  creating the user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false })
    }

    const userexists = await User.findOne({ email })

    if (userexists) {
      return res.status(400).json({ message: "User already exists", success: false })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    await OTP.create({ email, otp, username, password })

    await sendMail(email, otp)

    return res.status(200).json({ message: "Otp sent successfully", success: true })

  } catch (error) {
    return res.status(500).json({ message: "Issue creating user", success: false, error: error.message })
  }
})

// logging in the user 

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false })
    }
    const userexists = await User.findOne({ email })

    if (!userexists) {
      return res.status(400).json({ message: "user does not exist", success: false })
    }

    const isMatch = await userexists.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password doesn't match ", success: false })
    }

    const token = jwt.sign(
      { id: userexists._id, username: userexists.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    return res.status(200).json({ message: "User logged in successfully", success: true, token })

  } catch (error) {
    return res.status(500).json({ message: "Issue Logging in user", success: false, error: error.message })
  }
})

// verifying otp
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "All fields are required", success: false })
    }

    const otpCheck = await OTP.findOne({ email })

    if (!otpCheck) {
      return res.status(400).json({ message: "Otp expired or not found", success: false })
    }

    if (otpCheck.otp !== otp) {
      return res.status(400).json({ message: "Invalid otp", success: false })
    }

    await User.create({ email: otpCheck.email, username: otpCheck.username, password: otpCheck.password })

    await OTP.deleteOne({ email })

    return res.status(200).json({ message: "user created successfully", success: true })

  } catch (error) {
    return res.status(500).json({ message: "Issue verifying otp", success: false, error: error.message })
  }
})




module.exports = router