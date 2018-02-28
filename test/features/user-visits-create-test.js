const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');
console.log("BOOYAH");
describe('User visits the create page', () => {
    describe('posts a new item', () => {
      it('and is rendered', () => {
        const itemToCreate = buildItemObject();
        browser.url('/items/create');
        browser.setValue('#title-input', itemToCreate.title);
        browser.setValue('#description-input', itemToCreate.description);
        browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
        browser.click('#submit-button');
        console.log('ROOT: ' + browser.getText('body'));
        assert.include(browser.getText('body'), itemToCreate.title);
        assert.include(browser.getAttribute('body img', 'src'), itemToCreate.imageUrl);
      });
    });
});

