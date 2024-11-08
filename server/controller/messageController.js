import { catchAsyncError } from "../middleware/catchAsyncErrors.js";

import ErrorHandler from "../middleware/error.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { senderName, subject, message } = req.body;
  if (!senderName || !subject || !message) {
    return next(new ErrorHandler("please fill full form", 400));
  }
  const data = await Message.create({ senderName, subject, message });
  res.status(200).json({
    success: true,
    message: "Message sent",
    data,
  });
});

export const getAllMessages = catchAsyncError(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});

export const deleteMessages = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) {
    return next(new ErrorHandler("message already deleted", 400));
  }
  await message.deleteOne();
  res.status(200).json({
    success: true,
    message: "Message Deleted",
  });
});
