const game_board=document.querySelector("#game-board");
const scorebox=document.querySelector("#eat");
let score=0;


let Snake_speed=1;
let lasttime=0;
let inputdirection={x:0,y:0};
let lastinputdirection=inputdirection;
let gameover =false;



let expand=1;
const Snake_body=[
    {x:10 , y:10}
    // {x:11 , y:10},
    // {x:12 , y:10},
]

function paint(currenttime){
    window.requestAnimationFrame(paint);
    let newtime=(currenttime-lasttime)/1000;
    if(newtime <1/Snake_speed) return;
    lasttime=currenttime;

 if(gameover !=true){
    upadte();
    draw();
 }
}

window.requestAnimationFrame(paint);

let food= getfoodrandomposition();


function draw(){
    drawsnake();
    drawfood();
}

function upadte(){
    snakemove();
    snakeeatfood();
    game_board.innerHTML=" ";
}



function drawsnake(){
   Snake_body.forEach((segment,index)=>{
let SnakeElement=document.createElement("div")
    SnakeElement.style.gridColumnStart=segment.x;
    SnakeElement.style.gridRowStart=segment.y;
   
    if(index==0){
        SnakeElement.classList.add("snake")
    }
    else{
        SnakeElement.classList.add("snakebody")
    }
    game_board.appendChild(SnakeElement);

}
)};
function snakemove(){
    inputdirection=getinputdirection();

    for(i=Snake_body.length-2;i>=0;i--){
        Snake_body[i+1]={...Snake_body[i]}
    }
    Snake_body[0].x+=inputdirection.x;
    Snake_body[0].y+=inputdirection.y;

    checkgameover();
}


function getinputdirection(){
    window.addEventListener("keydown",e=>{

        // console.log(e.key)
        switch(e.key){
            case "ArrowUp" :
            if (lastinputdirection.y==1) break;   
            inputdirection={x:0 ,y:-1}
            break;
            case "ArrowDown" :
                if (lastinputdirection.y==-1) break;  
                 inputdirection={x:0, y:1}
            break;
            case "ArrowRight": 
            if (lastinputdirection.x==-1) break;  
            inputdirection={x:1,y:0}
            break;
            case "ArrowLeft": 
            if (lastinputdirection.x==1) break;  
            inputdirection={x:-1,y:0}
            break;

            default:inputdirection={x:0,y:0}

        }
        })
        lastinputdirection=inputdirection
        return inputdirection;
    }

function drawfood(){
    let foodelement=document.createElement("div")
    foodelement.style.gridColumnStart=food.x;
    foodelement.style.gridRowStart=food.y;
    foodelement.classList.add("food");
    game_board.appendChild(foodelement);
}

function snakeeatfood(){

    if(iseat()){
        score+=10;
        scorebox.innerHTML=score;
        food=getfoodrandomposition();
        Snake_speed ++;
        expandsnake(); 
    }
}

function iseat(){
    return Snake_body[0].x===food.x && Snake_body[0].y===food.y;

}
 function getfoodrandomposition(){
 let a,b, mycondition=true;

 while(mycondition){
 a= Math.ceil(Math.random()*16)
 b= Math.ceil(Math.random()*16)
 
 mycondition=Snake_body.some(segment=>{
    return segment.x===a && segment.y===b
 })
return {x:a,y:b}
}
}
 
 function expandsnake(){
    for(i=0;i<expand;i++){
        Snake_body.push(Snake_body[Snake_body.length-1]);
    }
 }

 function checkgameover(){
    if(snakeoutofgrid()||snakeintersection()){
        
        alert("GAME OVER YOU ARE A LOSSER");
        gameover =true;
        location.reload();
    }
 }

 function snakeoutofgrid(){
    return (Snake_body[0].x<0 || Snake_body[0].x>16 ||Snake_body[0].y<0 || Snake_body[0].y>16)
    
 }

 function snakeintersection(){
  for(i=1;i<Snake_body.length;i++){
    if(Snake_body[0].x===Snake_body[i].x && Snake_body[0].y ===Snake_body[i].y){
        return true;
    }
  }
 }