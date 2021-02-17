import express from 'express'
import Populate from '../models/populate.js'
import fetch from 'node-fetch'

const router = express.Router()

const data = await fetch('https://pokeapi.co/api/v2/generation/')
const api = await data.json()


router.post('/populate-database', async (req, res) => {
  try {
   const data = await Populate.collection.insertMany(api.results)
   const result = await Populate.countDocuments()

   if (result < 100) {
     res.json({ "Pokemons": result})
   } else {
     res.json({"Add new Pokemons" : data.ops.length})
   }
 } catch (error) {
     console.log(error)
  }
})
  



export default router