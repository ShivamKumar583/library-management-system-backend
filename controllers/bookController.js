const Book = require("../models/bookModel");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    if(books.length === 0){
        return res.json({
            message:"No books found"
        })
    }
    res.json(books);
  } catch (err) {
    console.log("Error in getting all books:", err);
  }
};

exports.getAllBooksByAvailability = async (req, res) => {
  try {
    const books = await Book.find({ availability: true });

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

exports.addBook = async (req, res) => {
  try {
    const { title, author, publicationYear, availability } = req.body;

    if (!title || !author || !publicationYear || !availability) {
      return res.status(400).json({
        message: "Please provide all the data for adding book",
      });
    }
    const book = new Book({
      title,
      author,
      publicationYear,
      availability,
    });
    await book.save();
    res.status(201).json({ message: "Book added successfully", book });
  } catch (err) {
    console.log("Error in functioning of adding book:", err);
  }
};

// exports.updateBook = async (req, res) => {
//     const
//     const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedBook);
// };

exports.deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params.id;

    if (!bookId) {
      return res.status(400).json({
        message: "Please provide all the data for deleting book",
      });
    }
    await Book.findByIdAndDelete();
    res.json({ message: "Book deleted" });
  } catch (err) {
    console.log("Error in functioning of deleting book:", err);
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const { bookId } = req.params.id;

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
    res.json(book);
  } catch (err) {
    console.log("Error in functioning of borrowing book:", err);
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { bookId } = req.params.id;

    if (!bookId) {
      return res.status(400).json({
        message: "Please provide all the data for returning book",
      });
    }
    const book = await Book.findById(bookId);
    book.availability = true;
    await book.save();
    res.json(book);
  } catch (err) {
    console.log("Error in functioning of returning book:", err);
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
