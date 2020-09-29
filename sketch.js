var towerImg, tower;
var doorImg, door,doorGrp;
var climberImg, climber,climberGrp;
var ghost, ghostImg;
var invisibleBlock, invisibleBlockGrp;
var gameState="play";
var score=0;

function preload()
{
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
}

function setup()
{
  createCanvas(windowWidth,windowHeight);
  
  //Create Tower
  tower = createSprite(300,300,600,600);
  tower.addImage('towerImage',towerImg);
  
  //Create Ghost
  ghost = createSprite(250,100,10,10);
  ghost.addImage("ghostImage",ghostImg);
  ghost.scale=0.3 ;
  ghost.setCollider("rectangle", 0, 15, ghostImg.width,ghostImg.height);
  ghost.debug = true;

  doorGrp = new Group();
  climberGrp = new Group();
  invisibleBlockGrp = new Group();
}

function draw()
{
  background(0);
  stroke("yellow");
  fill("yellow");
  
  if(gameState === "play")
  {
    score = score + Math.round(getFrameRate()/60);
    
    //Move tower vertically and reset tower image
    tower.velocityY = 1;
   // console.log(tower.y);
    if(tower.y > height)
    {
      tower.y = height/2;
    }

    //Jump ghost with space key
    if(keyDown("space"))
    {
      ghost.velocityY = -5;
    }

    //Add gravity to ghost 
    ghost.velocityY = ghost.velocityY + 0.5; 

    //Move ghost with left and right arrow key
    if(keyDown(LEFT_ARROW))
    {
      ghost.x = ghost.x - 3
    }

    if(keyDown(RIGHT_ARROW))
    {
      ghost.x = ghost.x + 3;
    }

    spawnDoor();
  //  spawnClimber();

    if(climberGrp.isTouching(ghost))
    {
      ghost.velocityY = 0; 
    }

    if(invisibleBlockGrp.isTouching(ghost) || ghost.y > height)
    {
      ghost.destroy();
      gameState = "end";
    }
    drawSprites();
  }
  else if(gameState==="end")
  {
    textSize(30);
    text("Game Over", 230,250)
  }
  textSize(20);
  text("Score : "+score, 450,50)
  
}

function spawnDoor()
{
  if(frameCount % 240 === 0)
  {
    door = createSprite(200,50);
    climber = createSprite(200,110);
    invisibleBlock = createSprite(200,115);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
 
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage('doorImage',doorImg);
    climber.addImage('climberImage',climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth +1;
    
    door.lifeTime = 800;
    climber.lifeTime = 800;
    invisibleBlock.lifetime = 800;
    
    invisibleBlock.debug = true;
    doorGrp.add(door);
    climberGrp.add(climber);
    invisibleBlockGrp.add(invisibleBlock);
  }
}

