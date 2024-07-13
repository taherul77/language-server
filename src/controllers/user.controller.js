import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

const getMe = catchAsync(async (req, res) => {
  const { id } = req.user;

  const user = await User.findById(id).select("-password -__v -createdAt");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  sendResponse(res, {
    statusCode: 200,
    message: "User retrieved successfully",
    data: user,
  });
});

const userController = {
  getMe,
};

export default userController;