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
        dents: {
            type: DataTypes.STRING,
            // allowNull: true
        },
        scratches: {
            type: DataTypes.STRING,
            // allowNull: true
        },
        odor: {
            type: DataTypes.STRING,
            // allowNull: true
        },
        stains: {
            type: DataTypes.STRING,
            // allowNull: true
        },
        overall_rating: {
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