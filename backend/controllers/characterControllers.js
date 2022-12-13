const mongoose = require('mongoose');
const Character = require('../models/character');

const getAllCharacters = async (req, res) => {
  const chars = await Character.find({}).sort({ createdAt: -1 });
  res.status(200).json(chars);
}

const getSingleCharacter = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({msg: 'Invalid ID'});
  }
  const chars = await Character.findById({_id: id});
  if(!chars) {
    res.status(404).json({msg: 'ID not found'})
  }
  res.status(200).json(chars)
}

const postCharacters = async (req, res) => {
  const { characterName, characterClass } = req.body;
  try {
    const chars = await Character.create({ characterName, characterClass });
    res.status(200).json(chars)
  } catch(error) {
    res.status(404).json({msg: 'Could not fetch'})
  }
}

const deleteCharacter = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({msg: 'Invalid ID'});
  }
  const chars = await Character.findByIdAndDelete({_id: id});
  if(!chars) {
    res.status(404).json({msg: 'ID not found'})
  }
  res.status(200).json(chars)
}

const updateCharacter = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({msg: 'Invalid ID'});
  }
  const chars = await Character.findByIdAndUpdate({_id: id}, {...req.body});
  if(!chars) {
    res.status(404).json({msg: 'ID not found'})
  }
  res.status(200).json(chars)
}


module.exports = {
  getAllCharacters,
  getSingleCharacter,
  postCharacters,
  deleteCharacter,
  updateCharacter
}