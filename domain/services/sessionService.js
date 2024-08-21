const sessionRepository = require('../repositories/sessionRepository');

class SessionService {
  async createSession(data) {
    return await sessionRepository.createSession(data);
  }
  async deleteSession(token) {
    console.log(`Session Service delete: `, token )
    const session = await sessionRepository.deleteSession(token);
    if (session) {
      console.log(`Session Service delete success: `, session )
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
