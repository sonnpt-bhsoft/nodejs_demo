
class SiteController {

    // [GET] /
    index(req, res) {
        res.render('home');
    }

    // [GET] /about
    about(req, res) {
        res.send('about us');
    }

    // [GET] /contact
    contact(req, res) {
        res.send('contact us');
    }


}

module.exports = new SiteController;