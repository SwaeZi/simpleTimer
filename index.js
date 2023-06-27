class Timer {
  constructor(durationInput, startButton, pauseButton,refreshButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.refreshButton = refreshButton;
    if(callbacks) {
        this.onStart = callbacks.onStart;
        this.onTick = callbacks.onTick;
        this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
    this.refreshButton.addEventListener("click", this.refresh);
  }

  start = () => {
    if(this.onStart) {
        this.onStart();
    }
    this.tick();
    this.interval = setInterval(this.tick, 1000);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  tick = () => {
    if ( this.timeRemaining <= 0) {
        this.pause();
        if(this.onComplete) {
            this.onComplete();
        }
    } else {
      this.timeRemaining = this.timeRemaining - 1;
      if (this.onTick) {
        this.onTick();
      }
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) { 
    this.durationInput.value = time;
  }

  refresh = () => {
    this.timeRemaining = 10;
  }
}

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const refreshButton = document.querySelector('#refresh');

const timer = new Timer(durationInput, startButton, pauseButton,refreshButton,{
    onStart() {
        console.log('Timer Started');
    },
    onTick() {
        console.log('Timer just ticked');
    },
    onComplete() {
        console.log('Timer is completed');
    }
});