const Session = require('../models/session');

class SessionRepository {
  async createSession(data) {
    const session = new Session(data);
    return await session.save();
  }
  async deleteSession(token) {
    return await Session.findOneAndDelete({ token });
  }
  async findByToken(token) {
    return await Session.findOne({ token });
  }
}

module.exports = new SessionRepository();
