const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {const allTags = await Tag.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(allTags);
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
try { const allTags = await Tag.findByPk(req.params.id, {
  include: [{ model: Product }],
  });
  if (!allTags) {
    res.status(404).json({ message: 'That id is not associated with a tag'});
    return;
  }
  res.status(200).json(Tag);
}
catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});


  // create a new tag
  router.post('/', async (req, res) => {
    try {
      const newTag = await Tag.create(req.body);
      res.status(200).json(Tag);
    } catch (err) {
      res.status(400).json(err);
    }
});
Tag.create(req.body)
   .then((tag) => res.status(200).json(tag));


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
   .then((tag) => res.json(tag));
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const allTags = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!allTags) {
      res.status(404).json({ message: 'That id is not associated with a tag' });
      return;
    }
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
