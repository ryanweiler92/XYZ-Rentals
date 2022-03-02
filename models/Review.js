const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {};

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true    
        },
        condition: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        odor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comfort: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tech: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        car_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'car',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'review'
      }
);

module.exports = Review; 