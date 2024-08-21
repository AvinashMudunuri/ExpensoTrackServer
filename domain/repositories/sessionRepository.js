const Session = require('../models/session');

class SessionRepository {
  async createSession(data) {
    const session = new Session(data);
    return await session.save();
  }
  async deleteSession(token) {
    const session = await Session.findOneAndDelete({ token });
    if (session) {
      return session;
    } else {
      return null;
    }
  }
  async findByToken(token) {
    return await Session.findOne({ token });
  }
}

module.exports = new SessionRepository();
