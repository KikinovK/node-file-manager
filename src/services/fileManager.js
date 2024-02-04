import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

export const filePrint = async (workingDirectory, argument) => {

  if (!argument) {
    console.log('You must specify the path to the file');
    return;
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
          console.log('File reading finished.');
          resolve();
        });

        readableStream.on('error', (err) => {
          console.error('Error reading file:', err);
          reject(err);
        });
      });
    }
    throw new Error;
  } catch (err) {
    console.log('Invalid path');
    return workingDirectory;
  }
}

export const createFile = async (workingDirectory, argument) => {

  if (!argument) {
    console.log('You must specify the path to the file');
    return;
  }

  const filePath = path.join(workingDirectory, argument);
  const directory = path.dirname(filePath);

  try {
    await fsPromises.mkdir(directory, { recursive: true });

    await fsPromises.writeFile(filePath, '');
    console.log(`Empty file ${filePath} created successfully`);
  } catch (err) {
    console.error('Error creating file:', err);
  }
}

export const renameFile = async (workingDirectory, argument, argSecond) => {

  if (!argument) {
    console.log('You must specify the path to the file');
    return;
  }

  if (!argSecond) {
    console.log('You must specify the new name to the file');
    return;
  }

  const oldPath = path.join(workingDirectory, argument);
  const newPath = path.join(path.dirname(oldPath), argSecond);

  try {
    await fsPromises.rename(oldPath, newPath);
    console.log(`The file was successfully renamed from ${oldPath} to ${newPath}`);
  } catch (err) {
    console.error('Error when renaming a file:', err);
  }

}

export const copyFile = async (workingDirectory, argument, argSecond) => {

  if (!argument) {
    console.log('You must specify the path to the file');
    return;
  }

  if (!argSecond) {
    console.log('You must specify the new path to the file');
    return;
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
        console.error('Error reading file:', err);
        reject();
      });

      writeStream.on('error', (err) => {
        console.error('Error writing file:', err);
        reject();
      });

      writeStream.on('finish', () => {
        console.log(`File successfully copied from ${sourcePath} to ${destinationPath}`);
        resolve();
      });

      readStream.pipe(writeStream);
    });
  } catch (err) {
    console.error('Error copying file:', err);
  }

}
