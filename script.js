"use strict"

const btnRock = document.querySelector(".btn-num1");
const btnPaper = document.querySelector(".btn-num2");
const btnScissors = document.querySelector(".btn-num3");
const image = document.getElementById("imageshow");
const image_two = document.getElementById("imageshowtwo");
const winnerText = document.querySelector(".winnertext");
const overlay = document.querySelector(".overlay");
const message = document.querySelector('.player-message');
const cellDivs = document.querySelectorAll('.cell');
const btnReset = document.querySelector('.btn-reset');
const btnAgain = document.querySelector('.btn-again');
let score = document.getElementById('score--0');
let score1 = document.getElementById('score--1');
let audio = document.getElementById('audio');



let imgNum ;
let oldScore = 0;
let newScore = 0;
let highScore = 0;


const markHide = function(){
  for (let i = 0; i < cellDivs.length; i++) {
    cellDivs[i].innerHTML = " ";
    }
}

const resetFunc = function(){
    score.innerText = 0;
    score1.innerText = 0;
    newScore=0;
    play();
}

function play(){
  audio.src = "sounds/buttons/button-rein.mp3";
  audio.play();
}

function hover(){
  audio.src = "sounds/buttons/hover.mp3";
  audio.play();
}

function hwon(){
  audio.src = "sounds/buttons/firework.mp3";
  audio.play();
}

function cwon(){
  audio.src = "sounds/buttons/cwon.mp3";
  audio.play();
}

function mark(){
  audio.src = "sounds/buttons/mark.mp3";
  audio.play();
}

const cursorHide = function(){  
    btnRock.disabled = true;
    btnPaper.disabled = true;
    btnScissors.disabled = true;
    btnReset.disabled = true;
    btnAgain.disabled = true;
}

const cursorOpen = function(){  
  btnRock.disabled = false;
  btnPaper.disabled = false;
  btnScissors.disabled = false;
}

const openModal = function () {
  winnerText.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  winnerText.classList.add('hidden');
  overlay.classList.add('hidden');
  markHide() 
  btnReset.disabled = false;
  btnAgain.disabled = false;
  message.textContent = "play agian???..🌀"


};
const scoreChange = function(){
  score1.innerText = Number(score.innerText) + Number(score1.innerText);
    cursorOpen();
    play();
    message.textContent = ` choose rock , paper or scissors..`;
    btnAgain.disabled = true;
}

const hide = function(){
    image.style.display = "none";
    image_two.style.display = "none";
};

hide();

const showNum = function (imgNum) {
    if (imgNum===1) {
      image.src = "icons/rock.png";
    } else if (imgNum===2) {
      image.src = "icons/paper.png";
    } else if (imgNum===3) {
      image.src = "icons/scissors.png";
    }
  };
    

const newPositions = Array.from(document.querySelectorAll('.cell'));
const board = new Board(newPositions);
//const humanPlayer = new HumanPlayer(newPositions);
//const computerPlayer = new ComputerPlayer(board);


function Board(newPositions){

    this.positions = newPositions;
    console.log(this.positions);
    
    
        this.checkForWinner = function(){
        let winner = false;
        const winningCombinations = [
          [0,1,2],
          [3,4,5],
          [6,7,8],
          [0,3,6],
          [1,4,7],
          [2,5,8],
          [0,4,8],
          [2,4,6],
          
        ];
  
        const positions = this.positions;
        winningCombinations.forEach((winningCombo) => {
  
          const pos0InnerText = positions[winningCombo[0]].innerText;
          const pos1InnerText = positions[winningCombo[1]].innerText;
          const pos2InnerText = positions[winningCombo[2]].innerText;
  
          const isWinningcombo = pos0InnerText != '' && pos0InnerText === pos1InnerText && pos1InnerText === pos2InnerText;
  
            if(isWinningcombo) {
  
              winner = true;

            }
        });
  
      return winner;
    }
  };

const textmessage = function(){
  message.textContent = ` choose rock , paper or scissors..`;
};


