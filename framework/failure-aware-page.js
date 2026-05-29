import { captureFailureScreenshot } from './failure-screenshot.js';

const SCREENSHOT_CAPTURED = Symbol('screenshotCaptured');

function isThenable(value) {
  return value != null && typeof value.then === 'function';
}

function isLocatorLike(value) {
  return value != null && typeof value.click === 'function' && typeof value.fill === 'function';
}

function markScreenshotCaptured(error) {
  error[SCREENSHOT_CAPTURED] = true;
  return error;
}

export function wasScreenshotCaptured(error) {
  return Boolean(error?.[SCREENSHOT_CAPTURED]);
}

function wrapLocator(locator, flowName, page) {
  return wrapWithFailureScreenshot(locator, flowName, page);
}

async function captureAndRethrow(page, flowName, error) {
  await captureFailureScreenshot(page, flowName);
  throw markScreenshotCaptured(error);
}

function wrapWithFailureScreenshot(target, flowName, page) {
  return new Proxy(target, {
    get(obj, prop, receiver) {
      const value = Reflect.get(obj, prop, receiver);

      if (typeof value !== 'function') {
        return value;
      }

      return (...args) => {
        let result;

        try {
          result = value.apply(obj, args);
        } catch (error) {
          return captureAndRethrow(page, flowName, error);
        }

        if (isLocatorLike(result)) {
          return wrapLocator(result, flowName, page);
        }

        if (!isThenable(result)) {
          return result;
        }

        return result.catch((error) => captureAndRethrow(page, flowName, error));
      };
    },
  });
}

/**
 * Wraps a Playwright page so any failed click/fill/etc. captures a viewport
 * screenshot before the error propagates. Flow code stays a flat script.
 */
export function wrapPageForFailures(page, flowName) {
  return wrapWithFailureScreenshot(page, flowName, page);
}
