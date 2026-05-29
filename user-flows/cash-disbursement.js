import { captureFailureScreenshot } from '../framework/failure-screenshot.js';
import { wrapPageForFailures, wasScreenshotCaptured } from '../framework/failure-aware-page.js';

class CashDisbursementFlow {
  constructor(page, auth, config) {
    this.page = wrapPageForFailures(page, 'cash-disbursement');
    this.auth = auth;
    this.auth.page = this.page;
    this.config = config;
  }

  async run() {
    const { queueLink, debitBankAccount } = this.config.cashDisbursement;
    const suffix = Date.now();

    try {
      await this.auth.loginAsAccounts();

      await this.page.getByRole('link', { name: queueLink }).click();
      await this.page.getByRole('row').last().getByLabel('Go to task').click();

      await this.page.getByRole('combobox', { name: 'Debit Bank Account *' }).click();
      await this.page.getByText(debitBankAccount).click();

      await this.page.getByRole('textbox', { name: 'UTR Transaction Number *' }).fill(`TestUTR_${suffix}`);
      await this.page.getByRole('textbox', { name: 'Remarks' }).fill(`TestRemark_${suffix}`);

      await this.page.getByRole('button', { name: 'Mark as Paid' }).click();
      await this.auth.logout();
    } catch (error) {
      if (!wasScreenshotCaptured(error)) {
        await captureFailureScreenshot(this.page, 'cash-disbursement');
      }
      throw error;
    }
  }
}

export { CashDisbursementFlow };
