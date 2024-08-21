const sessionRepository = require('../repositories/sessionRepository');
class SessionService {
  async createSession(data) {
    return await sessionRepository.createSession(data);
  }
  async deleteSession(token) {    
    const session = await sessionRepository.deleteSession(token);
    if (session) {
      return session
    } else {
      throw new Error('Session with this token doesnot exists');
    }
  }
  async getSessionByToken(token) {
    return await sessionRepository.findByToken(token);
  }
}

module.exports = new SessionService();
