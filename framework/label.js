const { Selector } = require('testcafe');
const BaseElement = require('./baseElement');

class Label extends BaseElement {

    constructor(name, locator) {
        super(name, locator)
    }

    getElement() {
        return Selector(this.locator).with({boundTestRun: testController});
    }
}

module.exports = Label;