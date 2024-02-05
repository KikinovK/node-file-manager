import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import zlib from 'zlib';


export const compressFile = async (workingDirectory, argument, argSecond) => {
  const extension = '.br';

  if (!argument) {
    console.log('You must specify the path to the file');
    return;
  }

  if (!argSecond) {
    console.log('You must specify the path to the compress file');
    return;
  }

  const sourcePath = path.join(workingDirectory, argument);
  const parsedSourcePath = path.parse(sourcePath);
  const destinationPath = path.join(workingDirectory, argSecond, parsedSourcePath.base + extension);

  const directory = path.dirname(destinationPath);

  try {
    await fsPromises.mkdir(directory, { recursive: true });

    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(sourcePath, { encoding: 'utf-8' });
      const writeStream = fs.createWriteStream(destinationPath);
      const brotliCompressStream = zlib.createBrotliCompress();

      readStream
        .pipe(brotliCompressStream)
        .pipe(writeStream);

      writeStream.on('finish', () => {
        console.log(`${sourcePath} was successfully compressed and written to ${destinationPath}`);
        resolve();
      });

      writeStream.on('error', (err) => {
        console.error('Error while writing file:', err);
        reject();
      });

      brotliCompressStream.on('error', (err) => {
        console.error('Error while compressing file:', err);
        reject();
      });
    });
  } catch (err) {
    console.error('Error compressing file:', err);
  }
}

export const decompressFile = async (workingDirectory, argument, argSecond) => {

  if (!argument) {
    console.log('You must specify the path to the file');
    return;
  }

  if (!argSecond) {
    console.log('You must specify the path to the decompress file');
    return;
  }

  const sourcePath = path.join(workingDirectory, argument);
  const parsedSourcePath = path.parse(sourcePath);
  const destinationPath = path.join(workingDirectory, argSecond, parsedSourcePath.name);

  const directory = path.dirname(destinationPath);

  try {
    await fsPromises.mkdir(directory, { recursive: true });

    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(sourcePath, { encoding: 'utf-8' });
      const writeStream = fs.createWriteStream(destinationPath);
      const brotliDecompressStream = zlib.createBrotliDecompress();

      readStream
        .pipe(brotliDecompressStream)
        .pipe(writeStream);

      writeStream.on('finish', () => {
        console.log(`${sourcePath} was successfully decompressed and written to ${destinationPath}`);
        resolve();
      });

      writeStream.on('error', (err) => {
        console.error('Error while writing file:', err);
        reject();
      });

      brotliDecompressStream.on('error', (err) => {
        console.error('Error while decompressing file:', err);
        reject();
      });
    });
  } catch (err) {
    console.error('Error compressing file:', err);
  }
}
