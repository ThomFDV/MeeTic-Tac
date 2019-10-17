'use strict';

const mongoose = require('mongoose');
const MatchController = require('../controllers/match');
const ColorController = require('../controllers/color');
const WidthController = require('../controllers/width');
const TypeController = require('../controllers/type');
const MaterialController = require('../controllers/material');
const Dial = require('../models/dial');
const Bracelet = require('../models/bracelet');
const Color = require('../models/color');
const Type = require('../models/type');
const Material = require('../models/material');
const Width = require('../models/width');
const Pattern = require('../models/pattern');
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
        if(match.isLiked) {
            this.buildTabs(match, likedWatchs[userId]);
        } else {
            this.buildTabs(match, dislikedWatchs[userId]);
        }
    });
    //@TODO calculer score
};

function initTabs(userId) {
    const colors = ColorController.getAllT();
    const types = TypeController.getAllT();
    const materials = MaterialController.getAllT();
    const widths = WidthController.getAllT();
    colors.forEach(c => {
        likedWatchs[userId].housing.color[c] = 0;
        likedWatchs[userId].bracelet.color[c] = 0;
        likedWatchs[userId].dial.color[c] = 0;
        dislikedWatchs[userId].housing.color[c] = 0;
        dislikedWatchs[userId].bracelet.color[c] = 0;
        dislikedWatchs[userId].dial.color[c] = 0;
    });
    types.forEach(t => {
        likedWatchs[userId].bracelet.type[t] = 0;
        likedWatchs[userId].dial.type[t] = 0;
        dislikedWatchs[userId].bracelet.type[t] = 0;
        dislikedWatchs[userId].dial.type[t] = 0;
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

exports.buildTabs = (match, tab) => {
    try {
        const result = Watch.findById(match.watchId, 'braceletId dialId housingId', err => {
            if(err) {
                console.log('Raté');
                return tab;
            }
        });
        try {
            tab = getPatternInfos(result.dialId, 'dial', tab);
            tab = getPatternInfos(result.braceletId, 'bracelet', tab);
            tab = getWidth(result.braceletId, tab);
            tab = getMaterial(result.braceletId, tab);
            tab = getColor(result.housingId, 'housing', tab);
        } catch(err) {
            console.log(err);
            return tab;
        }
    } catch(err) {
        console.log('Raté 2');
        return tab;
    }
    return tab;
};

function getPatternInfos(componentId, componentName, tab) {
    let patternId = null;
    if(componentName === 'dial') {
        patternId = Dial.findById(componentId, 'patternId', (err, id) => {
            if(err) {
                console.log(err);
                return null;
            }
            return id;
        });
    } else {
        patternId = Bracelet.findById(componentId, 'patternId', (err, id) => {
            if(err) {
                console.log(err);
                return null;
            }
            return id;
        });
    }
    const colorId = Pattern.findById(patternId, 'mainColor', (err, id) => {
        if(err) {
            console.log(err);
            return null;
        }
        return id;
    });
    tab = getColor(colorId, tab, componentName);
    const typeId = Pattern.findById(patternId, 'patternType', (err, id) => {
        if(err) {
            console.log(err);
            return null;
        }
        return id;
    });
    tab = getType(typeId, tab, componentName);
    return tab;
}

function getColor(colorId, tab, componentName) {
    const colorLabel = Color.findById(colorId, 'label', (err, label) => {
        if(err) {
            console.log(err);
            return null;
        }
        return label;
    });
    if(componentName === 'dial') {
        tab.dial.color[colorLabel] += 1;
    } else if(componentName === 'bracelet'){
        tab.bracelet.color[colorLabel] += 1;
    } else {
        tab.housing.color[colorLabel] += 1;
    }
    return tab;
}

function getType(typeId, tab, componentName) {
    const typeLabel = Type.findById(colorId, 'label', (err, label) => {
        if(err) {
            console.log(err);
            return null;
        }
        return label;
    });
    if(componentName === 'dial') {
        tab.dial.type[typeLabel] += 1;
    } else {
        tab.bracelet.type[typeLabel] += 1;
    }
    return tab;
}

function getWidth(braceletId, tab) {
    const widthId = Bracelet.findById(braceletId, 'widthId', (err, id) => {
        if(err) {
            console.log(err);
            return null;
        }
        return id;
    });
    const widthLabel = Width.findById(widthId, 'label', (err, label) => {
        if(err) {
            console.log(err);
            return null;
        }
        return label;
    });
    tab.bracelet.width[widthLabel] += 1;
    return tab;
}

function getMaterial(braceletId, tab) {
    const materialId = Bracelet.findById(materialId, 'materialId', (err, id) => {
        if(err) {
            console.log(err);
            return null;
        }
        return id;
    });
    const materialLabel = Width.findById(materialId, 'label', (err, label) => {
        if(err) {
            console.log(err);
            return null;
        }
        return label;
    });
    tab.bracelet.material[materialLabel] += 1;
    return tab;
}
