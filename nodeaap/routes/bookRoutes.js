const { getAllBooks,addBook, updateBook,deleteBook,getBookById }=require('../controllers/bookController');

const router=require('express').Router()

router.get('/',getAllBooks)
router.get('/getBookById/:id',getBookById)
router.post('/addBook',addBook)
router.put('/update-book/:id',updateBook)
router.delete('/deleteBook/:id',deleteBook)

module.exports=router