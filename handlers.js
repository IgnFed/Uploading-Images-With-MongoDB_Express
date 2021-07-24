const log = require('./logs/Logs')

exports.processFileType = (req, file,cb)=>{
   
   const mimetype = file.mimetype

   log.info(`File Extention :${mimetype}`)
   
   const FILE_TYPE_ALLOWED = ['image/png', 'image/jpg', 'image/jpeg',]
   
   if (!FILE_TYPE_ALLOWED.includes(mimetype))
   {   
      log.err('< BAD EXTENTION ERROR >')
      cb(new Error(`REQUREST [${req.method}] FAILED: < BAD EXTENTION ERROR >`), false)
   }

   log.ok('SUCCESS REQUEST')
   cb(null, true)
}

exports.processFileSize = (err,req,res,next)=>{
   
   if(err.status === 413){
      log.info(req.get('content-type'))
      err.message = `Request a ${req.path}
      \rEl tamaño excede el limite de ${err.limit}. Envía una imagen menos pesada.`     
   }
   next(err.message) 
}

