import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export const printHash = async (workingDirectory, argument) => {
  if (!argument) {
    console.log('You must specify the path to the file');
    return;
  }

  const filePath = path.join(workingDirectory, argument);

  try {
    const hash = crypto.createHash('sha256');

    return new Promise((resolve, reject) => {
      const readableStream = fs.createReadStream(filePath, { encoding: 'utf8' });

      readableStream.on('data', (chunk) => {
        hash.update(chunk);
      });

      readableStream.on('end', () => {
        const hashResult = hash.digest('hex');
        console.log(`Hash file ${filePath}: ${hashResult}`);
        resolve();
      });

      readableStream.on('error', (err) => {
        console.error('Error reading file:', err);
        reject(err);
      });
    });
  } catch (err) {
    console.error('Error calculate hash file:', err);
  }
}
