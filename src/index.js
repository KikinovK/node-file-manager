import { createInterface } from 'node:readline';
import { homedir } from 'node:os';

import './utils/capitalize.js';
import { parseUserName } from './services/parseArgs.js';
import { commands } from './services/commands.js';

const fileManager = async () => {

  let workingDirectory = homedir();

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const updatePrompt = (workingDirectory) => {
    rl.setPrompt(`You are currently in ${workingDirectory}\n> `);
    rl.prompt();
  }

  const args = process.argv.slice(2);
  const userName = parseUserName(args);

  if (!userName) {
    rl.output.write('Username not provided or invalid\n');
    process.exit(1);
  }

  rl.output.write(`Welcome to the File Manager, ${userName}\n\n`);

  updatePrompt(workingDirectory);

  rl.on('line', async (input) => {
    const args = input.trim().split(' ');

    const command = args[0].toLowerCase();
    const argument = args[1];
    const argSecond = args[2];

    if (command === '.exit') {
      rl.close();
      return;
    }

    const executeCommand = commands[command];

    if (executeCommand) {
      try {
        const result = await executeCommand({
          workingDirectory,
          argumentArray: args.slice(1),
        });
        if (result.workingDirectory) {
          workingDirectory = result.workingDirectory;
        }
        if (result.message) {
          rl.output.write(`${result.message}\n`);
        }
      } catch (error) {
        rl.output.write('Error occurred\n', error);
      }
    } else {
      rl.output.write('Unknown instruction\n');
    }

    updatePrompt(workingDirectory);
  });

  process.on('exit', () => {
    rl.output.write(`\nThank you for using File Manager, ${userName}, goodbye!\n`);
  });
};

fileManager();
