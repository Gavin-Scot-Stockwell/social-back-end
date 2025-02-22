import { Schema } from "mongoose";
const reactionSchema = new Schema({
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
export { reactionSchema };
