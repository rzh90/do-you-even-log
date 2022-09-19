const startBtn = document.querySelector("#start")
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
}