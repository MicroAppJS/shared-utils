'use strict';

const chalk = require('chalk');
const inquirer = require('inquirer');
const logger = require('../logger');
const npmlog = logger.npmlog;

const SCOPE_NAME = require('../constants').SCOPE_NAME || '@micro-app';
const prefix = `[${chalk.green('?')}] ${chalk.bgBlack(chalk.whiteBright(SCOPE_NAME))}`;

function createDefaultOptions(options = {}) {
    return Object.assign({
        prefix,
    }, options);
}

function confirm(message) {
    npmlog.pause();

    return inquirer
        .prompt([
            createDefaultOptions({
                type: 'expand',
                name: 'confirm',
                message,
                default: 2, // default to help in order to avoid clicking straight through
                choices: [
                    { key: 'y', name: 'Yes', value: true },
                    { key: 'n', name: 'No', value: false },
                ],
            }),
        ])
        .then(answers => {
            npmlog.resume();

            return answers.confirm;
        });
}

function select(message, { choices, filter, validate } = {}) {
    if (!choices || choices.length <= 0) {
        logger.throw('prompt', 'select choices is empty!');
    }

    npmlog.pause();

    return inquirer
        .prompt([
            createDefaultOptions({
                type: 'list',
                name: 'prompt',
                message,
                choices,
                pageSize: choices.length,
                filter,
                validate,
            }),
        ])
        .then(answers => {
            npmlog.resume();

            return answers.prompt;
        });
}

function input(message, { filter, validate } = {}) {
    npmlog.pause();

    return inquirer
        .prompt([
            createDefaultOptions({
                type: 'input',
                name: 'input',
                message,
                filter,
                validate,
            }),
        ])
        .then(answers => {
            npmlog.resume();

            return answers.input;
        });
}

exports.confirm = confirm;
exports.select = select;
exports.input = input;
