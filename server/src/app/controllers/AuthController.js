const { json, where } = require("sequelize");
const jwt = require('jsonwebtoken')
const db = require("../model");
const Account = db.account;
const Staff = db.staff;
const Customer = db.customer;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize


exports.register = (req, res) => {
    const customer = {
        address_cus: req.body.address_cus,
        email_cus: req.body.email_cus,
        name_cus: req.body.name_cus,
        phone_cus: req.body.phone_cus
    }
    const account = {
        username_acc: req.body.username_acc,
        password_acc: req.body.password_acc,
        role_acc: 'customer',
        customer: customer
    }

    var condition = account.username_acc ? { username_acc: account.username_acc } : null;
    Account.findAll({ where: condition })
        .then(function (data) {
            if (data.length != 0) {
                res.status(409).send('User already exists')
            }
            else {
                Account.create(account, { include: [Customer] })
                    .then(data => {
                        res.status(200).json(data)
                    })
                    .catch(err => {
                        res.status(500).json('Create failed');
                    })
            }
        })
}

exports.login = (req, res) => {
    const account = {
        username_acc: req.body.username_acc,
        password_acc: req.body.password_acc,
    }
    Account.findAll({ include: ['staff', 'customer'], where: { username_acc: { [Op.eq]: account.username_acc }, password_acc: { [Op.eq]: account.password_acc } } })
        .then(function (data) {
            if (data.length === 0)
                res.status(409).json('Username or password is incorrect')
            else {
                const token = jwt.sign({ id: data[0].id_acc }, 'jwtkey')
                const { password_acc, ...other } = data[0].dataValues
                res.cookie('access_token', token, {
                    httpOnly: false
                }).status(200).json(JSON.stringify(other))
            }



        })



}

exports.changeProfile = async (req, res) => {

    let transaction; // Define transaction outside of try block

    try {
        transaction = await sequelize.transaction(); // Call sequelize.transaction as a function

        const id = req.params.id;

        if (req.file) {
            const { filename } = req.file;
            await Account.update({ avatar_acc: filename }, { where: { id_acc: id }, transaction });
        }

        const customer = {
            name_cus: req.body.name_cus,
            email_cus: req.body.email_cus,
            phone_cus: req.body.phone_cus,
            address_cus: req.body.address_cus
        };
        const id_cus = req.body.id_cus;

        await Customer.update(customer, { where: { id_cus: id_cus }, transaction });

        await transaction.commit(); // Commit transaction

        const updatedAccount = await Account.findByPk(id, { include: db.customer });
        res.status(200).send(updatedAccount);

    } catch (error) {
        if (transaction) await transaction.rollback(); // Rollback transaction if exists
        res.status(500).send(error.message);
    }
}

exports.changePassword = async (req, res)=>{
    try {
        const id = req.params.id
        const {password, newPassword} = req.body

        if(!password || !newPassword){
            return res.status(400).send({error: "Both current and new password is required"})
        }

        const account = await Account.findByPk(id);
        if (!account) {
            return res.status(404).send({ error: "Account not found" });
        }

        if(!(account.password_acc === password)){
            return res.status(401).send({ error: "Incorrect password" });
        }

        if(password === (newPassword)){
            return res.status(400).send({ error: "The new password must be different from the old password" });
        }
        
        account.password_acc = newPassword
        await account.save()

        return res.status(200).send({message: 'Change password sucessfull'})
        

    } catch (error) {
        return res.status(500).send(error.message);
    }
}


exports.logout = (req, res) => {
    res.clearCookie('access_token', {
        samSite: 'none',
        secure: true
    }).status(200).json('User has been logged out.')
}
