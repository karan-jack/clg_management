const { sequelize } = require('./src/config/db');
const bcrypt = require('bcrypt');
const { User, Role } = require('./src/models');

async function run() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    const hashedPassword = await bcrypt.hash('Password@123', 10);
    
    // Create Student
    await User.create({
      email: 'student@college.com',
      password: hashedPassword,
      role_id: 3, // student
      is_active: true
    });
    console.log('Student created');

    // Create Professor
    await User.create({
      email: 'professor@college.com',
      password: hashedPassword,
      role_id: 2, // professor
      is_active: true
    });
    console.log('Professor created');

  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      console.log('Users already exist');
    } else {
      console.error(err);
    }
  } finally {
    process.exit(0);
  }
}
run();
