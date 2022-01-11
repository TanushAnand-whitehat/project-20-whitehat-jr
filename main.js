prediction1 = "";
prediction2 = "";

Webcam.set ({
    width: 350,
    height: 350,
    image_format : 'png',
    png_quality: 90 
});

cam = document.getElementById("webcam");
Webcam.attach('#webcam');

function takesnapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("resultview").innerHTML = '<img id = "image_click" src = "'+data_uri+'">';
    });
}

console.log('ml5 version', ml5.version);

image_classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Ts2EkhNNh/model.json', modelLoaded);

function modelLoaded() {
console.log("modelLoaded");
}

function speak() {
    speak1 = window.speechSynthesis;
    system_speak = "first prediction is"+prediction1+ "second prediction is"+prediction2;
    text_to_speech = new SpeechSynthesisUtterance(system_speak);
    speak1.speak(text_to_speech);
} 

function getresult() {
    image = document.getElementById("image_click");
    image_classifier.classify(image, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        document.getElementById("prediction1name").innerHTML = results[0].label;
        document.getElementById("prediction2name").innerHTML = results[1].label;
        if(results[0].label == "best") {
            document.getElementById("prediction1gesture").innerHTML = "&#128077;"
        }
        if(results[0].label == "victory") {
            document.getElementById("prediction1gesture").innerHTML = "&#9996;"
        }
        if(results[0].label == "amazing") {
            document.getElementById("prediction1gesture").innerHTML = "&#128076;"
        }
        if(results[1].label == "best") {
            document.getElementById("prediction2gesture").innerHTML = "&#128077;"
        }
        if(results[1].label == "victory") {
            document.getElementById("prediction2gesture").innerHTML = "&#9996;"
        }
        if(results[1].label == "amazing") {
            document.getElementById("prediction2gesture").innerHTML = "&#128076;"
        }
    }
}