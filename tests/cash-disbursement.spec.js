import { test } from '@playwright/test';
import { AuthFlow } from '../framework/auth-flow.js';
import { TestConfig } from '../config/test-config.js';
import { CashDisbursementFlow } from '../user-flows/cash-disbursement.js';

test.setTimeout(180000);

test('cash disbursement flow', async ({ page }) => {
  const auth = new AuthFlow(page, TestConfig);
  await new CashDisbursementFlow(page, auth, TestConfig).run();
});
