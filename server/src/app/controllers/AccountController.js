const db = require("../model");
const Account = db.account;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: accounts } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, accounts, totalPages, currentPage };
};

// Retrieve all Account from the database.
exports.findAll = (req, res) => {
    Account.findAll()
        .then(data => {
            const response = data
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving accounts."
            });
        });
};

//Create Account
exports.create = async(req, res) => {

    if (!req.body.username_acc) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }
    const existAccount = await Account.findAll({where:{username_acc: req.body.username_acc}})
    if(existAccount != undefined){
        return res.status(500).send({message: 'Username is exist'})
    }
    let account
    if (!req.file) {
        account = {
            username_acc: req.body.username_acc,
            password_acc: req.body.password_acc,
            role_acc: req.body.role_acc,
            avatar_acc: 'avatar_default.jpg'
        }
    }
    else {
        const { filename } = req.file
        account = {
            username_acc: req.body.username_acc,
            password_acc: req.body.password_acc,
            role_acc: req.body.role_acc,
            avatar_acc: filename
        }
    }
    Account.create(account)
    .then((result) => {
        res.status(200).send({
            message: 'Create account successfully',
            data: result
        })
    }).catch((err) => {
        res.status(500).send({
            message: err
        })
    })
};


// Find a single Account with an id
exports.findOne = (req, res) => {
    const id = req.params.id_acc

    Account.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find Account with id=${id}.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Account with username=" + id
            })
        })
};

// Update a Account by the id in the request
exports.update = async (req, res) => {
    let id_acc = req.params.id
    let account
    const thisAccount =  await Account.findByPk(id_acc)
    const existAccount = await Account.findAll({where:{username_acc: req.body.username_acc}})
    if(thisAccount.username_acc != req.body.username_acc && existAccount != undefined){
        return res.status(500).send({message: 'Username is exist'})
    }
    if (!req.file) {
        const old_account = await db.account.findByPk(id_acc)
        account = {
            username_acc: req.body.username_acc,
            password_acc: req.body.password_acc,
            role_acc: req.body.role_acc,
            avatar_acc: old_account.avatar_acc
        }
    }
    else {
        const { filename } = req.file
        account = {
            username_acc: req.body.username_acc,
            password_acc: req.body.password_acc,
            role_acc: req.body.role_acc,
            avatar_acc: filename
        }
    }
    Account.update(account, {
        where: { id_acc: id_acc },
        returning: true,
    })
        .then(() => {
            res.status(201).send({
                message: "Account was updated successfully.",
                data: {...account, id_acc: id_acc}   
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Account with id=" + id_acc
            });
        });
};

// Delete a Account with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Account.destroy({
        where: { id_acc: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Account was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Account with id=${id}. Maybe Account was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Account with id  =" + id
            });
        });
};

// Delete all Account from the database.
exports.deleteAll = (req, res) => {
    Account.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Account were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Account."
            });
        });
};
