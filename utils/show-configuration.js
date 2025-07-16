import Table from 'cli-table3';
import chalk from 'chalk';
import boxen from 'boxen';
import { colors } from './colors.js';

export const showConfiguration = () => {
    console.log(chalk.hex(colors.blue).bold('\n>> CONFIGURATION <<'));

    const infoText =
        `${chalk.hex(colors.pink).bold('>>')} ${chalk.hex(colors.green)('Email:')} ${chalk.hex(colors.orange)('email@example.com')}\n` +
        `${chalk.hex(colors.pink).bold('>>')} ${chalk.hex(colors.green)('API Key:')} ${chalk.hex(colors.orange)('your_api_key')}\n` +
        `${chalk.hex(colors.pink).bold('>>')} ${chalk.hex(colors.green)('Account ID:')} ${chalk.hex(colors.orange)('your_account_id')}\n` +
        `${chalk.hex(colors.pink).bold('>>')} ${chalk.hex(colors.green)('Zone ID:')} ${chalk.hex(colors.orange)('your_zone_id')}\n` +
        `${chalk.hex(colors.pink).bold('>>')} ${chalk.hex(colors.green)('Zone Name:')} ${chalk.hex(colors.orange)('your_zone_name')}`;
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
