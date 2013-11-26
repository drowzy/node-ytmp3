#!/usr/bin/env node

var fs = require('fs'),
    ffmpeg = require('fluent-ffmpeg'),
    ytdl = require('ytdl');

var program = require('commander');

program
  .version('0.0.1')
  .option('-u, --url <url>', 'youtube url')
  .option('-o, --output <file>', 'name of the output file')
  .option('-f, --format <format>', 'output format, i.e flv or mp3')
  .parse(process.argv);

    if(program.url && program.format) {
      console.log("Downloading");
      convertToMp3 = program.format == "mp3" ? true : false;
      dlyt(program.url, program.output, convertToMp3);
    }
    else {
      console.log("URL or output file not defined");
    }

function dlyt(path, destination, convertToMP3){
  ytdl(path).pipe(fs.createWriteStream(destination)).on('close', function() {
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
    .saveToFile(destination, function(stdout, stderr){
      if(stderr) {
        console.log(stderr);
      } else {
        console.log('file converted successfully');
      }
    });
}

