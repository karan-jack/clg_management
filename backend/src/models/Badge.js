module.exports = (sequelize, DataTypes) => {
  const Badge = sequelize.define('Badge', {
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
    icon: {
      type: DataTypes.STRING,
      allowNull: true
    },
    xp_reward: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    criteria: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'badges',
    timestamps: false
  });
  return Badge;
};
