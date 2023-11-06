const { Sequelize } = require('sequelize');

 function createSequelize (databaseUrl) {
    let sequelize;

    if (databaseUrl) {
      // Use AWS RDS for production
      sequelize = new Sequelize(databaseUrl, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false // You should have the CA certificate ideally to avoid setting this to false
          }
        },
      });
      console.log('Using Prod DB', databaseUrl)
    } else {
      // Use SQLite for development
      console.log(`storage: ${process.env.HOME}/database.sqlite`)
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: `${process.env.HOME}/database.sqlite`,
        logging: false,
      });
    }

    return sequelize;
}

module.exports = createSequelize;