const grants = require('../config/roles.json');
const AccessControl = require('accesscontrol');
const ac = new AccessControl(grants);

const grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      const permission = ac.can(req.user.role)[action](resource);
      if(!permission.granted) {
        return res.status(403).json({
          error: `you don't have enough permission to perform this action`
        })
      }
      next();
    } catch (ex) {
      next(ex);
    }
  }
}

module.exports = grantAccess