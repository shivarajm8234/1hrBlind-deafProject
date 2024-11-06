// Function to handle translating text
function translateText() {
    const text = document.getElementById('text-to-translate').value;
    const targetLang = document.getElementById('target-lang').value;

    fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text, target_lang: targetLang })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('translate-error').innerText = data.error;
        } else {
            document.getElementById('translated-text').innerText = data.translated_text;
            document.getElementById('translate-error').innerText = '';
        }
    })
    .catch(error => {
        document.getElementById('translate-error').innerText = 'An error occurred. Please try again.';
        console.error('Error:', error);
    });
}

// Function to handle text-to-speech
function speakText() {
    const text = document.getElementById('text-to-speak').value;

    fetch('/speak', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('speak-error').innerText = data.error;
        } else {
            const audio = document.getElementById('speech-audio');
            audio.src = data.speech_url;
            audio.play();
            document.getElementById('speak-error').innerText = '';
        }
    })
    .catch(error => {
        document.getElementById('speak-error').innerText = 'An error occurred. Please try again.';
        console.error('Error:', error);
    });
}

// Function to handle generating a sign language image
function generateSignLanguageImage() {
    const text = document.getElementById('text-to-sign').value;

    fetch('/sign_language', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('sign-error').innerText = data.error;
        } else {
            const img = document.getElementById('sign-image');
            img.src = data.image_url;
            img.alt = text;
            document.getElementById('sign-error').innerText = '';
        }
    })
    .catch(error => {
        document.getElementById('sign-error').innerText = 'An error occurred. Please try again.';
        console.error('Error:', error);
    });
}

// Function to announce which key is pressed
function announceKeyPress(event) {
    const keyName = event.key;
    const speech = new SpeechSynthesisUtterance(`You pressed ${keyName}`);
    window.speechSynthesis.speak(speech);
}

// Event listener for key presses
document.addEventListener('keydown', announceKeyPress);

document.addEventListener('DOMContentLoaded', function() {
    // Additional initialization code can go here
});
