const Books=require('../models/book')

const getAllBooks=async(_req,res)=>{
    try{
        const books=await Books.find()
        return res.status(200).json(books);
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}
const getBookById=async(req,res)=>{
    try{
        const {id}=req.params;
        const book=await Books.findById(id)
        if(!book){
            return res.status(404).json({message:`Cannot find book with any ID ${id}`})
        }
        return res.status(200).json(book);
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}
const addBook=async(req,res)=>{
    try{
        const book=await Books.create(req.body)
        return res.status(201).json({message:'Book Added Successfully',book:book})
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}
const updateBook=async (req,res)=>{
    try{
        const {id}=req.params
        const book=await Books.findByIdAndUpdate(id,req.body,{new:true});
        if(!book){
            return res.status(404).json({message:`Cannot find any book with ID ${id}`})
        }
        return res.status(200).json({message:'Book Updated Successfully',book:book})
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}
const deleteBook=async (req,res)=>{
    try{
        const {id}=req.params
        const book=await Books.findByIdAndDelete(id);
        if(!book){
            return res.status(404).json({message:`Cannot find any book with ID ${id}`})
        }
        return res.status(200).json({message:'Book Deleted Successfully'})

    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

module.exports={getAllBooks,getBookById,addBook,updateBook,deleteBook}