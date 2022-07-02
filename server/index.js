require("dotenv").config();
var {save, fetch, deleteRecord} = require('./db.js')
const express = require("express");
const path = require("path");
var bodyParser = require('body-parser');
const app = express();


// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(bodyParser.json());

app.post('/dic', async function(req, res) {
  await save(req.body)
  res.status(201).send('received')
})

app.get('/dic', async function(req, res) {
  const allData = await fetch(req.query.word);
  var sortedData = allData.map((word) => {return {word: word.word, defination: word.defination}})
  res.status(200).send(JSON.stringify(sortedData));
})

app.post('/delete', async function(req, res) {
  await deleteRecord(req.body.word)
  res.status(201).send('deleted')

})

/****
 *
 *
 * Other routes here....
 *
 *
 */
process.env.PORT = 3000;
app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
