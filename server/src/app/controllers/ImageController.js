const db = require("../model");
const Image = db.image;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: images } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, images, totalPages, currentPage };
};

// Retrieve all Image from the database.
exports.findAll = (req, res) => {
    const { page, size, name } = req.query;
    var condition = name ? { url_img: { [Op.like]: `%${name}%` } } : null;

    const { limit, offset } = getPagination(page, size);

    Image.findAndCountAll({ where: condition, limit, offset, include: ["product"] })
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

exports.create = (req, res) => {
    if (!req.body.url_img) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }
    const image = {
        id_img: req.body.id_img,
        url_img: req.body.url_img,
        id_prd: req.body.id_prd
    }

    // Save brand in the database
    Image.create(image)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Image."
            });
        });
};


// Find a single Image with an id
exports.findOne = (req, res) => {
    const id = req.params.id_img

    Image.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find Image with id=${id}.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Image with id=" + id
            })
        })
};

// Update a Image by the id in the request
exports.update = (req, res) => {
    const id = req.params.id_img;

    Image.update(req.body, {
        where: { id_img: id }
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
    const id = req.params.id_img;

    Product.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Image was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Image with id=${id}. Maybe Image was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Image with id=" + id
            });
        });
};

// Delete all Image from the database.
exports.deleteAll = (req, res) => {
    Image.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Image were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Image."
            });
        });
};
