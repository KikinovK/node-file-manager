import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

export const filePrint = async ({ workingDirectory, argumentArray: [argument] }) => {

  if (!argument) {
    return {
      workingDirectory,
      message: 'You must specify the path to the file\n',
    };
  }

  const filePath = path.join(workingDirectory, argument);

  try {
    const stats = await fsPromises.stat(filePath);
    if (stats.isFile()) {
      return new Promise((resolve, reject) => {
        const readableStream = fs.createReadStream(filePath, { encoding: 'utf8' });

        readableStream.on('data', (chunk) => {
          console.log(chunk);
        });

        readableStream.on('end', () => {
          resolve({
            workingDirectory,
            message: 'File reading finished.\n',
          });
        });

        readableStream.on('error', (err) => {
          resolve({
            workingDirectory,
            message: `Error reading file\n${err}\n`,
          });
        });
      });
    }
    throw new Error;
  } catch (err) {
    return { workingDirectory, message: 'Invalid path\n' }
  }
}

export const createFile = async ({ workingDirectory, argumentArray: [argument] }) => {

  if (!argument) {
    return { workingDirectory, message: 'You must specify the path to the file\n' };
  }

  const filePath = path.join(workingDirectory, argument);
  const directory = path.dirname(filePath);

  try {
    await fsPromises.mkdir(directory, { recursive: true });

    await fsPromises.writeFile(filePath, '');

    return { workingDirectory, message: `Empty file ${filePath} created successfully\n` };
  } catch (err) {
    return { workingDirectory, message: `Error creating file: ${err}\n` };
  }
}

export const createDirectory = async ({ workingDirectory, argumentArray: [argument] }) => {

  if (!argument) {
    return { workingDirectory, message: 'You must specify the path to the directory\n' };
  }

  const dirPath = path.join(workingDirectory, argument);

  try {
    await fsPromises.mkdir(dirPath, { recursive: true });

    return { workingDirectory, message: `Directory ${dirPath} created successfully\n` };
  } catch (err) {
    return { workingDirectory, message: `Error creating directory: ${err}\n` };
  }
}

export const renameFile = async ({ workingDirectory, argumentArray: [argument, argSecond] }) => {

  if (!argument) {
    return { workingDirectory, message: 'You must specify the path to the file\n' };
  }

  if (!argSecond) {
    return { workingDirectory, message: 'You must specify the new name to the file\n' };
  }

  const oldPath = path.join(workingDirectory, argument);
  const newPath = path.join(path.dirname(oldPath), argSecond);

  try {
    await fsPromises.rename(oldPath, newPath);
    return { workingDirectory, message: `The file was successfully renamed from ${oldPath} to ${newPath}\n` };
  } catch (err) {
    return { workingDirectory, message: `Error when renaming a file: ${err}\n` };
  }
}


export const copyFile = async ({ workingDirectory, argumentArray: [argument, argSecond] }) => {

  if (!argument) {
    return { workingDirectory, message: 'You must specify the path to the file\n' };
  }

  if (!argSecond) {
    return { workingDirectory, message: 'You must specify the new path to the file\n' };
  }

  const sourcePath = path.join(workingDirectory, argument);
  const destinationPath = path.join(workingDirectory, argSecond, path.basename(sourcePath));
  const directory = path.dirname(destinationPath);

  try {
    await fsPromises.mkdir(directory, { recursive: true });

    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(destinationPath);

      readStream.on('error', (err) => {
        resolve({ workingDirectory, message: `Error reading file\n${err}\n` });
      });

      writeStream.on('error', (err) => {
        resolve({ workingDirectory, message: `Error writing file\n${err}\n` });
      });

      writeStream.on('finish', () => {
        resolve({
          workingDirectory,
          message: `File successfully copied from ${sourcePath} to ${destinationPath}\n`,
        });
      });

      readStream.pipe(writeStream);
    });
  } catch (err) {
    return { workingDirectory, message: `Error copying file: ${err}\n` };
  }
}

export const deleteFile = async ({ workingDirectory, argumentArray: [argument] }) => {

  if (!argument) {
    return { workingDirectory, message: 'You must specify the path to the file\n' };
  }

  const filePath = path.join(workingDirectory, argument);

  try {
    await fsPromises.unlink(filePath);
    return { workingDirectory, message: `File ${filePath} deleted successfully\n` };
  } catch (err) {
    return { workingDirectory, message: `Error deleting file: ${err}\n` };
  }
}

export const moveFile = async ({ workingDirectory, argumentArray: [argument, argSecond] }) => {

  if (!argument) {
    return { workingDirectory, message: 'You must specify the path to the file\n' };
  }

  if (!argSecond) {
    return { workingDirectory, message: 'You must specify the new path to the file\n' };
  }

  const sourcePath = path.join(workingDirectory, argument);
  const destinationPath = path.join(workingDirectory, argSecond, path.basename(sourcePath));


  try {
    await copyFile({ workingDirectory, argumentArray: [argument, argSecond] });
    await deleteFile({ workingDirectory, argumentArray: [argument, argSecond] });

    return { workingDirectory, message: `File successfully moved from ${sourcePath} to ${destinationPath}\n` };
  } catch (err) {
    return { workingDirectory, message: `Error moving file: ${err}\n` };
  }
}
