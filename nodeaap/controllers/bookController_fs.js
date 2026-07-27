const fs=require('fs')
const path=require('path')

const filepath=path.join(__dirname,'booksData.json')

function readFile(){
    if(fs.readFileSync(filepath)){
        const rawdata=fs.readFileSync(filepath,'utf-8')
        const data=JSON.parse(rawdata);
        booksData.push(data)
    }
}

const addBook_fs=()=>{}
const getAllBooks_fs=()=>{}
const getBookById_fs=()=>{}
const deleteBookById_fs=()=>{}

module.exports={readFile,addBook_fs,getAllBooks_fs,getBookById_fs,deleteBookById_fs}