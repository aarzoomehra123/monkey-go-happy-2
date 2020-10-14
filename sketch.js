
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstaclesGroup
var score
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
 ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
//to reset ground
  ground.x = ground.width/2;
  console.log(ground.x);

  obstaclesGroup = new Group();
  foodGroup = new Group();
}

function draw() {
  
  //survival time
  background(180);
   stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival time: "+ survivalTime, 100,50);
  
 ground.velocityX = -4;

  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
   
  if(obstaclesGroup.isTouching(monkey)){
    //foodGroup.destroyEach();
    foodGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    //obstaclesGroup.destroyEach();
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    monkey.velocityX = 0;
    
    //monkey.addAnimation("sprite_0.png");
    
    }
  
   monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground);
  
  spawnFood();
  
  spawnObstacles();

  
drawSprites();
}

function spawnFood()
{
  if (frameCount % 80 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = - 200;
    
    //add each food to the group
    foodGroup.add(banana);
 
  }
  }

function spawnObstacles(){
//to make obstacle appear after 300 frames
  if (frameCount % 300 === 0){
   obstacle = createSprite(600,313,10,40);
   obstacle.velocityX = - 4;

 obstacle.addImage(obstacleImage);
              
  //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = - 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}