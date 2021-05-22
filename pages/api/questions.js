import fs from "fs";
import path from "path";

export default (req, res) => {
  if (req.method === "GET") {
    const level = req.query.level?.toLowerCase();
    const dataPath = path.join(process.cwd(), 'questions', level+'.json');
    let data = fs.readFileSync(dataPath);
    data = JSON.parse(data);
    res.status(200).json(data);
  }
};
