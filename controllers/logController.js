// logController.js
import logModel from "../models/logModel.js";
import generateSuggestions from "../utils/decisionLogic.js"


// save a counselling log
const addLog = async (req, res) => {
  try {
    const { awwId, clientName, questions, answers } = req.body;

    const { topics, notes } = generateSuggestions(questions, answers);

    const newLog = new logModel({
      awwId,
      clientName,
      questions,
      answers,
      topics,
      notes
    });

    await newLog.save();

    res.json({
      success: true,
      message: "Log saved successfully",
      log: newLog
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// get all logs (for admin)
const getAllLogs = async (req, res) => {
  try {
    const logs = await logModel.find().sort({ timestamp: -1 });
    res.json({ success: true, message: logs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addLog, getAllLogs };
