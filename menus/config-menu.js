import chalk from 'chalk';
import inquirer from 'inquirer';
import { createMenuTitle, createMenuList, createMenuSeparator, handleExit } from '../utils/base-menu.js';
import { colors } from '../utils/colors.js';
import { pause } from '../utils/pause.js';

const CONFIG_MENU_OPTIONS = [
    createMenuSeparator('Configuration Options'),
    { name: 'List Profiles', value: 'list_profiles' },
    { name: 'Add Configuration', value: 'add_configuration' },
    { name: 'Delete Configuration', value: 'delete_configuration' },
    { name: 'Change Profile', value: 'change_profile' },
    { name: 'Change Zone', value: 'change_zone' },
    createMenuSeparator('Navigation'),
    { name: 'Back', value: 'back' },
    { name: 'Exit', value: 'exit' }
];

const CONFIG_ACTIONS = {
    list_profiles: 'LIST PROFILES CONFIGURATION...',
    add_configuration: 'ADDING CONFIGURATION',
    delete_configuration: 'DELETING CONFIGURATION...',
    change_profile: 'CHANGING PROFILE...',
    change_zone: 'CHANGING ZONE FROM YOUR ACTIVE CONFIGURATION...'
};

export const showConfigMenu = async () => {
    console.log(createMenuTitle('CONFIGURATION MENU'));

    const { selectedOption } = await createMenuList(
        'Chose option (input number):',
        CONFIG_MENU_OPTIONS.map(option => {
            if (option instanceof inquirer.Separator) return option;
            return {
                ...option,
                name:
                    option.value === 'back'
                        ? chalk.cyan(option.name)
                        : option.value === 'exit'
                        ? chalk.hex(colors.pink)(option.name)
                        : chalk.hex(colors.green)(option.name)
            };
        })
    );

    if (selectedOption === 'back') return 'back';
    if (selectedOption === 'exit') return await handleExit();

    console.log(chalk.hex(colors.yellow)(`\n>> ${CONFIG_ACTIONS[selectedOption]}...`));
    await pause();
    return true;
};
