module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("messages", {
        id_message: {
            type: Sequelize.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        id_conversation: {
            type: Sequelize.INTEGER(10),
            allowNull: false
        },
        content: {
            type: Sequelize.STRING(200),
        },
        id_send:{
            type: Sequelize.INTEGER(10)
        },
        id_receive:{
            type: Sequelize.INTEGER(10)
        },
        timestamp: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("NOW()")
        }
    });

    return Message;
};