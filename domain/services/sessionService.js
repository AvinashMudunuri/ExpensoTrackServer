const sessionRepository = require('../repositories/sessionRepository');

class SessionService {
  async createSession(data) {
    return await sessionRepository.createSession(data);
  }
  async deleteSession(token) {
    return await sessionRepository.deleteSession(token);
  }
  async getSessionByToken(token) {
    return await sessionRepository.findByToken(token);
  }
}

module.exports = new SessionService();
