"use strict";
/**
 * @module
 */

var fs = require("fs");

var _ = require("lodash");
var PNG = require('pngjs').PNG;
var screenshot = require("desktop-screenshot");
var temp = require("temp");
/**
 * Screen resolution.
 *
 * @type {object}
 */
var resolution = {};
/**
 * Gets screen resolution.
 *
 * @function
 * @async
 * @return {object} - Dictionary with keys `width` & `height`.
 */
module.exports.get = () => {
    if (!_.isEmpty(resolution)) return Promise.resolve(resolution);

    var screenPath = temp.path({suffix: ".png"});

    return new Promise((resolve, reject) => {
        screenshot(screenPath, err => {
            if (err) reject(err);
            fs
                .createReadStream(screenPath)
                .pipe(new PNG())
                .on("parsed", function() {
                    resolution.width = this.width;
                    resolution.height = this.height;
                    resolve(resolution);
                })
                .on("error", reject);
        });
    });
};
