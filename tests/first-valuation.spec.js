import { test } from '@playwright/test';
import { AuthFlow } from '../framework/auth-flow.js';
import { TestConfig } from '../config/test-config.js';
import { FirstValuationFlow } from '../user-flows/first-valuation.js';

test.setTimeout(180000);

test('login and first valuation flow', async ({ page, context }) => {
  const auth = new AuthFlow(page, TestConfig);
  await new FirstValuationFlow(page, auth, TestConfig, context).run();
});
