import { test } from '@playwright/test';
import { AuthFlow } from '../framework/auth-flow.js';
import { TestConfig } from '../config/test-config.js';

class SecondValuationFlow {
  constructor(page, auth) {
    this.page = page;
    this.auth = auth;
  }

  async run() {
    await this.auth.loginAsFrontOffice();
    await this.page.locator('a[href*="SecondValuation"]').first().click();
    await this.page.getByRole('row').last().getByLabel('Go to task').click();
    await this.page.getByRole('combobox').filter({ hasText: 'Select karat/purity' }).click();
    await this.page.getByText('22K').click();
    await this.page.getByRole('combobox').filter({ hasText: 'Select condition' }).click();
    await this.page.getByRole('option', { name: 'Good' }).click();
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await this.auth.logout();
  }
}

test.setTimeout(180000);

test('second valuation flow', async ({ page }) => {
  const auth = new AuthFlow(page, TestConfig);
  await new SecondValuationFlow(page, auth).run();
});

export { SecondValuationFlow };
