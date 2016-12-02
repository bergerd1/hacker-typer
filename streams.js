'use strict';
let through  = require('through2');
let split    = require('split');

module.exports = (fileStream,streams) => {
    return {
      hackStream      : () => hackStream(fileStream,streams),
      slowStream      : () => slowStream(streams),
      streamNextBlock : () => streamNextBlock(streams)
    };
};

function hackStream(fileStream,streams){
  return through(function(buff,_,next){
    let key = buff.toString();
    // Ctrl + C
    if(key === '\u0003') {
      process.exit();
    }else{
        let chunk;
        if((chunk = fileStream.read(1)) !== null){
          if(chunk === 'µ'){
            // Display next block
            streamNextBlock(streams);
          }else{
            this.push(chunk);
          }
        }else{
          process.exit();
        }
    }
    next();
  });
}

function slowStream(){
  return through(function(chunk,_,next){
    process.stdin.pause();
    setTimeout(() => {
      this.push(chunk);
      next();
    },0);
  },function(done){
    process.stdin.resume();
    done();
  });
}


function streamNextBlock(streams){
  if(streams.length > 0){
    streams.shift()
      .pipe(split(/(?!$)/))
      .pipe(slowStream())
      .pipe(process.stdout);
  }
}
