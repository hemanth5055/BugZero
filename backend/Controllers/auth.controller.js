import { User } from "../Models/user.model.js";
import bcrypt from "bcrypt";
import { setTokenAsCookie } from "../utils/addCookies.js";

export async function signup(req, res) {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are Required" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const result = await newUser.save();
    if (!result) {
      return res.status(500).json({ success: false, msg: "Server error" });
    }
    const userObj = result.toObject();
    delete userObj.password; //no need of password
    setTokenAsCookie(userObj, res); //setting up cookie on response
    return res.status(201).json({
      success: true,
      msg: "User created successfully",
      user: userObj,
    });
  } catch (error) {
    console.log(error.message); //
    return res.status(500).json({ success: false, msg: error.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }

    const userInDb = await User.findOne({ email });
    if (!userInDb) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, userInDb.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }
    // Prepare user object
    const userObj = {
      _id: userInDb._id,
      name: userInDb.name,
      email: userInDb.email,
    };
    // Set token as cookie
    setTokenAsCookie(userObj, res);
    return res.status(200).json({
      success: true,
      msg: "Login successful",
      user: userObj,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
}

export async function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  return res
    .status(200)
    .json({ success: true, msg: "Logged out successfully" });
}

export async function checkAuth(req, res) {
  return res.status(200).json({ success: true, user: req.user });
}
