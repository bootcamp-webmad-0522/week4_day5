const router = require("express").Router();

const Book = require('./../models/Book.model')
const Author = require('./../models/Author.model')          // Necesario para la populacion


// All books list
router.get('/listado', (req, res) => {

    Book
        .find()
        .select({ title: 1 })
        .then(books => {
            res.render('books/list', { books })
        })
        .catch(err => console.log(err))
})


// One book details
router.get('/detalles/:book_id', (req, res) => {

    const { book_id } = req.params

    Book
        .findById(book_id)
        .populate('author')             // Nombre del campo a popular
        .then(book => {
            res.render('books/details', book)
        })
        .catch(err => console.log(err))
})



// New boook form (render)
router.get('/crear', (req, res) => {
    res.render('books/new-book')
})


// New boook form (handle)
router.post('/crear', (req, res) => {

    const { description, rating, title, author } = req.body

    Book
        .create({ title, rating, author, description })
        .then(book => res.redirect(`/libros/detalles/${book._id}`))
        .catch(err => console.log(err))
})




// Edit boook form (render)
router.get('/editar/:book_id', (req, res) => {

    const { book_id } = req.params

    Book
        .findById(book_id)
        .then(book => res.render('books/edit-book', book))
        .catch(err => console.log(err))
})



// Edit book form (handle)
router.post('/editar', (req, res) => {

    const { description, rating, title, author } = req.body
    const { book_id } = req.query

    Book
        .findByIdAndUpdate(book_id, { description, rating, title, author })
        .then(book => res.redirect(`/libros/detalles/${book._id}`))
        .catch(err => console.log(err))
})





// Delete book 
router.post('/eliminar/:book_id', (req, res) => {

    const { book_id } = req.params

    Book
        .findByIdAndDelete(book_id)
        .then(() => res.redirect(`/libros/listado`))
        .catch(err => console.log(err))
})


module.exports = router