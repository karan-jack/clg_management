module.exports = (sequelize, DataTypes) => {
  const LearningPathCourse = sequelize.define('LearningPathCourse', {
    learning_path_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      references: { model: 'learning_paths', key: 'id' }
    },
    course_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      references: { model: 'courses', key: 'id' }
    }
  }, {
    tableName: 'learning_path_courses',
    timestamps: false
  });
  return LearningPathCourse;
};
