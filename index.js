import chalk from 'chalk';
import { showInfo } from './utils/show-info.js';
import { showConfiguration } from './utils/show-configuration.js';
import { showMainMenu } from './menus/main-menu.js';

// Main Run
const run = async () => {
    while (true) {
        console.clear();
        await showInfo();
        console.log('');
        showConfiguration();
        console.log('');

        if (!(await showMainMenu())) break;
    }
};

run();
