var obsticaleLane = (Math.random() * 10) % 3;
var Speed = 50;
var flag=false;
var speedFortyFive=45;
var speedThirtyFive=35;
var speedTwentyFive=25;
var speedFive=5;
var posSeventySeven=77;
var posNintyThree=93;
var posEleven=11;
var posEight=8;
var posSeven=7;
var posOne=1;;
var posTwentyOne=21;
var posTen=10;
var posEighteen=18;
var posSeventeen=17;
var posTwenty=20;
var facSeventyFive=75;
var facEighty=80;
var facHundred=100;
var facThreeHundred=300;
var posTwelve=12;
var leftLane="5vw";
var middleLane="15vw";
var lastLane="25vw";
var moveIntervalId = null;
var speedIntervalId = null;
var generateCarId=null;
var counter=0;
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
        resetSpeed(Speed+5);
        return
    }

    if(e.keyCode == 38){
        resetSpeed(Speed-5);
        return
    }

}

var elemA = document.getElementById("spotA");
var elemB = document.getElementById("spotB");
var obstacles =document.getElementsByClassName("obstacle");

  var pos = 0;

  initSeperatorSpots(elemA);
  initSeperatorSpots(elemB);

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
      }, parseInt(Speed*0.5)) :moveIntervalId;
}

function resetMoveInterval(){
    clearInterval(moveIntervalId);
    moveIntervalId = null;
}

function resetSpeed(s)
    {
      clearInterval(speedIntervalId);
      Speed =s;
      console.log(Speed);
      speedIntervalId = setInterval(frame, Speed);
      clearInterval(generateCarId);                               
      if(Speed>=speedTwentyFive && Speed <=speedFortyFive){
      generateCarId=setInterval(genetateOponent,Speed*facHundred);      /*checking if the speed is in this particular range then the setInterval method is called 
                                                                and generateOponent fxn is passed which will randomly generate cars on random lanes.
                                                                second argument is passed in reference with the speed so as to maintain the interval of 
                                                                generated cars accordingly with speed*/                          
    }
else if(Speed>=speedTwentyFive && Speed<speedThirtyFive)
    {
      generateCarId=setInterval(genetateOponent,Speed*facSeventyFive);
    }
else if(Speed>=speedFive && Speed<speedTwentyFive)
    {
      generateCarId=setInterval(genetateOponent,Speed*facEighty);
    }
else if(Speed<speedFive)
    {
      generateCarId=setInterval(genetateOponent,facThreeHundred);         //as there is no threshold value of speed that we increase so if speed is below 5  then interval
                                                                          //is called after every 300 milliseconds.
    }
else
    {
      generateCarId=setInterval(genetateOponent,Speed*facHundred);  // this condition is written so as to handle the event like if a user starts the game by a down                                                        // arrow key.            
    }
}

function oponentMoveAnimation(el,lane){
    ++counter;
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
          var idOfCar = document.getElementById('player');
          var carCurrentPostion = parseInt(idOfCar.style.left || 1);    //here the by default value of car_currentposition is changed to 1 insted of 0
                                                                        //to handle the crash event in case user just starts the game and do not move the car

          var hasCrachOccurred= crashOccurred(carCurrentPostion,lane,pos); //calls a method crashOccurred which check the events when crash can occur.
            if(hasCrachOccurred)
             {
                cloneEl.parentElement.removeChild(cloneEl);
                clearInterval(oponentMoveIntervalId);
                oponentMoveIntervalId=null;
                resetIntervals(); 
             }
             else if(flag)
              { 
                clearInterval(oponentMoveIntervalId);
                oponentMoveIntervalId=null;
                var reset=confirm("crash occurred");
                if(reset)
                {
                  resetGame(cloneEl);
                  return;
                 //resetGame function is called that initialise the game;
                }
               }                  
             else if(pos >110)
             {
              cloneEl.parentElement.removeChild(cloneEl);
              clearInterval(oponentMoveIntervalId);
             }
      }, Speed);

return;
}

function resetIntervals()
{

    clearInterval(speedIntervalId);
    speedIntervalId=null;
    clearInterval(generateCarId);  
    generateCarId=null;
}

function resetGame(cloneEl)                        //this function is used to initialise the game
{
cloneEl.parentElement.removeChild(cloneEl);
resetSpeed(50);
flag=false;
resetIntervals();
}

function crashOccurred(carCurrentPostion,lane,pos)
{
    //These if else statements are written to handle the crash event if the above
    //contition satisfy crash will occur and all the interval will close
    if(carCurrentPostion==posEleven && lane==middleLane && pos==posSeventySeven)           
        {                                                                    
         flag=true;
          return true; 
        }
    else if(carCurrentPostion<=posSeven && lane==leftLane && (pos>=posSeventySeven && pos<=posNintyThree)) 
        {       
         flag=true; 
         return true;
        } 
    else if((carCurrentPostion>=posSeven &&carCurrentPostion<=posTen) && lane==middleLane && (pos>=posSeventySeven && pos<=posNintyThree)) 
        {
         flag=true; 
         return true;
        } 
    else if((carCurrentPostion<=posEighteen &&carCurrentPostion>=posTwelve) && lane==middleLane && (pos>=posSeventySeven && pos<=posNintyThree)) 
        {
         flag=true;
         return true;;
        } 
    else if((carCurrentPostion>=posSeventeen &&carCurrentPostion<=posTwenty) && lane==lastLane && (pos>=posSeventySeven && pos<=posNintyThree)) 
        {
         flag=true;
         return true;
        }
            
    else if(carCurrentPostion==posOne && lane==leftLane && pos==posSeventySeven)
        {
         flag=true;
         return true;       
        }

    else if(carCurrentPostion==posTwentyOne && lane==lastLane && pos==posSeventySeven)
        {
         flag=true;
         return true;   
        }
    }                

function genetateOponent() {
    var lanes = [
        "5vw",
        "15vw",
        "25vw"
    ]
    oponentMoveAnimation(obstacles[parseInt((Math.random() * 100)) % obstacles.length], lanes[parseInt((Math.random() * 100)) % lanes.length])
}
