import fs from 'fs/promises';
import path from 'path';

const screenshotsRoot = path.join(process.cwd(), 'test-results', 'screenshots');

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

/**
 * Captures the current viewport as soon as it is called.
 * @returns {Promise<string|null>} Absolute path to the saved PNG, or null if capture failed.
 */
export async function captureFailureScreenshot(page, flowName) {
  if (page.isClosed()) {
    console.warn(`[${flowName}] Screenshot skipped: page is closed`);
    return null;
  }

  const dir = path.join(screenshotsRoot, flowName);
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, `${timestamp()}.png`);

  try {
    await page.screenshot({ path: filePath, fullPage: false });
    console.log(`[${flowName}] Failure screenshot: ${filePath}`);
    return filePath;
  } catch (screenshotError) {
    console.warn(`[${flowName}] Screenshot failed: ${screenshotError.message}`);
    return null;
  }
}
