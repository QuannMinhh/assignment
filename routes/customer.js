const express = require('express');
const ToyModel = require('../models/ToyModel');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await ToyModel.find({});
    res.render('toyCustomer/index', { products: products });
  } catch (error) {
    console.error(error);
    res.render('error', { error });
  }
});

router.get('/detail/:id', async (req, res) => {
  var products = await ToyModel.findById(req.params.id);
  res.render('toyCustomer/detail', { products : products })
})


module.exports = router;
