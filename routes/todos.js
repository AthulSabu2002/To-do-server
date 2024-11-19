const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
      completed: false,
      createdAt: new Date(),
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
    console.log(`Received PUT request for ${req.params.id} with body:`, req.body);
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      console.log('Found todo:', todo);
      if (req.body.text !== undefined) {
        todo.text = req.body.text;
      }
      if (req.body.completed !== undefined) {
        todo.completed = Boolean(req.body.completed);
        todo.completedAt = req.body.completed ? new Date() : null;
      }
      const updatedTodo = await todo.save();
      console.log('Updated todo:', updatedTodo);
      res.json(updatedTodo);
    } else {
      console.log('Todo not found');
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (err) {
    console.log('Error:', err.message);
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
    console.log('Found todo:');
    await Todo.deleteMany({ _id: { $in: req.body.ids } });
    res.json({ message: 'Todos deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
