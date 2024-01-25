export default class Timer {
  #name;

  #startTime;

  #endTime;

  constructor(name) {
    this.#name = name;
  }

  start() {
    this.#startTime = Date.now();
    this.#endTime = null;
  }

  end() {
    this.#endTime = Date.now();
  }

  get name() {
    return this.#name;
  }

  get startTime() {
    return this.#startTime;
  }

  get endTime() {
    return this.#endTime;
  }

  get elapsedTime() {
    return this.#endTime - this.#startTime;
  }
}
