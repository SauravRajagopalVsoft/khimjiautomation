import fs from 'fs/promises';
import path from 'path';

const screenshotsRoot = path.join(process.cwd(), 'test-results', 'screenshots');

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

/**
 * Saves a full-page screenshot under test-results/screenshots/<flowName>/.
 * @returns {Promise<string>} Absolute path to the saved PNG.
 */
export async function captureFailureScreenshot(page, flowName) {
  const dir = path.join(screenshotsRoot, flowName);
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, `${timestamp()}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  return filePath;
}
