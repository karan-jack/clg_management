module.exports = (sequelize, DataTypes) => {
  const StudentCourse = sequelize.define('StudentCourse', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    student_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    course_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Enrolled'
    },
    completed_modules: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'student_courses',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return StudentCourse;
};
