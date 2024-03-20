const db = require("../model");
const Customer = db.customer;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: customers } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, customers, totalPages, currentPage };
};

// Retrieve all Product from the database.
exports.findPagination = (req, res) => {
    const { page, size, name } = req.query;
    var condition = name ? { name_cus: { [Op.like]: `%${name}%` } } : null;

    const { limit, offset } = getPagination(page, size);

    Customer.findAndCountAll({ where: condition, limit, offset , include: ["account"]})
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Customer."
            });
        });
};

exports.findAll = (req, res) => {
    Customer.findAll({include: ["account"]})
      .then(data => {
        const response = data
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving brands."
        });
      });
  };
  

//Create Customer
exports.create = (req, res) => {
    if (!req.body.name_cus) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }
    const customer = {
        name_cus: req.body.name_cus,
        address_cus: req.body.address_cus,
        phone_cus: req.body.phone_cus,
        email_cus: req.body.email_cus,
        id_acc: req.body.id_acc
    }

    // Save Customer in the database
    Customer.create(customer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
    const id = req.params.id_cus

    Customer.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find Customer with id=${id}.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Customer with id=" + id
            })
        })
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
    const id = req.params.id_cus;

    Customer.update(req.body, {
        where: { id_prd: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Customer with id=" + id
            });
        });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id_prd;

    Customer.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Customer with id=" + id
            });
        });
};

// Delete all Customer from the database.
exports.deleteAll = (req, res) => {
    Customer.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Customer were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Customer."
            });
        });
};
