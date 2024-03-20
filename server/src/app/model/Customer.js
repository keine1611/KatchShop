module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customers", {
      id_cus: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      name_cus: {
        type: Sequelize.STRING(50)
      },
      address_cus: {
        type: Sequelize.STRING(100)
      },
      phone_cus: {
        type: Sequelize.STRING(10)
      },
      email_cus: {
        type: Sequelize.STRING(50)
      },
      
    });
  
    return Customer;
  };