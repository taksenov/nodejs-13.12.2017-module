const fs = require('fs');
const split = require('split');
const request = require('request');
const thP = require('through2-parallel');

const url = process.argv[2];

fs.createReadStream(url)
  .pipe(split())
  .pipe(thP.obj({concurrency: 2}, function(url, enc, done) {
    if (!url) return done();
    request(url, (err, response, body) => {
      this.push(url + ' - ' + JSON.parse(body).special.course_alias + '\n');
      done();
    })
  }))
  .pipe(fs.createWriteStream('result.txt'))
  .on('finish', () => {
    console.log('Url done');
  })