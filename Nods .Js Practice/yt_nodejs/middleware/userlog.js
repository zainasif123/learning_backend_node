
const { error } = require("console");
const fs = require("fs");

function logReqRes (filename){
    return (req,res,next)=>{
        fs.appendFile(
            filename,
            `Request:${Date.now()} ${req.method} ${req.ip} \n`,
            (error ,data)=>{
                next();
            } 
        );
    };
}

module.exports = {
    logReqRes
}