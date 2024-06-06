const express = require("express");
const app = express();
const port = 3000;
const bookData = require('./data/books.json');

app.get('/all', (req, res) => {
    const dataTotal = bookData.map(element => element)
    res.send(dataTotal)
})
app.get('/first', (reg, res) => {
    const primerElemento = bookData[0];
    res.send(primerElemento)
})
app.get('/last', (req, res) => {
    const ultimoElemento = bookData[(Object.keys(bookData).length - 1)];
    res.send(ultimoElemento);
})
app.get('/middle', (req, res) => {
    const mitad = Math.ceil((Object.keys(bookData).length - 1) / 2);
    const elemMitad = bookData[mitad];
    res.send(elemMitad);
})
app.get('/author/:nombre', (req, res) => {
    const name = req.params.nombre;
    if (name) {
        const libroEncontrado = bookData.find((book) => book.author.toLowerCase() === name.replace('-', ' '));
        res.json(libroEncontrado.title)
    }
})
app.get('/country/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    if (nombre) {
        const autorEncontrado = bookData.find((book) => book.author.toLowerCase() === nombre.replace('-', ' '));
        res.json(autorEncontrado.country)
    }
})
app.get('/year&pages/cervantes', (req, res) => {
    const cervantes = bookData.find(book => book.author === 'Miguel de Cervantes');
    if (cervantes) {
      res.send({ pages: cervantes.pages, year: cervantes.year });
    } else {
      res.status(404).send('No existe el libro.');
    }
  });

/* 
app.get('/country/count/:pais', (req, res) => {
    const pais = req.country.count.pais;
    let contador = 0;
    if (pais) {
        bookData.forEach((element) => {
            if ((element.country).toLowerCase() === pais) {

                contador++
            }
        })
        res.send(contador);
    }
})

app.get('/country/at-least/germany', (req, res) => {

})

app.get('/pages/all-greater/200', (req, res) => {

})


 */
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})