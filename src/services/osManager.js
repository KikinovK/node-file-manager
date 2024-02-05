import os from 'os';

export const osManager = (argument) => {
  if (!argument) {
    console.log('The command must be specified');
    return;
  }

  switch (argument) {
    case '--EOL':
      printEOL();
      break;
    case '--cpus':
      printCpus();
      break;
    case '--homedir':
      printHomedir();
      break;
    case '--username':
      printUsername();
      break;
    case '--architecture':
      printArchitecture();
      break;
    default:
      console.log('Unknown os command');
  }
}

const printEOL = () => {
  const eol = os.EOL;
  console.log('System end of line (EOL) character:', JSON.stringify(eol));
}

const printCpus = () => {
  const cpus = os.cpus();
  console.log('Information about host machine processors:');
  console.table(cpus.map(cpu => ({ 'Model': cpu.model, 'Speed': cpu.speed })));
  console.log(`Total number of processors: ${cpus.length}`);
}

const printHomedir = () => {
  const homeDirectory = os.homedir();
  console.log('Home directory:', homeDirectory);
}

const printUsername = () => {
  const userInfo = os.userInfo();
  console.log('Current system username:', userInfo.username);
}

const printArchitecture = () => {
  console.log('CPU architecture for which Node.js is compiled:', process.arch);
}
