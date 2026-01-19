function countChars() {
    var box = document.getElementById('messageBox');
    var count = document.getElementById('charCount');
    var total = box.value.length;
    var remaining = 200 - total;

    count.innerHTML = total + '/200 characters (' + remaining + ' remaining)';

    if (total >= 200) {
        alert('MAX 200 REACHED!');
        box.value = box.value.substring(0, 200);
        count.innerHTML = '200/200 characters (0 remaining)';
        count.style.color = 'red';
        count.style.fontWeight = 'bold';
    } else if (total > 180) {
        count.style.color = 'maroon';
    } else {
        count.style.color = 'red';
    }
}
const voiceBtn = document.getElementById("voiceBtn");
const messageBox = document.getElementById("messageBox");

let isRecording = false;
let finalTranscript = "";

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";    
    recognition.continuous = true;
    recognition.interimResults = true;

    voiceBtn.onclick = () => {
        if (!isRecording) {
            recognition.start();
            isRecording = true;
            voiceBtn.innerText = "⏹ Stop";
            voiceBtn.classList.add("recording");
        } else {
            recognition.stop();
            isRecording = false;
            voiceBtn.innerText = "🎤 Start";
            voiceBtn.classList.remove("recording");
        }
    };

    recognition.onresult = (event) => {
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript + " ";
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

    
        messageBox.value = finalTranscript + interimTranscript;
        countChars();
    };

    recognition.onend = () => {
        if (isRecording) {
            recognition.start();
        }
    };

    recognition.onerror = () => {
        recognition.stop();
        isRecording = false;
        voiceBtn.innerText = "🎤 Start";
        voiceBtn.classList.remove("recording");
    };
} else {
    alert("Speech recognition not supported");
}

const clearBtn = document.getElementById("clearBtn");
const submitBtn = document.getElementById("submitBtn");
const content = document.getElementById("messageBox");
const popup = document.getElementById("popup");

// CLEAR BUTTON
clearBtn.addEventListener("click", () => {
    messageBox.value = "";
    finalTranscript = ""; // voice text clear
    countChars();
});

// SUBMIT BUTTON
submitBtn.addEventListener("click", () => {
    if (messageBox.value.trim() === "") {
        alert("Please enter a message!");
        return;
    }

    popup.style.display = "block";

    setTimeout(() => {
        popup.style.display = "none";
    }, 2500);

    // clear after submit (optional)
    messageBox.value = "";
    finalTranscript = "";
    countChars();
});
