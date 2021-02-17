import express from 'express'
import Pokemon from '../models/pokemon.js'
import fetch from 'node-fetch'

const router = express.Router()


router.get('/descending_pokemons', async (req, res) => {
  try {
   const desc = await Pokemon.find({}).sort({ weight: -1 })
   res.status(200).json(desc)
  } catch (error) {
     console.log(error)
  }
})


router.get('/read_detail_pokemon/:id', async (req, res) => {
   try {
      const detail = await Pokemon.findById({ _id: req.params.id }).exec()
      res.status(200).json(detail)
   } catch (error) {
      console.log(error)
   }
})

router.post('/create_pokemon', async (req, res) => {
    try {
      const data = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      const api = await data.json()
     const pokemonBody = await new Pokemon({ 
             name: api.name,
             height: api.height,
             weight: api.weight,
             abilities: api.abilities,
             held_items: api.held_items,
       })
           await pokemonBody.save()
           res.status(201).json(pokemonBody)

     } catch (e) {
           res.json({ mes: 'Error to create Pokemon'})
           console.log(e)
    }
 })

 router.delete('/delete_pokemon/:id', async (req, res) => {
    try {
        const result = await Pokemon.findByIdAndRemove({ _id: req.params.id })
        res.status(200).json(result)

   } catch (e) {
        res.json({ mes: 'Not found Pokemon' })
        console.log(e)
    }
 })

 router.delete('/delete_all_pokemons', async (req, res) => {
    try {
      await Pokemon.deleteMany()
      res.status(200).json({ mes: 'All pokemons was removed' })
  } catch (error) {
      console.log(error)
    }
 })
 
 router.put('/update_pokemon/:id', async (req, res) => {
    try {
      const update = await Pokemon.findByIdAndUpdate( req.params.id, req.body, { new: true } )
      res.staus(200).json(update)
   }
    catch (e) {
      res.json({ mes: 'Not found Pokemon :('})
      console.log(e)
    }
 })



export default router;