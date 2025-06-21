import clientModel from "../models/clientModel.js";
import dotenv from 'dotenv';
import getQuestionsFromLocal from "../utils/questionMapper.js";

dotenv.config();

const getClientsByAww = async (req, res) => {
  const { awwId } = req.params;

  try {
    const clients = await clientModel.find({ assignedAwwId: awwId });
    res.json({ success: true, message: clients });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



const addClient = async (req, res) => {
  try {
    const { name, childAgeMonths, pregnancyMonth, concern, assignedAwwId } = req.body;

    // Determine stage
    let stage = "";
    if (pregnancyMonth) stage = "Pregnant";
    else if (childAgeMonths <= 6) stage = "0–6 months";
    else stage = "6–24 months";

    // Get questions from local file
    const assignedQuestions = getQuestionsFromLocal(concern, stage);

    const newClient = new clientModel({
      name,
      childAgeMonths,
      pregnancyMonth,
      concern,
      assignedAwwId,
      assignedQuestions
    });

    await newClient.save();

    res.json({ success: true, message: "Client added with assigned questions", client: newClient });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}
export { getClientsByAww, addClient };
