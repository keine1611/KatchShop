module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
      id_prd: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      name_prd: {
        type: Sequelize.STRING(50)
      },
      price_prd: {
        type: Sequelize.INTEGER(10)
      },
      size_prd: {
        type: Sequelize.INTEGER(2)
      },
      quantity_prd: {
        type: Sequelize.INTEGER(10)
      },
      gender_prd: {
        type: Sequelize.INTEGER(1)
      },
      description_prd: {
        type: Sequelize.STRING(2000)
      },
      main_img_prd: {
        type: Sequelize.STRING(100)
      },
    });
  
    return Product;
  };