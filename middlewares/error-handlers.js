const notFoundHandler = (req, res) => {
    res.status(404).render('404.ejs')
}

module.exports = {
    notFoundHandler
}