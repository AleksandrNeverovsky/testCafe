const { Given, Then, When } = require('@cucumber/cucumber');
const steamGameForm = require('../../forms/steamForms/steamGameForm');
const steamMainPage = require("../../forms/steamForms/steamMainForm");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

Then('Game Page is opened.', async() => {
    const status = await steamGameForm.isFormOpened();
    await testController.expect(status).ok();
});

Then('Game Page for {string}.', async(gameName) => {
    const actualText = await steamGameForm.getGameNameText();
    await testController.expect(actualText).contains(gameName);
});

Then('Publisher sale image is displayed.', async() => {
    const status = await steamGameForm.isPublisherSaleImageDisplayed();
    await testController.expect(status).ok();
});
