import state from './state.js'
import * as el from './elements.js'
import { reset } from './actions.js'
import { kitchenTimer } from './sounds.js'

export function countdown() {
    clearTimeout(state.countdownId)
    
    if(!state.isRunning) {
        return
    }

    let hours = Number(el.hours.textContent)
    let minutes = Number(el.minutes.textContent)
    let seconds = Number(el.seconds.textContent)

    seconds--

    if (seconds < 0) {
        seconds = 59
        minutes--
    }

    if (minutes < 0) {
        minutes = 59
        hours--
    }

    if (hours < 0) {
        reset()
        kitchenTimer.play()
        return
    }


    updateDisplay(hours, minutes, seconds)

    state.countdownId = setTimeout(() => countdown(), 1000)
}

export function updateDisplay(hours, minutes, seconds) {
    hours = hours ?? state.hours
    minutes = minutes ?? state.minutes
    seconds = seconds ?? state.seconds

    el.hours.textContent = String(hours).padStart(2, "0")
    el.minutes.textContent = String(minutes).padStart(2, "0")
    el.seconds.textContent = String(seconds).padStart(2,"0")
}