import state from "./state.js";
import * as timer from "./timer.js";
import * as el from "./elements.js";
import * as sounds from "./sounds.js";
import { updateDisplay } from "./timer.js";


export function toggleRunning() {
  state.isRunning = document.documentElement.classList.toggle("running");

  timer.countdown();
  sounds.buttonPressAudio.play();
}

export function reset() {
  state.isRunning = false;
  document.documentElement.classList.remove("running");
  timer.updateDisplay();

  sounds.buttonPressAudio.play();
}

export function set() {
  reset();

  el.hours.setAttribute("contenteditable", true);
  el.minutes.setAttribute("contenteditable", true);
  el.seconds.setAttribute("contenteditable", true);

  el.hours.focus();

  el.hours.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      el.minutes.focus();
    }
  });

  el.minutes.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      el.seconds.focus();
    }
  });

  el.seconds.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      el.seconds.blur();
      toggleRunning();
    }
  });
}

export function increment() {
  let minutes = Number(el.minutes.textContent);
  let hours = Number(el.hours.textContent);
  let seconds = Number(el.seconds.textContent);

  if (hours === 24) {
    return;
  }

  if (hours >= 23 && minutes >= 55) {
    seconds = 0;
    minutes = 0;
    hours = 24;
  } else if (minutes >= 55) {
    minutes -= 55;
    hours++;
  } else {
    minutes += 5;
  }

  state.minutes = minutes;
  state.hours = hours;
  state.seconds = seconds;

  updateDisplay();
  sounds.buttonPressAudio.play();
}

export function decrement() {
  let minutes = Number(el.minutes.textContent);
  let hours = Number(el.hours.textContent);
  let seconds = Number(el.seconds.textContent);

  if (minutes < 5 && hours === 0) {
    seconds = 0;
  } else if (minutes >= 5) {
    minutes -= 5;
  } else {
    hours--;
    minutes = 60 - (5 - minutes);
  }

  state.minutes = minutes;
  state.hours = hours;
  state.seconds = seconds;

  updateDisplay();
  sounds.buttonPressAudio.play();
}

export function florestMusic() {
  pauseAllMusics();

  if (state.muteSettings.isMuteFlorest) {
    sounds.florestSound.play();
    checkMusicState();
    state.muteSettings.isMuteFlorest = !state.muteSettings.isMuteFlorest;
  } else {
    sounds.florestSound.pause();
    state.muteSettings.isMuteFlorest = !state.muteSettings.isMuteFlorest;
  }
}

export function rainMusic() {
  pauseAllMusics();

  if (state.muteSettings.isMuteRain) {
    sounds.rainSound.play();
    checkMusicState();
    state.muteSettings.isMuteRain = !state.muteSettings.isMuteRain;
  } else {
    sounds.rainSound.pause();
    state.muteSettings.isMuteRain = !state.muteSettings.isMuteRain;
  }
}

export function coffeeShopMusic() {
  pauseAllMusics();

  if (state.muteSettings.isMuteCoffeeShop) {
    sounds.coffeeShopSound.play();
    checkMusicState();
    state.muteSettings.isMuteCoffeeShop = !state.muteSettings.isMuteCoffeeShop;
  } else {
    sounds.coffeeShopSound.pause();
    state.muteSettings.isMuteCoffeeShop = !state.muteSettings.isMuteCoffeeShop;
  }
}

export function bonfireMusic() {
  pauseAllMusics();

  if (state.muteSettings.isMuteFire) {
    sounds.bonfireSound.play();
    checkMusicState();
    state.muteSettings.isMuteFire = !state.muteSettings.isMuteFire;
  } else {
    sounds.bonfireSound.pause();
    state.muteSettings.isMuteFire = !state.muteSettings.isMuteFire;
  }
}

function pauseAllMusics() {
  const musics = [
    sounds.florestSound,
    sounds.rainSound,
    sounds.coffeeShopSound,
    sounds.bonfireSound,
  ];

  for (let i = 0; i < musics.length; i++) {
    musics[i].pause();
  }
}

function checkMusicState() {
  const musicsStates = state.muteSettings;

  for (const key in musicsStates) {
    state.muteSettings[key] = true;
  }
}


export function bgSoundsToggle(elements, element) {
    if(!element.classList.contains("btn-selected")) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove("btn-selected")
        }
        element.classList.add("btn-selected")
    }
    else {
        element.classList.remove("btn-selected")
    }     
}