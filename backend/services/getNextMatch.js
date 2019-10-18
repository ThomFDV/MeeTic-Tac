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
const Watch = require('../models/watch');

let likedWatchs = {};
let dislikedWatchs = {};

exports.matchesArePresent = (userId) => {
    if(likedWatchs[userId]) return true;
    return false;
};

exports.getNextMatch = async (userId, matches) => {
    await initTabs(userId);
    for(let match of matches) {
        if(match.isLiked) {
            likedWatchs[userId] = await this.buildTabs(match, likedWatchs[userId]);
        } else {
            dislikedWatchs[userId] = await this.buildTabs(match, dislikedWatchs[userId]);
        }
    };
    console.log("TABLO: " + JSON.stringify(likedWatchs[userId]));
    const nextWatch = await generateQuery(likedWatchs[userId], dislikedWatchs[userId]);
};

async function initTabs(userId) {
    const colors = await ColorController.getAllT();
    const types = await TypeController.getAllT();
    const materials = await MaterialController.getAllT();
    const widths = await WidthController.getAllT();
    likedWatchs[userId] = {
        housing: {
            color: {}
        },
        dial: {
            color: {},
            type: {}
        },
        bracelet: {
            color: {},
            type: {},
            width: {},
            material: {}
        }
    };
    dislikedWatchs[userId] = {
        housing: {
            color: {}
        },
        dial: {
            color: {},
            type: {}
        },
        bracelet: {
            color: {},
            type: {},
            width: {},
            material: {}
        }
    };
    colors.forEach(c => {
        likedWatchs[userId].housing.color[c.label] = 0;
        likedWatchs[userId].bracelet.color[c.label] = 0;
        likedWatchs[userId].dial.color[c.label] = 0;
        dislikedWatchs[userId].housing.color[c.label] = 0;
        dislikedWatchs[userId].bracelet.color[c.label] = 0;
        dislikedWatchs[userId].dial.color[c.label] = 0;
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

exports.buildTabs = async (match, tab) => {
    try {
        const result = await Watch.findById(match.watchId);
        try {
            tab = await getPatternInfos(result.dialId, 'dial', tab);
            tab = await getPatternInfos(result.braceletId, 'bracelet', tab);
            tab = await getWidth(result.braceletId, tab);
            tab = await getMaterial(result.braceletId, tab);
            console.log("\n444444444444444444\n" + JSON.stringify(tab) + "\n===============\n");
            tab = await getColor(result.housingId, 'housing', tab);
            console.log("\n555555555555555555\n" + JSON.stringify(tab) + "\n===============\n");
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

async function getPatternInfos(componentId, componentName, tab) {
    let patternId = null;
    if(componentName === 'dial') {
        patternId = await Dial.findById(componentId, 'patternId');
    } else {
        patternId = await Bracelet.findById(componentId, 'patternId');
    }
    const colorId = await Pattern.findById(patternId.patternId, 'mainColor');
    tab = await getColor(colorId.mainColor, componentName, tab);
    const typeId = await Pattern.findById(patternId.patternId, 'patternType');
    tab = await getType(typeId, tab, componentName);
    return tab;
}

async function getColor(colorId, componentName, tab) {
    let color_id = undefined;
    if(componentName === 'housing') {
        //TODO Voir ici car pour housing colorLabel est a null
        color_id = await Housing.findById(colorId, 'colorId');
        color_id = color_id.colorId;
        colorId = color_id;
    }
    const colorLabel = await Color.findById(colorId, 'label');
    if(componentName === 'dial') {
        tab.dial.color[colorLabel.label] += 1;
    } else if(componentName === 'bracelet'){
        tab.bracelet.color[colorLabel.label] += 1;
    } else {
        tab.housing.color[colorLabel.label] += 1;
    }
    return tab;
}

async function getType(typeId, tab, componentName) {
    const typeLabel = await Type.findById(typeId.patternType, 'label');
    if(componentName === 'dial') {
        tab.dial.type[typeLabel.label] += 1;
    } else {
        tab.bracelet.type[typeLabel.label] += 1;
    }
    return tab;
}

async function getWidth(braceletId, tab) {
    const widthId = await Bracelet.findById(braceletId, 'widthId');
    const widthLabel = await Width.findById(widthId.widthId, 'label');
    tab.bracelet.width[widthLabel.label] += 1;
    return tab;
}

async function getMaterial(braceletId, tab) {
    const materialId = await Bracelet.findById(braceletId, 'materialId');
    const materialLabel = await Material.findById(materialId.materialId, 'label');
    tab.bracelet.material[materialLabel.label] += 1;
    return tab;
}

exports.getWatch = async (watchId) => {
    const watch = {};
    const result = await Watch.findById(watchId);
    const dialPatternId = await Dial.findById(result.dialId, 'patternId');
    const braceletPatternId = await Bracelet.findById(result.braceletId, 'patternId');
    const housingColorId = await Housing.findById(result.housingId, 'colorId');
    watch.housing.color = await Color.findById(housingColorId, 'label');
    watch.bracelet.width = await Width.findById(result.braceletId, 'label');
    watch.bracelet.material = await Material.findById(result.braceletId, 'label');
    const temp = [braceletPatternId, dialPatternId];
    for(let i = 0; i < temp.length; i++) {
        const ids = await Pattern.findById(temp[i], 'mainColor, patternType');
        const colorLabel = await Color.findById(ids.mainColor, 'label');
        const typeLabel = await Type.findById(ids.patternType, 'label');
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

async function generateQuery(likes, dislikes) {
    const housingColor = await defineColorScore(likes.housing.color, dislikes.housing.color);
    const dialColor = await defineColorScore(likes.dial.color, dislikes.dial.color);
    const dialType = await defineTypeScore(likes.dial.type, dislikes.dial.type);
    const braceletColor = await defineColorScore(likes.bracelet.color, dislikes.bracelet.color);
    const braceletType = await defineTypeScore(likes.bracelet.type, dislikes.bracelet.type);
    const braceletWidth = await defineWidthScore(likes.bracelet.width, dislikes.bracelet.width);
    const braceletMaterial = await defineMaterialScore(likes.bracelet.material, dislikes.bracelet.material);
    let patterns = {};
    let ids = {};
    patterns.dial = await Pattern.find({
        mainColor : {
            $in: dialColor
        }, patternType: {
            $in: dialType
        }
    }, '_id');
    patterns.bracelet = await Pattern.find({
        mainColor : {
            $in: braceletColor
        }, patternType: {
            $in: braceletType
        }
    }, '_id');
    console.log("Patterns du bracelet" + patterns.bracelet);
    ids.housing = await Housing.find({
        colorId : {
            $in: housingColor
        }
    }, '_id');
    console.log("Ids du housing" + ids.housing);
    ids.bracelet = await Bracelet.find({
        patternId : {
            $in: patterns.bracelet
        }, widthId: {
            $in: braceletWidth
        }, materialId: {
            $in: braceletMaterial
        }
    }, '_id');
    console.log("Ids de bracelet" + ids.bracelet);
    ids.dial = await Dial.find({
        patternId : {
            $in: patterns.dial
        }
    }, '_id');
    console.log("Ids du dial" + ids.dial);
    if(ids.bracelet.length != 0 || ids.dial.length != 0 || ids.housing.length != 0) {
        return 0;
    }
}

async function defineColorScore(tLikes, tDislikes) {
    const colorsList = await ColorController.getAll();
    let totalLikes = 0;
    for(let color in tLikes) {
        totalLikes += color;
    }
    let totalDislikes = 0;
    for(let color in tDislikes) {
        totalDislikes += color;
    }
    if(totalLikes == 0) totalLikes = 1;
    if(totalDislikes == 0) totalDislikes = 1;
    let ratios = [];
    let i = 0;
    colorsList.forEach(c => {
        ratios[i] = {
            value: ((tLikes[c.label] * 100) / totalLikes) - ((tDislikes[c] * 100) / totalDislikes),
            color: c.label,
            id: c._id
        };
        i += 1;
    });
    ratios.sort((a, b) => a.value - b.value);
    let colorsQuery = [ratios[0], ratios[1]];
    i = -1;
    while(i !== undefined) {
        let rand = Math.floor(Math.random() * Math.floor(ratios.length));
        i = colorsQuery.find(el => {
            return el.id === ratios[rand].id;
        });
        if(i === undefined) {
            i = rand;
            break;
        }
    }
    colorsQuery.push(ratios[i]);
    colorsQuery = colorsQuery.map(el => {
        return el.id;
    });
    return colorsQuery;
}

async function defineTypeScore(tLikes, tDislikes) {
    const typesList = await TypeController.getAll();
    let totalLikes = 0;
    for(let type in tLikes) {
        totalLikes += type;
    }
    let totalDislikes = 0;
    for(let type in tDislikes) {
        totalDislikes += type;
    }
    if(totalLikes == 0) totalLikes = 1;
    if(totalDislikes == 0) totalDislikes = 1;
    let ratios = [];
    let i = 0;
    typesList.forEach(t => {
        ratios[i++] = {
            value: ((tLikes[t.label] * 100) / totalLikes) - ((tDislikes[t.label] * 100) / totalDislikes),
            type: t.label,
            id: t._id
        }
    });
    ratios.sort((a, b) => a.value - b.value);
    let typesQuery = [ratios[0], ratios[1]];
    i = -1;
    while(i !== undefined) {
        let rand = Math.floor(Math.random() * Math.floor(ratios.length));
        i = typesQuery.find(el => {
            return el.id === ratios[rand].id;
        });
        if(i === undefined) {
            i = rand;
            break;
        }
    }
    typesQuery.push(ratios[i]);
    typesQuery = typesQuery.map(el => {
        return el.id;
    });
    return typesQuery;
}

async function defineWidthScore(tLikes, tDislikes) {
    const widthsList = await WidthController.getAll();
    let totalLikes = 0;
    for(let type in tLikes) {
        totalLikes += type;
    }
    let totalDislikes = 0;
    for(let type in tDislikes) {
        totalDislikes += type;
    }
    if(totalLikes == 0) totalLikes = 1;
    if(totalDislikes == 0) totalDislikes = 1;
    let ratios = [];
    let i = 0;
    widthsList.forEach(w => {
        ratios[i++] = {
            value: ((tLikes[w.label] * 100) / totalLikes) - ((tDislikes[w.label] * 100) / totalDislikes),
            width: w.label,
            id: w._id
        }
    });
    ratios.sort((a, b) => a.value - b.value);
    let widthsQuery = [ratios[0]];
    i = -1;
    while(i !== undefined) {
        let rand = Math.floor(Math.random() * Math.floor(ratios.length));
        i = widthsQuery.find(el => {
            return el.id === ratios[rand].id;
        });
        if(i === undefined) {
            i = rand;
            break;
        }
    }
    widthsQuery.push(ratios[i]);
    widthsQuery = widthsQuery.map(el => {
        return el.id;
    });
    return widthsQuery;
}

async function defineMaterialScore(tLikes, tDislikes) {
    const materialsList = await MaterialController.getAll();
    let totalLikes = 0;
    for(let type in tLikes) {
        totalLikes += type;
    }
    let totalDislikes = 0;
    for(let type in tDislikes) {
        totalDislikes += type;
    }
    if(totalLikes == 0) totalLikes = 1;
    if(totalDislikes == 0) totalDislikes = 1;
    let ratios = [];
    let i = 0;
    materialsList.forEach(m => {
        ratios[i++] = {
            value: ((tLikes[m.label] * 100) / totalLikes) - ((tDislikes[m.label] * 100) / totalDislikes),
            material: m.label,
            id: m._id
        }
    });
    ratios.sort((a, b) => a.value - b.value);
    let materialsQuery = [ratios[0]];
    i = -1;
    while(i !== undefined) {
        let rand = Math.floor(Math.random() * Math.floor(ratios.length));
        i = materialsQuery.find(el => {
            return el.id === ratios[rand].id;
        });
        if(i === undefined) {
            i = rand;
            break;
        }
    }
    materialsQuery.push(ratios[i]);
    materialsQuery = materialsQuery.map(el => {
        return el.id;
    });
    return materialsQuery;
}
