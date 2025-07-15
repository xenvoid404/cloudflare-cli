import boxen from 'boxen';
import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';

import { colors } from '../utils/colors.js';
import { pause } from '../utils/pause.js';

export const showConfigMenu = async () => {
    const box = boxen(chalk.hex(colors.purple)('CONFIGURATION MENU'), {
        borderColors: colors.purple,
        width: 53
    });
    console.log(box);

    const { configMenu } = await inquirer.prompt([
        {
            type: 'rawlist',
            name: 'configMenu',
            message: chalk.cyan('Chose option (input number):'),
            choices: [
                { name: chalk.hex(colors.green)('LIST PROFILES'), value: 'list_profile' },
                { name: chalk.hex(colors.green)('ADD CONFIGURATION'), value: 'add_configuration' },
                { name: chalk.hex(colors.green)('DELETE CONFIGURATION'), value: 'delete_configuration' },
                { name: chalk.hex(colors.green)('CHANGE PROFILE'), value: 'change_profile' },
                { name: chalk.hex(colors.green)('CHANGE ZONE'), value: 'change_zone' },
                { name: chalk.cyan('BACK'), value: 'back' },
                { name: chalk.hex(colors.pink)('EXIT'), value: 'exit' }
            ],
            pageSize: 8
        }
    ]);

    switch (configMenu) {
        case 'list_profile':
            console.log(chalk.hex(colors.yellow)('\n>> LIST PROFILES CONFIGURATION...'));
            break;
        case 'add_configuration':
            console.log(chalk.hex(colors.yellow)('\n>> ADDING CONFIGURATION...'));
            break;
        case 'delete_configuration':
            console.log(chalk.hex(colors.yellow)('\n>> DELETING CONFIGURATION...'));
            break;
        case 'change_profile':
            console.log(chalk.hex(colors.yellow)('\n>> CHANGE PROFILE CONFIGURATION...'));
            break;
        case 'change_zone':
            console.log(chalk.hex(colors.yellow)('\n>> CHANGE ZONE FROM YOUR ACTIVE PROFILE...'));
            break;
        case 'back':
            return 'back';
        case 'exit':
            const goodbye = chalkAnimation.neon('\nTERMINATING SESSION... GOODBYE!');
            await new Promise(resolve => setTimeout(resolve, 2000));
            goodbye.stop();
            return 'exit';
    }

    await pause();
    return true;
};
