const sequelize = require('../config/connection');
const { Car, Review } = require('../models');

const carSeedData = require('./carSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const cars = await Car.bulkCreate(carSeedData, {
    individualHooks: true,
    returning: true,
  });

  for (const { id } of cars) {
    const newReview = await Review.create({
      car_id: id,
    });
  }

  process.exit(0);
};

seedDatabase();





// const seedCars = require('./carSeedData.json');

// const sequelize = require('../config/connection');

// const seedAll = async () => {
//     await sequelize.sync({ force: true });
//     console.log('\n---------- DATABASE SYNCED --------\n');
//     await seedCars();
//     console.log('\n---------- CARS SEEDED --------\n');
// }

// seedAll(); 