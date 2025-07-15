import inquirer from 'inquirer';
import chalk from 'chalk';

export const pause = async () => {
    await inquirer.prompt([
        {
            type: 'input',
            name: 'pause',
            message: chalk.gray('Press [ENTER] for return')
        }
    ]);
};
