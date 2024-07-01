const userService = require('../domain/user/services/userService');

class UserController {
  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).send(user);
    } catch (ex) {
      res.status(400).send({ error: ex.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).send(users);
    } catch (ex) {
      res.status(500).send(ex);
    }
  }
}

module.exports = new UserController();
