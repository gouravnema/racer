var obsticaleLane = (Math.random() * 10) % 3;
var SPEED = 50;
var flag=false;
var moveIntervalId = null;
var speedIntervalId = null;
var generatecarId=null;

function getObstacleLane()
        {
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

function resetSpeed(speed)
    {
      clearInterval(speedIntervalId);
      SPEED =speed;
      console.log(SPEED);
      speedIntervalId = setInterval(frame, SPEED);
      clearInterval(generatecarId);                               
      if(SPEED>=35 && SPEED <=45){
      generatecarId=setInterval(genetateOponent,SPEED*100);      /*checking if the speed is in this particular range then the setInterval method is called 
                                                                and generateOponent fxn is passed which will randomly generate cars on random lanes.
                                                                second argument is passed in reference with the speed so as to maintain the interval of 
                                                                generated cars accordingly with speed*/                          
    }
else if(SPEED>=25 && SPEED<35)
    {
      generatecarId=setInterval(genetateOponent,SPEED*75);
    }
else if(SPEED>=5 && SPEED<25)
    {
      generatecarId=setInterval(genetateOponent,SPEED*80);
    }
else if(SPEED<5)
    {
      generatecarId=setInterval(genetateOponent,300);          //as there is no threshold value of speed that we increase so if speed is below 5  then interval
                                                             //is called after every 300 milliseconds.
    }
else
    {
      generatecarId=setInterval(genetateOponent,SPEED*100);   // this condition is written so as to handle the event like if a user starts the game by a down
                                                            // arrow key.            
    }
}

function oponentMoveAnimation(el,lane){
    var cloneEl = el.cloneNode(true);
    cloneEl.id = cloneEl.id+Date.now();
    //console.log("running");
    el.parentElement.appendChild(cloneEl);

      var pos = 0;
      var oponentMoveIntervalId = setInterval(function () {
          pos += 0.5;
          cloneEl.style.position="absolute";
          cloneEl.style.top = pos + "vh";
          cloneEl.style.left = lane;
          cloneEl.style.zIndex = Date.now() % 1000
          var id_of_car = document.getElementById('player');
          var car_currentPostion = parseInt(id_of_car.style.left || 1);    //here the by default value of car_currentposition is changed to 1 insted of 0
         //console.log("car pos"+car_currentPostion);                     //to handle the crash event in case user just starts the game and do not move the car     
         // console.log("pos"+pos);

          //console.log(lane);
          if(car_currentPostion==11 && lane=="15vw" && pos==75)          //These if else statements are written to handle the crash event if the above 
          {                                                             //contition satisfy crash will occur and all the interval will close    
                console.log("crash occured");
                cloneEl.parentElement.removeChild(cloneEl);
                clearInterval(oponentMoveIntervalId);
                oponentMoveIntervalId=null;
                reset_intervals();
                flag=true; 
                alert("GAME OVER");
                window.location.reload();
                
           }
          else if(car_currentPostion==1 && lane=="5vw" && pos==75)
           {
                console.log("crash occured");
                cloneEl.parentElement.removeChild(cloneEl);
                clearInterval(oponentMoveIntervalId);
                oponentMoveIntervalId=null;
                reset_intervals();
                flag=true; 
                alert("GAME OVER");
                window.location.reload();
                
            }

           else if(car_currentPostion==21 && lane=="25vw" && pos==75)
            {
                console.log("crash occured");
                cloneEl.parentElement.removeChild(cloneEl);
                clearInterval(oponentMoveIntervalId);
                oponentMoveIntervalId=null;
                reset_intervals();
                flag=true;
                alert("GAME OVER");
                window.location.reload();
                
            }
              
           else if(flag)
              {
                console.log("executed");
                clearInterval(oponentMoveIntervalId);
                oponentMoveIntervalId=null;
                reset_intervals();
              }


           else if(pos >110){
              cloneEl.parentElement.removeChild(cloneEl);
              clearInterval(oponentMoveIntervalId);
          }
      }, SPEED);

return;
}

function reset_intervals()
{
    clearInterval(speedIntervalId);
    speedIntervalId=null;
    clearInterval(generatecarId);  
    generatecarId=null;
}

function genetateOponent() {
    var lanes = [
        "5vw",
        "15vw",
        "25vw"
    ]
    oponentMoveAnimation(obstacles[parseInt((Math.random() * 100)) % obstacles.length], lanes[parseInt((Math.random() * 100)) % lanes.length])
}
