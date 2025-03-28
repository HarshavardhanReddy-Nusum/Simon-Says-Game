let gameseq = [];
let userseq = [];
high_score = 0;
let btns = ["red","green","yellow","blue"];

let start = false;
let level = 0;

let h2 = document.querySelector('h2');

document.addEventListener("keypress",function() {
    if(start == false) {
        console.log("Game is started");
        start = true;
        levelUp();
    }
});

function btnflash(btn) {
    btn.classList.add('flash');
    setTimeout(function() {
        btn.classList.remove("flash");
    },250);
}

function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    if(level > high_score){
        high_score = level;
        let h3 = document.querySelector('h3');
        h3.innerText = `High score : ${high_score}`;
    }

    let random = Math.floor(Math.random() * 3);
    let randomColr = btns[random];
    let randombtn = document.querySelector(`.${randomColr}`);
    // console.log(random);
    // console.log(randomColr);
    // console.log(randombtn)
    gameseq.push(randomColr);
    btnflash(randombtn);
}

function checkAns(idx) {
    if(userseq[idx] === gameseq[idx]) {
        if(userseq.length == gameseq.length){
            setTimeout(levelUp,1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br>Press any key to start.`;
        let body = document.querySelector('body');
        body.style.backgroundColor = "red";
        setTimeout(function(){
            body.style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress() {
    
    let btn = this;
    btnflash(btn);

    usercolor = btn.getAttribute('id');
    userseq.push(usercolor);

    checkAns(userseq.length-1);
}

let allbtns = document.querySelectorAll(".btn");

for(btn of allbtns) {
    btn.addEventListener("click",btnPress);
}

function reset() {
    start = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
