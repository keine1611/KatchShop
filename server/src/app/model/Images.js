module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("images", {
       id_img: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      url_img: {
        type: Sequelize.STRING(100)
      }
    });
  
    return Image;
  };