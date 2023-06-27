class Timer {
  constructor(durationInput, startButton, pauseButton,refreshButton) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.refreshButton = refreshButton;

    this.startButton.addEventListener("click", this.start.bind(this));
    this.pauseButton.addEventListener("click", this.pause);
    this.refreshButton.addEventListener("click", this.refresh);
  }

  start = () => {
    this.tick();
    this.interval = setInterval(this.tick, 1000);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  tick = () => {
    this.timeRemaining = this.timeRemaining - 1;
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) { 
    this.durationInput.value = time;
  }

  refresh = () => {
    this.durationInput.value = 0;
  }
}

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const refreshButton = document.querySelector('#refresh');

const timer = new Timer(durationInput, startButton, pauseButton,refreshButton);