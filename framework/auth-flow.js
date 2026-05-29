class AuthFlow {
  constructor(page, config) {
    this.page = page;
    this.config = config;
  }

  async openLoginPage() {
    await this.page.goto(`${this.config.baseUrl}/login`);
  }

  async login(user) {
    await this.page.getByRole('combobox', { name: 'Role' }).click();
    await this.page.getByRole('option', { name: user.role }).click();
    await this.page.getByRole('textbox', { name: 'Username' }).fill(user.username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(user.password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }

  async openAndLogin(user) {
    await this.openLoginPage();
    await this.login(user);
  }

  async loginAsCashier() {
    await this.openAndLogin(this.config.users.cashier);
  }

  async loginAsFrontOffice() {
    await this.openAndLogin(this.config.users.frontOffice);
  }

  async loginAsBranchManager() {
    await this.openAndLogin(this.config.users.branchManager);
  }

  async loginAsAccounts() {
    await this.openAndLogin(this.config.users.accounts);
  }

  async logout() {
    await this.page.getByRole('button', { name: 'User profile menu' }).click();
    await this.page.getByText('Logout').click();
  }
}

export { AuthFlow };
