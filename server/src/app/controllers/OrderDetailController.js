const db = require("../model");
const OrderDetail = db.orderDetail;
const Op = db.Sequelize.Op;


// Retrieve all Brands from the database.
exports.findAll = (req, res) => {
  OrderDetail.findAll()
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

exports.create = (req, res) => {
  const brand = {
    name_brand: req.body.name_brand,
    description_brand: req.body.description_brand
  };

  // Save brand in the database
  OrderDetail.create(brand)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Brands."
      });
    });
};

// Find a single brand with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
     Cart.findAll({ include:'product',where: { id_cus: { [Op.eq]: id}}})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(400).send({
          message: `Cannot find CartItem with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving CartItem with id=" + id
      });
    });
};

// Update a brand by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Brand.update(req.body, {
    where: { id_brand: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send()
      } else {
        res.status(400).send({
          message: `Cannot update Brand with id=${id}. Maybe Brand was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Brand with id=" + id
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
