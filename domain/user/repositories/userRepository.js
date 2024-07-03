const User = require('../models/user');

class UserRepository {
  async createUser(data) {
    const user = new User(data);
    return await user.save();
  }
  async getAllUsers() {
    return await User.find();
  }
  async findByEmail(email) {
    return await User.findOne({ email });
  }
  async getUserById(id) {
    return await User.findById(id);
  }
}

module.exports = new UserRepository();
