const fs = require('fs')

exports.changeFileName = (req,file)=>{
   const ext = file.mimetype
   if (!req.body.filename) return `${file.fieldname} - ${Date.now()}.${ext.match(/\w+$/)}`
   return this.date()+`${file.originalname}`
}
