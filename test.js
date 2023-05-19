import ID3Writer from 'browser-id3-writer'
import fs from 'fs'

const songBuffer = fs.readFileSync('./output/audio.mp3')
const coverBuffer = fs.readFileSync('./output/Yandhi.jpg')

const writer = new ID3Writer(songBuffer)
writer
  .setFrame('TIT2', 'Home')
  .setFrame('TPE1', ['Eminem', '50 Cent'])
  .setFrame('TALB', 'Friday Night Lights')
  .setFrame('TYER', 2004)
  .setFrame('APIC', {
    type: 3,
    data: coverBuffer,
    description: 'Super picture',
  })
writer.addTag()

const taggedSongBuffer = Buffer.from(writer.arrayBuffer)
fs.writeFileSync('./output/Yandhi/City In the Sky.mp3', taggedSongBuffer)
