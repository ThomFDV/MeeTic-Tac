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
    initTabs();
    let matches = await Match.getAllMatchesFunc();
    matches.forEach(match => {
        statistics = BuildTab(match, statistics);
    });
    return res.status(200).json(statistics);
}

function initTabs() {
    const colors = ColorController.getAllT();
    const types = TypeController.getAllT();
    const materials = MaterialController.getAllT();
    const widths = WidthController.getAllT();
    colors.forEach(c => {
        statistics.housing.color[c] = 0;
        statistics.bracelet.color[c] = 0;
        statistics.dial.color[c] = 0;
        
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