import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import { createMenuTitle, createMenuList, createMenuSeparator, handleExit } from '../utils/base-menu.js';
import { colors } from '../utils/colors.js';
import { pause } from '../utils/pause.js';

const DOMAIN_WORKERS_OPTIONS = [
    createMenuSeparator('Add Domain Workers'),
    { name: 'Add Single Domain Worker', value: 'add_single_domain_worker' },
    { name: 'Add Multi Domain Worker From File', value: 'add_multi_domain_worker_from_file' },
    createMenuSeparator('Edit Domain Worker'),
    { name: 'Edit Single Domain Worker', value: 'edit_single_domain_worker' },
    { name: 'Edit Multi Domain Worker From File', value: 'edit_multi_domain_worker_from_file' },
    createMenuSeparator('Edit Domain Worker'),
    { name: 'Delete Single Domain Worker', value: 'delete_single_domain_worker' },
    { name: 'Delete Multi Domain Worker From File', value: 'delete_multi_domain_worker_from_file' },
    createMenuSeparator('Get Domain Worker'),
    { name: 'Get and Save Domain Worker to File', value: 'get_and_save_domain_worker_to_file' },
    createMenuSeparator('Navigation'),
    { name: 'Back', value: 'back' },
    { name: 'Exit', value: 'exit' }
];

const DOMAIN_WORKERS_ACTIONS = {
    add_multi_records_from_file: 'ADDING SINGLE DOMAIN WORKER...',
    add_multi_records_from_file: 'ADDING MULTIPLE DOMAIN WORKERS FROM FILE',
    edit_single_domain_worker: 'EDITING SINGLE DOMAIN WORKER...',
    edit_multi_domain_worker_from_file: 'EDITING MULTIPLE DOMAIN WORKERS FROM FILE...',
    delete_single_domain_worker: 'DELETING SINGLE DOMAIN WORKER...',
    delete_multi_domain_worker_from_file: 'DELETING MULTIPLE DOMAIN WORKERS FROM FILE...',
    get_and_save_domain_worker_to_file: 'GETTING DOMAIN WORKER AND SAVE TO FILE...'
};

export const showManageDomainWorkersMenu = async () => {
    console.log(createMenuTitle('MANAGE DOMAIN WORKERS MENU'));

    const { selectedOption } = await createMenuList(
        'Chose option (input number):',
        DOMAIN_WORKERS_OPTIONS.map(option => {
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

    console.log(chalk.hex(colors.yellow)(`\n>> ${DOMAIN_WORKERS_ACTIONS[selectedOption]}...`));
    await pause();
    return true;
};
