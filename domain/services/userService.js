const userRepository = require('../repositories/userRepository');
const { setRedisKey, deleteRedisKey } = require('../../infrastructure/redis');
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
      await setRedisKey(key, user);
      return user;
    } else {
      throw new Error('User with this id doesnot exists');
    }
  }
  async updateUserById(id, data) {
    const user = await userRepository.updateUserById(id, data);
    if (user) {
      const key = `user::${id}`;
      await deleteRedisKey(key);
      await setRedisKey(key, user);
      return user;
    } else {
      throw new Error('User with this id doesnot exists');
    }
  }
  async deleteUserById(id) {
    const deletedUser = await userRepository.deleteUserById(id);
    if (deletedUser) {
      const key = `user::${id}`;
      await deleteRedisKey(key);
      return deletedUser;
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
    return {
      id: user._id,
      token: await user.generateToken(),
    };
  }
}

module.exports = new UserService();
