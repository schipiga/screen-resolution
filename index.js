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
 * @arg {boolean} [cache=true] - Flag to cache result.
 * @return {object} - Dictionary with keys `width` & `height`.
 */
module.exports.get = cache => {
    cache = cache === false ? false : true;
    if (cache && !_.isEmpty(resolution)) return Promise.resolve(resolution);
    var screenPath = temp.path({suffix: ".png"});
    return new Promise((resolve, reject) => {
        screenshot(screenPath, err => {
            if (err) reject(err);
            fs
                .createReadStream(screenPath)
                .pipe(new PNG())
                .on("parsed", function() {
                    var result = { width: this.width, height: this.height };
                    if (cache) resolution = result;
                    resolve(result);
                })
                .on("error", reject);
        });
    });
};
/**
 * Clears cached result.
 *
 * @function
 */
module.exports.clear = () => { resolution = {} };
