const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig2;
var backgroundImg,platform;
var bird, slingShot;
var canvas;
var gameState = "onSling";
var score = 0;
function preload() {
    backgroundImg = loadImage("Sprites/bg.png");
    getBackGround();
}

function setup(){
    canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig2 = new Pig(810,210);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});

    
}

function draw(){
    background(backgroundImg);
    Engine.update(engine);
    //strokeWeight(4);
    textSize(35);
    text("score: "+score+"\n\nUwU",width-300,50);

    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig2.display();
    pig2.score();


    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();


}

function mouseDragged(){
    if (gameState !== "launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState="launched";
}
function keyPressed(){
    if(keyCode  === 32){
        slingshot.attach(bird.body);
        gameState="onSling";
    }
}

async function getBackGround(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/America/Mexico_City");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    if(hour > 7 && hour < 20){
        backgroundImg = loadImage("Sprites/bg.png");
    }
    else{
        backgroundImg = loadImage("Sprites/bg2.jpg");
    }
} 