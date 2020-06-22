//Global Variables
var monkey, monkey_image, monkeyRunning;
var stone, stone_image;
var ground, ground_image;
var banana, banana_image;
var count = 0;
var survivalTime = 0;
var back, back2, back3, backImage;

function preload() {
  monkey_image = loadImage("Monkey_01.png")
  monkeyRunning =                                                      loadImage("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  stone_image = loadImage("stone.png")
  banana_image = loadImage("Banana.png")
  ground_image = loadImage("ground.jpg")
  backImage = loadImage("jungle.jpg")
}


function setup() {
  createCanvas(800, 400);
  monkey = createSprite(100, 315, 20, 50);
  monkey.addImage(monkeyRunning);
  monkey.scale = 0.1;
  monkey.velocityY = 4
  back = createSprite(400,200,800,400)
  back.addImage(backImage);
  back.velocityX = -4;
  monkey.depth = back.depth + 1;
   back3 = createSprite(1200,200,800,400)
  back3.addImage(backImage);
  back3.velocityX = -4;
  monkey.depth = back3.depth + 1;
  
  bananaGroup = createGroup();
  rockGroup = createGroup();

}

function draw() {
  background(255);
  var ground = createSprite(400, 350, 800, 10);
  ground.visible = false;
  monkey.collide(ground)
  
  if (keyDown("space") && monkey.y >= 200) {
    monkey.velocityY = -15;
    

  }

  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  console.log(World.frameCount);



  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    text("Score: " + count, 500, 50);
    count = count + 1;
    monkey.scale = monkey.scale + 0.05;
  }

  text("Score: " + count, 500, 50);


  if (World.frameCount % 300 === 0) {
    rock = createSprite(750, 330, 15, 15)
    rock.addImage(stone_image)
    rock.velocityX = -4;
    rock.scale = 0.1
    rockGroup.add(rock)
  }
  if (World.frameCount % 79 === 0) {
    var banana = createSprite(800, 320, 20, 20);
    banana.addImage(banana_image)
    banana.scale = 0.1
    banana.velocityX = -4
    bananaGroup.add(banana);
  }
  survivalTime = Math.round(frameCount / frameRate());
  text("Survival Time: " + survivalTime, 100, 50)

  if (World.frameCount % 232 === 0) {
    back2 = createSprite(1200, 200, 800, 400);
  back2.addImage(backImage);
  back2.velocityX = -4;
  monkey.depth = back2.depth + 1;
  rockGroup.depth = back2.depth + 1;
  }

  if (monkey.collide(rockGroup)) {
    monkey.scale = monkey.scale - 0.05;
    monkey.x = 100;
    monkey.velocityX = 0;
    rockGroup.destroyEach();
    count = count - 1;

  }
  
 
  survivalTime = Math.round(frameCount / frameRate());
  text("Survival Time: " + survivalTime, 100, 50)
  drawSprites();
}