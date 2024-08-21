const Session = require('../models/session');
const { serverLogger } = require('../../infrastructure/logger');

class SessionRepository {
  async createSession(data) {
    const session = new Session(data);
    return await session.save();
  }
  async deleteSession(token) {
    serverLogger.info(`Session Repository delete`)
    return await Session.findOneAndDelete({ token });
  }
  async findByToken(token) {
    return await Session.findOne({ token });
  }
}

module.exports = new SessionRepository();
