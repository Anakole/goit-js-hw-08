import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const TIME_STORAGE = 'videoplayer-current-time';

const saveTime = ({ seconds }) => {
  localStorage.setItem(TIME_STORAGE, seconds);
};

player.on('timeupdate', throttle(saveTime, 1000));

const savedTime = localStorage.getItem(TIME_STORAGE);

if (savedTime) {
  player.setCurrentTime(savedTime);
}
