const { or } = require("sequelize");
const db = require("../model");
const Order = db.order;
const Op = db.Sequelize.Op;
const OrderDetail = db.orderDetail
const Product = db.product

exports.createOrder = async (req, res)=>{
    const {orderItem, id_cus, amount} = req.body.data
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
    orderItem.map(function(item, index){
        const orderDetail = {
            id_order: id_order,
            id_prd: item.id_prd,
            quantity_oddt: item.quantity_cart,
            price_oddt: item.quantity_cart*item.price_prd
        }
        OrderDetail.create(orderDetail)
        .then(()=>{
            Product.findByPk(orderDetail.id_prd)
            .then(result=>{
                if(result.quantity_prd < orderDetail.quantity_oddt)
                    res.status(500).send()
                Product.update({quantity_prd:result.quantity_prd-orderDetail.quantity_oddt},{where:{id_prd:orderDetail.id_prd}})
                // Product.update({quantity_prd: })
            })
            .catch(err=> res.status(500).send)  
        })
        .catch(err=>res.status(500).send())
        
    })
    res.status(200).send()
}

exports.getAll =  async (req, res)=>{
    Order.findAll({include: [db.customer, {model:db.orderDetail, include: db.product}]})
    .then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        res.status(500).send()
    });
}

exports.update = async (req, res) =>{
    const id = req.params.id
    Order.update(req.body, {where: {id_order: id}})
    .then((result) => {
        res.status(200).send()
    }).catch((err) => {
        res.status(500).send()
    });
}

exports.delete = async (req, res)=>{
    const id = req.params.id
    Order.destroy({where:{id_order: id}})
    .then((result) => {
        res.status(200).send()
    }).catch((err) => {
        res.status(500).send()
    });
}

exports.getOrderForCustomer = async (req, res) =>{
    const id = req.params.id
    Order.findAll({where: {id_cus: id}, include:[{model: db.orderDetail, include: db.product}]})
    .then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        res.status(500).send(err)
    });
}