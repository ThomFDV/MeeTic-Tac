'use strict';

const mongoose = require('mongoose');
const MatchController = require('../controllers/match');
const ColorController = require('../controllers/color');
const WidthController = require('../controllers/width');
const TypeController = require('../controllers/type');
const MaterialController = require('../controllers/material');
const Dial = require('../models/dial');
const Bracelet = require('../models/bracelet');
const Housing = require('../models/housing');
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
            likedWatchs[userId] = this.buildTabs(match, likedWatchs[userId]);
        } else {
            dislikedWatchs[userId] = this.buildTabs(match, dislikedWatchs[userId]);
        }
    });

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
    if(componentName === 'housing') {
        colorId = Housing.findById(colorId, (err, id) => {
            if(err) {
                console.log(err);
                return null;
            }
            return id;
        });
    }
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
    const materialLabel = Material.findById(materialId, 'label', (err, label) => {
        if(err) {
            console.log(err);
            return null;
        }
        return label;
    });
    tab.bracelet.material[materialLabel] += 1;
    return tab;
}

function defineColorScore(tLikes, tDislikes) {
    const colorsList = ColorController.getAllT();
    let totalLikes = tLikes.reduce((acc, curr) => acc + curr);
    let totalDislikes = tDislikes.reduce((acc, curr) => acc + curr);
    if(totalLikes == 0) totalLikes = 1;
    if(totalDislikes == 0) totalDislikes = 1;
    let ratios = [];
    colorsList.forEach(color => {
        ratios[color] = ((tLikes[color] * 100) / totalLikes) - ((tDislikes[color] * 100) / totalDislikes)
    });
}

exports.getWatch = (watchId) => {
    const watch = {};
    const result = Watch.findById(watchId, err => {
        if(err) {
            console.log('Raté');
            return tab;
        }
    });
    const dialPatternId = Dial.findById(result.dialId, 'patternId', (err, id) => {
        if(err) {
            console.log(err);
            return null;
        }
        return id;
    });
    const braceletPatternId = Bracelet.findById(result.braceletId, 'patternId', (err, id) => {
        if(err) {
            console.log(err);
            return null;
        }
        return id;
    });
    const housingColorId = Housing.findById(result.housingId, 'colorId', (err, id) => {
        if(err) {
            console.log(err);
            return null;
        }
        return id;
    });
    watch.housing.color = Color.findById(housingColorId, 'label', (err, label) => {
        if(err) {
            console.log(err);
            return null;
        }
        return label;
    });
    watch.bracelet.width = Width.findById(result.braceletId, 'label', (err, label) => {
        if(err) {
            console.log(err);
            return null;
        }
        return label;
    });
    watch.bracelet.material = Material.findById(result.braceletId, 'label', (err, label) => {
        if(err) {
            console.log(err);
            return null;
        }
        return label;
    });
    const temp = [braceletPatternId, dialPatternId];
    for(let i = 0; i < temp.length; i++) {
        const ids = Pattern.findById(temp[i], 'mainColor, patternType', (err, val) => {
            if(err) {
                console.log(err);
                return null;
            }
            return val;
        });
        const colorLabel = Color.findById(ids.mainColor, 'label', (err, label) => {
            if(err) {
                console.log(err);
                return null;
            }
            return label;
        });
        const typeLabel = Type.findById(ids.patternType, 'label', (err, label) => {
            if(err) {
                console.log(err);
                return null;
            }
            return label;
        });
        if(i == 0) {
            watch.bracelet.color = colorLabel;
            watch.bracelet.type = typeLabel;
        } else {
            watch.dial.color = colorLabel;
            watch.dial.type = typeLabel;
        }
    }
    return watch;
}

function defineTypeScore(tLikes, tDislikes) {

}

function defineWidthScore(tLikes, tDislikes) {

}

function defineMaterialScore(tLikes, tDislikes) {

}
