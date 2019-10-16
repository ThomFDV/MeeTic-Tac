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

exports.addParticipant = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id, (err, ev) => {
            if (err) return err;
            const userId = req.user._id.toString();
            for(let participant of ev.participant) {
                if (participant.userId.toString() === userId) {
                    return res.status(400).send("You are already in");
                }
            };
            const userEmail= req.user.email;
            const enableNotification = req.body.enableNotification;
            const participant = {
                userId,
                userEmail,
                enableNotification
            };
            if (ev === null) return res.json({"message": "You can't participate to this event"}).status(409).end();
            ev.participant.push(participant);
            ev.save();
            return res.json({participant, ev}).status(201).end();
        });
    } catch (e) {
        return res.status(409).json({e}).end();
    }
};

exports.rmvParticipant = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id, (err, ev) => {
            if (err) return err;
            const userId = req.user._id.toString();
            let usrIdx = -1;
            let counter = -1;
            for(let participant of ev.participant) {
                counter += 1;
                if (participant.userId.toString() === userId) {
                    usrIdx = counter;
                }
            };
            if (ev === null) return res.json({"message": "You can't participate to this event"}).status(409).end();
            ev.participant.splice(usrIdx, 1);
            ev.save();
            return res.json(ev).status(201).end();
        });
    } catch (e) {
        return res.status(409).json({e}).end();
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({date: "desc"});
        return res.status(200).json(events);
    } catch (error) {
        return res.status(400).json(error);
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        return res.status(200).json(event);
    } catch (error) {
        return res.status(400).json(error);
    }
};

exports.rmvEventById = async (req, res) => {
    try {
        await Event.deleteOne({_id: req.params.id});
        return res.status(200).end();
    } catch (error) {
        return res.status(400).json(error);
    }
};