import { test } from '@playwright/test';
import { AuthFlow } from '../framework/auth-flow.js';
import { TestConfig } from '../config/test-config.js';
import { FirstValuationFlow } from '../user-flows/first-valuation.js';
import { SecondValuationFlow } from '../user-flows/second-valuation.js';
import { BmApprovalsFlow } from '../user-flows/bm-approvals.js';
import { CashDisbursementFlow } from '../user-flows/cash-disbursement.js';

test.setTimeout(720000);

test('end to end loan pipeline', async ({ page, context }) => {
  const auth = new AuthFlow(page, TestConfig);
  await new FirstValuationFlow(page, auth, TestConfig, context).run();
  await new SecondValuationFlow(page, auth, TestConfig).run();
  await new BmApprovalsFlow(page, auth, TestConfig).run();
  await new CashDisbursementFlow(page, auth, TestConfig).run();
});
