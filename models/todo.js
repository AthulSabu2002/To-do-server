const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  completedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('Todo', todoSchema);
