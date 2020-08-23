var express = require('express');
var router = express.Router();

const Movie = require('../models/Movie')

/* GET users listing. */
router.post('/', (req, res, next)=> {
  const {title,imdb_Score,country,category,year} = req.body;

  const movie = new Movie(req.body)
  /*movie.save((err,data)=>{
    if (err)
      res.json(err)

    res.json(data)
  })*/
    //kayıt
    const promise = movie.save();
    promise.then(()=>{
        res.json('Status : 1')
    }).catch((err)=>{
        res.json(err)
    })

});

router.get('/',(req,res)=>{
    const promise = Movie.find({})
    promise.then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json(err)
    })
})

router.get('/:movie_id',(req,res,next)=>{
    const promise = Movie.findById(req.params.movie_id);

    promise.then((data)=>{
        res.send(data)
    }).catch((err)=>{
        if (err.value===req.params.movie_id);
        next({message : 'ff',code:99})
    })
})

router.put('/:movie_id',(req,res,next)=>{
    const promise = Movie.findByIdAndUpdate(
        req.params.movie_id,
        req.body,
    {
        new: true
    }
    );

    promise.then((data)=>{
        res.send(data)
    }).catch((err)=>{
        if (err.value===req.params.movie_id);
        next({message : 'ff',code:99})
    })
})

module.exports = router;