const accountService = require('../domain/services/accountService');

class AccountController {
  async createAccount(req, res) {
    try {
      const acc = await accountService.createAccount(req.body);
      res.status(201).json({
        msg: 'Account created successfully',
        data: acc,
      });
    } catch (ex) {
      res.status(400).send({ error: ex.message });
    }
  }
}

module.exports = new AccountController();
