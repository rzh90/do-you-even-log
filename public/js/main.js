/*** REST TIMER ***/
let display = document.querySelector('#time')
let minInput = document.getElementById("min")
let secInput = document.getElementById("sec")
let intervalId

function startTimer() {
    let min = Number(minInput.value), sec = Number(secInput.value) //get time from input
    countdown(min, sec) //start countdown
}

function countdown(min, sec) {
    //set time values
    let minute = min * 60
    let second = sec
    let duration = minute + second
    let timer = duration
    let minutes, seconds

    //start countdown
    intervalId = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10)

        seconds = seconds < 10 ? "0" + seconds : seconds

        display.innerText = minutes + ":" + seconds

        //when countdown is done
        if (--timer < 0) {
            display.innerText = "TIME'S UP"
            clearInterval(intervalId)
        }
    }, 1000)
}

function stopTimer() {
    let currentTime = display.innerText.split(":")
    if(currentTime[0] == '0' && currentTime[1] == '00') { //empty values if time is 0
        minInput.value = ""
        secInput.value = ""
    }
    else { //set input to stopped time
        minInput.value = Number(currentTime[0])
        secInput.value = Number(currentTime[1])
    }
    clearInterval(intervalId) //stop countdown
}

function resetTimer() {
    //reset all values
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