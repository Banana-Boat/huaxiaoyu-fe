import Sound from 'react-native-sound';
import BgMusic from '~/assets/audios/city-of-stars.mp4';

Sound.setCategory('Playback');
export const getMusic = () =>
  new Promise<Sound>((resolve, reject) => {
    const music = new Sound(BgMusic, err => {
      if (err) reject();
      music.setNumberOfLoops(-1);
      music.setVolume(0.5);
      resolve(music);
    });
  });
