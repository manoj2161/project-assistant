import { fileURLToPath } from "url";
import path from "path";
import { readFile } from "fs/promises";
export const getProjectData = async (fileName = "habitly.md") => {
  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, "..", "data", "projects", fileName);
  const content = await readFile(filePath, "utf-8");
  return content;
};
