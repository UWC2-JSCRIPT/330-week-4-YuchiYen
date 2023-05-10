// createNote(userId, noteObj) - should create a note for the given user
// getNote(userId, noteId) - should get note for userId and noteId (_id)
// getUserNotes(userId) - should get all notes for userId

const Note = require('../models/note');
module.exports = {};

module.exports.createNote = async (userId, text) => {
    const note = new Note({
        text,
        userId,
    });
    const createdNote = await Note.create(note);
    return createdNote;
}

module.exports.getNote = async (userId, noteId) => {
    const note = await Note.findOne({ _id: noteId, userId: userId }).lean();
    return note;
}

module.exports.getUserNotes = async (userId) => {
    const notes = await Note.find({ userId }).lean();
    return notes;
}