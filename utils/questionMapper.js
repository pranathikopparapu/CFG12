import fs from "fs";
import path from "path";

const getQuestionsFromLocal = (concern, stage) => {
  const filePath = path.resolve("data/questions.json");
  const file = fs.readFileSync(filePath, "utf-8");
  const questionBank = JSON.parse(file);

  const match = questionBank.find(
    (item) =>
      item.concern.toLowerCase() === concern.toLowerCase() &&
      item.stage.toLowerCase() === stage.toLowerCase()
  );

  return match ? match.questions : [];
};

export default getQuestionsFromLocal;
