const { json } = require("sequelize");
const jwt = require('jsonwebtoken')
const db = require("../model");
const Account = db.account;
const Staff = db.staff;
const Customer = db.customer;
const Op = db.Sequelize.Op;


exports.register = (req, res)=>{
    const customer = {
        address_cus: req.body.address_cus,
        email_cus: req.body.email_cus,
        name_cus: req.body.name_cus,
        phone_cus: req.body.phone_cus
    }
    const account = {
        username_acc: req.body.username_acc,
        password_acc : req.body.password_acc,
        role_acc: 'customer',
        customer: customer 
    }
   
    var condition = account.username_acc ? { username_acc: account.username_acc} : null;
    Account.findAll({where: condition})
    .then(function(data){
        if(data.length != 0){
            res.status(409).send('User already exists')
        }
        else{
            Account.create(account, {include:[Customer]})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json('Create failed');
            })
        }
    })
}

exports.login = (req,res)=>{
    const account = {
        username_acc: req.body.username_acc,
        password_acc : req.body.password_acc,
    }
    Account.findAll({include:['staff', 'customer'],where: { username_acc: { [Op.eq]: account.username_acc}, password_acc: {[Op.eq]: account.password_acc }}})
    .then(function(data){
        if(data.length === 0)
            res.status(409).json('Username or password is incorrect')
        else{
            const token = jwt.sign({id:data[0].id_acc}, 'jwtkey')
            const {password_acc, ...other} = data[0].dataValues
            res.cookie('access_token', token, {
                httpOnly: false
            }).status(200).json(JSON.stringify(other))
        }
            
        
        
    })
    


}

exports.changeProfile = (req, res)=>{
}


exports.logout = (req,res)=>{
    res.clearCookie('access_token',{
        samSite:'none',
        secure: true
    }).status(200).json('User has been logged out.')
}
