import { Console } from 'node:console';
import { Writable } from 'node:stream';
export const tableToString = (data) => {
  let output = '';

  const writable = new Writable({
    write(chunk, encoding, callback) {
      output += chunk.toString();
      callback();
    }
  });

  const customConsole = new Console ({
    stdout: writable,
    stderr: writable,
    colorMode: true,
  });

  customConsole.table(data);
  return output;
}
