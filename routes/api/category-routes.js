const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: ['id', 'category_name']
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
  // TODO: be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne(
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({message: `Error! No such category exists!`})
      return
    }
    res.json(dbCategoryData)
  })
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
  // TODO: be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    .then(dbUpdatedData => {
      if(!dbUpdatedData) {
        res.status(404).json({message: `No category found!`})
        return
      }
      res.json(dbUpdatedData)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json(err)
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({message: `Error! No category found`})
      return
    }
    res.json(dbCategoryData)
  })
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
});

module.exports = router;
