const { sequelize } = require('./src/models');

async function fixCoursesTable() {
  try {
    await sequelize.query("ALTER TABLE courses DROP FOREIGN KEY fk_courses_category;");
  } catch(e) {
    console.log("FK drop issue", e.message);
  }
  
  try {
    await sequelize.query(`
      ALTER TABLE courses 
      DROP COLUMN description,
      DROP COLUMN category_id,
      DROP COLUMN difficulty,
      DROP COLUMN thumbnail_url,
      DROP COLUMN estimated_hours,
      DROP COLUMN status,
      ADD COLUMN code VARCHAR(255) NOT NULL UNIQUE AFTER title,
      ADD COLUMN department VARCHAR(255),
      ADD COLUMN semester INT,
      ADD COLUMN batch VARCHAR(255),
      ADD COLUMN modules_count INT DEFAULT 0,
      ADD COLUMN color VARCHAR(255),
      ADD COLUMN bg VARCHAR(255),
      ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
    `);
    console.log("Successfully altered courses table");
  } catch (error) {
    console.error("Error altering table:", error);
  } finally {
    await sequelize.close();
  }
}

fixCoursesTable();
