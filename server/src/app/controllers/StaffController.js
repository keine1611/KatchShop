const db = require("../model");
const Staff = db.staff;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: staffs } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, staffs, totalPages, currentPage };
};

// Retrieve all Product from the database.
exports.findAll = (req, res) => {
    const { page, size, name } = req.query;
    var condition = name ? { name_staff: { [Op.like]: `%${name}%` } } : null;

    const { limit, offset } = getPagination(page, size);

    Staff.findAndCountAll({ where: condition, limit, offset , include: ["account"]})
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Staff."
            });
        });
};

//Create Staff
exports.create = (req, res) => {
    if (!req.body.name_staff) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }
    const staff = {
        name_staff: req.body.name_staff,
        address_staff: req.body.address_staff,
        phone_staff: req.body.phone_staff,
        email_staff: req.body.email_staff,
        date_of_birth_staff: req.body.date_of_birth_staff,
        id_acc: req.body.id_acc
    }

    // Save Staff in the database
    Staff.create(staff)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Staff."
            });
        });
};

// Find a single Staff with an id
exports.findOne = (req, res) => {
    const id = req.params.id_staff

    Staff.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find Staff with id=${id}.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Staff with id=" + id
            })
        })
};

// Update a Staff by the id in the request
exports.update = (req, res) => {
    const id = req.params.id_cus;

    Staff.update(req.body, {
        where: { id_prd: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Staff was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Staff with id=${id}. Maybe Staff was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Staff with id=" + id
            });
        });
};

// Delete a Staff with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id_staff;

    Staff.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Staff was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Staff with id=${id}. Maybe Staff was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Staff with id=" + id
            });
        });
};

// Delete all Staff from the database.
exports.deleteAll = (req, res) => {
    Staff.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Staff were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Staff."
            });
        });
};
