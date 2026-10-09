import { generateResponse } from "../services/aiServices.js";

export const getMessage = async (req, res) => {
  const message = req.body.message;
  if (!message) {
    return res.status(400).json({
      message: "Message should not be empty",
      isSuccess: false,
      errorCode: 400,
    });
  }
  if (typeof message === "string") {
    const cleanedMessage = message.trim();
    if (cleanedMessage) {
      try {
        const response = await generateResponse(cleanedMessage);
        console.log(response);
        return res.status(200).json({
          message: response,
          isSuccess: true,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      return res.status(400).json({
        message: "Message should not be empty",
        isSuccess: false,
        errorCode: 400,
      });
    }
  }
  if (typeof message !== "string") {
    console.log(message);
    res.status(400).json({
      message: "Message should be a string",
      isSuccess: false,
      errorCode: 400,
    });
  }
};
