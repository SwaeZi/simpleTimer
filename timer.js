class Timer { 
    constructor (durationInput,startButton,pauseButton,refreshButton,callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.refreshButton = refreshButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
    this.refreshButton.addEventListener("click", this.refresh);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.interval = setInterval(this.tick, 20);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.02;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }

  refresh = () => {
    this.timeRemaining = 10;
  };
}


let duration;
const timer = new Timer(durationInput,startButton,pauseButton,refreshButton,
  {
    onStart(totalDuration) {
      duration = totalDuration;
    },
    onTick(timeRemaining) {
     circle.setAttribute('stroke-dashoffset', perimeter * timeRemaining / duration - perimeter);
    },
    onComplete() {
      console.log("Timer is completed");
    },
  }
);

const circle = document.querySelector("circle");

const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter)