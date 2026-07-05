module.exports = (sequelize, DataTypes) => {
  const StudentProfile = sequelize.define('StudentProfile', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    total_xp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    current_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    streak_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Studentprofile',
    timestamps: true
  });

  return StudentProfile;
};