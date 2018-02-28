/**
 * Created by Adam Ishigo
 */
const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

console.log("BAH HUMBUG");

describe('User visits /items/create', () => {
	beforeEach(connectDatabaseAndDropData);
	afterEach(disconnectDatabase);
	it('fills out and submits a new item', async () => {
		// create test data
		const itemToCreate = buildItemObject();
		console.log(itemToCreate);
		// navigate to /items/create
		browser.url('/items/create');
		// click Add new item
		// browser.click('a[href="/items/create"]');
		// we should now be on the form
		// fill in the fields and click submit button
		browser.setValue('#title-input', itemToCreate.title);
		browser.setValue('#description-input', itemToCreate.description);
		let testDesc = browser.getValue('#description-input');
		browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
		browser.click('#submit-button');
		// should now be back on '/', test by looking for 'gather'
		assert.include(browser.getText('body'), 'gather');
		browser.click('.item-card a');
		// assert that created item's description appears on page
		// Get the html and check for 'description'
		console.log('CLICKCLICKCLICK: ' + browser.getText('body'));

		console.log('Assert #2');
		assert.include(browser.getText('body'), itemToCreate.description);
	});

});