const fs=require('fs')
const path=require('path')
const filePath=path.resolve(__dirname,'userData.json');

let dataArray=[]

function addData(userData,callback){
    try {
        dataArray.push(userData);
        callback(false,userData)
    } catch (error) {
        callback(true,error)
    }
}

function displayData(){
    let i=1;
    dataArray.forEach(ele=>{
        console.log(`${i++}: ${data}`)
    })
}

function callbackFunction(err,addedUserData){
    if(err){
        console.log(addedUserData )
    }else{
        console.log('Successful')
    }
}

function writeDataToFile(){
    if(fs.existsSync(filePath)){
        const message='File not found';
        process.stdout.write(message);
        return message;
    }
    fs.writeFileSync(filePath,JSON.stringify(dataArray,null,2));
    const message='The data has been written to userData.json using streams.';
    process.stdout.write(message);
    return message;
}

function readDataAndPrint(){
    if(fs.existsSync(filePath)){
        const message='File not found';
        process.stdout.write(message);
        return message;
    }
    const data=fs.readFileSync(filePath)
    const parsedData=JSON.parse(data);
    const prettyData=JSON.parse(parsedData);
    const message=prettyData;
    process.stdout.write(message);
    return message;
}


module.exports={addData,displayData,callbackFunction,readDataAndPrint,writeDataToFile}