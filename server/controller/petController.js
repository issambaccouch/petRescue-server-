const express = require('express');
const petModel = require('../models/pet');


exports.listPets = function (req,res){
    petModel.findAll((err,pets)=> {
        if(!err) {res.send(pets);}
        else {  console.log('Error in retreiving pets :'+ JSON.stringify(err,undefined,2));}
    }
    );
}

exports.createPet = function(req,res){
    let pet = {
        pet_name: req.body.name,
        pet_race: req.body.race,
        pet_age: req.body.age,
        pet_picture: req.body.picture,
        pet_sex: req.body.sex,
        owner : req.body.user_id
      }
      petModel.create(pet).then(dbPet => { return res.json({
        status: "Success",
        message: "Resources Are Created Successfully",
        data: pet
    })});

}