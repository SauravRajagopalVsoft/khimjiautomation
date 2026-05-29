import { test } from '@playwright/test';
import { AuthFlow } from '../framework/auth-flow.js';
import { TestConfig } from '../config/test-config.js';

class FirstValuationFlow {
  constructor(page, auth, context = null) {
    this.page = page;
    this.auth = auth;
    this.context = context;
  }

  async run() {
    if (this.context) {
      await this.context.grantPermissions(['camera']);
    }

    await this.auth.loginAsCashier();

    await this.page.getByRole('button', { name: 'Customer' }).click();
    await this.page.getByRole('link', { name: 'Customer List' }).click();
    await this.page.getByRole('textbox', { name: 'UCIC Number' }).fill('UCIC-10-19');
    await this.page.getByRole('button', { name: 'Search' }).click();

    await this.page.getByRole('button', { name: 'Request New Loan' }).click();
    await this.page.getByRole('combobox').click();
    await this.page.getByText('Home renovation').click();
    await this.page.getByRole('button', { name: 'Save & Continue' }).click();
    await this.page.getByRole('button', { name: 'Turn Camera On' }).click();
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('button', { name: 'Capture Photo' }).click();
    await this.page.getByRole('button', { name: 'Capture Photo' }).click();
    await this.page.getByRole('button', { name: 'Save & Continue' }).click();

    await this.page.getByRole('button', { name: 'Add Ornament' }).click();
    await this.page.getByRole('combobox').click();
    await this.page.getByRole('option', { name: 'Bracelet' }).click();
    await this.page.getByRole('spinbutton', { name: 'Quantity *' }).fill('2');
    await this.page.getByRole('textbox', { name: 'Gross Weight (grams) *' }).fill('2');
    await this.page.getByRole('button', { name: 'Add Ornament' }).click();
    await this.page.getByRole('button', { name: 'Capture Photo' }).click();
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('button', { name: 'Capture Photo' }).click();
    await this.page.getByRole('button', { name: 'Save & Continue' }).click();

    await this.page.getByRole('combobox').filter({ hasText: 'Select karat/purity' }).click();
    await this.page.getByRole('option', { name: '22K' }).click();
    await this.page.getByRole('combobox').filter({ hasText: 'Select condition' }).click();
    await this.page.getByText('Good').click();
    await this.page.getByRole('button', { name: 'Save & Continue' }).click();

    await this.page.getByRole('textbox', { name: 'Enter nominee name' }).fill('test');
    await this.page.getByRole('combobox').click();
    await this.page.getByText('Mother', { exact: true }).click();
    await this.page.locator('input[type="date"]').fill('1997-01-01');
    await this.page.getByRole('button', { name: 'Save & Continue' }).click();
    await this.page.locator('div').filter({ hasText: /^KGL675H018 - \(Dynamic LTV\)Code: KGL675H018 - \(Dynamic LTV\)$/ }).first().click();
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await this.page.getByRole('button', { name: 'Submit Loan Request' }).click();
    await this.auth.logout();
  }
}

test.setTimeout(180000);

test('login and first valuation flow', async ({ page, context }) => {
  const auth = new AuthFlow(page, TestConfig);
  await new FirstValuationFlow(page, auth, context).run();
});

export { FirstValuationFlow };
