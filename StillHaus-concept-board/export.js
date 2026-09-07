import { fileURLToPath } from "url";
import path from "path";
import { execFileSync } from "child_process";
import os from "os";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = `file://${path.join(__dirname, "index.html")}`;
const output = path.join(__dirname, "stillhaus-concept-board.png");
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "stillhaus-board-"));

execFileSync(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  "--disable-dev-shm-usage",
  "--hide-scrollbars",
  "--no-first-run",
  "--no-default-browser-check",
  `--user-data-dir=${profile}`,
  "--window-size=1600,1060",
  `--screenshot=${output}`,
  input,
]);

console.log(`Saved ${output}`);
