// POST / - If the user is logged in, it should store the incoming note along with their userId
// GET / - If the user is logged in, it should get all notes for their userId
// GET /:id - If the user is logged in, it should get the note with the provided id and that has their userId

const router = require('express').Router();
const { createNote, getNote, getUserNotes } = require('../daos/note');
const { isLoggedIn } = require('../middleware/auth');


// Create a new note
router.post('/',  isLoggedIn, async (req, res, next) => {  
  const userId = req.userId;
  const {text} = req.body;
  try {
    const note = await createNote(userId, text);
    res.json(note);
  } catch (err) {        
    next(err);
  }
});

router.get('/',  isLoggedIn, async (req, res, next) => {
  const userId = req.userId;
  try {
    const notes = await getUserNotes(userId);
    res.json(notes);
  } catch (err) {    
    next(err);
  }
});

// Get a single note
router.get('/:id', isLoggedIn,  async (req, res, next) => {
    
  const userId = req.userId;
  const noteId = req.params.id;

  try {
    const note = await getNote(userId, noteId);
    if (note)
        res.json(note);
    else    
        res.sendStatus(404);

  } catch (err) {    
    next(err);
  }
});

module.exports = router;