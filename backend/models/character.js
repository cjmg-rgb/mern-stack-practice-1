const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema(
  {
    characterName: {type: String, required: true},
    characterClass: {type: String, required: true},
  }, 
  {timestamps: true}
)

module.exports = mongoose.model('Charcter', characterSchema);