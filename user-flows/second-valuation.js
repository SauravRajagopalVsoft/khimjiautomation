import { captureFailureScreenshot } from '../framework/failure-screenshot.js';

class SecondValuationFlow {
  constructor(page, auth) {
    this.page = page;
    this.auth = auth;
  }

  async run() {
    try {
      await this.auth.loginAsFrontOffice();
      await this.page.locator('a[href*="SecondValuation"]').first().click();
      await this.page.getByRole('row').last().getByLabel('Go to task').click();
      await this.page.getByRole('combobox').filter({ hasText: 'Select karat/purity' }).click();
      await this.page.getByText('22K').click();
      await this.page.getByRole('combobox').filter({ hasText: 'Select condition' }).click();
      await this.page.getByRole('option', { name: 'Good' }).click();
      await this.page.getByRole('button', { name: 'Submit' }).click();
      await this.auth.logout();
    } catch (error) {
      await captureFailureScreenshot(this.page, 'second-valuation');
      throw error;
    }
  }
}

export { SecondValuationFlow };
