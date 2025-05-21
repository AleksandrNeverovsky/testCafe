const { Given, Then, When } = require('@cucumber/cucumber');
const steamMainPage = require('../../forms/steamForms/steamMainForm');
const steamLoginForm = require('../../forms/steamLoginForm/steamLoginForm');
const Browser = require('../../../framework/browser/browser');
const { ClientFunction } = require('testcafe');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

Given('Steam page is open.',  async function() {
    await testController.navigateTo('https://store.steampowered.com/');
    const status = await steamMainPage.isFormOpened();
    await testController.expect(status).ok();
});

Then('Game name {string} entered and displayed.', async(nameGame) => {
    const game = steamMainPage.getSearchInputValue();
    await testController.expect(game).eql(nameGame);
});

Then('Game image contains href.', async() => {
    const gameHref = await steamMainPage.getGameImageHref();
});

Then('Game image contains src.', async() => {
    const gameSrc = await steamMainPage.getGameImageSrc();
});

Then('Search results are displayed.', async() => {
    const status = await steamMainPage.isSearchResultPresent(); 
    await testController.expect(status).ok();
});

Then('Sort dropdown is displayed.', async() => {
    const status = await steamMainPage.isSortDropdownPresent(); 
    await testController.expect(status).ok();
});

Then('Checkbox is checked.', async() => {
    const status = await steamMainPage.isCheckboxSelected(); 
    await testController.expect(status).contains('checked');
});

Then('Prices sorted in descending order of price.', async() => {
    await steamMainPage.waitForUpdateSearchResult();        
    let listOfPrices = await steamMainPage.getListOfPrices();
    for(let i = 0;  i <= listOfPrices.length; i++){
        await testController.expect(listOfPrices[i] > listOfPrices[i + 1]).ok();
    }
});

Then('Url current page contains {string}.', async(pageUrl) => {
    await testController.expect(await Browser.getCurrentUrl()).contains(pageUrl);
});

Then('Modal with text {string} displayed.', async(text) => {
    const actualText = await steamMainPage.getValidateModalText();
    await testController.expect(actualText).contains(text);
});

When('Enter game name {string}.', async(nameGame) => {
    await steamMainPage.typeNameGame(nameGame);
});

When('Click on search icon.', async() => {
    await steamMainPage.clickSearchIcon();
});

When('Click on sort button.', async() => {
    await steamMainPage.clickSortButton();
});

When('Click on {int} sort option.', async(number) => {   
    await steamMainPage.clickSortOptionByNumber(number);
});

When('Click on {string} menu item button.', async(nameButton) => {
    await steamMainPage.clickButton(nameButton);
});

When('Move on {string} meny item.', async(name) => {
    await steamMainPage.moveMouseToMenuItem(name);
});

When('Move on meny.', async() => {
    await steamMainPage.moveMouseToHomePageContent();
});

When('Click login button.', async() => {
    await steamMainPage.clickLoginButton();
});

When('Click View Page button.', async() => {
    await steamMainPage.clickViewPageButton();
});

When('Enter username {string}.', async(username) => {
    await steamLoginForm.typeUsername(username);
});

When('Enter password {string}.', async(password) => {
    await steamLoginForm.typePassword(password);
});

When('Return to previous page.', async() => {
    await Browser.back();
});

When('Click on filter item {string}.', async(filterItemMenu) => {
    await steamMainPage.clickFilterItem(filterItemMenu);
});

When('Click on special offers checkbox.', async() => {
    await steamMainPage.clickSpecialOffersCheckbox();
});

When('Click on OK button.', async() => {
    await steamMainPage.clickOkButton();
});

When('Click on {string} search item button.', async(name) => {
    await steamMainPage.clickSearchItemByName(name);
});

When('Set as date current date.', async() => {
    await steamMainPage.selectCurrentDate();
});

When('Set as date {string}.', async(dateString) => {
    await steamMainPage.selectDate(dateString);
});