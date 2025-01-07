const express = require('express');
const { getAllBooks, addBook, deleteBook, borrowBook, returnBook, getAllBooksByAvailability, getTotalNumberOfBooks } = require('../controllers/bookController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/getAllBooks',protect, getAllBooks);
router.get('/getAllBooksByAvailability',protect, getAllBooksByAvailability);
router.post('/add/:id',protect,isAdmin, addBook);
router.delete('/delete/:id',protect,isAdmin, deleteBook);
router.post('/borrow/:id',protect, borrowBook);
router.post('/return/:id',protect, returnBook);
router.get('/getTotalNumberOfBooks',protect, getTotalNumberOfBooks);

module.exports = router;
