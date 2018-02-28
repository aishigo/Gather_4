const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const mongoose = require('mongoose');
const Item = require('../../models/item');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
	beforeEach(connectDatabaseAndDropData);
	afterEach(disconnectDatabase);

	it('tests that an item is found in the database', () => {
		// Write your test blocks below:
		let testItem = seedItemToDatabase();
		// console.log(testItem);
		testItem.then((item) => {
			// item is valid here so get the promise of the findById
			let foundItem = Item.findById(item._id);
			foundItem.then((reallyFoundItem) => {
				// reallyFoundItem is the fulfilled promise
				assert.strictEqual(reallyFoundItem.title, item.title);
				assert.strictEqual(reallyFoundItem.description, item.description);
			});
		})
	});
});
