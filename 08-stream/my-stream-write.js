const stream = require('stream');
const fs = require('fs');
const path =  require('path');
const mkdrip = require('mkdirp');

class ToFileStream extends stream.Writable {
  constructor() {
    super({objectMode: true});
  }
  _write(chunk, encoding, callback) {
    mkdrip(path.dirname(chunk.path), err => {
      if (err) {
        callback(err);
      }
      fs.writeFile(chunk.path, chunk.content, callback);
    });
  }
}

const tfs = new ToFileStream();

const content  = fs.readFileSync('my-stream-read.js');

tfs.write({path: 'file.txt', content});
tfs.end(() => {
  console.log('Done');
})