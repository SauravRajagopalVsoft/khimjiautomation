import { captureFailureScreenshot } from '../framework/failure-screenshot.js';
import { wrapPageForFailures, wasScreenshotCaptured } from '../framework/failure-aware-page.js';

class SecondValuationFlow {
  constructor(page, auth, config) {
    this.page = wrapPageForFailures(page, 'second-valuation');
    this.auth = auth;
    this.auth.page = this.page;
    this.config = config;
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
      if (!wasScreenshotCaptured(error)) {
        await captureFailureScreenshot(this.page, 'second-valuation');
      }
      throw error;
    }
  }
}

export { SecondValuationFlow };
