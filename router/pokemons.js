import express from 'express'
import Pokemon from '../models/pokemon.js'

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

      res.staus()
   }
})

router.post('/create_pokemon', async (req, res) => {
    try {
     const pokemonBody = await new Pokemon({ 
             name: req.body.name,
             height: req.body.height,
             weight: req.body.weight,
             abilities: req.body.abilities,
             held_items: req.body.held_items,
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
      res.staus(201).json(update)
   }
    catch (e) {
      res.json({ mes: 'Not found ID'})
      console.log(e)
    }
 })



export default router;