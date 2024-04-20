import { controls, soundsEffects } from "./elements.js";
import * as actions from './actions.js'
import * as el from './elements.js'
import { updateDisplay } from "./timer.js";
import state from './state.js'

export function registerControls () {
    controls.addEventListener('click', (event) => {
       const action =  event.target.dataset.action

       if(typeof actions[action] !== "function") {
        return
       }

       actions[action]()
       
    })
}

export function setHours() {
    el.hours.addEventListener('focus', () => {
        el.hours.textContent = ""
    })

    el.hours.onkeypress = (event) => /\d/.test(event.key)

    el.hours.addEventListener('blur', (event) => {
        let time = event.currentTarget.textContent
        time = time > 24 ? 24 : time

        state.hours = time    

        updateDisplay()
        el.hours.removeAttribute('contenteditable')
    })
}

export function setMinutes() {
    el.minutes.addEventListener('focus', () => {
        el.minutes.textContent = ""
    })

    el.minutes.onkeypress = (event) => /\d/.test(event.key)

    el.minutes.addEventListener('blur', (event) => {
        let time = event.currentTarget.textContent
        time = time > 60 ? 60 : time

        state.minutes = time    

        updateDisplay()
        el.minutes.removeAttribute('contenteditable')
    })
}

export function setSeconds() {
    el.seconds.addEventListener('focus', () => {
        el.seconds.textContent = ""
    })

    el.seconds.onkeypress = (event) => /\d/.test(event.key)

    el.seconds.addEventListener('blur', (event) => {
        let time = event.currentTarget.textContent
        time = time > 60 ? 60 : time

        state.seconds = time    

        updateDisplay()
        el.seconds.removeAttribute('contenteditable')
    })
}


export function registerSoundsEffects() {
    soundsEffects.addEventListener('click', (event) => {
        const soundAction =  event.target.dataset.action;  

        
        const elements = soundsEffects.querySelectorAll('button');
        const element = event.target;             

       if(typeof actions[soundAction] !== "function") {
        return
       }

       actions[soundAction]()
       actions.bgSoundsToggle(elements, element)     
    })
}


