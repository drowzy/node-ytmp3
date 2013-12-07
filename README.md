ytmp3
==========

## Prerequisits

This script uses FFMPEG for conversion which means that it needs to be installed on the system.
	
    $ sudo apt-get install ffmpeg

And the mp3 codec is not included(I think)

    $ sudo apt-get install libavcodec-extra-53

Or

    $ sudo apt-get install libmp3lame0
## Installation

Install from npm:

		$ npm install -g ytmp3

## Usage

To download and convert a youtube video to mp3 

		$ ytmp3 -u http://www.youtube.com/watch?v=sFrNsSnk8GM -f mp3

Where option -u is the url to the youtube video & -f is the format (mp3 or flv).
