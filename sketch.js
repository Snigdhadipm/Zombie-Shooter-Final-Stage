var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie1
var fire
var score = 0;
var zombiegroup;
var firegroup;
var gameState = "play"
var restart;
var zombie2;
var restartBtn;
var mute_btn;
var mute_btn2;



function preload() {
shooterImg=loadImage("assets/shooter_1.png")
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombie1Img = loadImage("assets/zombie.png");
  zombie2Img = loadImage("assets/zombie.png");
  zombie3 = loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg")
  bulletImg = loadImage("assets/bullet1.png");
  gun_sound = loadSound("assets/gunsound.mp3");
  background_music = loadSound("assets/backgroundmusic.mp3");
  restartImg = loadImage("assets/reset.png");
  laugh_sound = loadSound("assets/laughsound.wav")
  mute_btn = loadImage("assets/mute.png");

}

function setup() {


  createCanvas(windowWidth, windowHeight);

  background_music.play()

  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.1

 zombiegroup = new Group();
 firegroup = new Group();

  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = false;
  player.setCollider("rectangle", 0, 0, 300, 300)

  restartBtn = createSprite(displayWidth - 850,displayHeight - 550);
  restartBtn.addImage(restartImg);
  restartBtn.scale = 0.1;
  restartBtn.visible = false;
  mute_btn = createImg("mute.png")
  mute_btn.position(450,20)
  mute_btn.size(50,50)
  mute_btn.mouseClicked(mute)
  mute_btn2 = createImg("mute.png")
  mute_btn2.position(700,70)
  mute_btn2.size(50,50)
  mute_btn2.mouseClicked(mute2)


}

function draw() {
  background(0);
  
if(gameState==="play")
{
   if(mousePressedOver(restartBtn)) {
   reset()
   }

  //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30
  }


  //release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {

    player.addImage(shooter_shooting)
  bullet()
  }

  //player goes back to original standing image once we stop pressing the space bar
  else if (keyWentUp("space")) {
    player.addImage(shooterImg)
  }
  if(firegroup.isTouching(zombiegroup))
  {
    zombie1.destroy()
    fire.destroy()
    score++
  }

  if(zombiegroup.isTouching(player))
  {
    gameState = "end";
  }
  zombie()
  drawSprites();
}
if(gameState==="end")
{
  zombiegroup.destroyEach()
  player.destroy();
  restartBtn.visible = true;
  textSize(30);
  fill("yellow");
  text("Game Over",displayWidth - 800,displayHeight - 500);
  background_music.stop()
  laugh_sound.loop();
  laugh_sound.loop = false;
}



  fill(0)
  textSize(30);
 text("score:"+score,displayWidth-900,displayHeight-800);

}

function zombie()
{
  if(frameCount%100===0)
  {

  
  zombie1 = createSprite(random(displayWidth - 200,displayWidth - 900),
  random(displayHeight - 300,displayHeight - 700),
  random(displayHeight - 400,displayHeight - 800), 50, 50);

  zombie1.addImage(zombie1Img);
  zombie1.scale = 0.1;
  zombie1.velocityX = -4
  zombiegroup.add(zombie1);
  }
}

function bullet()
{
  gun_sound.play()
   fire = createSprite(displayWidth - 1090,displayHeight - 335,10,10)
  fire.addImage(bulletImg);
  fire.y = player.y;
  fire.scale = 0.1
  fire.velocityX = 13;
  firegroup.add(fire);
}

function spawnZombieGroup() {
  if(frameCount % 60 === 0) {
    var zombie2 = createSprite(600,height-95,20,30);
    obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    obstacle.velocityX = -(6 + 3*score/30);
  }
}

function reset(){
  if(gameState === "play") {
  restartBtn.visible = false;
  score = 0;
  }
}

function mute()
{
  if(background_music.isPlaying())
  {
   background_music.stop()
  }
  else(
    background_music.play()
  )
}

function mute2()
{
  if(laugh_sound.isPlaying())
  {
   laugh_sound.stop()
  }
  else(
    laugh_sound.play()
  )
}


