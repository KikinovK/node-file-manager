import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

export const filePrint = async (workingDirectory, argument) => {

  if (!argument) {
    console.log('You must specify the path to the directory');
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
    console.log('You must specify the path to the directory');
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
