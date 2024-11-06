from flask import Flask, render_template, request, jsonify
from googletrans import Translator
from gtts import gTTS
from PIL import Image, ImageDraw, ImageFont
import os

app = Flask(__name__)

translator = Translator()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    text = data['text']
    target_lang = data['target_lang']

    try:
        translated = translator.translate(text, dest=target_lang)
        translated_text = translated.text
        return jsonify({'translated_text': translated_text})
    except Exception as e:
        print(f"Translation failed: {e}")
        return jsonify({'error': 'Translation service is unavailable. Please try again later.'}), 500

@app.route('/speak', methods=['POST'])
def speak():
    data = request.json
    text = data['text']

    try:
        tts = gTTS(text=text, lang='en')  # Adjust language as necessary
        tts.save("static/speech.mp3")
        speech_url = '/static/speech.mp3'
        return jsonify({'speech_url': speech_url})
    except Exception as e:
        print(f"Text-to-speech failed: {e}")
        return jsonify({'error': 'Text-to-speech service is unavailable. Please try again later.'}), 500

@app.route('/sign_language', methods=['POST'])
def sign_language():
    data = request.json
    text = data['text']

    try:
        # Generate a simple image for sign language representation
        img = Image.new('RGB', (200, 100), color = (73, 109, 137))
        d = ImageDraw.Draw(img)
        font = ImageFont.load_default()
        d.text((10, 50), text, fill=(255, 255, 0), font=font)

        image_path = "static/sign_language_image.png"
        img.save(image_path)

        return jsonify({'image_url': f'/{image_path}'})
    except Exception as e:
        print(f"Sign language image creation failed: {e}")
        return jsonify({'error': 'Sign language image creation is unavailable. Please try again later.'}), 500

if __name__ == '__main__':
    if not os.path.exists('static'):
        os.makedirs('static')
    app.run(debug=True)
