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
        }
    }],

    held_items: [{
        _id: false,
        item: {
            name: { type: String },
            url: { type: String }
        }
        
    }]
 })

export default mongoose.model('Pokemons', Pokemon)