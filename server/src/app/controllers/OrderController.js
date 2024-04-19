const { or } = require("sequelize");
const db = require("../model");
const Order = db.order;
const Op = db.Sequelize.Op;
const OrderDetail = db.orderDetail
const sequelize = db.sequelize
const Product = db.product

exports.createOrder = async (req, res) => {
    const { orderItem, id_cus, amount } = req.body.data
    const order = {
        id_cus: id_cus,
        total_order: amount,
        state_order: 'WAITING FOR CONFIRM'
    }
    var id_order
    await Order.create(order)
        .then((result) => {
            id_order = result.id_order
        }).catch((err) => {
            res.status(500).send()
        })
    orderItem.map(function (item, index) {
        const orderDetail = {
            id_order: id_order,
            id_prd: item.id_prd,
            quantity_oddt: item.quantity_cart,
            price_oddt: item.quantity_cart * item.price_prd
        }
        OrderDetail.create(orderDetail)
            .then(() => {
                Product.findByPk(orderDetail.id_prd)
                    .then(result => {
                        if (result.quantity_prd < orderDetail.quantity_oddt)
                            res.status(500).send()
                        Product.update({ quantity_prd: result.quantity_prd - orderDetail.quantity_oddt }, { where: { id_prd: orderDetail.id_prd } })
                        // Product.update({quantity_prd: })
                    })
                    .catch(err => res.status(500).send)
            })
            .catch(err => res.status(500).send())

    })
    res.status(200).send()
}

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
        if(isNaN(days)){
            const firstOrder = await Order.findOne({
                order: [['created_at', 'ASC']], // Order by created_at in ascending order
            })
            startDate = firstOrder.created_at
        }
        else{
            startDate = new Date();
            startDate.setDate(startDate.getDate() - days);
        }
        if (days <= 0) {
            return res.status(400).json({ error: 'Invalid number of days' });
        }
        
        endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        const dateRange = generateDateRange(startDate, endDate);

        // Query the database for daily total revenue
        const orders = await Order.findAll({
            attributes: [
                [sequelize.fn('date', sequelize.col('created_at')), 'date'], // Group by date
                [sequelize.fn('sum', sequelize.col('total_order')), 'total_revenue'] // Sum of total_order
            ],
            where: {
                created_at: {
                    [Op.between]: [startDate, endDate]
                }
            },
            group: ['date'], // Group by date
            order: [['date', 'ASC']] // Order by date ascending
        }); 

        const revenueMap = orders.reduce((map, order) => {
            const dateValue = order.dataValues.date;

            // Convert dateValue to a Date object if it is a string
            let date;
            if (typeof dateValue === 'string') {
                date = new Date(dateValue);
            } else {
                date = dateValue; // Assume it is already a Date object
            }
        
            // Format the date using toISOString() to get the date string
            const dateString = date.toISOString().split('T')[0];
        
            // Add the total revenue to the map
            map[dateString] = order.dataValues.total_revenue;
            return map;
        }, {});

        // Generate the chart data including days with zero revenue
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

function generateDateRange(startDate, endDate) {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}