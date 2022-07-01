const express = require('express');
const app = express();
const sumArray = require("./sumArray")

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'hola',
  }) 
});


app.get('/test', (req, res) => {
  res.status(200).send({
    message: "test"
  }) 
});

app.post('/sum', (req, res) => {
  const {a , b} = req.body
  res.status(200).send({
    result: a + b,
  });
});


app.post('/product', (req, res) => {
  res.status(200).send({
    result: req.body.a * req.body.b,
  });
});





app.post('/sumArray', (req, res) => {

  const { array, num } = req.body

  if(!array || !num){
    return res.sendStatus(400)
  }

  const result = sumArray(array,num)

  res.send({
    result
  })

});



app.post('/numString', (req, res) => {
  const { word } = req.body

  if(typeof word === "number" || !word.lenght){
    return res.sendStatus(400)
  }

  const result = word.lenght

  res.send({ 
    result 
  })
});






module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
