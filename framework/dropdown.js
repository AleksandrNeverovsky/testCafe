const BaseElement = require("./baseElement");

class Dropdown extends BaseElement {
    constructor(name, locator) {
        super(name, locator);
    }

    async selectByValue(value) {
        console.log(`Select value "${value}" in dropdown "${this.name}"`);
        const element = await this.findElement();

        await testController.click(element);
        await testController.click(element.find('option').withText(value));
    }
}

module.exports = Dropdown;