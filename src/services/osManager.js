import os from 'os';

import { tableToString } from '../utils/tableToString.js';

const showEndOfLine = () => {
  const eol = os.EOL;
  return { message:`System end of line (EOL) character: ${JSON.stringify(eol)}\n`};
}
const showProcessors = () => {
  const cpus = os.cpus();
  return { message: `Information about host machine processors:\n${tableToString(cpus.map(cpu => ({ Model: cpu.model, Speed: cpu.speed })))}total: ${cpus.length}` };
}

const showHomeDirectory = () => {
  return { message: `Home directory: ${os.homedir()}`};
}

const showCurrentUser = () => {
  return { message: `Current system username: ${os.userInfo().username}` };
}

const showCpuArchitecture = () => {
  return { message: `CPU architecture for which Node.js is compiled: ${os.arch()}` };
}

const commands = {
  '--EOL': showEndOfLine,
  '--cpus': showProcessors,
  '--homedir': showHomeDirectory,
  '--username': showCurrentUser,
  '--architecture': showCpuArchitecture
};

export const osManager = ({ argumentArray: [argument] }) => {
  if (!argument) {
    return { message: 'The command must be specified' };
  }

  const command = commands[argument];
  if (command) {
    return command();
  } else {
    return { message: 'Unknown os command' };
  }
}
