import readline from 'readline';
import './utils/capitalize.js';
import { parseUserName } from './services/parseArgs.js';

const args = process.argv.slice(2);
const userName = parseUserName(args);

if (!userName) {
  console.error('Username not provided or invalid');
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`Welcome to the File Manager, ${userName} \n`, (command) => {
  if (command === 'exit') rl.close();
});


process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
});
