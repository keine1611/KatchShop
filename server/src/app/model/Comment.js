module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
       id: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: Sequelize.STRING(200)
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()")
      },
      stars:{
        type:Sequelize.INTEGER,
        allowNull: true,
        defaultValue:1
      },
      title:{
        type: Sequelize.STRING(100),
        allowNull:false,
        defaultValue: 'Title comment'
      }
    });
  
    return Comment;
  };