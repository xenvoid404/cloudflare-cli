import chalk from 'chalk';
import inquirer from 'inquirer';
import { createMenuTitle, createMenuList, createMenuSeparator, handleExit } from '../utils/base-menu.js';
import { colors } from '../utils/colors.js';
import { pause } from '../utils/pause.js';

const DNS_MENU_OPTIONS = [
    createMenuSeparator('Add Records'),
    { name: 'Add Single Records', value: 'add_single_records' },
    { name: 'Add Multi Records From File', value: 'add_multi_records_from_file' },
    createMenuSeparator('Edit Records'),
    { name: 'Edit Single Records', value: 'edit_single_records' },
    { name: 'Edit Multi Records From File', value: 'edit_multi_records_from_file' },
    createMenuSeparator('Edit Records'),
    { name: 'Delete Single Records', value: 'delete_single_records' },
    { name: 'Delete Multi Records From File', value: 'delete_multi_records_from_file' },
    createMenuSeparator('Get Records'),
    { name: 'Get and Save Records to File', value: 'get_and_save_records_to_file' },
    createMenuSeparator('Navigation'),
    { name: 'Back', value: 'back' },
    { name: 'Exit', value: 'exit' }
];

const DNS_ACTIONS = {
    add_single_records: 'ADDING SINGLE RECORD...',
    add_multi_records_from_file: 'ADDING MULTIPLE RECORDS FROM FILE',
    edit_single_records: 'EDITING SINGLE RECORD...',
    edit_multi_records_from_file: 'EDITING MULTIPLE RECORDS FROM FILE...',
    delete_single_records: 'DELETING SINGLE RECORD...',
    delete_multi_records_from_file: 'DELETING MULTIPLE RECORDS FROM FILE...',
    get_and_save_records_to_file: 'GETTING RECORDS AND SAVE TO FILE...'
};

export const showManageDnsMenu = async () => {
    console.log(createMenuTitle('MANAGE DNS MENU'));

    const { selectedOption } = await createMenuList(
        'Chose option (input number):',
        DNS_MENU_OPTIONS.map(option => {
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

    console.log(chalk.hex(colors.yellow)(`\n>> ${DNS_ACTIONS[selectedOption]}...`));
    await pause();
    return true;
};
