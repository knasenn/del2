const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
var xhr = new XMLHttpRequest();


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

//Get all words and sentances from DB
recognition.onstart = function() {
    btn.style.backgroundColor = "#337a2c";
    console.log("voice is active!");
};

recognition.onresult = function(event) {
    btn.style.backgroundColor = "#4CAF50";
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;

    content.textContent = transcript;
    console.log(transcript);
    xhr.open("POST", "/voice/submit", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        value: transcript
    }));
    setTimeout(function(){ window.location.pathname = '/voice/talk-login'; }, 800);



};

//Add listner to btn
btn.addEventListener("click", () => {

    recognition.start();
});
