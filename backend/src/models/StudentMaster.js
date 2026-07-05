module.exports = (sequelize, DataTypes) => {
  const StudentMaster = sequelize.define('StudentMaster', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    college_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING
    },
    semester: {
      type: DataTypes.INTEGER
    },
    section: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'student_master',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return StudentMaster;
};