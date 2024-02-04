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
    await fsPromises.access(newPath, fs.constants.F_OK);
    console.log(`Current working directory changed to ${newPath}`);
    return newPath;
  } catch (err) {
    console.log('Invalid path');
    return workingDirectory;
  }
}
