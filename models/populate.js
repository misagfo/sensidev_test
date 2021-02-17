import mongoose from 'mongoose'

const Populate = new mongoose.Schema({
   
    name: { type: String },
    url: { type: String },
     _id: false
})

export default mongoose.model('Populate', Populate)