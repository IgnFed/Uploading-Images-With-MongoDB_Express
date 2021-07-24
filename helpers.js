const fs = require('fs')
const log = require('./logs/Logs')
const path = require('path')

exports.deleteAllFiles = ()=>{
   const route = path.join(__dirname, 'public')
      
   const listFiles = fs.readdirSync(route)
   const len = listFiles.length
   if(listFiles)
      listFiles.forEach(el => {
         fs.rmSync(route + `/${el}`)
      })
   
   log.warn(`DELETED ${len} ELEMENTS`)
}

exports.deleteOneFile = (file)=>{
   fs.rmSync(file)
   log.ok(`DELETED: ${file.replace('public\\', '')}`)
}