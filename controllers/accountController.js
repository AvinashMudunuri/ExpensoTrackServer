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
  async getAllAccounts(req, res) {
    try {
      const tcs = await accountService.getAllAccounts();
      res.status(200).send(tcs);
    } catch (ex) {
      res.status(500).send(ex);
    }
  }

  async getAccountById(req, res, next) {
    try {
      const tc = await accountService.getAccountById(req.params.id);
      res.status(200).json(tc);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
      next();
    }
  }

  async updateAccountById(req, res, next) {
    const id = req.params.id;
    const updateData = req.body;
    try {
      const user = await accountService.updateAccountById(
        id,
        updateData
      );
      res.status(200).json(user);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
      next();
    }
  }

  async deleteAccountById(req, res, next) {
    try {
      const pm = await accountService.deleteAccountById(req.params.id);
      res.status(200).json(pm);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
      next();
    }
  }
}

module.exports = new AccountController();
