const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    Name:{
        type : String,
        require:true
    },

    uId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Admin',
    },

    Subject:{
       type:String,
       require:true
    },

    Marks:{
        type:Number,
        require:true
    },

    isDeleted:{
        type:Boolean,
        default:false
    }

})

module.exports = mongoose.model('Student',studentSchema)