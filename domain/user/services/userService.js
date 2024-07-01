const userRepository = require('../repositories/userRepository');

class UserService {
  async createUser(data) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    return await userRepository.createUser(data);
  }
  async getAllUsers() {
    return await userRepository.getAllUsers();
  }
}

module.exports = new UserService();
