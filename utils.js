import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'
import http from 'http'
import ID3Writer from 'browser-id3-writer'

const videoFilepath = './output/video.mp4'
const audioFilepath = './output/audio.mp3'

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

async function downloadImage(imageUrl, coverFilepath) {
  // download video thumbnail
  const file = fs.createWriteStream(coverFilepath)
  const request = await http.get(imageUrl, function (response) {
    response.pipe(file)

    // after download completed close filestream
    file.on('finish', () => {
      file.close()
      console.log('Download Completed')
    })
  })
}

async function writeTags(tags, coverFilepath, finalAudioFilepath) {
  await delay(2500)

  const songBuffer = fs.readFileSync(audioFilepath)
  const coverBuffer = fs.readFileSync(coverFilepath)

  const writer = new ID3Writer(songBuffer)
  writer
    .setFrame('TIT2', tags.title)
    .setFrame('TPE1', tags.artists)
    .setFrame('TALB', tags.album)
    .setFrame('APIC', {
      type: 3,
      data: coverBuffer,
      description: 'Cover',
    })

  writer.addTag()

  const taggedSongBuffer = Buffer.from(writer.arrayBuffer)
  fs.writeFileSync(finalAudioFilepath, taggedSongBuffer)

  await delay(1000)
}

async function convertToMp3() {
  await delay(1500)

  var proc = new ffmpeg({
    source: videoFilepath,
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
  proc.saveToFile(audioFilepath)
}

export { downloadImage, writeTags, convertToMp3, delay }
