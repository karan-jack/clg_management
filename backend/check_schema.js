const { sequelize } = require('./src/models');

async function checkSchema() {
  try {
    const [results, metadata] = await sequelize.query("DESCRIBE courses;");
    console.log(results);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await sequelize.close();
  }
}

checkSchema();
