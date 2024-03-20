module.exports = (sequelize, Sequelize) => {
    const Staff = sequelize.define("staffs", {
      id_staff: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      name_staff: {
        type: Sequelize.STRING(50)
      },
      address_staff: {
        type: Sequelize.STRING(100)
      },
      phone_staff: {
        type: Sequelize.STRING(10)
      },
      email_staff: {
        type: Sequelize.STRING(50)
      },
      date_of_birth_staff:{
        type: Sequelize.DATEONLY
      }
    });
  
    return Staff;
  };