'use strict';

const mongoose = require('mongoose');
const MatchController = require('../controllers/match');
const ColorController = require('../controllers/color');
const WidthController = require('../controllers/width');
const TypeController = require('../controllers/type');
const MaterialController = require('../controllers/material');
const Watch = require('../models/material');

let likedWatchs = {};
let dislikedWatchs = {};

exports.matchesArePresent = (userId) => {
    if(likedWatchs[userId]) return true;
    return false;
};

exports.getNextMatch = (userId, matches) => {
    this.initTabs(userId);
    matches.forEach(match => {
        this.buildTabs(match, userId);
    });
};

function initTabs(userId) {
    const colors = ColorController.getAllT();
    const types = TypeController.getAllT();
    const materials = MaterialController.getAllT();
    const widths = WidthController.getAllT();
    colors.forEach(c => {
       likedWatchs[userId].housing.color[c] = 0;
       likedWatchs[userId].braceletPattern.color[c] = 0;
       likedWatchs[userId].dialPattern.color[c] = 0;
       dislikedWatchs[userId].housing.color[c] = 0;
       dislikedWatchs[userId].braceletPattern.color[c] = 0;
       dislikedWatchs[userId].dialPattern.color[c] = 0;
    });
    types.forEach(t => {
        likedWatchs[userId].braceletPattern.type[t] = 0;
        likedWatchs[userId].dialPattern.type[t] = 0;
        dislikedWatchs[userId].braceletPattern.type[t] = 0;
        dislikedWatchs[userId].dialPattern.type[t] = 0;
    });
    materials.forEach(m => {
        likedWatchs[userId].bracelet.material[m] = 0;
        dislikedWatchs[userId].bracelet.material[m] = 0;
    });
    widths.forEach(w => {
        likedWatchs[userId].bracelet.width[w] = 0;
        dislikedWatchs[userId].bracelet.width[w] = 0;
    });
}

exports.buildTabs = (match) => {
    try {
        const result = Watch.findById(match.watchId, 'braceletId dialId housingId', err => {
            if(err) {
                console.log('Raté');
                return null;
            }
        });
    } catch(err) {
        console.log('Raté 2');
    }
};
