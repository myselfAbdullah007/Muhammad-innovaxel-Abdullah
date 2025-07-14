const CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function generateShortCode(length = 6) {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
  }
  return code;
}

module.exports = generateShortCode; 