const PaymentMode = require('../models/paymentMode');

class PaymentModeRepository {
  async createPaymentMode(data) {
    const pm = new PaymentMode(data);
    return await pm.save();
  }
  async getAllPaymentModes() {
    return await PaymentMode.find();
  }
  async getPaymentModeById(id) {
    return await PaymentMode.findById(id);
  }
  async getPaymentModeByName(mode) {
    return await PaymentMode.findOne({ mode_name: mode });
  }
  async updatePaymentModeById(id, data) {
    return await PaymentMode.findByIdAndUpdate(id, data, { new: true });
  }
  async deletePaymentModeById(id) {
    return await PaymentMode.findByIdAndDelete(id);
  }
}

module.exports = new PaymentModeRepository();
