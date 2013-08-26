#!/usr/bin/env node

var fs = require('fs'),
    ffmpeg = require('fluent-ffmpeg'),
    ytdl = require('ytdl');

var program = require('commander');

program
  .version('0.0.1')
  .option('-u, --url <url>', 'youtube url')
  .option('-o, --output <string>', 'output file')
  .option('-c, --convert', 'File will be converted to mp3')
  .parse(process.argv);

    if(program.url && program.output) {
      console.log("Downloading");
      dlyt(program.url, program.output , program.covert);
    }
    else {
      console.log("URL or output file not defined");
    }

function dlyt(path, destination, convertToMP3){
  var myytld = ytdl(path);
  var vidstream = fs.createWriteStream(destination);
  myytld.pipe(vidstream);
  vidstream.on('close', function (){
    console.log("Download complete");
    if(convertToMP3) {
      console.log("converting to mp3");
      var fileEnd = /\.flv$/;
      convert(destination, destination.replace(fileEnd, '.mp3'));
    }
  });
}

function convert (source, destination) {
  var proc = new ffmpeg({ source: source , nolog: false})
    .withAudioCodec('libmp3lame')
    .toFormat('mp3')
    .saveToFile(destination, function( stdout, stderr){
      stderr ? console.log(stderr) : console.log('file converted successfully');
    });

}

