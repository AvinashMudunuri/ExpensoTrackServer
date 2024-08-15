const paymentModeRepository = require('../repositories/paymentModeRepository');
const { setRedisKey, deleteRedisKey } = require('../../infrastructure/redis');

class PaymentModeService {
  async createPaymentMode(data) {
    const existingMode = await paymentModeRepository.getPaymentModeByName(
      data.mode_name
    );
    if (existingMode) {
      throw new Error('Payment Mode with this already exists');
    }
    return await paymentModeRepository.createPaymentMode(data);
  }
  async getAllPaymentModes() {
    return await paymentModeRepository.getAllPaymentModes();
  }
  async getPaymentModeId(id) {
    const pm = await paymentModeRepository.getPaymentModeById(id);
    if (pm) {
      const key = `PM::${id}`;
      await setRedisKey(key, pm);
      return pm;
    } else {
      throw new Error('Payment mode with this id doesnot exists');
    }
  }
  async updatePaymentModeById(id, data) {
    const pm = await paymentModeRepository.updatePaymentModeById(id, data);
    if (pm) {
      const key = `PM::${id}`;
      await deleteRedisKey(key);
      await setRedisKey(key, pm);
      return pm;
    } else {
      throw new Error('PM with this id doesnot exists');
    }
  }
  async deletePaymentModeById(id) {
    const deletedPM = await paymentModeRepository.deletePaymentModeById(id);
    if (deletedPM) {
      const key = `PM::${id}`;
      await deleteRedisKey(key);
      return deletedPM;
    } else {
      throw new Error('Payment mode with this id doesnot exists');
    }
  }
}

module.exports = new PaymentModeService();
