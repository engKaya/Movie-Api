const mongoose = require('mongoose')

module.exports=()=>{
  mongoose.connect('mongodb+srv://movie-user:Comrad1999@movie-api.2qi54.mongodb.net/movie-api?retryWrites=true&w=majority',
      {useNewUrlParser:true,useUnifiedTopology:true})
  mongoose.connection.on('open',()=>{
      console.log('MongoDB bağlandı')
  })
    mongoose.connection.on('error',(err)=>{
        console.log(err)
    })
    mongoose.Promise=global.Promise;
};