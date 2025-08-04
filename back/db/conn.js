const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port:process.env.DB_PORT,
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com banco bem sucedida');
  })
  .catch((err) => {
    console.error('Não foi possível se conectar ao banco', err);
  });

module.exports = sequelize;