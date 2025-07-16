import axios from 'axios';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { db } from '../database/db.js';
import { colors } from '../utils/colors.js';
import { showInfo } from '../utils/show-info.js';
import { createMenuTitle } from '../utils/base-menu.js';
import { animationKaraoke } from '../utils/animation.js';

export const addConfiguration = async () => {
    try {
        console.clear();
        await showInfo();
        console.log('');
        console.log(createMenuTitle('ADD NEW PROFILE CONFIGURATION'));

        const { profileName, email, apiKey, accountId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'profileName',
                message: 'Profile Name (e.g. personal, work):',
                validate: input => (input.trim() ? true : chalk.hex(colors.pink)('Profilr name is required!'))
            },
            {
                type: 'input',
                name: 'email',
                message: 'Your Cloudflare Email:',
                validate: input => (input.trim() ? true : chalk.hex(colors.pink)('Email is required!'))
            },
            {
                type: 'input',
                name: 'apiKey',
                message: 'Your API Key:',
                validate: input => (input.trim() ? true : chalk.hex(colors.pink)('API Key is required!'))
            },
            {
                type: 'input',
                name: 'accountId',
                message: 'Your Account ID:',
                validate: input => (input.trim() ? true : chalk.hex(colors.pink)('Account ID is required!'))
            }
        ]);

        await animationKaraoke('\n>> Validating Cloudflare credentials...', 3000);

        const userResponse = await axios.get('https://api.cloudflare.com/client/v4/user', {
            headers: {
                'X-Auth-Email': email,
                'X-Auth-Key': apiKey,
                'Content-Type': 'application/json'
            }
        });

        if (!userResponse.data.success) {
            throw new Error('Invalid Cloudflare credentials. Check your Email or API Key.');
        } else {
            console.log(chalk.hex(colors.green)('>> Credentials is valid. continue...'));
        }

        await animationKaraoke('\n>> Fetching available zones...', 2500);

        const zonesResponse = await axios.get('https://api.cloudflare.com/client/v4/zones', {
            headers: {
                'X-Auth-Email': email,
                'X-Auth-Key': apiKey,
                'Content-Type': 'application/json'
            }
        });

        if (!zonesResponse.data.success || !zonesResponse.data.result.length) {
            throw new Error('No zones found for this account');
        } else {
            console.log(chalk.hex(colors.green)('>> Fetch successfully\n'));
        }

        const zones = zonesResponse.data.result.map(zone => ({
            name: `${zone.name} (${zone.id})`,
            value: { id: zone.id, name: zone.name }
        }));

        const { selectedZone } = await inquirer.prompt([
            {
                type: 'list',
                name: 'selectedZone',
                message: chalk.cyan('Select a zone:'),
                choices: zones,
                pageSize: 8
            }
        ]);

        await animationKaraoke('\n>> Saving configuration...', 2000);

        await db.read();

        const isDuplicate = db.data.configurations.some(
            config =>
                config.profile_name === profileName ||
                config.email === email ||
                config.api_key === apiKey ||
                config.account_id === accountId ||
                config.zone_id === selectedZone.id ||
                config.zone_name === selectedZone.name
        );

        if (isDuplicate) {
            throw new Error('Configuration already exists!');
        }

        db.data.configurations = db.data.configurations.map(config => ({
            ...config,
            status: false
        }));

        db.data.configurations.push({
            profile_name: profileName,
            email: email,
            api_key: apiKey,
            account_id: accountId,
            zone_id: selectedZone.id,
            zone_name: selectedZone.name,
            status: true
        });
        await db.write();

        console.log(chalk.hex(colors.green)('Configuration saved successfully!\n'));

        return true;
    } catch (error) {
        console.log(chalk.hex(colors.pink)('ERROR: ', error.message));
        console.log();

        return false;
    }
};
