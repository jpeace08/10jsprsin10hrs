document.addEventListener("DOMContentLoaded", function () {
    setInterval(countdown, 1000);
  });
  
  const countdown = () => {
    const daysEl = document.querySelector("#days");
    const hoursEl = document.querySelector("#hours");
    const minsEl = document.querySelector("#mins");
    const secondsEl = document.querySelector("#seconds");
  
    const newYearDate = new Date("1 Jan 2021");
    const currentDate = new Date();
  
    const totalSecond = Math.floor((newYearDate - currentDate) / 1000);
    const days = Math.floor(totalSecond / 3600 / 24);
    const hours = Math.floor((totalSecond / 3600) % 24);
    const mins = Math.floor(totalSecond / 60 % 60);
    const seconds = totalSecond % 60;
  
    daysEl.innerText = days;
    hoursEl.innerText = hours;
    minsEl.innerText = mins;
    secondsEl.innerText = seconds;  
  };