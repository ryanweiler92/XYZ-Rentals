const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Car extends Model {};

Car.init(
    {
        id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true
        },
        make: {
            type: DataTypes.STRING,
            allowNull: false
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'car'
      }
);

module.exports = Car;