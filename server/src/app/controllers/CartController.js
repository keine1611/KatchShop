const db = require("../model");
const Cart = db.cart;
const Op = db.Sequelize.Op;


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

exports.updateCart = (req, res)=>{
  const id = req.params.id
  const data = req.body
  Cart.destroy({where: { id_cus: { [Op.eq]: id}}})
  .then((result) => {
    try{
      data.map((item)=>{
        const cart = {
          id_cus: id,
          id_prd: item.product.id_prd,
          quantity_cart: item.quantity_cart
        }
        Cart.create(cart)
      })
      res.status(200).send()
    }
    catch{
      res.status(500).send()
    }
   
  }).catch((err) => {
    res.send(err)
  });

}

// Retrieve all Brands from the database.
exports.findAll = (req, res) => {
  Cart.findAll({attributes:['quantity_cart']}, {include: db.product})
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
  if (!req.body.name_brand) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const brand = {
    name_brand: req.body.name_brand,
    description_brand: req.body.description_brand
  };

  // Save brand in the database
  Brand.create(brand)
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
     Cart.findAll({attributes:['quantity_cart'], include:'product',where: { id_cus: { [Op.eq]: id}}})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(400).send({
          message: `Cannot find Customer cart with id=${id}.`
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
