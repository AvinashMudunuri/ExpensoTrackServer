const jwt = require('jsonwebtoken');

const payload = {
  id: '6686559680f5c4ee4fd78753',
  role: 'admin',
};
const secretKey = 'expensotrack';
const expiresIn = '365d';

const token = jwt.sign(payload, secretKey, { expiresIn });
console.log('Static JWT Token', token);
const isVaidToken = jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error(err);
    return false;
  }
  console.info('Valid token', decoded);
  return true;
});
console.log('isVaidToken', isVaidToken);
