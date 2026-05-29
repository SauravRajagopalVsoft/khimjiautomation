# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: end-to-end.spec.js >> end to end loan pipeline
- Location: tests\end-to-end.spec.js:10:5

# Error details

```
ReferenceError: masterFlow is not defined
```

# Test source

```ts
  1  | import { test } from '@playwright/test';
  2  | import { MasterFlow } from '../framework/master-flow.js';
  3  | import { TestConfig } from '../config/test-config.js';
  4  | import { FirstValuationFlow } from '../user-flows/first-valuation.js';
  5  | import { SecondValuationFlow } from '../user-flows/second-valuation.js';
  6  | import { BmApprovalsFlow } from '../user-flows/bm-approvals.js';
  7  | 
  8  | test.setTimeout(540000);
  9  | 
  10 | test('end to end loan pipeline', async ({ page, context }) => {
  11 |   
> 12 |   await new FirstValuationFlow(page, masterFlow, context).run();
     |                                      ^ ReferenceError: masterFlow is not defined
  13 |   await new SecondValuationFlow(page, masterFlow).run();
  14 |   await new BmApprovalsFlow(page, masterFlow).run();
  15 | });
  16 | 
```