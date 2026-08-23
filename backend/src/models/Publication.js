module.exports = (sequelize, DataTypes) => {
  const Publication = sequelize.define('Publication', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authors: {
      type: DataTypes.STRING,
      allowNull: true
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: true
    },
    publication_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Published'
    },
    citation_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    tableName: 'publications',
    timestamps: false
  });
  return Publication;
};
