import boxen from 'boxen';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';
import { colors } from './colors.js';
import { pause } from './pause.js';

export const createMenuTitle = (title, color = colors.purple, width = 53) => {
    return boxen(chalk.hex(color)(title), {
        borderColors: color,
        width: width
    });
};

export const createMenuList = async (message, choices) => {
    return await inquirer.prompt([
        {
            type: 'rawlist',
            name: 'selectedOption',
            message: chalk.cyan(message),
            choices: choices,
            pageSize: 8
        }
    ]);
};

export const handleExit = async () => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const terminate = chalkAnimation.karaoke('\nTERMINATING SESSION...');
    await sleep(2000);
    terminate.stop();

    const goodbye = chalkAnimation.neon('GOODBYE!\n');
    await sleep(2000);
    goodbye.stop();

    return 'exit';
};

export const createMenuSeparator = (title, color = colors.orange) => {
    return new inquirer.Separator(chalk.hex(color)(`=== ${title} ===`));
};
