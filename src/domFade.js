/* eslint-disable no-param-reassign -- the whole point of this method is to update the properties on the element */
function fade(element, fadeSeconds, targetOpacity, fn) {
  return new Promise((resolve) => {
    function onTransitionEnd() {
      if (fn) fn();
      element.removeEventListener('transitionend', onTransitionEnd);
      resolve();
    }

    element.style.transition = `opacity ${fadeSeconds}s`;
    element.style.opacity = targetOpacity;
    element.addEventListener('transitionend', onTransitionEnd);
  });
}

async function fadeOutAndIn(element, fadeSeconds, targetOpacity, fn) {
  await fade(element, fadeSeconds, 0);
  fn();
  await fade(element, fadeSeconds, targetOpacity);
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

export { fade, fadeOutAndIn, fadeInnerText, fadeBackgroundImage };
