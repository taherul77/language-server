import mongoose from "mongoose";
import "mongoose-type-phone";
import "mongoose-type-email";

const mailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: [true, "Email is required"],
    },
    phoneNumber: {
      type: mongoose.SchemaTypes.Phone,
      required: [true, "Phone number is required"],
      allowBlank: false,
      international: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
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

const Mail = mongoose.model("Mail", mailSchema);
export default Mail;
