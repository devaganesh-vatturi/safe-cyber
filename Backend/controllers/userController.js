const bcrypt = require("bcryptjs"); // object for password hashing
const user = require("../models/usermodel"); // object of new user collection
const catchAsyncErrors = require("../middleware/catchAsyncErrors"); // by default error catcher
const authenticateJWT = require("../middleware/authMiddleware"); //validate the Token after login

// require("dotenv").config();

const jwt = require("jsonwebtoken"); //object to Generate JWT token

// Registration for new user
exports.createUser = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;

  const Email_Validation = await user.findOne({ email });

  if (Email_Validation) {
    return res
      .status(404)
      .json({ success: false, error: "Email_ID already exists" });
  }

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new user({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error: error.message, success: false });
  }
});

//Login for User
exports.userLogin = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists in the database
    const user_details = await user.findOne({ email });

    if (!user_details) {
      // user Details not found, send error response

      return res
        .status(404)
        .json({ success: false, message: "Invalid Email_ID or password." });
    }
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user_details.password);
    if (!passwordMatch) {
      // Passwords don't match, send error response
      return res
        .status(201)
        .json({ success: false, message: "Password is wrong" });
    }

    // const token = jwt.sign(
    //   { id: user_details._id, Email_ID: user_details.Email_ID }, // Payload data
    //   process.env.JWT_SECRET, // Secret key
    //   { expiresIn: "1h" } // Token expiry time (1 hour)
    // );
    res.status(200).json({
      success: true,
      message: "Login successful",
      //   token: token,
      user_details: user_details,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});
