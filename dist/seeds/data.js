const user = [
    {
        username: "john_doe",
        email: "john@doe.com",
        thoughts: [],
        friends: []
    },
    {
        username: "jane_doe",
        email: "jane@doe.com",
        thoughts: [],
        friends: []
    }
];
const thought = [
    {
        thoughtText: "This is a thought",
        username: "john_doe",
        createdAt: new Date(),
        reactions: []
    },
    {
        thoughtText: "This is another thought",
        username: "jane_doe",
        createdAt: new Date(),
        reactions: []
    }
];
export { user, thought };
