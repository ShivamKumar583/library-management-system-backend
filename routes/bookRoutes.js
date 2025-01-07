const express = require('express');
const { getAllBooks, addBook, deleteBook, borrowBook, returnBook, getAllBooksByAvailability, getTotalNumberOfBooks, getAllBooksBorrowedByUser, getLastTransactionByUser } = require('../controllers/bookController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// admin 
router.get('/getAllBooks',protect, getAllBooks);
router.post('/add',protect,isAdmin, addBook);
router.delete('/delete/:bookId',protect,isAdmin, deleteBook);
router.get('/getTotalNumberOfBooks',protect, getTotalNumberOfBooks);

// normal user
router.get('/borrowedByUser/:userId',protect, getAllBooksBorrowedByUser);
router.get("/transactions/last/:userId",protect, getLastTransactionByUser);
router.post('/borrow/:id',protect, borrowBook);
router.post('/return/:bookId',protect, returnBook);
router.get('/getAllBooksByAvailability',protect, getAllBooksByAvailability);

module.exports = router;
