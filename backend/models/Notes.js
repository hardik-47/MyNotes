const mongoose = require('mongoose');
const {Schema} = mongoose;
const NotesSchema=new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },

    title: {
        type: String,
        reqired: true
    },
    description:{
        type: String,
        default:"General"
        
    },
    tag:{
        type: String,
        reqired: true
    },
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports= mongoose.model('notes',NotesSchema);