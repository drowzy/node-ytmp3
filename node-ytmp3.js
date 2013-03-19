#!/usr/bin/env node
// node-ytdl, ffmpeg, ffmpeg libavcodec-extra-53, commander

var fs = require('fs'),
    ffmpeg = require('fluent-ffmpeg'),
    ytdl = require('ytdl');

var program = require('commander');

program
  .version('0.0.1')
  .option('-u, --url <url>', 'youtube url')
  .option('-o, --output <string>', 'output file')
  .parse(process.argv);


    if(program.url && program.output) {
        console.log("Downloading");
        dlyt(program.url, program.output , true);
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
            var fileEnd = /\.flv$/;
            convert(destination, destination.replace(fileEnd, '.mp3'));
        }
    });

}

function convert (source, destination) {

    var proc = new ffmpeg({ source: source , nolog: false})
        .withAudioCodec('libmp3lame')
        .withAudioBitrate('128k')
        .toFormat('mp3')
        .saveToFile(destination, function( stdout, stderr){
            if(stderr){
                console.log(stderr);
            }
            else{
                console.log('file converted succesfully');
            }
    });

}

