const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("index");
})

// Base URL
router.use('/libros', require('./books.routes'))


module.exports = router