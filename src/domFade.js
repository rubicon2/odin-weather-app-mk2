function fadeOutAndIn(element, fadeSeconds, targetOpacity, fn) {
  /* eslint-disable no-param-reassign -- the whole point of this method is to update the properties on the element */
  // Need named function so can use removeEventListener on it once transition is done
  function onTransitionEnd() {
    fn();
    element.style.opacity = targetOpacity;
    element.removeEventListener('transitionend', onTransitionEnd);
  }

  element.style.transition = `opacity ${fadeSeconds}s`;
  // eslint-disable-next-line eqeqeq -- does not perform expected comparison with strict equality or using '0'
  if (element.style.opacity == 0) {
    fn();
    element.style.opacity = targetOpacity;
  } else {
    element.style.opacity = 0;
    element.addEventListener('transitionend', onTransitionEnd);
  }
  /* eslint-enable no-param-reassign */
}

function fadeInnerText(element, innerText, fadeSeconds = 1, targetOpacity = 1) {
  /* eslint-disable no-param-reassign */
  fadeOutAndIn(element, fadeSeconds, targetOpacity, () => {
    element.innerText = innerText;
  });
  /* eslint-enable no-param-reassign */
}

function fadeBackgroundImage(element, img, fadeSeconds = 1, targetOpacity = 1) {
  /* eslint-disable no-param-reassign */
  fadeOutAndIn(element, fadeSeconds, targetOpacity, () => {
    element.style.backgroundImage = `url(${img})`;
  });
  /* eslint-enable no-param-reassign */
}

export { fadeOutAndIn, fadeInnerText, fadeBackgroundImage };
