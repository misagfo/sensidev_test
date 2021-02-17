import express from 'express'
import bodyParcer from 'body-parser'
import pokemons from './router/pokemons.js'
import populate from './router/populate.js'
import mongoose from 'mongoose'

const app = express()

app.use(bodyParcer.json())

app.use('/', pokemons)
app.use('/', populate)


async function start() {
    try {
        await mongoose.connect("mongodb+srv://misa:misa123@cluster0.mewny.mongodb.net/pokemon?retryWrites=true&w=majority", {
           useNewUrlParser: true,
           useCreateIndex: true,
           useUnifiedTopology: true 
        }).then(() => console.log('Data Base OK'))
          app.listen(3000, () => console.log('server run'))
    } catch (e) {
        console.log(e, 'Server error')
    }
}

start()


