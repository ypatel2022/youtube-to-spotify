const ytdl = require('ytdl-core')
const fs = require('fs')

const id3 = require('node-id3')
const ID3Writer = require('browser-id3-writer')

const http = require('http')

const filepath = './output/audio.mp3'

const url = 'https://www.youtube.com/watch?v=gV2LoFRcebw'

const tags = {
  title: 'City in the Sky',
  artist: 'Kanye West',
  album: 'Yahndi',
  APIC: './output/cover.jpg',
  TRCK: '0',
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

// get video info
async function getVideoInfo(url) {
  const info = await ytdl.getInfo(url)
  return info
}

async function downloadImage(imageUrl) {
  // download video thumbnail
  const file = fs.createWriteStream('./output/cover.jpg')
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
  const success2 = await id3.write(tags, filepath)

  await delay(500)

  console.log(success2)

  console.log(id3.read(filepath))
}

// download video mp3
ytdl(url, { filter: 'audioonly', quality: 'highestaudio' }).pipe(
  fs.createWriteStream('./output/audio.mp3')
)

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

    writeTags()
  })
})
