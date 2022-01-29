const { Schema, model } = require('mongoose');
const User = require('./User');
const reactionSchema = require('./Reaction');
const Date = require ('../utils/date')

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    //   get: timestamp => dateformat(timestamp)
    // },
    username: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require:true
      },
    ],
    reactions: [reactionSchema],
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function(){
  return this.reactions.length;
});



const Thought = model('thought', thoughtSchema);

module.exports = Thought;
