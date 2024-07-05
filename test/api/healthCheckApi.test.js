const request = require('supertest');
const app = require('../../infrastructure/server');
const chai = require('chai');
const expect = chai.expect;
// Set a longer timeout for all tests
const TEST_TIMEOUT = 30000;
describe(`Health Check API's`, function () {
  this.timeout(TEST_TIMEOUT);
  it('GET /health/redis should return status 200 and indicate healthy connection', (done) => {
    request(app)
      .get('/health/redis')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('status').that.equals('OK');
        expect(res.body)
          .to.have.property('message')
          .that.equals('Redis Connection is healthy');
        expect(res.body).to.have.property('ragStatus').that.equals('GREEN');

        done();
      });
  });
  it.skip('GET /health/db should return status 200 and indicate healthy connection', (done) => {
    request(app)
      .get('/health/db')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('status').that.equals('OK');
        expect(res.body)
          .to.have.property('message')
          .that.equals('MongoDB Connection is healthy');
        expect(res.body).to.have.property('ragStatus').that.equals('GREEN');
        done();
      });
  });
});
