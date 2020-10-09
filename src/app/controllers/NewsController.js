
class NewsController {

    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/:slug
    // ex /news/new1, news/new2 --- new1, new2 is slug (biến động)
    detail(req, res) {
        res.send('News Detail');
    }
}

module.exports = new NewsController;