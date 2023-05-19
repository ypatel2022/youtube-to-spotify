const ytdl = require('ytdl-core')
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const http = require('http')
const ID3Writer = require('browser-id3-writer')

const videoFilepath = './output/video.mp4'
const audioFilepath = './output/audio.mp3'
const coverFilepath = './output/cover.jpg'

const url = 'https://www.youtube.com/watch?v=gV2LoFRcebw'

const tags = {
  title: 'City in the Sky',
  artists: ['Kanye West'],
  album: 'Yahndi',
  TRCK: '0',
  year: '2016',
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

// get video info
async function getVideoInfo(url) {
  const info = await ytdl.getInfo(url)
  return info
}

async function downloadImage(imageUrl) {
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

async function writeTags() {
  await delay(2500)

  const songBuffer = fs.readFileSync(audioFilepath)
  const coverBuffer = fs.readFileSync(coverFilepath)

  const writer = new ID3Writer(songBuffer)
  writer
    .setFrame('TIT2', tags.title)
    .setFrame('TPE1', tags.artists)
    .setFrame('TALB', tags.album)
    .setFrame('TYER', tags?.year)
    .setFrame('APIC', {
      type: 3,
      data: coverBuffer,
      description: 'Cover',
    })

  writer.addTag()

  const taggedSongBuffer = Buffer.from(writer.arrayBuffer)
  fs.writeFileSync(audioFilepath, taggedSongBuffer)
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

// download video mp3
ytdl(url, {
  filter: 'audioonly',
  quality: 'highestaudio',
}).pipe(fs.createWriteStream(videoFilepath))

convertToMp3().then(() => {
  console.log('converted to mp3')

  getVideoInfo(url).then((info) => {
    const thumbnails = info.player_response.videoDetails.thumbnail.thumbnails
    // replace https with http to download thumbnail
    const imageUrl = thumbnails[thumbnails.length - 1].url.replace(
      'https',
      'http'
    )

    // make sure thumbnail is downloaded before writing tags
    downloadImage(imageUrl).then(async () => {
      await delay(1500)

      writeTags().then(() => {
        console.log('tags written')
      })
    })
  })
})
