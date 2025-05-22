const axios = require('axios');
const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TEMP_ORIGINAL = 'tempBanner.png';
const TEMP_PROCESSED = 'tempBanner-processed.png';

async function downloadImage(imageUrl, imageName = TEMP_ORIGINAL) {
    const filePath = path.resolve(__dirname, imageName);
    const response = await axios.get(imageUrl, {responseType: 'arraybuffer'});
    fs.writeFileSync(filePath, response.data);
    return filePath;
}

async function preprocessImage(inputPath, outputPath = TEMP_PROCESSED) {
    await sharp(inputPath)
        .extract({
            left: 300,
            top: 50,
            width: 500,
            height: 60
        })
        .resize(1400)
        .grayscale()
        .threshold(150)
        .normalize()
        .toFile(outputPath);
}

async function extractTextFromImage(imagePath, lang = 'eng') {
    const {data: {text}} = await Tesseract.recognize(imagePath, lang);
    return text.trim();
}

async function checkImageContainsText(imageUrl, expectedText, lang = 'eng') {
    const originalPath = await downloadImage(imageUrl);
    const processedPath = await preprocessImage(originalPath);
    const actualText = await extractTextFromImage(processedPath, lang);
    console.log('\n🔍 Extracted Text:\n', actualText);
    return actualText.includes(expectedText);
}

module.exports = {
    downloadImage,
    preprocessImage,
    extractTextFromImage,
    checkImageContainsText
};
