
import { changeDirectory, listDirectoryContents, upDirectory } from './directoryManager.js';
import { copyFile, createFile, deleteFile, filePrint, moveFile, renameFile } from './fileManager.js';
import { osManager } from './osManager.js';
import { printHash } from './hashManager.js';
import { compressFile, decompressFile } from './compressManager.js';

export const commands = {
  'cd': async (workingDirectory, arg) => {
    return await changeDirectory(workingDirectory, arg);
  },
  'up': async (workingDirectory) => {
    return await upDirectory(workingDirectory);
  },
  'ls': async (workingDirectory) => {
    await listDirectoryContents(workingDirectory);
    return workingDirectory
  },
  'cat': async (workingDirectory, arg) => {
    await filePrint(workingDirectory, arg);
    return workingDirectory
  },
  'add': async (workingDirectory, arg) => {
    await createFile(workingDirectory, arg);
    return workingDirectory
  },
  'rn': async (workingDirectory, arg, arg2) => {
    await renameFile(workingDirectory, arg, arg2);
    return workingDirectory
  },
  'cp': async (workingDirectory, arg, arg2) => {
    await copyFile(workingDirectory, arg, arg2);
    return workingDirectory
  },
  'mv': async (workingDirectory, arg, arg2) => {
    await moveFile(workingDirectory, arg, arg2);
    return workingDirectory
  },
  'rm': async (workingDirectory, arg) => {
    await deleteFile(workingDirectory, arg);
    return workingDirectory
  },
  'os': (workingDirectory, arg) => {
    osManager(arg);
    return workingDirectory
  },
  'hash': async (workingDirectory, arg) => {
    await printHash(workingDirectory, arg);
    return workingDirectory
  },
  'compress': async (workingDirectory, arg, arg2) => {
    await compressFile(workingDirectory, arg, arg2);
    return workingDirectory
  },
  'decompress': async (workingDirectory, arg, arg2) => {
    await decompressFile(workingDirectory, arg, arg2);
    return workingDirectory
  },
  'exit': () => {
    rl.close();
  }
};
