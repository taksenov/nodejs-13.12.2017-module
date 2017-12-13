console.log(__dirname);
console.log(__filename);

console.log('Current directory: ' + process.cwd());

process.chdir('..');

console.log(__dirname);
console.log(__filename);

console.log('Curren directory: ' + process.cwd());