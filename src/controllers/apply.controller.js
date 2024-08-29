import Apply from "../models/apply.model.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

const createApply = catchAsync(async (req, res) => {
  const { name, email, phoneNumber, message } = req.body; 

  if (!name || !email || !message || !phoneNumber) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const apply = await Apply.create({
    name,
    email,
    phoneNumber,
    message, 
  });

  sendResponse(res, {
    statusCode: 201,
    message: "Applied successfully",
    result: apply,
  });
});

const applyController = {
  createApply,
};

export default applyController;
