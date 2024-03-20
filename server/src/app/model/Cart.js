module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("carts", {
      quantity_cart: {
        type: Sequelize.INTEGER(10)
      },
      id_cus:{
        type: Sequelize.INTEGER(10),
        primaryKey: true,
      },
      id_prd:{
        type: Sequelize.INTEGER(10),
        primaryKey: true,
      }
    });
    return Cart;
  };