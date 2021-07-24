const route = require('express').Router()
const log = require('../logs/Logs')
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
         .catch(err => res.status(500).json({ message: err }))
})


route.get('/:_id', (req,res)=>{
   const {_id} = req.params
   Product.findById({_id})
      .exec()
      .then(doc =>{
         log.info(doc.name)
         res.status(200).json({
            response:{
               _id: doc._id,
               name: doc.name,
               price: doc.price,
               image: doc.image
            },
            request:{
               method: 'GET',
               _id: id,
               url: 'http://localhost:3000/products/' + id 
            }
         })

      })
      .catch(err => res.status(500).json({message: err}))
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
         .catch(err => res.status(500).json({message: err}))
})

route.delete('/', (req,res)=>{
   Product.deleteMany()
      
      .then(response=>{ 
         const responseBody = { message: `DELETE all the elements [${response.n}]`, request:{type:'DELETE'}}
         if(!response.n && !response.deletedCount)
            responseBody.message =`There is not elements to DELETE`
         res.status(200).json(responseBody)
      })
      .catch(err => res.status(500).json({ message: err }))
}) 

route.delete('/:id', (req,res)=>{
   const {id}= req.params
   Product.deleteOne({_id: id})
      .then(()=>{
         res.status(200).json({
            message: "Product DELETED successfully",
            request: {
               type: "DELETE",
               _id: id,
               url: "http://localhost:3000/products/"+id
            },
         })
      })
      .catch(err => res.status(500).json({ message: err }))
})

module.exports = route