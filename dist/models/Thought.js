import { Schema, model } from "mongoose";
import { reactionSchema } from './Reaction.js';
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
    },
    id: false
});
const ThoughtModel = model('Thought', thoughtSchema);
export default ThoughtModel;
