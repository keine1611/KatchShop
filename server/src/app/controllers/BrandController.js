const db = require("../model");
const Brand = db.brand;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: brands } = data;
  const currentPage = page ? + page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, brands, totalPages, currentPage };
};

// Retrieve all Brands from the database.
exports.findAllPagination = (req, res) => {
  const { page, size, name } = req.query;
  var condition = name ? { name: { [Op.like]: `%${name_brand}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Brand.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving brands."
      });
    });
};

// Retrieve all Brands from the database.
exports.findAll = (req, res) => {
  Brand.findAll()
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

exports.create = async (req, res) => {
  if (!req.body.name_brand) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return
  }
  let brand
  if (!req.file) {
    brand = {
      name_brand: req.body.name_brand,
      description_brand: req.body.description_brand,
      logo_brand: 'defaut_brand_logo.jpg'
    }
  }
  else {
    const { filename } = req.file
    brand = {
      name_brand: req.body.name_brand,
      description_brand: req.body.description_brand,
      logo_brand: filename
    }
  }
  // Save brand in the database
  Brand.create(brand)
    .then((result) => {
      res.status(200).send({
        message: 'Create brand successfully',
        data: result
      })
    }).catch((err) => {
      res.status(500).send({
        message: err
      })
    })
};

// Find a single brand with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Brand.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(400).send({
          message: `Cannot find Brand with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Brand with id=" + id
      });
    });
};

// Update a brand by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  let brand
  if (!req.file) {
    const old_brand = await db.brand.findByPk(id)
    brand = {
      name_brand: req.body.name_brand,
      description_brand: req.body.description_brand,
      logo_brand: old_brand.logo_brand
    }
  }
  else {
    const { filename } = req.file
    brand = {
      name_brand: req.body.name_brand,
      description_brand: req.body.description_brand,
      logo_brand: filename
    }
  }

  Brand.update(brand, {
    where: { id_brand: id }
  })
    .then(() => {
      res.status(200).send({
        message: "Brand was updated successfully.",
        data: { ...brand, id_brand: id }
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Brand"
      });
    });
};

// Delete a brand with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Brand.destroy({
    where: { id_brand: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Brand was deleted successfully!"
        });
      } else {
        res.status(400).send({
          message: `Cannot delete Brand with id=${id}. Maybe Brand was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Brand with id=" + id
      });
    });
};

// Delete all brands from the database.
exports.deleteAll = (req, res) => {
  Brand.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Brands were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all brands."
      });
    });
};
