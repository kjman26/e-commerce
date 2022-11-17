const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { beforeDestroy } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ['id', 'tage_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        through: ProductTag,
        as: 'products'
      },
    ],
  })
  .then((dbTagData) => res.json(dbTagData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    attributes: ['id', 'tage_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        through: ProductTag,
        as: 'products'
      },
    ],
  })
  .then((dbTagData) => res.json(dbTagData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then((dbTagData) => res.json(dbTagData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
    .then((dbTagData) => {
      if (!dbTagData){
        res.status(500).json({ message: "There are no tags with this ID"});
        return;
      }
      res.json(dbTagData)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err)
    })
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy((dbTagData) ={
    where: {id.params.id,},
    })
    .then((dbTagData) => {
      if(!dbTagData){
        res.status(500).json({message: "There are no tags with this ID"});
        return;
      }
      res.json(dbTagData)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err)
    });
});

module.exports = router;
