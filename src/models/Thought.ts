import { Schema, model, type Document } from "mongoose";
import { reactionSchema, Reaction } from './Reaction.js';

interface Thought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: Reaction[];
}

const thoughtSchema = new Schema<Thought>({
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

const ThoughtModel = model<Thought>('Thought', thoughtSchema);

export default ThoughtModel;