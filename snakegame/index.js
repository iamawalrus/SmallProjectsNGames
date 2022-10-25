
function init(){
    canvas=document.getElementById("bg");
    W = H = canvas.width = canvas.height =  1000;
    pen=canvas.getContext('2d');
    cs=50;
    score=0;
    gameOver=false;
    trophy=new Image();
    trophy.src="images/trophy.png"
    food_img  =new Image();
    food_img.src="images/apple.png"
    food=getRandomfood(),
    snake={
    initlen:5,
    color:"blue",
    cells:[],
    direction:"right",
    speed:10,
    
    
    createSnake:function(){
        for(i=this.initlen;i>=0;i--){
            this.cells.push({x:i,y:0});
        }
    },
    drawSnake: function()
    {
        for(var i=0;i<this.cells.length;i++){
            pen.fillStyle=this.color
            pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
        }
    },
    
    updateSnake: function(){
        console.log("it is getting  updated according to the direction" );
        var headX=this.cells[0].x;
        var headY=this.cells[0].y;
        
        if(headX==food.x && headY==food.y){
            console.log("food eaten" );
            food=getRandomfood();
            score++;
        }
        else{
            this.cells.pop(); 
        }
        
    var NextX,NextY;
    if(this.direction=="right"){
        NextX=headX+1;
        NextY=headY;
    }
    else if(this.direction=="left"){
        NextX=headX-1;
        NextY=headY;
    }else if(this.direction=="down"){
        NextX=headX;
        NextY=headY+1;
    }
    else{
        NextX=headX;
        NextY=headY-1;
    }
       
        this.cells.unshift({x:NextX,y:NextY})
    
    var lastx=Math.round(W/cs);
    var lasty=Math.round(H/cs);
    
    if(this.cells[0].y<0||this.cells[0].x<0 ||this.cells[0].x>lastx || this.cells[0].y>lasty){
        gameOver=true;
    }
    
    }
    
    }
    
    snake.createSnake();
    //Add event listener
    
    function keypressed(e){
        if(e.key==="ArrowRight"){
             snake.direction="right";
        }
        else if(e.key=="ArrowLeft"){
         snake.direction="left";
        }
        else if(e.key=="ArrowDown"){
         snake.direction="down";
        }else{
         snake.direction="up";
        }
     
     }
        document.addEventListener('keydown',keypressed)
    
    
    };
    
    
    
    function draw(){
        //clear rect
        pen.clearRect(0,0,W,H);
        snake.drawSnake();
        pen.fillStyle=food.color
        pen.drawImage(trophy,21,22,cs,cs)
        pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
        pen.fillStyle="blue";
        pen.font="20px  Roboto"
        pen.fillText(score,42,42)
    }
    
    function getRandomfood(){
    var foodx=Math.round(Math.random()*(W-cs)/cs);
    var foody=Math.round(Math.random()*(H-cs)/cs);
    
    var food ={
        x:foodx,
        y:foody,
        color:"red",
    }
    return food;
    }
    
    function update(){
    snake.updateSnake();
    
    
    
    }
    
    function gameloop(){
        if(gameOver==true){
    
    
            clearInterval(f);
    
            alert("GameOver");
        }
    draw();
    update();
    }
    
    init()
    var f=setInterval(gameloop,100)