module.exports = (sequelize, Sequelize) => {
    const OrderDetail = sequelize.define("order_details", {
        quantity_oddt: {
            type: Sequelize.INTEGER(10),
        },
        price_oddt: {
            type: Sequelize.INTEGER(20),
        },
        id_order: {
            type: Sequelize.INTEGER(10),
            primaryKey: true
        },
        id_prd: {
            type: Sequelize.INTEGER(10),
            primaryKey: true
        }
    });

    return OrderDetail;
};