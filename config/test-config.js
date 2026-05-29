class TestConfig {
  static baseUrl = 'https://gldev-ui.azurewebsites.net';

  static customer = {
    ucicNumber: 'UCIC-10-19',
  };

  static loan = {
    schemeCode: 'KGL675H018 - (Dynamic LTV)',
    get selectionPattern() {
      const label = `${this.schemeCode}Code: ${this.schemeCode}`;
      return new RegExp(`^${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`);
    },
  };

  static users = {
    cashier: {
      role: 'Cashier',
      username: 'valuerno102',
      password: 'Valuerno@102',
    },
    frontOffice: {
      role: 'Front Office',
      username: 'valuerno101',
      password: 'Valuerno@101',
    },
    branchManager: {
      role: 'Branch Manager',
      username: 'branchmng110',
      password: 'Branchmng@110',
    },
    accounts: {
      role: 'Accounts',
      username: 'accounts001',
      password: 'Computer@123',
    },
  };

  static cashDisbursement = {
    queueLink: 'Bank Disbursement High 72',
    debitBankAccount: 'HDFC0100456 -',
  };
}

export { TestConfig };
