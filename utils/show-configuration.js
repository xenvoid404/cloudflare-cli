import chalk from 'chalk';
import boxen from 'boxen';
import { colors } from './colors.js';
import { db } from '../database/db.js';

export const showConfiguration = async () => {
    console.log(chalk.hex(colors.blue).bold('\n>> CONFIGURATION <<'));

    await db.read();
    const activeConfig = db.data.configurations.find(config => config.status === true);

    let infoText;

    if (!activeConfig) {
        infoText = `${chalk.hex(colors.pink)('No active configuration found! Please add one first.')}`;
    } else {
        infoText =
            `${chalk.hex(colors.pink).bold('>>')} ${chalk.hex(colors.green)('Profile:')} ${chalk.hex(colors.orange)(activeConfig.profile_name)}\n` +
            `${chalk.hex(colors.pink).bold('>>')} ${chalk.hex(colors.green)('Email:')} ${chalk.hex(colors.orange)(activeConfig.email)}\n` +
            `${chalk.hex(colors.pink).bold('>>')} ${chalk.hex(colors.green)('API Key:')} ${chalk.hex(colors.orange)(activeConfig.api_key)}\n` +
            `${chalk.hex(colors.pink).bold('>>')} ${chalk.hex(colors.green)('Account ID:')} ${chalk.hex(colors.orange)(activeConfig.account_id)}\n` +
            `${chalk.hex(colors.pink).bold('>>')} ${chalk.hex(colors.green)('Zone ID:')} ${chalk.hex(colors.orange)(activeConfig.zone_id)}\n` +
            `${chalk.hex(colors.pink).bold('>>')} ${chalk.hex(colors.green)('Zone Name:')} ${chalk.hex(colors.orange)(activeConfig.zone_name)}`;
    }

    const box = boxen(infoText, {
        padding: 1,
        width: 53,
        borderStyle: 'double',
        borderColor: activeConfig ? colors.blue : colors.pink, // Warna berbeda jika error
        backgroundColor: '#0d0221',
        dimBorder: true
    });

    console.log(box);
};
