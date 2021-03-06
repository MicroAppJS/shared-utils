'use strict';

const output = {};

function defineProperty(key, from, to = output) {
    if (to[key]) throw new Error(`"${key}" already exsits!`);
    // lazy
    Object.defineProperty(to, key, {
        get() {
            return require(from[key]);
        },
    });
}

const internal = [
    'moduleAlias',
    'getPadLength',
    'injectHtml',
    'loadFile',
    'logger',
    'smartMerge',
    'virtualFile',
    'openBrowser',
    'Env',
    'validateSchema',
].reduce((obj, key) => {
    obj[key] = `./src/${key}`;
    return obj;
}, {});

Object.keys(internal).forEach(key => {
    defineProperty(key, internal);
});

const thirdParty = {
    fs: 'fs-extra',
    chalk: 'chalk',
    cheerio: 'cheerio',
    semver: 'semver',
    semverRegex: 'semver-regex',
    _: 'lodash',
    tryRequire: 'try-require',
    ora: 'ora',
    dedent: 'dedent',
    globby: 'globby',
    globParent: 'glob-parent',
    isGlob: 'is-glob',
    npa: 'npm-package-arg',
    parseGitUrl: 'git-url-parse',
    multimatch: 'multimatch',
    stringifyObject: 'stringify-object',
    LRU: 'lru-cache',
};

Object.keys(thirdParty).forEach(key => {
    defineProperty(key, thirdParty);
});


// ********************

const alias = {
    assert: () => {
        return output.logger.assert.bind(output.logger);
    },
};

Object.keys(alias).forEach(key => {
    if (output[key]) throw new Error(`"${key}" already exsits!`);
    Object.defineProperty(output, key, {
        get: alias[key],
    });
});

module.exports = output;
