const http = require('http');

const login = (data) => {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length
      }
    };

    const req = http.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    });

    req.on('error', e => reject(e));
    req.write(payload);
    req.end();
  });
};

const run = async () => {
  console.log('Student Login:', await login({ email: 'student@college.com', password: 'Student@123' }));
  console.log('Professor Login:', await login({ email: 'professor@college.com', password: 'Professor@123' }));
};

run();
