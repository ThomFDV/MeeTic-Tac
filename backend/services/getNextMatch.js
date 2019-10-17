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
    initTabs(userId);
    matches.forEach(match => {
        if(match.isLiked) {
            likedWatchs[userId] = this.buildTabs(match, likedWatchs[userId]);
        } else {
            dislikedWatchs[userId] = this.buildTabs(match, dislikedWatchs[userId]);
        }
    });
    generateQuery(likedWatchs[userId], dislikedWatchs[userId]);
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

exports.buildTabs = async (match, tab) => {
    try {
        const result = Watch.findById(match.watchId, 'braceletId dialId housingId');
        try {
            tab = await getPatternInfos(result.dialId, 'dial', tab);
            tab = await getPatternInfos(result.braceletId, 'bracelet', tab);
            tab = await getWidth(result.braceletId, tab);
            tab = await getMaterial(result.braceletId, tab);
            tab = await getColor(result.housingId, 'housing', tab);
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
    const colorId = await Pattern.findById(patternId, 'mainColor');
    tab = await getColor(colorId, tab, componentName);
    const typeId = await Pattern.findById(patternId, 'patternType');
    tab = await getType(typeId, tab, componentName);
    return tab;
}

async function getColor(colorId, tab, componentName) {
    if(componentName === 'housing') {
        colorId = await Housing.findById(colorId, 'colorId');
    }
    const colorLabel = await Color.findById(colorId, 'label');
    if(componentName === 'dial') {
        tab.dial.color[colorLabel] += 1;
    } else if(componentName === 'bracelet'){
        tab.bracelet.color[colorLabel] += 1;
    } else {
        tab.housing.color[colorLabel] += 1;
    }
    return tab;
}

async function getType(typeId, tab, componentName) {
    const typeLabel = await Type.findById(colorId, 'label');
    if(componentName === 'dial') {
        tab.dial.type[typeLabel] += 1;
    } else {
        tab.bracelet.type[typeLabel] += 1;
    }
    return tab;
}

async function getWidth(braceletId, tab) {
    const widthId = await Bracelet.findById(braceletId, 'widthId');
    const widthLabel = await Width.findById(widthId, 'label');
    tab.bracelet.width[widthLabel] += 1;
    return tab;
}

async function getMaterial(braceletId, tab) {
    const materialId = await Bracelet.findById(materialId, 'materialId');
    const materialLabel = await Material.findById(materialId, 'label');
    tab.bracelet.material[materialLabel] += 1;
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
    const housingColor = defineColorScore(likes.housing.color, dislikes.housing.color);
    const dialColor = defineColorScore(likes.dial.color, dislikes.dial.color);
    const dialType = defineTypeScore(likes.dial.type, dislikes.dial.type);
    const braceletColor = defineColorScore(likes.bracelet.color, dislikes.bracelet.color);
    const braceletType = defineTypeScore(likes.bracelet.type, dislikes.bracelet.type);
    const braceletWidth = defineWidthScore(likes.bracelet.width, dislikes.bracelet.width);
    const braceletMaterial = defineMaterialScore(likes.bracelet.material, dislikes.bracelet.material);
    let patterns = {};
    patterns.dial = Pattern.find({mainColor})
}

function defineColorScore(tLikes, tDislikes) {
    const colorsList = ColorController.getAllT();
    let totalLikes = tLikes.reduce((acc, curr) => acc + curr);
    let totalDislikes = tDislikes.reduce((acc, curr) => acc + curr);
    if(totalLikes == 0) totalLikes = 1;
    if(totalDislikes == 0) totalDislikes = 1;
    let ratios = [];
    let i = 0;
    colorsList.forEach(c => {
        ratios[i++] = {
            value: ((tLikes[c] * 100) / totalLikes) - ((tDislikes[c] * 100) / totalDislikes),
            color: c
        }
    });
    ratios.sort((a, b) => a.value - b.value);
    let colorsQuery = [ratios[0].color, ratios[1].color];
    i = undefined;
    while(i === undefined) {
        let rand = Math.floor(Math.random() * Math.floor(colorsList.length));
        i = colorsQuery.find(el => {
            return el === colorsList[rand];
        });
    }
    colorsQuery.push(colorsList[rand]);
    return colorsQuery;
}

function defineTypeScore(tLikes, tDislikes) {
    const typesList = TypeController.getAllT();
    let totalLikes = tLikes.reduce((acc, curr) => acc + curr);
    let totalDislikes = tDislikes.reduce((acc, curr) => acc + curr);
    if(totalLikes == 0) totalLikes = 1;
    if(totalDislikes == 0) totalDislikes = 1;
    let ratios = [];
    let i = 0;
    typesList.forEach(t => {
        ratios[i++] = {
            value: ((tLikes[t] * 100) / totalLikes) - ((tDislikes[t] * 100) / totalDislikes),
            type: t
        }
    });
    ratios.sort((a, b) => a.value - b.value);
    let typesQuery = [ratios[0].type, ratios[1].type];
    i = undefined;
    while(i === undefined) {
        let rand = Math.floor(Math.random() * Math.floor(typesList.length));
        i = typesQuery.find(el => {
            return el === typesList[rand];
        });
    }
    typesQuery.push(typesList[rand]);
    return typesQuery;
}

function defineWidthScore(tLikes, tDislikes) {
    const widthsList = WidthController.getAllT();
    let totalLikes = tLikes.reduce((acc, curr) => acc + curr);
    let totalDislikes = tDislikes.reduce((acc, curr) => acc + curr);
    if(totalLikes == 0) totalLikes = 1;
    if(totalDislikes == 0) totalDislikes = 1;
    let ratios = [];
    let i = 0;
    widthsList.forEach(w => {
        ratios[i++] = {
            value: ((tLikes[w] * 100) / totalLikes) - ((tDislikes[w] * 100) / totalDislikes),
            width: w
        }
    });
    ratios.sort((a, b) => a.value - b.value);
    let widthsQuery = [ratios[0].width, ratios[1].width];
    i = undefined;
    while(i === undefined) {
        let rand = Math.floor(Math.random() * Math.floor(widthsList.length));
        i = widthsQuery.find(el => {
            return el === widthsList[rand];
        });
    }
    widthsQuery.push(widthsList[rand]);
    return widthsQuery;
}

function defineMaterialScore(tLikes, tDislikes) {
    const materialsList = MaterialController.getAllT();
    let totalLikes = tLikes.reduce((acc, curr) => acc + curr);
    let totalDislikes = tDislikes.reduce((acc, curr) => acc + curr);
    if(totalLikes == 0) totalLikes = 1;
    if(totalDislikes == 0) totalDislikes = 1;
    let ratios = [];
    let i = 0;
    materialsList.forEach(m => {
        ratios[i++] = {
            value: ((tLikes[m] * 100) / totalLikes) - ((tDislikes[m] * 100) / totalDislikes),
            material: m
        }
    });
    ratios.sort((a, b) => a.value - b.value);
    let materialsQuery = [ratios[0].material, ratios[1].material];
    i = undefined;
    while(i === undefined) {
        let rand = Math.floor(Math.random() * Math.floor(materialsList.length));
        i = materialsQuery.find(el => {
            return el === materialsList[rand];
        });
    }
    materialsQuery.push(materialsList[rand]);
    return materialsQuery;
}
