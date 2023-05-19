# YouTube to Spotify

Convert your favorite YouTube tracks that aren't available on Spotify to Spotify ready mp3 files.

## Table of Contents

- [How it Works](#how-it-works)
- [Notice](#notice)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Using the Script](#using-the-script)
  - [Adding to Spotify](#adding-to-spotify)

# How it Works

The script works by downloading the audio file from a YouTube video and then converting it to an MP3 file. However, there is a major flaw: the resulting MP3 file lacks any or all metadata associated with the song. As a result, it does not display the song name, artist name, album name, and cover image in Spotify.

Afterward, the cover art of the song is downloaded using a link provided by you. By utilizing this image and other song data (also provided by you), the ID3 tags of the MP3 file are updated. This ensures that the correct metadata appears in the Spotify app so you can differentiate between your songs.

# Notice

By using this script, you acknowledge and agree to the following terms:

1. Prohibition of Illegal Music Downloads: This script is intended for legal purposes only. You are strictly prohibited from using this script to download copyrighted music without proper authorization or in violation of applicable laws and regulations. Downloading or distributing copyrighted music without permission may infringe upon the rights of the copyright holders.

2. Personal Responsibility: You assume full responsibility for any consequences arising from the use of this script, including any illegal activities related to downloading or distributing copyrighted music. The creator(s) and maintainers of this script shall not be held liable for any misuse or illegal actions conducted by users.

3. Indemnification: You agree to indemnify and hold harmless the creator(s) and maintainers of this script from any claims, damages, liabilities, or expenses (including legal fees) arising out of or in connection with your use of this script for illegal purposes, including but not limited to copyright infringement.

4. Legal Consequences: Knowingly downloading or distributing copyrighted music without proper authorization may result in legal consequences, such as civil lawsuits and criminal charges. This legal notice serves as a reminder of your legal obligations and the potential risks involved in engaging in unauthorized activities.

5. Compliance with Applicable Laws: You are responsible for ensuring that your use of this script complies with all relevant laws, regulations, and copyright policies in your jurisdiction. It is your obligation to obtain proper authorization or licenses for any music downloads or usages that require such permissions.

By proceeding to use this script, you acknowledge that you have read and understood this legal notice, and you agree to comply with all the terms and conditions stated herein. If you do not agree with these terms, you must refrain from using this script.

Please note that this legal notice does not absolve you from any legal liabilities or consequences resulting from your actions. It is your responsibility to act in accordance with the law and respect the rights of copyright holders.

Remember, always support artists and obtain music through legal and authorized means.

# Getting Started

## Requirements

- [Node and npm](https://nodejs.org/en/) must be installed on your computer.

- [Git](https://github.com/git-guides/install-git) must be installed on your computer.

- [ffmpeg](https://phoenixnap.com/kb/ffmpeg-windows) must be installed on your system. Keep note of where it is installed.

## Using the Script

1. Open a terminal of your choice and enter the following commands:

   ```bash
   git clone https://github.com/ypatel2022/youtube-to-spotify
   cd youtube-to-spotify
   ```

2. Install the required dependencies using the command:

   ```bash
   npm install
   ```

3. Go to `utils.js` and find the following line of code (line 59):

   ```js
   proc.setFfmpegPath('C:/ffmpeg/bin/ffmpeg.exe')
   ```

   Here, you want to replace `C:/ffmpeg/bin/ffmpeg.exe` with the path of your ffmpeg binary on your system.

4. Duplicate the `example-songs.json` file and rename to `songs.json`.
   Following the layout provided in `example-songs.json`, edit and add your own songs that you want to download.

   Note: for your very last song in `songs.json`, add a duplicate of that track entry, currently there is a bug where the very last track gets corrupted when transferred to spotify.

5. Run the script using the following command and wait. It will take some time:

   ```bash
   node index.js
   ```

6. Your spotify ready files will now be in the `/output` directory placed in a folder with the album name associated with that song. Transfer these to a directory where you want your music to be.

## Adding to Spotify

1. Check your Spotify application to ensure that your app will show songs from your local downloaded music library. If you dont know how to do this, you can check out this [guide by Spotify](https://support.spotify.com/us/article/local-files/).

2. Go to the settings page you were just on and choose the directory where you put your music.

   Note: This is only if you are desktop. The mobile version just looks at every audio file on your system.

3. You should now see the songs that you downloaded on your Spotify app in the Local File section.

Happy listening 🎶🎶🎶
