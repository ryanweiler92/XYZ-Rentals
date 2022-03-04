const sequelize = require('../config/connection');
const { Car } = require('../models');

const carSeedData = require('./carSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const cars = await Car.bulkCreate(carSeedData, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
};

seedDatabase();




