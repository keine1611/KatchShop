class SiteController{
    home(req, res){
        res.render('/')
    }
}

module.exports = new SiteController