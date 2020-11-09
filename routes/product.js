const express = require('express');
const app = express();
const Product = require('../models/product');

let products = [];

app.get('/',(req,res)=>{
    res.status(200).json(products);
});

app.get('/:id',(req,res)=>{
    let product=products.find(c=>c._id==req.params.id);
    if(product){
        res.status(200).json(product);
    }else{
        res.status(404).json({msg:'Not found'});
    }
});

app.post('/', (req,res)=>{
    if(req.body){
        let product = new Product(
            products.length+1,
            req.body.name,
            req.body.codsku,
            req.body.category,
            req.body.stock
        );
        products.push(product);
        res.status(200).json({res:'success',product});
    }else{
        res.status(500).json({error:'Not body provide'});
    }
});

app.put('/:_id',(req,res)=>{
    if(req.body&&req.params){
        let index = products.findIndex(c=>c._id==req.params._id);
        if(index>=0){
            if(req.body.name){
                products[index].name=req.body.name;
            }
            if(req.body.codsku){
                products[index].codsku=req.body.codsku;
            }
            if(req.body.category){
                products[index].category=req.body.category;
            }
            if(req.body.stock){
                products[index].stock=req.body.stock;
            }
            res.status(200).json({product:products[index]});
        }else{
            res.status(404).json({msg:'Not found'});
        }
    }else{
        res.status(500).json({error:'Not body provide'});
    }
});

app.delete('/:_id', (req,res)=>{
    if(req.params&&req.params._id){
        let index = products.findIndex(c=>c._id==req.params._id);
        if(index>=0){
            products.splice(index);
            res.status(200).json({res:'success'});
        }else{
            res.status(404).json({msg:'Not found'});
        }
    }else{
        res.status(500).json({error:'Not params provide'});
    }
});

module.exports = app;