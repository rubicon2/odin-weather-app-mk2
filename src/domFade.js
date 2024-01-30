function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

/* eslint-disable no-param-reassign -- the whole point of this method is to update the properties on the element */
function fade(element, fadeSeconds, targetOpacity, fn) {
  return new Promise((resolve) => {
    function onTransitionEnd() {
      if (fn) fn();
      this.removeEventListener('transitionend', onTransitionEnd);
      resolve();
    }

    /* eslint-disable-next-line eqeqeq -- comparing css properties won't work otherwise */
    if (element.style.opacity != targetOpacity) {
      element.style.transition = `opacity ${fadeSeconds}s`;
      element.style.opacity = targetOpacity;
      element.addEventListener('transitionend', onTransitionEnd);
    } else {
      resolve();
    }
  });
}

async function fadeOutAndIn(element, fadeSeconds, targetOpacity, fn) {
  return new Promise((resolve) => {
    fade(element, fadeSeconds, 0)
      .then(() => {
        fn();
      })
      .then(() => {
        fade(element, fadeSeconds, targetOpacity);
      })
      .then(() => {
        resolve();
      });
  });
}

function fadeInnerText(element, innerText, fadeSeconds = 1, targetOpacity = 1) {
  return new Promise((resolve) => {
    fadeOutAndIn(element, fadeSeconds, targetOpacity, () => {
      element.innerText = innerText;
    }).then(() => {
      resolve();
    });
  });
}

function fadeBackgroundImage(element, img, fadeSeconds = 1, targetOpacity = 1) {
  return new Promise((resolve) => {
    fadeOutAndIn(element, fadeSeconds, targetOpacity, () => {
      element.style.backgroundImage = `url(${img})`;
    }).then(() => {
      resolve();
    });
  });
}

export { delay, fade, fadeOutAndIn, fadeInnerText, fadeBackgroundImage };
