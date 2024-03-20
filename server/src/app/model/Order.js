module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
      id_order: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      total_order: {
        type: Sequelize.INTEGER(20)
      },
      state_order:{
        type:Sequelize.STRING(20)
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()")
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()")
      }
    });
  
    return Order;
  };