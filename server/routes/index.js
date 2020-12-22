const express = require('express'),
sequelize = require('sequelize');
const db = require('../models');
const router = express.Router();
const path = require('path'),
dateFormat = require('dateformat')
message = require('../models/message');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function(req,file,callback){
    callback(null,'./server/public/img')
  },
  filename: function(req,file,callback) {
    callback(null,file.originalname);
  },
 
});

var upload = multer({ storage: storage , limits: {fieldSize : 25 * 1024 * 1024}});
const PetController = require('../controller/petController');
//////////////////////////////////////////////////////// USER ROUTES ////////////////////////////////////////////////////////

// FIND ALL
router.get('/user', async (req,res,next) => {

    try{
    let results = await db.user.findAll();
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// UPLOAD PICTURE
router.post('/profile/upload/:email', upload.single('avatar'), function (req, res, next) {
  console.log(req.file)
  let user = {
    user_picture : req.file.filename
  }
db.user.update(
  user, {
    where: {
      user_email: req.params.email
    }
  }).then(dbUser => {
    res.send(req.file)
})

})

//GET PICTURE
router.get('/public/img/*',(req,res) => {
  res.sendFile(req.url,{root: './server'})
})
//FIND BY ID

router.get('/user/:id', async (req,res,next) => {

    try{

        let results = await db.user.findAll({
            where: {
                user_id: req.params.id
            }
        });
        res.json(results);

    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//FIND BY EMAIL

router.get('/user/email/:email', async (req,res,next) => {
    try{
      let result = await db.user.findAll({where : { user_email : req.params.email}});
      res.json(result);
    }catch(e){
    console.log(e);
    res.sendStatus(500);
    }
});

//FIND BY EMAIL & PASSWORD

router.get('/user/:email/:password', async (req,res,next) => {
  try{
    let result = await db.user.findAll({where : { user_email : req.params.email,password : req.params.password}});
    var test = JSON.parse(JSON.stringify(result))
    console.log(test);
  if ( test.length === 0){
        res.status(404)
      }   
  else {
    res.status(200)

  }
 
    res.json(result);
  }catch(e){
  console.log(e);
  res.sendStatus(500);
  }
});

// CREATE
router.post('/signup', (req, res) => {
    let user = {
        user_username : req.body.user_username,
        user_email : req.body.user_email,
        password : req.body.password,
        user_picture : req.body.user_picture,
        user_firstname : req.body.user_firstname,
        user_lastname : req.body.user_lastname,
        user_address : req.body.user_address,
        user_phonenumber : req.body.user_phonenumber,
        roles : "USER",
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      db.user.create(user).then(dbUser => { 
        res.json(dbUser)
      }).catch(err => res.sendStatus(500))
     

});

// DELETE
router.delete("/user/:id", function (req, res) {
    db.user.destroy({
      where: {
        user_id: req.params.id
      }
    }).then(dbUser => {
      res.json(dbUser)
    })
  });

// UPDATE 
router.put("/myaccount", function (req, res) {

    let user = {
        user_username : req.body.user_username,
        user_email : req.body.user_email,
        password : req.body.user_password,
        user_picture : req.body.user_picture,
        user_firstname : req.body.user_firstname,
        user_lastname : req.body.user_lastname,
        user_address : req.body.user_address,
        user_phonenumber : req.body.user_phonenumber,
        updatedAt: Date.now()
      }
    db.user.update(
      user, {
        where: {
          user_id: req.body.user_id
        }
      }).then(dbUser => {
      res.json(dbUser)
    })
  });

  //Update password

  router.put("/myaccount/password", function (req, res) {

    let user = {
        password : req.body.password,
        updatedAt: Date.now()
      }
    db.user.update(
      user, {
        where: {
          user_email: req.body.user_email
        }
      }).then(dbUser => {
      res.json(dbUser)
    })
  });

//////////////////////////////////////////////////////// PET ROUTES ////////////////////////////////////////////////////////

//Upload pet picture

router.post('/pet/upload', upload.single('avatar'), function (req, res, next) {
  console.log(req.file);
  console.log("upload lehne");
  res.send(req.file);

})

// FIND ALL
router.get('/pets', async (req,res,next) => {

    try{
    let results = await db.pet.findAll();
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//FIND BY ID

router.get('/mypets/:id', async (req,res,next) => {

    try{

        let results = await db.pet.findAll({
            where: {
                pet_id: req.params.id
            }
        });
        res.json(results);

    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//FIND BY OWNER

router.get('/pets/owner/:id', async (req,res,next) => {

    try{

        let results = await db.pet.findAll({
            where: {
                owner: req.params.id
            }
        });
        console.log(results);
        res.json(results);

    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//FIND BY RACE

router.get('/pets/race', async (req,res,next) => {

  try{

      let results = await db.pet.findAll({
          where: {
              pet_race: req.body.pet_race
          }
      });
      console.log(results);
      res.json(results);

  }catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
});

//FIND BY SEX

router.get('/pets/sex', async (req,res,next) => {

  try{

      let results = await db.pet.findAll({
          where: {
              pet_sex: req.body.pet_sex
          }
      });
      console.log(results);
      res.json(results);

  }catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
});

// UPDATE OWNER 
router.put("/pets/owner/:owner/:pet", function (req, res) {
  console.log(req.body)
    let pet = {
        owner : req.params.owner,
        pet_status : "Normal"
      }
    db.pet.update(
      pet, {
        where: {
          pet_id: req.params.pet
        }
      }).then(dbPet => {
      res.json(dbPet)
    })
  });

// CREATE
router.post('/mypets', (req, res) => {
    let pet = {
        pet_name: req.body.pet_name,
        pet_race: req.body.pet_race,
        pet_age:  req.body.pet_age,
        pet_status : req.body.pet_status,
        pet_picture: req.body.pet_picture,
        pet_desc: req.body.pet_desc,
        pet_sex: req.body.pet_sex,
        owner : req.body.owner,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      db.pet.create(pet).then(dbPet => { 
        res.json(dbPet)
      }).catch(err => {
        res.sendStatus(500)
      });

});

// DELETE
router.delete("/mypets/:id", function (req, res) {
    db.pet.destroy({
      where: {
        pet_id: req.params.id
      }
    }).then(dbPet => {
      res.json(dbPet)
    })
  });

// UPDATE 
router.put("/mypets", function (req, res) {
  console.log(req.body)
    let pet = {
        pet_name: req.body.pet_name,
        pet_race: req.body.pet_race,
        pet_age: req.body.pet_age,
        pet_picture: req.body.pet_picture,
        pet_sex: req.body.pet_sex,
        pet_desc: req.body.pet_desc,
        pet_status: req.body.pet_status,
        updatedAt : Date.now()
      }
    db.pet.update(
      pet, {
        where: {
          pet_id: req.body.pet_id
        }
      }).then(dbPet => {
      res.json(dbPet)
    })
  });

  //FIND BY STATUS

router.get('/pets/status/:status', async (req,res,next) => {

  try{
      let results = await db.pet.findAll({
          where: {
              pet_status: req.params.status
          }
      });
      console.log(results);
      res.json(results);

  }catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
});

// update  State
router.put("/pet/:id/:state", function (req, res) {
  let pet = {
    pet_status:req.params.state,
      updatedAt : Date.now()
    }
  db.pet.update(pet,
     {
      where: {
        pet_id: req.params.id
      }
    }).then(dbPet => {
    res.json(dbPet)
  })
});
// find adoption by pet 
router.get('/adoption/pet/:pet', async (req,res,next) => {

  try{
      let results = await db.adoption.findAll({
          where: {
              pet: req.params.pet
          }
      });
      res.json(results);

  }catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
});
  // Adoption Request
  router.post('/pet/adopt',(req, res,next) => {
    let adoption = {
        owner : req.body.owner,
        adoptive : req.body.adoptive,
        pet : req.body.pet,
        status : req.body.status,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      db.adoption.create(adoption).then(dbPost => { res.send(dbPost)});
});

// DELETE ADOPTION
router.delete("/pet/adopt/delete/:id", function (req, res) {
  db.adoption.destroy({
    where: {
      adoption_id: req.params.id
    }
  }).then(dbPet => {
    res.json(dbPet)
  })
});

// update Adoption Status
router.put("/pet/adopt/request", function (req, res) {

  let ad = {
      status:req.body.status,
      updatedAt : Date.now()
    }

  db.adoption.update(
    ad, {
      where: {
        adoption_id: req.body.adoption_id
      }
    })
    res.send(req.body)
});
//////////////////////////////////////////////////////// POST ROUTES ////////////////////////////////////////////////////////

// FIND ALL
router.get('/posts', async (req,res,next) => {

    try{
    let results = await db.post.findAll({
          order :  sequelize.literal('post_date DESC')
    });
    results.s
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//FIND BY ID

router.get('/posts/:id', async (req,res,next) => {

    try{

        let results = await db.post.findAll({
            where: {
                post_id: req.params.id
            }
        });
        res.json(results);

    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//FIND BY USER

router.get('/myposts/:id', async (req,res,next) => {

  try{

      let results = await db.post.findAll({
          where: {
              post_user: req.params.id
          }
      });
      res.json(results);

  }catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
});

// CREATE
router.post('/posts',(req, res,next) => {
  console.log(req.body);
    let post = {
        post_title : req.body.post_title,
        post_description : req.body.post_description,
        post_date : dateFormat(Date().now,"yyyy-mm-dd"),
        post_user : req.body.user.post_user,
        post_localisation : "Sidi bou said, Tunisia",
        post_type : "GENERAL",
        post_image: req.body.post_image
      };
      db.post.create(post).then(dbPost => { res.send(post)});

});

//CREATE LOST PET

router.post('/posts/lost',(req, res,next) => {
  console.log(req.body);
    let post = {
        post_title : req.body.post_title,
        post_description : req.body.post_description,
        post_date : Date.now(),
        post_user : req.body.user.user_id,
        post_localisation : req.body.post_localisation,
        pet : req.body.pet.pet_id,
        post_type : "LOST",
        post_image: req.body.pet.pet_image
      };
      db.post.create(post).then(dbPost => { res.send(post)});

});



//CREATE Adoption PET

router.post('/posts/adoption',(req, res,next) => {
  console.log(req.body);
  console.log(req.body.user.user_id);
    let post = {
        post_title : req.body.post_title,
        post_description : req.body.post_description,
        post_date : dateFormat(Date().now,"yyyy-mm-dd"),
        post_user : req.body.user.user_id,
        post_localisation : req.body.post_localisation,
        pet : req.body.pet.pet_id,
        post_type : "ADOPTION",
        post_image: req.body.pet.pet_image,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      db.post.create(post).then(dbPost => { res.send(post)});

});


// DELETE
router.delete("/myposts/:id", function (req, res) {
    db.post.destroy({
      where: {
        post_id: req.params.id
      }
    }).then(dbpost => {
      let result = db.post.findAll()
      console.log(result)
      res.send(result)
    
    })
    
  });

// UPDATE STATE

router.put("/myposts", function (req,res) {
  let post= {
    post_state : 1
  };
  db.post.update(
    post, {
      where: {
        post_id: req.body.post_id
      }
    }).then(dbPost => {
    res.json(dbPost)
  });
});

// UPDATE POST
router.put("/myposts", function (req, res) {


    let user = db.user.findAll({
      where: {
          user_id: req.body.owner
      }
    });
    let pet = db.pet.findAll({
      where : {
        pet_id : req.body.pet_id
      }
    });
    let post = {
        post_title : req.body.title,
        post_description : req.body.descripton,
        post_date : req.body.date,
        post_state : 0,
        post_user : user,
        post_pet : pet,
        post_type : req.body.type

      };
    db.post.update(
      post, {
        where: {
          post_id: req.body.post_id
        }
      }).then(dbPost => {
      res.json(dbPost)
    });
  });

module.exports = router

////////////////////////////////////////////////// MESSAGE ////////////////////////////////////////////////
const seq = sequelize.Op;
router.get('/message/getAll/:user/:receiver', async (req,res,next) => {

  try{
      db.sequelize.query("SELECT * from message WHERE ( sender =(:sender) AND receiver =(:receiver) ) OR ( sender= (:receiver) AND receiver=(:sender) ) ORDER BY send_in DESC", {
        replacements : {sender:req.params.user , receiver:req.params.receiver},
        model: db.message
      })
      .then(function(messages)
      {
        res.json(messages);
      });

  }catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
});

router.post('/message',(req, res,next) => {
  console.log(req.body);
  console.log(req.body.user.user_id);
    let message = {
        message : req.body.message,
        send_in : dateFormat(Date().now,"yyyy-mm-dd"),
        sender : req.body.sender,
        receiver: req.body.receiver,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      db.message.create(message).then(dbMessage => { res.send(dbmessage)});

});


//////////////////////////////////////////////////////// COMMENT /////////////////////////////////////////////


// Post Comment
router.post('/comments/add',(req, res,next) => {
  console.log(req.body);
    let comment = {
        body : req.body.body,
        comment_date : dateFormat(Date().now,"yyyy-mm-dd"),
        user : req.body.user,
        post: req.body.post,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      db.post_comments.create(comment);
      res.send(
        db.post_comments.findAll({
          where: {
              post: req.body.post
          },
          order :  sequelize.literal('comment_date DESC')
      }))


});

// Get Comment By Post

router.get('/comments/getByPost/:id', async (req,res,next) => {

  try{

      let results = await db.post_comments.findAll({
          where: {
              post: req.params.id
          },
          order :  sequelize.literal('comment_date DESC')
      });
      res.json(results);

  }catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
});

// Delete Comment

router.delete('/comments/:post', async (req,res,next) => {

  try{

      let results = await db.post_comments.destroy({
          where: {
              comment_id: req.params.post,
          }
      });
      res.json(results);

  }catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
});


//////////////////////////////////////////////////////// LIKE /////////////////////////////////////////////
//////////////////////////////////////////////////////// LIKE /////////////////////////////////////////////
//////////////////////////////////////////////////////// LIKE /////////////////////////////////////////////
//////////////////////////////////////////////////////// LIKE /////////////////////////////////////////////
//////////////////////////////////////////////////////// LIKE ///////////////////////////////////////////////////////////////////////////////////////////////////// LIKE /////////////////////////////////////////////
//////////////////////////////////////////////////////// LIKE /////////////////////////////////////////////
//////////////////////////////////////////////////////// LIKE /////////////////////////////////////////////
//////////////////////////////////////////////////////// LIKE /////////////////////////////////////////////

// Post Like
router.post('/posts/like/:user/:post',(req, res,next) => {
  console.log(req.body);
    let like = {
      post: req.params.post,
      user: req.params.user,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      db.post_likes.create(like).then(dbComment => {
         res.send(db.post_likes.findAll());
        });

});

// Check User Like

router.get('/posts/like/:user/:post', async (req,res,next) => {

  try{

      let results = await db.post_likes.findAll({
          where: {
              post: req.params.post,
              user: req.params.user
          }
      });
      res.json(results);

  }catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
});

// Get Like By Post

router.get('/like_posts/getAll/:id', async (req,res,next) => {

  try{

      let results = await db.post_likes.findAll({
          where: {
              post: req.params.id
          }
      });
      res.json(results);

  }catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
});

// POST DISLIKE

router.delete('/posts/dislike/:user/:post', async (req,res,next) => {

  try{

      let results = await db.post_likes.destroy({
          where: {
              post: req.params.post,
              user: req.params.user
          }
      });
      res.send(db.post_likes.findAll());

  }catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
});




//////////////////////////////////////////////////////// NOTIFICATION /////////////////////////////////////////////
//////////////////////////////////////////////////////// NOTIFICATION /////////////////////////////////////////////
//////////////////////////////////////////////////////// NOTIFICATION /////////////////////////////////////////////
//////////////////////////////////////////////////////// NOTIFICATION /////////////////////////////////////////////
//////////////////////////////////////////////////////// NOTIFICATION /////////////////////////////////////////////
//////////////////////////////////////////////////////// NOTIFICATION /////////////////////////////////////////////

// Get Notification By User

router.get('/notification/:id', async (req,res,next) => {

  try{

      let results = await db.notification.findAll({
          where: {
              user_id: req.params.id
          }
      });
      res.json(results);

  }catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
});

// Add Notification

router.post('/notification',(req, res,next) => {
  console.log(req.body);
    let like = {
      post_id: req.body.post_id,
      user_id : req.body.user_id,
      sender_id : req.body.sender_id,
      pet_id : req.body.pet_id,
      type : req.body.type,
      date : dateFormat(Date().now,"yyyy-mm-dd"),
      createdAt: Date.now(),
      updatedAt: Date.now()
      };
      db.notification.create(like).then(dbComment => {
        console.log(dbComment)
         res.send(dbComment);
        });

});

// DELETE NOTIFICATION

router.delete('/notification/:id', async (req,res,next) => {

  try{

      let results = await db.notification.destroy({
          where: {
            notification_id: req.params.id
          }
      });
      res.send("Success");

  }catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
});
