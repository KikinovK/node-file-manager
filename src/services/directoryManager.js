import fsPromises from 'fs/promises';
import path from 'path';

import { tableToString } from '../utils/tableToString.js';

export const upDirectory = async ({ workingDirectory }) => {
  return {
    workingDirectory: path.resolve(workingDirectory, '..')
  };
}

export const changeDirectory = async ({ workingDirectory, argumentArray: [argument] }) => {
  if (!argument) {
    return {
      workingDirectory,
      message: 'You must specify the path to the directory\n',
    }
  }

  const newPath = path.resolve(workingDirectory, argument);
  try {
    const stats = await fsPromises.stat(newPath);
    if (stats.isDirectory()) {
      return {
        workingDirectory: newPath,
        message: `Current working directory changed to ${newPath}\n`,
      };
    }
    throw new Error;
  } catch (err) {
    return {
      workingDirectory,
      message: 'Invalid path\n',
    };
  }
}

export const listDirectoryContents = async ({ workingDirectory }) => {
  try {
    const filesAndDirs = await fsPromises.readdir(workingDirectory, { withFileTypes: true });

    const directories = filesAndDirs.filter(item => item.isDirectory()).map(item => (
      {
        name: item.name,
        type: 'directory',
      }
    ));
    const files = filesAndDirs.filter(item => item.isFile()).map(item => (
      {
        name: item.name,
        type: 'files',
      }
    ));

    directories.sort();
    files.sort();

    return {
      workingDirectory,
      message: tableToString([...directories, ...files].map(item => ({ 'Name': item.name, 'Type': item.type }))),
    }
  } catch (err) {
    return {
      workingDirectory,
      message: `Error reading directory: ${err}\n`,
    }
  }
}
