const sessionRepository = require('../repositories/sessionRepository');
const { serverLogger } = require('../../infrastructure/logger');
class SessionService {
  async createSession(data) {
    return await sessionRepository.createSession(data);
  }
  async deleteSession(token) {
    serverLogger.info(`Session Service delete: `, token )
    const session = await sessionRepository.deleteSession(token);
    if (session) {
      serverLogger.info(`Session Service delete success: `, session )
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
