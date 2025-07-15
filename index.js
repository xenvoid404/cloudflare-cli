import chalk from 'chalk';
import { showInfo, showAccountTable, showMainMenu } from './menus/main-menu.js';

// Main Run
const run = async () => {
    while (true) {
        console.clear();
        await showInfo();
        console.log('');
        showAccountTable();
        console.log('');

        if (!(await showMainMenu())) break;
    }
};

run();
