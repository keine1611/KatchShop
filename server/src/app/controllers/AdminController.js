const axios = require('axios');


class AdminController {
  //GET: /
  index(req, res) {
    res.render('admin/admin_index', { title: 'hehe', layout: './layouts/admin.ejs' })
  }
  //GET: /brand
  findAllBrand = function (req, res) {
    const { page, size, name } = req.query;
    axios.get('http://localhost:1611/api/brand', {
      params: { page: page, size: size, name: name }
    })
      .then(function (response) {
        
        res.render('admin/admin_brand', { layout: './layouts/admin.ejs', data:(JSON.stringify(response.data)) , title: 'Brand', })
      })
      .catch()
  }
  //GET: /brand/:id
  findOneBrand = function (req, res) {
    axios.get('http://localhost:1611/api/brand/' + req.params.id)
      .then(function (response) {
        var i = (Number(response.data.currentPage) > 3 ? Number(response.data.currentPage) - 2 : 1)
        console.log(i)
        res.render('admin/admin_brand', { layout: 'admin.hbs', data: response.data, title: 'Brand', i: i })
      })
      .catch()
  }

}

module.exports = new AdminController