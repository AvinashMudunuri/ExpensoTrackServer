const chai = require('chai');
const chaiHttp = require('chai-http');
const { connectTestDB, disconnectDB } = require('../../../infrastructure/database');

const User = require('../../../domain/user/models/user');
const userService = require('../../../domain/user/services/userService');

const expect = chai.expect;
chai.use(chaiHttp);

// Set a longer timeout for all tests
const TEST_TIMEOUT = 10000;

describe('User Service', function () {
  this.timeout(TEST_TIMEOUT);

  before(async () => {
    await connectTestDB();
    await User.deleteMany({});
  });

  after(async () => {
    await disconnectDB();
  });

  describe('Create User', () => {
    it('should create new user', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };
      const user = await userService.createUser(userData);
      expect(user).to.have.property('_id');
      expect(user.name).to.equal('John Doe');
      expect(user.email).to.equal('john@example.com');
    });

    it('should not create user with duplicate email', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };
      try {
        await userService.createUser(userData);
      } catch (ex) {
        expect(ex.message).to.equal('User with this email already exists');
      }
    });
  });

  describe('getAllUsers', () => {
    it('Should return all users', async () => {
      const users = await userService.getAllUsers();
      expect(users).to.be.an('array');
      expect(users.length).to.be.greaterThan(0);
    });
  });
});
