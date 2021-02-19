import express from 'express'
import bodyParser from 'body-parser'
import pokemons from './router/pokemons.js'
import populate from './router/populate.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

dotenv.config({path: './config/connect.env'})

connectDB()

const app = express()

app.use(bodyParser.json())

app.use('/', pokemons)
app.use('/', populate)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server run ${process.env.PORT}`))

