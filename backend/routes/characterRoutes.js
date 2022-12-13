const express = require('express');
const router = express.Router();

const {
  getAllCharacters,
  getSingleCharacter,
  postCharacters,
  deleteCharacter,
  updateCharacter
} = require('../controllers/characterControllers')

router.get('/', getAllCharacters);
router.post('/', postCharacters);
router.get('/:id', getSingleCharacter);
router.delete('/:id', deleteCharacter);
router.patch('/:id', updateCharacter)

module.exports = router;