const Icon = require('../../../framework/Icon');
const Input = require('../../../framework/input');
const Label = require('../../../framework/label');
const BaseForm = require('../../../framework/baseForm');
const Dropdown = require('../../../framework/dropdown');
const Button = require('../../../framework/button');
const StringUtils = require('../../../framework/utils/stringUtils');
const locators = require('../../locators/steam/gameForm.json');
const Checkbox = require('../../../framework/checkbox');

class SteamGameForm extends BaseForm {

    title = new Label('title', locators.title);
    publisherSaleBannerBig = new Label('publisherSaleBannerBig', '.saleEventBannerBig');
    publisherSaleBannerMobile = new Label('publisherSaleBannerMobile', '.saleEventBannerMobile');

    constructor() {
        super()
        this.name = 'SteamGameForm'
        this.element = this.title
    }

    async getGameNameText() {
        return await this.title.getText();
    }

    async isPublisherSaleImageDisplayed() {
        try {
            const isBigBannerDisplayed = await this.publisherSaleBannerBig.isDisplayed();
            const isMobileBannerDisplayed = await this.publisherSaleBannerMobile.isDisplayed();
            return isBigBannerDisplayed || isMobileBannerDisplayed;
        } catch (error) {
            throw new Error(`Error checking if publisher sale image is displayed: "${dateString}": ${error.message}`);
            return false;
        }
    }
}

module.exports = new SteamGameForm();
