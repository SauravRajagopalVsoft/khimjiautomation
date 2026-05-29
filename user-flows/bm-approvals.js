import { test, expect } from '@playwright/test';
import { MasterFlow } from '../framework/master-flow.js';
import { TestConfig } from '../config/test-config.js';

class BmApprovalsFlow {
  constructor(page, masterFlow) {
    this.page = page;
    this.masterFlow = masterFlow;
  }

  async run() {
    const { username } = this.masterFlow.config.users.branchManager;

    await this.masterFlow.loginAsBranchManager();

    await expect(this.page.getByRole('heading', { name: `Welcome back, ${username}!` })).toBeVisible({ timeout: 60000 });
    await expect(this.page.getByRole('heading', { name: 'My Approvals' })).toBeVisible({ timeout: 60000 });
    await expect(this.page.getByRole('button', { name: /BM Loan Approvals/i })).toBeVisible({ timeout: 60000 });

    await this.page.getByRole('button', { name: /BM Loan Approvals/i }).click();
    await this.page.locator('table tbody tr').last().getByRole('button', { name: 'View' }).click();
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForTimeout(5000);
    await this.page.getByRole('button', { name: 'Continue / Submit Annexure' }).click();
    await this.page.getByRole('textbox', { name: 'Serial number' }).fill(`testpktt_${Date.now()}`);
    await this.page.getByRole('textbox', { name: '0.00' }).fill('2');
    await this.page.getByRole('button', { name: 'Submit Packet' }).click();
    await this.page.getByRole('button', { name: 'Confirm Disbursement' }).click();
    await this.page.getByRole('button', { name: 'Approve' }).click();
    await this.masterFlow.logout();
  }
}

test.setTimeout(180000);

test('bm approvals flow', async ({ page }) => {
  const masterFlow = new MasterFlow(page, TestConfig);
  await new BmApprovalsFlow(page, masterFlow).run();
});

export { BmApprovalsFlow };
