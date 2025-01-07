const express = require('express');
const { getAllBooks, addBook, deleteBook, borrowBook, returnBook, getAllBooksByAvailability, getTotalNumberOfBooks } = require('../controllers/bookController');
const router = express.Router();

router.get('/getAllBooks', getAllBooks);
router.get('/getAllBooksByAvailability', getAllBooksByAvailability);
router.post('/add/:id', addBook);
router.delete('/delete/:id', deleteBook);
router.post('/borrow/:id', borrowBook);
router.post('/return/:id', returnBook);
router.get('/getTotalNumberOfBooks', getTotalNumberOfBooks);

module.exports = router;
