module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
       id_cmt: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      content_cmt: {
        type: Sequelize.STRING(200)
      },
      date_cmt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()")
      },
    });
  
    return Comment;
  };