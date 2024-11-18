const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.put('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/deleteMany', async (req, res) => {
  try {
    await Todo.deleteMany({ _id: { $in: req.body.ids } });
    res.json({ message: 'Todos deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
