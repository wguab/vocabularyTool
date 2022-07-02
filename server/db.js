const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/dictionary');
let schema = mongoose.Schema({
  word: String,
  defination: String
})
const wordList = mongoose.model('wordList', schema)

var save = async function(data) {

  filter = {word: data.word};
  await wordList.findOneAndUpdate(filter, data, {
    new: true,
    upsert: true,
  })

}
var deleteRecord = async function(word) {
  var filter = { word }
  try {
    await wordList.deleteOne(filter)
  }
  catch(err) {
    throw(err)
  }


}

var fetch = async function(searchWord) {

  console.log('search word is ', searchWord, typeof searchWord)
  try {
    const allData = await wordList.find({word: {$regex: searchWord}});
    return allData;
  }
  catch(err) {
    console.log(err)
  }

}
// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them

module.exports.save = save;
module.exports.fetch = fetch;
module.exports.deleteRecord = deleteRecord;