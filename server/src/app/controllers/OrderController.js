const { or } = require("sequelize");
const db = require("../model");
const Order = db.order;
const Op = db.Sequelize.Op;
const OrderDetail = db.orderDetail
const sequelize = db.sequelize
const Product = db.product

exports.createOrder = async (req, res) => {
    const { orderItem, id_cus, amount } = req.body.data;
    const transaction = await sequelize.transaction();

    try {
        const order = {
            id_cus: id_cus,
            total_order: amount,
            state_order: 'WAITING FOR CONFIRM'
        };
        const createdOrder = await Order.create(order, { transaction });
        const id_order = createdOrder.id_order;

        for (const item of orderItem) {
            const orderDetail = {
                id_order: id_order,
                id_prd: item.product.id_prd,
                quantity_oddt: item.quantity_cart,
                price_oddt: item.quantity_cart * item.product.price_prd
            };

            await OrderDetail.create(orderDetail, { transaction });

            const product = await Product.findByPk(orderDetail.id_prd, { transaction });
            if (!product) {
                throw new Error('Product not found');
            }

            if (product.quantity_prd < orderDetail.quantity_oddt) {
                throw new Error('Product sold out');
            }

            await Product.update(
                { quantity_prd: product.quantity_prd - orderDetail.quantity_oddt },
                { where: { id_prd: orderDetail.id_prd }, transaction }
            );
        }

        await transaction.commit();
        res.status(200).send();
    } catch (error) {
        await transaction.rollback();
        res.status(500).send(error.message);
    }
};

exports.getAll = async (req, res) => {
    Order.findAll({ include: [db.customer, { model: db.orderDetail, include: db.product }] })
        .then((result) => {
            res.status(200).send(result)
        }).catch((err) => {
            res.status(500).send()
        })
}

exports.update = async (req, res) => {
    const id = req.params.id
    Order.update(req.body, { where: { id_order: id } })
        .then((result) => {
            res.status(200).send()
        }).catch((err) => {
            res.status(500).send()
        });
}

exports.delete = async (req, res) => {
    const id = req.params.id
    Order.destroy({ where: { id_order: id } })
        .then((result) => {
            res.status(200).send()
        }).catch((err) => {
            res.status(500).send()
        });
}

exports.getOrderForCustomer = async (req, res) => {
    const id = req.params.id
    Order.findAll({ where: { id_cus: id }, include: [{ model: db.orderDetail, include: db.product }] })
        .then((result) => {
            res.status(200).send(result)
        }).catch((err) => {
            res.status(500).send(err)
        });
}

exports.getRevenueLastDays = async (req, res) => {
    try {
        let startDate
        let endDate
        let days = parseInt(req.query.days, 10);
        if (isNaN(days)) {
            const firstOrder = await Order.findOne({
                order: [['created_at', 'ASC']],
            })
            startDate = firstOrder.created_at
        }
        else {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - days);
        }
        if (days <= 0) {
            return res.status(400).json({ error: 'Invalid number of days' });
        }

        endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        const dateRange = generateDateRange(startDate, endDate);

        const orders = await Order.findAll({
            attributes: [
                [sequelize.fn('date', sequelize.col('created_at')), 'date'],
                [sequelize.fn('sum', sequelize.col('total_order')), 'total_revenue']
            ],
            where: {
                created_at: {
                    [Op.between]: [startDate, endDate]
                }
            },
            group: ['date'],
            order: [['date', 'ASC']]
        });

        const revenueMap = orders.reduce((map, order) => {
            const dateValue = order.dataValues.date;
            let date;
            if (typeof dateValue === 'string') {
                date = new Date(dateValue);
            } else {
                date = dateValue;
            }

            const dateString = date.toISOString().split('T')[0];

            map[dateString] = order.dataValues.total_revenue;
            return map;
        }, {});

        const labels = dateRange.map(date => date.toISOString().split('T')[0]);
        const data = labels.map(label => {
            return revenueMap[label] || 0;
        });

        const chartData = {
            labels: labels,
            data: data,

        };
        res.json(chartData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getTopMostSoldProducts = async (req, res) => {
    const days = req.query.days ? parseInt(req.query.days, 10) : null;
    let dateRangeCondition = {};

    if (days !== null) {
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - days);
        dateRangeCondition.created_at = {
            [Op.gte]: startDate
        };
    }

    const topProducts = await OrderDetail.findAll({
        attributes: [
            'id_prd',
            [sequelize.fn('SUM', sequelize.col('quantity_oddt')), 'total_quantity_sold'],
            [sequelize.col('product.name_prd'), 'name'],
            [sequelize.col('product.price_prd'), 'price'],
            [sequelize.col('product.main_img_prd'), 'image']
        ],
        include: [
            {
                model: db.product,
                attributes: []
            },
            {
                model: db.order,
                attributes: [],
                where: dateRangeCondition
            }
        ],
        group: ['id_prd'],
        order: [['total_quantity_sold', 'DESC']],
        limit: 10
    });

    res.status(200).send(topProducts)

};



function generateDateRange(startDate, endDate) {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}