const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    category:String,
    country:String,
    year:Number,
    imdb_Score:Number,
    date:{
        type:Date,
        default:Date.now
    },
    director_id: Schema.ObjectID
})

module.exports = mongoose.model('Movie',Schema)