'use strict';
let fs       = require('fs');
let glob     = require('glob');

// File streams
let fileStream = fs.createReadStream('./inputs/hacker.txt',{encoding:'utf8'});

// Block streams
let streams =  glob.sync('./inputs/part*.txt').map(item =>{
  return fs.createReadStream(item,{encoding:'utf8'});
});

// Streams
let str      = require('./streams')(fileStream,streams);

process.title = 'Hacker Typer';
process.stdin.resume().setRawMode(true);

// Display first part
str.streamNextBlock();

// Main stream
process.stdin
  .pipe(str.hackStream())
  .pipe(process.stdout);
