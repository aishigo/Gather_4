const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
	const items = await Item.find({});
	res.render('index', {items});
});

router.get('/items/create', async (req, res, next) => {
	res.render('create');
});

router.post('/items/create', async (req, res, next) => {
	const {title, description, imageUrl} = req.body;
	const newItem = new Item({title, description, imageUrl});
	newItem.validateSync();
	if (newItem.errors) {
		res.status(400).render('create', {newItem: newItem});
	} else {
		await newItem.save();
		res.redirect('/');
	}

});

router.get('/items/:id', async (req, res, next) => {
	console.log('get items by :id: ' + req.params.id);
	let foundItemPromise = Item.findById(req.params.id);
	foundItemPromise.then((foundItem) => {
		console.log(foundItem);
		res.status(200).render('single-layout', {foundItem: foundItem});
	})
});

module.exports = router;
