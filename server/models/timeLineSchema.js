import mongoose from "mongoose";

const timeLineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title Required"],
  },
  description: {
    type: String,
    required: [true, "Description Required"],
  },
  timeline: {
    from: {
      type:String,
      required:[true,"Timeline Starting Date is Required"]
    },
    to: String,
  },
});

export const Timeline = mongoose.model("Timeline", timeLineSchema);
