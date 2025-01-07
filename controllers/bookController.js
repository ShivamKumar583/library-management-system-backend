const Book = require("../models/bookModel");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");

// function to get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    if(books.length === 0){
        return res.json({
          success:ture,
            message:"No books found"
        })
    }
    res.json({success:true, books});
  } catch (err) {
    console.log("Error in getting all books:", err);
  }
};

// function to get all books by availability check
exports.getAllBooksByAvailability = async (req, res) => {
  try {
    const books = await Book.find({ availability: true });
    // console.log(books);
    if (!books.length) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No books found with the given availability.",
        });
    }

    return res.status(200).json({ success: true, books });
  } catch (error) {
    console.error("Error fetching books by availability:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// function to add a new book - admin
exports.addBook = async (req, res) => {
  try {
    const { title, author, publicationYear } = req.body.newBook;
    console.log(title , author,publicationYear);
    if (!title || !author || !publicationYear ) {
      return res.status(400).json({
        message: "Please provide all the data for adding book",
      });
    }

    const book = new Book({
      title,
      author,
      publicationYear,
      availability:true,
    });
    await book.save();
    console.log('done')
    res.status(201).json({ success:true ,message: "Book added successfully", book });
  } catch (err) {
    console.log("Error in functioning of adding book:", err);
  }
};

// function to delete a new book - admin
exports.deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;  // Get bookId from params
    console.log(bookId);

    if (!bookId) {
      return res.status(400).json({
        message: "Please provide the bookId for deleting the book",
      });
    }

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ success: true, message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// function to borrow a new book 
exports.borrowBook = async (req, res) => {
  try {
    const {userId, bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({
        message: "Please provide all the data for borrowing book book",
      });
    }
    const book = await Book.findById(bookId);

    if (!book.availability)
      return res.status(400).json({ message: "Book not available" });

    book.availability = false;
    await book.save();

    // Record the transaction
    await Transaction.create({
      userId,
      bookId,
      type: "borrow",
    });

    const borrowedAt = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowedAt.getDate() + 14); // 14 days due

    // Save borrowed book information to the user model
    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          borrowedBooks: {
            bookId: bookId,
            borrowedAt: borrowedAt,
            dueDate: dueDate,
          },
        },
      },
      { new: true }
    );

    // console.log("book borrowed")
    res.status(200).json({ success: true, message: "Book borrowed successfully" });
  } catch (err) {
    console.log("Error in functioning of borrowing book:", err);
  }
};

// function to return a borrowed book 
exports.returnBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { userId } = req.body;


    if (!bookId || !userId) {
      return res.status(400).json({
        message: "Please provide all the data for returning book",
      });
    }

    // Find the book and update its availability
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    book.availability = true;
    await book.save();

    // Remove the book from the user's borrowedBooks array
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          borrowedBooks: {
            bookId: bookId, 
          },
        },
      },
      { new: true }
    );

    // Record the transaction
    await Transaction.create({
      userId,
      bookId,
      type: "return",
    });

    res.status(200).json({ success: true, message: "Book returned successfully" });
  } catch (err) {
    console.error("Error in functioning of returning book:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while returning the book",
    });
  }
};

// total number of books
exports.getTotalNumberOfBooks = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    return res.status(200).json({ success: true, totalBooks });
  } catch (error) {
    console.error("Error fetching total number of books:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// books borrowed by user
exports.getAllBooksBorrowedByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("borrowedBooks.bookId", "title author availability publicationYear");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const borrowedBooks = user.borrowedBooks.map((book) => ({
      title: book.bookId.title,
      author: book.bookId.author,
      publicationYear: book.bookId.publicationYear,
      borrowedAt: book.borrowedAt,
      dueDate: book.dueDate,
      isAvailable: book.bookId.availability, 
      bookId:book.bookId._id
    }));

    res.status(200).json({
      success: true,
      data: borrowedBooks,
    });
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// fetch last transaction of user
exports.getLastTransactionByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    // Find the latest transaction for the user, sorted by date
    const lastTransaction = await Transaction.findOne({ userId })
      .sort({ date: -1 })
      .populate("bookId", "title author");

    if (!lastTransaction) {
      return res.status(200).json({ success: true, message: "No transactions found for this user" });
    }

    res.status(200).json({
      success: true,
      data: {
        bookTitle: lastTransaction.bookId.title,
        bookAuthor: lastTransaction.bookId.author,
        type: lastTransaction.type,
        date: lastTransaction.date,
      },
    });
  } catch (error) {
    console.error("Error fetching last transaction:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



