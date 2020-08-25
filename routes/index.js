const express = require('express');
const router = express.Router();

const userModel = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Express' });
});

router.post('/',(req,res,next)=>{
  const User = new userModel(req.body)

  const promise = User.save();

  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    if (err.code==11000)
      next({message:'Nickname Mevcut!!',code:11000})
  });
})

module.exports = router;

module.exports = router;
