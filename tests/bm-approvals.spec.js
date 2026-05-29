import { test } from '@playwright/test';
import { AuthFlow } from '../framework/auth-flow.js';
import { TestConfig } from '../config/test-config.js';
import { BmApprovalsFlow } from '../user-flows/bm-approvals.js';

test.setTimeout(180000);

test('bm approvals flow', async ({ page }) => {
  const auth = new AuthFlow(page, TestConfig);
  await new BmApprovalsFlow(page, auth).run();
});
