import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import zlib from 'zlib';


export const compressFile = async ({ workingDirectory, argumentArray: [argument, argSecond] }) => {
  const extension = '.br';

  if (!argument) {
    return { message: 'You must specify the path to the file\n' };
  }

  const sourcePath = path.join(workingDirectory, argument);
  const parsedSourcePath = path.parse(sourcePath);
  const destinationPath = path.join(workingDirectory, argSecond || '', parsedSourcePath.base + extension);

  const directory = path.dirname(destinationPath);

  try {
    await fsPromises.mkdir(directory, { recursive: true });

    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(destinationPath);
      const brotliCompressStream = zlib.createBrotliCompress();

      const pipeline = readStream.pipe(brotliCompressStream).pipe(writeStream);

      pipeline.on('finish', () => {
        resolve({ message: `File successfully compressed from ${sourcePath} to ${destinationPath}\n` });
      });

      readStream.on('error', (err) => {
        resolve({ message: `Error while reading file:\n${err}\n` });
      });

      writeStream.on('error', (err) => {
        resolve({ message: `Error while writing file:\n${err}\n` });
      });

      brotliCompressStream.on('error', (err) => {
        resolve({ message: `Error while compressing file:\n${err}\n` });
      });
    });
  } catch (err) {
    return { message: `Error compressing file:\n${err}\n` };
  }
}

export const decompressFile = async ({ workingDirectory, argumentArray: [argument, argSecond] }) => {
  if (!argument) {
    return { message: 'You must specify the path to the file\n' };
  }

  const sourcePath = path.join(workingDirectory, argument);
  const parsedSourcePath = path.parse(sourcePath);
  const destinationPath = path.join(workingDirectory, argSecond || '', parsedSourcePath.name);

  const directory = path.dirname(destinationPath);

  try {
    await fsPromises.mkdir(directory, { recursive: true });

    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(destinationPath);
      const brotliDecompressStream = zlib.createBrotliDecompress();

      const pipeline = readStream.pipe(brotliDecompressStream).pipe(writeStream);

      pipeline.on('finish', () => {
        resolve({ message: `File successfully decompressed from ${sourcePath} to ${destinationPath}\n` });
      });

      readStream.on('error', (err) => {
        resolve({ message: `Error while reading file:\n${err}\n` });
      });

      writeStream.on('error', (err) => {
        resolve({ message: `Error while writing file:\n${err}\n` });
      });

      brotliDecompressStream.on('error', (err) => {
        resolve({ message: `Error while decompressing file:\n${err}\n` });
      });
    });
  } catch (err) {
    return { message: `Error decompressing file:\n${err}\n` };
  }
}
