module.exports = (sequelize, DataTypes) => {
  const LearningPathCourse = sequelize.define('LearningPathCourse', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    learning_path_id: {
      type: DataTypes.BIGINT,
      field: 'path_id',
      references: { model: 'learning_paths', key: 'id' }
    },
    course_id: {
      type: DataTypes.BIGINT,
      references: { model: 'courses', key: 'id' }
    },
    sequence_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'path_courses',
    timestamps: false
  });
  return LearningPathCourse;
};
