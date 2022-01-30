const { Schema, Types } = require('mongoose');
const Date = require('../utils/date')

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 200
    },
    username:{
      type:String,
      require:true
    },
    createdAt:{
      type: Date,
      defailt: Date.now,
      // get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);




module.exports = reactionSchema;
