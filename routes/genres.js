const express = require('express');
const router = express.Router();
const Joi = require('joi');


const genres = [{id : 1,name : 'horor'}, 
{id : 2,name : 'romance'},
{id : 3,name : 'action'}, 
{id : 4,name : 'drama'}];


router.get('/',(req,res)=>{
    res.send(genres);
});

router.get('/:id',(req,res)=>{
    const genre = genres.find(g=> g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("genre not found");
    res.send(genre);
});


router.post('/',(req,res)=>{
        const {error , value } = vaildateSchema(req.body);
        if(error) res.status(404).send(error.details[0].message);
        genres.push({
            id: genres.length +1,
            name: req.body.name
        });
        res.send(genres);
})


router.put('/:id',(req,res)=>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('genre not found');
   genres.map(g =>{
       if(g.id === parseInt(req.params.id)){
           g.name = req.body.name;
       }
   });
    res.send(genres);
});

router.delete('/:id',(req,res)=>{
    const genre = genres.find(g => g.id == parseInt(req.params.id));
    if(!genre) return res.status(404).send('genre not found');
    let index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genres)

});



/////////////////////// Other Methods ////////////////

function vaildateSchema(genre){
    const schema = Joi.object({
        name : Joi.string().min(3).max(30).required()
    })

    return schema.validate(genre);
}

module.exports = router