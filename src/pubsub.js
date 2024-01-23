const events = {};

function subscribe(tag, fn) {
  if (!events[tag]) events[tag] = [fn];
  else events[tag].push(fn);
}

function unsubscribe(tag, fn) {
  if (events[tag])
    events[tag] = events[tag].filter((existingFn) => existingFn !== fn);
}

function publish(tag, ...data) {
  try {
    if (events[tag]) {
      events[tag].forEach((fn) => {
        fn(...data);
      });
    }
  } catch (error) {
    console.error(`${error.name}: ${error.message}. Event tag: '${tag}'`);
  }
}

function getAllEvents() {
  return Object.keys(events);
}

export { subscribe, unsubscribe, publish, getAllEvents };
