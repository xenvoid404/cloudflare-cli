import chalk from 'chalk';
import { createMenuTitle, createMenuList, handleExit } from '../utils/base-menu.js';
import { showInfo } from '../utils/show-info.js';
import { colors } from '../utils/colors.js';
import { pause } from '../utils/pause.js';
import { showConfigMenu } from './config-menu.js';
import { showManageDnsMenu } from './manage-dns-menu.js';
import { showManageDomainWorkersMenu } from './manage-domain-workers.js';

const MENU_OPTIONS = [
    { name: 'Configuration', value: 'config' },
    { name: 'Manage DNS', value: 'manage_dns' },
    { name: 'Manage Domain Workers', value: 'manage_domain_workers' },
    { name: 'Exit', value: 'exit' }
];

const handleMenuSelection = async selection => {
    const menuHandlers = {
        config: showConfigMenu,
        manage_dns: showManageDnsMenu,
        manage_domain_workers: showManageDomainWorkersMenu
    };

    if (selection === 'exit') {
        await handleExit();
        return process.exit(0);
    }

    let shouldContinue = true;
    while (shouldContinue) {
        console.clear();
        await showInfo();
        console.log('');
        const result = await menuHandlers[selection]();

        if (result === 'back') {
            shouldContinue = false;
        } else if (result === 'exit') {
            process.exit(0);
        }
    }
    return true;
};

export const showMainMenu = async () => {
    console.log(createMenuTitle('MAIN MENU'));

    const { selectedOption } = await createMenuList(
        'Chose option (input number):',
        MENU_OPTIONS.map(option => ({
            ...option,
            name: option.value === 'exit' ? chalk.hex(colors.pink)(option.name) : chalk.hex(colors.green)(option.name)
        }))
    );

    return await handleMenuSelection(selectedOption);
};
