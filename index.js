'use strict';

function defineProperty(key, from, to = exports) {
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
    'prompt',
    'smartMerge',
    'virtualFile',
    'openBrowser',
    'Env',
    'validateSchema',
    'pluginResolution',
].reduce((obj, key) => {
    obj[key] = `./src/${key}`;
    return obj;
}, {});

// special
internal.CONSTANTS = './src/constants';

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
    inquirer: 'inquirer',
    execa: 'execa',
    yParser: 'yargs-parser',
    yUnParser: 'yargs-unparser',
    debug: 'debug',
    importFresh: 'import-fresh',
    shell: 'shelljs',
    onExit: 'signal-exit',
    hash: 'hash-sum',
    path: 'path',
    isDocker: 'is-docker',
    UUID: 'uuid',
};

Object.keys(thirdParty).forEach(key => {
    defineProperty(key, thirdParty);
});


// ********************

const alias = {
    assert: () => {
        return exports.logger.assert.bind(exports.logger);
    },
};

Object.keys(alias).forEach(key => {
    if (exports[key]) throw new Error(`"${key}" already exsits!`);
    Object.defineProperty(exports, key, {
        get: alias[key],
    });
});
