module.exports = (sequelize, DataTypes) => {
  const StudentBadge = sequelize.define('StudentBadge', {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'users', key: 'id' }
    },
    badge_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'badges', key: 'id' }
    },
    earned_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'student_badges',
    timestamps: false
  });
  return StudentBadge;
};
