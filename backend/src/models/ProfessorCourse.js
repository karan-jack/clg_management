module.exports = (sequelize, DataTypes) => {
  const ProfessorCourse = sequelize.define('ProfessorCourse', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    professor_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    course_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'professor_courses',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return ProfessorCourse;
};
