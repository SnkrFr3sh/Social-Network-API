const { Schema, model } = require('mongoose');
const User = require('./User')

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateformat(timestamp)
    },
    username: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require:true
      },
    ],
    reaction: [reactionSchema],
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

reactionSchema.virtual('reactionCount').get(function(){
  return this.reaction.length;
});



const Course = model('course', courseSchema);

module.exports = Course;
