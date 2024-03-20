const db = require("../model");
const News = db.news;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: news } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, news, totalPages, currentPage };
};

// Retrieve all News from the database.
exports.findAll = (req, res) => {
    const { page, size, name } = req.query;
    var condition = name ? { content_news: { [Op.like]: `%${name}%` } } : null;

    const { limit, offset } = getPagination(page, size);

    News.findAndCountAll({ where: condition, limit, offset, include: ["staff"] })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving News."
            });
        });
};

exports.create = (req, res) => {
    if (!req.body.content_news) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }
    const news = {
        content_news: req.body.content_news,
        id_staff: req.body.id_staff,
    }

    // Save News in the database
    News.create(news)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the News."
            });
        });
};


// Find a single News with an id
exports.findOne = (req, res) => {
    const id = req.params.id_news

    News.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find News with id=${id}.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving News with id=" + id
            })
        })
};

// Update a News by the id in the request
exports.update = (req, res) => {
    const id = req.params.id_news;

    News.update(req.body, {
        where: { id_news: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "News was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update News with id=${id}. Maybe News was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating News with id=" + id
            });
        });
};

// Delete a News with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id_news;

    News.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "News was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete News with id=${id}. Maybe News was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete News with id=" + id
            });
        });
};

// Delete all News from the database.
exports.deleteAll = (req, res) => {
    News.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} News were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all News."
            });
        });
};
