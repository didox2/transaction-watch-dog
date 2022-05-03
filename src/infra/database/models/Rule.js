'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rule = sequelize.define(
    'rule',
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      value: { type: DataTypes.STRING, allowNull: false },
      author: { type: DataTypes.STRING, allowNull: false },
      comment: { type: DataTypes.STRING },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    },
    {
      classMethods: {
        associate(models) {
          Rule.hasMany(models.Transaction);
        },
      },
    }
  );
  return Rule;
};
