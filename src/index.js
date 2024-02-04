import readline from 'readline/promises';
import os from 'os';
import path from 'path';
import './utils/capitalize.js';
import { parseUserName } from './services/parseArgs.js';
import { changeDirectory, listDirectoryContents, upDirectory } from './services/directoryManager.js';
import { createFile, filePrint, renameFile } from './services/fileManager.js';


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

    switch (command) {
      case 'cd':
        workingDirectory = await changeDirectory(workingDirectory, argument);
        break;
      case 'up':
        workingDirectory = upDirectory(workingDirectory);
        break;
      case 'ls':
        await listDirectoryContents(workingDirectory);
        break;
      case 'cat':
        await filePrint(workingDirectory, argument);
        break;
      case 'add':
        await createFile(workingDirectory, argument);
        break;
      case 'rn':
        await renameFile(workingDirectory, argument, argSecond);
        break;
      case 'exit':
        rl.close();
        break;
      default:
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
