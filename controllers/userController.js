const userService = require('../domain/services/userService');
const sessionService = require('../domain/services/sessionService');
class UserController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      await sessionService.createSession({
        userId: user.id,
        token: user.token,
      });
      res.status(200).json({
        token: user.token,
      });
    } catch (ex) {
      res.status(400).json({
        error: ex.message,
      });
    }
  }

  async logout(req, res) {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      await sessionService.deleteSession(token);
      res.status(200).json({
        message: 'Logout Successful',
      });
    } catch (e) {
      res.status(500).json({
        error: 'Could not logout, please try again',
      });
    }
  }

  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({
        msg: 'User registered successfully',
        data: user,
      });
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

  async getUserById(req, res, next) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
      next();
    }
  }

  async updateUserById(req, res, next) {
    const id = req.params.id;
    const updateData = req.body;
    try {
      const user = await userService.updateUserById(id, updateData);
      res.status(200).json(user);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
      next();
    }
  }

  async deleteUserById(req, res, next) {
    try {
      const response = await userService.deleteUserById(req.params.id);
      if (response) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(500).send({ error: 'User with this id doesnot exists' });
      }
    } catch (ex) {
      res.status(500).send({ error: ex.message });
      next();
    }
  }
}

module.exports = new UserController();
