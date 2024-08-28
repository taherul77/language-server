import mongoose from "mongoose";

const seminarSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    vanue: {
      type: String,
      required: [true, "Vanue is required"],
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
    },
    image: {
      type: String,
      required: false,
      default:
        "https://uwaterloo.ca/electrical-computer-engineering/sites/default/files/uploads/images/lecture-hall.png",
    },
    published: {
      type: Boolean,
      required: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
  },
  {
    timestamps: true, // Correct way to enable automatic `createdAt` and `updatedAt`
  }
);

const Seminar = mongoose.model("Seminar", seminarSchema);
export default Seminar;
