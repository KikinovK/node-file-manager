import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export const showHash = async ({ workingDirectory, argumentArray: [argument] }) => {
  if (!argument) {
    return { message: 'You must specify the path to the file\n' };
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
        resolve({ message: `Hash file ${filePath}:\n${hashResult}\n` });
      });

      readableStream.on('error', (err) => {
        console.error('Error reading file:', err);
        resolve({ message: `Error reading file\n${err}\n` });
      });
    });
  } catch (err) {
    return { message: `Error calculate hash file:\n${err}\n` };
  }
}
