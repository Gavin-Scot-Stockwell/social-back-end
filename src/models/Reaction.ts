import { Schema, type Document } from "mongoose";

interface Reaction extends Document {
    reactionBody: string;
    username: string;
    createdAt: Date;
}

const reactionSchema = new Schema<Reaction>({
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        virtuals: true,
    },
    id: false
});

export { reactionSchema, Reaction };