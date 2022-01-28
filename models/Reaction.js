const { Schema, Types } = require('mongoose');
const date = require('../utils/date')

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
      type: date,
      defailt: Date.now,
      get: timestamp => dateFormat(timestamp)
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
