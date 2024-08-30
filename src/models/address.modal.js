import mongoose from "mongoose";
import "mongoose-type-phone";
import "mongoose-type-email";

const addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: [true, "Email is required"],
      unique: true,
    },
    phoneNumber: {
      type: mongoose.SchemaTypes.Phone,
      required: [true, "Phone number is required"],
      allowBlank: false,
      international: true,
    },
    Address: {
      type: String,
      required: [true, "Address is required"],
    },
    published: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("Address", addressSchema);

export default Address