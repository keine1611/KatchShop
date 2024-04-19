const db = require("../model");
const Comment = db.comment;
const Op = db.Sequelize.Op;

// Retrieve all Brands from the database.
exports.findAll = (req, res) => {
  Comment.findAll()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comment."
      });
    });
};

exports.create = async (req, res) => {
  try {
    comment = {
      content: req.body.content,
      stars: req.body.stars,
      id_cus: req.body.id_cus,
      id_prd: req.body.id_prd,
      title: req.body.title
    }
    const cmt_id = await Comment.create(comment)
    const cmt = await Comment.findByPk(cmt_id.id,{include:[
      {model:db.customer, include:[{model:db.account,attributes:['avatar_acc']}], attributes:['name_cus']}
    ]})
    res.status(200).send(cmt)
  } catch (error) {
    res.status(500).send({
      message: error
    })
  }
};

exports.getProductComment = async (req, res)=>{
    const id = req.params.id
    Comment.findAll({
        where: {id_prd: id},
        include:[
          {model:db.customer, include:[{model:db.account,attributes:['avatar_acc']}], attributes:['name_cus']}
        ]
      
      })
    .then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        res.status(500).send(err)
    })
}

// Find a single brand with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Brand.findByPk(id)
//     .then(data => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(400).send({
//           message: `Cannot find Brand with id=${id}.`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving Brand with id=" + id
//       });
//     });
// };

// // Update a brand by the id in the request
// exports.update = async (req, res) => {
//   const id = req.params.id;
//   let brand
//   if (!req.file) {
//     const old_brand = await db.brand.findByPk(id)
//     brand = {
//       name_brand: req.body.name_brand,
//       description_brand: req.body.description_brand,
//       logo_brand: old_brand.logo_brand
//     }
//   }
//   else {
//     const { filename } = req.file
//     brand = {
//       name_brand: req.body.name_brand,
//       description_brand: req.body.description_brand,
//       logo_brand: filename
//     }
//   }

//   Brand.update(brand, {
//     where: { id_brand: id }
//   })
//     .then(() => {
//       res.status(200).send({
//         message: "Brand was updated successfully.",
//         data: { ...brand, id_brand: id }
//       });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Brand"
//       });
//     });
// };

// // Delete a brand with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Brand.destroy({
//     where: { id_brand: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.status(200).send({
//           message: "Brand was deleted successfully!"
//         });
//       } else {
//         res.status(400).send({
//           message: `Cannot delete Brand with id=${id}. Maybe Brand was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Brand with id=" + id
//       });
//     });
// };

// // Delete all brands from the database.
// exports.deleteAll = (req, res) => {
//   Brand.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Brands were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all brands."
//       });
//     });
// };
