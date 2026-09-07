import { fileURLToPath } from "url";
import path from "path";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = `file://${path.join(__dirname, "index.html")}`;
const output = path.join(__dirname, "stillhaus-concept-board.png");

const browser = await chromium.launch({
  // macOS sometimes refuses the sandboxed Chromium process's Mach
  // bootstrap check-in (bootstrap_check_in ... Permission denied (1100)).
  // Running unsandboxed avoids that IPC registration entirely -- safe
  // here since we're only rendering a local static file.
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({
  viewport: { width: 1600, height: 1060 },
  deviceScaleFactor: 2,
});

await page.goto(input, { waitUntil: "networkidle" });
await page.screenshot({
  path: output,
  fullPage: false,
  type: "png",
});

await browser.close();
console.log(`Saved ${output}`);
