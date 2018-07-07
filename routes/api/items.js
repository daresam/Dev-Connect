const express = require('express');
const Item = require('../../model/Item');

const router = express.Router();

router.get('/', (req, res) => {
    Item.find()
    .sort({date: -1})
    .then(items => res.json(items));
});

router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save()
        .then(item => res.json(item));
    
});
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Item.findById(id)
        .then(item => item.remove().then( () => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
    
});

module.exports = router;