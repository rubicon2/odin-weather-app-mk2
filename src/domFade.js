/* eslint-disable no-param-reassign -- the whole point of this method is to update the properties on the element */
function fade(element, fadeSeconds, targetOpacity, fn) {
  function onTransitionEnd() {
    if (fn) fn();
    element.removeEventListener('transitionend', onTransitionEnd);
  }

  element.style.transition = `opacity ${fadeSeconds}s`;
  element.style.opacity = targetOpacity;
  element.addEventListener('transitionend', onTransitionEnd);
}

function fadeOutAndIn(element, fadeSeconds, targetOpacity, fn) {
  fade(element, fadeSeconds, 0, () => {
    fn();
    fade(element, fadeSeconds, targetOpacity);
  });
}

function fadeInnerText(element, innerText, fadeSeconds = 1, targetOpacity = 1) {
  fadeOutAndIn(element, fadeSeconds, targetOpacity, () => {
    element.innerText = innerText;
  });
}

function fadeBackgroundImage(element, img, fadeSeconds = 1, targetOpacity = 1) {
  fadeOutAndIn(element, fadeSeconds, targetOpacity, () => {
    element.style.backgroundImage = `url(${img})`;
  });
}

export { fadeOutAndIn, fadeInnerText, fadeBackgroundImage };
