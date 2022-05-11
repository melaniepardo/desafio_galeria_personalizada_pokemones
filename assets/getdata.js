const axios = require('axios')

const pokemones = []
const pokeImgName = []

const getPokemon = async () => {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')//solo queremos acceder a data de la consulta.
    return data.results
}

const getPokemonData = async (name) => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    return data.results
}
getPokemon().then((results) => {
    results.forEach((p) => {
        const { name } = p //va a ejecutar el getPokemon, por todos esos 150 le va a pasar la data de pokemon name
        pokemones.push(getPokemonData(name))// va a llamar a la función y le pasa la data que viene dentro de name de los 150 pokemones
    })
    Promise.all(pokemones).then((data) => {
        data.forEach((p) => {
            const img = p.sprites.front_default
            const nombre = p.name
            pokeImgName.push({ img, nombre })
        })
    })
})
module.exports = pokeImgName
