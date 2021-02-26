import mongoose from 'mongoose'

const Pokemon = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    height: {
        type: Number,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    abilities: [{
        _id: false,
        ability: {
            name: { type: String },
            url: { type: String },
            slot: { type: Number },
            hidden: { type: Boolean }
        },

     is_hidden: {type: Boolean},
     slot: {type: Number},

    }],

   
    held_items: {
        _id: false,
        item: {
            name: { type: String },
            url: { type: String }
        }
        
    }
 })

export default mongoose.model('Pokemon', Pokemon)