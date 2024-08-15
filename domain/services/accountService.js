const accountRepository = require('../repositories/accountRepository');
const { setRedisKey, deleteRedisKey } = require('../../infrastructure/redis');
class AccountService {
  async createAccount(data) {
    const existingName = await accountRepository.getAccountByName(data.accountName);
    if (existingName) {
      throw new Error('Account name with this already exists');
    }
    return await accountRepository.createAccount(data);
  }
  async getAllAccounts() {
    return await accountRepository.getAllAccounts();
  }
  async getAccountById(id) {
    const acc = await accountRepository.getAccountById(id);
    if (acc) {
      const key = `ACCOUNT::${id}`;
      await setRedisKey(key, acc);
      return acc;
    } else {
      throw new Error('Account with this id doesnot exists');
    }
  }
  async updateAccountById(id, data) {
    const acc = await accountRepository.updateAccountById(id, data);
    if (acc) {
      const key = `ACCOUNT::${id}`;
      await deleteRedisKey(key);
      await setRedisKey(key, acc);
      return acc;
    } else {
      throw new Error('Account with this id doesnot exists');
    }
  }
  async deleteAccountById(id) {
    const deletedAccount = await accountRepository.deleteAccountById(id);
    if (deletedAccount) {
      const key = `ACCOUNT::${id}`;
      await deleteRedisKey(key);
      return deletedAccount;
    } else {
      throw new Error('Account with this id doesnot exists');
    }
  }
}

module.exports = new AccountService();
