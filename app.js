let gameSeq = [];
let userSeq = [];
let scores = [];
let started = false;
let level = 0;

document.addEventListener("keypress", function() {
    if (!started) {
        levelUp();
        started = true;
    }
});

function levelUp() {
    userSeq = [];
    document.querySelector("h3").innerText = `Level ${++level}`;
    let randomColor = getRandomColor(); 
    gameSeq.push(randomColor);
    flashSequence(gameSeq, false);
}

function flashSequence(gameSeq, flashAll) {
    if (flashAll) {
        let time = 300;
        for (let btns of gameSeq) {
            setTimeout(() => {
                flash(btns);
            }, time);
            time += 600;
        }
    } else {
        flash(gameSeq[gameSeq.length - 1]);
    }
}

function getRandomColor() {
    return Math.ceil(Math.random() * 4);
}

function flash(num) {
    let button = document.querySelector(`#button-${num}`);
    button.style.backgroundColor = "white";
    setTimeout(() => {
        button.style.backgroundColor = "";
    }, 300);
}

function btnPressed() {
    let btnNumber = this.id[this.id.length - 1];
    flash(btnNumber);
    userSeq.push(btnNumber);
    checkAnswer(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".button");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPressed);
}

function checkAnswer(index) {
    if(userSeq[index] == gameSeq[index]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 700);
        }
    } else {
        scores.push(level - 1);
        let highestScore = scores.reduce((highest, current) => (highest > current ? highest : current));
        document.querySelector("h3").innerHTML = `Game Over! You score was <b>${level - 1}</b> <br> Your highest score is <b>${highestScore}</b> <br> Press any key to continue`;
        bodyFlash();
        reset();
    }
}

function bodyFlash() {
    let body = document.querySelector("body");
    body.style.backgroundColor = "red";
    setTimeout(() => {
        body.style.backgroundColor = "";
    }, 200);
}

function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}