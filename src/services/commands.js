
import { changeDirectory, listDirectoryContents, upDirectory } from './directoryManager.js';
import { copyFile, createFile, createDirectory, deleteFile, filePrint, moveFile, renameFile } from './fileManager.js';
import { osManager } from './osManager.js';
import { printHash } from './hashManager.js';
import { compressFile, decompressFile } from './compressManager.js';

export const commands = {
  'cd': changeDirectory,
  'up': upDirectory,
  'ls': listDirectoryContents,
  'cat': filePrint,
  'add': createFile,
  'mkdir': createDirectory,
  'rn': renameFile,
  'cp': copyFile,
  'mv': moveFile,
  'rm': deleteFile,
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
};
