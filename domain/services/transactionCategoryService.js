const transactionCategoryRepository = require('../repositories/transactionCategoryRepository');
const { setRedisKey, deleteRedisKey } = require('../../infrastructure/redis');

class TransactionCategoryService {
  async createTransactionCategory(data) {
    const existingCategory =
      await transactionCategoryRepository.getTransactionCategoryByName(
        data.mode_name
      );
    if (existingCategory) {
      throw new Error('Transaction Category with this already exists');
    }
    return await transactionCategoryRepository.createTransactionCategory(data);
  }
  async getAllTransactionCategories() {
    return await transactionCategoryRepository.getAllTransactionCategories();
  }
  async getTransactionCategoryById(id) {
    const tc =
      await transactionCategoryRepository.getTransactionCategoryById(id);
    if (tc) {
      const key = `TC::${id}`;
      await setRedisKey(key, tc);
      return tc;
    } else {
      throw new Error('Transaction Category with this id doesnot exists');
    }
  }
  async updateTransactionCategoryById(id, data) {
    const tc =
      await transactionCategoryRepository.updateTransactionCategoryById(
        id,
        data
      );
    if (tc) {
      const key = `TC::${id}`;
      await deleteRedisKey(key);
      await setRedisKey(key, tc);
      return tc;
    } else {
      throw new Error('Transaction Category with this id doesnot exists');
    }
  }
  async deleteTransactionCategoryById(id) {
    const deletedTC =
      await transactionCategoryRepository.deleteTransactionCategoryById(id);
    if (deletedTC) {
      const key = `TC::${id}`;
      await deleteRedisKey(key);
      return deletedTC;
    } else {
      throw new Error('Transaction Category with this id doesnot exists');
    }
  }
}

module.exports = new TransactionCategoryService();
