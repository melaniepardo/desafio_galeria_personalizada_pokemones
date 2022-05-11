const axios = require('axios')



const getPokemon = async () => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=5`)
    return data.results
}

const getPokemonData = async (name) => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    return data
}

const getData = async () => {
    return new Promise((resolve, reject) => {
        const pokemones = []
        const pokeImgName = []
        getPokemon().then((results) => {
            results.forEach((p) => {
                const { name } = p
                pokemones.push(getPokemonData(name))
            })

            Promise.all(pokemones).then((data) => {
                data.forEach((p) => {
                    const img = p.sprites.front_default
                    const nombre = p.name
                    pokeImgName.push({ img, nombre })
                })
                resolve(pokeImgName)
            })
        })
    })
}

module.exports = getData