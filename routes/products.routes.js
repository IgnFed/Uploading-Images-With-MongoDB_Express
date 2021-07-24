const route = require('express').Router()
const log = require('../logs/Logs')
const helper = require('../helpers')
const Product = require('../models/Product.model')
const upload = require('../config.multer')


route.get('/', (req, res) => {

   Product.find()
      .exec()
         .then(docs=>{
            const response={
               count: docs.length,
               products: docs.map(doc=>{
                  return{
                     _id: doc.id,
                     name: doc.name,
                     price: doc.price,
                     image:'http://localhost:3000/'+ doc.image
                  }
               })}
            
            res.status(200).json({
               response,
               request:{
                  type: 'GET',
                  url: 'http://localhost:3000/products/'
               }
            })
         })
         .catch(err => {log.err(err);res.status(500).json({ message: "An error has ocurr" })})
})


route.get('/:_id', (req,res)=>{
   const {_id} = req.params
   Product.findById({_id})
      .exec()
      .then(doc =>{
         log.info(doc)
         res.status(200).json({
            response:{
               _id,
               name: doc.name,
               price: doc.price,
               image: doc.image
            },
            request:{
               method: 'GET',
               _id,
               url: 'http://localhost:3000/products/' + _id 
            }
         })

      })
      .catch(err => {log.err(err);res.status(500).json({message: "The product maybe doesn't exists"})})
})

route.post('/', upload.single('image'), function (req, res) {

   const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.file.path
   })
   newProduct
      .save()
         .then(result =>{
            log.info(result);

            res.status(201).json({
               message: 'Created product successfully',
               CreatedProduct:{
                  name: result.name,
                  price: result.price,
                  _id: result._id,
                  image: req.file.path,
                  request: {
                     type: 'POST',
                     url: "http://localhost:3000/products/"
                  }
               }
            })
         })
         .catch(err => res.status(500).json({message: "An error has ocurr"}))
})

route.delete('/',(req,res)=>{
   Product.deleteMany()
      
      .then(response=>{ 
         const responseBody = { message: `DELETE all the elements [${response.n}]`, request:{type:'DELETE'}}
         if(!response.n && !response.deletedCount)
            responseBody.message =`There is not elements to DELETE`
         helper.deleteAllFiles(response)
         res.status(200).json(responseBody)
      })
      .catch(err => res.status(500).json({ message: err }))
}) 

route.delete('/:_id', (req,res)=>{
   const {_id}= req.params
   Product.findByIdAndDelete({_id})
      .exec()
      .then((doc)=>{
         helper.deleteOneFile(doc.image)
         res.status(200).json({
            message: "Product DELETED successfully",
            request: {
               type: "DELETE",
               _id,
               url: "http://localhost:3000/products/"+_id
            },
         })
      })
      .catch(() => res.status(500).json({ message: "An error has ocurr" }))
})

module.exports = route