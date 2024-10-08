const chai = require('chai');
const chaiHttp = require('chai-http');
const {
  connectTestDB,
  disconnectDB,
} = require('../../infrastructure/database');

const {
  deleteRedisKey,
  disconnectRedis,
} = require('../../infrastructure/redis');

const User = require('../../domain/models/user');
const userService = require('../../domain/services/userService');

const expect = chai.expect;
chai.use(chaiHttp);

// Set a longer timeout for all tests
const TEST_TIMEOUT = 10000;
let userId;

describe('User Service', function () {
  this.timeout(TEST_TIMEOUT);

  before(async () => {
    await connectTestDB();
    const user = await User.findOne({ email: 'john@example.com' });
    if (user) {
      await deleteRedisKey(`user::${user._id}`);
    }
    await User.deleteMany({});
  });

  after(async () => {
    await disconnectDB();
    await disconnectRedis();
  });

  describe('Create User', () => {
    it('should create new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'john123',
      };
      const user = await userService.createUser(userData);
      expect(user).to.have.property('_id');
      expect(user.name).to.equal('John Doe');
      expect(user.email).to.equal('john@example.com');
      userId = user._id;
    });

    it('should not create user with duplicate email', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'john123',
      };
      try {
        await userService.createUser(userData);
      } catch (ex) {
        expect(ex.message).to.equal('User with this email already exists');
      }
    });
  });

  describe('Login User', () => {
    it('Should throw error when invalid email is provided ', async () => {
      const userData = { email: 'jon@example.com', password: 'john123' };
      try {
        await userService.login(userData.email, userData.password);
      } catch (ex) {
        expect(ex.message).to.equal('User with this id doesnot exists');
      }
    });

    it('Should throw error when valid email and wrong password is provided ', async () => {
      const userData = { email: 'john@example.com', password: 'john12' };
      try {
        await userService.login(userData.email, userData.password);
      } catch (ex) {
        expect(ex.message).to.equal('Invalid credentials');
      }
    });

    it('Should login an existing user', async () => {
      const userData = { email: 'john@example.com', password: 'john123' };
      const user = await userService.login(userData.email, userData.password);
      expect(user.token).to.be.a('string');
    });
  });

  describe('getAllUsers', () => {
    it('Should return all users', async () => {
      const users = await userService.getAllUsers();
      expect(users).to.be.an('array');
      expect(users.length).to.be.greaterThan(0);
    });
  });

  describe('getUserById', () => {
    it('Should return user', async () => {
      const user = await userService.getUserById(userId);
      expect(user).to.have.property('_id');
      expect(user.name).to.equal('John Doe');
      expect(user.email).to.equal('john@example.com');
    });
    it('Should throw error with invalid id', async () => {
      try {
        await userService.getUserById('66851c96bee514225ee6ca86');
      } catch (ex) {
        expect(ex.message).to.equal('User with this id doesnot exists');
      }
    });
  });

  describe('updateUserById', () => {
    const data = {
      name: 'John Woo',
    };
    it('Should return user with new data', async () => {
      const user = await userService.updateUserById(userId, data);
      expect(user).to.have.property('_id');
      expect(user.name).to.equal('John Woo');
    });
    it('Should throw error with invalid id', async () => {
      try {
        await userService.getUserById('66851c96bee514225ee6ca86', data);
      } catch (ex) {
        expect(ex.message).to.equal('User with this id doesnot exists');
      }
    });
  });

  describe('deleteUserById', () => {
    it('Should delete user', async () => {
      const result = await userService.deleteUserById(userId);
      expect(result).to.have.property('_id');
    });
    it('Should throw error with invalid id', async () => {
      try {
        await userService.deleteUserById('66851c96bee514225ee6ca86');
      } catch (ex) {
        expect(ex.message).to.equal('User with this id doesnot exists');
      }
    });
  });
});
