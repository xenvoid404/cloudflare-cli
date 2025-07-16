import boxen from 'boxen';
import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';

import { colors } from '../utils/colors.js';
import { pause } from '../utils/pause.js';

export const showManageDomainWorkersMenu = async () => {
    const box = boxen(chalk.hex(colors.purple)('MANAGE DOMAIN WORKERS'), {
        borderColors: colors.purple,
        width: 53
    });
    console.log(box);

    const { manageDomainWorkersMenu } = await inquirer.prompt([
        {
            type: 'rawlist',
            name: 'manageDomainWorkersMenu',
            message: chalk.cyan('Chose option (input number):'),
            choices: [
                new inquirer.Separator(chalk.hex(colors.orange)('=== Add Domain Workers ====')),
                { name: chalk.hex(colors.green)('Add Single Domain Worker'), value: 'add_single_domain_worker' },
                { name: chalk.hex(colors.green)('Add Multi Domain Worker From File'), value: 'add_multi_domain_worker_from_file' },
                new inquirer.Separator(chalk.hex(colors.orange)('=== Edit Domain Worker ===')),
                { name: chalk.hex(colors.green)('Edit Single Domain Worker'), value: 'edit_single_domain_worker' },
                { name: chalk.hex(colors.green)('Edit Multi Domain Worker From File'), value: 'edit_multi_domain_worker_from_file' },
                new inquirer.Separator(chalk.hex(colors.orange)('=== Edit Domain Worker ===')),
                { name: chalk.hex(colors.green)('Delete Single Domain Worker'), value: 'delete_single_domain_worker' },
                { name: chalk.hex(colors.green)('Delete Multi Domain Worker From File'), value: 'delete_multi_domain_worker_from_file' },
                new inquirer.Separator(chalk.hex(colors.orange)('=== Get Domain Worker ===')),
                { name: chalk.hex(colors.green)('Get and Save Domain Worker to File'), value: 'get_and_save_domain_worker_to_file' },
                new inquirer.Separator(chalk.hex(colors.orange)('===================')),
                { name: chalk.cyan('BACK'), value: 'back' },
                { name: chalk.hex(colors.pink)('EXIT'), value: 'exit' }
            ],
            pageSize: 8
        }
    ]);

    switch (manageDomainWorkersMenu) {
        case 'add_single_domain_worker':
            console.log(chalk.hex(colors.yellow)('\n>> ADDING SINGLE DOMAIN WORKERS...'));
            break;
        case 'add_multi_domain_worker_from_file':
            console.log(chalk.hex(colors.yellow)('\n>> ADDING DOMAIN WORKERS FROM FILE...'));
            break;
        case 'edit_single_domain_worker':
            console.log(chalk.hex(colors.yellow)('\n>> EDITING DOMAIN WORKERS RECORDS...'));
            break;
        case 'edit_multi_domain_worker_from_file':
            console.log(chalk.hex(colors.yellow)('\n>> EDITING MULTI DOMAIN WORKERS FROM FILE...'));
            break;
        case 'delete_single_domain_worker':
            console.log(chalk.hex(colors.yellow)('\n>> DELETING SINGLE DOMAIN WORKERS...'));
            break;
        case 'delete_multi_domain_worker_from_file':
            console.log(chalk.hex(colors.yellow)('\n>> DELETING MULTI DOMAIN WORKERS FROM FILE...'));
            break;
        case 'get_and_save_domain_worker_to_file':
            console.log(chalk.hex(colors.yellow)('\n>> GETTING DOMAIN WORKERS AND SAVE TO FILE...'));
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
