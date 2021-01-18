
export let timeLeft;
export const ProgressBar = () => {

  document.querySelector('.progress-bar').style.display = "block"; 
  const timeLimit = 60;
  let timePassed = 0;
  timeLeft = timeLimit;

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60) > 9 ? `${Math.floor(time / 60)}` : `0${Math.floor(time / 60)}`;
    let seconds = time % 60 > 9 ? `${time % 60}` : `0${time % 60}`;
    return `${minutes}:${seconds}`;
  }

  const startTimer = () => {
    const timerInterval = setInterval(() => {
      timePassed += 1;
      timeLeft = timeLimit - timePassed;
      document.querySelector('.progress-bar-timer>span').innerHTML = `Time left: ${formatTime(timeLeft)}`;
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        document.querySelector('.progress-bar').style.display = "none";
      }
    }, 1000)
  }

  document.querySelector('.progress-bar').innerHTML =
     `<div class="progress-bar-wrapper">
        <figure class="progress-bar-lightsaber-handle"><img src="static/assets/ui/LightsaberHandle.png" alt=""></figure>
        <div class="progress-bar-lightsaber-empty">
          <div class="progress-bar-lightsaber-full"></div>
        </div>
      </div>
      <div class="progress-bar-timer">
        <span>Time left: ${formatTime(timeLeft)}</span>
      </div>`

  const animationBar = document.getElementsByClassName('progress-bar-lightsaber-full')[0];
  const animationBarTimer = document.getElementsByClassName('progress-bar-timer')[0];

  animationBar.style.animation = `progress-bar ${timeLimit}s linear forwards`;
  animationBarTimer.style.animation = `text-color ${timeLimit}s linear forwards`;

  startTimer();
}
