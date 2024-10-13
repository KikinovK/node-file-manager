import readline from 'readline/promises';
import os from 'os';

import './utils/capitalize.js';
import { parseUserName } from './services/parseArgs.js';
import { commands } from './services/comands.js';

const fileManager = async () => {

  let workingDirectory = os.homedir();

  const printCurrentWorkingDirectory = () => {
    console.log(`You are currently in ${workingDirectory}`);
  }

  const args = process.argv.slice(2);
  const userName = parseUserName(args);

  if (!userName) {
    console.error('Username not provided or invalid');
    process.exit(1);
  }

  console.log(`Welcome to the File Manager, ${userName} \n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', async (input) => {
    const args = input.trim().split(' ');

    const command = args[0].toLowerCase();
    const argument = args[1];
    const argSecond = args[2];
    console.log('command', command);
    console.log('argument', argument);

    const executeCommand = commands[command];

    if (executeCommand) {
      workingDirectory = await executeCommand(workingDirectory, argument, argSecond);
    } else {
      console.log('Unknown instruction');
    }

    printCurrentWorkingDirectory();
    rl.prompt();
  });

  process.on('exit', () => {
    console.log(`\nThank you for using File Manager, ${userName}, goodbye!`);
  });

  printCurrentWorkingDirectory();

  rl.prompt();
}

fileManager();
