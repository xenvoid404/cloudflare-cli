import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../database/db.sqlite',
    logging: false
});

const configuration = sequelize.define('configuration', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    api_key: {
        type: DataTypes.STRING,
        allowNull: false
    },
    account_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zone_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zone_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

sequelize
    .sync()
    .then(() => console.log('Database ready!...'))
    .catch(err => console.error('Setup database error: ', err));
