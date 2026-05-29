import { test, expect } from '@playwright/test';
import { MasterFlow } from '../framework/master-flow.js';
import { TestConfig } from '../config/test-config.js';
test.setTimeout(180000);

test('test', async ({ page, context }) => {
  const masterFlow = new MasterFlow(page, TestConfig);

  await context.grantPermissions(['camera']);
  
  // Login and first valuation flow
  await masterFlow.openLoginPage();
  await masterFlow.login(TestConfig.users.cashier);
  await page.getByRole('button', { name: 'Customer' }).click();
  await page.getByRole('link', { name: 'Customer List' }).click();
  //await page.getByRole('textbox', { name: 'UCIC Number' }).click();
  //await page.getByRole('radio', { name: 'Customer Details' }).click();
  //await page.getByRole('textbox', { name: 'Customer Name *' }).click();
  //await page.getByRole('textbox', { name: 'Customer Name *' }).fill('saurav');
  //await page.getByRole('textbox', { name: 'Customer Name *' }).press('Enter');
  //await page.getByRole('button', { name: 'View' }).nth(4).click();

  await page.getByRole('textbox', { name: 'UCIC Number' }).click();
  await page.getByRole('textbox', { name: 'UCIC Number' }).fill('UCIC-10-19');
  await page.getByRole('button', { name: 'Search' }).click();

  await page.getByRole('button', { name: 'Request New Loan' }).click();
  await page.getByRole('combobox').click();
  await page.getByText('Home renovation').click();
  await page.getByRole('button', { name: 'Save & Continue' }).click();
  await page.getByRole('button', { name: 'Turn Camera On' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Capture Photo' }).click();
  await page.getByRole('button', { name: 'Capture Photo' }).click();
  await page.getByRole('button', { name: 'Save & Continue' }).click();
  await page.getByRole('button', { name: 'Add Ornament' }).click();
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Bracelet' }).click();
  await page.getByRole('spinbutton', { name: 'Quantity *' }).click();
  await page.getByRole('spinbutton', { name: 'Quantity *' }).fill('2');
  await page.getByRole('textbox', { name: 'Gross Weight (grams) *' }).click();
  await page.getByRole('textbox', { name: 'Gross Weight (grams) *' }).fill('2');
  await page.getByRole('button', { name: 'Add Ornament' }).click();
  await page.getByRole('button', { name: 'Capture Photo' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Capture Photo' }).click();
  await page.getByRole('button', { name: 'Save & Continue' }).click();
  await page.getByRole('combobox').filter({ hasText: 'Select karat/purity' }).click();
  await page.getByRole('option', { name: '22K' }).click();
  await page.getByRole('combobox').filter({ hasText: 'Select condition' }).click();
  await page.getByText('Good').click();
  await page.getByRole('button', { name: 'Save & Continue' }).click();
  await page.getByRole('textbox', { name: 'Enter nominee name' }).click();
  await page.getByRole('textbox', { name: 'Enter nominee name' }).fill('test');
  await page.getByRole('combobox').click();
  await page.getByText('Mother', { exact: true }).click();
  await page.locator('input[type="date"]').fill('1997-01-01');
  await page.getByRole('button', { name: 'Save & Continue' }).click();
  await page.locator('div').filter({ hasText: /^KGL675H018 - \(Dynamic LTV\)Code: KGL675H018 - \(Dynamic LTV\)$/ }).first().click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Submit Loan Request' }).click();
  await masterFlow.logout();

  //Second valuation flow
  await masterFlow.openLoginPage();
  await masterFlow.login(TestConfig.users.frontOffice);
  await page.locator('a[href*="SecondValuation"]').first().click();
  await page.getByRole('row').last().getByLabel('Go to task').click();
  await page.getByRole('combobox').filter({ hasText: 'Select karat/purity' }).click();
  await page.getByText('22K').click();
  await page.getByRole('combobox').filter({ hasText: 'Select condition' }).click();
  await page.getByRole('option', { name: 'Good' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await masterFlow.logout();

  //Branch Manager flow
  await masterFlow.openLoginPage();
  await masterFlow.login(TestConfig.users.branchManager);

  //await page.getByRole('button', { name: 'Sign In' }).click();
  //await page.locator('button.group.text-left').filter({ hasText: 'BM Loan Approvals' }).click();
await page.getByRole('button', { name: 'Sign In' }).click();

await expect(
  page.getByRole('heading', { name: 'Welcome back, branchmng110!' })
).toBeVisible({ timeout: 60000 });

await expect(
  page.getByRole('heading', { name: 'My Approvals' })
).toBeVisible({ timeout: 60000 });

await expect(
  page.getByRole('button', { name: /BM Loan Approvals/i })
).toBeVisible({ timeout: 60000 });

await page.getByRole('button', { name: /BM Loan Approvals/i }).click();
  
  await page.locator('table tbody tr').last().getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Continue / Submit Annexure' }).click();
  await page.getByRole('textbox', { name: 'Serial number' }).click();
  await page.getByRole('textbox', { name: 'Serial number' }).fill(`testpktt_${Date.now()}`);
  await page.getByRole('textbox', { name: '0.00' }).click();
  await page.getByRole('textbox', { name: '0.00' }).fill('2');
  await page.getByRole('button', { name: 'Submit Packet' }).click();
  await page.getByRole('button', { name: 'Confirm Disbursement' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await masterFlow.logout();

});