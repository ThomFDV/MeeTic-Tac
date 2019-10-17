'use strict';

const mongoose = require("mongoose");
const Match = require("../models/match");
const NextMatchService = require("../services/getNextMatch");

exports.create = async (req, res) => {
    const userId = mongoose.mongo.ObjectId(req.body.userId);
    const watchId = mongoose.mongo.ObjectId(req.body.watchId);
    const isLiked = req.body.isLiked;

    try {
        const match = new Match({
            userId,
            watchId,
            isLiked
        });
        try {
            await match.save();
            return res.status(201).send("match/create: Created!");
        } catch(err) {
            return res.status(400).send('match/create: Bad request');
        }
    } catch(err) {
        return res.status(500).send('watch/create: Internal Server Error');
    }
}

exports.getAllUserMatchesT = (req, res) => {
    let matchesMap = {};
    const user_Id = mongoose.mongo.ObjectId(req.user._id);
    Match.findBy({userId: user_id}, (err, matches) => {
        matches.forEach(match => {
            matchesMap.push({
                watchId: match.watchId,
                isLiked: match.isLiked
            });
        });
    });
    return matchesMap;
}

exports.resetMatches = async (req, res) => {
    const userId = req.user._id;
    try {
        const result = Match.deleteMany({userId}, (err) => {
            if(err) return res.status(500).json({err});
        });
        return res.status(200).json({
            message: 'Les matchs ont bien été réinitialisés'
        });
    } catch(err) {
        return res.status(400).json({
            err,
            message: 'réinitialisation impossible'
        });
    }
}

exports.getNextMatch = async (req, res) => {
    const result = this.create(req, res);
    if(result.status != 201) return result;
    const nextWatch = NextMatchService.getNextMatch(req.user._id, this.getAllUserMatchesT(req, res));
}

exports.getAllMatches = async (req, res) => {
    let matchesMap = {};

    Match.find({}, (err, matches) => {
        matches.forEach(match => {
            matchesMap.push({
                watchId: match.watchId,
                isLiked: match.isLiked
            });
        });
    });
    return matchesMap;
}