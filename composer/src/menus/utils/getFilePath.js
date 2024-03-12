/**
 * Returns the absolute file path for the given fileName.
 * The file path is resolved relative to the current module's directory.
 * @param fileName - The name of the file.
 * @returns The absolute file path.
 */
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const getFilePath = (fileName) =>
  path.resolve(__dirname, `../data/${fileName}`);
