import Mail from "../models/mail.model.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

const createMail = catchAsync(async (req, res) => {
  const { name, email, phoneNumber, message } = req.body;

  if (!email || !phoneNumber || !message || !name) {
    throw new ApiError(400, "Please provide all required fields");
  }
  const mail = await Mail.create({
    name,
    email,
    phoneNumber,
    message,
  });

  sendResponse(res, {
    statusCode: 201,
    message: "Mail created successfully",
    result: mail,
  });
});

const getAllMail = catchAsync(async (req, res) => {
  const mails = await Mail.find();

  sendResponse(res, {
    statusCode: 200,
    message: "Fetched all mails successfully",
    result: mails,
  });
});

const updateMail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNumber, message } = req.body;
  if (!email || !phoneNumber || !message || !name) {
    throw new ApiError(400, "please provide all required fields");
  }
  const mail = await Mail.findByIdAndUpdate(
    id,
    { email, phoneNumber, message, name },
    { new: true, runValidators: true }
  );
  if (!mail) {
    throw new ApiError(404, "Api not found");
  }

  sendResponse(res, {
    statusCode: 200,
    message: "Mail updated successfully",
    result: mail,
  });
});

const deleteMail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const mail = await Mail.findByIdAndDelete(id);
  if (!mail) {
    throw new ApiError(404, "Mail not found");
  }

  sendResponse(res, {
    statusCode: 200,
    message: "Mail deleted successfully",
    result: mail,
  });
});

const mailController = {
  createMail,
  getAllMail,
  updateMail,
  deleteMail,
};
export default mailController;
