module.exports = (sequelize, DataTypes) => {
  const StudentProfile = sequelize.define('StudentProfile', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    student_master_id: {
      type: DataTypes.BIGINT,
      allowNull: true
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
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return StudentProfile;
};