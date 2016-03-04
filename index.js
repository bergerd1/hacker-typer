'use strict';
let fs       = require('fs');
let through  = require('through2');
let duplexer = require('duplexer2');
let split    = require('split');

process.title = 'Hacker Typer';

let fileStream = fs.createReadStream('./hacker.txt',{encoding:'utf8'});

process.stdin.resume().setRawMode(true);

process.stdin
  .pipe(through(function(buff,_,next){
    let key = buff.toString();
    if(key === '\u0003') process.exit();
    let chunk;
    if((chunk = fileStream.read(5)) !== null){
      this.push(chunk);
    }
    next();
  }))
  .pipe(process.stdout);
