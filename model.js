const mongoose = require("mongoose")
const model = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    club:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    position:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    filePath:{
        type:String,
    },
    cloud_id:{
        type:String,
    },
})

module.exports = mongoose.model("player", model)