const {addReview,getAllReviews,getReviewsByUserId,deleteReview,getReviewsByBookId}=require('../controllers/reviewController');

const router=require('express').Router()

router.post('/addReview',addReview)
router.get('/getAllReviews',getAllReviews);
router.get('/getReviewsByUserId/:userid',getReviewsByUserId);
router.get('/getReviewsByBookId/:id',getReviewsByBookId);
router.delete('/deleteReview/:id',deleteReview);

module.exports=router