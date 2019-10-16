'use strict';

const Event = require("../models/event");

exports.createEvent = async (req, res) => {
    if (!req.user.isAdmin) return res.status(403).send("You have to be an admin!");
    const title = req.body.title;
    const description = req.body.description;
    const location = req.body.location;
    const date = req.body.date;
    const creator = req.user.email;

    try {
        const event = new Event({
            title,
            description,
            location,
            date,
            creator
        });
        await event.save();
        return res.status(201).json({
            message: "Event created!",
            event
        });
    } catch (error) {
        console.log(error);
        return res.status(409).json({
            message: "Not created...",
            error
        });
    }
};