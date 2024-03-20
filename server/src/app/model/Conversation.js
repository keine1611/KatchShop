module.exports = (sequelize, Sequelize) => {
    const Conversation = sequelize.define("conversations", {  
        id: {
            type: Sequelize.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        id_acc1: {
            type: Sequelize.INTEGER(10),
        },
        id_acc2: {
            type: Sequelize.INTEGER(10),
        }
    });

    return Conversation;
};