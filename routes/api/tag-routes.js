const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [{ model: Product, as: 'tags'}]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err)
    res.status(404).json({message: `No such tag found!`})
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne(
    {
      where: {
        id: req.params.id
      },
      include: [{ model: Product, as: 'tags'}]
    }
  )
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err)
    res.status(404).json({message: `No such tag found!`})
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbUpdatedTag => {
    if(!dbUpdatedTag) {
      res.status(404).json({message: `No tag found!`})
      return
    }
    res.json(dbUpdatedTag)
  })
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbUpdatedTag => {
    if(!dbUpdatedTag) {
      res.status(404).json({message: `No tag found!`})
      return
    }
    res.json(dbUpdatedTag)
  })
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
});

module.exports = router;
