// importation du package express
const express = require('express');

//création d'une appli express
const app = express()

const generePageAccuiel = require('.pages/index-get.js')
app.get('/', (req, res) =>{
  
})
app.listen(PORT, () => {
    console.log(`serveur demarré : http://localhost:${PORT} `)
})