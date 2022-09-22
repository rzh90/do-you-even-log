/*** REST TIMER ***/
let display = document.querySelector('#time')
let minInput = document.getElementById("min")
let secInput = document.getElementById("sec")
let intervalId

function startTimer() {
    let min = Number(minInput.value), sec = Number(secInput.value)
    countdown(min, sec)
}

function countdown(min, sec) {
    let minute = min * 60
    let second = sec

    let duration = minute + second
    let timer = duration
    let minutes, seconds

    intervalId = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10)

        seconds = seconds < 10 ? "0" + seconds : seconds

        display.innerText = minutes + ":" + seconds

        if (--timer < 0) {
            display.innerText = "DONE"
            clearInterval(intervalId)
        }
    }, 1000)
}

function stopTimer() {
    let currentTime = display.innerText.split(":")
    if(currentTime[0] == '0' && currentTime[1] == '00') {
        minInput.value = ""
        secInput.value = ""
    }
    else {
        minInput.value = Number(currentTime[0])
        secInput.value = Number(currentTime[1])
    }
    clearInterval(intervalId)
}

function resetTimer() {
    minInput.value = ""
    secInput.value = ""
    display.innerText = "0:00"
}


/*** PLATE CALCULATOR ***/
function calculatePlates() {
    const checkboxes = document.getElementsByName("plates") //get all checkboxes
    const weight = document.getElementById("weight").value //get weight entered
    const weightDisplay = document.getElementById("weight-display") //get closest weight
    const plateDisplay = document.getElementById("plate-display") //get list of weights
    let plates = [] //available plates

    //clear list of plates
    plateDisplay.innerHTML = ""

    //if plate is checked, add to plates array (a list of available plates)
    for(let checkbox of checkboxes) {
        if(checkbox.checked)
            plates.push(Number(checkbox.value))
    }
    
    let finalPlates = plateCalculator.calculate(weight, {set: plates}) //calculate plates

    //insert plates into list and display them
    for(let plate of finalPlates["plates"]) {
        weightDisplay.innerHTML = `${finalPlates["closestWeight"]} lbs`
        plateDisplay.innerHTML += `<li>${plate["plateWeight"]} lbs x ${plate["qty"]}</li>`
    }
}