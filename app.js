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
    }
  });
  app.get('/country/count/spain', (req, res) => {
    let count = 0;
    for (i = 0; i < bookData.length; i++) {
      if (bookData[i].country === 'Spain') {
        count += 1;
      };
    };
    res.json(count);
  });
  app.get('/country/at-least/germany', (req, res) => {
    const germany = bookData.find(book => book.country === 'Germany');
    germany !== '' ? res.send(true) : false;
  });
  app.get('/pages/all-greater/200', (req, res) => {
    let greaterThan200 = true;

    for (let i = 0; i < bookData.length; i++) {
      if (bookData[i].pages <= 200) {
        greaterThan200 = false;
      }
    }
    res.json(greaterThan200);
  });
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})