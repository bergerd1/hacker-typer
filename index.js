'use strict';
let fs       = require('fs');
let through  = require('through2');
let duplexer = require('duplexer2');
let split    = require('split');

// File streams
let fileStream = fs.createReadStream('./inputs/hacker.txt',{encoding:'utf8'});
let streams = [
  fs.createReadStream('./inputs/part1.txt',{encoding:'utf8'}),
  fs.createReadStream('./inputs/part2.txt',{encoding:'utf8'}),
  fs.createReadStream('./inputs/part3.txt',{encoding:'utf8'}),
  fs.createReadStream('./inputs/part4.txt',{encoding:'utf8'})
];

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
