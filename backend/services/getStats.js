'use strict';

const ColorController = require('../controllers/color');
const WidthController = require('../controllers/width');
const TypeController = require('../controllers/type');
const MaterialController = require('../controllers/material');
const BuildTab = require("./getNextMatch").buildTabs;
const Match = require("../controllers/match");

let statistics = {
    /*bracelet: {
        colors: {
            red: 19,
            ...
        },
        types: {
            full: 1,
            hashed: ...
        },
        materials: {
            iron: 13,
            silver: 15
        },
        widths: {
            15: 2,
            24: 9
        }
    },
    housing: {
        color: {

        }
    }
    */
};

exports.getStats = async (req, res) => {
    await initTabs();
    let matches = await Match.getAllMatchesFunc();
    for(let match of matches) {
        statistics = await BuildTab(match, statistics);
        console.log("\n\n============================= Final :\n" + JSON.stringify(statistics) + "\n=====================================\n\n")
    };
    console.log("\n\n============================= Final 2 :\n" + JSON.stringify(statistics) + "\n=====================================\n\n")
    return res.status(200).json(statistics);
}

async function initTabs() {
    const colors = await ColorController.getAllT();
    const types = await TypeController.getAllT();
    const materials = await MaterialController.getAllT();
    const widths = await WidthController.getAllT();
    statistics = {
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
        statistics.housing.color[c.label] = 0;
        statistics.bracelet.color[c.label] = 0;
        statistics.dial.color[c.label] = 0;
        
    });
    types.forEach(t => {
        statistics.bracelet.type[t] = 0;
        statistics.dial.type[t] = 0;
    });
    materials.forEach(m => {
        statistics.bracelet.material[m] = 0;
    });
    widths.forEach(w => {
        statistics.bracelet.width[w] = 0;
    });
}