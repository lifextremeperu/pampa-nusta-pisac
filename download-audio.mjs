import youtubeDl from 'youtube-dl-exec';
import fs from 'fs';

const url = 'https://youtu.be/SkxLdLael84';
const output = 'public/audio/camino-rojo.m4a';

if (!fs.existsSync('public/audio')) {
  fs.mkdirSync('public/audio', { recursive: true });
}

console.log('Downloading audio...');
youtubeDl(url, {
  extractAudio: true,
  audioFormat: 'm4a',
  output: output,
  noWarnings: true,
  noCallHome: true,
  noCheckCertificate: true,
  preferFreeFormats: true,
  youtubeSkipDashManifest: true
}).then(output => {
  console.log('Download complete!');
}).catch(err => {
  console.error('Download failed:', err);
});