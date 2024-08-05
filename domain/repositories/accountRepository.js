const Account = require('../models/account');
class AccountRepository {
  async createAccount(data) {
    const acc = new Account(data);
    return await acc.save();
  }
  async getAccountByName(name) {
    return await Account.findOne({ accountName: name });
  }
}

module.exports = new AccountRepository();
