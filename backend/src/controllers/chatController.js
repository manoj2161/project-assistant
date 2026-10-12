import { generateResponse } from "../services/aiServices.js";

export const getMessage = async (req, res) => {
  const message = req.body.message;
  const project = req.body.project;
  if (!message || !project) {
    return res.status(400).json({
      message: "Message or project should not be empty",
      isSuccess: false,
      errorCode: 400,
    });
  }

  if (typeof message === "string" && typeof project === "string") {
    const cleanedMessage = message.trim();
    const cleanedProject = project.trim();
    if (cleanedMessage && cleanedProject) {
      try {
        const response = await generateResponse(cleanedProject, cleanedMessage);
        console.log(response);
        return res.status(200).json({
          message: response,
          isSuccess: true,
        });
      } catch (error) {
        console.error(error);

        if (error.message === "Invalid project name") {
          return res.status(400).json({
            message: error.message,
            isSuccess: false,
            errorCode: 400,
          });
        }
        if (error.status) {
          return res.status(error.status).json({
            message: "AI service is temporarily unavailable. Please try again.",
            isSuccess: false,
            errorCode: error.status,
          });
        }

        return res.status(500).json({
          message: "Something went wrong on the server.",
          isSuccess: false,
          errorCode: 500,
        });
      }
    } else {
      return res.status(400).json({
        message: "Message should not be empty",
        isSuccess: false,
        errorCode: 400,
      });
    }
  }
  if (typeof message !== "string" || typeof project !== "string") {
    console.log(message);
    res.status(400).json({
      message: "Message or project should be a string",
      isSuccess: false,
      errorCode: 400,
    });
  }
};
