const chai = require('chai');
const chaiHttp = require('chai-http');
const {
  connectTestDB,
  disconnectDB,
} = require('../../../infrastructure/database');

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
      const userData = { name: 'John Doe', email: 'john@example.com', password: 'john123' };
      const user = await userService.createUser(userData);
      expect(user).to.have.property('_id');
      expect(user.name).to.equal('John Doe');
      expect(user.email).to.equal('john@example.com');
    });

    it('should not create user with duplicate email', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com', password: 'john123' };
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
    })

    it('Should throw error when valid email and wrong password is provided ', async () => {
      const userData = { email: 'john@example.com', password: 'john12' };
      try {
        await userService.login(userData.email, userData.password);
      } catch (ex) {
        expect(ex.message).to.equal('Invalid credentials');
      }
    })

    it('Should login an existing user', async () => {
      const userData = { email: 'john@example.com', password: 'john123' };
      const token = await userService.login(userData.email, userData.password);
      expect(token).to.be.a('string');
    })
  });

  describe('getAllUsers', () => {
    it('Should return all users', async () => {
      const users = await userService.getAllUsers();
      expect(users).to.be.an('array');
      expect(users.length).to.be.greaterThan(0);
    });
  });
});
