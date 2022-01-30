const { Schema, model } = require('mongoose');
const User = require('./User');
const reactionSchema = require('./Reaction');
// const Date = require('../utils/date')

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'remember to leave a thought',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
       type: Date, 
       default: Date.now,
       
    },
    username:
    {
      type: String,
      ref: User,
      // type: String,
      require: true
    },
    reactions: [reactionSchema],
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});



const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
