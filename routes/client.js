const express = require('express');
const app = express();
const Client = require('../models/client');

let clients = [];

app.get('/',(req,res)=>{
    res.status(200).json(clients);
});

app.get('/:id',(req,res)=>{
    console.log(JSON.stringify(req.params));
    let client=clients.find(c=>c._id==req.params.id);
    if(client){
        res.status(200).json(client);
    }else{
        res.status(404).json({msg:'Not found'});
    }
});

app.post('/', (req,res)=>{
    if(req.body){
        console.log(JSON.stringify(req.body));
        let client = new Client(
            clients.length+1,
            req.body.name,
            req.body.address,
            req.body.cif
        );
        clients.push(client);
        res.status(200).json({res:'success',client});
    }else{
        res.status(500).json({error:'Not body provide'});
    }
});

app.put('/:_id',(req,res)=>{
    if(req.body&&req.params){
        let index = clients.findIndex(c=>c._id==req.params._id);
        if(index>=0){
            if(req.body.name){
                clients[index].name=req.body.name;
            }
            if(req.body.address){
                clients[index].address=req.body.address;
            }
            if(req.body.cif){
                clients[index].cif=req.body.cif;
            }
            res.status(200).json({client:clients[index]});
        }else{
            res.status(404).json({msg:'Not found',index});
        }
    }else{
        res.status(500).json({error:'Not body provide'});
    }
});

app.delete('/:_id', (req,res)=>{
    if(req.params&&req.params._id){
        let index = clients.findIndex(c=>c._id==req.params._id);
        if(index>=0){
            clients.splice(index);
            res.status(200).json({res:'success'});
        }else{
            res.status(404).json({msg:'Not found'});
        }
    }else{
        res.status(500).json({error:'Not params provide'});
    }
});

module.exports = app;