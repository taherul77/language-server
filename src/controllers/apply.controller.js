import Apply from "../models/apply.model.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

// Create Apply
const createApply = catchAsync(async (req, res) => {
  const { name, email, phoneNumber, message } = req.body;

  if (!name || !email || !message || !phoneNumber) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const isExistingUser = await Apply.findOne({ email });
  if (isExistingUser) {
    throw new ApiError(409, "Email already exists");
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

// Get All Applies
const getAllApplies = catchAsync(async (req, res) => {
  const applies = await Apply.find();

  sendResponse(res, {
    statusCode: 200,
    message: "Fetched all applies successfully",
    result: applies,
  });
});

const updateApply = catchAsync(async (req, res) => {
  const { id } = req.params; // Get ID from request parameters
  const { name, email, phoneNumber, message } = req.body; // Get data from request body

  if (!name || !email || !message || !phoneNumber) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const apply = await Apply.findByIdAndUpdate(
    id,
    { name, email, phoneNumber, message },
    { new: true, runValidators: true } // Return the updated document
  );

  if (!apply) {
    throw new ApiError(404, "Apply not found");
  }

  sendResponse(res, {
    statusCode: 200,
    message: "Apply updated successfully",
    result: apply,
  });
});


// Delete Single Apply
const deleteApply = catchAsync(async (req, res) => {
  const { id } = req.params; // Get ID from request parameters

  const apply = await Apply.findByIdAndDelete(id); // Find and delete the document

  if (!apply) {
    throw new ApiError(404, "Apply not found");
  }

  sendResponse(res, {
    statusCode: 200,
    message: "Apply deleted successfully",
    result: apply,
  });
});


const applyController = {
  createApply,
  getAllApplies,
  updateApply,
  deleteApply,
};

export default applyController;
