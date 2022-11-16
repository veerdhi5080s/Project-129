song1="";
song2="";
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

song1_status="";
song2_status="";

rightWristX=0;
rightWristY=0;

leftWristX=0;
leftWristY=0;

scoreRight=0;
scoreLeft=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill("red");
    stroke("black");

    if(scoreRight>0.2){
        circle(rightWristX,rightWristY,20);

        song2.stop();

        if(song1_status==false){
            song1.play();
            document.getElementById("song").innerHTML="Playing Taki Taki....";
        }
    }

    if(scoreLeft>0.2){
        circle(leftWristX,leftWristY,20);

        song1.stop();

        if(song2_status==false){
            song2.play();
            document.getElementById("song").innerHTML="Playing Cradle....";
        }
    }
}

function play(){
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}

function modelLoaded(){
    console.log("Model Loaded");
}

function gotPoses(result){
    if(result.length>0);{
        console.log(result);

        rightWristX=result[0].pose.rightWrist.x;
        rightWristY=result[0].pose.rightWrist.y;

        leftWristX=result[0].pose.leftWrist.x;
        leftWristY=result[0].pose.leftWrist.y;

        scoreRight=result[0].pose.keypoints[10].score;
        scoreLeft=result[0].pose.keypoints[9].score;
    }
}

