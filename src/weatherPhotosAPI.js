import snowNight from './images/backgrounds/snowNight.jpg';
import rainNight from './images/backgrounds/rainNight.jpg';
import clearNight from './images/backgrounds/clearNight.jpg';
import snowDay from './images/backgrounds/snowDay.jpg';
import rainDay from './images/backgrounds/rainDay.jpg';
import clearDay from './images/backgrounds/clearDay.jpg';

function getFallbackImage(searchString) {
  // Day
  if (searchString.match(/day/i)) {
    if (searchString.match(/snow/i)) {
      return snowDay;
    }

    if (searchString.match(/rain/i)) {
      return rainDay;
    }

    // Otherwise it must be a clear day
    return clearDay;
  }

  // Night
  if (searchString.match(/snow/i)) {
    return snowNight;
  }

  if (searchString.match(/rain/i)) {
    return rainNight;
  }

  // Otherwise it must be a clear night
  return clearNight;
}

export default function getImage(searchString) {
  return getFallbackImage(searchString);
}
