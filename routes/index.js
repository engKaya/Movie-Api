const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

const userModel = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Express' });
});

router.post('/register',(req,res,next)=>{
  const {name,surname,nickname,password} = req.body

  bcrypt.hash(password,10).then((hash)=>{
    if (password.length>=5) {
      const User = new userModel({
        name,
        surname,
        nickname,
        password: hash
      })
      const promise = User.save();

      promise.then((data) => {
        res.json(data)
      }).catch((err) => {
        if (err.code == 11000)
          next({message: 'Nickname Mevcut!!', code: 11000})
      });
    }else
      next({message:'Parola uzunluğu 5\'ten küçük olamaz',code:999 })
  })

})

router.post('/authenticate',(req,res)=> {
  const {nickname, password} = req.body;

  userModel.findOne({nickname},(err,user)=>{
    if (err)
      throw err;

    if (!user){
      res.json({status:false,message:'şifre veya kullanıcı adı yanlış'})
    }else{
      bcrypt.compare(password,user.password).then((result)=>{
        if (!result)
          res.json({status:false,message:'şifre veya kullanıcı adı yanlış'})
        else
        {
          const payload = {
            nickname
          };
          const token = jwt.sign(payload,req.app.get('api_secret_key'),{expiresIn: 720 });//dakika

          res.json({
            status:true,
            token
          })

        }

      })
    }
  });

})

module.exports = router;