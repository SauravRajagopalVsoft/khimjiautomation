class TestConfig {
  static baseUrl = 'https://gldev-ui.azurewebsites.net';

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
  };
}

export { TestConfig };
