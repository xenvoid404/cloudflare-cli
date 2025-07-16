import chalk from 'chalk';
import boxen from 'boxen';
import { colors } from './colors.js';

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
