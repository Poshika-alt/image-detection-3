var img="";
var status="";
var objects=[];

function preload(){
img=loadImage("art 1.jpg");

}

function setup(){
canvas=createCanvas(640,420);
canvas.center();
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "status:Detecting Objects";
}

function modelLoaded(){
    console.log('Model Loaded!');
}


function gotResult(error, results) {
    if (error) {
        console.log(error);

    } else {
        console.log(results);
        objects = results;
    }

}
function draw(){
    image(img,0,0,640,420)

    fill("BLACK");
    text("Brushes",280,10);
    textSize(15);
    noFill();
    rect(280,0,120,190);

    if (status != "") {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status :Object detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects are:"+objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

