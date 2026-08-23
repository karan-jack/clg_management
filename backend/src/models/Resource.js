module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define('Resource', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    course_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING
    },
    file_type: {
      type: DataTypes.STRING
    },
    upload_date: {
      type: DataTypes.STRING
    },
    uploaded_by: {
      type: DataTypes.STRING
    },
    file_path: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'resources',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Resource;
};
