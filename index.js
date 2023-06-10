import ytdl from 'ytdl-core'
import fs from 'fs'

import { downloadImage, writeTags, convertToMp3, delay } from './utils.js'

import data from './songs.json' assert { type: 'json' }

const videoFilePath = './output/video.mp4'

async function main() {
  // create output directory if it doesn't exist
  const outputDirectory = './output'
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory)
  }

  for (let i = 0; i < data.length; i++) {
    const album = data[i]

    const coverFilepath = `./output/${album.album}.jpg`

    await downloadImage(album.cover, coverFilepath).then(() => {
      console.log(`Downloaded ${album.album} cover`)
    })

    for (let j = 0; j < album.trackList.length; j++) {
      const track = album.trackList[j]
      const url = track.url

      ytdl(url, {
        filter: 'audioonly',
        quality: 'highestaudio',
      }).pipe(fs.createWriteStream(videoFilePath))

      await convertToMp3(videoFilePath).then(async () => {
        console.log(`Converted ${track.title} to mp3`)

        const tags = {
          title: track.title,
          artists: track.artists,
          album: album.album,
        }

        const finalAudioFilepath = `./output/${album.album}/${track.title}.mp3`
        const finalAudioDirectory = `./output/${album.album}`
        if (!fs.existsSync(finalAudioDirectory)) {
          fs.mkdirSync(finalAudioDirectory)
        }

        await writeTags(tags, coverFilepath, finalAudioFilepath).then(() => {
          console.log(`Wrote tags to ${track.title}`)
        })
      })

      await delay(2500)
    }
  }
}

main()
