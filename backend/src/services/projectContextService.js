import { fileURLToPath } from "url";
import { projects } from "../data/projects/projects.js";
import path from "path";
import { readFile } from "fs/promises";
export const getProjectData = async (fileName) => {
  const existProject = projects[fileName];
  if (!existProject) {
    throw new Error("Invalid project name");
  }
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, "..", "data", "projects", existProject);
  const content = await readFile(filePath, "utf-8");
  return content;
};
