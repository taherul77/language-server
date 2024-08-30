import Address from "../models/address.modal.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

const createAddress = catchAsync(async (req,res) => {

    const { name, email, phoneNumber,address } = req.body;

    if (!name || !email || !phoneNumber|| !address) {
      throw new ApiError(400, "Please provide all required fields");
    }

  
    const addressCreate = await Address.create({
      name,
      email,
      phoneNumber,
      message,
    });

    sendResponse(res,{
        statusCode:201,
        message: "Address created successfully",
        result:addressCreate
    })
});

const getAllAddress = catchAsync(async (req,res) => {
  const addressall = await Address.find();

  sendResponse(res, {
    statusCode: 200,
    message: "Fetched all applies successfully",
    result: addressall,
  });
});


const updateAddress = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNumber,address  } = req.body;

  if (!name || !email || !address || !phoneNumber) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const addressUpdate = await Address.findByIdAndUpdate(
    id,
    { name, email, phoneNumber,address },
    { new: true, runValidators: true } 
  );

  if (!apply) {
    throw new ApiError(404, "Apply not found");
  }

  sendResponse(res, {
    statusCode: 200,
    message: "Apply updated successfully",
    result: addressUpdate,
  });
});


const deleteAddress = catchAsync(async(req,res) => {

  const { id } = req.params; 

  const addressDelete = await Address.findByIdAndDelete(id);

  if (!addressDelete) {
    throw new ApiError(404, "Apply not found");
  }

  sendResponse(res, {
    statusCode: 200,
    message: "Apply deleted successfully",
    result: addressDelete,
  });
})


const addressController = {
    createAddress,
    getAllAddress,
    updateAddress,
    deleteAddress
}

export default addressController;