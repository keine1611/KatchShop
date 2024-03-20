const db = require("../model");
const Product = db.product;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: products } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, products, totalPages, currentPage };
};

// Retrieve all Product from the database.
exports.findPagination = (req, res) => {
    const { page, size, name } = req.query;
    var condition = name ? { name_prd: { [Op.like]: `%${name}%` } } : null;

    const { limit, offset } = getPagination(page, size);

    Product.findAndCountAll({ where: condition, limit, offset , include: ["brand"]})
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Product."
            });
        });
};

exports.findAll = (req, res) => {
    Product.findAll({include: 'brand'})
      .then(data => {
        const response = data
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
      });
  };

exports.create = (req, res) => {
    if (!req.body.name_prd) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }
    const product = {
        name_prd: req.body.name_prd,
        price_prd: req.body.price_prd,
        size_prd: req.body.size_prd,
        quantity_prd: req.body.quantity_prd,
        gender_prd: req.body.gender_prd,
        description_prd: req.body.description_prd,
        id_brand: req.body.id_brand
    }

    // Save brand in the database
    Product.create(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        });
};

// Find a single brand with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    Product.findByPk(id, {include: [db.image, db.brand]})
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find Product with id=${id}.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Product with id=" + id
            })
        })
};

// Update a product by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Product.update(req.body, {
        where: { id_prd: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
};

// Delete a Prodcut with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id

    Product.destroy({
        where: { id_prd: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
};

// Delete all Product from the database.
exports.deleteAll = (req, res) => {
    Product.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Product were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Product."
            });
        });
};
