module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
      id_news: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      content_news: {
        type: Sequelize.STRING(2000)
      }
    });
  
    return News;
  };