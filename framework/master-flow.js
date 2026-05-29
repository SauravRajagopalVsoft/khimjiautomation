class MasterFlow {
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
    await this.page.getByRole('textbox', { name: 'Username' }).click();
    await this.page.getByRole('textbox', { name: 'Username' }).fill(user.username);
    await this.page.getByRole('textbox', { name: 'Password' }).click();
    await this.page.getByRole('textbox', { name: 'Password' }).fill(user.password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }

  async logout() {
    await this.page.getByRole('button', { name: 'User profile menu' }).click();
    await this.page.getByText('Logout').click();
  }
}

export { MasterFlow };
