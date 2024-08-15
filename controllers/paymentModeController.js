const paymentModeService = require('../domain/services/paymentModeService');

class PaymentModeController {
  async createPaymentMode(req, res) {
    try {
      const pm = await paymentModeService.createPaymentMode(req.body);
      res.status(201).json({
        msg: 'Payment mode added successfully',
        data: pm,
      });
    } catch (ex) {
      res.status(400).send({ error: ex.message });
    }
  }

  async getAllPaymentModes(req, res) {
    try {
      const pms = await paymentModeService.getAllPaymentModes();
      res.status(200).send(pms);
    } catch (ex) {
      res.status(500).send(ex);
    }
  }

  async getPaymentModeById(req, res, next) {
    try {
      const pm = await paymentModeService.getPaymentModeId(req.params.id);
      res.status(200).json(pm);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
      next();
    }
  }

  async updatePaymentModeById(req, res, next) {
    const id = req.params.id;
    const updateData = req.body;
    try {
      const user = await paymentModeService.updatePaymentModeById(
        id,
        updateData
      );
      res.status(200).json(user);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
      next();
    }
  }

  async deletePaymentModeById(req, res, next) {
    try {
      const pm = await paymentModeService.deletePaymentModeById(req.params.id);
      res.status(200).json(pm);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
      next();
    }
  }
}

module.exports = new PaymentModeController();
