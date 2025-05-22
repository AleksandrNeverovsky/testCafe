const Icon = require('../../../framework/Icon');
const Input = require('../../../framework/input');
const Label = require('../../../framework/label');
const BaseForm = require('../../../framework/baseForm');
const Dropdown = require('../../../framework/dropdown');
const Button = require('../../../framework/button');
const StringUtils = require('../../../framework/utils/stringUtils');
const locators = require('../../locators/steam/mainPage.json');
const Checkbox = require('../../../framework/checkbox');

class SteamMainForm extends BaseForm {

    searchInput = new Input('searchInput', locators.searchInput);
    searchIcon = new Icon('searchIcon', locators.searchIcon);
    searchResult = new Label('searchResult', locators.searchResult);
    logoIcon = new Label('logo', locators.logoIcon);
    sortDropdown = new Dropdown('sortDropdown', locators.sortDropdown);
    sortButton = new Button('sortButton', locators.sortButton);
    sortOption = new Label('sortOption', locators.sortOption);
    opacity = new Label('opacity', locators.opacity);
    gamePrice = new Label('gamePrice', locators.gamePrice);
    menuItemButton = new Button('button', locators.menuItemButton);
    homePageContent = new Label('homePageContent', locators.homePageContent);
    gameImageLink = new Icon('gameImage', locators.gameImageLink);
    loginButton = new Button('loginButton', locators.loginButton);
    filterItem = new Label('filterItem', locators.filterItem);
    specialOffersCheckbox = new Checkbox('specialOffersCheckbox', locators.specialOffersCheckbox);
    searchResultRow = new Label('searchResultRow', locators.searchResultRow);
    ageDayDropdown = new Dropdown('ageDayDropdown', locators.ageDayDropdown);
    ageMonthDropdown = new Dropdown('ageMonthDropdown', locators.ageMonthDropdown);
    ageYearDropdown = new Dropdown('ageYearDropdown', locators.ageYearDropdown);
    viewPageButton = new Button('viewPageButton', locators.viewPageButton);
    validDateModal = new Label('validDateModal', locators.validDateModal);
    okButton = new Button('okButton', locators.okButton);

    constructor() {
        super()
        this.name = 'SteamMainForm'
        this.element = this.logoIcon
    }

    async typeNameGame(nameGame) {
        await this.searchInput.typeText(nameGame);
    }

    getSearchInputValue() {
        return this.searchInput.getValue();
    }

    async getGameImageHref() {
        return await this.gameImageLink.getAttribute('href')
    }

    async clickSearchIcon() {
        await this.searchIcon.click();
    }

    async clickViewPageButton() {
        await this.viewPageButton.click();
    }

    async clickSortButton() {
        await this.sortButton.click();
    }

    async clickOkButton() {
        await this.okButton.click();
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async isCheckboxSelected() {
        const classs = await this.specialOffersCheckbox.getAttribute('class');
        return classs;
    }

    async isSearchResultPresent() {
        return await this.searchResult.isDisplayed();
    }

    async clickSearchItemByName(expectedName) {
        const count = await this.searchResultRow.getCount();

        for (let i = 1; i <= count; i++) {
            const item = this.searchResultRow.getElementByNumber(i);
            const titleLabel = item.getChildElementBySelector(locators.searchItemName);
            const titleText = await titleLabel.getText();

            if (titleText.trim() === expectedName.trim()) {
                await item.click();
                return;
            }
        }

        throw new Error(`Game with name "${expectedName}" not found in search results`);
    }

    async selectCurrentDate() {
        try {
            const currentDate = new Date();
            const day = currentDate.getDate().toString();
            const month = currentDate.toLocaleString('en-US', {month: 'long'});
            const year = currentDate.getFullYear().toString();

            await this.ageDayDropdown.selectByValue(day);
            await this.ageMonthDropdown.selectByValue(month);
            await this.ageYearDropdown.selectByValue(year);

        } catch (error) {
            throw new Error(`Failed to select current date: ${error.message}`);
        }
    }

    async selectDate(dateString) {
        try {
            const [dayStr, monthStr, yearStr] = dateString.split(' ');
            const day = parseInt(dayStr, 10).toString();
            const month = monthStr.charAt(0).toUpperCase() + monthStr.slice(1).toLowerCase();
            const year = yearStr;

            await this.ageDayDropdown.selectByValue(day);
            await this.ageMonthDropdown.selectByValue(month);
            await this.ageYearDropdown.selectByValue(year);
        } catch (error) {
            throw new Error(`Failed to select date "${dateString}": ${error.message}`);
        }
    }

    async isSortDropdownPresent() {
        return await this.sortDropdown.isDisplayed();
    }

    async getValidateModalText() {
        return await this.validDateModal.getText();
    }

    async clickSortOptionByNumber(number) {
        this.sortOption.getElementByNumber(number).click();
    }

    async clickButton(nameButton) {
        await this.menuItemButton.click(nameButton)
    }

    async clickFilterItem(nameItem) {
        await this.filterItem.click(nameItem)
    }

    async clickSpecialOffersCheckbox() {
        await this.specialOffersCheckbox.click()
    }

    async moveMouseToMenuItem(name) {
        await this.menuItemButton.moveMouseToElement(name)
    }

    async moveMouseToHomePageContent() {
        await this.homePageContent.moveMouseToElement()
    }

    async waitForUpdateSearchResult() {
        this.opacity.waitForElementExist();
        this.opacity.waitForElementDisappear();

    }

    async getListOfPrices() {
        console.log('Heloo world')
        let listOfPrices = [];
        for (let i = 1; i < 4; i++) {
            let prices = await this.gamePrice.getElementByNumber(i).getText();
            let pricesWithDollarSimbol = prices.split('\n');
            let price = StringUtils.getNumberOfString(pricesWithDollarSimbol[pricesWithDollarSimbol.length - 1]);
            listOfPrices.push(price);
        }
        return listOfPrices;
    }
}

module.exports = new SteamMainForm();
