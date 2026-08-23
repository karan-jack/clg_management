module.exports = (sequelize, DataTypes) => {
  const LearningPath = sequelize.define('LearningPath', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Beginner'
    },
    estimated_hours: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'learning_paths',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return LearningPath;
};
