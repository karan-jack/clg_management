module.exports = (sequelize, DataTypes) => {
  const ProfessorProfile = sequelize.define('ProfessorProfile', {
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
    employee_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    department: {
      type: DataTypes.STRING
    },
    designation: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'professor_profiles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return ProfessorProfile;
};