const ComputerPlayer = function(board){

  const availablePositions = board.positions.filter((p) => p.innerText === '');
  const move = Math.floor(Math.random() * availablePositions.length);
  availablePositions[move].innerText = "O";
  mark();
  for(let i=0;i<cellDivs.length;i++){
    if(cellDivs[i].innerText=== "O"){
      cellDivs[i].style.color = "white";
      cellDivs[i].style.textShadow = "5px 5px  rgba(8, 8, 8, 0.856)";
    }
  }

  textmessage();
  setTimeout(hide,1000);
  if(board.checkForWinner()){
    winnerText.textContent = `COMPUTER WON...😪😪`;
    openModal();
    cwon();
    if(score.innerText > 0){
      newScore -= 5;
      score.innerText = newScore;
    }
    cursorHide();
    btnAgain.addEventListener("click",scoreChange);

  } else {
    setTimeout(cursorOpen,3000);
  } ;

 
};

const HumanPlayer = function(newPositions,board){
  
  const handleEvent = function (el){
    el.target.innerText = 'X';
    for(let i=0;i<cellDivs.length;i++){
      if(cellDivs[i].innerText=== "X"){
        cellDivs[i].style.color = "red";
        cellDivs[i].style.textShadow = "5px 5px  rgba(8, 8, 8, 0.856)";
      }
    }
    
    mark();
    if(board.checkForWinner()){
      winnerText.textContent = `YOU WON...🎉🎉`;
      openModal();
      cursorHide();  
      newScore += 15;
      score.innerText = newScore; 
      hwon();
      btnAgain.addEventListener("click",scoreChange);

    } else {
      setTimeout(cursorOpen,3000);
    } 

    newPositions.forEach( (el =>{el.removeEventListener('click',handleEvent)}));  
  }
    newPositions.forEach( (el =>{el.addEventListener('click',handleEvent)}));   

   

    setTimeout(function(){
      textmessage();
    },3000)
    setTimeout(hide,2000);

  };

 
btnRock.addEventListener("click",function() {

    imgNum =  Math.trunc(Math.random() * 3) + 1;
    showNum(imgNum);
    image.style.display = "inline";
    image_two.src = "icons/rock.png";
    image_two.style.display = "inline";
    cursorHide();
    play();

  
    if(imgNum === 1){
      message.textContent = `it's a tie..go again`;
      setTimeout(hide,1000);
      imgNum = Math.trunc(Math.random() * 3) + 1;
      setTimeout(cursorOpen,2000);
    }
  
    else if(imgNum === 2){
      message.textContent = `computer turn..it is choosing`; 
      setTimeout(function() {
        ComputerPlayer(board);
      },1000);     
    }
   
    else {
      message.textContent = `your turn..tick a box ✒`;
        HumanPlayer(newPositions,board);
    }
    
 });
  
   btnPaper.addEventListener("click",function() {
  
    imgNum =  Math.trunc(Math.random() * 3) + 1;
    showNum(imgNum);
    image.style.display = "inline";
    image_two.src = "icons/paper.png";
    image_two.style.display = "inline";
    cursorHide();
    play();
    
  
    if(imgNum === 1){
      message.textContent = `your turn..tick a box ✒`;
      HumanPlayer(newPositions,board);
    }
  
    else if(imgNum === 2){
      message.textContent = `it's a tie..go again`;
      setTimeout(hide,1000);
      imgNum = Math.trunc(Math.random() * 3) + 1;
      setTimeout(cursorOpen,2000);
    }
   
    else {
      message.textContent = `computer turn..it is choosing`;
      setTimeout(function() {
        ComputerPlayer(board);
      },1000);  
    }
    
  });
  
  btnScissors.addEventListener("click", function() {
  
    imgNum =  Math.trunc(Math.random() * 3) + 1;
    showNum(imgNum);
    image.style.display = "inline";
    image_two.src = "icons/scissors.png";
    image_two.style.display = "inline";
    cursorHide();
    play();
    
  
    if(imgNum === 1){
      message.textContent = `computer turn..it is choosing`;
      setTimeout(function() {
        ComputerPlayer(board);
      },1000);
      
    }
  
    else if(imgNum === 2){
      message.textContent = `your turn..tick a box ✒`;
      HumanPlayer(newPositions,board);
    }
   
    else {
      message.textContent = `it's a tie..go again`;
      setTimeout(hide,1000);
      imgNum = Math.trunc(Math.random() * 3) + 1;
    }
    setTimeout(cursorOpen,2000);
    
  });

  overlay.addEventListener('click', closeModal);
  