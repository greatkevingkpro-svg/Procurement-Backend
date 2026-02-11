const {Sale} = require('./SALE.js')

const fs = require('fs')

const sale = new Sale(50000,10,'maize',new Date(),'ugx');

// console.log(sale)

fs.readFile("config.txt", (err, data) => {
  if (err){
    console.log(err)
  }else{
    console.log(data.toString())
  }
})

fs.readFile("deploy.json",(err,data)=>{
  if (err){
    console.log(err)
  }else{
    // console.log(data.toString())
    let deploy = JSON.parse(data)
    console.log(deploy)

    const SERVERHOST = deploy.server.host;
    const SERVERPORT = deploy.server.port;
  }
})

let errorlog = `${new Date().toDateString()} - Error: User tried to login multiple times`

fs.writeFile("errorlogs.txt",errorlog,(err)=>{
  if (err) {
    console.log(err)
  }else {
    console.log("successfully saved log file")
  }
})