import boxen from 'boxen';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import Table from 'cli-table3';
import inquirer from 'inquirer';
import gradient from 'gradient-string';

import { colors } from '../utils/colors.js';
import { pause } from '../utils/pause.js';
import { showConfigMenu } from './config-menu.js';
import { showManageDnsMenu } from './manage-dns-menu.js';
import { showManageDomainWorkersMenu } from './manage-domain-workers.js';

export const showInfo = async () => {
    console.log(chalk.hex(colors.orange)('\n⚡ CLOUDFLARE MANAGEMENT CLI ⚡'));

    const infoText =
        `${chalk.hex(colors.green).bold('>>')} ${chalk.hex(colors.blue)('Author:')} ${chalk.hex(colors.pink)('Xenvoid 404')}\n` +
        `${chalk.hex(colors.green).bold('>>')} ${chalk.hex(colors.blue)('Version:')} ${chalk.hex(colors.pink)('v1.0.0')}\n` +
        `${chalk.hex(colors.green).bold('>>')} ${chalk.hex(colors.blue)('Github:')} ${chalk.hex(colors.purple)('https://github.com/xenvoid404')}`;

    const box = boxen(infoText, {
        padding: 1,
        width: 53,
        borderStyle: 'double',
        borderColor: colors.blue,
        backgroundColor: '#0d0221',
        dimBorder: true
    });

    console.log(box);
};

export const showAccountTable = () => {
    const table = new Table({
        head: [chalk.hex(colors.blue).bold('KEY'), chalk.hex(colors.pink)('VALUE')],
        colWidths: [20, 30],
        style: {
            head: ['hex(colors.blue)'],
            border: ['hex(colors.pink)'],
            compact: false
        }
    });

    table.push(
        [chalk.hex(colors.green)('Email'), chalk.hex(colors.yellow)('email@example.com')],
        [chalk.hex(colors.green)('API Key'), chalk.hex(colors.yellow)('your_api_key')],
        [chalk.hex(colors.green)('Account ID'), chalk.hex(colors.yellow)('your_account_id')],
        [chalk.hex(colors.green)('Zone ID'), chalk.hex(colors.yellow)('your_zone_id')],
        [chalk.hex(colors.green)('Zone Name'), chalk.hex(colors.yellow)('your_zone_id')]
    );

    console.log(chalk.hex(colors.blue).bold('\n>> ACCOUNT INFORMATION <<'));
    console.log(table.toString());
};

export const showMainMenu = async () => {
    const box = boxen(chalk.hex(colors.purple)('MAIN MENU'), {
        borderColor: colors.purple,
        width: 53
    });
    console.log(box);

    const { mainMenu } = await inquirer.prompt([
        {
            type: 'rawlist',
            name: 'mainMenu',
            message: chalk.cyan('Chose action (Input number):'),
            choices: [
                { name: chalk.hex(colors.green)('Configuration'), value: 'config' },
                { name: chalk.hex(colors.green)('Manage DNS'), value: 'manage_dns' },
                { name: chalk.hex(colors.green)('Manage Domain Workers'), value: 'manage_domain_workers' },
                { name: chalk.hex(colors.pink)('EXIT'), value: 'exit' }
            ],
            pageSize: 8
        }
    ]);

    let shouldContinue = true;
    switch (mainMenu) {
        case 'config':
            while (shouldContinue) {
                console.clear();
                await showInfo();
                console.log('');
                const configResult = await showConfigMenu();

                if (configResult === 'back') {
                    shouldContinue = false;
                } else if (configResult === 'exit') {
                    return false;
                }
            }
            break;
        case 'manage_dns':
            while (shouldContinue) {
                console.clear();
                await showInfo();
                console.log('');
                const result = await showManageDnsMenu();

                if (result === 'back') {
                    shouldContinue = false;
                } else if (result === 'exit') {
                    return false;
                }
            }
            break;
        case 'manage_domain_workers':
            while (shouldContinue) {
                console.clear();
                await showInfo();
                console.log('');
                const result = await showManageDomainWorkersMenu();

                if (result === 'back') {
                    shouldContinue = false;
                } else if (result === 'exit') {
                    return false;
                }
            }
            break;
        case 'exit':
            const goodbye = chalkAnimation.neon('\nTERMINATING SESSION... GOODBYE!');
            await new Promise(resolve => setTimeout(resolve, 2000));
            goodbye.stop();
            return false;
    }

    await pause();
    return true;
};
