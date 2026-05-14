import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

const ffmpegPath = path.join(
  process.cwd(),
  'ffmpeg',
  'ffmpeg.exe'
);

ffmpeg.setFfmpegPath(ffmpegPath);

const cameras = [

  {
    name: 'HR Hall',
    url: 'rtsp://admin:ZESIID@192.168.31.158:554/live'
  }

];

function startCameras() {

  cameras.forEach(camera => {

    setInterval(() => {

      const fileName =
        `captures/${camera.name.replace(/ /g, '_')}.jpg`;

      ffmpeg(camera.url)
        .inputOptions([
          '-rtsp_transport tcp'
        ])
        .frames(1)
        .save(fileName)
        .on('end', () => {
          console.log(`Captured ${camera.name}`);
        })
        .on('error', err => {
          console.log(err.message);
        });

    }, 5000);

  });

}

export default startCameras;