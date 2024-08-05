const accountRepository = require('../repositories/accountRepository');

class AccountService {
  async createAccount(data) {
    const existingName = await accountRepository.getAccountByName(data.accountName);
    if (existingName) {
      throw new Error('Account name with this already exists');
    }
    return await accountRepository.createAccount(data);
  }
}

module.exports = new AccountService();
