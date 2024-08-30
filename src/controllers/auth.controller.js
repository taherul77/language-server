import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/user.model.js";
import sendResponse from "../utils/sendResponse.js";


const createUser = catchAsync(async (req, res) => {
  let { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const isExistingUser = await User.findOne({ email });

  if (isExistingUser) {
    throw new ApiError(409, "Email already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  password = hashedPassword;
  const newUser = await User.create({
    first_name,
    last_name,
    email,
    password,
    role: req.body?.role || "USER",
  });

  const payload = {
    id: newUser._id,
    role: newUser.role,
  };

  const JWT_SECRET = config.JWT_SECRET;
  const JWT_EXPIRES_IN = config.JWT_EXPIRES_IN;

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  sendResponse(res, {
    statusCode: 201,
    message: "User created successfully",
    result: {
      access: token,
    },
  });
});
const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const isUser = await User.findOne({
    email,
  });

  if (!isUser) {
    throw new ApiError(401, "User does not exist");
  }

  const isPasswordValid = bcrypt.compare(password, isUser.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const payload = {
    id: isUser._id,
    role: isUser.role,
  };

  const JWT_SECRET = config.JWT_SECRET;
  const JWT_EXPIRES_IN = config.JWT_EXPIRES_IN;

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  sendResponse(res, {
    statusCode: 200,
    message: "User logged in successfully",
    result: {
      access: token,
    },
  });
});

const authController = {
  createUser,
  loginUser,
};

export default authController;
