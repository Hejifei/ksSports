import http from './config.js'

export function sendEmail(email) {
  const url = '/get/system/sendEmail';
  const data = {
    email
  };
  return http({
    url,
    data,
    method: 'post'
  });
}

export function resetPwd(emailToken, password) {
  const url = '/get/system/modifyPassword';
  const data = {
    emailToken,
    password
  };
  return http({
    url,
    data,
    method: 'post'
  });
}
