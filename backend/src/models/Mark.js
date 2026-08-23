module.exports = (sequelize, DataTypes) => {
  const Mark = sequelize.define('Mark', {
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
    professor_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    lab_marks: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    theory_marks: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    semester: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'marks',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Mark;
};
