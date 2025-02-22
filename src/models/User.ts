import { Schema, model, type Document } from "mongoose";

interface User extends Document {
    username: string;
    email: string;
    thoughts: Schema.Types.ObjectId[];
    friends: Schema.Types.ObjectId[];
}

const userSchema = new Schema<User>({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}
    , {
        toJSON: {
            virtuals: true,
        },
        id: false
    });

//this is friend count
userSchema.virtual('friendCount').get(function () {
    return `number of friends: ${this.friends.length}`;
});

const UserModel = model<User>('User', userSchema);

export default UserModel;