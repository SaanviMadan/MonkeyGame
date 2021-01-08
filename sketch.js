var monkey;
var ground;
var bananasGroup;
var obstaclesGroup;
var monkeyRunning;
var groundImage;
var banana;
var obstacle;
var survivalTime;
var score;

function preload(){
monkeyRunning=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
bananaImage=loadImage("banana.png");
obstacleImage=loadImage("obstacle.png");
}

function setup() {
  
createCanvas(620,400);

survivalTime=0;
score=0;

monkey=createSprite(40,340,10,10);
monkey.addAnimation("moving", monkeyRunning);
monkey.scale=0.1
  
bananasGroup=new Group();
obstaclesGroup=new Group();

ground=createSprite(450,370,100000,10);
ground.velocityX=-4;
  

console.log(monkey.y); 
}

function draw() {


background("pink");
console.log(frameCount);
console.log(frameRate());
stroke("white");
textSize(20);
fill("white");
text("score :"+score,450,50);
  
stroke("black");
textSize(20);
fill("black");
survivalTime=Math.ceil(frameCount/frameRate());
text("survivalTime :"+survivalTime,100,50);
  
if(bananasGroup.isTouching(monkey)){
bananasGroup.destroyEach();
score=score+1;
}
  
if(obstaclesGroup.isTouching(monkey)){
ground.velocityX = 0;
monkey.velocityY = 0;
obstaclesGroup.setVelocityXEach(0);
bananasGroup.setVelocityXEach(0);
obstaclesGroup.setLifetimeEach(-1);
bananasGroup.setLifetimeEach(-1);
}

if(ground.x<0) {
ground.x=ground.width/2;
}
  
if(keyDown("space")){
monkey.velocityY=-15;

}
monkey.velocityY = monkey.velocityY + 0.8;  
  
monkey.collide(ground);

food();
obstacles();
 drawSprites ();  
}

function food(){
if(World.frameCount%80===0){
banana=createSprite(23,100,10,10);
banana.addImage(bananaImage);
banana.scale=0.09;
banana.y=random(120,200);
banana.x=random(40,580);
banana.velocityX=-(4+score/5);
banana.lifetime=280;
bananasGroup.add(banana);
monkey.depth = banana.depth+1;
}
}

function obstacles(){
if(World.frameCount%300===0){
obstacle=createSprite(800,350,10,40);
obstacle.velocityX=-(4+score/2);
obstacle.addImage(obstacleImage);
obstacle.scale=0.15;
obstacle.lifetime=200;
obstaclesGroup.add(obstacle);
}
}  
