const Sequelize = require('sequelize');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

sequelize = new Sequelize('cursed_stones', 'cursed_stones', 'cursed_stones', {
    host: '164.132.96.202',
    dialect: 'mysql',
    logging: false,
    define: {
        timestamps: false
    }
});

exports.sequelizeStore = new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 24 * 60 * 60 * 1000
});

exports.sequelize = sequelize;
