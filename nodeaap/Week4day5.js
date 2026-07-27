const fs=require('fs')
const path=require('path')
const filePath=path.resolve(__dirname,'bookData.json')

function writeDataToFileUsingFileSystem(){
    let booksArray=[];
    fs.writeFileSync(filePath,JSON.stringify(booksArray,null,2));
    const message='data has been written to booksData.json'
    process.stdout.write(message)
    return message;
    
}

function readDataAndPrintUsingFileSystem(){
    if(!fs.existsSync(filePath)){
        const message='file not exits'
        process.stdout.write(message)
        return message;
    }
    const data=fs.readFileSync(filePath,'utf8');
    const parsedData=JSON.parse(data);
    const preety=JSON.stringify(parsedData,null,2);
    console.log(preety);
}

module.exports={writeDataToFileUsingFileSystem,readDataAndPrintUsingFileSystem}
