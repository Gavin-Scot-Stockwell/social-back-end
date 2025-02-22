import User from '../models/User.js';
//GET all users
export const getAllUsers = async (_req, res) => {
    try {
        const user = await User.find({});
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
//GET a single user by its _id and populated thought and friend data
export const getUserById = async (req, res) => {
    try { //how would get the friend data???
        const user = await User.findOne({ _id: req.params.userId });
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        }
        else {
            res.json(user);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
};
//POST a new user (note that the examples below are just sample data):
export const createUser = async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
/*
{
  "username
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
*/
//PUT to update a user by its _id
export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;
        // Ensure the _id field is not included in the update data
        delete updateData._id;
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'No user with this ID' });
        }
        return res.json(updatedUser);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
//DELETE to remove user by its _id
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            res.status(404).json({ message: 'No user with that ID to delete' });
        }
        else {
            res.json(user);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
};
