import { test } from '@playwright/test';
import { AuthFlow } from '../framework/auth-flow.js';
import { TestConfig } from '../config/test-config.js';
import { SecondValuationFlow } from '../user-flows/second-valuation.js';

test.setTimeout(180000);

test('second valuation flow', async ({ page }) => {
  const auth = new AuthFlow(page, TestConfig);
  await new SecondValuationFlow(page, auth, TestConfig).run();
});
