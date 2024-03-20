module.exports = (sequelize, Sequelize) => {
  const Brand = sequelize.define("brands", {
    id_brand : {
      type: Sequelize.INTEGER(10),
      primaryKey: true,
      autoIncrement: true
    },
    name_brand: {
      type: Sequelize.STRING(50)
    },
    description_brand: {
      type: Sequelize.STRING(2000)
    },
    logo_brand: {
      type: Sequelize.STRING(50)
    }
  });

  return Brand;
};