module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("accounts", {  
        id_acc: {
            type: Sequelize.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        username_acc: {
            type: Sequelize.STRING(10),
            unique: true
        },
        password_acc: {
            type: Sequelize.STRING(20)
        },
        role_acc: {
            type: Sequelize.STRING(20)
        },
        avatar_acc: {
            type: Sequelize.STRING(50)
        }
    });

    return Account;
};