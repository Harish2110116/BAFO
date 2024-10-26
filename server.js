const express = require('express');
const bodyParser = require('body-parser');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const { SpeechClient } = require('@google-cloud/speech');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/public', express.static(__dirname)); 

const ttsClient = new TextToSpeechClient({
  keyFilename: 'bafovoice-3fc8f81304ae.json', 
});
const sttClient = new SpeechClient({
  keyFilename: 'bafovoice-3fc8f81304ae.json', 
});

let predefinedWords = [];
let vectorizerVocab;
let featureVectors;

// Load the precomputed TF-IDF vectorizer and feature vectors
fs.readFile('tfidf_vectorizer.json', 'utf8', (err, data) => {
  if (err) throw err;
  vectorizerVocab = JSON.parse(data);
});
fs.readFile('tfidf_feature_vectors.json', 'utf8', (err, data) => {
  if (err) throw err;
  featureVectors = JSON.parse(data);
});
fs.readFile('stop_names.json', 'utf8', (err, data) => {
  if (err) throw err;
  predefinedWords = JSON.parse(data);
});

// Function to calculate cosine similarity between two vectors
const cosineSimilarity = (vec1, vec2) => {
  const dotProduct = vec1.reduce((sum, el, idx) => sum + el * vec2[idx], 0);
  const magnitude1 = Math.sqrt(vec1.reduce((sum, el) => sum + el * el, 0));
  const magnitude2 = Math.sqrt(vec2.reduce((sum, el) => sum + el * el, 0));
  return dotProduct / (magnitude1 * magnitude2);
};

// Function to transform text to a TF-IDF vector using the preloaded vectorizer vocabulary
const transformTextToVector = (text, vocab) => {
  const vector = new Array(Object.keys(vocab).length).fill(0);
  const words = text.toLowerCase().split(/\W+/);
  words.forEach(word => {
    if (vocab[word] !== undefined) {
      vector[vocab[word]]++;
    }
  });
  return vector;
};

app.post('/process-audio', async (req, res) => {
  try {
    const { audioContent } = req.body;
    
    // Step 1: Convert Speech to Text
    const audio = { content: audioContent };
    const sttRequest = {
      audio: audio,
      config: {
        encoding: 'MP3', 
        sampleRateHertz: 16000,
        languageCode: 'en-US',
      },
    };

    const [sttResponse] = await sttClient.recognize(sttRequest);
    const transcript = sttResponse.results[0]?.alternatives[0]?.transcript || 'No transcript available';

    // Step 2: Convert Transcript to TF-IDF vector
    const transcriptVector = transformTextToVector(transcript, vectorizerVocab);

    // Step 3: Compute Cosine Similarity
    let maxSimilarity = -1;
    let mostSimilarWord = '';
    
    for (let i = 0; i < predefinedWords.length; i++) {
      const similarity = cosineSimilarity(transcriptVector, featureVectors[i]);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        mostSimilarWord = predefinedWords[i];
      }
    }

    // Step 4: Convert Most Similar Word to Speech
    const ttsRequest = {
      input: { text: mostSimilarWord },
      voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    };

    const [ttsResponse] = await ttsClient.synthesizeSpeech(ttsRequest);
    const outputFile = path.join(__dirname, 'output.mp3');
    
    fs.writeFileSync(outputFile, ttsResponse.audioContent, 'binary');
    
    res.json({ audioFileName: 'output.mp3', transcript: mostSimilarWord });
  } catch (error) {
    console.error('Error processing audio:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
