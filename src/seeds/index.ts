import db from '../config/connection.js';
import cleanDB from './cleanDB.js';
import { user, thought } from './data.js';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

const seedDatabase = async () => {
    try {
        await db(); // Establishes a connection to the database
        await cleanDB(); // Cleans the database, likely removing existing data

        // Correctly create user documents in the database using the User model
        const createdUsers = await User.create(user);
        const createdThoughts = await Thought.create(thought);

        console.log('Users created:', createdUsers);
        console.log('Thoughts created:', createdThoughts);

    } catch (err) {
        console.error('Error seeding database:', err);
    }
};

seedDatabase();