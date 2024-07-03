const userRepository = require('../repositories/userRepository');
const { redisClient } = require('../../../infrastructure/redis');
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
  async getUserById(id) {
    const user = await userRepository.getUserById(id);
    if (user) {
      const key = `user::${id}`;
      await redisClient.set(key, JSON.stringify(user), 'EX', 3600); // Cache for 1 hour
      return user;
    } else {
      throw new Error('User with this id doesnot exists');
    }
  }
  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User with this id doesnot exists');
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    return user.generateToken();
  }
}

module.exports = new UserService();
