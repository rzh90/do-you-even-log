/* const startBtn = document.querySelector("#start")
let display = document.querySelector("#time")

startBtn.addEventListener("click", startTimer)

function startTimer() {
    let minute = Number(document.getElementById("min").value) * 60
    let second = Number(document.getElementById("sec").value)

    let duration = minute + second
    let timer = duration, minutes, seconds
    
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10)

        seconds = seconds < 10 ? "0" + seconds : seconds

        display.textContent = minutes + ":" + seconds

        if (--timer < 0) {
            timer = duration
        }
    }, 1000)
} */

function calculatePlates() {
    const checkboxes = document.getElementsByName("plates") //get all checkboxes
    const weight = document.getElementById("weight").value //get weight entered
    const weightDisplay = document.getElementById("weight-display") //get closest weight
    const plateDisplay = document.getElementById("plate-display") //get list of weights

    let plates = []

    //clear list of plates
    plateDisplay.innerHTML = ""

    //check if checkbox is checked
    for(let i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked) {
            plates.push(Number(checkboxes[i].value))
        }
    }
    
    let finalPlates = plateCalculator.calculate(weight, {set: plates}) //calculate plates

    //insert plates into list and display them
    for(let plate of finalPlates["plates"]) {
        weightDisplay.innerHTML = `${finalPlates["closestWeight"]} lbs`
        plateDisplay.innerHTML += `<li>${plate["plateWeight"]} lbs x ${plate["qty"]}</li>`
    }

}