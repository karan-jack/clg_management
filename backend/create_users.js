const http = require('http');

const signup = (data) => {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/signup',
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
  try {
    const student = await signup({
      college_id: '22ECE101',
      email: 'student5@college.com',
      password: 'Student@123'
    });
    console.log('Student Signup:', student);

    const professor = await signup({
      employee_id: 'PROF101',
      email: 'professor5@college.com',
      password: 'Professor@123'
    });
    console.log('Professor Signup:', professor);
  } catch (err) {
    console.error(err);
  }
};

run();
