const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const generas = [{id : 1,name : 'horor'}, 
{id : 2,name : 'romance'},
{id : 3,name : 'action'}, 
{id : 4,name : 'drama'}];


app.get('/api/vidly/generas',(req,res)=>{
    res.send(generas);
});

app.get('/api/vidly/generas/:id',(req,res)=>{
    const genera = generas.find(g=> g.id === parseInt(req.params.id));
    if(!genera) return res.status(404).send("genera not found");
    res.send(genera);
});


app.post('/api/vidly/generas',(req,res)=>{
        const {error , value } = vaildateSchema(req.body);
        if(error) res.status(404).send(error.details[0].message);
        generas.push({
            id: generas.length +1,
            name: req.body.name
        });
        res.send(generas);
})


app.put('/api/vidly/generas/:id',(req,res)=>{
    const genera = generas.find(g => g.id === parseInt(req.params.id));
    if(!genera) return res.status(404).send('genera not found');
   generas.map(g =>{
       if(g.id === parseInt(req.params.id)){
           g.name = req.body.name;
       }
   });
    res.send(generas);
});

app.delete('/api/vidly/generas/:id',(req,res)=>{
    const genera = generas.find(g => g.id == parseInt(req.params.id));
    if(!genera) return res.status(404).send('genera not found');
    let index = generas.indexOf(genera);
    generas.splice(index,1);
    res.send(generas)

});

app.listen(3000,()=>{
    console.log('listening on port number 3000...');
});


/////////////////////// Other Methods ////////////////

function vaildateSchema(genera){
    const schema = Joi.object({
        name : Joi.string().min(3).max(30).required()
    })

    return schema.validate(genera);
}