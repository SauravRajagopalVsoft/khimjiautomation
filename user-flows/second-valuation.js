import { test } from '@playwright/test';
import { MasterFlow } from '../framework/master-flow.js';
import { TestConfig } from '../config/test-config.js';

class SecondValuationFlow {
  constructor(page, masterFlow) {
    this.page = page;
    this.masterFlow = masterFlow;
  }

  async run() {
    await this.masterFlow.loginAsFrontOffice();
    await this.page.locator('a[href*="SecondValuation"]').first().click();
    await this.page.getByRole('row').last().getByLabel('Go to task').click();
    await this.page.getByRole('combobox').filter({ hasText: 'Select karat/purity' }).click();
    await this.page.getByText('22K').click();
    await this.page.getByRole('combobox').filter({ hasText: 'Select condition' }).click();
    await this.page.getByRole('option', { name: 'Good' }).click();
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await this.masterFlow.logout();
  }
}

test.setTimeout(180000);

test('second valuation flow', async ({ page }) => {
  const masterFlow = new MasterFlow(page, TestConfig);
  await new SecondValuationFlow(page, masterFlow).run();
});

export { SecondValuationFlow };
