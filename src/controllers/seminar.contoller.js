import Seminar from "../models/seminar.model.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

const createSeminar = catchAsync(async (req, res) => {
  let { title, content, date, vanue, contact } = req.body;
  if (!req.user || !req.user._id) {
    throw new ApiError(401, "User authentication failed");
  }

  const author = req.user._id;
  if (!title || !content || !date || !vanue || !contact) {
    throw new ApiError(400, "Please provide all required fields");
  }
  const [day, month, year] = date.split("-");
  const parsedDate = new Date(`${year}-${month}-${day}`);
  const newSeminar = await Seminar.create({
    title,
    content,
    date: parsedDate,
    vanue,
    contact,
    author,
  });

  sendResponse(res, {
    statusCode: 201,
    message: "User created successfully",
    data: newSeminar,
  });
});
const seminarController = {
  createSeminar,
};

export default seminarController;
