var monkeyImg, monkey;

var obstacleImg, obstacleG;

var bgImg, bground, Ground;

var bananaImg, fruitG, banana, obstacle;

var PLAY = 1;
var END = 0;
var lives = 2;
var gameState = PLAY;

var score = 0;

function preload() {

  bananaImg = loadImage("banana.png");

  obstacleImg = loadImage("stone.png");

  monkeyImg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bgImg = loadImage("jungle.png");
}

function setup() {
  createCanvas(550, 400);

  bground = createSprite(250, 200, 1000, 400);

  bground.x = bground.width / 4;
  bground.addImage(bgImg);
  bground.velocityX = -4;
  bground.scale = 0.8;

  monkey = createSprite(50, 340, 20, 20);
  monkey.addAnimation("Monkey", monkeyImg);
  monkey.scale = 0.17

  Ground = createSprite(200, 360, 800, 20);
  Ground.visible = false;

  fruitG = new Group();
  obstacleG = new Group();

  score = 0;
  lives = 2;

}

function draw() {
  background(220);

  drawSprites();

  if (gameState === PLAY) {

    stroke("black");
    textSize(25);
    fill("white");
    text("Score:" + score, 450, 50);


    if (bground.x < 0) {
      bground.x = bground.width / 4;
    }


    if (keyWentDown("space") && monkey.y >= 295) {
      monkey.velocityY = -17;
    }


    monkey.velocityY = monkey.velocityY + 0.7;

    food();

    if (fruitG.isTouching(monkey)) {

      fruitG.destroyEach();
      score = score + 2;
    }

    switch (score) {
      case 10:
        monkey.scale = 0.18;
        break;
      case 20:
        monkey.scale = 0.19;
        break;
      case 30:
        monkey.scale = 0.20;
        break;
      case 40:
        monkey.scale = 0.21;
        break;
      default:
        break;
    }

    obstacles();

    if (obstacleG.isTouching(monkey)) {

      monkey.scale = 0.08;

      obstacleG.destroyEach();

      lives = lives - 1;
    }

    if (lives === 0) {
      gameState = END;
    }
  }


  if (gameState === END) {
    bground.velocityX = 0;
    monkey.velocityY = 0;

    obstacleG.setVelocityXEach(0);
    fruitG.setVelocityXEach(0);

    fruitG.destroyEach();

    stroke("white");
    textSize(50);
    fill("white");
    text("GAME OVER! press R", 45, 200);

    fruitG.setLifetimeEach(-1);
    obstacleG.setLifetimeEach(-1);

    if (keyWentDown("r")) {
      restart();
    }

  }

  monkey.collide(Ground);

}

function food() {
  if (frameCount % 80 === 0) {

    banana = createSprite(550, 200, 20, 20);

    banana.addImage(bananaImg);

    banana.scale = 0.06;

    banana.velocityX = -5;

    banana.y = random(130, 320);

    banana.lifetime = 150;

    banana.setCollider("circle", 0, 100, 450);

    fruitG.add(banana);

  }
}

function obstacles() {
  if (frameCount % 80 === 0) {

    obstacle = createSprite(550, 320, 20, 20);

    obstacle.addImage(obstacleImg);

    obstacle.scale = 0.2;

    obstacle.velocityX = -5;

    obstacle.x = random(500, 600);

    obstacle.lifetime = 150;

    obstacle.setCollider("circle", -20, 20, 220);

    obstacleG.add(obstacle);

  }
}

function restart() {

  gameState = PLAY;

  monkey.scale = 0.17;

  bground.velocityX = -4;

  score = 0;

  lives = 2;

  fruitG.setLifetimeEach(150);

  obstacleG.setLifetimeEach(150);
}