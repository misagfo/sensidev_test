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
   res.status(401).json({mes: "Error to sort"})
  }
})


router.get('/read_detail_pokemon/:id', async (req, res) => {
   try {
      const detail = await Pokemon.findById({ _id: req.params.id }).exec()
      res.status(200).json(detail)
   } catch (error) {
      console.log(error)
      res.staus(401).json({mes: "ID not found"})
   }
})

router.post('/populate-database', async (req, res) => {
   try {
     const data = await fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur')
     const api = await data.json()
     
     const pokemon = new Pokemon({
        name: api.name,
        height: api.height,
        weight: api.weight,
        abilities: api.abilities,
        is_hidden: api.is_hidden,
        slot: api.slot,
        held_items: api.held_items,
 })
   await pokemon.save()
   res.status(201).json(pokemon)
  } catch (error) {
   console.log(error)
   res.status(401).json({mes: "Error to add Pokemon"})
   }
 })

router.post('/create_pokemon', async (req, res) => {
    try {
     const pokemonBody = await Pokemon({ 
             name: req.body.name,
             height: req.body.height,
             weight: req.body.weight,
             abilities: req.body.abilities,
             held_items: req.body.held_items,
       })
           await pokemonBody.save()
           res.status(201).json(pokemonBody)

     } catch (error) {
           res.status(401).json({ mes: 'Error to create Pokemon'})
           console.log(error)
    }
 })

 router.delete('/delete_pokemon/:id', async (req, res) => {
    try {
        const result = await Pokemon.findByIdAndRemove({ _id: req.params.id })
        res.status(200).json(result)

   } catch (error) {
        res.status(401).json({ mes: 'Not found Pokemon' })
        console.log(error)
    }
 })

 router.delete('/delete_all_pokemons', async (req, res) => {
    try {
      await Pokemon.deleteMany()
      res.status(200).json({ mes: 'All pokemons was removed' })
  } catch (error) {
       console.log(error)
       res.status(401).json({ mes: 'Error to remove' })
    }
 })
 
 router.put('/update_pokemon/:id', async (req, res) => {
    try {
      const update = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(201).json(update)
   }
    catch (error) {
      console.log(error)
      res.status(401).json({ mes: 'Not found ID'})
    }
 })



export default router;