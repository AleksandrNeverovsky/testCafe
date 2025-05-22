const { Then } = require('@cucumber/cucumber');
const { checkImageContainsText } = require('../../utils/imageTextChecker');
const steamGameForm = require('../../forms/steamForms/steamGameForm');

Then('Publisher sale image contains text {string}', async(expectedText) => {
    const imageUrl = await steamGameForm.getPublisherSaleBannerSrc();
    const result = await checkImageContainsText(imageUrl, expectedText);
    if (!result) {
        throw new Error(`Text "${expectedText}" was not found in the image ${imageUrl}`);
    }
});
