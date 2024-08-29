import Seminar from "../models/seminar.model.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import cloudinary from "../utils/cloudinary.js";
import sendResponse from "../utils/sendResponse.js";
import fs from "fs";

// Create Seminar
const createSeminar = catchAsync(async (req, res) => {
  const file = req.file;
  const user = req.user;

  const { title, content, date, vanue, contact } = req.body;

  if (!user) {
    throw new ApiError(401, "User authentication failed");
  }

  if (!title || !content || !date || !vanue || !contact) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const [day, month, year] = date.split("-");
  const parsedDate = new Date(`${year}-${month}-${day}`);
  const seminar = await Seminar.create({
    title,
    content,
    date: parsedDate,
    vanue,
    contact,
    author: user.id,
  });

  if (file) {
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = file.path;
    const fileType = file.mimetype.split("/").pop();
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: `language`,
      filename_override: fileName,
      format: fileType,
      public_id: `language/${seminar._id}`,
      overwrite: true,
      invalidate: true,
    });

    seminar.image = uploadResult.secure_url;
    await seminar.save();

    fs.unlinkSync(filePath);
  }

  sendResponse(res, {
    statusCode: 201,
    message: "Seminar created successfully",
    result: seminar,
  });
});

// Get All Seminars
const getAllSeminars = catchAsync(async (req, res) => {
  const seminars = await Seminar.find().populate('author');

  sendResponse(res, {
    statusCode: 200,
    message: "Fetched all seminars successfully",
    result: seminars,
  });
});

// Get Single Seminar
const getSingleSeminar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const seminar = await Seminar.findById(id).populate('author');

  if (!seminar) {
    throw new ApiError(404, "Seminar not found");
  }

  sendResponse(res, {
    statusCode: 200,
    message: "Fetched seminar successfully",
    result: seminar,
  });
});

// Update Single Seminar
const updateSeminar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, content, date, vanue, contact } = req.body;
  const file = req.file;

  if (!title || !content || !date || !vanue || !contact) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const [day, month, year] = date.split("-");
  const parsedDate = new Date(`${year}-${month}-${day}`);

  const seminar = await Seminar.findById(id);
  if (!seminar) {
    throw new ApiError(404, "Seminar not found");
  }

  seminar.title = title;
  seminar.content = content;
  seminar.date = parsedDate;
  seminar.vanue = vanue;
  seminar.contact = contact;

  if (file) {
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = file.path;
    const fileType = file.mimetype.split("/").pop();
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: `language`,
      filename_override: fileName,
      format: fileType,
      public_id: `language/${seminar._id}`,
      overwrite: true,
      invalidate: true,
    });

    seminar.image = uploadResult.secure_url;

    fs.unlinkSync(filePath);
  }

  await seminar.save();

  sendResponse(res, {
    statusCode: 200,
    message: "Seminar updated successfully",
    result: seminar,
  });
});

// Delete Single Seminar
const deleteSeminar = catchAsync(async (req, res) => {
  const { id } = req.params;

  const seminar = await Seminar.findByIdAndDelete(id);

  if (!seminar) {
    throw new ApiError(404, "Seminar not found");
  }

  sendResponse(res, {
    statusCode: 200,
    message: "Seminar deleted successfully",
    result: seminar,
  });
});

const seminarController = {
  createSeminar,
  getAllSeminars,
  getSingleSeminar,
  updateSeminar,
  deleteSeminar,
};

export default seminarController;
