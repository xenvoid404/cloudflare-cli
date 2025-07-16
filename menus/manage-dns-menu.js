import boxen from 'boxen';
import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';

import { colors } from '../utils/colors.js';
import { pause } from '../utils/pause.js';

export const showManageDnsMenu = async () => {
    const box = boxen(chalk.hex(colors.purple)('MANAGE DNS MENU'), {
        borderColors: colors.purple,
        width: 53
    });
    console.log(box);

    const { manageDnsMenu } = await inquirer.prompt([
        {
            type: 'rawlist',
            name: 'manageDnsMenu',
            message: chalk.cyan('Chose option (input number):'),
            choices: [
                new inquirer.Separator(chalk.hex(colors.orange)('=== Add Records ====')),
                { name: chalk.hex(colors.green)('Add Single Records'), value: 'add_single_records' },
                { name: chalk.hex(colors.green)('Add Multi Records From File'), value: 'add_multi_records_from_file' },
                new inquirer.Separator(chalk.hex(colors.orange)('=== Edit Records ===')),
                { name: chalk.hex(colors.green)('Edit Single Records'), value: 'edit_single_records' },
                { name: chalk.hex(colors.green)('Edit Multi Records From File'), value: 'edit_multi_records_from_file' },
                new inquirer.Separator(chalk.hex(colors.orange)('=== Edit Records ===')),
                { name: chalk.hex(colors.green)('Delete Single Records'), value: 'delete_single_records' },
                { name: chalk.hex(colors.green)('Delete Multi Records From File'), value: 'delete_multi_records_from_file' },
                new inquirer.Separator(chalk.hex(colors.orange)('=== Get Records ===')),
                { name: chalk.hex(colors.green)('Get and Save Records to File'), value: 'get_and_save_records_to_file' },
                new inquirer.Separator(chalk.hex(colors.orange)('===================')),
                { name: chalk.cyan('BACK'), value: 'back' },
                { name: chalk.hex(colors.pink)('EXIT'), value: 'exit' }
            ],
            pageSize: 8
        }
    ]);

    switch (manageDnsMenu) {
        case 'add_single_records':
            console.log(chalk.hex(colors.yellow)('\n>> ADDING SINGLE RECORDS...'));
            break;
        case 'add_multi_records_from_file':
            console.log(chalk.hex(colors.yellow)('\n>> ADDING RECORDS FROM FILE...'));
            break;
        case 'edit_single_records':
            console.log(chalk.hex(colors.yellow)('\n>> EDITING SINGLE RECORDS...'));
            break;
        case 'edit_multi_records_from_file':
            console.log(chalk.hex(colors.yellow)('\n>> EDITING MULTI RECORDS FROM FILE...'));
            break;
        case 'delete_single_records':
            console.log(chalk.hex(colors.yellow)('\n>> DELETING SINGLE RECORDS...'));
            break;
        case 'delete_multi_records_from_file':
            console.log(chalk.hex(colors.yellow)('\n>> DELETING MULTI RECORDS FROM FILE...'));
            break;
        case 'get_and_save_records_to_file':
            console.log(chalk.hex(colors.yellow)('\n>> GETTING RECORDS AND SAVE TO FILE...'));
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
