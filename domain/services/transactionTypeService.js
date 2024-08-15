const transactionTypeRepository = require('../repositories/transactionTypeRepository');
const { setRedisKey, deleteRedisKey } = require('../../infrastructure/redis');

class TransactionTypeService {
  async createTransactionType(data) {
    const existingCategory =
      await transactionTypeRepository.getTransactionTypeByName(data.mode_name);
    if (existingCategory) {
      throw new Error('Transaction Category with this already exists');
    }
    return await transactionTypeRepository.createTransactionType(data);
  }
  async getAllTransactionTypes() {
    return await transactionTypeRepository.getAllTransactionTypes();
  }
  async getTransactionTypeById(id) {
    const tt = await transactionTypeRepository.getTransactionTypeById(id);
    if (tt) {
      const key = `TT::${id}`;
      await setRedisKey(key, tt);
      return tt;
    } else {
      throw new Error('Transaction Type with this id doesnot exists');
    }
  }
  async updateTransactionTypeById(id, data) {
    const tt = await transactionTypeRepository.updateTransactionTypeById(
      id,
      data
    );
    if (tt) {
      const key = `TT::${id}`;
      await deleteRedisKey(key);
      await setRedisKey(key, tt);
      return tt;
    } else {
      throw new Error('Transaction Type with this id doesnot exists');
    }
  }
  async deleteTransactionTypeById(id) {
    const deletedTT =
      await transactionTypeRepository.deleteTransactionTypeById(id);
    if (deletedTT) {
      const key = `TT::${id}`;
      await deleteRedisKey(key);
      return deletedTT;
    } else {
      throw new Error('Transaction Type with this id doesnot exists');
    }
  }
}

module.exports = new TransactionTypeService();
