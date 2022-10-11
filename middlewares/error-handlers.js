const notFoundHandler = (req, res) => {
    res.status(404).render('404.ejs')
}

const errorHandler = (error, req , res, next) => {
    console.log(error)
    res.status(500).send(`${error}`)
}

module.exports = {
    notFoundHandler,
    errorHandler
}
