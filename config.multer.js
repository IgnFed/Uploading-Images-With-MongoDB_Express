const multer = require("multer")
const {processFileType}  = require("./handlers")
// const path = require('path')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})

module.exports = multer({ storage: storage, fileFilter:(req,file,cb)=> processFileType(req,file,cb)})