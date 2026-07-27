const Review=require('../models/review')
const getAllReviews=async(req,res)=>{
    try {
        const {id}=req.params
        const review=await Review.find().populate('book').populate('user')
        if(!review){
            res.status(404).json({message:'Review not found'})
        }
        res.status(200).json(review)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const getAllReviewsById=async(req,res)=>{
    try {
        const {id}=req.params
        const review=await Review.findById(id)
        if(!review){
            res.status(404).json({message:'Review not found'})
        }
        res.status(200).json({
            review
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const getReviewsByUserId=async(req,res)=>{
    try {
        const {userid}=req.params
        const review=await Review.find({user:userid})
        if(!review){
            res.status(404).json({message:'Review not found'})
        }
        res.status(200).json(review)
    } catch (error){
        res.status(500).json({message:error.message})
    }
}
const getReviewsByBookId=async(req,res)=>{
    try {
        const {id}=req.params
        const review=await Review.find({book:id})
        if(!review){
            res.status(404).json({message:'Review not found'})
        }
        res.status(200).json(review)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const addReview=async(req,res)=>{
    try {
        const review=await Review.create(req.body)
        res.status(201).json({
            message:'Review Added Successfully',
            review
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const updateReview=async(req,res)=>{
    try {
        const {id}=req.params
        const review=await Review.findByIdAndUpdate(id)
        if(!review){
            res.status(404).json({message:'Review not found'})
        }
        res.status(200).json({
            message:'Review Updated Successfully',
            review
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const deleteReview=async(req,res)=>{
    try {
        const {id}=req.params
        const review=await Review.findByIdAndDelete(id)
        if(!review){
            res.status(404).json({message:'Review not found'})
        }
        res.status(200).json({
            message:'Review Deleted Successfully'
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports={getAllReviews,getAllReviewsById,getReviewsByUserId,getReviewsByBookId,addReview,updateReview,deleteReview}