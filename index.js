var obsticaleLane = (Math.random() * 10) % 3;
var SPEED = 50;
var moveIntervalId = null;
var speedIntervalId = null;
function getObstacleLane(){
      console.log(parseInt(Math.random() * 10) % 3 );
}

function handleKey(e){
    if(e.keyCode === 39){
        resetMoveInterval();
        moveCarRight();
        return
    }
    if(e.keyCode === 37){
        resetMoveInterval();
        moveCarLeft();
        return
    }

    if(e.keyCode == 40){
        resetSpeed(SPEED+5);
        return
    }

    if(e.keyCode == 38){
        resetSpeed(SPEED-5);
        return
    }

}

var elemA = document.getElementById("spotA");
var elemB = document.getElementById("spotB");
var obstacles =document.getElementsByClassName("obstacle");

  var pos = 0;

  initSeperatorSpots(elemA)
  initSeperatorSpots(elemB)

  function frame() {
    if (pos == 10) {
      pos =0;
    } else {
      pos++;
      animateSeperatorSpots(pos);
    }
  }

function initSeperatorSpots(elm){
    for(var i = 1; i<11; i++){
        var cloneEl = elm.cloneNode();
        cloneEl.id = cloneEl.id+i;
        cloneEl.style.top = (i *10) + "vh";
        elm.parentElement.appendChild(cloneEl);
    }
}

function animateSeperatorSpots(position){
      var els = document.getElementsByClassName('spots');
      for(var i=0; i<els.length;i++){
          var elNewPos = (i%11) * 10 + position -4;
          els[i].style.top = elNewPos + "vh";
      }
 }

function moveCarRight(){
    var els = document.getElementById('player');
    var currentPostion = parseInt(els.style.left || 0);
    if(currentPostion < 10){
        carMoveAnimation(els,11);
        return;
    }
    if(currentPostion < 20){
        carMoveAnimation(els,21);
        return;
    }
}

function moveCarLeft(){
    var els = document.getElementById('player');
    var currentPostion = parseInt(els.style.left || 0);
    if(currentPostion > 20){
        carMoveAnimation(els,11);
      return;
    }
    if(currentPostion > 10){
        carMoveAnimation(els,1);
        return;
    }
}

function carMoveAnimation(els, toPostion){
      var currentPostion = parseFloat(els.style.left || 0);
      var delta = currentPostion > toPostion ? -0.5:0.5;
      moveIntervalId = moveIntervalId == null?setInterval(function(){
            currentPostion = parseFloat(els.style.left || 0);
            if(currentPostion == toPostion){
              resetMoveInterval();
              return
            }
            els.style.left = (currentPostion + delta) + "vw";
      }, parseInt(SPEED*0.5)) :moveIntervalId;
}

function resetMoveInterval(){
    clearInterval(moveIntervalId);
    moveIntervalId = null;
}

function resetSpeed(speed){
    clearInterval(speedIntervalId);
    SPEED =speed;
    console.log(SPEED);
    speedIntervalId = setInterval(frame, SPEED);
}


function oponentMoveAnimation(el,lane){
    var cloneEl = el.cloneNode(true);

    cloneEl.id = cloneEl.id+Date.now();
    el.parentElement.appendChild(cloneEl);

      var pos = 0;
      var oponentMoveIntervalId = setInterval(function () {
          pos += 0.5;
          cloneEl.style.position="absolute";
          cloneEl.style.top = pos + "vh";
          cloneEl.style.left = lane;
          cloneEl.style.zIndex = Date.now() % 1000
          if(pos >110){
              cloneEl.parentElement.removeChild(cloneEl);
              clearInterval(oponentMoveIntervalId);
          }
      }, SPEED);
}

function genetateOponent() {
    var lanes = [
        "5vw",
        "15vw",
        "25vw"
    ]
    oponentMoveAnimation(obstacles[parseInt((Math.random() * 100)) % obstacles.length], lanes[parseInt((Math.random() * 100)) % lanes.length])
}