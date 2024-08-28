import Seminar from "../models/seminar.model.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import cloudinary from "../utils/cloudinary.js";
import sendResponse from "../utils/sendResponse.js";
import fs from "fs";
const createSeminar = catchAsync(async (req, res) => {
  const file = req.file;
  const user = req.user;
 console.log(file);
 
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
    author : user.id,
  });

  if(file){
    const fileName = `${Date.now()}-${file.originalname}`; // corrected originalname typo
    const filePath = file.path;
    const fileType = file.mimetype.split("/").pop(); // corrected split
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: `language`,
      filename_override: fileName,
      format: fileType,
      public_id: `language/${seminar._id}`,
      overwrite: true,
      invalidate: true,
    });
    console.log(uploadResult);
  
    seminar.image = uploadResult.secure_url;
    await seminar.save();
  
    fs.unlinkSync(filePath);
  }
  
  sendResponse(res, {
    statusCode: 201,
    message: "Seminar created successfully",
    result : seminar,
  });
});
const seminarController = {
  createSeminar,
};

export default seminarController;
