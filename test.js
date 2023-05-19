const ytdl = require('ytdl-core')
const os = require('os')
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')

const url = 'https://www.youtube.com/watch?v=gV2LoFRcebw'
const filepath = './output/video.mp4'

ytdl(url, {
  filter: 'audioonly',
  quality: 'highestaudio',
}).pipe(fs.createWriteStream(filepath))

// delay 5 seconds to make sure file is downloaded
const delay = (ms) => new Promise((res) => setTimeout(res, ms))

async function convertToMp3() {
  await delay(1000)

  var proc = new ffmpeg({
    source: filepath,
    nolog: true,
  })

  proc.setFfmpegPath('C:/ffmpeg/bin/ffmpeg.exe')

  proc.toFormat('mp3')

  proc.on('end', function () {
    console.log('file has been converted successfully')
  })
  proc.on('error', function (err) {
    console.log('an error happened: ' + err.message)
  })
  // save to file <-- the new file I want -->
  proc.saveToFile('./output/audio.mp3')
}

convertToMp3()
