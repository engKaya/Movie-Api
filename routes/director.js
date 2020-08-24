var express = require('express');
var router = express.Router();

const directorModel = require('../models/Director')

router.post('/',(req,res)=>{

    const director = new directorModel(req.body)

    const promise = director.save()
    promise.then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json(err)
    })

})

/*router.get('/',(req,res)=>{
    const promise = directorModel.find({ })

    promise.then(data=>{
        res.json(data)
    }).catch((err)=>{
        res.send(err)
    })
})*/

router.get('/',(req,res)=>{
    const promise = directorModel.aggregate([
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'director_id',
                as:'movie'
            }
        },
        {
            $unwind:{
                path:'$movie'
            }
        }
    ])
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.send(err)
    })
})

router.put('/:director_Id',(req,res,next)=>{
    const promise = directorModel.findByIdAndUpdate(
        req.params.director_Id,
        req.body,
    {
        new:true,
           }
    );promise.then((data)=>{
        res.json(data)
    }).catch((err)=> {
        if (err.value === req.params.director_Id)
            next({message:'Director not found',code:98})
    })
})


module.exports=router;