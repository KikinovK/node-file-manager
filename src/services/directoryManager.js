import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

export const upDirectory = (workingDirectory) => path.resolve(workingDirectory, '..');

export const changeDirectory = async (workingDirectory, argument) => {
  if (!argument) {
    console.log('You must specify the path to the directory');
    return workingDirectory;
  }

  const newPath = path.resolve(workingDirectory, argument);
  try {
    const stats = await fsPromises.stat(newPath);
    if (stats.isDirectory()) {
      console.log(`Current working directory changed to ${newPath}`);
      return newPath;
    }
    throw new Error;
  } catch (err) {
    console.log('Invalid path');
    return workingDirectory;
  }
}

export const listDirectoryContents = async (workingDirectory) => {
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

    console.table([...directories, ...files].map(item => ({ 'Name': item.name, 'Type': item.type })));
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}
