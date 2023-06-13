var playing=false;
var score;
var action;
var timeremaining;
var crtans;
//if we click  on the reset or start 
document.getElementById("startreset").onclick=function(){
 //if we are playing
 if(playing==true){
        location.reload();//reload page
 }
 else{// if we are not playing

      //change mode to playing
      playing=true;
      //set score to 0
      score=0;
      document.getElementById("scorevalue").innerHTML=score;
      //show countdown box
      show("time");
      timeremaining=60;
      document.getElementById("timeval").innerHTML=timeremaining;
      //hide game over box
      hide("gameover");
       //change button to reset
       document.getElementById("startreset").innerHTML="Reset Game"

       //start countdown
       startCountdown();
       //generate a quuestion
       generateQA();

 }
}
for(i=1;i<5;i++){
    //clicking on answer box
      document.getElementById("b"+i).onclick=function(){
          //check if we are playing
          if(playing==true){
            if(this.innerHTML==crtans){    //this ==>refer to element we clicked
              //correct ans                     it can be used instead of   document.getElementById("b1")
              //so increment score by 1
              score+=1;
              document.getElementById("scorevalue").innerHTML=score;
              hide("try");
              show("crt");
              setTimeout(function(){
                    hide("crt");
              },1000);
              //generate  new ques
              generateQA();
            }
            else{

              //wrong answer
              hide("crt");
              show("try");
              setTimeout(function(){
                    hide("try");
              },1000);
            }
          }
      }  
    
    }  
       //reduce time by 1 sec using loop

       //time left?
       //yes==>continue
       //no==>game over
   
    //generate new ques

//if we click on answer box
    //if we are playing
       //correct?
         //yes
            //show correct ans box for 1 sec
            //generate new ques
        //no
          //show try again box for 1 sec
//functions

//start countdown

function startCountdown(){
   action=setInterval(function(){
      timeremaining-=1;
      document.getElementById("timeval").innerHTML=timeremaining;
      if(timeremaining==0){
        //gameover
        stopCountdown();
        show("gameover");
        document.getElementById("gameover").innerHTML="<p>Game over</p><p>Your score is "+ score+"</p>"
        hide("time");
        hide("try");
        hide("crt");
        playing=false;
        document.getElementById("startreset").innerHTML="Start Game";
      }
   },1000);

}
//stop counter
function stopCountdown(){
  clearInterval(action);
}

//hide an element
function hide(ID){
  document.getElementById(ID).style.display="none";
}
//show an element
function show(ID){
  document.getElementById(ID).style.display="block";
}
//generate question and multiple choices
function generateQA(){
        var x=1+Math.round(Math.random()*9);
        var y=1+Math.round(Math.random()*9);
        crtans=x*y;
        document.getElementById("qb").innerHTML=x+"X"+y;
        var correctpos=1+Math.round(Math.random()*3);
        //this fills any one of the four boxes with crt ans
        document.getElementById("b"+correctpos).innerHTML=crtans;
        //fill others with wrong ans
        var ans=[crtans];
        for(i=1;i<5;i++){
          if(i!=correctpos){
                var wrgans;
              do{wrgans=  ((1+Math.round(Math.random()*9))*(1+Math.round(Math.random()*9))) ;
              }  while(ans.indexOf(wrgans)>-1);
                
                document.getElementById("b"+i).innerHTML=wrgans;
                ans.push(wrgans);
              }
        }
}