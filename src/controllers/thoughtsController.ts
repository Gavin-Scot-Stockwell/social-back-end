import Thoughts from '../models/Thought.js';
import { Request, Response } from 'express';


// GET to get all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thoughts.find({});
        res.json(thoughts);

    } catch (err) {
        res.status(500).json(err);

    }
}

// GET to get a single thought by its _id
export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOne({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID' });
        }

        return res.json(thought);

    } catch (err) {
        return res.status(500).json(err);
    }

};


// POST to create a new thought. Don't forget to push the 
// created thought's _id to the associated user's thoughts array field.
// (note that the examples below are just sample data):


//might be broken we will see when it is done aka check back on this one
export const createThought = async (req: Request, res: Response) => {

    try {
        const thought = await Thoughts.create(req.body);
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }

}

/*
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
*/
// PUT to update a thought by its _id

export const updateThought = async (req: Request, res: Response) => {
    try {
        const { thoughtId } = req.params;
        const updateData = req.body;

        // Ensure the _id field is not included in the update data
        delete updateData._id;

        const updatedThought = await Thoughts.findOneAndUpdate(
            { _id: thoughtId },
            updateData,
            { new: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with that ID to update' });
        }

        return res.json(updatedThought);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// DELETE to remove a thought by its _id

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID to delete' });
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

export const createReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID' });
        }
        return res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
};


// DELETE to pull and remove a reaction by the reaction's reactionId value
export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID' });
        }
        return res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
};