// test/user.test.js

const request = require('supertest');
const app = require('../../infrastructure/server'); // Assume your Express app is exported from app.js or server.js
const { disconnectDB } = require('../../infrastructure/database');
const { deleteRedisKey, disconnectRedis } = require('../../infrastructure/redis');
const User = require('../../domain/user/models/user');

const chai = require('chai');
const expect = chai.expect;
// Set a longer timeout for all tests
const TEST_TIMEOUT = 10000;
describe(`User API's`, function () {
  let token;
  let userId;
  this.timeout(TEST_TIMEOUT);

  before(async () => {
    const user = await User.findOne({ email: 'john@example.com' });
    if (user) {
      await deleteRedisKey(`user::${user._id}`)
    }
    await User.deleteMany({});
  });

  after(async () => {
    await disconnectDB();
    await disconnectRedis();
  });

  it('POST /api/users/auth/register', (done) => {
    request(app)
      .post('/api/users/auth/register')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data).to.have.property('_id');
        expect(res.body.data).to.have.property('name');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data).to.have.property('password');
        expect(res.body.data).to.have.property('role');
        expect(res.body.data).to.have.property('created_at');
        expect(res.body.data.name).to.equal('John Doe');
        expect(res.body.data.email).to.equal('john.doe@example.com');
        userId = res.body.data._id;
        done();
      });
  });

  it('POST /api/users/auth/login', (done) => {
    request(app)
      .post('/api/users/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('token');
        token = res.body.token;
        done();
      });
  });

  it('GET /api/users/:id', (done) => {
    request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('password');
        expect(res.body).to.have.property('role');
        expect(res.body).to.have.property('created_at');
        done();
      });
  });

  it('GET /api/users', (done) => {
    request(app)
      .get(`/api/users`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
        expect(res.body[0]).to.have.property('_id');
        expect(res.body[0]).to.have.property('name');
        expect(res.body[0]).to.have.property('email');
        expect(res.body[0]).to.have.property('password');
        expect(res.body[0]).to.have.property('role');
        expect(res.body[0]).to.have.property('created_at');
        done();
      });
  });

  // Add more tests as needed
});
