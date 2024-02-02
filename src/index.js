const args = process.argv.slice(2);

const userName = args.filter(
  (arg) => arg.startsWith('--') &&
    arg.slice(2).startsWith('username')
)[0].split('=')[1];

console.log(`Welcome to the File Manager, ${userName[0].toUpperCase()}${userName.slice(1)}`);
