import { test } from '@playwright/test';
import { MasterFlow } from '../framework/master-flow.js';
import { TestConfig } from '../config/test-config.js';
import { FirstValuationFlow } from '../user-flows/first-valuation.js';
import { SecondValuationFlow } from '../user-flows/second-valuation.js';
import { BmApprovalsFlow } from '../user-flows/bm-approvals.js';

test.setTimeout(540000);

test('end to end loan pipeline', async ({ page, context }) => {
  
  await new FirstValuationFlow(page, masterFlow, context).run();
  await new SecondValuationFlow(page, masterFlow).run();
  await new BmApprovalsFlow(page, masterFlow).run();
});
