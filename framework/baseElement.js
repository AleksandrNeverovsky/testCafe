const { Selector } = require('testcafe');
const { ClientFunction } = require('testcafe');
const Logger = require('./utils/logger');

class BaseElement{

    constructor(name, locator){
        this.name = name;
        this.locator = locator;
    }

    findElement(){
        Logger.info(`Find element "${this.name}"`);
        return Selector(this.locator).with({ boundTestRun: testController });
    }

    async click(name=''){
        Logger.info(`Click element "${this.name}"`);
        const element = this.findElement().withText(name);
        await testController.click(element);
    }

    async isDisplayed(){
        Logger.info(`Check is displayed element "${this.name}"`);
        const element = this.findElement();
        return await element.exists;
    }

    async isChecked(name=''){
        const element = this.findElement().withText(name);
        return await element.checked;
    }

    async getCount(){
        const element = this.findElement();
        return await element.count;
    }

    async getText(){
        const element = this.findElement();
        return await element.innerText;
    }

    getElementByNumber(number){
        const element = this.findElement();
        return new BaseElement(this.name, element.nth(number - 1))
    }

    getChildElementBySelector(selector) {
        const element = this.findElement();
        return new BaseElement(`${this.name} child element`, element.find(selector));
    }

    async getAttribute(attribute){
        const element = this.findElement();
        return element.getAttribute(attribute);
    }

    async moveMouseToElement(name=''){
        const element = this.findElement().withText(name);
        await testController.hover(element);
    }

    async waitForElementExist(){
        const element = this.findElement().with({timeout: 5000});
        return await element.exists;
    }
    
    waitForElementDisappear = ClientFunction(() => {
        return new Promise(resolve => {
            var interval = setInterval(() => {
                if (document.querySelector(this.element.locator))
                    return;
                clearInterval(interval);
                resolve();
            }, 100);
        });
    });
    

}

module.exports = BaseElement;