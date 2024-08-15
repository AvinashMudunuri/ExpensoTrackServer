const Account = require('../models/account');
class AccountRepository {
  async createAccount(data) {
    const acc = new Account(data);
    return await acc.save();
  }
  async getAllAccounts() {
    return await Account.find();
  }
  async getAccountByName(name) {
    return await Account.findOne({ accountName: name });
  }
  async getAccountById(id) {
    return await Account.findById(id);
  }
  async updateAccountById(id, data) {
    return await Account.findByIdAndUpdate(id, data, { new: true });
  }
  async deleteAccountById(id) {
    return await Account.findByIdAndDelete(id);
  }
}

module.exports = new AccountRepository();
