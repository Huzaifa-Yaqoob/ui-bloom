import fs from "fs";
import path from "path";

export default function readFileContent(relativePath: string): string {
  const absolutePath = path.resolve(process.cwd(), relativePath);

  try {
    return fs.readFileSync(absolutePath, "utf-8");
  } catch (error) {
    console.error(`Error reading file: ${absolutePath}`, error);
    return "Error loading file content.";
  }
}
