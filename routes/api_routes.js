const router = require("express").Router()
const {Book, Store} = require("../models")

// we can listen on the same address bc it's a different kind of call
// could not do 2 gets for ex

// route to GET one book
// because I used a : I have to use .params because it will look through all the instances of :
// a colon creates a url parameter 

// cannot set headers once they have already been set means you're having two sends and you can't do that
router.get("/books/:book_id", async (req, res) => {
    const book_id = req.params.book_id;
    const book = await Book.findByPk(book_id);
   
    if (book) {
        res.send(book);
    } else res.send ("Book not found.")
  });

// route to GET books
router.get("/books", async (req, res) => {
    const books = await Book.findAll();
    res.send(books)
})

// route to CREATE a book
router.post("/books", async(req, res) => {
    const bookData = req.body;
    console.log(bookData)
    // since i need a newly created book from newBook, I await
    const newBook = await Book.create(bookData);
    res.send(newBook);
})

// // Route to GET one store
// router.get("/stores/:store_id", async (req, res) => {
//     const store_id = req.params.store_id;
//     const store = await Store.findByPk(store_id);
   
//     if (store) {
//         res.send(store);
//     } else res.send ("Store not found.")
//   });

// Route to GET one store

router.get("/stores/:store_id", async (req, res) => {
    const store_id = req.params.store_id;
    const include_books = req.query.include_books;
    // const store = await Store.findByPk(store_id)
    if (include_books) {
        const store = await Store.findOne({
            include: Book,
            where: {
                id: store_id
            }
        })
        res.send(store)
    }
  });

router.get("/stores/:store_id", async (req, res) => {
    const store_id = req.params.store_id;
    const include_books = req.query.include_books;
    const store = await Store.findByPk(store_id)
    if (store) {
        res.send(store);
    } else res.send ("Store not found.")
  });

// route to GET store
router.get("/stores", async (req, res) => {
    const store = await Store.findAll();
    res.send(store)
})

// route to add to a book to a store
router.post("/stores/add/:store_id", async (req, res) => {
    console.log("route has been hit")
    const store_id = req.params.store_id;
    const book_id = req.query.book_id;

    const store = await Store.findByPk(store_id)
    const book = await Book.findByPk(book_id)
    
    await store.addBook(book);

    res.send("Book added.")
})

// route to CREATE a store
router.post("/stores", async(req, res) => {
    const storeData = req.body;
    // since i need a newly created book from newBook, I await
    const newStore = await Store.create(storeData);
    res.send(newStore);
}) 

module.exports = router