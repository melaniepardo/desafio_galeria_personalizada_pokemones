const http = require('http')
const url = require('url')
const fs = require('fs')
const getData = require('./getdata')

http.createServer(async(req, res) =>  {
    const urlParse = url.parse(req.url, true)
    if (urlParse.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        fs.readFile('index.html', 'utf8', (err, data) => {
            if (err) res.end('No se encontrĂ³ el archivo html')//si es que existe un error, escribe un mensaje
            else res.end(data)//si no, entrega data
        })
    }
    if (req.url == '/pokemones') {
        const pokeImgName = await getData()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(pokeImgName))
        res.end()
    }
})
    .listen(3000,()=> {
console.log('servidor ejecutando')
})